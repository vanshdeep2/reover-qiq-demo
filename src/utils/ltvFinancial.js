/**
 * Rover two-sided LTV model. Every total below is computed live from the
 * assumptions passed in - nothing is normalised or forced back to a fixed
 * published number. The default assumption set (LTV_DEFAULTS) is calibrated
 * so the resulting totals land close to the headline £1.4M / £2.1M figures
 * quoted elsewhere in the deck, but changing an assumption changes the
 * total, by design. That is the point of the "View / edit assumptions"
 * control on Executive.
 */

export const LTV_DEFAULTS = {
  petParentLtvGbp: 480,
  sitterLtvGbp: 1850,
  membersHitWeekly: 380,
  churnUpliftPct: 12,
  sittersAbandoningWeekly: 22,
  verificationDeflectionWeekly: 250,
}

export function computeLtvFinancials(assumptions) {
  const { petParentLtvGbp, sitterLtvGbp, membersHitWeekly, churnUpliftPct, sittersAbandoningWeekly } =
    assumptions

  // Pet parent side: annualised revenue at risk from continuation failure,
  // split across the three categories where it concentrates. The 12% / 10%
  // split ratios are illustrative weighting for the donut, not separately
  // modelled figures - the total is what actually moves with the inputs.
  const continuationRisk = membersHitWeekly * (churnUpliftPct / 100) * petParentLtvGbp * 52
  const guaranteeTailRisk = continuationRisk * 0.12
  const standingRisk = continuationRisk * 0.1
  const totalRisk = continuationRisk + guaranteeTailRisk + standingRisk

  // Sitter side: annualised supply loss from onboarding abandonment, driven
  // by verification status-chasing delays. This has not been protected yet,
  // the verification next-best-action that would address it is still
  // queued ("Ready to execute" on Executive), so the full modelled figure
  // is at risk, not banked.
  const supplyLoss = sittersAbandoningWeekly * 52 * sitterLtvGbp

  return {
    petParentLtvGbp,
    sitterLtvGbp,
    continuationRisk,
    guaranteeTailRisk,
    standingRisk,
    totalRisk,
    supplyLoss,
    totalSupplyRisk: supplyLoss,
    // Modelled at ~100%: the abandonment figure is itself defined as
    // sitters lost to verification friction, so the queued NBA addresses
    // essentially all of it if deployed.
    verificationAddressable: supplyLoss,
    totalExposure: totalRisk + supplyLoss,
  }
}
