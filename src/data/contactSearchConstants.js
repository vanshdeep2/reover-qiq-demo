import { AGENT_SLUGS } from './agents'

export { AGENT_SLUGS }

export const Q_NAMES = {
  q1: 'Resolution',
  q2: 'Diagnosis',
  q3: 'Efficiency',
  q4: 'Verification',
  q5: 'Escalation',
  q6: 'Expectation Setting',
  q7: 'Communication',
  q8: 'Callback',
  q9: 'Closing the Loop',
  q10: 'Member Appreciation',
  q11: 'Case Notes',
  q12: 'Internal Process',
  q13: 'Business Policy',
  q14: 'Compliance',
}

export const PASS_FAIL_QS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q11']

export const DEFAULT_FILTERS = {
  agent: 'all',
  source: 'all',
  queue: 'all',
  week: 'all',
  resolution: 'all',
  dateFrom: '2026-03-29',
  dateTo: '2026-05-02',
  scoreFilter: 'all',
  criticalOnly: false,
}

export const WEEK_BOUNDARIES = [
  { start: '2026-03-29', end: '2026-04-04' },
  { start: '2026-04-05', end: '2026-04-11' },
  { start: '2026-04-12', end: '2026-04-18' },
  { start: '2026-04-19', end: '2026-04-25' },
  { start: '2026-04-26', end: '2026-05-02' },
]

export const HERO_IDS = [
  'RV-OWN-000101',
  'RV-OWN-000102',
  'RV-OWN-000103',
  'RV-SIT-000104',
  'RV-SIT-000105',
  'RV-OWN-000106',
  'RV-OWN-000107',
  'RV-SIT-000108',
]

export const FLAGSHIP_IDS = ['RV-SIT-000201', 'RV-SIT-000202', 'RV-SIT-000301', 'RV-SIT-000302']

export const SORTABLE_FIELDS = [
  'contact_id',
  'agent_name',
  'call_date',
  'call_category',
  'qa_score',
  'contact_sequence',
]

export const CF_QUICK_LINKS = [
  { callId: 'RV-OWN-000101', agent: 'Janine Jacobs', label: 'INC-2026-0417 · Sophie' },
  { callId: 'RV-SIT-000105', agent: 'Michael Naidoo', label: 'INC-2026-0392 · Guarantee' },
  { callId: 'RV-SIT-000201', agent: 'Zanele Ndlovu', label: 'Hana Yilmaz · Standing' },
  { callId: 'RV-SIT-000301', agent: 'Ayanda Mbeki', label: 'Owen Pritchard · Verification' },
]
