import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import FlowBar from '../components/FlowBar'
import KPITile from '../components/KPITile'
import NBACard from '../components/NBACard'
import MemberLtvSection from '../components/MemberLtvSection'
import InsightModal from '../components/InsightModal'
import HealthScoreRing from '../components/charts/HealthScoreRing'
import SparklineChart from '../components/charts/SparklineChart'
import { LTV_DEFAULT_ASSUMPTION_TEXT } from '../data/ltvCopy'
import {
  CALLS_PILL,
  COACHING_WEEK_INDEX,
  CONTINUATION_CSAT_RECOVERY,
  CRITICAL_FAILURES,
  CROSS_KPI_PATTERNS,
  CSAT,
  DEFAULTS,
  DRIVER_ROWS,
  EXTRACT_NOTE,
  FIRST_VS_CONTINUATION,
  HERO_CHIPS,
  KPIS,
  LIVE_LABEL,
  OVERALL_QA_PCT,
  PERIOD_LABEL,
  QUALITY_OUTCOME_MATRIX,
  TREND,
  WK5,
} from '../data/executiveConstants'
import {
  ACTION_DETAILS,
  COMBINED_VOC_ISSUES,
  EXTERNAL_VOC,
  EXTERNAL_VOC_STRIP,
  INTERNAL_VOC_STRIP,
} from '../data/vocConstants'
import { computeLtvFinancials, LTV_DEFAULTS } from '../utils/ltvFinancial'
import {
  computeHealthScore,
  healthArcColor,
  healthBandLabel,
  healthStatusColor,
} from '../utils/healthScore'
import { driverSignal, fcrClass } from '../utils/drivers'
import { formatAht, formatVariancePct, fmtGBPWhole, fmtGBPK, fmtPct } from '../utils/format'
import '../styles/executive.css'

const fmtCsat = (v) => v.toFixed(1)
const fmtWhole = (v) => `${v}`

/** Config for the centred metric drill-down modal, keyed by KPI tile. Root cause and
 * drivers are explanatory copy for the demo narrative, built from the same category
 * and coaching data used elsewhere on the page, not separately sourced figures. */
function useMetricConfigs() {
  return {
    csat: {
      title: 'CSAT', value: fmtCsat(CSAT), target: `Target: ${KPIS.csat.target}`,
      data: TREND.csat, color: '#c0392b', formatValue: fmtCsat, higherIsBetter: true,
      rootCause:
        'Blended CSAT is being pulled down by continuation contacts on Booking Cancellation and Account Standing. Members reaching a second agent on the same emergency rate the experience 1.8 on average, against 4.2 on the first contact, because the agent has no visibility into what already happened.',
      drivers: [
        { a: 'Booking Cancellation', b: 'Continuation contacts scoring 1.8 CSAT vs 4.2 on first contact' },
        { a: 'Account Standing', b: '31% of contacts closed with no route forward for the member' },
        { a: 'Micro Coaching', b: 'Critical failures 7 → 0 since week 2 · CSAT 1.70 → 1.88' },
      ],
    },
    rcr: {
      title: 'Repeat Contact Rate', value: fmtPct(KPIS.rcr.blended), target: `Target: ${fmtPct(KPIS.rcr.target)}`,
      data: TREND.rcr, color: '#d97706', formatValue: (v) => `${v}%`, higherIsBetter: false,
      rootCause:
        'Contacts that pass every scorecard question and still leave the member unresolved come back within the week. The repeat is concentrated in Booking Cancellation and Refund & Fees, where the first contact resolves the ticket but not the situation.',
      drivers: [
        { a: 'Booking Cancellation', b: '294 contacts in the extract, the largest contributor to repeats' },
        { a: 'Refund & Fees', b: '233 contacts, cancellation fee disputes carry the lowest FCR' },
        { a: 'Account Standing', b: 'Smaller volume, highest escalation rate at 18%' },
      ],
    },
    escalation: {
      title: 'Escalation Rate', value: fmtPct(KPIS.escalation.blended), target: `Target: ${fmtPct(KPIS.escalation.target)}`,
      data: TREND.esc, color: '#c0392b', formatValue: (v) => `${v}%`, higherIsBetter: false,
      rootCause:
        'A platform fault wrongly downgraded sitter follow-through rates from week 3, driving a sharp rise in Account Standing escalations as sitters disputed penalties they could not explain.',
      drivers: [
        { a: 'Account Standing', b: '18% escalation rate, the highest of any category' },
        { a: 'Platform fault', b: 'Mis-scored follow-through rates, root cause identified week 3' },
        { a: 'Fix status', b: 'Correction deployed, escalations expected to ease over the next two weeks' },
      ],
    },
    aht: {
      title: 'Average Handle Time', value: formatAht(KPIS.aht.blended), target: `Target: ${formatAht(DEFAULTS.targetAht)}`,
      data: TREND.aht, color: '#2a4fa8', formatValue: formatAht, higherIsBetter: false,
      rootCause:
        'Handle time runs longest where agents have to manually piece together what already happened to a member, rather than resolve a clean, self-contained request. Late-cancellation and fee-dispute contacts carry the heaviest load.',
      drivers: [
        { a: 'Sitter cancelled late', b: 'Booking Cancellation driver, avg 610s' },
        { a: 'Cancellation fee dispute', b: 'Refund & Fees driver, avg 510s' },
        { a: 'Payout delayed', b: 'Payouts driver, avg 430s' },
      ],
    },
    fcr: {
      title: 'First Contact Resolution', value: `${KPIS.fcr.blended}%`, target: `Target: ${KPIS.fcr.target}%`,
      data: TREND.fcr, color: '#1a7a4a', formatValue: (v) => `${v}%`, higherIsBetter: true,
      rootCause:
        'FCR drops hardest in categories where the agent needs information or a decision from another team before they can close the loop with the member on the first attempt.',
      drivers: [
        { a: 'Account Standing', b: '58% FCR, appeals often need a second look before resolving' },
        { a: 'Replacement search', b: 'Booking Cancellation driver, 58% FCR' },
        { a: 'Background check status', b: 'Verification driver, 52% FCR, depends on a third party' },
      ],
    },
    transfer: {
      title: 'Transfer Rate', value: `${KPIS.transfer.blended}%`, target: `Target: ${KPIS.transfer.target}%`,
      data: TREND.transfer, color: '#d97706', formatValue: (v) => `${v}%`, higherIsBetter: false,
      rootCause:
        'Transfers cluster where the first agent cannot action the request themselves, verification decisions and standing appeals both sit with specialist teams rather than the frontline.',
      drivers: [
        { a: 'Background check status', b: 'Verification driver, routed to specialist review' },
        { a: 'Appeal request', b: 'Account Standing driver, routed to Trust & Safety' },
        { a: 'Penalty applied', b: 'Account Standing driver, routed for manual override' },
      ],
    },
    nps: {
      title: 'NPS', value: fmtWhole(KPIS.nps.blended), target: `Target: ${KPIS.nps.target}`,
      data: TREND.nps, color: '#2a4fa8', formatValue: fmtWhole, higherIsBetter: true,
      rootCause:
        'Detractors concentrate around the same two patterns driving CSAT down: continuation contacts handled with no empathy, and Account Standing closures with no path forward.',
      drivers: [
        { a: 'Continuation contacts', b: 'Lowest-scoring group at 1.8 CSAT, direct target of Micro Coaching' },
        { a: 'Account Standing', b: '31% closed with no route forward, a recurring detractor theme' },
        { a: 'Micro Coaching', b: 'Same fix already cleared critical failures 7 → 0' },
      ],
    },
  }
}

function MetricDrillModal({ metricKey, onClose }) {
  const configs = useMetricConfigs()
  const cfg = metricKey ? configs[metricKey] : null
  if (!cfg) return null

  const targetNum = parseFloat(String(cfg.target).replace(/[^\d.-]/g, ''))
  const currentNum = parseFloat(String(cfg.value).replace(/[^\d.-]/g, ''))
  const variancePct =
    Number.isFinite(targetNum) && targetNum !== 0 && Number.isFinite(currentNum)
      ? ((currentNum - targetNum) / targetNum) * 100
      : null
  const isGood = variancePct == null ? true : cfg.higherIsBetter ? variancePct >= 0 : variancePct <= 0
  const badgeCls = isGood ? 'val-green' : 'val-red'

  return (
    <InsightModal open={Boolean(metricKey)} onClose={onClose} title={cfg.title} subtitle="5-week period · actual vs target">
      <div className="drawer-kpi-header">
        <div>
          <div className="insight-modal-section-label" style={{ marginTop: 0 }}>Current value</div>
          <div className={`drawer-kpi-val ${badgeCls}`}>{cfg.value}</div>
          <div className="drawer-kpi-sub">{cfg.target}</div>
        </div>
        {variancePct != null && (
          <div className={`drawer-w5-badge ${badgeCls}`}>{formatVariancePct(variancePct)} vs target</div>
        )}
      </div>

      <div className="insight-modal-section-label">Root cause analysis</div>
      <p className="insight-modal-text">{cfg.rootCause}</p>

      <div className="insight-modal-section-label">5-week trend</div>
      <div className="insight-modal-chart">
        <SparklineChart
          labels={WK5}
          data={cfg.data}
          color={cfg.color}
          height={150}
          formatValue={cfg.formatValue}
          coachingWeekLabel={WK5[COACHING_WEEK_INDEX]}
        />
      </div>

      <div className="insight-modal-section-label">Performance drivers</div>
      <div className="table-wrap">
        <table className="insight-modal-drivers-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {cfg.drivers.map((d) => (
              <tr key={d.a}>
                <td className="insight-modal-drivers-name">{d.a}</td>
                <td>{d.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InsightModal>
  )
}

const LTV_FIELDS = [
  { id: 'petParentLtvGbp', label: 'Pet parent LTV (£)', step: 10 },
  { id: 'sitterLtvGbp', label: 'Sitter LTV (£)', step: 50 },
  { id: 'membersHitWeekly', label: 'Members hit by continuation failure / week', step: 1 },
  { id: 'churnUpliftPct', label: 'Churn uplift on cohort (%)', step: 0.5 },
  { id: 'sittersAbandoningWeekly', label: 'Sitters abandoning onboarding / week', step: 1 },
  { id: 'verificationDeflectionWeekly', label: 'Verification NBA weekly deflection', step: 1 },
]

function LtvSettingsModal({ open, onClose, draft, onChange, onRecalculate, onReset }) {
  return (
    <InsightModal open={open} onClose={onClose} title="LTV Assumptions" subtitle="Adjust member LTV inputs. Click Recalculate to update figures on the page.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        {LTV_FIELDS.map((field) => (
          <div key={field.id} className="drawer-field">
            <label htmlFor={`input-ltv-${field.id}`}>{field.label}</label>
            <input
              id={`input-ltv-${field.id}`}
              type="number"
              step={field.step}
              value={draft[field.id]}
              onChange={(e) => onChange(field.id, Number(e.target.value))}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button type="button" className="btn-recalc" onClick={onRecalculate}>
          Recalculate
        </button>
        <button type="button" className="drawer-reset" onClick={onReset}>
          Reset to defaults
        </button>
      </div>
      <div className="drawer-assumption-info">
        <div className="drawer-assumption-info-heading">Default Assumption</div>
        <p className="drawer-assumption-info-text">{LTV_DEFAULT_ASSUMPTION_TEXT}</p>
      </div>
    </InsightModal>
  )
}

function DriverDrillModal({ row, onClose }) {
  if (!row) return null
  const maxSub = Math.max(...row.subDrivers.map((d) => d.volume))

  return (
    <InsightModal
      open={Boolean(row)}
      onClose={onClose}
      title={row.name}
      subtitle="Level 2 driver breakdown · volume and share within category"
    >
      <div className="drivers-table-wrap">
        <table className="drivers-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Volume</th>
              <th>Share</th>
              <th>FCR</th>
              <th>AHT</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {row.subDrivers.map((d) => {
              const barPct = Math.round((d.volume / maxSub) * 100)
              const sigCls =
                d.signal === 'Primary driver' ? 'signal-red'
                  : d.signal === 'Process dependency' ? 'signal-amber'
                  : d.signal === 'Watch' ? 'signal-amber'
                  : 'signal-green'
              return (
                <tr key={d.name}>
                  <td className="subcat-name">{d.name}</td>
                  <td>
                    <div className="vol-cell">
                      <span className="vol-num">{d.volume.toLocaleString('en-GB')}</span>
                      <div className="vol-bar-wrap">
                        <div className={sigCls === 'signal-green' ? 'vol-bar vol-bar-green' : 'vol-bar'} style={{ width: `${barPct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>{d.share}%</td>
                  <td className={fcrClass(d.fcr)}>{d.fcr}%</td>
                  <td className={d.aht > 480 ? 'aht-bad' : 'aht-ok'}>{formatAht(d.aht)}</td>
                  <td>
                    <span className={`signal-badge ${sigCls}`}>{d.signal}</span>
                  </td>
                </tr>
              )
            })}
            <tr className="drivers-table-total">
              <td>Total</td>
              <td>{row.volume.toLocaleString('en-GB')}</td>
              <td>{row.share}%</td>
              <td className={fcrClass(row.fcr)}>{row.fcr}%</td>
              <td>{formatAht(row.aht)}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </InsightModal>
  )
}

function PatternDrillModal({ pattern, onClose }) {
  if (!pattern) return null
  const { trend, driversTable } = pattern

  return (
    <InsightModal
      open={Boolean(pattern)}
      onClose={onClose}
      title={pattern.headline}
      subtitle="Cross-KPI · root cause analysis"
    >
      <div className="insight-modal-section-label">Root cause analysis</div>
      <p className="insight-modal-text">{pattern.rootCause}</p>

      {trend && (
        <>
          <div className="insight-modal-section-label">{trend.title}</div>
          <div className="insight-modal-chart">
            <SparklineChart
              labels={trend.weeks}
              data={trend.data}
              color={trend.color}
              height={150}
              formatValue={(v) => (Number.isInteger(v) ? `${v}` : v.toFixed(1))}
              coachingWeekLabel={
                trend.coachingWeekIndex != null ? trend.weeks[trend.coachingWeekIndex] : undefined
              }
            />
          </div>
        </>
      )}

      {driversTable && (
        <>
          <div className="insight-modal-section-label">Performance drivers</div>
          <div className="table-wrap">
            <table className="insight-modal-drivers-table">
              <thead>
                <tr>
                  <th>{driversTable.columns[0]}</th>
                  <th>{driversTable.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {driversTable.rows.map((r) => (
                  <tr key={r.a}>
                    <td className="insight-modal-drivers-name">{r.a}</td>
                    <td>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </InsightModal>
  )
}

function VocItemModal({ item, onClose }) {
  if (!item) return null

  return (
    <InsightModal
      open={Boolean(item)}
      onClose={onClose}
      title={item.title}
      subtitle={item.isInternal ? 'Internal VOC indicator' : 'External VOC indicator'}
    >
      <div className="insight-modal-section-label">Issue</div>
      <p className="insight-modal-text">{item.theme || item.summary}</p>
      {item.volumeNote && (
        <>
          <div className="insight-modal-section-label">Volume and scope</div>
          <p className="insight-modal-text">{item.volumeNote}</p>
        </>
      )}
      {item.evidence && (
        <>
          <div className="insight-modal-section-label">Evidence</div>
          <p className="insight-modal-text">{item.evidence}</p>
        </>
      )}
      {item.workaround && (
        <>
          <div className="insight-modal-section-label">Member workaround</div>
          <p className="insight-modal-text">{item.workaround}</p>
        </>
      )}
      {item.action && (
        <>
          <div className="insight-modal-section-label">What we're doing about it</div>
          <p className="insight-modal-text">{item.action}</p>
        </>
      )}
    </InsightModal>
  )
}

function ActionDetailModal({ actionId, onClose }) {
  const action = actionId ? ACTION_DETAILS[actionId] : null
  if (!action) return null

  return (
    <InsightModal
      open={Boolean(actionId)}
      onClose={onClose}
      title={action.title}
      subtitle={action.category}
    >
      <div className="insight-modal-section-label" style={{ marginTop: 0 }}>What this is</div>
      <p className="insight-modal-text">{action.summary}</p>

      <div className="insight-modal-section-label">Why it's on the list</div>
      <p className="insight-modal-text">{action.rationale}</p>

      <div className="action-detail-meta">
        <div>
          <div className="insight-modal-section-label" style={{ marginTop: 0 }}>Owner</div>
          <p className="insight-modal-text" style={{ margin: 0 }}>{action.owner}</p>
        </div>
        <div>
          <div className="insight-modal-section-label" style={{ marginTop: 0 }}>Timeline</div>
          <p className="insight-modal-text" style={{ margin: 0 }}>{action.timeline}</p>
        </div>
      </div>

      <div className="insight-modal-section-label">Expected impact</div>
      <p className="insight-modal-text">{action.impact}</p>

      {action.kpis?.length > 0 && (
        <>
          <div className="insight-modal-section-label">KPIs affected</div>
          <div className="action-detail-tags">
            {action.kpis.map((kpi) => (
              <span key={kpi} className="tag tag-muted">{kpi}</span>
            ))}
          </div>
        </>
      )}
    </InsightModal>
  )
}

function CombinedVocItemModal({ issue, onClose }) {
  if (!issue) return null

  return (
    <InsightModal
      open={Boolean(issue)}
      onClose={onClose}
      title={issue.title}
      subtitle="Internal and external signal, reconciled"
    >
      <div className="insight-modal-section-label">Internal signal</div>
      <p className="insight-modal-text">{issue.internal}</p>
      <div className="insight-modal-section-label">External signal</div>
      <p className="insight-modal-text">{issue.external}</p>
      <div className="insight-modal-section-label">What we're doing about it</div>
      <p className="insight-modal-text">{issue.action}</p>
      <div className="insight-modal-section-label">Status</div>
      <p className="insight-modal-text">{issue.status}</p>
    </InsightModal>
  )
}

export default function Executive() {
  const navigate = useNavigate()
  const [metricDrill, setMetricDrill] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [ltvAssumptions, setLtvAssumptions] = useState(LTV_DEFAULTS)
  const [ltvDraft, setLtvDraft] = useState(LTV_DEFAULTS)
  const [driverDrill, setDriverDrill] = useState(null)
  const [patternDrill, setPatternDrill] = useState(null)
  const [showAllMetrics, setShowAllMetrics] = useState(false)
  const [vocItemDrill, setVocItemDrill] = useState(null)
  const [combinedVocDrill, setCombinedVocDrill] = useState(null)
  const [actionDrill, setActionDrill] = useState(null)

  const ltv = useMemo(() => computeLtvFinancials(ltvAssumptions), [ltvAssumptions])
  const health = useMemo(() => computeHealthScore(DEFAULTS.targetAht), [])
  const healthColor = healthArcColor(health.health)
  const statusColor = healthStatusColor(health.health)

  const maxVol = Math.max(...DRIVER_ROWS.map((r) => r.volume))
  const csatVsTarget = ((CSAT - KPIS.csat.target) / KPIS.csat.target) * 100
  const matrixHeadline = QUALITY_OUTCOME_MATRIX.headlineCell

  return (
    <>
      <Nav currentPage="executive" liveLabel={LIVE_LABEL} callsPill={CALLS_PILL} />

      <div className="page">
        <div className="briefing-kicker">QiQ Client Intelligence</div>
        <h1 className="briefing-title">Rover Intelligence Briefing</h1>
        <div className="briefing-subtitle">
          {PERIOD_LABEL}. Quality scoring said this period was fine. It was not, and this is where the
          two views separate.
        </div>
        <p className="extract-note">{EXTRACT_NOTE}</p>

        <div className="connector">This period - at a glance.</div>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">QiQ Weekly Intelligence · Week 5 of 5</div>
            <div className="hero-headline">
              Late sitter cancellations are Rover's biggest call driver, and the second call is where it
              broke down.
            </div>
            <div className="hero-narrative">
              <p>
                Booking Cancellation is the largest single driver in the contact data at 14% of weekly
                volume, and with Refund & Fees alongside it, close to a quarter of the book, mostly a
                sitter cancelling close to a stay and the owner needing a replacement fast. The first
                call handled the practical steps fine. The problem showed up
                when the replacement still hadn't come through and the member called back: a different
                agent picked it up and treated it as a new question rather than the same unresolved
                emergency. That pattern produced seven critical failures in week 1 alone.
              </p>
              <p>
                In week 2 we rolled out Micro Coaching built around exactly this: open every repeat call
                by naming what already happened, not starting fresh. Critical failures fell every week
                after and hit zero by week 5. CSAT, the slower measure, has started to move
                too, 1.70 to 1.88. We're applying the same fix to Account Standing next.
              </p>
            </div>
            <p className="hero-wow">
              Critical failures {CRITICAL_FAILURES.peakWeek} → {CRITICAL_FAILURES.currentWeek} ·
              continuation QA held at {FIRST_VS_CONTINUATION.qaScorecardPct.continuation}% throughout ·
              CSAT {CONTINUATION_CSAT_RECOVERY.startValue} → {CONTINUATION_CSAT_RECOVERY.currentValue}, the lagging measure
            </p>
            <div className="hero-chips">
              {HERO_CHIPS.map((chip) => (
                <div key={chip.text} className={`hero-chip ${chip.className}`}>
                  <span className="chip-dot" style={{ background: chip.dotColor }} />
                  {chip.text}
                </div>
              ))}
            </div>
          </div>
          <div className="hero-divider" />
          <div className="hero-right">
            <div className="score-wrap">
              <HealthScoreRing score={health.health} color={healthColor} />
              <div className="score-inner">
                <div className="score-num">{health.health}</div>
                <div className="score-lbl-row">
                  <span className="score-lbl">Health</span>
                  <span className="score-info-btn">
                    i
                    <div className="score-tooltip">
                      <div className="score-tooltip-title">Health Score - how it is calculated</div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">FCR - First Contact Resolution</span>
                        <span className="score-tooltip-wt">45%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">Escalation Rate</span>
                        <span className="score-tooltip-wt">20%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">AHT - Average Handle Time</span>
                        <span className="score-tooltip-wt">15%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">Transfer Rate</span>
                        <span className="score-tooltip-wt">10%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">RCR - Repeat Contact Rate</span>
                        <span className="score-tooltip-wt">10%</span>
                      </div>
                      <div className="score-tooltip-ranges">
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#1a7a4a' }} />
                          80-100 · Healthy
                        </div>
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#d97706' }} />
                          60-79 · Watch
                        </div>
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#c0392b' }} />
                          Below 60 · At risk
                        </div>
                      </div>
                      <div className="score-tooltip-breakdown">
                        FCR {Math.round(health.fcrScore)} · ER {Math.round(health.erScore)} · AHT{' '}
                        {Math.round(health.ahtScore)} · TR {Math.round(health.trScore)} · RCR{' '}
                        {Math.round(health.rcrScore)} →{' '}
                        <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{health.health}</strong>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="score-status-row">
              <span className="score-status" style={{ color: statusColor }}>
                {healthBandLabel(health.health)}
              </span>
              <span className="score-vel">
                QA {OVERALL_QA_PCT}% · CSAT {CONTINUATION_CSAT_RECOVERY.currentValue}
              </span>
            </div>
          </div>
        </div>

        <div className="connector" style={{ marginBottom: 0 }}>
          <span>Operations Snapshot · Week 5</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button
            type="button"
            className="metrics-cta"
            onClick={() => setShowAllMetrics((v) => !v)}
          >
            {showAllMetrics ? 'Show fewer metrics ←' : 'View all 8 metrics →'}
          </button>
        </div>
        <div className="recovery-framing">
          <span className="recovery-framing-dot" />
          <span>
            <strong>Reading these charts:</strong> Micro Coaching deployed {WK5[COACHING_WEEK_INDEX]},
            marked on every chart below. Critical failures respond directly to coaching and are the one
            metric already at target, down from {CRITICAL_FAILURES.peakWeek} to {CRITICAL_FAILURES.currentWeek}.
            The rest are blended, population-wide KPIs across all 8,300 weekly contacts. They are flat or
            still deteriorating, which is what four weeks of coaching on a specific agent cohort should
            look like at this stage. Judge the intervention on critical failures now, and on CSAT and
            repeat contact rate next quarter.
          </span>
        </div>
        <div className="ops-kpi-grid chart-grid">
          <KPITile
            label="CSAT" value={fmtCsat(CSAT)} target={`Target: ${KPIS.csat.target}`}
            variance={`${formatVariancePct(csatVsTarget)} vs target`}
            varianceDirection={csatVsTarget >= 0 ? 'up' : 'down'} colour="amber"
            onClick={() => setMetricDrill('csat')}
          >
            <SparklineChart
              labels={WK5}
              data={TREND.csat}
              color="#1a7a4a"
              formatValue={fmtCsat}
              height={140}
              coachingPeriodBand
              coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
              coachingPeriodEnd={WK5[WK5.length - 1]}
            />
          </KPITile>
          <KPITile
            label="Critical failures"
            value={fmtWhole(CRITICAL_FAILURES.currentWeek)}
            target={`Peak: ${CRITICAL_FAILURES.peakWeek} in week 1`}
            changeText="Down every week since coaching deployed"
            varianceDirection="up"
            colour="green"
            onClick={() => navigate('/search?critical=true')}
            drillLabel="View critical failure calls →"
          >
            <SparklineChart
              labels={WK5}
              data={CRITICAL_FAILURES.weekly}
              color="#1a7a4a"
              formatValue={fmtWhole}
              height={140}
              coachingPeriodBand
              coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
              coachingPeriodEnd={WK5[WK5.length - 1]}
            />
          </KPITile>
          <KPITile
            label="Repeat contact rate" value={fmtPct(KPIS.rcr.blended)} target={`Target: ${fmtPct(KPIS.rcr.target)}`}
            changeText="Blended, all contacts" colour="red" onClick={() => setMetricDrill('rcr')}
          >
            <SparklineChart
              labels={WK5}
              data={TREND.rcr}
              color="#d97706"
              formatValue={(v) => `${v}%`}
              height={140}
              coachingPeriodBand
              coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
              coachingPeriodEnd={WK5[WK5.length - 1]}
            />
          </KPITile>
          <KPITile
            label="Escalation rate" value={fmtPct(KPIS.escalation.blended)} target={`Target: ${fmtPct(KPIS.escalation.target)}`}
            changeText="Account Standing drag" colour="amber" onClick={() => setMetricDrill('escalation')}
          >
            <SparklineChart
              labels={WK5}
              data={TREND.esc}
              color="#c0392b"
              formatValue={(v) => `${v}%`}
              height={140}
              coachingPeriodBand
              coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
              coachingPeriodEnd={WK5[WK5.length - 1]}
            />
          </KPITile>
          {showAllMetrics && (
            <>
              <KPITile
                label="AHT" value={formatAht(KPIS.aht.blended)} target={`Target: ${formatAht(DEFAULTS.targetAht)}`}
                changeText="Voice + messaging blended" colour="green" onClick={() => setMetricDrill('aht')}
              >
                <SparklineChart
                  labels={WK5}
                  data={TREND.aht}
                  color="#2a4fa8"
                  formatValue={formatAht}
                  height={140}
                  coachingPeriodBand
                  coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
                  coachingPeriodEnd={WK5[WK5.length - 1]}
                />
              </KPITile>
              <KPITile
                label="First contact resolution" value={`${KPIS.fcr.blended}%`} target={`Target: ${KPIS.fcr.target}%`}
                changeText="Trending down pre-coaching" colour="red" onClick={() => setMetricDrill('fcr')}
              >
                <SparklineChart
                  labels={WK5}
                  data={TREND.fcr}
                  color="#1a7a4a"
                  formatValue={(v) => `${v}%`}
                  height={140}
                  coachingPeriodBand
                  coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
                  coachingPeriodEnd={WK5[WK5.length - 1]}
                />
              </KPITile>
              <KPITile
                label="Transfer rate" value={`${KPIS.transfer.blended}%`} target={`Target: ${KPIS.transfer.target}%`}
                changeText="Above target" colour="amber" onClick={() => setMetricDrill('transfer')}
              >
                <SparklineChart
                  labels={WK5}
                  data={TREND.transfer}
                  color="#d97706"
                  formatValue={(v) => `${v}%`}
                  height={140}
                  coachingPeriodBand
                  coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
                  coachingPeriodEnd={WK5[WK5.length - 1]}
                />
              </KPITile>
              <KPITile
                label="NPS" value={fmtWhole(KPIS.nps.blended)} target={`Target: ${KPIS.nps.target}`}
                changeText="Blended, all contacts" colour="amber" onClick={() => setMetricDrill('nps')}
              >
                <SparklineChart
                  labels={WK5}
                  data={TREND.nps}
                  color="#2a4fa8"
                  formatValue={fmtWhole}
                  height={140}
                  coachingPeriodBand
                  coachingPeriodStart={WK5[COACHING_WEEK_INDEX]}
                  coachingPeriodEnd={WK5[WK5.length - 1]}
                />
              </KPITile>
            </>
          )}
        </div>

        <MemberLtvSection ltv={ltv} onOpenSettings={() => setSettingsOpen(true)} />

        <div className="connector">What is driving this.</div>
        <p className="connector-sub">
          The hardest matrix cell, process followed and resolved but CSAT still low, is{' '}
          {matrixHeadline.contacts.toLocaleString('en-GB')} contacts and {matrixHeadline.continuationShareOfCellPct}%
          of it is continuation contacts. Full detail lives in Contact Search.
        </p>
        <div className="driving-panel">
          <div className="driving-tab-bar">
            <span className="driving-tab">Contact drivers</span>
          </div>
          <div className="drivers-table-wrap">
            <table className="drivers-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Volume</th>
                  <th>Share</th>
                  <th>FCR</th>
                  <th>AHT</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_ROWS.map((row) => {
                  const sig = driverSignal(row)
                  const barPct = Math.round((row.volume / maxVol) * 100)
                  const barCls = sig.cls === 'signal-green' ? 'vol-bar vol-bar-green' : 'vol-bar'
                  return (
                    <tr
                      key={row.name}
                      className="drivers-row-clickable"
                      onClick={() => setDriverDrill(row)}
                      title="View level 2 driver breakdown"
                    >
                      <td className="subcat-name">{row.name}</td>
                      <td>
                        <div className="vol-cell">
                          <span className="vol-num">{row.volume.toLocaleString('en-GB')}</span>
                          <div className="vol-bar-wrap">
                            <div className={barCls} style={{ width: `${barPct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>{row.share}%</td>
                      <td className={fcrClass(row.fcr)}>{row.fcr}%</td>
                      <td className={row.aht > 480 ? 'aht-bad' : 'aht-ok'}>{formatAht(row.aht)}</td>
                      <td>
                        <span className={`signal-badge ${sig.cls}`}>{sig.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="driving-cross-kpi">
            <div className="ckp-grid">
              {CROSS_KPI_PATTERNS.map((pattern) => (
                <button
                  key={pattern.label}
                  type="button"
                  className="ckp-card ckp-card-clickable"
                  onClick={() => setPatternDrill(pattern)}
                >
                  <div className="ckp-label">{pattern.label}</div>
                  <div className="ckp-headline">{pattern.headline}</div>
                  <div className="ckp-body">{pattern.body}</div>
                  <div className="ckp-drill">Root cause →</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="connector">Internal and external signal, together.</div>
        <p className="connector-sub">
          Trustpilot UK rates Rover {EXTERNAL_VOC.trustpilotUkLabel} at {EXTERNAL_VOC.trustpilotUkRating}/5
          across {EXTERNAL_VOC.trustpilotUkReviewCount.toLocaleString('en-GB')} reviews. Overall QA is{' '}
          {OVERALL_QA_PCT}%. Both aggregates look healthy, and both are averaging over the same tail.
        </p>

        <div className="voc-reconcile-card">
          <div className="voc-reconcile-label">{COMBINED_VOC_ISSUES.title}</div>
          {COMBINED_VOC_ISSUES.items.map((issue) => (
            <button
              key={issue.id}
              type="button"
              className="voc-reconcile-item"
              onClick={() => setCombinedVocDrill(issue)}
            >
              <span className="voc-reconcile-item-title">{issue.title}</span>
              <span className="voc-reconcile-item-body">{issue.summary}</span>
              <span className="voc-reconcile-item-status">{issue.status} · Details →</span>
            </button>
          ))}
        </div>

        <div className="voc-strip-exec">
          <div className="voc-strip-exec-card">
            <div className="voc-strip-exec-title">Internal VOC signal</div>
            {INTERNAL_VOC_STRIP.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                className="voc-strip-exec-item"
                onClick={() => setVocItemDrill({ ...item, isInternal: true })}
              >
                <div className="voc-strip-exec-item-title">{item.title}</div>
                <div className="voc-strip-exec-item-body">{item.theme} · {item.volumeNote}</div>
              </button>
            ))}
          </div>
          <div className="voc-strip-exec-card">
            <div className="voc-strip-exec-title">External VOC signal</div>
            {EXTERNAL_VOC_STRIP.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                className="voc-strip-exec-item"
                onClick={() => setVocItemDrill({ ...item, isInternal: false })}
              >
                <div className="voc-strip-exec-item-title">{item.title}</div>
                <div className="voc-strip-exec-item-body">{item.summary}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="connector">Actions.</div>
        <div className="bottom-row">
          <div className="bottom-card">
            <div className="bottom-top">
              <div className="bottom-label">Decide now</div>
            </div>
            <button
              type="button"
              className="dec-row dec-row-clickable"
              onClick={() => setActionDrill('decide-scale-coaching')}
            >
              <div className="dec-bar" style={{ background: 'var(--red)' }} />
              <div className="dec-body">
                <div className="dec-title">
                  Keep Micro Coaching mandatory for every agent on continuation contacts, the standard
                  that took critical failures from 7 to 0
                </div>
                <span className="dec-type type-pol">System</span>
              </div>
              <div className="dec-cost">Auto-fails 7 → 0</div>
            </button>
            <button
              type="button"
              className="dec-row dec-row-clickable"
              onClick={() => setActionDrill('decide-account-standing')}
            >
              <div className="dec-bar" style={{ background: 'var(--amber)' }} />
              <div className="dec-body">
                <div className="dec-title">
                  No Account Standing close without a named owner and timeframe
                </div>
                <span className="dec-type type-pol">Process</span>
              </div>
              <div className="dec-cost">↓ public lag</div>
            </button>
          </div>
          <div className="bottom-card">
            <div className="bottom-top">
              <div className="bottom-label">Ready to execute</div>
            </div>
            <NBACard
              number={1}
              title="Verification next-best-action to deflect an estimated 250 weekly status-chasing contacts"
              kpis={['AHT', 'RCR', 'Supply']}
              impact={fmtGBPK(ltv.verificationAddressable)}
              onClick={() => setActionDrill('ready-verification')}
            />
            <NBACard
              number={2}
              title="Extend Micro Coaching to Account Standing decision-making, the next pattern flagged from the same root cause"
              kpis={['CSAT', 'Behaviour']}
              impact="High"
              onClick={() => setActionDrill('ready-coaching-scale')}
            />
            <NBACard
              number={3}
              title="Pull every Guarantee contact into a dedicated review outside the average QA sample"
              kpis={['QA', 'VOC']}
              impact={`-${fmtGBPK(ltv.guaranteeTailRisk)}`}
              onClick={() => setActionDrill('ready-guarantee')}
            />
          </div>
          <div className="bottom-card">
            <div className="bottom-top">
              <div className="bottom-label">Watch next week</div>
            </div>
            <button
              type="button"
              className="watch-row watch-row-clickable"
              onClick={() => setActionDrill('watch-critical-failures')}
            >
              <div className="watch-dot" style={{ background: 'var(--green)' }} />
              <div>
                <div className="watch-title">
                  Critical failures at {CRITICAL_FAILURES.currentWeek}, CSAT at{' '}
                  {CONTINUATION_CSAT_RECOVERY.currentValue}
                </div>
                <div className="watch-proj">
                  Both recovering since week 2, now that coaching is standard across the whole team.
                  Confirm the trend holds as volume on continuation contacts grows.
                </div>
              </div>
            </button>
            <button
              type="button"
              className="watch-row watch-row-clickable"
              onClick={() => setActionDrill('watch-csat')}
            >
              <div className="watch-dot" style={{ background: 'var(--amber)' }} />
              <div>
                <div className="watch-title">
                  Blended CSAT still at {CSAT}, {formatVariancePct(csatVsTarget)} vs target
                </div>
                <div className="watch-proj">
                  Population-wide recovery lags the coached cohort. Expect this to turn once coaching
                  reaches the full team.
                </div>
              </div>
            </button>
            <button
              type="button"
              className="watch-row watch-row-clickable"
              onClick={() => setActionDrill('watch-supply')}
            >
              <div className="watch-dot" style={{ background: 'var(--amber)' }} />
              <div>
                <div className="watch-title">
                  Supply loss {fmtGBPWhole(2100000)} annualised if verification NBA stays undeployed
                </div>
                <div className="watch-proj">
                  22 sitters abandoning onboarding weekly × 52 × £1,850.
                </div>
              </div>
            </button>
          </div>
        </div>

        <FlowBar activePage="executive" />
      </div>

      <MetricDrillModal metricKey={metricDrill} onClose={() => setMetricDrill(null)} />

      <DriverDrillModal row={driverDrill} onClose={() => setDriverDrill(null)} />

      <PatternDrillModal pattern={patternDrill} onClose={() => setPatternDrill(null)} />

      <VocItemModal item={vocItemDrill} onClose={() => setVocItemDrill(null)} />

      <CombinedVocItemModal issue={combinedVocDrill} onClose={() => setCombinedVocDrill(null)} />

      <ActionDetailModal actionId={actionDrill} onClose={() => setActionDrill(null)} />

      <LtvSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        draft={ltvDraft}
        onChange={(key, value) => setLtvDraft((prev) => ({ ...prev, [key]: value }))}
        onRecalculate={() => {
          setLtvAssumptions(ltvDraft)
          setSettingsOpen(false)
        }}
        onReset={() => setLtvDraft({ ...LTV_DEFAULTS })}
      />
    </>
  )
}
