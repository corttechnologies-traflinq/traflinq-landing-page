"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowRight, Briefcase, Layers, Mail, Server, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const CAREERS_EMAIL = "tech@traflinq.com"

const ROLES = [
  { key: "fullstack", icon: Layers, stack: ["Next.js", "React", "NestJS", "TypeScript"] },
  { key: "backend", icon: Server, stack: ["NestJS", "Prisma", "Redis", "TypeScript"] },
  { key: "mobile", icon: Smartphone, stack: ["React Native", "Expo", "TypeScript"] },
] as const

export default function CareersPage() {
  const t = useTranslations("careers")

  const mailto = (role: string) =>
    `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(t("emailSubject", { role }))}`

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-6 pt-32 pb-24 md:pt-36">
        <div className="pointer-events-none absolute top-0 end-0 h-[50%] w-[50%] rounded-full bg-primary/6 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-primary/60">
              <Briefcase size={12} />
              <span>{t("badge")}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t.rich("title", {
                highlight: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/45">{t("description")}</p>
          </motion.div>

          <h2 className="mt-16 mb-6 text-xs font-medium uppercase tracking-widest text-white/30">
            {t("openRoles")}
          </h2>

          <div className="space-y-4">
            {ROLES.map(({ key, icon: Icon, stack }, i) => {
              const title = t(`roles.${key}.title`)
              return (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-colors hover:border-primary/30 hover:bg-white/[0.04] sm:p-8 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-widest text-primary/60">
                        {t(`roles.${key}.type`)}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white">{title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                        {t(`roles.${key}.description`)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/40"
                            dir="ltr"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button asChild className="shrink-0 gap-2 bg-primary text-white hover:bg-primary/90">
                    <a href={mailto(title)}>
                      {t("apply")}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </a>
                  </Button>
                </motion.article>
              )
            })}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-3xl border border-primary/20 bg-primary/[0.04] p-8 sm:p-10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="text-primary" size={20} />
              </div>
              <h2 className="text-2xl font-bold">{t("applyHeading")}</h2>
            </div>
            <p className="mt-5 max-w-2xl text-white/55 leading-7">
              {t.rich("applyBody", {
                email: (chunks) => (
                  <a
                    href={`mailto:${CAREERS_EMAIL}`}
                    dir="ltr"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-white/35">{t("applyOther")}</p>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
