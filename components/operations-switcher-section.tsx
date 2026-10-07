"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Bus, Plane } from "lucide-react"
import FadeContent from "@/components/FadeContent"

const TABS = [
  { key: "commute", icon: Bus },
  { key: "travel", icon: Plane },
] as const

type TabKey = (typeof TABS)[number]["key"]

export function OperationsSwitcherSection() {
  const t = useTranslations("landing.operations")
  const [active, setActive] = useState<TabKey>("commute")

  const rows = [
    { label: t("rows.dimension"), key: "dimension" },
    { label: t("rows.capabilities"), key: "capabilities" },
    { label: t("rows.audience"), key: "audience" },
  ] as const

  return (
    <section id="operations" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <FadeContent blur className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
        </FadeContent>

        <div
          role="tablist"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2"
        >
          {TABS.map(({ key, icon: Icon }) => {
            const selected = active === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`ops-tab-${key}`}
                aria-selected={selected}
                aria-controls={`ops-panel-${key}`}
                onClick={() => setActive(key)}
                className={`flex items-center gap-3 rounded-xl px-5 py-4 text-start transition-all duration-300 ${
                  selected
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    selected ? "bg-white/15" : "bg-primary/10 border border-primary/20"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${selected ? "text-white" : "text-primary"}`} />
                </span>
                <span>
                  <span className="block text-sm font-bold sm:text-base">{t(`tabs.${key}.label`)}</span>
                  <span className={`block text-xs ${selected ? "text-white/80" : "text-white/30"}`}>
                    {t(`tabs.${key}.tag`)}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`ops-panel-${active}`}
            aria-labelledby={`ops-tab-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.025]"
          >
            {rows.map((row) => (
              <div key={row.key} className="grid gap-2 px-6 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                <p className="text-[11px] font-medium uppercase tracking-widest text-primary/60">{row.label}</p>
                <p
                  className={`leading-7 ${
                    row.key === "dimension" ? "text-lg font-semibold text-white" : "text-sm text-white/50"
                  }`}
                >
                  {t(`tabs.${active}.${row.key}`)}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
