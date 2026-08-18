"use client"

import { startTransition, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ArrowRight, ClipboardCheck, MapPin, Sparkles, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  calculateAuditMetrics,
  CURRENCY_EXAMPLES,
  formatMoney,
  hasValidInputs,
  parseNumericInput,
  type AuditCurrency,
} from "@/lib/self-audit"

const CALENDAR_URL = "https://calendar.app.google/qeHQgMANfWNr77yz6"

const PILLAR_KEYS = [
  { key: "cost", icon: Wallet },
  { key: "convenience", icon: Sparkles },
  { key: "tracking", icon: MapPin },
] as const

export function SelfAuditSection() {
  const t = useTranslations("landing.selfAuditFlow")
  const pathname = usePathname()
  const isSaudiRoute = pathname === "/sa" || pathname.startsWith("/sa/")
  const basePath = isSaudiRoute ? "/sa" : ""
  const [inputsValid, setInputsValid] = useState(false)

  return (
    <section
      id="self-audit"
      className="scroll-mt-24 border-t border-white/[0.04] bg-[#080b14] py-16 sm:py-20"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute start-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/6 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-8 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary/80">
            <ClipboardCheck className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/45">
            {t("subtext")}
          </p>
        </motion.div>

        <div className="relative grid items-stretch gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6 backdrop-blur-sm"
          >
            <AuditFormCard isSaudiRoute={isSaudiRoute} onValidityChange={setInputsValid} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="flex h-full flex-col gap-3"
          >
            <div className="flex-1 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/30">
                {t("output.pillarsHeading")}
              </p>
              <div className="space-y-2">
                {PILLAR_KEYS.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white">{t(`pillars.${key}.title`)}</h3>
                      <p className="mt-0.5 text-sm leading-snug text-white/45">
                        {t(`pillars.${key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/[0.04] px-5 py-4">
              {inputsValid ? (
                <Link href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="lg"
                    className="h-10 w-full gap-2 bg-primary text-sm font-semibold text-white hover:bg-primary/90"
                  >
                    {t("cta.claim")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  disabled
                  className="h-10 w-full gap-2 text-sm font-semibold"
                >
                  {t("cta.claim")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              )}
              <p className="mt-2 text-center text-sm text-white/40">{t("cta.helper")}</p>
              <p className="mt-1.5 text-center text-xs text-white/25">{t("output.trust")}</p>
              <div className="mt-2 text-center">
                <Link
                  href={`${basePath}/support`}
                  className="text-sm text-primary/80 transition-colors hover:text-primary"
                >
                  {t("cta.contactSales")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AuditFormCard({
  isSaudiRoute,
  onValidityChange,
}: {
  isSaudiRoute: boolean
  onValidityChange: (valid: boolean) => void
}) {
  const t = useTranslations("landing.selfAuditFlow")
  const [localCurrency, setLocalCurrency] = useState<Exclude<AuditCurrency, "SAR">>("PKR")
  const currency: AuditCurrency = isSaudiRoute ? "SAR" : localCurrency

  const [monthlySpendInput, setMonthlySpendInput] = useState("")
  const [dailyEmployeesInput, setDailyEmployeesInput] = useState("")
  const [dailyVehiclesInput, setDailyVehiclesInput] = useState("")
  const [monthlySpend, setMonthlySpend] = useState<number | null>(null)
  const [dailyEmployees, setDailyEmployees] = useState<number | null>(null)
  const [dailyVehicles, setDailyVehicles] = useState<number | null>(null)

  const metrics = monthlySpend !== null ? calculateAuditMetrics(monthlySpend) : null
  const money = (amount: number) => formatMoney(amount, currency)

  useEffect(() => {
    onValidityChange(hasValidInputs(monthlySpend, dailyEmployees, dailyVehicles))
  }, [monthlySpend, dailyEmployees, dailyVehicles, onValidityChange])

  return (
    <>
      <div className="space-y-3">
        {!isSaudiRoute && (
          <div className="flex justify-end">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs font-bold">
              {(["PKR", "USD"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocalCurrency(code)}
                  className={`rounded-full px-3 py-1.5 transition-colors ${
                    localCurrency === code
                      ? "bg-primary text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="monthly-spend" className="text-sm font-medium text-white/70">
            {t("fields.monthlySpend", { currency })}
          </label>
          <Input
            id="monthly-spend"
            inputMode="numeric"
            type="text"
            value={monthlySpendInput}
            onChange={(e) => {
              const value = e.target.value
              setMonthlySpendInput(value)
              startTransition(() => {
                setMonthlySpend(parseNumericInput(value))
              })
            }}
            placeholder={t("fields.monthlySpendPlaceholder", { example: CURRENCY_EXAMPLES[currency] })}
            className="h-10 border-white/10 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content"
            dir="ltr"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="daily-employees" className="text-sm font-medium text-white/70">
              {t("fields.dailyEmployees")}
            </label>
            <Input
              id="daily-employees"
              inputMode="numeric"
              type="text"
              value={dailyEmployeesInput}
              onChange={(e) => {
                const value = e.target.value
                setDailyEmployeesInput(value)
                startTransition(() => {
                  setDailyEmployees(parseNumericInput(value))
                })
              }}
              placeholder={t("fields.dailyEmployeesPlaceholder")}
              className="h-10 border-white/10 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="daily-vehicles" className="text-sm font-medium text-white/70">
              {t("fields.dailyVehicles")}
            </label>
            <Input
              id="daily-vehicles"
              inputMode="numeric"
              type="text"
              value={dailyVehiclesInput}
              onChange={(e) => {
                const value = e.target.value
                setDailyVehiclesInput(value)
                startTransition(() => {
                  setDailyVehicles(parseNumericInput(value))
                })
              }}
              placeholder={t("fields.dailyVehiclesPlaceholder")}
              className="h-10 border-white/10 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        {metrics ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-widest text-primary/70">
                  {t("output.label")}
                </p>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {t("output.rateHint")}
                </span>
              </div>
              <p className="mt-1.5 text-3xl font-bold tabular-nums text-primary sm:text-4xl">
                {money(metrics.annualSavings)}
              </p>
            </div>

            <div className="space-y-2">
              <SpendBar
                label={t("output.before")}
                value={money(monthlySpend ?? 0)}
                width="100%"
                tone="muted"
              />
              <SpendBar
                label={t("output.after")}
                value={money(metrics.optimizedMonthlySpend)}
                width="70%"
                tone="primary"
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-5 py-5 text-center">
            <p className="text-sm text-white/35">{t("output.emptyPrompt")}</p>
            <div className="mt-4 space-y-2 opacity-40">
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-[70%] rounded-full bg-primary/25" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function SpendBar({
  label,
  value,
  width,
  tone,
}: {
  label: string
  value: string
  width: string
  tone: "muted" | "primary"
}) {
  const isPrimary = tone === "primary"

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <span className="text-xs text-white/40">{label}</span>
        <span className={`text-xs font-semibold tabular-nums ${isPrimary ? "text-primary" : "text-white/55"}`}>
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${isPrimary ? "bg-primary" : "bg-white/25"}`}
          style={{ width }}
        />
      </div>
    </div>
  )
}
