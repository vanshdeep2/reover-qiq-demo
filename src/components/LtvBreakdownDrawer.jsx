import DonutWithCentre from './DonutWithCentre'
import InsightModal from './InsightModal'
import { AT_RISK_LINES, AT_RISK_SIDE_LEGEND, COACHING_VALUE_LINES } from '../data/ltvCopy'
import { fmtGBP, fmtGBPK } from '../utils/format'

const AT_RISK_DONUT_COLORS = AT_RISK_LINES.map((line) => line.dotColor)
const COACHING_DONUT_COLORS = COACHING_VALUE_LINES.map((line) => line.dotColor)
const PERIOD_LABEL = '5 weeks · Estimate'

function BreakdownBucket({ line, value, valueClass, display }) {
  return (
    <div className="drawer-bucket ltv-breakdown-bucket">
      <div className={`drawer-bucket-val ${valueClass}`}>{display ?? fmtGBP(value)}</div>
      <div className="drawer-bucket-lbl">{line.title}</div>
      <div className="drawer-bucket-formula">{line.label}</div>
      <div className="drawer-bucket-formula ltv-breakdown-desc">{line.description}</div>
    </div>
  )
}

function SideColourKey() {
  return (
    <div className="fin-side-key fin-side-key--drawer" aria-label="Marketplace side colour key">
      {AT_RISK_SIDE_LEGEND.map((item) => (
        <div key={item.label} className="fin-side-key-item">
          <span className="leg-dot" style={{ background: item.color }} />
          <span className="fin-side-key-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function LtvBreakdownDrawer({ panel, ltv, onClose }) {
  if (!panel) {
    return (
      <InsightModal open={false} onClose={onClose} title="">
        {null}
      </InsightModal>
    )
  }

  if (panel === 'coaching') {
    return (
      <InsightModal
        open
        onClose={onClose}
        title="LTV protected by Micro Coaching · Pet parents"
        subtitle="GBP protected in the current 5-week window after Micro Coaching went live in week 2, split across the same continuation categories as pet-parent at-risk. Estimate."
      >
        <div className="drawer-section">
          <div className="drawer-section-lbl">
            This period · Total{' '}
            <span style={{ color: 'var(--green)' }}>{fmtGBP(ltv.periodProtected)}</span>
          </div>

          <div className="ltv-breakdown-grid">
            <div className="ltv-breakdown-donut-cell">
              <DonutWithCentre
                data={COACHING_VALUE_LINES.map((line) => ltv[line.key])}
                colors={COACHING_DONUT_COLORS}
                total={ltv.periodProtected}
                valueClass="val-green"
                label={PERIOD_LABEL}
                size={148}
                cutout="75%"
                animate
                variant="drawer"
              />
            </div>

            {COACHING_VALUE_LINES.map((line) => (
              <BreakdownBucket
                key={line.key}
                line={line}
                value={ltv[line.key]}
                valueClass="val-green"
              />
            ))}
          </div>

          <div className="alert-box alert-green">
            Annualised value protected: {fmtGBPK(ltv.valueProtected)} · Estimate
          </div>
        </div>
      </InsightModal>
    )
  }

  // Combined pet-parent + sitter at-risk (also accepts legacy 'supply' panel id).
  const riskPanel = panel === 'risk' || panel === 'supply'
  if (!riskPanel) return null

  return (
    <InsightModal
      open
      onClose={onClose}
      title="Member LTV at risk"
      subtitle="Modelled exposure in the current 5-week window from pet-parent continuation failure and sitter onboarding abandonment. Estimate."
    >
      <div className="drawer-section">
        <div className="drawer-section-lbl">
          This period · Total{' '}
          <span style={{ color: 'var(--red)' }}>{fmtGBP(ltv.periodExposure)}</span>
        </div>

        <SideColourKey />

        <div className="ltv-breakdown-grid">
          <div className="ltv-breakdown-donut-cell">
            <DonutWithCentre
              data={AT_RISK_LINES.map((line) => ltv[line.key])}
              colors={AT_RISK_DONUT_COLORS}
              total={ltv.periodExposure}
              valueClass="val-red"
              label={PERIOD_LABEL}
              size={148}
              cutout="75%"
              animate
              variant="drawer"
            />
          </div>

          {AT_RISK_LINES.map((line) => (
            <BreakdownBucket
              key={line.key}
              line={line}
              value={ltv[line.key]}
              valueClass={line.valueClass}
            />
          ))}
        </div>

        <div className="alert-box alert-red">
          Annualised at risk: {fmtGBPK(ltv.totalExposure)} · Verification NBA addressable
          (annualised) {fmtGBPK(ltv.verificationAddressable)}
        </div>
      </div>
    </InsightModal>
  )
}
