"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function AboutSection() {
  const t = useTranslations("landing.about")

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/45">
            {t("description")}
          </p>
          <p className="mt-4 text-sm text-white/30 leading-relaxed">
            {t("descriptionSecondary")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
            <div>
              <p className="text-3xl font-bold text-white tracking-tight">99.9%</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-semibold">{t("stats.uptime")}</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-white/10" />
            <div>
              <p className="text-3xl font-bold text-white tracking-tight">Zero</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-semibold">{t("stats.dataSilos")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
