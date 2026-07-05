"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { getPhoneMaxLength, getPhonePlaceholder, getPhoneValidationError, sanitizePhoneInput, type PhoneCountry } from "@/lib/phone"

type TrialResponse = {
  data: {
    expiresAt: string
  }
}

const COUNTRIES = ["Pakistan", "Saudi Arabia"] as const satisfies readonly PhoneCountry[]

function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? ""
}

function getPortalLoginUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_PORTAL_URL ??
    (process.env.NODE_ENV === "production" ? "https://portal.traflinq.com" : "http://localhost:3000")
  return `${base.replace(/\/+$/, "")}/company/login`
}

export function ExploreGate() {
  const t = useTranslations("common.explore")
  const tValidation = useTranslations("common.validation")

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    country: "Pakistan" as PhoneCountry,
    phone: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const portalLoginUrl = useMemo(() => getPortalLoginUrl(), [])
  const phoneCountry = form.country

  const phoneInvalidMessage = useMemo(() => {
    return phoneCountry === "Saudi Arabia"
      ? tValidation("phoneInvalidSaudiArabia")
      : tValidation("phoneInvalidPakistan")
  }, [phoneCountry, tValidation])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const phoneError = getPhoneValidationError(form.phone, {
      required: true,
      country: phoneCountry,
      messages: {
        required: tValidation("phoneRequired"),
        invalid: phoneInvalidMessage,
      },
    })
    if (phoneError) {
      setError(phoneError)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${getApiBase()}/trial/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role || undefined,
          phone: form.phone.replace(/\D/g, ""),
          organization: form.organization || undefined,
          country: form.country || undefined,
        }),
      })

      const json = (await res.json()) as TrialResponse
      if (!res.ok) {
        const msg = (json as any)?.message
        throw new Error(Array.isArray(msg) ? msg.join("; ") : (msg || "Request failed"))
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/45 leading-relaxed">
            {t("subtitle")}
          </p>

          {!submitted ? (
            <form className="mt-10 flex flex-col gap-5" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{t("fields.name")}</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder={t("placeholders.name")}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{t("fields.email")}</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder={t("placeholders.email")}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full ltr-content"
                    dir="ltr"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{t("fields.role")}</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    placeholder={t("placeholders.role")}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{t("fields.organization")}</label>
                  <input
                    value={form.organization}
                    onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                    placeholder={t("placeholders.organization")}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{t("fields.country")}</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm((p) => ({ ...p, country: e.target.value as PhoneCountry, phone: sanitizePhoneInput(p.phone, e.target.value as PhoneCountry) }))}
                    className="rounded-xl border border-white/10 bg-[#0d1018] px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none w-full cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0d1018]">{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{t("fields.phone")}</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: sanitizePhoneInput(e.target.value, phoneCountry) }))}
                    placeholder={getPhonePlaceholder(phoneCountry)}
                    maxLength={getPhoneMaxLength(phoneCountry)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full ltr-content"
                    dir="ltr"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-primary text-white hover:bg-primary/90 h-11 font-bold"
              >
                {submitting ? "…" : t("cta")}
              </Button>
            </form>
          ) : (
            <div className="mt-10">
              <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-5">
                <div className="text-lg font-bold text-white">{t("successTitle")}</div>
                <div className="mt-1 text-sm text-white/50">{t("successSubtitle")}</div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href={portalLoginUrl} className="inline-flex" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary h-11 font-bold">
                    {t("goToLogin")}
                  </Button>
                </a>
                <a href="https://calendar.app.google/qeHQgMANfWNr77yz6" className="inline-flex" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 h-11 font-bold">
                    {t("bookDemo")}
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
