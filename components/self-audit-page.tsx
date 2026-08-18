"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ClipboardCheck, ShieldCheck, TrendingUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const CARD_KEYS = [
  { key: "leakage", icon: ClipboardCheck },
  { key: "utilization", icon: TrendingUp },
  { key: "governance", icon: ShieldCheck },
] as const

export function SelfAuditPage() {
  const t = useTranslations("selfAudit")
  const pathname = usePathname()
  const isSaudiRoute = pathname === "/sa/self-audit" || pathname.startsWith("/sa/")
  const basePath = isSaudiRoute ? "/sa" : ""

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />
      <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="absolute top-0 start-0 h-[40%] w-[45%] rounded-full bg-primary/8 blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-primary/70">
              <ClipboardCheck size={14} />
              <span>{t("badge")}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {t.rich("title", {
                highlight: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/45 md:text-xl">
              {t("description")}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CARD_KEYS.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {t(`cards.${key}.title`)}
                </h2>
                <p className="mt-3 leading-relaxed text-white/45">
                  {t(`cards.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-primary/20 bg-primary/[0.04] p-8 text-center md:p-10">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold">
                <Link href={`${basePath}/request-briefing`}>{t("cta.primary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-primary/40 px-8 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
              >
                <Link href={`${basePath}/support`}>{t("cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
