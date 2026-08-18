const SAVINGS_RATE = 0.3
const WORKDAYS_PER_MONTH = 22
const ONBOARDING_COST_PER_COMMUTER = 2500

export function parseNumericInput(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  const parsed = Number(cleaned)
  if (!Number.isFinite(parsed) || parsed <= 0) return null
  return parsed
}

export function calculateAnnualSavings(monthlySpend: number): number {
  return monthlySpend * 12 * SAVINGS_RATE
}

export function calculateAuditMetrics(monthlySpend: number, dailyCommuters: number) {
  const monthlySavings = monthlySpend * SAVINGS_RATE
  const annualSavings = monthlySavings * 12
  const optimizedMonthlySpend = monthlySpend - monthlySavings
  const costPerEmployeeDay = monthlySpend / dailyCommuters / WORKDAYS_PER_MONTH
  const dailySavings = monthlySavings / WORKDAYS_PER_MONTH
  const onboardingCost = dailyCommuters * ONBOARDING_COST_PER_COMMUTER
  const paybackDays = Math.max(7, Math.round(onboardingCost / dailySavings))

  return {
    monthlySavings,
    annualSavings,
    optimizedMonthlySpend,
    costPerEmployeeDay,
    paybackDays,
    savingsRate: SAVINGS_RATE,
  }
}

export function formatPkr(amount: number): string {
  return `PKR ${Math.round(amount).toLocaleString("en-PK")}`
}

export function hasValidInputs(monthlySpend: number | null, dailyCommuters: number | null): boolean {
  return monthlySpend !== null && dailyCommuters !== null
}
