"use client"

import { Lock, Globe, Layers, Cpu } from "lucide-react"
import { motion } from "framer-motion"

const pillars = [
  {
    icon: Cpu,
    title: "Proprietary Engine",
    description: "Encrypted logic that handles the 'how' behind your efficiency. Built in-house, built to last.",
  },
  {
    icon: Lock,
    title: "Data Integrity",
    description: "Every record is immutable, time-stamped, and audit-ready — for your compliance team.",
  },
  {
    icon: Globe,
    title: "Regional Readiness",
    description: "Built to the highest standards of compliance for MENA expansion — Karachi to Riyadh.",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Deploy at 100 commuters or 10,000. The system scales without sacrificing granular control.",
  },
]

const stackLayers = [
  { label: "Interface", desc: "Commuter app · Admin portal · Driver app", color: "border-primary/30 bg-primary/5" },
  { label: "Logic", desc: "Routing engine · Load balancer · Scheduler", color: "border-blue-500/25 bg-blue-500/5" },
  { label: "Security", desc: "Encryption · Access control · Audit trail", color: "border-purple-500/25 bg-purple-500/5" },
  { label: "Data", desc: "Telemetry · Trip records · Compliance logs", color: "border-white/10 bg-white/[0.025]" },
]

export function FleetServicesSection() {
  return (
    <section id="institutional-trust" className="py-24 sm:py-32 bg-[#0a0d16] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">Institutional Trust</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Scalable. Secure. Modular.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/45">
            Traflinq is built as a core piece of infrastructure. Whether managing 100 or 10,000 commuters, our modular architecture maintains granular control and data integrity.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Four pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.1] hover:bg-white/[0.03] transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <pillar.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="mt-1.5 text-sm text-white/35 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Tech stack diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/3 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="text-[10px] text-white/25 tracking-widest uppercase font-medium mb-5">Platform Architecture</p>

              <div className="space-y-2.5">
                {stackLayers.map((layer, i) => (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    className={`rounded-xl border ${layer.color} px-5 py-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{layer.label}</p>
                        <p className="text-xs text-white/30 mt-0.5">{layer.desc}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, j) => (
                          <motion.div
                            key={j}
                            className="h-1.5 w-1.5 rounded-full bg-current opacity-30"
                            style={{ color: i === 0 ? '#fe8503' : i === 1 ? '#3b82f6' : i === 2 ? '#a78bfa' : '#ffffff' }}
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 + i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Connector arrows */}
              <div className="mt-5 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/[0.05]" />
                <span className="text-[9px] text-white/20 tracking-widest uppercase">End-to-End Encrypted</span>
                <div className="h-px flex-1 bg-white/[0.05]" />
              </div>

              {/* Certifications row */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["ISO 27001", "GDPR Ready", "MENA Compliant"].map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 px-3 text-center"
                  >
                    <p className="text-[9px] text-white/30 tracking-wide">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
