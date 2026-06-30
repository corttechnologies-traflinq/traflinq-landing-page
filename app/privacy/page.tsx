"use client"

import { useTranslations } from "next-intl"
import { Shield, Lock, Eye, FileText, Smartphone, MapPin, BrainCircuit, UserMinus, Clock, Baby, Bell, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function EmailLink({ children }: { children: React.ReactNode }) {
  const email = String(children)
  return (
    <a href={`mailto:${email}`} className="text-primary hover:underline ltr-content" dir="ltr">
      {children}
    </a>
  )
}

function CompanyName({ children }: { children: React.ReactNode }) {
  return <span className="text-white font-semibold">{children}</span>
}

export default function PrivacyPolicy() {
  const t = useTranslations("privacy")

  const richTags = {
    company: (chunks: React.ReactNode) => <CompanyName>{chunks}</CompanyName>,
    email: (chunks: React.ReactNode) => <EmailLink>{chunks}</EmailLink>,
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />
      <div className="relative overflow-hidden px-6 pt-32 pb-16 md:py-32 lg:py-36">
      <div className="absolute top-0 start-0 w-[50%] h-[50%] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="space-y-12">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary/60 text-xs tracking-widest uppercase font-medium mb-4">
              <Shield size={14} />
              <span>{t("badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-white/30">{t("effectiveDate")}</p>
          </header>

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 space-y-12">
            <div className="prose prose-invert max-w-none space-y-12 text-white/45 leading-relaxed">
              <p>
                {t.rich("intro", richTags)}
              </p>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.obtain.title")}</h2>
                </div>
                <p>{t("sections.obtain.p1")}</p>
                <p>{t("sections.obtain.p2")}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Smartphone className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.automatic.title")}</h2>
                </div>
                <p>{t("sections.automatic.p1")}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.location.title")}</h2>
                </div>
                <p>{t("sections.location.p1")}</p>
                <ul className="list-disc ps-6 space-y-2">
                  <li><strong className="text-white">{t("sections.location.geolocation")}</strong> {t("sections.location.geolocationDesc")}</li>
                  <li><strong className="text-white">{t("sections.location.analytics")}</strong> {t("sections.location.analyticsDesc")}</li>
                  <li><strong className="text-white">{t("sections.location.thirdParty")}</strong> {t("sections.location.thirdPartyDesc")}</li>
                </ul>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BrainCircuit className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.ai.title")}</h2>
                </div>
                <p>{t("sections.ai.p1")}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.thirdParties.title")}</h2>
                </div>
                <p>{t("sections.thirdParties.p1")}</p>
                <p>{t("sections.thirdParties.p2")}</p>
                <ul className="list-disc ps-6 space-y-2">
                  <li><a href="https://www.google.com/policies/privacy/" className="text-primary hover:underline">{t("sections.thirdParties.googlePlay")}</a></li>
                  <li><a href="https://expo.io/privacy" className="text-primary hover:underline">{t("sections.thirdParties.expo")}</a></li>
                </ul>
                <p>{t("sections.thirdParties.p3")}</p>
                <ul className="list-disc ps-6 space-y-2">
                  <li>{t("sections.thirdParties.disclosure1")}</li>
                  <li>{t("sections.thirdParties.disclosure2")}</li>
                  <li>{t("sections.thirdParties.disclosure3")}</li>
                </ul>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserMinus className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.optOut.title")}</h2>
                </div>
                <p>{t("sections.optOut.p1")}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.retention.title")}</h2>
                </div>
                <p>{t.rich("sections.retention.p1", richTags)}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Baby className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.children.title")}</h2>
                </div>
                <p>{t.rich("sections.children.p1", richTags)}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.security.title")}</h2>
                </div>
                <p>{t("sections.security.p1")}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bell className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.changes.title")}</h2>
                </div>
                <p>{t("sections.changes.p1")}</p>
              </section>

              <section className="bg-primary/[0.04] border border-primary/20 p-8 rounded-3xl space-y-4">
                <h2 className="text-2xl font-bold text-white m-0">{t("sections.consent.title")}</h2>
                <p className="m-0">{t("sections.consent.p1")}</p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="text-primary" size={16} />
                  </div>
                  <h2 className="text-xl font-bold m-0 text-white">{t("sections.contact.title")}</h2>
                </div>
                <p>{t.rich("sections.contact.p1", richTags)}</p>
              </section>
            </div>
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
