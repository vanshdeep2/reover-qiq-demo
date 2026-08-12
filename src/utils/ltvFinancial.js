/**
 * Rover two-sided LTV model. Every total below is computed live from the
 * assumptions passed in - nothing is normalised or forced back to a fixed
 * published number. The default assumption set (LTV_DEFAULTS) is calibrated
 * so the resulting totals land close to the headline £1.4M / £2.1M figures
 * quoted elsewhere in the deck, but changing an assumption changes the
 * total, by design. That is the point of the "View / edit assumptions"
 * control on Executive.
 */

/** Weeks 2-5 of the 5-week window once Micro Coaching is live. */
export const COACHING_WEEKS_IN_PERIOD = 4

/** Full reporting window shown on Executive LTV cards. */
export const REPORTING_WEEKS = 5

export const LTV_DEFAULTS = {
  petParentLtvGbp: 480,
  sitterLtvGbp: 1850,
  membersHitWeekly: 380,
  churnUpliftPct: 12,
  sittersAbandoningWeekly: 22,
  verificationDeflectionWeekly: 250,
  coachingMembersWeekly: 900,
  coachingProtectionPct: 70,
}

export function computeLtvFinancials(assumptions) {
  const {
    petParentLtvGbp,
    sitterLtvGbp,
    membersHitWeekly,
    churnUpliftPct,
    sittersAbandoningWeekly,
    coachingMembersWeekly,
    coachingProtectionPct,
  } = assumptions

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

  // Micro Coaching value protected: broader cohort than the conservative
  // 380 risk filter, with a protection rate once coaching is live (weeks 2-5).
  const coachingMembers = coachingMembersWeekly ?? LTV_DEFAULTS.coachingMembersWeekly
  const protectionPct = coachingProtectionPct ?? LTV_DEFAULTS.coachingProtectionPct
  const weeklyAtRisk = coachingMembers * (churnUpliftPct / 100)
  const weeklyRetained = weeklyAtRisk * (protectionPct / 100)
  const periodRetained = Math.round(weeklyRetained * COACHING_WEEKS_IN_PERIOD)
  const periodValueGbp = periodRetained * petParentLtvGbp
  const annualRetained = Math.round(weeklyRetained * 52)
  const valueProtected = weeklyRetained * petParentLtvGbp * 52

  // Presentation split of valueProtected using the same relative weights as
  // pet-parent at-risk (1 + 0.12 + 0.1). Headline total is unchanged.
  const protectedWeight = 1 + 0.12 + 0.1
  const continuationProtected = valueProtected * (1 / protectedWeight)
  const guaranteeProtected = valueProtected * (0.12 / protectedWeight)
  const standingProtected = valueProtected * (0.1 / protectedWeight)

  // 5-week reporting-period views (annualised × 5 / 52). Coaching period
  // value still reflects four active coaching weeks via periodValueGbp.
  const periodContinuationRisk = (continuationRisk / 52) * REPORTING_WEEKS
  const periodGuaranteeRisk = (guaranteeTailRisk / 52) * REPORTING_WEEKS
  const periodStandingRisk = (standingRisk / 52) * REPORTING_WEEKS
  const periodSupplyRisk = (supplyLoss / 52) * REPORTING_WEEKS
  const periodExposure =
    periodContinuationRisk + periodGuaranteeRisk + periodStandingRisk + periodSupplyRisk

  const periodContinuationProtected = periodValueGbp * (1 / protectedWeight)
  const periodGuaranteeProtected = periodValueGbp * (0.12 / protectedWeight)
  const periodStandingProtected = periodValueGbp * (0.1 / protectedWeight)
  const periodProtected = periodValueGbp

  const periodSurfaced = periodExposure + periodProtected

  return {
    petParentLtvGbp,
    sitterLtvGbp,
    coachingMembersWeekly: coachingMembers,
    coachingProtectionPct: protectionPct,
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
    // At-risk only (pet parent + sitter). Used by the combined risk card.
    totalExposure: totalRisk + supplyLoss,
    // DoorDash-style net: at-risk exposure + Micro Coaching value protected.
    totalSurfaced: totalRisk + supplyLoss + valueProtected,
    weeklyAtRisk,
    weeklyRetained,
    periodRetained,
    periodValueGbp,
    annualRetained,
    valueProtected,
    continuationProtected,
    guaranteeProtected,
    standingProtected,
    periodContinuationRisk,
    periodGuaranteeRisk,
    periodStandingRisk,
    periodSupplyRisk,
    periodExposure,
    periodContinuationProtected,
    periodGuaranteeProtected,
    periodStandingProtected,
    periodProtected,
    periodSurfaced,
  }
}
