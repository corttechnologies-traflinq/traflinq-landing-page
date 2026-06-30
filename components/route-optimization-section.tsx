"use client"

import { Monitor, BrainCircuit, Layers } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function RouteOptimizationSection() {
  const t = useTranslations("landing.tech")

  const pillars = [
    {
      icon: Monitor,
      tag: t("pillars.commandCenter.tag"),
      title: t("pillars.commandCenter.title"),
      description: t("pillars.commandCenter.description"),
      image: "/command-center-preview.png",
    },
    {
      icon: BrainCircuit,
      tag: t("pillars.fiscalEngine.tag"),
      title: t("pillars.fiscalEngine.title"),
      description: t("pillars.fiscalEngine.description"),
      image: "/fleet-data-preview.png",
    },
    {
      icon: Layers,
      tag: t("pillars.intelligenceLayer.tag"),
      title: t("pillars.intelligenceLayer.title"),
      description: t("pillars.intelligenceLayer.description"),
      image: "/ai-insights-preview.png",
    },
  ]

  return (
    <section id="command-center" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-white/40 leading-7">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.2, 
                ease: [0.21, 0.45, 0.32, 0.9] 
              }}
              className="relative group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 overflow-hidden hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="absolute inset-0 z-0 opacity-[0.12] group-hover:opacity-[0.25] transition-opacity duration-700 pointer-events-none">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-transparent to-transparent" />
              </div>

              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10px] text-white/15 tracking-widest uppercase font-medium">
                  0{i + 1}
                </span>

                <div className="mt-4 h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                  <pillar.icon className="h-6 w-6 text-primary" />
                </div>

                <p className="mt-5 text-[11px] text-primary/60 tracking-widest uppercase font-medium">
                  {pillar.tag}
                </p>

                <h3 className="mt-2 text-xl font-bold text-white leading-snug">{pillar.title}</h3>

                <p className="mt-3 text-sm text-white/40 leading-6">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
