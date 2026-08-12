/** Qualitative copy only. Live numbers are interpolated at render time. */

export const CHEAT_CODE_LABELS = {
  card_1_open_with_incident: 'Card 1: open with the incident, not the ticket',
  card_2_match_register: 'Card 2: match the register to the history, not the request',
  card_3_route_forward: 'Card 3: never close without a route forward',
  card_4_say_unspoken: 'Card 4: say the thing they have not asked',
  cc1: 'Card 1: open with the incident, not the ticket',
  cc2: 'Card 2: match the register to the history, not the request',
  cc3: 'Card 3: never close without a route forward',
  cc4: 'Card 4: say the thing they have not asked',
}

/**
 * Campaign summaries by week (0-4). Placeholders:
 * {total}, {processAdherencePct}, {resolutionRatePct}, {positiveCsatPct},
 * {criticalFailures}, {heroPct}, {heroCount}, {meanQa}, {overallQa}
 */
export const CAMPAIGN_SUMMARY_BY_WEEK = [
  {
    headline:
      'Quality mining found the pattern per-contact QA cannot see: continuation contacts that pass the scorecard and still fail the member.',
    paragraphs: [
      'Week 1 surfaces a large block of contacts in resolution achieved, process followed, and negative CSAT. Process adherence sits at {processAdherencePct}% and resolution at {resolutionRatePct}% across {total} contacts, yet members are rating the experience poorly.',
      'These are continuation contacts where the member came back on an open incident and the agent handled it as a fresh ticket. A contact can pass every scorecard question and still fail the member.',
      '{criticalFailures} critical failures were logged this week, all empathy-threshold auto-fails, concentrated on a small number of agents. The Poor behaviour, negative CSAT cell alone holds {heroCount} contacts ({heroPct}% of that behaviour band) with a mean QA of {meanQa}.',
    ],
    wow: 'Critical failures {criticalFailures} · process adherence {processAdherencePct}% · positive CSAT {positiveCsatPct}% · hero-cell mean QA {meanQa}',
    chips: [
      {
        text: 'Continuation contacts treated as fresh tickets',
        className: 'chip-red',
        dotColor: '#f87171',
      },
      {
        text: 'Hero cell mean QA {meanQa} while CSAT collapses',
        className: 'chip-amber',
        dotColor: '#fbbf24',
      },
      {
        text: 'Process adherence {processAdherencePct}% still looks healthy',
        className: 'chip-green',
        dotColor: '#4ade80',
      },
    ],
  },
  {
    headline:
      'Micro Coaching went out in week 2 to the flagged agents. Critical failures start to fall, but the aggregate has not moved yet.',
    paragraphs: [
      'Coaching opens every continuation contact with the incident, not the ticket. Critical failures are down to {criticalFailures} from the week-1 peak, but it is still too early to see clear movement in the aggregate metrics.',
      'Process adherence ({processAdherencePct}%) and resolution ({resolutionRatePct}%) remain healthy across {total} contacts. Positive CSAT is {positiveCsatPct}%.',
      'The core argument still holds: a contact can pass every scorecard question and still fail the member, and per-contact QA scoring cannot see the incident trail that drives continuation CSAT down.',
    ],
    wow: 'Critical failures {criticalFailures} · process adherence {processAdherencePct}% · positive CSAT {positiveCsatPct}% · coaching live from week 2',
    chips: [
      {
        text: 'Micro Coaching deployed to flagged agents',
        className: 'chip-amber',
        dotColor: '#fbbf24',
      },
      {
        text: 'Critical failures down to {criticalFailures}',
        className: 'chip-red',
        dotColor: '#f87171',
      },
      {
        text: 'Aggregate CSAT still lagging coaching uptake',
        className: 'chip-amber',
        dotColor: '#fbbf24',
      },
    ],
  },
  {
    headline:
      'Team-wide coaching is landing. Critical failures keep falling and the negative-CSAT-despite-good-process cell begins to shrink.',
    paragraphs: [
      'Critical failures fall to {criticalFailures}. Agents are opening continuation contacts with the incident history rather than the ticket.',
      'Across {total} contacts, process adherence is {processAdherencePct}% and resolution is {resolutionRatePct}%. Positive CSAT sits at {positiveCsatPct}%.',
      'Mean QA in the hero cell remains high at {meanQa}, which is the proof point: scorecards pass while the member experience still fails until behaviour changes.',
    ],
    wow: 'Critical failures {criticalFailures} · process adherence {processAdherencePct}% · positive CSAT {positiveCsatPct}% · hero-cell mean QA {meanQa}',
    chips: [
      {
        text: 'Critical failures down to {criticalFailures}',
        className: 'chip-green',
        dotColor: '#4ade80',
      },
      {
        text: 'Hero cell still shows high QA ({meanQa})',
        className: 'chip-amber',
        dotColor: '#fbbf24',
      },
      {
        text: 'Continuation opens improving team-wide',
        className: 'chip-green',
        dotColor: '#4ade80',
      },
    ],
  },
  {
    headline:
      'Only {criticalFailures} critical failure remains. Continuation CSAT is recovering as Micro Coaching settles into habit.',
    paragraphs: [
      'Process adherence ({processAdherencePct}%) and resolution ({resolutionRatePct}%) hold across {total} contacts. Positive CSAT is {positiveCsatPct}%.',
      'A contact can still pass every scorecard question and fail the member when policy, not behaviour, is the blocker. The matrix is now separating those two problems.',
      'The coaching loop is visible in the data: detection in week 1, Micro Coaching from week 2, and critical failures falling every week since.',
    ],
    wow: 'Critical failures {criticalFailures} · process adherence {processAdherencePct}% · positive CSAT {positiveCsatPct}% · continuation recovery underway',
    chips: [
      {
        text: 'Critical failures at {criticalFailures}',
        className: 'chip-green',
        dotColor: '#4ade80',
      },
      {
        text: 'Policy denials still drive residual negative CSAT',
        className: 'chip-amber',
        dotColor: '#fbbf24',
      },
      {
        text: 'Behaviour gap no longer the primary driver',
        className: 'chip-green',
        dotColor: '#4ade80',
      },
    ],
  },
  {
    headline:
      'Critical failures are at {criticalFailures}. Remaining negative CSAT is policy-driven, not a coaching gap, and the evidence layer proves the Executive story.',
    paragraphs: [
      'Week 5 closes the period with {criticalFailures} critical failures. Remaining negative CSAT sits in Guarantee denials and cancellation penalties rather than behavioural gaps.',
      'That is a different problem needing a policy fix, not more coaching. Process adherence is {processAdherencePct}%, resolution {resolutionRatePct}%, and positive CSAT {positiveCsatPct}% across {total} contacts.',
      'Quality mining found the empathy gap in week 1, Micro Coaching from week 2 drove critical failures 7 to 0, and per-contact QA alone would have missed the collapse.',
    ],
    wow: 'Critical failures 7 → {criticalFailures} · process adherence {processAdherencePct}% · positive CSAT {positiveCsatPct}% · policy residual remains',
    chips: [
      {
        text: 'Critical failures 7 → 0 across five weeks',
        className: 'chip-green',
        dotColor: '#4ade80',
      },
      {
        text: 'Residual negative CSAT is policy, not behaviour',
        className: 'chip-amber',
        dotColor: '#fbbf24',
      },
      {
        text: 'Per-contact QA would have missed the pattern',
        className: 'chip-red',
        dotColor: '#f87171',
      },
    ],
  },
]


const DEFAULT_OUTCOME =
  'This cell holds {pct}% of the selected behaviour band ({count} of {total} contacts) with a mean QA score of {meanQa}. Dominant categories: {categories}.'

const HERO_OUTCOME =
  'These {count} contacts ({pct}% of the Poor behaviour band) resolved the issue and followed every process step, and still produced a negative rating. A high share are continuation contacts on an already-open incident where the member history and emotional state went unacknowledged. Mean QA is {meanQa}, so per-contact scoring would pass most of these. Dominant categories: {categories}.'

export function outcomeSummaryTemplate(row, csatBand, behaviourBand) {
  if (row === 0 && csatBand === 'negative' && behaviourBand === 'poor') return HERO_OUTCOME
  return DEFAULT_OUTCOME
}

const DEFAULT_IMPROVEMENTS = [
  'Review the contacts in this cell for process gaps versus emotional register mismatches.',
  'Calibrate team leaders on how high QA can coexist with low CSAT on continuation contacts.',
  'Use the matrix cell as a coaching filter rather than sampling QA scores alone.',
]

const HERO_IMPROVEMENTS = [
  'Acknowledge the incident history before running the process checklist on every continuation contact.',
  'Name ownership and a concrete route forward before closing, even when policy limits full resolution.',
  'Match the member emotional register to the history of the case, not only to the latest request.',
]

export function improvementOpportunities(row, csatBand, behaviourBand) {
  if (row === 0 && csatBand === 'negative' && behaviourBand === 'poor') return HERO_IMPROVEMENTS
  return DEFAULT_IMPROVEMENTS
}

const DEFAULT_ACTIONS = {
  contactCentre: [
    'Add this cell to the weekly team-leader calibration queue.',
    'Spot-check transcripts for empathy and ownership language.',
    'Keep QA forms focused on process, and use the matrix for behavioural risk.',
  ],
  prevention: [
    'Surface open-incident context in the agent desktop before the first reply.',
    'Reduce handoffs that strip incident history from the next contact.',
    'Flag policy-driven categories separately so coaching is not asked to fix policy.',
  ],
}

const HERO_ACTIONS = {
  contactCentre: [
    'Deploy Card 1: open with the incident, not the ticket (Micro Coaching from week 2).',
    'Deploy Card 2: match the register to the history, not the request, and Card 3: never close without a route forward.',
    'Use Card 4: say the thing they have not asked, on sitter-standing and Guarantee denial continuations. Calibrate QA so empathy-threshold fails feed this coaching loop.',
  ],
  prevention: [
    'Auto-surface prior contacts on the same incident_id in the agent workspace.',
    'Separate policy denial outcomes from behavioural failures in reporting so leadership sees which lever to pull.',
    'Shorten Trust and Safety and Guarantee decision latency that forces members back into continuation contacts.',
  ],
}

export function recommendedActions(row, csatBand, behaviourBand) {
  if (row === 0 && csatBand === 'negative' && behaviourBand === 'poor') return HERO_ACTIONS
  return DEFAULT_ACTIONS
}

export function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = vars[key]
    return value == null ? '' : String(value)
  })
}

export const ROW_LABELS = [
  {
    lines: [
      { ok: true, text: 'Resolution Achieved' },
      { ok: true, text: 'Process Followed' },
    ],
  },
  {
    lines: [
      { ok: false, text: 'Resolution Not Achieved' },
      { ok: true, text: 'Process Followed' },
    ],
  },
  {
    lines: [
      { ok: true, text: 'Resolution Achieved' },
      { ok: false, text: 'Process Not Followed' },
    ],
  },
  {
    lines: [
      { ok: false, text: 'Resolution Not Achieved' },
      { ok: false, text: 'Process Not Followed' },
    ],
  },
]

export const CSAT_COLUMN_META = [
  { key: 'positive', label: 'Positive (4-5)', className: 'qa-col-positive' },
  { key: 'neutral', label: 'Neutral (3)', className: 'qa-col-neutral' },
  { key: 'negative', label: 'Negative (1-2)', className: 'qa-col-negative' },
]

export const FRUSTRATION_KEYWORDS = [
  'again',
  'second time',
  'still',
  'already',
  'exhausted',
  'stressed',
  'anxious',
  'worried',
  'frustrated',
]
