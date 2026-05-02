"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Globe } from "lucide-react"

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Data Sovereignty",
    description: "Your data stays yours. We enforce strict data residency policies and never commingle operational intelligence across clients.",
  },
  {
    icon: Zap,
    title: "99.9% Uptime",
    description: "Reliable infrastructure for mission-critical transport. Our SLA-backed architecture ensures your operations never go dark.",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Architecture that grows with your expansion into new markets. Deploy across regions without re-engineering your stack.",
  },
]

export function OperationalSuccessReports() {
  return (
    <section id="institutional-trust" className="py-24 sm:py-32 bg-[#060810] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">Trust & Security</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Designed for the Enterprise.<br />Trusted by Leaders.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/45">
            Traflinq is engineered with a "security-first" mindset. From data encryption to granular access controls, we ensure your operational intelligence remains private and protected.
          </p>
        </motion.div>

        {/* Trust pillars */}
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

        {/* Decorative security badge bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {["End-to-End Encryption", "Granular Access Controls", "Audit Logging", "SOC-2 Aligned", "Zero-Trust Architecture"].map((badge) => (
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
