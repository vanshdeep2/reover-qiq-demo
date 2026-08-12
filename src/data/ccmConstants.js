import { MICRO_COACHING_CARDS } from './agents'
import { CRITICAL_FAILURES, FIRST_VS_CONTINUATION, TREND as TREND_EXEC, WK_LABELS } from './executiveConstants'
import { formatAht } from '../utils/format'

export { WK_LABELS }
export const COACHING_WEEK_INDEX = 1

export const BEHAVIOUR_PILLAR = {
  clarity_of_communication: { first: 4.4, continuation: 3.9, label: 'Clarity of communication' },
  ownership_of_the_issue: { first: 4.2, continuation: 2.3, label: 'Ownership of the issue' },
  listening_and_responsiveness: { first: 4.3, continuation: 3.1, label: 'Listening and responsiveness' },
  professionalism_and_courtesy: { first: 4.6, continuation: 4.4, label: 'Professionalism and courtesy' },
  empathy_and_acknowledgement: { first: 4.4, continuation: 2.1, label: 'Empathy and acknowledgement' },
  managing_frustration: { first: 4.1, continuation: 2.5, label: 'Managing frustration' },
}

export const COACHING_EFFECT_CONTINUATION_CSAT = [1.7, 1.77, 1.68, 1.8, 1.88]
export const COACHING_EFFECT_CRITICAL_FAILURES = [7, 6, 3, 1, 0]

export const MICRO_COACHING_ADOPTION = [
  { id: 'cc1', title: MICRO_COACHING_CARDS[0].title, deployed: 10, takenUp: 7, inProgress: 2, notTouched: 1 },
  { id: 'cc2', title: MICRO_COACHING_CARDS[1].title, deployed: 10, takenUp: 6, inProgress: 3, notTouched: 1 },
  { id: 'cc3', title: MICRO_COACHING_CARDS[2].title, deployed: 10, takenUp: 5, inProgress: 4, notTouched: 1 },
  { id: 'cc4', title: MICRO_COACHING_CARDS[3].title, deployed: 10, takenUp: 4, inProgress: 4, notTouched: 2 },
]

export const CCM_HERO = {
  headline: 'Critical failures cleared in four weeks. The scorecard never moved.',
  body: 'Per-contact QA sat at 91.4% team-wide and barely changed. Underneath it, 17 contacts auto-failed on empathy, all of them follow-ups on incidents that were already open. Coaching those specific agents took weekly critical failures from 7 to 0. QA did not move, because QA was never measuring it.',
  firstVsContinuation: FIRST_VS_CONTINUATION,
}

export const COACHING_HEALTH_STATS = [
  { label: 'Micro Coaching cards deployed', value: '4', valueClass: '', sub: 'Per agent, from their own contacts' },
  { label: 'Agents taking up', value: '7/10', valueClass: 'val-green', sub: 'Active use this week' },
  { label: 'Critical failures W5', value: '0', valueClass: 'val-green', sub: 'Down from 7 in week 1' },
  { label: 'Continuation QA', value: '88.9%', valueClass: 'val-amber', sub: 'Flat all period, CSAT 1.8' },
]

export const HERO_CHIPS = [
  { text: 'Critical failures 7 → 0 after coaching', className: 'chip-green', dotColor: '#4ade80' },
  { text: 'Ownership 4.2 → 2.3 on continuation', className: 'chip-red', dotColor: '#fca5a5' },
  { text: 'QA still 89.0% on continuation, CSAT 1.8', className: 'chip-amber', dotColor: '#fbbf24' },
]

export const HERO_STATS = [
  { value: '7 → 0', label: 'Critical failures across coaching' },
  { value: '89.0%', label: 'Continuation QA, flat all period' },
  { value: '1.8', label: 'CSAT vs 4.2 first contact' },
  { value: 'Week 2', label: 'Micro Coaching deployment start' },
  { value: '17', label: 'Empathy auto-fails found by quality mining' },
]

export const QUALITY_SUMMARY = [
  { value: 'Janine Jacobs: 91.5% QA · 4 critical failures', label: 'Highest auto-fail count on the team' },
  { value: 'Zanele Ndlovu: 91.3% QA · 3 critical failures', label: 'Same pattern, same coaching cards' },
  { value: 'Behaviour ownership 2.3', label: 'Biggest pillar gap on continuation' },
  { value: 'Micro Coaching uptake 7/10', label: 'Team adopting incident-first opens' },
]

export const TREND = {
  aht: TREND_EXEC.aht,
  fcr: TREND_EXEC.fcr,
  csat: COACHING_EFFECT_CONTINUATION_CSAT,
  nps: [12, 14, 15, 17, 18],
  er: TREND_EXEC.esc,
}

export const T1_RESOLUTION = [88, 87, 86, 85, 84]
export const CF_WEEKLY = [4, 3, 2, 1, 0]
export const CF_BAR_COLORS = ['#c0392b', '#c0392b', '#d97706', '#1a7a4a', '#1a7a4a']

export const COACHING_LEDGER_ROWS = [
  { agent: 'Janine Jacobs', issue: '4 empathy auto-fails with QA 91.5%', topic: 'Open with the incident', deployed: 'Week 2 - Micro Coaching card 1', outcome: 'No auto-fails since week 4', badges: [{ text: 'Action Needed', className: 'badge badge-red' }, { text: 'TL action required', className: 'badge badge-tl' }], statusCell: true },
  { agent: 'Zanele Ndlovu', issue: '3 empathy auto-fails with QA 91.3%', topic: 'Match register to history', deployed: 'Week 2 - Micro Coaching card 2', outcome: 'No auto-fails since week 3', badges: [{ text: 'Action Needed', className: 'badge badge-red' }, { text: 'TL action required', className: 'badge badge-tl' }], statusCell: true },
  { agent: 'Sipho Khumalo', issue: 'Guarantee continuations closed without route', topic: 'Never close without a route', deployed: 'Week 2 - Micro Coaching card 3', outcome: 'Improving named owners on close', badges: [{ text: 'In Progress', className: 'badge badge-amber' }] },
  { agent: 'Busisiwe Maseko', issue: 'Messaging continuations without trail read', topic: 'Incident trail before reply', deployed: 'Week 2 - Micro Coaching card 1', outcome: 'Uptake started on messaging', badges: [{ text: 'In Progress', className: 'badge badge-amber' }] },
  { agent: 'Lerato Nkosi', issue: 'Sitter standing fears left unspoken', topic: 'Say the standing concern', deployed: 'Week 2 - Micro Coaching card 4', outcome: 'Account Standing contacts improving', badges: [{ text: 'In Progress', className: 'badge badge-amber' }] },
  { agent: 'Ayanda Mbeki', issue: 'First-contact strong · continuation gap', topic: 'Micro Coaching suite', deployed: 'Week 2', outcome: 'CSAT trending up', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Michael Naidoo', issue: 'No coaching needed on first contact', topic: 'Peer coaching source', deployed: 'Week 2', outcome: 'Modelling incident-first opens', badges: [{ text: 'Benchmark', className: 'badge badge-trophy' }] },
]

export const COACHING_LEDGER_SUMMARY = [
  { text: '7 agents in ledger', className: 'summary-chip' },
  { text: '2 action needed', className: 'summary-chip summary-chip-amber' },
  { text: '3 in progress', className: 'summary-chip summary-chip-amber' },
  { text: '1 improving', className: 'summary-chip summary-chip-green' },
  { text: '1 benchmark', className: 'summary-chip summary-chip-trophy' },
]

export const PATTERN_CARDS = [
  {
    variant: 'red',
    title: 'Continuation failure invisible to per-contact QA',
    level: 'System level',
    body: 'CSAT 1.8 vs first-contact 4.2 while QA stays near 89%. Scorecards judge tickets in isolation. The incident trail is the instrument that sees the damage.',
    tags: [
      { text: 'CSAT -2.2', className: 'tag tag-red' },
      { text: 'QA flat', className: 'tag tag-amber' },
      { text: 'Beh -1.5', className: 'tag tag-red' },
    ],
  },
  {
    variant: 'amber',
    title: 'Account Standing closed without a route forward',
    level: 'System level',
    body: '31% of Account Standing contacts close with no resolution path. Internal volume leads external mentions by 9 days at correlation 0.81.',
    tags: [
      { text: 'ER elevated', className: 'tag tag-amber' },
      { text: '0.81 corr', className: 'tag tag-amber' },
      { text: '9-day lag', className: 'tag tag-amber' },
    ],
  },
  {
    variant: 'green',
    title: 'Micro Coaching cards lift CSAT',
    level: 'Team level - Best practice',
    body: 'After week-2 deployment, weekly critical failures fall from 7 to 0. Agents who open with the incident and name a route forward stop producing auto-fails, without waiting for policy change. CSAT is the slower measure and has moved 1.70 to 1.88 so far.',
    tags: [
      { text: 'CSAT +1.2', className: 'tag tag-green' },
      { text: '7/10 uptake', className: 'tag tag-green' },
    ],
  },
  {
    variant: 'amber',
    title: 'Verification status chasing burns supply',
    level: 'System level',
    body: '250 avoidable weekly verification contacts. 22 sitters abandon onboarding weekly. Supply-side loss annualises at £2.1M Estimate.',
    tags: [
      { text: '250 deflect', className: 'tag tag-amber' },
      { text: '£2.1M', className: 'tag tag-red' },
    ],
  },
]

export const BEST_PRACTICE_CARDS = [
  {
    title: 'Open with the incident trail before the ticket',
    evidence: 'Evidence: CSAT recovers when agents read history first · QA stays high either way',
    agents: 'Agents: Michael Naidoo modelling · Janine and Zanele coaching focus',
    rec: 'Recommendation: Make incident-first open the default on contact_sequence > 1.',
  },
  {
    title: 'Never close without a named route forward',
    evidence: 'Evidence: Account Standing and Guarantee tails spike when closes leave members without owner or timeframe',
    agents: 'Agents: Sipho Khumalo coaching in progress',
    rec: 'Recommendation: Require owner + timeframe on every continuation close when policy blocks full resolution.',
  },
]

export function getMetricsDrawerSections() {
  return [
    {
      id: 'kpi-csat-drawer',
      label: 'CSAT',
      value: '3.9',
      valueClass: 'val-green',
      sub: 'Target: 4.4',
      change: '-11.4% vs target',
      changeClass: 'chg-green',
      series: TREND_EXEC.csat,
      format: 'csat',
      color: '#1a7a4a',
      note: 'Blended CSAT across all contacts. Micro Coaching is recovering the continuation cohort that pulls the blended figure down.',
    },
    {
      id: 'kpi-cf-drawer',
      label: 'Critical Failures',
      value: '0',
      valueClass: 'val-green',
      sub: 'Peak: 7 in week 1',
      change: 'Down every week since coaching deployed',
      changeClass: 'chg-green',
      series: CRITICAL_FAILURES.weekly,
      format: 'whole',
      color: '#1a7a4a',
      note: 'Leading indicator of coaching impact. Critical failures fall as Micro Coaching cards land.',
    },
    {
      id: 'kpi-rcr-drawer',
      label: 'Repeat Contact Rate',
      value: '24.6%',
      valueClass: 'val-red',
      sub: 'Target: 15%',
      change: 'Blended, all contacts',
      changeClass: 'chg-red',
      series: TREND_EXEC.rcr,
      format: 'pct',
      color: '#d97706',
      note: 'Population-wide KPI. Takes longer to turn than critical failures after a cohort-level coaching fix.',
    },
    {
      id: 'kpi-esc-drawer',
      label: 'Escalation Rate',
      value: '9.2%',
      valueClass: 'val-amber',
      sub: 'Target: 6%',
      change: 'Account Standing drag',
      changeClass: 'chg-amber',
      series: TREND_EXEC.esc,
      format: 'pct',
      color: '#c0392b',
      note: 'Account Standing closures without a route forward keep escalation elevated.',
    },
    {
      id: 'kpi-aht-drawer',
      label: 'Average Handle Time',
      value: formatAht(435),
      valueClass: 'val-green',
      sub: `Target: ${formatAht(406)}`,
      change: 'Voice + messaging blended',
      changeClass: 'chg-green',
      series: TREND_EXEC.aht,
      format: 'aht',
      color: '#2a4fa8',
      note: 'First-contact AHT is long. Continuation AHT collapses as agents rush the ticket.',
    },
    {
      id: 'kpi-fcr-drawer',
      label: 'First Contact Resolution',
      value: '71.4%',
      valueClass: 'val-red',
      sub: 'Target: 80%',
      change: 'Trending down pre-coaching',
      changeClass: 'chg-red',
      series: TREND_EXEC.fcr,
      format: 'pct',
      color: '#1a7a4a',
      note: 'Blended FCR from master numbers. Ticket resolution is not the same as incident resolution.',
    },
    {
      id: 'kpi-transfer-drawer',
      label: 'Transfer Rate',
      value: '14.8%',
      valueClass: 'val-amber',
      sub: 'Target: 10%',
      change: 'Above target',
      changeClass: 'chg-amber',
      series: TREND_EXEC.transfer,
      format: 'pct',
      color: '#d97706',
      note: 'Transfers remain above target across the blended population.',
    },
    {
      id: 'kpi-nps-drawer',
      label: 'NPS',
      value: '18',
      valueClass: 'val-amber',
      sub: 'Target: 35',
      change: 'Blended, all contacts',
      changeClass: 'chg-amber',
      series: TREND_EXEC.nps,
      format: 'whole',
      color: '#2a4fa8',
      note: 'NPS tracks the same recovery lag as other population-wide experience metrics.',
    },
  ]
}
