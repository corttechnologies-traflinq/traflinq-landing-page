"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import {
  ArrowRight,
  BarChart3,
  Car,
  FileCheck2,
  Fuel,
  Layers,
  MapPinned,
  Plane,
  Repeat,
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
      { icon: Wallet, key: "liveSpend" },
    ],
  },
  {
    key: "company",
    items: [
      { icon: ShieldCheck, key: "approval" },
      { icon: Layers, key: "wallets" },
      { icon: BarChart3, key: "visibility" },
    ],
  },
  {
    key: "operations",
    items: [
      { icon: FileCheck2, key: "preview" },
      { icon: Fuel, key: "billing" },
      { icon: Car, key: "fleet" },
    ],
  },
]

export function TravelSection() {
  const t = useTranslations("landing.travel")
  const tCommon = useTranslations("common")
  const pathname = usePathname()
  const isSaudiRoute = pathname === "/sa" || pathname.startsWith("/sa/")
  const basePath = isSaudiRoute ? "/sa" : ""

  return (
    <section id="travel" className="relative py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              {t("badge")}
            </span>
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          </div>
          <p className="mt-2 text-sm text-white/30 tracking-wide">{t("kicker")}</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/45">{t("description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {groups.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: gi * 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500"
            >
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-center"
        >
          <p className="text-base text-white/50">
            <span className="font-semibold text-white">{t("cta.title")}</span> {t("cta.description")}
          </p>
          <Link
            href={`${basePath}/request-briefing`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {tCommon("actions.requestBriefing")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
