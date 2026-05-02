"use client"

import { Monitor, BrainCircuit, Layers } from "lucide-react"
import { motion } from "framer-motion"

const pillars = [
  {
    icon: Monitor,
    tag: "Real-time Orchestration",
    title: "The Command Center",
    description:
      "A high-fidelity dashboard designed for the modern enterprise. Monitor fleet health, map demand in real-time, and manage exceptions before they impact your operations.",
  },
  {
    icon: BrainCircuit,
    tag: "Automated Financial Governance",
    title: "Fiscal Intelligence Engine",
    description:
      "Our proprietary logic identifies inefficiencies and cost-saving opportunities across your entire mobility stack. Achieve capital efficiency through data-driven resource allocation.",
  },
  {
    icon: Layers,
    tag: "Enterprise-Grade Architecture",
    title: "The Integration Layer",
    description:
      "Built to scale. Traflinq integrates seamlessly with your existing ERP, HR, and security protocols, ensuring a frictionless deployment across regional or global offices.",
  },
]

export function RouteOptimizationSection() {
  return (
    <section id="command-center" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">Product Pillars</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            The Technology Stack.
          </h2>
          <p className="mt-4 text-base text-white/40 leading-7">
            Three integrated layers working in concert to deliver end-to-end corporate mobility intelligence.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="relative group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 overflow-hidden hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Subtle glow on hover */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-primary/5 to-transparent" />

              {/* Pillar number */}
              <span className="text-[10px] text-white/15 tracking-widest uppercase font-medium">
                0{i + 1}
              </span>

              {/* Icon */}
              <div className="mt-4 h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Tag / tagline */}
              <p className="mt-5 text-[11px] text-primary/60 tracking-widest uppercase font-medium">
                {pillar.tag}
              </p>

              {/* Title */}
              <h3 className="mt-2 text-xl font-bold text-white leading-snug">{pillar.title}</h3>

              {/* Description */}
              <p className="mt-3 text-sm text-white/40 leading-6">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
