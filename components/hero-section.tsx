"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#080b14]">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-primary/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/5 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary/80 tracking-widest uppercase font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Institutional Mobility Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] leading-[1.05]"
            >
              The Intelligence Layer for{" "}
              <span className="text-primary">Managed Mobility.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 text-lg leading-8 text-white/45 max-w-xl"
            >
              Traflinq is the architectural foundation for corporate transit. We provide the logic, oversight, and telemetry required to orchestrate workforce movement at an institutional scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-start gap-4"
            >
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 gap-2 shadow-lg shadow-primary/20 text-sm tracking-wide"
              >
                Request a Strategic Briefing
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white/50 hover:text-white hover:bg-white/5 gap-1.5 px-6 text-sm tracking-wide"
              >
                Explore the Platform
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Glassmorphism Command Center Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Backdrop glow */}
            <div className="absolute -inset-6 bg-primary/8 rounded-3xl blur-3xl" />

            {/* Dashboard Card */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/60">

              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.025]">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]/80" />
                </div>
                <span className="text-[11px] text-white/25 tracking-widest uppercase font-medium">Traflinq Command Center</span>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  <span className="text-[11px] text-primary/60 tracking-wide">LIVE</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Map + Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Transit Map */}
                  <div className="col-span-2 rounded-xl border border-white/[0.06] bg-[#0d1221] overflow-hidden relative h-[200px]">
                    <svg viewBox="0 0 380 200" className="w-full h-full">
                      <defs>
                        <filter id="heroGlow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        <pattern id="heroGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="380" height="200" fill="url(#heroGrid)" />

                      {/* Route lines */}
                      <motion.path
                        d="M 30 170 Q 100 130 180 80 T 360 35"
                        fill="none" stroke="#fe8503" strokeWidth="2.5"
                        filter="url(#heroGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                      />
                      <motion.path
                        d="M 20 185 Q 90 155 200 100 T 370 55"
                        fill="none" stroke="#fe8503" strokeWidth="1.5" strokeOpacity="0.4"
                        filter="url(#heroGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.3, delay: 1.0, ease: "easeOut" }}
                      />
                      <motion.path
                        d="M 50 180 Q 140 140 230 90 T 365 45"
                        fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.35"
                        filter="url(#heroGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.6, delay: 1.2, ease: "easeOut" }}
                      />
                      <motion.path
                        d="M 10 175 Q 120 120 250 70 T 370 30"
                        fill="none" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.25"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, delay: 1.4, ease: "easeOut" }}
                      />

                      {/* Nodes */}
                      {[
                        { cx: 30, cy: 170, delay: 1.5 }, { cx: 180, cy: 80, delay: 1.7 }, { cx: 360, cy: 35, delay: 1.9 },
                        { cx: 100, cy: 130, delay: 2.0 }, { cx: 270, cy: 60, delay: 2.1 },
                      ].map((pt, i) => (
                        <motion.circle
                          key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#fe8503"
                          filter="url(#heroGlow)"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: pt.delay }}
                        />
                      ))}

                      {/* Moving pulse dot */}
                      <motion.circle
                        r="5" fill="#fe8503" fillOpacity="0.9"
                        filter="url(#heroGlow)"
                        animate={{
                          cx: [30, 100, 180, 270, 360],
                          cy: [170, 130, 80, 60, 35],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      />
                    </svg>
                    <div className="absolute bottom-2 left-3 text-[9px] text-white/20 tracking-widest uppercase">Live Transit Grid — Karachi Metro</div>
                  </div>

                  {/* Stats column */}
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Active Vehicles", value: "124", trend: "▲ 3" },
                      { label: "Occupancy Rate", value: "91%", trend: "▲ 4%" },
                      { label: "Active Corridors", value: "38", trend: "— stable" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 flex-1 flex flex-col justify-between"
                      >
                        <p className="text-[9px] text-white/30 tracking-widest uppercase">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-[9px] text-primary/60">{stat.trend}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Avg. Trip Duration", value: "22 min" },
                    { label: "Fiscal Savings (MTD)", value: "$42,800" },
                    { label: "Compliance Score", value: "99.2%" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                    >
                      <p className="text-[9px] text-white/25 tracking-wide uppercase">{item.label}</p>
                      <p className="text-sm font-semibold text-white mt-1">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Activity feed */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] text-white/25 tracking-widest uppercase">Recent Events</span>
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[9px] text-primary/50"
                    >● Updating</motion.span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { time: "09:42", event: "Shuttle V-07 departed — DHA Corridor", color: "text-primary/70" },
                      { time: "09:39", event: "Route 12 load balanced — 2 passengers reallocated", color: "text-blue-400/60" },
                      { time: "09:35", event: "Compliance check passed — Fleet Sigma", color: "text-green-400/60" },
                    ].map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-[9px] text-white/20 font-mono mt-0.5 shrink-0">{log.time}</span>
                        <span className={`text-[10px] ${log.color}`}>{log.event}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
