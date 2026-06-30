"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Twitter, Linkedin, Github } from "lucide-react"

export default function ComingSoon() {
  const t = useTranslations("comingSoon")

  return (
    <div className="min-h-screen bg-white text-[#131313] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] start-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] end-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fe8503 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="z-10 max-w-4xl w-full text-center space-y-12">
        <div className="flex justify-center mb-8">
          <img
            src="/traflinq_light_no_tagline-Photoroom.png"
            alt={t("logoAlt")}
            className="h-16 w-auto"
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t("badge")}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#131313]">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">{chunks}</span>
              ),
            })}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.rich("description", {
              savings: (chunks) => <span className="text-primary font-semibold">{chunks}</span>,
            })}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-xl shadow-primary/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 end-0 p-4 opacity-10">
            <ArrowRight className="rotate-[-45deg] rtl:rotate-[135deg] text-primary" size={48} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-start">
              <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">{t("projectedSavings")}</div>
              <div className="text-5xl font-bold text-[#131313] flex items-baseline gap-2">
                40% <span className="text-primary text-lg font-normal">{t("lessCost")}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary/80">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-[10px] text-primary font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                {t("optimizedRoutes")}
              </div>
            </div>
            <div className="h-24 flex items-end gap-2 px-4">
              {[40, 65, 45, 90, 55, 75, 45].map((h, i) => (
                <div
                  key={i}
                  className="w-3 bg-primary/10 rounded-t-full transition-all duration-500 group-hover:bg-primary group-hover:animate-pulse"
                  style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 pt-12 pb-12">
          <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Twitter size={24} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Github size={24} />
          </Link>
        </div>
      </div>

      <div className="mt-auto py-8 flex items-center gap-8 text-xs text-gray-400 z-10">
        <Link href="/support" className="hover:text-primary transition-colors underline underline-offset-4">{t("support")}</Link>
        <Link href="/privacy" className="hover:text-primary transition-colors underline underline-offset-4">{t("privacy")}</Link>
      </div>
    </div>
  )
}
