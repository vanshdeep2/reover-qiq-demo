/**
 * Expand all shard transcripts to ~4-5 min AHT length (28-55 turns).
 * Idempotent: skips contacts already at or above target turn count.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SHARD_DIR = path.join(ROOT, 'public', 'data', 'shards')
const INDEX_PATH = path.join(ROOT, 'public', 'data', 'rover_contact_index.json')

const TURN_RE = /^(Agent|Member|Owner|Sitter|Customer)(?:\s*\([^)]*\))?:\s*/i

function parseTurns(text) {
  if (!text) return []
  const lines = String(text).split(/\n/).map((l) => l.trim()).filter(Boolean)
  // Some transcripts are one line with embedded speaker labels
  const chunks = []
  for (const line of lines) {
    const parts = line.split(/(?=(?:Agent|Member|Owner|Sitter|Customer)(?:\s*\([^)]*\))?:)/i)
    for (const part of parts) {
      const trimmed = part.trim()
      if (!trimmed) continue
      const m = trimmed.match(/^(Agent|Member|Owner|Sitter|Customer)(?:\s*\(([^)]*)\))?:\s*(.*)$/is)
      if (m) {
        chunks.push({
          role: /^Agent/i.test(m[1]) ? 'agent' : 'member',
          name: (m[2] || '').trim(),
          text: (m[3] || '').trim().replace(/\s+/g, ' '),
        })
      } else {
        chunks.push({ role: 'other', name: '', text: trimmed })
      }
    }
  }
  return chunks.filter((t) => t.text)
}

function targetTurns(handlingTime) {
  const ht = typeof handlingTime === 'number' && handlingTime > 0 ? handlingTime : 294
  // ~1 turn per 8s, clamped to 28-55
  return Math.min(55, Math.max(28, Math.round(ht / 8)))
}

function memberLabel(side) {
  return side === 'sitter' ? 'Sitter' : 'Member'
}

function poolForCategory(category, side, pet, member) {
  const petName = pet || 'your pet'
  const who = member || 'there'
  const isSitter = side === 'sitter'

  const commonAgent = [
    `Thanks ${who}. I have the booking and ${petName}'s profile open now.`,
    'Let me confirm the stay dates and the current status on the booking.',
    'I am checking the protection rules that apply to this stay.',
    'I will also review any prior notes on this case so we are not starting from zero.',
    'Give me a moment while I verify the account details against what you have shared.',
    'I can see where the friction is. Let me walk through what we can do from here.',
    'I want to make sure the next steps are clear before we close.',
    'I am documenting this so the next agent, if needed, has the full context.',
    'Reservation protection and timing windows matter here, so I am double-checking both.',
    'I will confirm what you should expect and by when.',
  ]

  const commonMember = [
    `I am worried about ${petName} and I need a clear answer.`,
    'I have already explained this once. Can we please move this forward?',
    'Okay, but what happens if that timeline slips?',
    'That helps a little. What do I need to do on my side?',
    'Right. Is there anything more specific you can do today?',
    'I just need someone to own this properly.',
    'Understood. Please put that in writing in the case notes.',
    'Fine. Please confirm the reference number before we finish.',
  ]

  const byCat = {
    'Booking Cancellation': {
      agent: [
        'Because the cancellation falls inside the protection window, reservation protection applies.',
        'I am starting a replacement sitter search against sitters available for those dates.',
        'Replacement searches typically return options within 24 to 48 hours, sometimes sooner.',
        'I will flag the booking so you get a message as soon as matched sitters appear.',
        'If no replacement is found in time, I will outline the refund path as well.',
      ],
      member: [
        `My sitter cancelled with short notice and I still need cover for ${petName}.`,
        'How soon will I see replacement options in the app?',
        'Please prioritise sitters who have done overnight stays before.',
      ],
    },
    'Refund & Fees': {
      agent: [
        'I am reviewing the fee line items against the cancellation timing.',
        'I can see which charges are refundable under the current policy.',
        'I will submit the refund request and confirm the expected arrival window.',
        'Bank timing is usually three to five working days once approved.',
      ],
      member: [
        'I was charged a fee I do not think should apply.',
        'Can you break down what is refundable versus what is not?',
        'Please confirm when the money should hit my account.',
      ],
    },
    'Cancellation Penalties': {
      agent: [
        'Penalty amounts depend on how close the cancellation sits to the stay start.',
        'I am checking whether any goodwill adjustment is available on this booking.',
        'I will explain the penalty calculation line by line so it is transparent.',
      ],
      member: [
        'The penalty feels disproportionate given how this cancelled.',
        'Is there any discretion on the fee if the sitter cancelled first?',
      ],
    },
    'Rover Guarantee (Sitter)': {
      agent: [
        'I am checking the claim against the Rover Guarantee windows for treatment and reporting.',
        'I need the incident date, the vet documents, and when treatment started.',
        'I will confirm whether the claim is inside the reporting window before we go further.',
        'If anything is missing from the evidence pack, I will list exactly what to upload.',
      ],
      member: isSitter
        ? [
            'I reported the incident and I need to know where the claim stands.',
            'I am concerned this will affect my standing if it stays unresolved.',
            'Please confirm what evidence is still outstanding.',
          ]
        : [
            'I need an update on the guarantee claim for this stay.',
            'The vet costs are already paid and I need a decision.',
          ],
    },
    'Rover Guarantee (Owner)': {
      agent: [
        'I am reviewing the owner-side guarantee claim against the policy windows.',
        'I will confirm treatment dates and whether documentation is complete.',
        'Once the pack is complete I can move this to the next review step.',
      ],
      member: [
        `This is about ${petName}'s care during the stay and the costs that followed.`,
        'I need a clear yes or no on whether cover applies.',
      ],
    },
    'Account Standing': {
      agent: [
        'I am looking at the standing flags and the contacts that led to them.',
        'Standing reviews weigh incident history, not a single contact in isolation.',
        'I will explain what improves standing and what still needs attention.',
      ],
      member: [
        'I am worried my standing is at risk after this incident.',
        'What specifically do I need to fix to get back to a normal status?',
      ],
    },
    Verification: {
      agent: [
        'Before I change anything I need to complete identity verification.',
        'Please confirm the email on the account and the last four digits of the payment method if shown.',
        'Verification is complete. I can now continue with the request.',
      ],
      member: [
        'I am happy to verify. What do you need from me?',
        'That matches what I have on my side.',
      ],
    },
    'Booking Changes': {
      agent: [
        'I can see the requested change against the original stay dates.',
        'I will check sitter availability and any fee impact before confirming.',
        'If the change is accepted I will send an updated booking summary.',
      ],
      member: [
        'I need to change the dates or the drop-off time.',
        'Will this affect the price or the sitter assignment?',
      ],
    },
    Payments: {
      agent: [
        'I am checking the payment status and any failed authorisations.',
        'I will confirm whether a retry is needed or whether the charge already settled.',
        'You should see an updated status in the app once this clears.',
      ],
      member: [
        'The payment failed or looks wrong on my statement.',
        'Can you confirm the amount and when it will post?',
      ],
    },
    'Stay Concerns': {
      agent: [
        `I am treating this as a live stay concern for ${petName}.`,
        'I will capture the timeline of what happened during the stay.',
        'If Trust and Safety needs to be involved I will explain that path clearly.',
      ],
      member: [
        `Something during the stay with ${petName} does not feel right.`,
        'I need someone to take this seriously today.',
      ],
    },
    'Trust & Safety': {
      agent: [
        'I am opening the Trust and Safety path and logging the details carefully.',
        'Please share what happened, when, and who was involved.',
        'I will confirm what happens next and who owns the follow-up.',
      ],
      member: [
        'This is a safety concern and I need it escalated properly.',
        'Please do not close this until there is a clear owner.',
      ],
    },
    Reviews: {
      agent: [
        'I am checking the review status and the window for edits or responses.',
        'I will explain what can be updated and what is locked after publishing.',
      ],
      member: [
        'I need help with a review that does not reflect the stay.',
        'Is there a way to respond or request a review?',
      ],
    },
    Payouts: {
      agent: [
        'I am checking the payout schedule and any holds on the account.',
        'I will confirm the expected arrival date for the next transfer.',
      ],
      member: [
        'My payout is late or missing.',
        'Can you confirm the bank details on file are correct?',
      ],
    },
    'Profile & Listing': {
      agent: [
        'I am reviewing the listing fields that may be blocking visibility.',
        'I will walk through what needs updating for the profile to show correctly.',
      ],
      member: [
        'My listing is not showing as expected.',
        'What do I need to fix on the profile?',
      ],
    },
    'App Technical': {
      agent: [
        'I will capture the device, app version, and the exact error you are seeing.',
        'A force refresh or reinstall often clears this, and I will note a bug report if it persists.',
      ],
      member: [
        'The app is failing when I try to complete this step.',
        'I have already tried logging out once.',
      ],
    },
    'Account & Access': {
      agent: [
        'I am checking access locks, password resets, and any security flags.',
        'Once access is restored I will confirm you can sign in successfully.',
      ],
      member: [
        'I cannot get into my account.',
        'Please help me regain access without losing booking history.',
      ],
    },
    'Rates & Fees': {
      agent: [
        'I am reviewing the rate card and any service fees on the booking.',
        'I will explain how the total was calculated.',
      ],
      member: [
        'The rates or fees do not match what I expected.',
        'Can you show me the breakdown?',
      ],
    },
  }

  const specific = byCat[category] || {
    agent: [
      'I am reviewing the case details and the applicable Rover policy.',
      'I will confirm the next action and the expected timeline.',
    ],
    member: [
      'I need a clear update on where this stands.',
      'Please tell me what happens next.',
    ],
  }

  return {
    agent: [...specific.agent, ...commonAgent],
    member: [...specific.member, ...commonMember],
  }
}

function formatTurn(role, name, text, side) {
  if (role === 'agent') {
    return `Agent (${name}): ${text}`
  }
  const label = memberLabel(side)
  return `${label} (${name}): ${text}`
}

function expandTranscript(existingText, meta) {
  const turns = parseTurns(existingText)
  const target = targetTurns(meta.handling_time)
  if (turns.length >= target) {
    return turns.map((t) => formatTurn(t.role === 'agent' ? 'agent' : 'member', t.name || (t.role === 'agent' ? meta.agent_name : meta.member_name), t.text, meta.side)).join('\n')
  }

  const agentName = meta.agent_name || 'Agent'
  const memberName = meta.member_name || 'Member'
  const pool = poolForCategory(meta.call_category, meta.side, meta.pet_name, memberName)

  const opening = turns.length ? turns.slice(0, Math.min(3, turns.length)) : [
    { role: 'member', name: memberName, text: `Hi, I need help with a ${meta.call_category || 'booking'} issue involving ${meta.pet_name || 'my pet'}.` },
    { role: 'agent', name: agentName, text: `Hi ${memberName}, ${agentName} here. I can see your message and I am pulling the booking up now.` },
  ]

  const closing = turns.length > 3 ? turns.slice(-2) : [
    { role: 'agent', name: agentName, text: 'I have noted the next steps and the timeline in the case. You will get a follow-up in the app.' },
    { role: 'member', name: memberName, text: 'Okay, thank you.' },
    { role: 'agent', name: agentName, text: 'Thanks for contacting Rover. Take care.' },
  ]

  const middleNeeded = Math.max(0, target - opening.length - closing.length)
  const middle = []
  let aIdx = 0
  let mIdx = 0
  let nextRole = 'agent'

  // Prefer unused content from original middle turns first
  const originalMiddle = turns.slice(3, Math.max(3, turns.length - 2))
  for (const t of originalMiddle) {
    if (middle.length >= middleNeeded) break
    middle.push(t)
    nextRole = t.role === 'agent' ? 'member' : 'agent'
  }

  while (middle.length < middleNeeded) {
    if (nextRole === 'agent') {
      const text = pool.agent[aIdx % pool.agent.length]
      aIdx += 1
      middle.push({ role: 'agent', name: agentName, text })
      nextRole = 'member'
    } else {
      const text = pool.member[mIdx % pool.member.length]
      mIdx += 1
      middle.push({ role: 'member', name: memberName, text })
      nextRole = 'agent'
    }
  }

  // Light variation so adjacent contacts do not look identical
  const seed = (meta.contact_id || '').split('').reduce((n, ch) => n + ch.charCodeAt(0), 0)
  if (seed % 3 === 0 && middle.length > 4) {
    const swapAt = 2 + (seed % (middle.length - 3))
    if (middle[swapAt] && middle[swapAt + 1] && middle[swapAt].role !== middle[swapAt + 1].role) {
      const tmp = middle[swapAt]
      middle[swapAt] = middle[swapAt + 1]
      middle[swapAt + 1] = tmp
    }
  }

  const all = [...opening, ...middle, ...closing]
  return all
    .map((t) =>
      formatTurn(
        t.role === 'agent' ? 'agent' : 'member',
        t.name || (t.role === 'agent' ? agentName : memberName),
        t.text,
        meta.side,
      ),
    )
    .join('\n')
}

function main() {
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'))
  const byId = new Map(index.map((c) => [c.contact_id, c]))
  const files = fs.readdirSync(SHARD_DIR).filter((f) => /^shard_\d+\.json$/.test(f)).sort()

  let updated = 0
  let skipped = 0
  let total = 0

  for (const file of files) {
    const full = path.join(SHARD_DIR, file)
    const shard = JSON.parse(fs.readFileSync(full, 'utf8'))
    let changed = false

    for (const [id, record] of Object.entries(shard)) {
      total += 1
      const meta = byId.get(id) || {}
      const beforeTurns = parseTurns(record.transcript).length
      const target = targetTurns(meta.handling_time)
      if (beforeTurns >= target) {
        skipped += 1
        continue
      }
      const next = expandTranscript(record.transcript, { ...meta, contact_id: id })
      record.transcript = next
      updated += 1
      changed = true
    }

    if (changed) {
      fs.writeFileSync(full, JSON.stringify(shard, null, 2) + '\n', 'utf8')
      console.log(`Wrote ${file}`)
    }
  }

  console.log(JSON.stringify({ total, updated, skipped }, null, 2))
}

main()
