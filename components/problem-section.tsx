"use client"

import { motion } from "framer-motion"
import { Database, DollarSign, TrendingUp } from "lucide-react"

const pillars = [
  {
    icon: Database,
    label: "Eliminate Data Silos",
    desc: "Consolidate vendors, routes, and billing into one source of truth.",
  },
  {
    icon: DollarSign,
    label: "Mitigate Fiscal Leakage",
    desc: "Stop the drain of unverified expenses with automated audit trails.",
  },
  {
    icon: TrendingUp,
    label: "Drive Operational Excellence",
    desc: "Move from reactive management to predictive orchestration.",
  },
]

export function ProblemSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#080b14] overflow-hidden border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">The Strategic Gap</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Beyond Fragmented Mobility.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/45">
              Corporate transport is often a black box of unverified data and unoptimized spend. Traflinq replaces manual oversight with automated governance, ensuring every mile driven aligns with your strategic bottom line.
            </p>

            <div className="mt-12 space-y-6">
              {pillars.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5 h-11 w-11 shrink-0 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-white/40 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Abstract data visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-primary/3 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 overflow-hidden">
              <svg viewBox="0 0 560 360" className="w-full">
                <defs>
                  <filter id="nodeGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* ── Fragmented side (left) ── */}
                {/* Scattered nodes */}
                {[
                  { cx: 60,  cy: 80  },
                  { cx: 100, cy: 200 },
                  { cx: 50,  cy: 300 },
                  { cx: 130, cy: 130 },
                  { cx: 90,  cy: 260 },
                  { cx: 150, cy: 60  },
                ].map((pt, i) => (
                  <motion.circle
                    key={`frag-${i}`}
                    cx={pt.cx} cy={pt.cy} r="6"
                    fill="rgba(255,255,255,0.12)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  />
                ))}

                {/* Messy connectors between fragmented nodes */}
                {[
                  "M 60 80 L 130 130", "M 130 130 L 100 200", "M 60 80 L 50 300",
                  "M 100 200 L 90 260", "M 150 60 L 60 80", "M 150 60 L 130 130",
                  "M 90 260 L 50 300",
                ].map((d, i) => (
                  <motion.path
                    key={`frag-line-${i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.06 }}
                  />
                ))}

                {/* Label */}
                <text x="100" y="345" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="11" fontFamily="monospace" letterSpacing="2">FRAGMENTED</text>

                {/* ── Divider ── */}
                <line x1="210" y1="20" x2="210" y2="340" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 4" />

                {/* ── Unified side (right) ── */}
                {/* Clean horizontal convergence line */}
                <motion.line
                  x1="240" y1="180" x2="530" y2="180"
                  stroke="#fe8503"
                  strokeWidth="2.5"
                  filter="url(#lineGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
                />

                {/* Converging lines from scattered points to the unified line */}
                {[
                  { x1: 240, y1: 70,  x2: 310, y2: 180 },
                  { x1: 240, y1: 120, x2: 330, y2: 180 },
                  { x1: 240, y1: 180, x2: 240, y2: 180 },
                  { x1: 240, y1: 240, x2: 330, y2: 180 },
                  { x1: 240, y1: 290, x2: 310, y2: 180 },
                ].map((ln, i) => (
                  <motion.line
                    key={`conv-${i}`}
                    x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                    stroke="rgba(254,133,3,0.25)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
                  />
                ))}

                {/* Nodes on unified line */}
                {[310, 370, 430, 490, 530].map((cx, i) => (
                  <motion.circle
                    key={`uni-${i}`}
                    cx={cx} cy={180} r={i === 4 ? 9 : 5}
                    fill={i === 4 ? "#fe8503" : "rgba(254,133,3,0.5)"}
                    filter="url(#nodeGlow)"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                  />
                ))}

                {/* Label */}
                <text x="385" y="345" textAnchor="middle" fill="rgba(254,133,3,0.4)" fontSize="11" fontFamily="monospace" letterSpacing="2">UNIFIED</text>
              </svg>

              <div className="mt-4 flex items-center justify-between px-2">
                <span className="text-[10px] text-white/20 tracking-widest uppercase">Before Traflinq</span>
                <div className="h-px flex-1 mx-6 bg-white/[0.05]" />
                <span className="text-[10px] text-primary/40 tracking-widest uppercase">After Traflinq</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
