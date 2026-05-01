"use client"

import { Monitor, Radio, FileText } from "lucide-react"
import { motion } from "framer-motion"

const bullets = [
  {
    icon: Radio,
    title: "Live Telemetry",
    description: "Real-time visibility across all transit corridors — every vehicle, every passenger, every second.",
  },
  {
    icon: FileText,
    title: "Operational Transparency",
    description: "An immutable record of every trip and every kilometer, available to leadership on demand.",
  },
]

export function RouteOptimizationSection() {
  return (
    <section id="command-center" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">Core Pillar 01</span>
            <p className="mt-2 text-sm text-white/30 tracking-wide">Centralized Command</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Total Oversight.<br />Zero Noise.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/45">
              We've distilled complex logistics into a high-fidelity interface. Leadership gains a 360-degree view of the fleet, translating live telemetry into actionable executive insights.
            </p>

            <div className="mt-10 space-y-6">
              {bullets.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
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

          {/* Right: Tablet map mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-3xl" />

            {/* Tablet frame */}
            <div className="relative rounded-[1.75rem] border-2 border-white/[0.08] bg-[#0d1221] overflow-hidden shadow-2xl shadow-black/60 p-1.5">
              <div className="rounded-2xl overflow-hidden bg-[#080e1c] relative" style={{ height: '420px' }}>
                {/* Map content */}
                <svg viewBox="0 0 600 420" className="w-full h-full">
                  <defs>
                    <filter id="tabletGlow">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="tabletGlowSm">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <radialGradient id="mapBg" cx="50%" cy="50%" r="70%">
                      <stop offset="0%" stopColor="#0f1829" />
                      <stop offset="100%" stopColor="#080e1c" />
                    </radialGradient>
                    <pattern id="tabletGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="600" height="420" fill="url(#mapBg)" />
                  <rect width="600" height="420" fill="url(#tabletGrid)" />

                  {/* City block shapes */}
                  {[
                    { x: 40, y: 60, w: 60, h: 40 }, { x: 120, y: 50, w: 80, h: 35 },
                    { x: 220, y: 70, w: 50, h: 55 }, { x: 300, y: 45, w: 90, h: 40 },
                    { x: 420, y: 60, w: 70, h: 50 }, { x: 510, y: 50, w: 60, h: 45 },
                    { x: 50, y: 160, w: 70, h: 60 }, { x: 150, y: 170, w: 55, h: 50 },
                    { x: 230, y: 155, w: 80, h: 65 }, { x: 340, y: 160, w: 65, h: 55 },
                    { x: 440, y: 150, w: 75, h: 65 }, { x: 530, y: 160, w: 50, h: 60 },
                    { x: 60, y: 280, w: 60, h: 55 }, { x: 160, y: 290, w: 70, h: 50 },
                    { x: 260, y: 275, w: 85, h: 60 }, { x: 380, y: 285, w: 60, h: 55 },
                    { x: 460, y: 280, w: 80, h: 60 },
                  ].map((b, i) => (
                    <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3"
                      fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  ))}

                  {/* Primary glowing route */}
                  <motion.path
                    d="M 30 380 Q 120 320 200 250 T 350 160 T 500 80 T 580 40"
                    fill="none" stroke="#fe8503" strokeWidth="3"
                    filter="url(#tabletGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, delay: 0.5, ease: "easeOut" }}
                  />

                  {/* Secondary route */}
                  <motion.path
                    d="M 50 400 Q 160 340 260 270 T 420 170 T 570 70"
                    fill="none" stroke="#fe8503" strokeWidth="1.5" strokeOpacity="0.35"
                    filter="url(#tabletGlowSm)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, delay: 0.7, ease: "easeOut" }}
                  />

                  {/* Tertiary route */}
                  <motion.path
                    d="M 80 390 Q 180 310 300 230 T 470 130 T 590 60"
                    fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.25"
                    filter="url(#tabletGlowSm)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.8, delay: 0.9, ease: "easeOut" }}
                  />

                  {/* Stop nodes */}
                  {[
                    { cx: 30,  cy: 380 }, { cx: 120, cy: 330 }, { cx: 200, cy: 255 },
                    { cx: 290, cy: 200 }, { cx: 380, cy: 145 }, { cx: 500, cy: 80 },
                    { cx: 580, cy: 40 },
                  ].map((pt, i) => (
                    <motion.circle
                      key={i} cx={pt.cx} cy={pt.cy} r="5" fill="#fe8503"
                      filter="url(#tabletGlow)"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                    />
                  ))}

                  {/* Moving vehicle dot */}
                  <motion.circle
                    r="7" fill="#fe8503"
                    filter="url(#tabletGlow)"
                    animate={{
                      cx: [200, 290, 380, 500, 580],
                      cy: [255, 200, 145, 80, 40],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  />

                  {/* Monitor label overlay */}
                  <rect x="14" y="14" width="140" height="30" rx="8" fill="rgba(8,11,20,0.85)" />
                  <text x="22" y="33" fill="rgba(254,133,3,0.7)" fontSize="10" fontFamily="monospace" letterSpacing="1">LIVE — FLEET MONITOR</text>
                </svg>

                {/* Stats overlay */}
                <div className="absolute top-3 right-3 space-y-2">
                  {[
                    { label: "On Route", value: "38" },
                    { label: "At Stop", value: "6" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.06] backdrop-blur px-3 py-1.5 text-right"
                    >
                      <p className="text-[9px] text-white/30 tracking-widest uppercase">{s.label}</p>
                      <p className="text-base font-bold text-white">{s.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tablet home bar */}
              <div className="flex justify-center py-2">
                <div className="h-1 w-16 rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
