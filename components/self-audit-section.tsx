"use client"

import { startTransition, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ArrowRight, Bus, ClipboardCheck, MapPin, Plane, Sparkles, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountUp from "@/components/CountUp"
import {
  calculateCommuteMetrics,
  calculateTravelMetrics,
  CURRENCY_EXAMPLES,
  TRAVEL_CURRENCY_EXAMPLES,
  formatMoney,
  hasValidInputs,
  parseNumericInput,
  type AuditCurrency,
  type AuditMode,
} from "@/lib/self-audit"

const CALENDAR_URL = "https://calendar.app.google/qeHQgMANfWNr77yz6"

const MODES = [
  { key: "commute", icon: Bus },
  { key: "travel", icon: Plane },
] as const

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
  const [mode, setMode] = useState<AuditMode>("commute")
  const [localCurrency, setLocalCurrency] = useState<Exclude<AuditCurrency, "SAR">>("PKR")

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

          <div
            role="tablist"
            aria-label={t("title")}
            className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
          >
            {MODES.map(({ key, icon: Icon }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => setMode(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors sm:text-sm ${
                  mode === key ? "bg-primary text-white" : "text-white/45 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(`modes.${key}`)}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative grid items-stretch gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6 backdrop-blur-sm"
          >
            <AuditFormCard
              key={mode}
              mode={mode}
              isSaudiRoute={isSaudiRoute}
              localCurrency={localCurrency}
              onCurrencyChange={setLocalCurrency}
              onValidityChange={setInputsValid}
            />
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
                      <h3 className="text-sm font-semibold text-white">{t(`${mode}.pillars.${key}.title`)}</h3>
                      <p className="mt-0.5 text-sm leading-snug text-white/45">
                        {t(`${mode}.pillars.${key}.description`)}
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
  mode,
  isSaudiRoute,
  localCurrency,
  onCurrencyChange,
  onValidityChange,
}: {
  mode: AuditMode
  isSaudiRoute: boolean
  localCurrency: Exclude<AuditCurrency, "SAR">
  onCurrencyChange: (currency: Exclude<AuditCurrency, "SAR">) => void
  onValidityChange: (valid: boolean) => void
}) {
  const t = useTranslations("landing.selfAuditFlow")
  const currency: AuditCurrency = isSaudiRoute ? "SAR" : localCurrency
  const examples = mode === "commute" ? CURRENCY_EXAMPLES : TRAVEL_CURRENCY_EXAMPLES

  const [monthlySpendInput, setMonthlySpendInput] = useState("")
  const [secondInput, setSecondInput] = useState("")
  const [thirdInput, setThirdInput] = useState("")
  const [monthlySpend, setMonthlySpend] = useState<number | null>(null)
  const [second, setSecond] = useState<number | null>(null)
  const [third, setThird] = useState<number | null>(null)

  const inputsComplete = hasValidInputs(monthlySpend, second, third)
  const money = (amount: number) => formatMoney(amount, currency)

  const commute =
    mode === "commute" && inputsComplete && monthlySpend !== null && second !== null && third !== null
      ? calculateCommuteMetrics(monthlySpend, second, third)
      : null
  const travel =
    mode === "travel" && inputsComplete && monthlySpend !== null && third !== null
      ? calculateTravelMetrics(monthlySpend, third)
      : null
  const metrics = commute ?? travel

  const percent = (n: number) => `${Math.round(n * 100)}%`
  const tiles: { label: string; value: string }[] = commute
    ? [
        { label: t("commute.metrics.first"), value: percent(commute.routeEfficiencyGain) },
        {
          label: t("commute.metrics.second"),
          value: `${percent(commute.currentUtilization)} → ${percent(commute.projectedUtilization)}`,
        },
        { label: t("commute.metrics.third"), value: money(commute.monthlyLeakageRecovery) },
      ]
    : travel
      ? [
          { label: t("travel.metrics.first"), value: money(travel.policyLeakagePrevented) },
          {
            label: t("travel.metrics.second"),
            value: t("travel.metrics.hours", { hours: Math.round(travel.hoursSaved).toLocaleString("en-US") }),
          },
          { label: t("travel.metrics.third"), value: money(travel.vendorRateYield) },
        ]
      : []

  useEffect(() => {
    onValidityChange(inputsComplete)
  }, [inputsComplete, onValidityChange])

  const field = (
    id: string,
    label: string,
    value: string,
    setValue: (v: string) => void,
    setParsed: (n: number | null) => void,
    placeholder: string,
  ) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-white/70">
        {label}
      </label>
      <Input
        id={id}
        inputMode="numeric"
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value
          setValue(v)
          startTransition(() => {
            setParsed(parseNumericInput(v))
          })
        }}
        placeholder={placeholder}
        className="h-10 border-white/10 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content"
        dir="ltr"
      />
    </div>
  )

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
                  onClick={() => onCurrencyChange(code)}
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

        {field(
          "monthly-spend",
          t(`${mode}.fields.monthlySpend`, { currency }),
          monthlySpendInput,
          setMonthlySpendInput,
          setMonthlySpend,
          t(`${mode}.fields.monthlySpendPlaceholder`, { example: examples[currency] }),
        )}

        <div className="grid grid-cols-2 gap-4">
          {field(
            "audit-second",
            t(`${mode}.fields.second`),
            secondInput,
            setSecondInput,
            setSecond,
            t(`${mode}.fields.secondPlaceholder`),
          )}
          {field(
            "audit-third",
            t(`${mode}.fields.third`),
            thirdInput,
            setThirdInput,
            setThird,
            t(`${mode}.fields.thirdPlaceholder`),
          )}
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
                  {t(`${mode}.rateHint`)}
                </span>
              </div>
              <p dir="ltr" className="mt-1.5 text-start text-3xl font-bold tabular-nums text-primary sm:text-4xl">
                {currency}{" "}
                <CountUp to={Math.round(metrics.annualSavings)} duration={1} separator="," />
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
                width={`${Math.round((1 - metrics.savingsRate) * 100)}%`}
                tone="primary"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {tiles.map((tile) => (
                <div
                  key={tile.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                >
                  <p className="text-[10px] font-medium uppercase leading-snug tracking-wider text-white/35">
                    {tile.label}
                  </p>
                  <p className="mt-1 text-sm font-bold tabular-nums text-white">{tile.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-5 py-5 text-center">
            <p className="text-sm text-white/35">{t(`${mode}.emptyPrompt`)}</p>
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
