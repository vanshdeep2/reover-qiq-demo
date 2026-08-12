/** Cross-VOC page constants from master_numbers.json and build plan themes. Synthetic copy only. */

export const EXTERNAL_VOC = {
  trustpilotUkRating: 4.5,
  trustpilotUkLabel: 'Excellent',
  trustpilotUkReviewCount: 34400,
  source: 'https://uk.trustpilot.com/review/rover.com',
}

export const INTERNAL_VOC_STRIP = [
  {
    id: 'delivery',
    title: 'Sitter Cancellations & Replacement Search',
    theme: 'A sitter cancels close to the stay and the owner is left to re-book a stranger with their pet already due for drop-off',
    volumeNote: 'Booking Cancellation + Refund & Fees ~25% of weekly contacts',
    workaround: 'Owners booking a backup sitter in parallel on a second Rover search because they do not trust the in-app replacement flow to find someone in time.',
    evidence: 'A late sitter cancellation produces a first contact scoring CSAT 5 and QA 94%, then a continuation contact from the same owner scoring CSAT 1-2 while QA still holds at 90-91%. The scorecard cannot see the second contact is the same emergency, the pet still needs a sitter.',
    action: 'Micro Coaching card 1, open every continuation contact with the incident, deployed week 2 to the agents most exposed to this pattern. Weekly critical failures are down from 7 to 0. CSAT has started to move, 1.70 to 1.88.',
  },
  {
    id: 'onboarding',
    title: 'Sitter Background Check & Verification',
    theme: 'New sitters chasing where their background check stands before Rover will let them accept bookings',
    volumeNote: 'Verification ~7.3% of contacts; 41% are status chasing',
    workaround: 'Sitters pinging friends already live on the platform in Rover community groups for unofficial turnaround times.',
    evidence: '610 verification contacts weekly, roughly 250 of which are pure status chases that add no new information, just a request for an update on the background check. This adds an average 3.2 days to sitter activation and runs 168 sitters weekly past their intended start date, unable to accept their first booking.',
    action: 'A verification next-best-action, automated status updates at each stage of the background check, is queued for deployment. Modelled to deflect an estimated 250 weekly contacts and protect roughly 22 sitters a week from abandoning onboarding before ever taking a booking.',
  },
  {
    id: 'performance',
    title: 'Account Standing & Sitter Metrics',
    theme: 'A platform bug misreads sitter follow-through and drops good sitters into penalty territory',
    volumeNote: 'Account Standing spike at 430 contacts this week',
    workaround: 'Sitters screenshotting their own completed-stay history because they expect to have to prove their standing later when Rover disputes it.',
    evidence: 'A platform fault wrongly downgraded sitter follow-through rates from week 3. 31% of Account Standing contacts closed with no resolution path, and repeat contact rate on that cohort hit 44% against a 24.6% overall average, sitters calling back because the same wrong number is still on their profile.',
    action: 'The platform fault has been identified and a fix is in progress. We are extending Micro Coaching to Account Standing decision-making from week 6, starting with requiring a named owner and timeframe before any closure.',
  },
  {
    id: 'policy',
    title: 'Rover Guarantee Claims',
    theme: 'A vet-bill claim under the Rover Guarantee gets denied on a technicality the owner never saw coming',
    volumeNote: 'Rover Guarantee ~2% of contacts, disproportionate severity',
    workaround: 'Owners screenshotting the Guarantee terms page before filing, expecting to have to argue the exclusions themselves.',
    evidence: 'A Guarantee claim opens at CSAT 5 and QA 96%, then drops to CSAT 1-2 once the claim is denied on technical grounds, the 14-day claim window, vet-visit treatment window, and pre-existing-condition exclusions, with no route to appeal.',
    action: 'This is a policy design issue rather than a service failure, so it will not respond to coaching. Every Guarantee claim is now pulled into a dedicated review outside the standard QA sample so this tail is not averaged away against the rest of the book.',
  },
  {
    id: 'intent',
    title: 'Owners and Sitters Asking for a Human',
    theme: 'Members pushing past chatbot and templated replies to reach an agent who can actually look at their booking',
    volumeNote: 'Escalation rate 9.2% blended vs 6% target',
    workaround: 'Leaving a public Trustpilot or App Store reply as a second channel when the in-app ticket on their booking goes quiet.',
    evidence: 'Escalation rate has risen every week of the period, concentrated on Account Standing (18% escalation, the highest of any category) as sitters push past automated and first-line replies to get a straight answer on their standing.',
    action: 'Tracking alongside the Account Standing fix. As closures move to a named-owner standard, we expect escalations driven by dead-end automated replies to ease over the following weeks.',
  },
]

export const EXTERNAL_VOC_STRIP = [
  {
    id: 'brand',
    title: 'Trustpilot UK Brand Sentiment',
    summary: 'Aggregate Trustpilot remains Excellent at 4.5. The complaint tail is absorbed by volume of positive stay and sit reviews.',
    evidence: '34,400 UK reviews averaging 4.5/5, most of them owners praising a sitter for a specific stay. The aggregate looks healthy in exactly the way overall QA at 91.2% looks healthy, both are averaging over the same small, severe tail: Account Standing and Guarantee claims.',
    action: 'No direct fix, this is the reason the tail-specific issues (Guarantee, Account Standing) get pulled into dedicated review rather than judged against the aggregate.',
  },
  {
    id: 'effort',
    title: 'No Clear Route to a Human on Account Standing',
    summary: 'Sitters describe no clear route to a human when account restoration or standing appeals stall after a Rover-side penalty.',
    evidence: 'Recurring theme in review text: sitters escalate to public channels specifically because private tickets on Account Standing and appeals go quiet with no named owner following up.',
    action: 'Route-forward standard being applied to Account Standing closures from week 6, no close without an owner and a timeframe.',
  },
  {
    id: 'service',
    title: 'Public Reply Speed vs Private Ticket Speed',
    summary: 'Rover\'s public Trustpilot and App Store replies often outpace private ticket updates on the same account, which members read as reputation management rather than investigation.',
    evidence: 'The gap between a fast public reply and a stalled private ticket is one of the clearest signals in the external data, members explicitly call it out as reputation management on their Account Standing case.',
    action: 'Being addressed as part of the same Account Standing route-forward fix, aligning the speed of private ticket updates with the speed of public replies.',
  },
  {
    id: 'issue',
    title: 'Penalties and Deactivations Without Appeal',
    summary: 'Themes include follow-through penalties applied after platform faults with cases closed, and sitter deactivation with no meaningful appeal route.',
    evidence: 'A sitter follow-through rate downgraded by a confirmed system bug, Rover support acknowledging the fault in a reply but closing the case with no follow-up or reinstatement.',
    action: 'Platform fault identified, fix in progress. Micro Coaching extending to Account Standing decision-making from week 6.',
  },
  {
    id: 'channel',
    title: 'Trust & Safety Response During Live Incidents',
    summary: 'Trust & Safety latency during live incidents, an injured pet, a no-show sitter, surfaces alongside late cancellations close to the stay date.',
    evidence: 'Members describe Trust & Safety tickets left open during live incidents with their pet already in someone\'s care, compounding the same continuation-contact pattern driving the CSAT collapse on late cancellations.',
    action: 'Same Micro Coaching mechanism as the late-cancellation fix, prioritise acknowledging the incident history before anything else on reopened Trust & Safety tickets.',
  },
  {
    id: 'competitive',
    title: 'Fee Pressure from Pawshake and New UK Entrants',
    summary: 'Fee pressure from UK competitors appears externally with almost no matching internal contact volume.',
    evidence: 'Rover charges a 10-15% owner service fee capped at £49 per booking. Pawshake takes roughly 19% sitter-side with lower owner fees, and newer UK entrants advertise 0% owner fee. Owners and sitters who leave over price rarely contact support first, they just book elsewhere next time.',
    action: 'Not a service or QA issue, flagged for Product and Pricing rather than Operations. Included here because it would be invisible without the external signal.',
  },
]

/**
 * Issues that show up in both the internal contact data and external Trustpilot
 * signal, shown together on Executive as one clickable card summarising what we
 * found and the action taken. Detail figures trace to storyline_3 / financial
 * estimates in master_numbers.json and the Micro Coaching deployment.
 */
export const COMBINED_VOC_ISSUES = {
  title: 'Issues found in both signals, and how we\'re fixing them',
  items: [
    {
      id: 'account-standing',
      title: 'Account Standing',
      summary: 'Internal spike leads external mentions by 9 days at 0.81 correlation.',
      internal: '430 Account Standing contacts this week, 31% closed with no resolution path, ownership behaviour scoring 1.9. Root cause is a platform fault wrongly downgrading sitter follow-through rates.',
      external: 'External mentions of unexplained penalties rose from 31 to 84 in the same week, nine days after the internal spike began.',
      action: 'Platform fault identified, fix in progress. Micro Coaching cards extending to Account Standing decision-making from week 6, requiring a named owner and timeframe on every closure before it can be marked resolved.',
      status: 'Fix in progress · coaching begins week 6',
    },
    {
      id: 'continuation',
      title: 'Continuation contacts',
      summary: 'Lowest-scoring group internally; the same friction shows up externally as effort and no clear route to a human.',
      internal: 'CSAT sat at 1.70 in week 1 against 4.22 on first contact, while QA held at 88-90% throughout, the gap per-contact scoring cannot see. 26% of Booking Cancellation contacts showed this pattern, 7 severe enough to be logged as critical failures.',
      external: 'Members describe no clear route to a human when a follow-up on an already-open issue stalls, read publicly as the company not caring rather than a process gap.',
      action: 'Micro Coaching card 1 (open with the incident, not the ticket) deployed team-wide from week 2. Critical failures down 7 → 0. CSAT moving 1.70 → 1.88, the lagging indicator to watch.',
      status: 'Critical failures cleared · live team-wide since week 2',
    },
  ],
}

export const SIGNAL_RECONCILIATION = [
  {
    title: 'Account Standing',
    internal: 'Internal spike: 430 contacts this week, 31% closed with no resolution path, ownership behaviour 1.9.',
    external: 'External mentions of unexplained penalties rose from 31 to 84 in the same week.',
    meaning: 'Internal leads external by 9 days at correlation 0.81. The instruments agree; timing differs.',
  },
  {
    title: 'Rover Guarantee',
    internal: 'Internal volume is low at roughly 2% of contacts.',
    external: 'External severity is disproportionate: claims denied on technical windows and exclusions.',
    meaning: 'A QA sample sized for the average never reaches this tail. Low volume is not low risk.',
  },
  {
    title: 'Competitive / fee pressure',
    internal: 'Almost no internal contact-volume equivalent.',
    external: 'Fee comparisons with Pawshake and zero-owner-fee entrants show up in public channels.',
    meaning: 'Members who leave over price do not ring support first. They leave and say why outside.',
  },
]

export const RISK_REGISTER = [
  {
    risk: 'Continuation failure on high-severity incidents',
    evidence: 'First-contact CSAT 4.2 vs continuation 1.8; QA still 88.9% on continuation',
    confidence: '92%',
    owner: 'CCM + Team Leads',
  },
  {
    risk: 'Account Standing closed without a route forward',
    evidence: '31% of Account Standing contacts closed with no resolution path; external lag 9 days',
    confidence: '88%',
    owner: 'Trust & Safety ops',
  },
  {
    risk: 'Verification onboarding abandonment',
    evidence: '250 avoidable weekly contacts; 22 sitters abandoning onboarding weekly',
    confidence: '90%',
    owner: 'Sitter growth / onboarding',
  },
  {
    risk: 'Guarantee tail invisible to QA sampling',
    evidence: '2% contact share vs outsized external severity',
    confidence: '86%',
    owner: 'Policy + Quality',
  },
]

export const ACTION_AGENDA = [
  {
    rank: 1,
    title: 'Verification next-best-action',
    detail: 'Deflect an estimated 250 weekly status-chasing contacts and cut days added to activation.',
    estimateLabel: 'Estimate',
  },
  {
    rank: 2,
    title: 'Deploy the four Micro Coaching cards',
    detail: 'Incident-first opens, register matching, named route forward, and naming unspoken standing fears.',
    estimateLabel: null,
  },
  {
    rank: 3,
    title: 'Route-forward standard on Account Standing',
    detail: 'No close without owner and timeframe when standing or penalties are in dispute.',
    estimateLabel: null,
  },
  {
    rank: 4,
    title: 'Guarantee tail review outside the QA sample',
    detail: 'Pull every Guarantee contact into a dedicated review so severity is not averaged away.',
    estimateLabel: null,
  },
]

export const STORYLINE_3 = {
  correlation: 0.81,
  lagDays: 9,
  internalContacts: 430,
}

export const STORYLINE_4 = {
  verificationContactsWeekly: 610,
  avoidableContactsWeekly: 250,
  annualisedSupplyLossGbp: 2100000,
}

/**
 * Detail behind each Executive "Actions" card, keyed by id and shown in the
 * centred drill-down modal when a card is clicked. Figures trace to the same
 * driver rows, LTV model and coaching pack data used elsewhere on the page.
 */
export const ACTION_DETAILS = {
  'decide-scale-coaching': {
    category: 'Decide now',
    title: 'Keep Micro Coaching mandatory for every agent on continuation contacts',
    summary:
      'Nine of ten agents carried at least one auto-fail on the same pattern, so the incident-first coaching pack was rolled out team-wide from week 2, not held to the two or three agents who surfaced it first. The decision now is to keep it a standing requirement, not a one-off pilot.',
    rationale:
      'Janine Jacobs carried the most critical failures on the team, with Ayanda Mbeki and Zanele Ndlovu close behind. All three scored above 88% QA while CSAT sat near rock bottom on the same contacts. The underlying pattern, treating a continuation contact as a fresh ticket, showed up across almost the whole team, so the fix was built team-wide from the start.',
    owner: 'CCM + Team Leads',
    timeline: 'Live team-wide since week 2, this decision is whether it stays a permanent standard',
    impact: 'Critical failures already 7 → 0 across the team. Keeping it mandatory is what holds that line as continuation volume grows.',
    kpis: ['CSAT', 'Critical failures', 'Continuation contacts'],
  },
  'decide-account-standing': {
    category: 'Decide now',
    title: 'No Account Standing close without a named owner and timeframe',
    summary:
      'Set a process standard: an Account Standing contact cannot be marked resolved unless the closing note names who owns the next step and by when.',
    rationale:
      '31% of Account Standing contacts close with no resolution path for the sitter. Members and sitters describe this externally as "no clear route to a human", and internal mentions of unexplained penalties lead the same complaint on Trustpilot by 9 days at 0.81 correlation. A named-owner standard closes that loop before it reaches a public review.',
    owner: 'Trust & Safety ops',
    timeline: 'Process standard applied to new closures from week 6, alongside the Account Standing coaching extension',
    impact: 'Expected to reduce the public-review lag on Account Standing complaints and cut the 44% repeat contact rate on this cohort.',
    kpis: ['Escalation rate', 'Repeat contact rate', 'External VOC'],
  },
  'ready-verification': {
    category: 'Ready to execute',
    title: 'Verification next-best-action for status-chasing contacts',
    summary:
      'Deploy automated status updates at each stage of a sitter background check so sitters stop needing to call in for a manual update.',
    rationale:
      '610 verification contacts weekly, roughly 250 of which are pure status chases adding no new information. This adds an average 3.2 days to sitter activation and leaves 168 sitters weekly past their intended start date, unable to accept their first booking.',
    owner: 'Sitter growth / onboarding',
    timeline: 'Ready to deploy, awaiting go-ahead',
    impact: 'Modelled to deflect an estimated 250 weekly contacts and address roughly £2.1M in annualised sitter supply loss currently at risk, none of it protected until this ships.',
    kpis: ['AHT', 'Repeat contact rate', 'Sitter supply'],
  },
  'ready-coaching-scale': {
    category: 'Ready to execute',
    title: 'Extend Micro Coaching to Account Standing decision-making',
    summary:
      'The same root cause, a follow-up treated as a fresh ticket rather than the same unresolved emergency, shows up on Account Standing closures. A parallel card set, built on the incident-first pattern that already took critical failures to 0, is the next application.',
    rationale:
      'Continuation-contact coaching is live team-wide and working. Account Standing carries its own version of the same gap: 31% of contacts close with no route forward, and it is the next largest concentration of the pattern after Booking Cancellation.',
    owner: 'CCM + Team Leads',
    timeline: 'Card content follows the same production format already validated on the current pack; ready to build once prioritised',
    impact: 'High expected impact on Account Standing CSAT and the 44% repeat contact rate on that cohort, the two measures the current pack does not touch.',
    kpis: ['CSAT', 'Behaviour'],
  },
  'ready-guarantee': {
    category: 'Ready to execute',
    title: 'Pull every Guarantee contact into a dedicated review',
    summary:
      'Rover Guarantee claims are roughly 2% of contact volume but carry disproportionate severity, claims opening at CSAT 5 and dropping to CSAT 1-2 once denied on technical exclusions. Move every one of these into a dedicated review queue outside the standard QA sample.',
    rationale:
      'A QA sample sized for the average contact never surfaces a 2%-volume tail with this severity. It gets averaged away against thousands of healthy stay reviews. A dedicated queue makes the tail visible on its own terms.',
    owner: 'Policy + Quality',
    timeline: 'Can start immediately, no engineering dependency',
    impact: 'Surfaces the modelled Guarantee-tail share of pet parent LTV at risk, roughly £150K annualised, for direct policy and quality review, not averaged away against the rest of the book.',
    kpis: ['QA', 'VOC', 'Guarantee risk'],
  },
  'watch-critical-failures': {
    category: 'Watch next week',
    title: 'Critical failures and CSAT trend',
    summary: 'Confirm critical failures hold at 0 and CSAT keeps climbing now that coaching is standard across the whole team.',
    rationale:
      'Both metrics have been recovering since week 2. The real test is whether the same recovery holds as continuation-contact volume grows and coaching moves from a new habit to routine practice.',
    owner: 'CCM + Team Leads',
    timeline: 'Reviewed weekly',
    impact: 'A held or improving trend here is the leading confirmation that the coaching fix holds at team-wide scale, not just on the agents who surfaced it first.',
    kpis: ['Critical failures', 'CSAT'],
  },
  'watch-csat': {
    category: 'Watch next week',
    title: 'Blended CSAT vs target',
    summary: 'Population-wide CSAT is still below target while continuation contacts recover. Expect this gap to close gradually as the fix compounds week over week.',
    rationale:
      'Blended CSAT averages across all 8,300 weekly contacts. Continuation contacts, the ones coaching directly targets, are only 28% of that volume. It is expected to lag the continuation-contact recovery by design, this is the population-level metric that should move as more weeks of coaching accumulate.',
    owner: 'CCM + Team Leads',
    timeline: 'Reviewed weekly, expected to start closing gradually',
    impact: 'Primary population-level success measure for the coaching effort once enough weeks have accumulated.',
    kpis: ['CSAT'],
  },
  'watch-supply': {
    category: 'Watch next week',
    title: 'Sitter supply loss if verification NBA stays undeployed',
    summary: '22 sitters abandoning onboarding weekly, at an estimated £1,850 lifetime value each, annualises to roughly £2.1M in lost sitter supply if the verification next-best-action is not deployed.',
    rationale:
      'Every week the verification next-best-action stays undeployed is a week of avoidable sitter churn during onboarding, before Rover has taken a single booking fee from that sitter.',
    owner: 'Sitter growth / onboarding',
    timeline: 'Loss compounds weekly until the NBA above is deployed',
    impact: '£2.1M annualised supply risk, directly avoidable by shipping the verification next-best-action.',
    kpis: ['Sitter supply', 'AHT'],
  },
}
