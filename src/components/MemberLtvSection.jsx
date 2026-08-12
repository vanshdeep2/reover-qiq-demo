import { useEffect, useState } from 'react'
import DonutWithCentre from './DonutWithCentre'
import LtvBreakdownDrawer from './LtvBreakdownDrawer'
import { AT_RISK_LINES, AT_RISK_SIDE_LEGEND, COACHING_VALUE_LINES } from '../data/ltvCopy'
import { fmtDonutCentre, fmtGBPK } from '../utils/format'

const AT_RISK_DONUT_COLORS = AT_RISK_LINES.map((line) => line.dotColor)
const COACHING_DONUT_COLORS = COACHING_VALUE_LINES.map((line) => line.dotColor)
const PERIOD_LABEL = '5 weeks · Estimate'

function openBreakdown(setBreakdown, panel) {
  return (e) => {
    e.stopPropagation()
    setBreakdown(panel)
  }
}

function finCardKeyDown(setBreakdown, panel) {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setBreakdown(panel)
    }
  }
}

export default function MemberLtvSection({ ltv, onOpenSettings }) {
  const [breakdown, setBreakdown] = useState(null)

  useEffect(() => {
    if (!breakdown) return undefined
    function onKey(e) {
      if (e.key === 'Escape') setBreakdown(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [breakdown])

  const riskDonut = AT_RISK_LINES.map((line) => ltv[line.key])
  const coachingDonut = COACHING_VALUE_LINES.map((line) => ltv[line.key])

  return (
    <>
      <div className="connector">Member LTV Impact Analysis · 5-Week Period</div>
      <div className="ltv-section-head">
        <p className="section-sublabel ltv-section-sublabel">
          Two-sided marketplace · Pet parent LTV {fmtGBPK(ltv.petParentLtvGbp)} · Sitter LTV{' '}
          {fmtGBPK(ltv.sitterLtvGbp)} · Shows LTV still at risk and value already protected by Micro
          Coaching · Estimate · Adjust assumptions using view / edit assumptions
        </p>
        <button type="button" className="metrics-cta ltv-assumptions-cta" onClick={onOpenSettings}>
          View / edit assumptions
        </button>
      </div>

      <div className="fin-row">
        <div
          className="fin-card"
          onClick={() => setBreakdown('risk')}
          role="button"
          tabIndex={0}
          onKeyDown={finCardKeyDown(setBreakdown, 'risk')}
        >
          <div className="fin-card-top">
            <div className="fin-label">Member LTV at risk · Two-sided marketplace</div>
            <div className="fin-drill" onClick={openBreakdown(setBreakdown, 'risk')}>
              View breakdown →
            </div>
          </div>
          <div className="fin-body">
            <DonutWithCentre
              data={riskDonut}
              colors={AT_RISK_DONUT_COLORS}
              total={ltv.periodExposure}
              valueClass="val-red"
              label={PERIOD_LABEL}
            />
            <div className="fin-legend">
              <div className="fin-side-key" aria-label="Marketplace side colour key">
                {AT_RISK_SIDE_LEGEND.map((item) => (
                  <div key={item.label} className="fin-side-key-item">
                    <span className="leg-dot" style={{ background: item.color }} />
                    <span className="fin-side-key-label">{item.label}</span>
                  </div>
                ))}
              </div>
              {AT_RISK_LINES.map((line) => (
                <div key={line.key} className="leg-item">
                  <span className="leg-dot" style={{ background: line.dotColor }} />
                  <span className="leg-label">{line.legendLabel}</span>
                  <span className={`leg-val ${line.valueClass}`}>
                    {fmtDonutCentre(ltv[line.key])}
                  </span>
                </div>
              ))}
              <div className="leg-divider" />
              <div className="leg-item">
                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>
                  Annualised at risk
                </span>
                <span className="leg-val val-red">{fmtGBPK(ltv.totalExposure)}</span>
              </div>
              <div className="leg-item">
                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>
                  Addressable by verification NBA (annualised)
                </span>
                <span className="leg-val val-amber">{fmtGBPK(ltv.verificationAddressable)}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="fin-card"
          onClick={() => setBreakdown('coaching')}
          role="button"
          tabIndex={0}
          onKeyDown={finCardKeyDown(setBreakdown, 'coaching')}
        >
          <div className="fin-card-top">
            <div className="fin-label">LTV protected by Micro Coaching · Pet parents</div>
            <div className="fin-drill" onClick={openBreakdown(setBreakdown, 'coaching')}>
              View breakdown →
            </div>
          </div>
          <div className="fin-body">
            <DonutWithCentre
              data={coachingDonut}
              colors={COACHING_DONUT_COLORS}
              total={ltv.periodProtected}
              valueClass="val-green"
              label={PERIOD_LABEL}
            />
            <div className="fin-legend">
              {COACHING_VALUE_LINES.map((line) => (
                <div key={line.key} className="leg-item">
                  <span className="leg-dot" style={{ background: line.dotColor }} />
                  <span className="leg-label">{line.legendLabel}</span>
                  <span className="leg-val val-green">{fmtDonutCentre(ltv[line.key])}</span>
                </div>
              ))}
              <div className="leg-divider" />
              <div className="leg-item">
                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>
                  Annualised protected
                </span>
                <span className="leg-val val-green">{fmtGBPK(ltv.valueProtected)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="net-card">
          <div className="net-eyebrow">Total LTV impact surfaced this period</div>
          <div className="net-val">{fmtGBPK(ltv.periodSurfaced)}</div>
          <div className="net-sub">
            Pet parent + sitter at risk + Micro Coaching value protected · 5 weeks · Estimate
          </div>
          <div className="net-annualised">Annualised · {fmtGBPK(ltv.totalSurfaced)}</div>
        </div>
      </div>

      <LtvBreakdownDrawer panel={breakdown} ltv={ltv} onClose={() => setBreakdown(null)} />
    </>
  )
}
