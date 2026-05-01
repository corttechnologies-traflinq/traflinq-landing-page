"use client"

import { BarChart3, GitBranch } from "lucide-react"
import { motion } from "framer-motion"

const bullets = [
  {
    icon: BarChart3,
    title: "Dynamic Load Balancing",
    description: "Intelligent occupancy tracking to maximize asset utility and eliminate the cost of vacancy.",
  },
  {
    icon: GitBranch,
    title: "Adaptive Corridors",
    description: "Transit paths that evolve with the shifting pulse of your organization in real time.",
  },
]

export function GhostSeatSection() {
  return (
    <section id="predictive-logic" className="py-24 sm:py-32 bg-[#0a0d16] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Visual — abstract architectural/motion representation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-6 bg-blue-600/4 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ height: '380px' }}>
              <svg viewBox="0 0 560 380" className="w-full h-full">
                <defs>
                  <filter id="yieldGlow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="yieldGlowSm">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fe8503" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fe8503" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="barFillDim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                  </linearGradient>
                </defs>

                {/* Background grid */}
                <pattern id="yieldGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
                </pattern>
                <rect width="560" height="380" fill="url(#yieldGrid)" />

                {/* Horizontal baseline */}
                <line x1="60" y1="310" x2="520" y2="310" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* Y-axis labels */}
                {[0, 25, 50, 75, 100].map((pct, i) => (
                  <text key={i} x="50" y={310 - i * 52.5 + 4} textAnchor="end"
                    fill="rgba(255,255,255,0.18)" fontSize="10" fontFamily="monospace">{pct}%</text>
                ))}

                {/* Occupancy bars — before optimization */}
                {[
                  { x: 80,  h: 105, label: "Mon" },
                  { x: 140, h: 126, label: "Tue" },
                  { x: 200, h: 84,  label: "Wed" },
                  { x: 260, h: 147, label: "Thu" },
                  { x: 320, h: 63,  label: "Fri" },
                ].map((bar, i) => (
                  <g key={i}>
                    <motion.rect
                      x={bar.x} y={310 - bar.h} width="28" height={bar.h} rx="3"
                      fill="url(#barFillDim)"
                      initial={{ scaleY: 0, originY: 1 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                      style={{ transformOrigin: `${bar.x + 14}px 310px` }}
                    />
                    <text x={bar.x + 14} y="328" textAnchor="middle"
                      fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">{bar.label}</text>
                  </g>
                ))}

                {/* Divider */}
                <line x1="370" y1="40" x2="370" y2="330" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 3" />
                <text x="375" y="55" fill="rgba(254,133,3,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1">AFTER TRAFLINQ</text>

                {/* Optimized bars — after */}
                {[
                  { x: 385, h: 210, label: "Mon" },
                  { x: 435, h: 231, label: "Tue" },
                  { x: 485, h: 220, label: "Wed" },
                ].map((bar, i) => (
                  <g key={i}>
                    <motion.rect
                      x={bar.x} y={310 - bar.h} width="28" height={bar.h} rx="3"
                      fill="url(#barFill)"
                      filter="url(#yieldGlowSm)"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                      style={{ transformOrigin: `${bar.x + 14}px 310px` }}
                    />
                    <text x={bar.x + 14} y="328" textAnchor="middle"
                      fill="rgba(254,133,3,0.4)" fontSize="9" fontFamily="monospace">{bar.label}</text>
                  </g>
                ))}

                {/* Occupancy % label on optimized bars */}
                {[
                  { x: 385, h: 210, pct: "91%" },
                  { x: 435, h: 231, pct: "96%" },
                  { x: 485, h: 220, pct: "94%" },
                ].map((bar, i) => (
                  <motion.text
                    key={i}
                    x={bar.x + 14} y={310 - bar.h - 8}
                    textAnchor="middle"
                    fill="#fe8503" fontSize="11" fontWeight="bold" fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.12 }}
                  >{bar.pct}</motion.text>
                ))}

                {/* Annotation line showing "avg 44% → 94%" */}
                <motion.line
                  x1="80" y1="163" x2="330" y2="163"
                  stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="5 3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                />
                <text x="200" y="155" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace">Avg. 44% occupancy</text>

                {/* Left label */}
                <text x="200" y="370" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace" letterSpacing="1">BEFORE</text>
              </svg>

              <div className="absolute bottom-3 right-4">
                <span className="text-[9px] text-white/20 tracking-widest uppercase font-mono">Occupancy Analysis — Q2 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">Core Pillar 02</span>
            <p className="mt-2 text-sm text-white/30 tracking-wide">Predictive Logic</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Engineered for Yield.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/45">
              Our system ensures your transit resources are utilized at their highest potential. By aligning capacity with real-time demand, Traflinq mitigates the cost of vacancy before it impacts your bottom line.
            </p>

            <div className="mt-10 space-y-6">
              {bullets.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/40">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
