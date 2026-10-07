const SAVINGS_RATE = 0.3

export type AuditCurrency = "PKR" | "USD" | "SAR"
export type AuditMode = "commute" | "travel"

export const CURRENCY_EXAMPLES: Record<AuditCurrency, string> = {
  PKR: "500000",
  USD: "1800",
  SAR: "7000",
}

export const TRAVEL_CURRENCY_EXAMPLES: Record<AuditCurrency, string> = {
  PKR: "2000000",
  USD: "7000",
  SAR: "26000",
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

// ─── Model assumptions (indicative benchmarks — confirm before publishing) ───
const SEATS_PER_VEHICLE = 8
const ROUTE_EFFICIENCY_GAIN = 0.14 // share of routes that overlap/redundant today
const UTILIZATION_UPLIFT = 1.22 // empty-seat share recovered via optimization
const MAX_UTILIZATION = 0.92
const POLICY_LEAKAGE_RATE = 0.12 // share of travel spend that is out-of-policy
const VENDOR_RATE_YIELD = 0.06 // share of spend recovered via vendor rate/PO reconciliation
const MANUAL_HOURS_PER_INVOICE = 0.75 // 45 min of manual matching per vendor invoice
const RECONCILIATION_AUTOMATION_RATE = 0.8

export function calculateCommuteMetrics(monthlySpend: number, employees: number, vehicles: number) {
  const base = calculateAuditMetrics(monthlySpend)
  const currentUtilization = Math.min(employees / (vehicles * SEATS_PER_VEHICLE), 0.95)
  const projectedUtilization = Math.min(Math.max(currentUtilization * UTILIZATION_UPLIFT, currentUtilization), MAX_UTILIZATION)
  return {
    ...base,
    routeEfficiencyGain: ROUTE_EFFICIENCY_GAIN,
    currentUtilization,
    projectedUtilization,
    monthlyLeakageRecovery: base.monthlySavings,
  }
}

export function calculateTravelMetrics(monthlySpend: number, invoices: number) {
  const policyLeakagePrevented = monthlySpend * POLICY_LEAKAGE_RATE
  const vendorRateYield = monthlySpend * VENDOR_RATE_YIELD
  const monthlySavings = policyLeakagePrevented + vendorRateYield
  const hoursSaved = invoices * MANUAL_HOURS_PER_INVOICE * RECONCILIATION_AUTOMATION_RATE
  return {
    monthlySavings,
    annualSavings: monthlySavings * 12,
    optimizedMonthlySpend: monthlySpend - monthlySavings,
    savingsRate: POLICY_LEAKAGE_RATE + VENDOR_RATE_YIELD,
    policyLeakagePrevented,
    vendorRateYield,
    hoursSaved,
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
