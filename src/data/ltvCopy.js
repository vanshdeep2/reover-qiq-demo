export const LTV_DEFAULT_ASSUMPTION_TEXT =
  'Pet parent LTV £480 and sitter LTV £1,850 are modelled cohort values for the Rover UK marketplace. Continuation failure risk uses 380 members per week with a 12% churn uplift, a deliberately conservative read of the extract. Micro Coaching value protected uses a broader Estimate of 900 pet parents reached weekly once coaching is team-wide, with a 70% protection rate over the four coaching weeks (weeks 2-5). Supply-side loss uses 22 sitters abandoning onboarding weekly × 52 × £1,850. All totals are computed live from these assumptions. Change a number and Recalculate to see them move. All figures are estimates.'

export const RISK_LINES = [
  {
    key: 'periodContinuationRisk',
    title: 'Continuation failure',
    label: '380 members/week · 12% churn uplift · pet parent LTV £480 · 5 weeks',
    description:
      'Members hit by continuation failure this week carry elevated churn risk. Per-contact QA still passes while CSAT collapses after contact 1. Figure shown for the current 5-week reporting window.',
    legendLabel: 'Continuation failure',
    dotColor: '#c0392b',
  },
  {
    key: 'periodGuaranteeRisk',
    title: 'Guarantee tail',
    label: 'Low volume · disproportionate severity · 5 weeks',
    description:
      'Rover Guarantee is roughly 2% of contacts. External severity is outsized. A QA sample sized for the average never reaches this tail. Figure shown for the current 5-week reporting window.',
    legendLabel: 'Guarantee tail',
    dotColor: '#d9534f',
  },
  {
    key: 'periodStandingRisk',
    title: 'Account Standing',
    label: '430 contacts · 31% closed with no route · 5 weeks',
    description:
      'Account Standing contacts closed without a resolution path drive sitter distrust and later public mentions. Figure shown for the current 5-week reporting window.',
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
    key: 'periodSupplyRisk',
    title: 'Onboarding abandonment',
    label: '22 sitters/week × sitter LTV £1,850 · 5 weeks',
    description:
      'Sitters lost during onboarding after chasing background-check status with no automated update. The verification next-best-action queued in Actions would address this; it has not deployed yet, so the full modelled figure remains at risk. Figure shown for the current 5-week reporting window.',
    legendLabel: 'Onboarding abandonment',
    dotColor: '#d97706',
    valueClass: 'val-amber',
  },
]

/** Combined pet-parent + sitter at-risk lines for the single risk card / drawer. */
export const AT_RISK_LINES = [
  ...RISK_LINES.map((line) => ({ ...line, valueClass: line.valueClass ?? 'val-red' })),
  ...SUPPLY_RISK_LINES,
]

/** Colour key for which marketplace side each at-risk donut colour family means. */
export const AT_RISK_SIDE_LEGEND = [
  { label: 'Pet parent LTV', color: '#c0392b' },
  { label: 'Sitter LTV', color: '#d97706' },
]

/**
 * Micro Coaching GBP slices that sum to periodProtected (same relative weights
 * as pet-parent at-risk). Estimate; presentation split of the 5-week total.
 */
export const COACHING_VALUE_LINES = [
  {
    key: 'periodContinuationProtected',
    title: 'Continuation failure',
    label: 'Share of 5-week value protected from continuation-failure retention',
    description:
      'Largest share of Micro Coaching value protected in the current 5-week window. Mirrors the continuation-failure weight used on the at-risk donut. Estimate.',
    legendLabel: 'Continuation failure',
    dotColor: '#1a7a4a',
    format: 'gbp',
  },
  {
    key: 'periodGuaranteeProtected',
    title: 'Guarantee tail',
    label: '12% of base protected value (same weight as at-risk) · 5 weeks',
    description:
      'Value protected on Guarantee-related continuation risk after coaching in the current 5-week window. Estimate, presentation split of the period total.',
    legendLabel: 'Guarantee tail',
    dotColor: '#228b5a',
    format: 'gbp',
  },
  {
    key: 'periodStandingProtected',
    title: 'Account Standing',
    label: '10% of base protected value (same weight as at-risk) · 5 weeks',
    description:
      'Value protected on Account Standing-related continuation risk after coaching in the current 5-week window. Estimate, presentation split of the period total.',
    legendLabel: 'Account Standing',
    dotColor: '#4ade80',
    format: 'gbp',
  },
]
