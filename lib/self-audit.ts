const SAVINGS_RATE = 0.3
const WORKDAYS_PER_MONTH = 22

export type AuditCurrency = "PKR" | "USD" | "SAR"

const ONBOARDING_COST_PER_COMMUTER: Record<AuditCurrency, number> = {
  PKR: 2500,
  USD: 9,
  SAR: 33,
}

export const CURRENCY_EXAMPLES: Record<AuditCurrency, string> = {
  PKR: "500000",
  USD: "1800",
  SAR: "7000",
}

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

export function calculateAuditMetrics(
  monthlySpend: number,
  dailyCommuters: number,
  currency: AuditCurrency,
) {
  const monthlySavings = monthlySpend * SAVINGS_RATE
  const annualSavings = monthlySavings * 12
  const optimizedMonthlySpend = monthlySpend - monthlySavings
  const costPerEmployeeDay = monthlySpend / dailyCommuters / WORKDAYS_PER_MONTH
  const dailySavings = monthlySavings / WORKDAYS_PER_MONTH
  const onboardingCost = dailyCommuters * ONBOARDING_COST_PER_COMMUTER[currency]
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

export function formatMoney(amount: number, currency: AuditCurrency): string {
  const locale = currency === "USD" ? "en-US" : currency === "SAR" ? "en-SA" : "en-PK"
  return `${currency} ${Math.round(amount).toLocaleString(locale)}`
}

export function hasValidInputs(monthlySpend: number | null, dailyCommuters: number | null): boolean {
  return monthlySpend !== null && dailyCommuters !== null
}
