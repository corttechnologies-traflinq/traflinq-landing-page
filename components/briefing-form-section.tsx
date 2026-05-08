"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Download, Loader2 } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAKISTAN_CITIES = ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Sukkur", "Nooriabad", "Other"]
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

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Shared primitives ────────────────────────────────────────────────────────

const inputCls =
  "rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all w-full"

const selectCls =
  "rounded-xl border border-white/10 bg-[#0d1018] px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none w-full cursor-pointer"

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[11px] font-bold uppercase tracking-widest text-white/40">
      {children}{required && <span className="text-primary ml-0.5">*</span>}
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
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (id: keyof FormState, val: string) =>
    setForm((prev) => ({ ...prev, [id]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ""
      const res = await fetch(`${apiBase}/support/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          city: form.city === "Other" ? (form.cityOther || "Other") : form.city,
          primaryGoal: form.primaryGoal === "Other" ? (form.primaryGoalOther || "Other") : form.primaryGoal,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
    } catch (err) {
      console.error("Lead submission failed:", err)
      alert("Something went wrong. Please try again or email us directly.")
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
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">
              Enterprise Enquiry
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Request a Strategic Briefing.
            </h2>
            <p className="mt-6 text-base text-white/40 leading-relaxed max-w-md">
              Secure a focused session with our enterprise team to map your current transport spend against the Traflinq savings model. We design tailored sessions around your fleet scale, operational complexity, and specific savings targets.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {[
                { title: "Strategic ROI Modelling", desc: "Detailed analysis of your current mobility spend vs. optimized Traflinq benchmarks." },
                { title: "Operational Footprint Review", desc: "A deep-dive into your existing routes, vendor costs, and ghost seat leakage." },
                { title: "Compliance & Governance", desc: "Mapping our automated auditing layers to your corporate governance requirements." },
                { title: "Dedicated Implementation Team", desc: "Direct access to our enterprise specialists for a smooth deployment roadmap." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white/90">{item.title}</h4>
                    <p className="text-xs text-white/40 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form / Success */}
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
                  {/* ── Section 1: The Person ── */}
                  <div className="flex flex-col gap-5">
                    <SectionHeading number="1" title="The Person" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="name" required>Name</Label>
                        <input id="name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                          placeholder="Jane Smith" required className={inputCls} />
                      </Field>
                      <Field>
                        <Label htmlFor="role" required>Role / Title</Label>
                        <input id="role" type="text" value={form.role} onChange={(e) => set("role", e.target.value)}
                          placeholder="Head of Operations" required className={inputCls} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="email" required>Work Email</Label>
                        <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                          placeholder="jane@company.com" required className={inputCls} />
                      </Field>
                      <Field>
                        <Label htmlFor="phone" required>Contact Number</Label>
                        <input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                          placeholder="+92 300 000 0000" required className={inputCls} />
                      </Field>
                    </div>
                  </div>

                  {/* ── Section 2: The Operation ── */}
                  <div className="flex flex-col gap-5">
                    <SectionHeading number="2" title="The Operation" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="organization" required>Organization Name</Label>
                        <input id="organization" type="text" value={form.organization} onChange={(e) => set("organization", e.target.value)}
                          placeholder="Acme Corp" required className={inputCls} />
                      </Field>
                      <Field>
                        <Label htmlFor="country" required>Country of Operation</Label>
                        <select id="country" value={form.country} onChange={(e) => set("country", e.target.value)}
                          required className={selectCls}>
                          <option value="Pakistan" className="bg-[#0d1018]">Pakistan</option>
                        </select>
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <Label htmlFor="city" required>Primary City of Operation</Label>
                        <select id="city" value={form.city} onChange={(e) => set("city", e.target.value)}
                          required className={selectCls}>
                          <option value="" disabled className="bg-[#0d1018]">Select City</option>
                          {PAKISTAN_CITIES.map((c) => (
                            <option key={c} value={c} className="bg-[#0d1018]">{c}</option>
                          ))}
                        </select>
                      </Field>
                      <Field>
                        <Label htmlFor="fleetSize" required>Fleet Size / No. of Commuters</Label>
                        <select id="fleetSize" value={form.fleetSize} onChange={(e) => set("fleetSize", e.target.value)}
                          required className={selectCls}>
                          <option value="" disabled className="bg-[#0d1018]">Select Range</option>
                          {FLEET_SIZES.map((s) => (
                            <option key={s} value={s} className="bg-[#0d1018]">{s}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* "Other" city open field */}
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
                            <Label htmlFor="cityOther" required>Please Specify Your City</Label>
                            <input id="cityOther" type="text" value={form.cityOther}
                              onChange={(e) => set("cityOther", e.target.value)}
                              placeholder="Enter Your City" required className={inputCls} />
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Section 3: The Need ── */}
                  <div className="flex flex-col gap-5">
                    <SectionHeading number="3" title="The Need" />
                    <Field>
                      <Label htmlFor="primaryGoal" required>Primary Goal</Label>
                      <select id="primaryGoal" value={form.primaryGoal} onChange={(e) => set("primaryGoal", e.target.value)}
                        required className={selectCls}>
                        <option value="" disabled className="bg-[#0d1018]">Select Your Primary Goal</option>
                        {PRIMARY_GOALS.map((g) => (
                          <option key={g} value={g} className="bg-[#0d1018]">{g}</option>
                        ))}
                      </select>
                    </Field>

                    {/* "Other" goal open field */}
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
                            <Label htmlFor="primaryGoalOther" required>Please Specify Your Goal</Label>
                            <input id="primaryGoalOther" type="text" value={form.primaryGoalOther}
                              onChange={(e) => set("primaryGoalOther", e.target.value)}
                              placeholder="Enter Your Goal" required className={inputCls} />
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Submit ── */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white tracking-wide shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-60 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Briefing Request
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-white/20 leading-relaxed">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="text-primary/60 hover:text-primary underline underline-offset-2 transition-colors">
                      Privacy Policy
                    </a>
                    . We never share your data.
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
                      Request Received
                    </h3>
                    <p className="mt-4 text-base text-white/50 leading-relaxed">
                      Your briefing request has been received. Our enterprise team will review your requirements and reach out within{" "}
                      <span className="text-white font-semibold">24 hours</span>.
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/[0.06]" />

                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold">
                      In the meantime
                    </p>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-2.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      aria-label="Download Traflinq Company Profile"
                    >
                      <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <Download className="h-4 w-4" />
                      </div>
                      Download our Company Profile
                      <span className="text-[10px] text-white/20 font-normal ml-1">(PDF)</span>
                    </a>
                    <p className="text-xs text-white/20 leading-relaxed pl-11">
                      A deep-dive into how Traflinq reduces your corporate transport spend — available shortly.
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
