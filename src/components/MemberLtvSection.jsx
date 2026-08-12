import { useEffect, useState } from 'react'
import DonutWithCentre from './DonutWithCentre'
import LtvBreakdownDrawer from './LtvBreakdownDrawer'
import { RISK_LINES, SUPPLY_RISK_LINES } from '../data/ltvCopy'
import { fmtDonutCentre, fmtGBPK, fmtMillionShort } from '../utils/format'

const RISK_DONUT_COLORS = ['#c0392b', '#d9534f', '#e8806f']
const SUPPLY_DONUT_COLORS = ['#d97706']

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

  const riskDonut = RISK_LINES.map((line) => ltv[line.key])
  const supplyRiskDonut = SUPPLY_RISK_LINES.map((line) => ltv[line.key])
  const totalSurfaced = ltv.totalExposure

  return (
    <>
      <div className="connector">Member LTV Impact Analysis · 5-Week Period</div>
      <div className="ltv-section-head">
        <p className="section-sublabel ltv-section-sublabel">
          Two-sided marketplace · Pet parent LTV {fmtGBPK(ltv.petParentLtvGbp)} · Sitter LTV{' '}
          {fmtGBPK(ltv.sitterLtvGbp)} · Modelled from the assumptions on file, refreshed as Micro
          Coaching outcomes land · Adjust assumptions using view / edit assumptions
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
            <div className="fin-label">Pet parent LTV at risk · Continuation failure</div>
            <div className="fin-drill" onClick={openBreakdown(setBreakdown, 'risk')}>
              View breakdown →
            </div>
          </div>
          <div className="fin-body">
            <DonutWithCentre
              data={riskDonut}
              colors={RISK_DONUT_COLORS}
              total={ltv.totalRisk}
              valueClass="val-red"
            />
            <div className="fin-legend">
              {RISK_LINES.map((line) => (
                <div key={line.key} className="leg-item">
                  <span className="leg-dot" style={{ background: line.dotColor }} />
                  <span className="leg-label">{line.legendLabel}</span>
                  <span className="leg-val val-red">{fmtDonutCentre(ltv[line.key])}</span>
                </div>
              ))}
              <div className="leg-divider" />
              <div className="leg-item">
                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>
                  Annualised
                </span>
                <span className="leg-val val-red">{fmtGBPK(ltv.totalRisk)}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="fin-card"
          onClick={() => setBreakdown('supply')}
          role="button"
          tabIndex={0}
          onKeyDown={finCardKeyDown(setBreakdown, 'supply')}
        >
          <div className="fin-card-top">
            <div className="fin-label">
              Sitter LTV at risk · Onboarding abandonment
            </div>
            <div className="fin-drill" onClick={openBreakdown(setBreakdown, 'supply')}>
              View breakdown →
            </div>
          </div>
          <div className="fin-body">
            <DonutWithCentre
              data={supplyRiskDonut}
              colors={SUPPLY_DONUT_COLORS}
              total={ltv.totalSupplyRisk}
              valueClass="val-amber"
            />
            <div className="fin-legend">
              {SUPPLY_RISK_LINES.map((line) => (
                <div key={line.key} className="leg-item">
                  <span className="leg-dot" style={{ background: line.dotColor }} />
                  <span className="leg-label">{line.legendLabel}</span>
                  <span className="leg-val val-amber">{fmtDonutCentre(ltv[line.key])}</span>
                </div>
              ))}
              <div className="leg-divider" />
              <div className="leg-item">
                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>
                  Addressable by verification NBA
                </span>
                <span className="leg-val val-amber">{fmtGBPK(ltv.verificationAddressable)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="net-card">
          <div className="net-eyebrow">Total LTV exposure surfaced this period</div>
          <div className="net-val">{fmtMillionShort(totalSurfaced)}</div>
          <div className="net-sub">Pet parent revenue at risk + sitter supply-side loss, neither yet fully addressed</div>
          <div className="net-annualised">Annualised · {fmtGBPK(totalSurfaced)}</div>
        </div>
      </div>

      <LtvBreakdownDrawer panel={breakdown} ltv={ltv} onClose={() => setBreakdown(null)} />
    </>
  )
}
