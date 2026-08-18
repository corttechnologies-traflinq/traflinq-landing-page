"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ArrowRight, ClipboardCheck, MapPin, Sparkles, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  calculateAuditMetrics,
  formatPkr,
  hasValidInputs,
  parseNumericInput,
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

  const [monthlySpendInput, setMonthlySpendInput] = useState("")
  const [dailyCommutersInput, setDailyCommutersInput] = useState("")

  const monthlySpend = useMemo(() => parseNumericInput(monthlySpendInput), [monthlySpendInput])
  const dailyCommuters = useMemo(() => parseNumericInput(dailyCommutersInput), [dailyCommutersInput])
  const inputsValid = hasValidInputs(monthlySpend, dailyCommuters)
  const metrics = monthlySpend !== null && dailyCommuters !== null
    ? calculateAuditMetrics(monthlySpend, dailyCommuters)
    : null

  return (
    <section
      id="self-audit"
      className="scroll-mt-24 border-t border-white/[0.04] bg-[#080b14] py-24 sm:py-32"
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
          className="relative mb-14 text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary/80">
            <ClipboardCheck className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/45">
            {t("subtext")}
          </p>
        </motion.div>

        <div className="relative grid items-stretch gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.025] p-8 backdrop-blur-sm"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="monthly-spend" className="text-sm font-medium text-white/70">
                  {t("fields.monthlySpend")}
                </label>
                <Input
                  id="monthly-spend"
                  inputMode="numeric"
                  type="text"
                  value={monthlySpendInput}
                  onChange={(e) => setMonthlySpendInput(e.target.value)}
                  placeholder={t("fields.monthlySpendPlaceholder")}
                  className="h-12 border-white/10 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="daily-commuters" className="text-sm font-medium text-white/70">
                  {t("fields.dailyCommuters")}
                </label>
                <Input
                  id="daily-commuters"
                  inputMode="numeric"
                  type="text"
                  value={dailyCommutersInput}
                  onChange={(e) => setDailyCommutersInput(e.target.value)}
                  placeholder={t("fields.dailyCommutersPlaceholder")}
                  className="h-12 border-white/10 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-1 flex-col justify-end border-t border-white/[0.06] pt-7">
              <AnimatePresence mode="wait">
                {metrics ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-medium uppercase tracking-widest text-primary/70">
                          {t("output.label")}
                        </p>
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {t("output.rateHint")}
                        </span>
                      </div>
                      <p className="mt-2 text-4xl font-bold tabular-nums text-primary sm:text-5xl">
                        {formatPkr(metrics.annualSavings)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <SpendBar
                        label={t("output.before")}
                        value={formatPkr(monthlySpend ?? 0)}
                        width="100%"
                        tone="muted"
                      />
                      <SpendBar
                        label={t("output.after")}
                        value={formatPkr(metrics.optimizedMonthlySpend)}
                        width="70%"
                        tone="primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <StatLine label={t("output.monthlySavings")} value={formatPkr(metrics.monthlySavings)} />
                      <StatLine label={t("output.costPerEmployeeDay")} value={formatPkr(metrics.costPerEmployeeDay)} />
                      <StatLine
                        label={t("output.paybackPeriod")}
                        value={t("output.paybackDays", { days: metrics.paybackDays })}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[220px] flex-col justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-5 py-8 text-center"
                  >
                    <p className="text-sm text-white/35">{t("output.emptyPrompt")}</p>
                    <div className="mt-6 space-y-2.5 opacity-40">
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-[70%] rounded-full bg-primary/25" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="flex h-full flex-col gap-4"
          >
            <div className="flex-1 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">
                {t("output.pillarsHeading")}
              </p>
              <div className="space-y-3">
                {PILLAR_KEYS.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white">{t(`pillars.${key}.title`)}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/45">
                        {t(`pillars.${key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/[0.04] px-6 py-5">
              {inputsValid ? (
                <Link href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="lg"
                    className="h-12 w-full gap-2 bg-primary text-sm font-semibold text-white hover:bg-primary/90"
                  >
                    {t("cta.claim")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  disabled
                  className="h-12 w-full gap-2 text-sm font-semibold"
                >
                  {t("cta.claim")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              )}
              <p className="mt-3 text-center text-sm text-white/40">{t("cta.helper")}</p>
              <p className="mt-2 text-center text-xs text-white/25">{t("output.trust")}</p>
              <div className="mt-3 text-center">
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
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-xs text-white/40">{label}</span>
        <span className={`text-xs font-semibold tabular-nums ${isPrimary ? "text-primary" : "text-white/55"}`}>
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={`h-full rounded-full ${isPrimary ? "bg-primary" : "bg-white/25"}`}
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
      <p className="text-[11px] leading-snug text-white/35">{label}</p>
      <p className="mt-1 text-sm font-semibold tabular-nums text-white">{value}</p>
    </div>
  )
}
