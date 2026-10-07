"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import SpotlightCard from "@/components/SpotlightCard"
import FadeContent from "@/components/FadeContent"
import {
  BarChart3,
  BellRing,
  Car,
  FileCheck2,
  MapPinned,
  Plane,
  Repeat,
  SearchCheck,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"

type Item = { icon: LucideIcon; key: string }
type Group = { key: "traveler" | "company" | "operations"; items: Item[] }

const groups: Group[] = [
  {
    key: "traveler",
    items: [
      { icon: Plane, key: "everyMode" },
      { icon: MapPinned, key: "doorToDoor" },
      { icon: Repeat, key: "roundTrips" },
      { icon: BellRing, key: "liveTracking" },
    ],
  },
  {
    key: "company",
    items: [
      { icon: ShieldCheck, key: "approval" },
      { icon: Wallet, key: "budgets" },
      { icon: BarChart3, key: "spend" },
    ],
  },
  {
    key: "operations",
    items: [
      { icon: FileCheck2, key: "preview" },
      { icon: SearchCheck, key: "audit" },
      { icon: Car, key: "vendors" },
    ],
  },
]

export function TravelSection() {
  const t = useTranslations("landing.travel")

  return (
    <section id="travel" className="relative py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeContent blur className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {groups.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: gi * 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
            >
              <SpotlightCard
                spotlightColor="rgba(254, 133, 3, 0.16)"
                className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500"
              >
              <div className="relative z-10">
              <span className="text-[11px] text-primary/60 tracking-widest uppercase font-medium">
                {t(`groups.${group.key}.label`)}
              </span>
              <h3 className="mt-2 text-xl font-bold text-white leading-snug">
                {t(`groups.${group.key}.title`)}
              </h3>

              <div className="mt-8 space-y-6">
                {group.items.map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        {t(`groups.${group.key}.items.${item.key}.title`)}
                      </h4>
                      <p className="mt-1 text-sm text-white/40 leading-6">
                        {t(`groups.${group.key}.items.${item.key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
