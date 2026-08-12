/** Hardcoded from rover-data/master_numbers.json. Do not compute from the contact extract. */

export const LIVE_LABEL = 'Live · 5-week window'
export const CALLS_PILL = '41,500 contacts analysed'
export const EXTRACT_NOTE =
  'Contact Search carries a 2,077-record working extract of the 41,500-contact population.'

export const PERIOD_LABEL = '29 Mar - 2 May 2026'
export const WK_LABELS = ['29 Mar-4 Apr', '5-11 Apr', '12-18 Apr', '19-25 Apr', '26 Apr-2 May']
export const WK5 = WK_LABELS

export const POPULATION = {
  weeklyTotal: 8300,
  weeks: 5,
  estimatedPopulation: 41500,
  extractSize: 2077,
  voiceShare: 38.0,
  messagingShare: 62.0,
  ownerShare: 62.5,
  sitterShare: 37.5,
  firstContacts: 5940,
  continuationContacts: 2360,
  continuationShare: 28.43,
}

export const KPIS = {
  aht: { voice: 512, messaging: 388, blended: 435, targetVoice: 480, targetMessaging: 360 },
  fcr: { voice: 73.8, messaging: 69.9, blended: 71.4, target: 80.0 },
  escalation: { voice: 11.4, messaging: 7.8, blended: 9.2, target: 6.0 },
  csat: { voice: 4.0, messaging: 3.8, blended: 3.9, target: 4.4 },
  nps: { voice: 22, messaging: 15, blended: 18, target: 35 },
  rcr: { voice: 22.1, messaging: 26.2, blended: 24.6, target: 15.0 },
  transfer: { voice: 18.9, messaging: 12.3, blended: 14.8, target: 10.0 },
}

/** Aliases for healthScore.js (DoorDash component contract). */
export const ACTUAL_AHT = KPIS.aht.blended
export const FCR = KPIS.fcr.blended
export const ESC_RATE = KPIS.escalation.blended
export const TR_RATE = KPIS.transfer.blended
export const RCR_RATE = KPIS.rcr.blended
export const ER_TARGET = KPIS.escalation.target
export const TR_TARGET = KPIS.transfer.target
export const RCR_TARGET = KPIS.rcr.target
export const CSAT = KPIS.csat.blended

export const DEFAULTS = {
  targetAht: Math.round(0.38 * KPIS.aht.targetVoice + 0.62 * KPIS.aht.targetMessaging),
  costPerMin: 0.35,
  escMultiplier: 1.5,
  weeklyCalls: POPULATION.weeklyTotal,
}

/**
 * Blended CSAT is flat across the period. The contact extract shows the same
 * shape (weekly 3.57, 3.50, 3.46, 3.57, 3.49), and week 5 lands on the master
 * blended value of 3.9. Do not draw a recovery curve here: population-level
 * CSAT has not moved yet, and claiming otherwise breaks against the extract.
 * The metric that does respond to coaching is CRITICAL_FAILURES.
 */
export const FIVE_WEEK_TREND = {
  weeks: WK_LABELS,
  csat: [3.95, 3.92, 3.88, 3.92, 3.9],
  rcr: [19.8, 21.4, 22.9, 24.1, 24.6],
  escalation: [7.1, 7.8, 8.4, 8.9, 9.2],
}

/**
 * aht and fcr weekly shapes were already anchored to the master week-5 KPI values.
 * transfer and nps below are new, illustrative interpolations that end exactly on
 * the master current-week blended value (KPIS.transfer.blended, KPIS.nps.blended)
 * so week 5 always reconciles. They are not separately sourced weekly figures.
 */
export const TREND = {
  csat: FIVE_WEEK_TREND.csat,
  rcr: FIVE_WEEK_TREND.rcr,
  esc: FIVE_WEEK_TREND.escalation,
  aht: [448, 442, 439, 437, 435],
  fcr: [74.2, 73.5, 72.8, 72.0, 71.4],
  transfer: [13.2, 13.8, 14.1, 14.5, 14.8],
  nps: [24, 22, 20, 19, 18],
}

/**
 * The Micro Coaching intervention story. Deployed after week 1 quality mining
 * surfaced the empathy gap on continuation contacts (see hero narrative).
 * Critical failure counts and CSAT are the two metrics that respond
 * directly and quickly to coaching; the blended population-wide KPIs above take
 * longer to recover, which is realistic for a 41,500-contact/week population and
 * is exactly why leading indicators matter.
 */
export const COACHING_WEEK_INDEX = 1 // week 2, 0-indexed

export const CRITICAL_FAILURES = {
  weekly: [7, 6, 3, 1, 0],
  totalThisPeriod: 17,
  currentWeek: 0,
  peakWeek: 7,
  category:
    'Empathy gaps on late-cancellation continuation contacts, Account Standing closures without a route forward, and delayed Trust & Safety responses',
}

/**
 * Weekly CSAT, computed from the contact extract. This is the
 * lagging indicator: it has started to move but has not recovered. Do not
 * overstate it. The metric that responds fast to coaching is CRITICAL_FAILURES.
 */
export const CONTINUATION_CSAT_RECOVERY = {
  weekly: [1.7, 1.77, 1.68, 1.8, 1.88],
  startValue: 1.7,
  currentValue: 1.88,
}

/** Continuation QA by week. Flat throughout, which is the entire point. */
export const CONTINUATION_QA_WEEKLY = [89.4, 88.5, 89.0, 87.9, 89.7]

/**
 * Real figure computed from the 2,077-record extract: 77 of 294 Booking
 * Cancellation contacts this week were continuation contacts scoring empathy
 * below 2.5. Not a master_numbers.json figure, but not invented either.
 */
export const EMPATHY_GAP_STAT = {
  category: 'Booking Cancellation',
  categoryVolume: 294,
  affectedCount: 77,
  affectedSharePct: 26.2,
}

/** Computed from the extract: 1,501 first contacts vs 576 continuation contacts. */
export const FIRST_VS_CONTINUATION = {
  csat: { first: 4.2, continuation: 1.8 },
  ahtSeconds: { first: 423, continuation: 155 },
  behaviourScore: { first: 4.3, continuation: 2.8 },
  qaScorecardPct: { first: 92.3, continuation: 88.9 },
  // Continuation contacts run shorter and score lower on both process
  // adherence and resolution than first contacts - agents move faster and
  // resolve less on the follow-up, which is part of the same failure mode.
  processAdherencePct: { first: 97, continuation: 94 },
  resolutionRatePct: { first: 91, continuation: 85 },
}

export const QUALITY_OUTCOME_MATRIX = {
  overallQaAveragePct: 91.2,
  rows: [
    { label: 'Followed + Resolved', high: 3980, med: 1210, low: 1140 },
    { label: 'Followed + Not Resolved', high: 210, med: 480, low: 690 },
    { label: 'Not Followed + Resolved', high: 190, med: 140, low: 95 },
    { label: 'Not Followed + Not Resolved', high: 25, med: 60, low: 80 },
  ],
  headlineCell: {
    label: 'Followed + Resolved + Low CSAT',
    contacts: 1140,
    shareOfTotalPct: 13.7,
    continuationShareOfCellPct: 68,
    qaAveragePct: 89.6,
  },
}

export const FINANCIAL_ESTIMATES = {
  petParentLtvGbp: 480,
  sitterLtvGbp: 1850,
  membersHitByContinuationFailureThisWeek: 380,
  estimatedChurnUpliftOnCohortPct: 12,
  annualisedRevenueAtRiskGbp: 1400000,
  supplySideLossFromOnboardingAbandonmentGbp: 2100000,
}

export const OVERALL_QA_PCT = 91.2

export const PERIOD_WEEKS = 5
export const REPEAT_CONTACTS = 380
export const UNNECESSARY_ESCALATIONS = Math.round(POPULATION.weeklyTotal * (ESC_RATE / 100))
export const PAYMENT_CONTACTS = 940
export const MERCHANT_CHURN_PROXY = 15

/**
 * Weekly taxonomy from master_numbers (owner + sitter top drivers).
 * subDrivers is a level-2 breakdown within each category. Volumes sum to the
 * parent row's volume; FCR/AHT/signal are illustrative, not separately sourced
 * figures, since master_numbers.json only carries category-level totals.
 */
export const DRIVER_ROWS = [
  {
    name: 'Booking Cancellation', volume: 1180, share: 14.2, fcr: 72, aht: 520, esc: 11,
    subDrivers: [
      { name: 'Sitter cancelled late', volume: 520, share: 44.1, fcr: 61, aht: 610, signal: 'Primary driver' },
      { name: 'Owner cancellation', volume: 380, share: 32.2, fcr: 88, aht: 420, signal: 'Stable volume' },
      { name: 'Replacement search', volume: 280, share: 23.7, fcr: 58, aht: 540, signal: 'Primary driver' },
    ],
  },
  {
    name: 'Refund & Fees', volume: 940, share: 11.3, fcr: 68, aht: 480, esc: 10,
    subDrivers: [
      { name: 'Cancellation fee dispute', volume: 410, share: 43.6, fcr: 55, aht: 510, signal: 'Primary driver' },
      { name: 'Refund not received', volume: 330, share: 35.1, fcr: 71, aht: 460, signal: 'Watch' },
      { name: 'Partial refund query', volume: 200, share: 21.3, fcr: 82, aht: 420, signal: 'Stable volume' },
    ],
  },
  {
    name: 'Booking Changes', volume: 860, share: 10.4, fcr: 75, aht: 410, esc: 8,
    subDrivers: [
      { name: 'Date change', volume: 340, share: 39.5, fcr: 79, aht: 390, signal: 'Stable volume' },
      { name: 'Extend stay', volume: 220, share: 25.6, fcr: 74, aht: 400, signal: 'Watch' },
      { name: 'Add pet', volume: 160, share: 18.6, fcr: 88, aht: 330, signal: 'Stable volume' },
      { name: 'Service change', volume: 140, share: 16.3, fcr: 61, aht: 480, signal: 'Primary driver' },
    ],
  },
  {
    name: 'Payouts', volume: 720, share: 8.7, fcr: 70, aht: 390, esc: 9,
    subDrivers: [
      { name: 'Payout delayed', volume: 400, share: 55.6, fcr: 58, aht: 430, signal: 'Primary driver' },
      { name: 'Payout missing', volume: 180, share: 25.0, fcr: 64, aht: 450, signal: 'Primary driver' },
      { name: 'Bank details update', volume: 140, share: 19.4, fcr: 93, aht: 280, signal: 'Stable volume' },
    ],
  },
  {
    name: 'Verification', volume: 610, share: 7.3, fcr: 65, aht: 285, esc: 7,
    subDrivers: [
      { name: 'Background check status', volume: 340, share: 55.7, fcr: 52, aht: 310, signal: 'Process dependency' },
      { name: 'ID verification failed', volume: 160, share: 26.2, fcr: 61, aht: 290, signal: 'Process dependency' },
      { name: 'Document resubmission', volume: 110, share: 18.0, fcr: 88, aht: 230, signal: 'Stable volume' },
    ],
  },
  {
    name: 'Account Standing', volume: 430, share: 5.2, fcr: 58, aht: 360, esc: 18,
    subDrivers: [
      { name: 'Penalty applied', volume: 150, share: 34.9, fcr: 51, aht: 380, signal: 'Primary driver' },
      { name: 'Follow-through rate query', volume: 120, share: 27.9, fcr: 55, aht: 360, signal: 'Primary driver' },
      { name: 'Appeal request', volume: 100, share: 23.3, fcr: 49, aht: 400, signal: 'Primary driver' },
      { name: 'Suspension', volume: 60, share: 14.0, fcr: 62, aht: 310, signal: 'Primary driver' },
    ],
  },
]

export const CROSS_KPI_PATTERNS = [
  {
    label: 'Cross-KPI Pattern 1',
    headline: 'Late cancellation: continuation contacts pass QA and collapse CSAT',
    body: 'First-contact CSAT 4.2 vs continuation 1.8 while QA barely moves, 92.3% to 89.0%. Per-contact scorecards cannot see the incident trail.',
    rootCause:
      'Week 1 quality mining flagged a specific behavioural gap rather than a process one: agents handling continuation contacts on late-cancellation incidents were procedurally correct but showed no acknowledgement of the incident history. The pattern was most visible on Janine Jacobs and Zanele Ndlovu, both scoring above 88% QA while CSAT sat near 1.8. Micro Coaching card 1, open with the incident not the ticket, was deployed to the most exposed agents and the wider team from week 2. Critical failures fell from 7 to 0 over the following four weeks while QA held flat throughout. CSAT has begun to move, 1.70 to 1.88, and is the lagging indicator to watch next period.',
    trend: {
      title: 'CSAT · 5-week',
      weeks: WK_LABELS,
      data: [1.7, 1.77, 1.68, 1.8, 1.88],
      color: '#2a4fa8',
      coachingWeekIndex: 1,
    },
    driversTable: {
      columns: ['Agent or cohort', 'Detail'],
      rows: [
        { a: 'Janine Jacobs', b: '4 critical failures, the most of any agent · cards 1 and 3 deployed week 2' },
        { a: 'Zanele Ndlovu', b: '3 critical failures · cards 1 and 2 deployed week 2' },
        { a: 'Team-wide', b: 'Card 1 rolled out to all 10 agents by week 3 · 0 critical failures since week 5' },
      ],
    },
  },
  {
    label: 'Cross-KPI Pattern 2',
    headline: 'Guarantee claim: passes QA, then CSAT falls off a cliff',
    body: 'Only 2% of contacts, but a denial on technical grounds ends in CSAT of 1-2 with no external appeal route. A QA sample sized for the average never reaches this tail.',
    rootCause:
      'Incident INC-2026-0392 opened well: the sitter reporting the incident and the owner confirming it both scored CSAT 5 and QA above 95%. The claim was then denied on technical grounds, the 14-day claim window, the 30-day treatment window, and exclusions for pre-existing or undetermined-cause conditions, with no external appeal route. The next two contacts, the owner and sitter reacting to the denial, scored CSAT 1 and 2 while QA still sat at 91-92%. This is a policy design issue, not a service failure. At roughly 2% of contacts, a QA sample sized for the average will never carry enough volume from this tail to see it.',
    trend: {
      title: 'Guarantee claim CSAT · contact sequence',
      weeks: ['Contact 1', 'Contact 2', 'Contact 3', 'Contact 4'],
      data: [5, 5, 1, 2],
      color: '#c0392b',
    },
    driversTable: {
      columns: ['Contact', 'Detail'],
      rows: [
        { a: 'Contact 1 · sitter reports incident', b: 'CSAT 5 · QA 96% · voice' },
        { a: 'Contact 2 · owner confirms', b: 'CSAT 5 · QA 95% · voice' },
        { a: 'Contact 3 · claim denied (owner)', b: 'CSAT 1 · QA 91% · messaging' },
        { a: 'Contact 4 · claim denied (sitter)', b: 'CSAT 2 · QA 92% · messaging' },
      ],
    },
  },
  {
    label: 'Cross-KPI Pattern 3',
    headline: 'Account Standing: leads external mentions by 9 days',
    body: 'Internal volume spikes first (correlation 0.81). Public themes of unexplained penalties and closed tickets follow.',
    rootCause:
      'A platform fault wrongly downgrading sitter follow-through rates produced a clear internal signal in week 3: Account Standing contacts rose sharply, 31% closed with no resolution path offered, and repeat contact rate on that cohort hit 44% against a 24.6% overall average. The same theme, unexplained penalties with no appeal route, surfaced publicly nine days later. That lag is the product. The internal signal is an early warning of external reputational damage, which is the argument for why internal and external VOC need to sit in one view.',
    trend: {
      title: 'Account Standing contacts · 5-week',
      weeks: WK_LABELS,
      data: [82, 88, 95, 101, 113],
      color: '#c0392b',
    },
    driversTable: {
      columns: ['Signal', 'Detail'],
      rows: [
        { a: 'Internal spike', b: 'Begins week 3 · closed-no-resolution share 31%' },
        { a: 'External mentions', b: '84 this week, up from 31 the week prior' },
        { a: 'Correlation and lag', b: '0.81 correlation · external mentions peak 9 days after the internal spike' },
      ],
    },
  },
  {
    label: 'Cross-KPI Pattern 4',
    headline: 'Verification onboarding: status chasing burns supply',
    body: '610 verification contacts weekly; 250 are avoidable status chases. 22 sitters abandon onboarding weekly at £1,850 LTV.',
    rootCause:
      'This is a process and product gap, not a behavioural one, so it will not respond to Micro Coaching the way Pattern 1 does. Root cause is the absence of proactive status communication during verification: every status-chasing contact is a contact that would not exist if the sitter had simply been told where their application stood. 41% of verification contacts are pure status chasing, adding an average 3.2 days to sitter activation and running 168 sitters weekly past their intended start date.',
    trend: {
      title: 'Sitters abandoning onboarding weekly',
      weeks: WK_LABELS,
      data: [18, 19, 21, 22, 22],
      color: '#d97706',
    },
    driversTable: {
      columns: ['Item', 'Detail'],
      rows: [
        { a: 'Root cause', b: 'No proactive status communication during verification' },
        { a: 'NBA', b: 'Automated status updates at each stage · estimated 250 weekly contacts deflected' },
        { a: 'Owner', b: 'Product and Onboarding, not agent behaviour · not a coaching fix' },
      ],
    },
  },
]

export const HERO_CHIPS = [
  {
    text: 'CSAT 1.8 vs first contact 4.2',
    className: 'chip-red',
    dotColor: '#fca5a5',
  },
  {
    text: 'QA still 88.9% on continuation contacts',
    className: 'chip-amber',
    dotColor: '#fbbf24',
  },
  {
    text: 'Overall QA 91.2% looks healthy',
    className: 'chip-green',
    dotColor: '#4ade80',
  },
]
