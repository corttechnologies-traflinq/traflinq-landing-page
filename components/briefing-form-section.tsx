"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import {
  getPhoneMaxLength,
  getPhonePlaceholder,
  getPhoneValidationError,
  type PhoneCountry,
  sanitizePhoneInput,
} from "@/lib/phone"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Download, Loader2 } from "lucide-react"

const COUNTRIES = ["Pakistan", "Saudi Arabia"] as const satisfies readonly PhoneCountry[]

const CITIES_BY_COUNTRY: Record<PhoneCountry, readonly string[]> = {
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Sukkur", "Nooriabad", "Other"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Khobar", "Mecca", "Medina", "Other"],
}
const FLEET_SIZES = ["1 – 25", "26 – 50", "51 – 200", "200+"]
const PRIMARY_GOALS = [
  "Cost Optimisation",
  "Route & Fleet Automation",
  "Real-Time Tracking & Visibility",
  "Compliance & Governance",
  "Employee Experience",
  "Multiple Goals",
  "Other",
]

const BENEFIT_KEYS = ["roi", "footprint", "compliance", "implementation"] as const

interface FormState {
  name: string
  role: string
  email: string
  phone: string
  organization: string
  country: string
  city: string
  cityOther: string
  fleetSize: string
  primaryGoal: string
  primaryGoalOther: string
}

const EMPTY: FormState = {
  name: "", role: "", email: "", phone: "",
  organization: "", country: "Pakistan", city: "", cityOther: "",
  fleetSize: "", primaryGoal: "", primaryGoalOther: "",
}

const inputCls =
  "rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full"

const selectCls =
  "rounded-xl border border-white/10 bg-[#0d1018] px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none w-full cursor-pointer"

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[11px] font-bold uppercase tracking-widest text-white/40">
      {children}{required && <span className="text-primary ms-0.5">*</span>}
    </label>
  )
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
        <span className="text-[10px] font-black text-primary">{number}</span>
      </div>
      <span className="text-[11px] font-black uppercase tracking-[0.18em] text-primary/70">{title}</span>
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  )
}

export function BriefingFormSection() {
  const t = useTranslations("briefing")
  const tCommon = useTranslations("common.validation")
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const pathname = usePathname()
  const isSaudiRoute = pathname === "/sa/request-briefing" || pathname.startsWith("/sa/")
  const basePath = isSaudiRoute ? "/sa" : ""

  const phoneCountry = (form.country === "Saudi Arabia" ? "Saudi Arabia" : "Pakistan") as PhoneCountry
  const cities = CITIES_BY_COUNTRY[phoneCountry]

  const set = (id: keyof FormState, val: string) =>
    setForm((prev) => ({ ...prev, [id]: val }))

  const setCountry = (country: string) => {
    setForm((prev) => ({
      ...prev,
      country,
      city: "",
      cityOther: "",
      phone: sanitizePhoneInput(prev.phone, country as PhoneCountry),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const phoneError = getPhoneValidationError(form.phone, {
      required: true,
      country: phoneCountry,
      messages: {
        required: tCommon("phoneRequired"),
        invalid: phoneCountry === "Saudi Arabia"
          ? tCommon("phoneInvalidSaudiArabia")
          : tCommon("phoneInvalidPakistan"),
      },
    })
    if (phoneError) {
      alert(phoneError)
      return
    }
    setSubmitting(true)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ""
      const res = await fetch(`${apiBase}/support/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone.replace(/\D/g, ""),
          city: form.city === "Other" ? (form.cityOther || "Other") : form.city,
          primaryGoal: form.primaryGoal === "Other" ? (form.primaryGoalOther || "Other") : form.primaryGoal,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
    } catch (err) {
      console.error("Lead submission failed:", err)
      alert(t("submitError"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="briefing"
      className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">
              {t("badge")}
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              {t("title")}
            </h2>
            <p className="mt-6 text-base text-white/40 leading-relaxed max-w-md">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {BENEFIT_KEYS.map((key) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white/90">{t(`benefits.${key}.title`)}</h4>
                    <p className="text-xs text-white/40 mt-1 leading-relaxed">{t(`benefits.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 flex flex-col gap-7"
                >
                  <div className="flex flex-col gap-5">
                    <SectionHeading number="1" title={t("sections.person")} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="name" required>{t("fields.name")}</Label>
                        <input id="name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                          placeholder={t("placeholders.name")} required className={inputCls} />
                      </Field>
                      <Field>
                        <Label htmlFor="role" required>{t("fields.role")}</Label>
                        <input id="role" type="text" value={form.role} onChange={(e) => set("role", e.target.value)}
                          placeholder={t("placeholders.role")} required className={inputCls} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="email" required>{t("fields.email")}</Label>
                        <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                          placeholder={t("placeholders.email")} required className={`${inputCls} ltr-content`} dir="ltr" />
                      </Field>
                      <Field>
                        <Label htmlFor="phone" required>{t("fields.phone")}</Label>
                        <input id="phone" type="tel" inputMode="numeric" maxLength={getPhoneMaxLength(phoneCountry)} value={form.phone} onChange={(e) => set("phone", sanitizePhoneInput(e.target.value, phoneCountry))}
                          placeholder={getPhonePlaceholder(phoneCountry)} required className={`${inputCls} ltr-content`} dir="ltr" />
                      </Field>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <SectionHeading number="2" title={t("sections.operation")} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="organization" required>{t("fields.organization")}</Label>
                        <input id="organization" type="text" value={form.organization} onChange={(e) => set("organization", e.target.value)}
                          placeholder={t("placeholders.organization")} required className={inputCls} />
                      </Field>
                      <Field>
                        <Label htmlFor="country" required>{t("fields.country")}</Label>
                        <select id="country" value={form.country} onChange={(e) => setCountry(e.target.value)}
                          required className={selectCls}>
                          {COUNTRIES.map((country) => (
                            <option key={country} value={country} className="bg-[#0d1018]">
                              {t(`countries.${country}`)}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="city" required>{t("fields.city")}</Label>
                        <select id="city" value={form.city} onChange={(e) => set("city", e.target.value)}
                          required className={selectCls}>
                          <option value="" disabled className="bg-[#0d1018]">{t("placeholders.selectCity")}</option>
                          {cities.map((c) => (
                            <option key={c} value={c} className="bg-[#0d1018]">{t(`cities.${c}`)}</option>
                          ))}
                        </select>
                      </Field>
                      <Field>
                        <Label htmlFor="fleetSize" required>{t("fields.fleetSize")}</Label>
                        <select id="fleetSize" value={form.fleetSize} onChange={(e) => set("fleetSize", e.target.value)}
                          required className={selectCls}>
                          <option value="" disabled className="bg-[#0d1018]">{t("placeholders.selectRange")}</option>
                          {FLEET_SIZES.map((s) => (
                            <option key={s} value={s} className="bg-[#0d1018]">{t(`fleetSizes.${s}`)}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <AnimatePresence>
                      {form.city === "Other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <Field>
                            <Label htmlFor="cityOther" required>{t("fields.cityOther")}</Label>
                            <input id="cityOther" type="text" value={form.cityOther}
                              onChange={(e) => set("cityOther", e.target.value)}
                              placeholder={t("placeholders.cityOther")} required className={inputCls} />
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-5">
                    <SectionHeading number="3" title={t("sections.need")} />
                    <Field>
                      <Label htmlFor="primaryGoal" required>{t("fields.primaryGoal")}</Label>
                      <select id="primaryGoal" value={form.primaryGoal} onChange={(e) => set("primaryGoal", e.target.value)}
                        required className={selectCls}>
                        <option value="" disabled className="bg-[#0d1018]">{t("placeholders.selectGoal")}</option>
                        {PRIMARY_GOALS.map((g) => (
                          <option key={g} value={g} className="bg-[#0d1018]">{t(`goals.${g}`)}</option>
                        ))}
                      </select>
                    </Field>

                    <AnimatePresence>
                      {form.primaryGoal === "Other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-4"
                        >
                          <Field>
                            <Label htmlFor="primaryGoalOther" required>{t("fields.primaryGoalOther")}</Label>
                            <input id="primaryGoalOther" type="text" value={form.primaryGoalOther}
                              onChange={(e) => set("primaryGoalOther", e.target.value)}
                              placeholder={t("placeholders.primaryGoalOther")} required className={inputCls} />
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white tracking-wide shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-60 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("submitting")}
                      </>
                    ) : (
                      <>
                        {t("submit")}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-white/20 leading-relaxed">
                    {t.rich("privacyNote", {
                      privacyLink: (chunks) => (
                        <a href={`${basePath}/privacy`} className="text-primary/60 hover:text-primary underline underline-offset-2 transition-colors">
                          {chunks}
                        </a>
                      ),
                    } as Record<string, (chunks: React.ReactNode) => React.ReactNode>)}
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-10 flex flex-col items-start gap-6"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {t("success.title")}
                    </h3>
                    <p className="mt-4 text-base text-white/50 leading-relaxed">
                      {t.rich("success.message", {
                        hours: (chunks) => <span className="text-white font-semibold">{chunks}</span>,
                      })}
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/[0.06]" />

                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold">
                      {t("success.meanwhile")}
                    </p>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-2.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      aria-label={t("success.downloadProfile")}
                    >
                      <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <Download className="h-4 w-4" />
                      </div>
                      {t("success.downloadProfile")}
                      <span className="text-[10px] text-white/20 font-normal ms-1">{t("success.pdf")}</span>
                    </a>
                    <p className="text-xs text-white/20 leading-relaxed ps-11">
                      {t("success.downloadDesc")}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
