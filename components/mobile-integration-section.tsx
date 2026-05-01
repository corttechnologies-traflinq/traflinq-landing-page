"use client"

import { Bell, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const bullets = [
  {
    icon: Bell,
    title: "Seamless Interface",
    description: "Automated reservations and real-time notifications that remove friction from the daily commute.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Compliance",
    description: "Institutional-grade security protocols for every passenger — tracked, verified, accountable.",
  },
]

export function MobileIntegrationSection() {
  return (
    <section id="frictionless-mobility" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">Core Pillar 03</span>
            <p className="mt-2 text-sm text-white/30 tracking-wide">Frictionless Mobility</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              The Premium Commuter Perk.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/45">
              We've refined the commuter journey to be as intuitive as it is reliable. A low-friction interface for your workforce that removes the stress of the daily commute.
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

          {/* Right: Phone mockup with app UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />

            {/* Phone frame */}
            <div className="relative w-[280px]">
              <div className="relative rounded-[2.5rem] border-2 border-white/[0.1] bg-[#0d1221] overflow-hidden shadow-2xl shadow-black/70 p-1.5">
                <div className="rounded-[2rem] overflow-hidden bg-[#080e1c]" style={{ height: '560px' }}>

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-3 pb-2">
                    <span className="text-[10px] text-white/40 font-mono">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[4, 3, 2, 1].map(h => <div key={h} className="w-0.5 rounded-full bg-white/40" style={{ height: `${h * 2.5}px` }} />)}
                      </div>
                      <div className="w-6 h-2.5 rounded-sm border border-white/30 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-3/4 bg-white/40 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 pt-2 pb-4 border-b border-white/[0.05]">
                    <p className="text-[9px] text-primary/60 tracking-widest uppercase font-medium mb-1">Good Morning</p>
                    <p className="text-lg font-bold text-white">Sara Ahmed</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-white/35">Your shuttle departs in 12 min</span>
                    </div>
                  </div>

                  {/* Shuttle card */}
                  <div className="px-4 pt-4">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[9px] text-white/30 tracking-wide uppercase">Your Ride Today</p>
                          <p className="text-sm font-semibold text-white mt-0.5">Shuttle V-07 · Route DHA</p>
                        </div>
                        <motion.div
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="rounded-full bg-green-500/15 border border-green-400/25 px-2 py-0.5"
                        >
                          <span className="text-[9px] text-green-400 font-medium">CONFIRMED</span>
                        </motion.div>
                      </div>

                      {/* Route visualization */}
                      <div className="flex items-center gap-2 my-3">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full border-2 border-primary" />
                          <div className="w-px h-8 bg-primary/30" />
                          <div className="h-3 w-3 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-[9px] text-white/30 uppercase tracking-wide">Pickup</p>
                            <p className="text-xs text-white/70 font-medium">Gate 3, DHA Phase 6</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-white/30 uppercase tracking-wide">Drop-off</p>
                            <p className="text-xs text-white/70 font-medium">HQ Tower — Parking B</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-bold text-primary">12</p>
                          <p className="text-[9px] text-white/30">min</p>
                        </div>
                      </div>

                      {/* Capacity bar */}
                      <div className="mt-3 pt-3 border-t border-white/[0.05]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] text-white/30">Occupancy</span>
                          <span className="text-[9px] text-primary/70">8 / 10</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: "80%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="mt-3 space-y-2">
                      {[
                        { msg: "Route 4 — On time", time: "2m ago", color: "text-green-400" },
                        { msg: "Shuttle departed pickup point", time: "4m ago", color: "text-primary/70" },
                      ].map((n, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.15 }}
                          className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2"
                        >
                          <span className={`text-[10px] ${n.color}`}>{n.msg}</span>
                          <span className="text-[9px] text-white/20">{n.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Home bar */}
                <div className="flex justify-center py-2">
                  <div className="h-1 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
