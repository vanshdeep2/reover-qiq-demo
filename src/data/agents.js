/**
 * Agent profiles. All performance numbers are derived from agentMetrics.js,
 * which is generated from the contact extract by
 * rover-data/scripts/build_agent_metrics.py. Nothing here is authored.
 *
 * Only qualitative copy (status thresholds, note threads) is written by hand.
 */
import {
  AGENT_METRICS,
  AGENT_METRIC_ORDER,
  CARD_SHAPE_LABELS,
  COACHING_WEEK_INDEX,
  FLAGGED_AGENT_SLUGS,
  TEAM_AGGREGATES,
  WK_LABELS,
} from './agentMetrics'

export { WK_LABELS, COACHING_WEEK_INDEX, TEAM_AGGREGATES, FLAGGED_AGENT_SLUGS, CARD_SHAPE_LABELS }

export const AGENT_ORDER = AGENT_METRIC_ORDER

export const AGENT_SLUGS = Object.fromEntries(
  AGENT_METRIC_ORDER.map((slug) => [AGENT_METRICS[slug].name, slug]),
)

/**
 * Team-wide card library, kept for the coaching-adoption rollup. Per-agent packs
 * live on each agent as `coachingPack` and are selected from this same library
 * by the gap detector, so the two never drift apart.
 */
export const MICRO_COACHING_CARDS = [
  {
    id: 'card_1_open_with_incident',
    title: 'Open with the incident, not the ticket',
    body: 'Read incident history before responding to a continuation contact. The member is not starting from zero.',
  },
  {
    id: 'card_2_match_register',
    title: 'Match the register to the history, not the request',
    body: 'A routine-sounding question attached to a serious incident is not a routine contact. Adjust tone and ownership accordingly.',
  },
  {
    id: 'card_3_route_forward',
    title: 'Never close without a route forward',
    body: 'Name the owner and the timeframe before closing, even when policy stops full resolution.',
  },
  {
    id: 'card_4_say_unspoken',
    title: 'Say the thing they have not asked',
    body: 'Sitters after an incident are usually worried about standing even when they do not raise it. Address it before they have to.',
  },
  {
    id: 'card_5_acknowledge_effort',
    title: 'Acknowledge the effort before the answer',
    body: 'When a member says they have contacted before, acknowledge the repeat specifically before moving to the answer.',
  },
]

/** Status is derived from real critical failures and CSAT. */
function statusFor(m) {
  if (m.criticalFailures >= 3) return 'Action Needed'
  if (m.criticalFailures >= 1 || m.continuationCsat < TEAM_AGGREGATES.continuationCsat) return 'Watch'
  return 'On Track'
}

export const AGENTS = Object.fromEntries(
  AGENT_METRIC_ORDER.map((slug) => {
    const m = AGENT_METRICS[slug]
    const firstName = m.name.split(' ')[0]

    return [
      slug,
      {
        ...m,
        status: statusFor(m),
        // legacy aliases for the Operations and Quality screens
        qa_w5: m.qaScore,
        qa_w1: m.qaSeries[0],
        qa_series: m.qaSeries,
        pa: m.processAdherencePct,
        rr: m.resolutionRatePct,
        cf: m.criticalFailures,
        csat_w5: m.csat,
        behaviour_w5: m.behaviourContinuation.empathy,

        /**
         * Team-lead-facing views only (Operations page and the TL modal).
         * These carry quality context that is deliberately not shown to the
         * agent themselves. The agent sees coachingPack instead.
         */
        insight:
          m.criticalFailures > 0
            ? `${m.name} averages ${m.qaScore.toFixed(1)}% QA across ${m.volume} contacts, at or above the team average of ${TEAM_AGGREGATES.qaScore}%. On follow-up contacts the same work scores ${m.continuationQa.toFixed(1)}% QA against a CSAT of ${m.continuationCsat.toFixed(2)}. ${m.criticalFailures} contact${m.criticalFailures === 1 ? '' : 's'} auto-failed on empathy despite passing on process.`
            : `${m.name} averages ${m.qaScore.toFixed(1)}% QA across ${m.volume} contacts with no auto-fails this period. Follow-up CSAT of ${m.continuationCsat.toFixed(2)} against ${m.firstCsat.toFixed(2)} on first contacts is the remaining gap, and it is a team-wide pattern.`,
        coaching: m.coachingPack.cards.map((card) => ({
          topic: card.title,
          type: card.priorityRank === 1 ? 'priority' : 'development',
          content: card.coachingFocus,
          evidence: `Rank ${card.priorityRank} · ${card.affectedKpis.join(', ')}`,
          cheatCodeId: card.cardId,
          lms: null,
        })),
        notes:
          m.criticalFailures >= 3
            ? [
                {
                  from: 'Kagiso de Villiers',
                  role: 'Team Lead',
                  date: '2026-04-28',
                  message: `${firstName} - your QA is ${m.qaScore.toFixed(1)}%, which is fine. The gap is the ${m.criticalFailures} contacts that auto-failed on empathy, all of them follow-ups on something already open. The cards this week are built around that.`,
                },
                {
                  from: m.name,
                  role: 'Agent',
                  date: '2026-04-29',
                  message:
                    'Understood. I will open with what already happened and name a route forward before closing.',
                },
              ]
            : [
                {
                  from: 'Kagiso de Villiers',
                  role: 'Team Lead',
                  date: '2026-04-28',
                  message: `First-contact quality is solid at ${m.firstCsat.toFixed(2)} CSAT. The risk sits in contacts 2 and 3, where the team average is ${TEAM_AGGREGATES.continuationCsat.toFixed(2)}. Keep working the cards.`,
                },
              ],
      },
    ]
  }),
)

export const DEFAULT_SLUG = FLAGGED_AGENT_SLUGS[0]

export const SPARK_DATA = AGENT_METRIC_ORDER.map((slug) => {
  const m = AGENT_METRICS[slug]
  return {
    name: m.name,
    slug,
    w5: m.qaSeries[m.qaSeries.length - 1],
    series: m.qaSeries,
  }
})

export const SPARK_PREVIEW_SLUGS = FLAGGED_AGENT_SLUGS.slice(0, 4)
