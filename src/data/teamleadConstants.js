import { AGENT_METRICS, AGENT_METRIC_ORDER, FLAGGED_AGENT_SLUGS, TEAM_AGGREGATES } from './agentMetrics'

/** This agent's own top-ranked coaching card title, read live off their pack. */
function topCoachingTopic(m) {
  return m.coachingPack.cards[0]?.title || 'Micro Coaching suite'
}

function statusOf(m) {
  if (m.criticalFailures >= 3) return ['Action Needed', 'badge-red']
  if (m.criticalFailures >= 1) return ['Watch', 'badge-amber']
  return ['On Track', 'badge-green']
}

export const TEAM_HEALTH_STATS = [
  { label: 'Team QA Score', value: '91.4', valueClass: 'val-green', sub: 'Overall QA average · all 2,077 contacts' },
  { label: 'CSAT', value: '1.8', valueClass: 'val-red', sub: 'Vs 4.2 on first contacts' },
  { label: 'Critical failures', value: '0', valueClass: 'val-green', sub: 'Week 5 · down from 7 in week 1' },
  { label: 'Agents with auto-fails', value: '9/10', valueClass: 'val-amber', sub: 'Pattern is team-wide, not individual' },
]

export const MATRIX_ROWS = AGENT_METRIC_ORDER.map((slug) => {
  const m = AGENT_METRICS[slug]
  const [status, badgeClass] = statusOf(m)
  const delta = m.qaSeries[4] - m.qaSeries[0]
  return {
    slug,
    name: m.name,
    qaW5: m.qaSeries[4],
    qaW1: m.qaSeries[0],
    delta,
    deltaClass: delta > 0.15 ? 'delta-pos' : delta < -0.15 ? 'delta-neg' : 'delta-flat',
    qa: m.qaScore,
    csat: m.continuationCsat,
    behaviour: m.behaviourContinuation.empathy,
    pa: `${m.processAdherencePct.toFixed(0)}%`,
    rr: `${m.resolutionRatePct.toFixed(0)}%`,
    topic: topCoachingTopic(m),
    status,
    badgeClass,
    criticalFailures: m.criticalFailures,
    contradiction: m.criticalFailures >= 3,
  }
}).sort((a, b) => b.criticalFailures - a.criticalFailures || a.csat - b.csat)

export const ALERT_AGENTS = FLAGGED_AGENT_SLUGS.slice(0, 3).map((slug) => {
  const m = AGENT_METRICS[slug]
  const [status, badgeClass] = statusOf(m)
  const top = m.coachingPack.cards[0]
  const second = m.coachingPack.cards[1]
  return {
    slug,
    name: m.name,
    status,
    badgeClass,
    metrics: `${m.criticalFailures} critical failure${m.criticalFailures === 1 ? '' : 's'} · QA ${m.qaScore.toFixed(1)}% · CSAT ${m.continuationCsat.toFixed(2)} · Empathy ${m.empathy.toFixed(2)}`,
    insight: `QA of ${m.qaScore.toFixed(1)}% is at or above the team average of ${TEAM_AGGREGATES.qaScore}%, so the scorecard reads clean. ${m.criticalFailures} contact${m.criticalFailures === 1 ? '' : 's'} still auto-failed on empathy, all on follow-ups to incidents that were already open.`,
    action: `${top?.title || 'Micro Coaching'} is card 1 in the pack.${top?.personalNote ? ` Their numbers: ${top.personalNote}` : ''}${second ? ` ${second.title} follows at rank 2.` : ''} Track auto-fails weekly rather than QA.`,
  }
})

export const COACHING_QUEUE = AGENT_METRIC_ORDER.map((slug) => {
  const m = AGENT_METRICS[slug]
  const cleared = m.criticalFailureSeries.slice(2).every((v) => v === 0)
  const [, badgeClass] = statusOf(m)
  const status = m.criticalFailures === 0 ? 'On Track' : cleared ? 'Improving' : 'Action Needed'
  return {
    agent: m.name,
    topic: topCoachingTopic(m),
    source: `${m.criticalFailures} auto-fail${m.criticalFailures === 1 ? '' : 's'} · CSAT ${m.continuationCsat.toFixed(2)}`,
    deployed: 'Week 2',
    status,
    badgeClass: status === 'On Track' ? 'badge-green' : status === 'Improving' ? 'badge-green' : badgeClass,
    outcome:
      m.criticalFailures === 0
        ? 'No auto-fails this period'
        : cleared
          ? `Auto-fails ${m.criticalFailureSeries.join('·')} · none since coaching`
          : `Auto-fails ${m.criticalFailureSeries.join('·')} · still occurring`,
  }
}).sort((a, b) => (a.status === 'Action Needed' ? -1 : 1) - (b.status === 'Action Needed' ? -1 : 1))

const queueCounts = COACHING_QUEUE.reduce((acc, r) => {
  acc[r.status] = (acc[r.status] || 0) + 1
  return acc
}, {})

export const COACHING_QUEUE_SUMMARY = [
  { text: `${COACHING_QUEUE.length} agents in queue`, className: 'summary-chip' },
  { text: `${queueCounts['Action Needed'] || 0} action needed`, className: 'summary-chip summary-chip-amber' },
  { text: `${queueCounts.Improving || 0} improving`, className: 'summary-chip summary-chip-green' },
  { text: `${queueCounts['On Track'] || 0} on track`, className: 'summary-chip summary-chip-green' },
]

export const FLAGGED_CALLS = [
  { callId: 'RV-OWN-000102', agent: 'Janine Jacobs', date: '2026-04-28', category: 'Booking Cancellation', flagReason: 'Continuation · high QA · CSAT 2', flagClass: 'flag-badge-gap', qaScore: '91', qaClass: 'val-amber' },
  { callId: 'RV-OWN-000103', agent: 'Janine Jacobs', date: '2026-04-30', category: 'Booking Cancellation', flagReason: 'Continuation · high QA · CSAT 1', flagClass: 'flag-badge-critical', qaScore: '90', qaClass: 'val-amber' },
  { callId: 'RV-OWN-000107', agent: 'Zanele Ndlovu', date: '2026-04-30', category: 'Rover Guarantee (Owner)', flagReason: 'Continuation · high QA · CSAT 1', flagClass: 'flag-badge-critical', qaScore: '91', qaClass: 'val-amber' },
  { callId: 'RV-SIT-000202', agent: 'Zanele Ndlovu', date: '2026-04-29', category: 'Account Standing', flagReason: 'Standing fear not named · closed without route', flagClass: 'flag-badge-gap', qaScore: '90', qaClass: 'val-amber' },
]
