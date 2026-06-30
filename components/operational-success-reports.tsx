"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Globe } from "lucide-react"
import { useTranslations } from "next-intl"

export function OperationalSuccessReports() {
  const t = useTranslations("landing.trust")

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: t("pillars.dataSovereignty.title"),
      description: t("pillars.dataSovereignty.description"),
    },
    {
      icon: Zap,
      title: t("pillars.uptime.title"),
      description: t("pillars.uptime.description"),
    },
    {
      icon: Globe,
      title: t("pillars.globalScalability.title"),
      description: t("pillars.globalScalability.description"),
    },
  ]

  const badges = [
    t("badges.encryption"),
    t("badges.accessControls"),
    t("badges.auditLogging"),
    t("badges.soc2"),
    t("badges.zeroTrust"),
  ]

  return (
    <section id="institutional-trust" className="py-24 sm:py-32 bg-[#060810] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("titleLine1")}<br />{t("titleLine2")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/45">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustPillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8"
            >
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-white/40 leading-6">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-white/30 tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              {badge}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
