import DonutWithCentre from './DonutWithCentre'
import InsightModal from './InsightModal'
import { RISK_LINES, SUPPLY_RISK_LINES } from '../data/ltvCopy'
import { fmtGBP, fmtGBPK } from '../utils/format'

const RISK_DONUT_COLORS = ['#c0392b', '#d9534f', '#e8806f']
const SUPPLY_DONUT_COLORS = ['#d97706']

function BreakdownBucket({ line, value, valueClass }) {
  return (
    <div className="drawer-bucket ltv-breakdown-bucket">
      <div className={`drawer-bucket-val ${valueClass}`}>{fmtGBP(value)}</div>
      <div className="drawer-bucket-lbl">{line.title}</div>
      <div className="drawer-bucket-formula">{line.label}</div>
      <div className="drawer-bucket-formula ltv-breakdown-desc">{line.description}</div>
    </div>
  )
}

export default function LtvBreakdownDrawer({ panel, ltv, onClose }) {
  const isRisk = panel === 'risk'
  const lines = isRisk ? RISK_LINES : SUPPLY_RISK_LINES
  const total = isRisk ? ltv.totalRisk : ltv.totalSupplyRisk
  const donutData = lines.map((line) => ltv[line.key])
  const donutColors = isRisk ? RISK_DONUT_COLORS : SUPPLY_DONUT_COLORS
  const totalClass = isRisk ? 'val-red' : 'val-amber'
  const alertClass = isRisk ? 'alert-red' : 'alert-amber'

  return (
    <InsightModal
      open={Boolean(panel)}
      onClose={onClose}
      title={isRisk ? 'Pet parent LTV at risk' : 'Sitter LTV at risk · Onboarding abandonment'}
      subtitle={
        isRisk
          ? 'Modelled annualised exposure from continuation failure and related tail risks.'
          : 'Modelled annualised supply-side loss from onboarding abandonment. Not yet protected, the verification NBA that would address it is still queued.'
      }
    >
      <div className="drawer-section">
        <div className="drawer-section-lbl">
          Annualised · Total{' '}
          <span style={{ color: isRisk ? 'var(--red)' : 'var(--amber)' }}>{fmtGBP(total)}</span>
        </div>

        <div className="ltv-breakdown-grid">
          <div className="ltv-breakdown-donut-cell">
            <DonutWithCentre
              data={donutData}
              colors={donutColors}
              total={total}
              valueClass={totalClass}
              size={148}
              cutout="75%"
              animate
              variant="drawer"
            />
          </div>

          {lines.map((line) => (
            <BreakdownBucket key={line.key} line={line} value={ltv[line.key]} valueClass={totalClass} />
          ))}
        </div>

        <div className={`alert-box ${alertClass}`}>Annualised: {fmtGBPK(total)}</div>
      </div>
    </InsightModal>
  )
}
