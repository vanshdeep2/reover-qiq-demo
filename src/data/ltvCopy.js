export const LTV_DEFAULT_ASSUMPTION_TEXT =
  'Pet parent LTV £480 and sitter LTV £1,850 are modelled cohort values for the Rover UK marketplace. Continuation failure hits an estimated 380 members per week with a 12% churn uplift on that cohort, a deliberately conservative read: the extract shows roughly 470 continuation contacts a week rating the experience 2 or below, this figure narrows that to the members judged likely to actually churn over it. Supply-side loss uses 22 sitters abandoning onboarding weekly × 52 × £1,850. Both totals are computed live from these assumptions, change a number and Recalculate to see the totals move. All figures are estimates.'

export const RISK_LINES = [
  {
    key: 'continuationRisk',
    title: 'Continuation failure',
    label: '380 members/week · 12% churn uplift · pet parent LTV £480',
    description:
      'Members hit by continuation failure this week carry elevated churn risk. Per-contact QA still passes while CSAT collapses after contact 1.',
    legendLabel: 'Continuation failure',
    dotColor: '#c0392b',
  },
  {
    key: 'guaranteeTailRisk',
    title: 'Guarantee tail',
    label: 'Low volume · disproportionate severity',
    description:
      'Rover Guarantee is roughly 2% of contacts. External severity is outsized. A QA sample sized for the average never reaches this tail.',
    legendLabel: 'Guarantee tail',
    dotColor: '#d9534f',
  },
  {
    key: 'standingRisk',
    title: 'Account Standing',
    label: '430 contacts · 31% closed with no route',
    description:
      'Account Standing contacts closed without a resolution path drive sitter distrust and later public mentions.',
    legendLabel: 'Account Standing',
    dotColor: '#e8806f',
  },
]

/**
 * Sitter-side risk. This is not yet protected, the verification
 * next-best-action that would address it sits under "Ready to execute" on
 * Executive and has not deployed. Framed as risk (amber), not banked value
 * (green), until it actually ships.
 */
export const SUPPLY_RISK_LINES = [
  {
    key: 'totalSupplyRisk',
    title: 'Onboarding abandonment',
    label: '22 sitters/week × 52 × sitter LTV £1,850',
    description:
      'Sitters lost during onboarding after chasing background-check status with no automated update. The verification next-best-action queued in Actions would address this; it has not deployed yet, so the full modelled figure remains at risk.',
    legendLabel: 'Onboarding abandonment',
    dotColor: '#d97706',
  },
]
