const SAVINGS_RATE = 0.3

export type AuditCurrency = "PKR" | "USD" | "SAR"

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

export function calculateAuditMetrics(monthlySpend: number) {
  const monthlySavings = monthlySpend * SAVINGS_RATE
  const annualSavings = monthlySavings * 12
  const optimizedMonthlySpend = monthlySpend - monthlySavings

  return {
    monthlySavings,
    annualSavings,
    optimizedMonthlySpend,
    savingsRate: SAVINGS_RATE,
  }
}

export function formatMoney(amount: number, currency: AuditCurrency): string {
  const locale = currency === "USD" ? "en-US" : currency === "SAR" ? "en-SA" : "en-PK"
  return `${currency} ${Math.round(amount).toLocaleString(locale)}`
}

export function hasValidInputs(
  monthlySpend: number | null,
  dailyEmployees: number | null,
  dailyVehicles: number | null,
): boolean {
  return monthlySpend !== null && dailyEmployees !== null && dailyVehicles !== null
}
