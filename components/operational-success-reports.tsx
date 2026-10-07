"use client"

import { motion } from "framer-motion"
import { Fingerprint, History, ShieldCheck, Building2 } from "lucide-react"
import { useTranslations } from "next-intl"
import SpotlightCard from "@/components/SpotlightCard"
import FadeContent from "@/components/FadeContent"

const CONTROLS = [
  { key: "soc2", icon: ShieldCheck },
  { key: "tenantIsolation", icon: Building2 },
  { key: "rbac", icon: Fingerprint },
  { key: "auditLogs", icon: History },
] as const

export function OperationalSuccessReports() {
  const t = useTranslations("landing.trust")

  return (
    <section id="institutional-trust" className="py-24 sm:py-32 bg-[#060810] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeContent blur className="max-w-2xl mb-16">
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTROLS.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              <SpotlightCard
                spotlightColor="rgba(254, 133, 3, 0.16)"
                className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8"
              >
              <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{t(`pillars.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-white/40 leading-6">{t(`pillars.${key}.description`)}</p>
              </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
