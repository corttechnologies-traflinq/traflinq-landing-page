"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// All 6 road segments
const ROAD_SEGMENTS = [
  "M234.74,420.2 C222.64,413.2 210.54,406.2 198.44,399.2",
  "M198.44,399.2 C257.33,365.13 316.21,331.07 375.1,297",
  "M375.1,297 C346.87,280.67 318.63,264.33 290.4,248",
  "M290.4,248 C233.93,280.67 177.47,313.33 121,346",
  "M121,346 C108.9,339 96.8,332 84.7,325",
  "M84.7,325 C138.75,293.73 192.79,262.47 246.84,231.2",
]

// WITHOUT: full winding path through all 6 segments concatenated
const LONG_PATH =
  "M234.74,420.2 C222.64,413.2 210.54,406.2 198.44,399.2 " +
  "C257.33,365.13 316.21,331.07 375.1,297 " +
  "C346.87,280.67 318.63,264.33 290.4,248 " +
  "C233.93,280.67 177.47,313.33 121,346 " +
  "C108.9,339 96.8,332 84.7,325 " +
  "C138.75,293.73 192.79,262.47 246.84,231.2"

// WITH: short optimised path — skips left detour loop
const SHORT_PATH =
  "M234.74,420.2 C222.64,413.2 210.54,406.2 198.44,399.2 " +
  "C257.33,365.13 316.21,331.07 375.1,297 " +
  "C346.87,280.67 318.63,264.33 290.4,248 " +
  "C274,241 260,236 246.84,231.2"

const OPTIMAL_SEGS = [0, 1, 2]
const DETOUR_SEGS  = [3, 4, 5]

export function HeroSection() {
  const [optimized, setOptimized] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setOptimized(o => !o), 6000)
    return () => clearInterval(id)
  }, [])

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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary/80 tracking-widest uppercase font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Enterprise Mobility Infrastructure
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] leading-[1.05]">
              The Operating System for{" "}
              <span className="text-primary">Corporate Mobility.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-8 text-lg leading-8 text-white/45 max-w-xl">
              Centralize fragmented transport operations into a single intelligence layer. Orchestrate enterprise movement, eliminate cost leakage, and achieve total visibility through a unified platform.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-12 flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-8 gap-2 shadow-lg shadow-primary/20 text-sm tracking-wide">
                Request Enterprise Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" className="text-white/50 hover:text-white hover:bg-white/5 gap-1.5 px-6 text-sm tracking-wide">
                Explore the Platform <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Before / After Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-primary/8 rounded-3xl blur-3xl" />

            <div className="relative rounded-2xl border border-white/[0.08] bg-[#06071a] overflow-hidden shadow-2xl shadow-black/60">

              {/* Toggle bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <AnimatePresence mode="wait">
                  {optimized ? (
                    <motion.div key="on" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.28 }} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" style={{ boxShadow: '0 0 8px #F59E0B' }} />
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">With Traflinq</span>
                      <span className="text-[9px] text-primary/60 border border-primary/30 rounded px-1.5 py-0.5 ml-1 font-medium">OPTIMIZED</span>
                    </motion.div>
                  ) : (
                    <motion.div key="off" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.28 }} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-red-400">Without Traflinq</span>
                      <span className="text-[9px] text-red-400/60 border border-red-500/30 rounded px-1.5 py-0.5 ml-1 font-medium">MANUAL</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setOptimized(o => !o)}
                  className="relative h-5 w-10 rounded-full border border-white/10 bg-white/[0.06] cursor-pointer shrink-0"
                  aria-label="Toggle Traflinq optimization"
                >
                  <motion.span
                    className="absolute top-0.5 h-4 w-4 rounded-full"
                    animate={{ left: optimized ? "calc(100% - 18px)" : "2px", backgroundColor: optimized ? "#F59E0B" : "#ef4444" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                </button>
              </div>

              {/* SVG scene */}
              <div className="relative">
                <svg viewBox="-23 48 530 540" className="w-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="bld-top" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FEF3C7" /><stop offset="100%" stopColor="#FCD34D" />
                    </linearGradient>
                    <linearGradient id="bld-front" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient id="bld-side" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C2D12" /><stop offset="100%" stopColor="#1A0A02" />
                    </linearGradient>
                    <filter id="glow-amber" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* Isometric platform */}
                  <ellipse cx="200" cy="195" rx="300" ry="60" fill="#F59E0B" opacity="0.04" />
                  <ellipse cx="280" cy="500" rx="200" ry="8" fill="#000" opacity="0.35" style={{ filter: 'blur(8px)' }} />
                  <path d="M 242 458 L 484 318 L 484 350 L 242 490 Z" fill="#04060e" stroke="#F59E0B" strokeOpacity="0.09" strokeWidth="1" />
                  <path d="M 0 318 L 242 458 L 242 490 L 0 350 Z" fill="#1c2e7a" stroke="#F59E0B" strokeOpacity="0.13" strokeWidth="1" />
                  <path d="M 242 458 L 484 318 L 242 178 L 0 318 Z" fill="#0d1542" stroke="#F59E0B" strokeOpacity="0.28" strokeWidth="1.2" />
                  <line x1="242" y1="458" x2="484" y2="318" stroke="#f97316" strokeOpacity="0.55" strokeWidth="1.8" />
                  <line x1="242" y1="458" x2="0" y2="318" stroke="#f97316" strokeOpacity="0.50" strokeWidth="1.8" />
                  <line x1="242" y1="178" x2="0" y2="318" stroke="white" strokeOpacity="0.06" strokeWidth="0.8" />
                  <line x1="242" y1="178" x2="484" y2="318" stroke="white" strokeOpacity="0.06" strokeWidth="0.8" />
                  <line x1="242" y1="458" x2="242" y2="490" stroke="#f97316" strokeOpacity="0.42" strokeWidth="1.5" />
                  <line x1="484" y1="318" x2="484" y2="350" stroke="#000" strokeOpacity="0.42" strokeWidth="1" />
                  <line x1="0" y1="318" x2="0" y2="350" stroke="#4a5ab8" strokeOpacity="0.28" strokeWidth="1" />
                  <g opacity="0.16">
                    {[217.8, 193.6, 169.4, 145.2, 121, 96.8, 72.6, 48.4, 24.2].map((x, i) => (
                      <line key={`ga${i}`} x1={x} y1={444 - i * 14} x2={x + 242} y2={304 - i * 14} stroke="#F59E0B" strokeWidth="0.5" />
                    ))}
                    {[266.2, 290.4, 314.6, 338.8, 363, 387.2, 411.4, 435.6, 459.8].map((x, i) => (
                      <line key={`gb${i}`} x1={x} y1={444 - i * 14} x2={x - 242} y2={304 - i * 14} stroke="#F59E0B" strokeWidth="0.5" />
                    ))}
                  </g>

                  {/* Road base — dark tarmac */}
                  {ROAD_SEGMENTS.map((d, i) => (
                    <g key={i} pointerEvents="none">
                      <path d={d} stroke="#060a1c" strokeWidth="24" fill="none" strokeLinecap="round" />
                      <path d={d} stroke="#0e1330" strokeWidth="18" fill="none" strokeLinecap="round" />
                      <path d={d} stroke="#161d48" strokeWidth="13" fill="none" strokeLinecap="round" opacity="0.6" />
                    </g>
                  ))}

                  {/* ══════════════════════════════════════
                      WITHOUT TRAFLINQ
                      ══════════════════════════════════════ */}
                  <AnimatePresence>
                    {!optimized && (
                      <motion.g key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>

                        {/* Red glowing dashes on ALL segments */}
                        {ROAD_SEGMENTS.map((d, i) => (
                          <g key={i}>
                            <path d={d} stroke="#DC2626" strokeWidth="8" fill="none" opacity="0.12" style={{ filter: 'blur(7px)' }} />
                            <motion.path
                              d={d} stroke="#EF4444" strokeWidth="2.5" strokeDasharray="7 10"
                              strokeLinecap="round" fill="none" opacity="0.75"
                              animate={{ strokeDashoffset: [0, -68] }}
                              transition={{ duration: 3.0, repeat: Infinity, ease: "linear", delay: i * 0.22 }}
                            />
                          </g>
                        ))}

                        {/* Slow red truck — follows the full winding bezier path via CSS offset-path */}
                        <motion.g
                          style={{
                            offsetPath: `path("${LONG_PATH}")`,
                            offsetRotate: "0deg",
                          } as React.CSSProperties}
                          animate={{ offsetDistance: ["0%", "100%"] } as never}
                          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                        >
                          {/* glow halo */}
                          <circle r="11" fill="#EF4444" opacity="0.13" />
                          {/* isometric truck — left-facing cab */}
                          <polygon points="-19.9,-7.5 -13.0,-3.5 -13.0,-11.5 -19.9,-15.5" fill="#EF4444" />
                          <polygon points="-13.0,-3.5 -6.1,-7.5 -6.1,-15.5 -13.0,-11.5" fill="#0d1230" />
                          <polygon points="-13.0,-11.5 -6.1,-15.5 -13.0,-19.5 -19.9,-15.5" fill="#edf0ff" />
                          <polygon points="-20.4,-10.3 -13.5,-6.3 -13.5,-9.9 -20.4,-13.9" fill="#6ebff8" opacity="0.85" />
                          <polygon points="-13.0,-3.5 6.1,7.5 6.1,2.5 -13.0,-8.5" fill="#dde3ff" />
                          <polygon points="6.1,7.5 13.0,3.5 13.0,-1.5 6.1,2.5" fill="#1e2650" />
                          <polygon points="6.1,2.5 13.0,-1.5 -6.1,-12.5 -13.0,-8.5" fill="#edf0ff" />
                          <circle cx="8.56" cy="9.01" r="2.2" fill="#080c1c" /><circle cx="8.56" cy="9.01" r="1" fill="#252840" />
                          <circle cx="10.48" cy="5.01" r="2.2" fill="#080c1c" /><circle cx="10.48" cy="5.01" r="1" fill="#252840" />
                        </motion.g>

                        {/* Static congestion trucks at bottleneck nodes */}
                        <g transform="translate(375.1,297)">
                          <polygon points="-11.3,2.5 -4.3,6.5 -4.3,1.5 -11.3,-2.5" fill="#1e2650" />
                          <polygon points="-4.3,6.5 11.3,-2.5 11.3,-7.5 -4.3,1.5" fill="#dde3ff" />
                          <polygon points="-4.3,6.5 18.2,1.5 18.2,-6.5 -4.3,1.5" fill="#0d1230" />
                          <polygon points="18.2,1.5 23.4,-1.5 23.4,-9.5 18.2,-6.5" fill="#EF4444" />
                          <polygon points="18.2,-6.5 23.4,-9.5 16.4,-13.5 11.3,-10.5" fill="#edf0ff" />
                          <circle cx="-1.33" cy="8.01" r="2.2" fill="#080c1c" /><circle cx="-1.33" cy="8.01" r="1" fill="#252840" />
                        </g>
                        <g transform="translate(84.7,325)">
                          <polygon points="-19.9,-7.5 -13.0,-3.5 -13.0,-11.5 -19.9,-15.5" fill="#EF4444" />
                          <polygon points="-13.0,-3.5 -6.1,-7.5 -6.1,-15.5 -13.0,-11.5" fill="#0d1230" />
                          <polygon points="-13.0,-11.5 -6.1,-15.5 -13.0,-19.5 -19.9,-15.5" fill="#edf0ff" />
                          <polygon points="-13.0,-3.5 6.1,7.5 6.1,2.5 -13.0,-8.5" fill="#dde3ff" />
                          <circle cx="8.56" cy="9.01" r="2.2" fill="#080c1c" /><circle cx="8.56" cy="9.01" r="1" fill="#252840" />
                        </g>

                        {/* Problem labels */}
                        {[
                          { x: 198.44, y: 374, label: "MANUAL PLANNING",  w: 98  },
                          { x: 375.1,  y: 273, label: "VENDOR RATE LEAK", w: 106 },
                          { x: 290.4,  y: 225, label: "NO TRACKING",      w: 76  },
                          { x: 121,    y: 322, label: "DELAYED POD",       w: 76  },
                        ].map(({ x, y, label, w }, i) => (
                          <motion.g key={i} transform={`translate(${x},${y})`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, duration: 0.4 }}>
                            <rect x={-w / 2} y="-7.5" width={w} height="15" rx="3" fill="#EF4444" fillOpacity="0.96" />
                            <text x="0" y="3" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" style={{ letterSpacing: '0.04em', fontFamily: 'system-ui,sans-serif' }}>{label}</text>
                          </motion.g>
                        ))}
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* ══════════════════════════════════════
                      WITH TRAFLINQ
                      ══════════════════════════════════════ */}
                  <AnimatePresence>
                    {optimized && (
                      <motion.g key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>

                        {/* Detour segments — dimmed ghost */}
                        {DETOUR_SEGS.map(i => (
                          <path key={i} d={ROAD_SEGMENTS[i]} stroke="#1e2460" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 9" opacity="0.28" />
                        ))}

                        {/* Optimal segments — animated amber draw-on */}
                        {OPTIMAL_SEGS.map((si, idx) => (
                          <g key={si}>
                            <path d={ROAD_SEGMENTS[si]} stroke="#F59E0B" strokeWidth="12" fill="none" opacity="0.13" style={{ filter: 'blur(9px)' }} />
                            <motion.path
                              d={ROAD_SEGMENTS[si]} stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                              transition={{ duration: 1.0, ease: "easeOut", delay: idx * 0.3 }}
                            />
                          </g>
                        ))}

                        {/* Bypass connector (upper-right → dist center, skips left loop) */}
                        <g>
                          <path d="M290.4,248 C274,241 260,236 246.84,231.2" stroke="#F59E0B" strokeWidth="12" fill="none" opacity="0.13" style={{ filter: 'blur(9px)' }} />
                          <motion.path
                            d="M290.4,248 C274,241 260,236 246.84,231.2"
                            stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 1.0 }}
                          />
                        </g>

                        {/* Fast amber truck — follows optimised bezier path via CSS offset-path */}
                        <motion.g
                          style={{
                            offsetPath: `path("${SHORT_PATH}")`,
                            offsetRotate: "0deg",
                          } as React.CSSProperties}
                          animate={{ offsetDistance: ["0%", "100%"] } as never}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        >
                          {/* pulsing ring */}
                          <motion.circle
                            r="12" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.5"
                            animate={{ r: [9, 20], opacity: [0.45, 0] }}
                            transition={{ duration: 1.1, repeat: Infinity }}
                          />
                          <circle r="10" fill="#F59E0B" opacity="0.16" />
                          {/* isometric truck — right-facing cab (amber) */}
                          <polygon points="-11.3,2.5 -4.3,6.5 -4.3,1.5 -11.3,-2.5" fill="#1e2650" />
                          <polygon points="-4.3,6.5 11.3,-2.5 11.3,-7.5 -4.3,1.5" fill="#dde3ff" />
                          <polygon points="-4.3,1.5 11.3,-7.5 4.3,-11.5 -11.3,-2.5" fill="#fff5d0" />
                          <polygon points="-4.3,6.5 18.2,1.5 18.2,-6.5 -4.3,1.5" fill="#0d1230" />
                          <polygon points="18.2,1.5 23.4,-1.5 23.4,-9.5 18.2,-6.5" fill="#F59E0B" />
                          <polygon points="18.2,-6.5 23.4,-9.5 16.4,-13.5 11.3,-10.5" fill="#fff5d0" />
                          <polygon points="19.18,-0.9 22.37,-3.9 22.37,-7.9 19.18,-4.9" fill="#6ebff8" opacity="0.9" />
                          <circle cx="22.37" cy="0.5" r="1.4" fill="#fff5cc" opacity="0.95" />
                          <circle cx="-1.33" cy="8.01" r="2.2" fill="#080c1c" /><circle cx="-1.33" cy="8.01" r="1" fill="#252840" />
                          <circle cx="9.25" cy="-1.0" r="2.2" fill="#080c1c" /><circle cx="9.25" cy="-1.0" r="1" fill="#252840" />
                        </motion.g>

                        {/* Success chips */}
                        {[
                          { x: 198.44, y: 374, label: "ROUTE OPTIMIZED", w: 102, color: "#22c55e" },
                          { x: 375.1,  y: 273, label: "32% COST SAVED",  w: 94,  color: "#F59E0B" },
                          { x: 290.4,  y: 225, label: "LIVE TRACKING",   w: 82,  color: "#3b82f6" },
                          { x: 246.84, y: 322, label: "ON-TIME POD",     w: 76,  color: "#22c55e" },
                        ].map(({ x, y, label, w, color }, i) => (
                          <motion.g key={i} transform={`translate(${x},${y})`} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i + 0.5, duration: 0.4 }}>
                            <rect x={-w / 2} y="-7.5" width={w} height="15" rx="3" fill={color} fillOpacity="0.93" />
                            <text x="0" y="3" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" style={{ letterSpacing: '0.04em', fontFamily: 'system-ui,sans-serif' }}>{label}</text>
                          </motion.g>
                        ))}

                        {/* Traflinq badge */}
                        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.4 }} style={{ transformOrigin: '414px 498px', transformBox: 'fill-box' }}>
                          <rect x="378" y="486" width="72" height="22" rx="4" fill="#F59E0B" fillOpacity="0.12" stroke="#F59E0B" strokeOpacity="0.45" strokeWidth="1" />
                          <text x="414" y="500" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#F59E0B" style={{ letterSpacing: '0.12em', fontFamily: 'system-ui,sans-serif' }}>TRAFLINQ</text>
                          <circle cx="382" cy="497" r="3.5" fill="#F59E0B" opacity="0.85" />
                          <motion.circle cx="382" cy="497" r="4" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.5"
                            animate={{ r: [4, 10], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </motion.g>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Buildings — always visible */}

                  {/* Building 1: YOUR PLANT */}
                  <g transform="translate(234.74,420.2)">
                    <polygon points="-35.5,6.5 -11.3,20.5 -11.3,-19.5 -35.5,-33.5" fill="url(#bld-side)" />
                    <polygon points="-11.3,20.5 35.5,-6.5 35.5,-46.5 -11.3,-19.5" fill="url(#bld-front)" />
                    <polygon points="-11.3,-19.5 35.5,-46.5 11.3,-60.5 -35.5,-33.5" fill="url(#bld-top)" />
                    <polyline points="-11.3,-19.5 35.5,-46.5 11.3,-60.5 -35.5,-33.5 -11.3,-19.5" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="0.6" />
                    <polygon points="16.8,4.3 33.8,-5.5 33.8,-25.5 16.8,-15.7" fill="rgba(0,0,0,0.75)" />
                    <g><polygon points="-9.4,10.4 2.6,3.5 2.6,-10.5 -9.4,-3.6" fill="rgba(0,0,0,0.28)" /><polygon points="-8.9,8.7 1.6,2.6 1.6,-8.4 -8.9,-2.3" fill="#FEF3C7" opacity="0.88" /></g>
                    <g><polygon points="9.3,-0.4 21.3,-7.3 21.3,-21.3 9.3,-14.4" fill="rgba(0,0,0,0.28)" /><polygon points="9.8,-2.2 20.3,-8.2 20.3,-19.2 9.8,-13.2" fill="#FEF3C7" opacity="0.88" /></g>
                    <polygon points="1.7,-41.6 9.5,-37.0 9.5,-65.0 1.7,-69.6" fill="#7C2D12" />
                    <polygon points="9.5,-37.0 17.3,-41.6 17.3,-69.6 9.5,-65.0" fill="#FBBF24" />
                    <polygon points="9.5,-60.5 20.7,-67.1 9.5,-73.6 -1.8,-67.1" fill="rgba(5,8,25,0.95)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
                    <motion.circle cx="13" cy="-92" r="5" fill="rgba(200,210,230,0.85)" animate={{ cy: [-92, -114], opacity: [0.5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} />
                    <motion.circle cx="13" cy="-105" r="8" fill="rgba(200,210,230,0.85)" animate={{ cy: [-105, -126], opacity: [0.2, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }} />
                  </g>

                  {/* Building 2: DISTRIBUTION CENTER */}
                  <g transform="translate(246.84,231.2)">
                    <polygon points="-45.0,10.0 -17.3,26.0 -17.3,-9.0 -45.0,-25.0" fill="url(#bld-side)" />
                    <polygon points="-17.3,26.0 45.0,-10.0 45.0,-45.0 -17.3,-9.0" fill="url(#bld-front)" />
                    <polygon points="-17.3,-9.0 45.0,-45.0 17.3,-61.0 -45.0,-25.0" fill="url(#bld-top)" />
                    <polyline points="-17.3,-9.0 45.0,-45.0 17.3,-61.0 -45.0,-25.0 -17.3,-9.0" fill="none" stroke="white" strokeOpacity="0.17" strokeWidth="0.6" />
                    <polygon points="-11.1,22.4 1.9,14.9 1.9,-0.1 -11.1,7.4" fill="rgba(0,0,0,0.60)" />
                    <polygon points="7.6,11.6 20.6,4.1 20.6,-10.9 7.6,-3.4" fill="rgba(0,0,0,0.60)" />
                    <polygon points="26.3,0.8 39.3,-6.7 39.3,-21.7 26.3,-14.2" fill="rgba(0,0,0,0.60)" />
                    <polygon points="-13.31,-2.96 41.01,-39.02 41.01,-34.02 -13.31,2.04" fill="#FEF3C7" opacity="0.80" />
                  </g>

                  {/* Location labels — always visible */}
                  <g pointerEvents="none">
                    <circle cx="234.74" cy="420.2" r="5" fill="#F59E0B" opacity="0.22" />
                    <circle cx="234.74" cy="420.2" r="2.4" fill="#F59E0B" />
                    <line x1="234.74" y1="420.2" x2="208" y2="451" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2.5" opacity="0.5" />
                    <text x="206" y="461" fontSize="11.5" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="end" style={{ paintOrder: 'stroke' as const, stroke: 'rgba(6,7,26,0.95)', strokeWidth: 4, strokeLinejoin: 'round' as const }}>YOUR PLANT</text>
                    <text x="206" y="473" fontSize="7.5" fontWeight="800" fill="#F59E0B" letterSpacing="0.14em" textAnchor="end" opacity="0.9" style={{ paintOrder: 'stroke' as const, stroke: 'rgba(6,7,26,0.85)', strokeWidth: 2.5, strokeLinejoin: 'round' as const }}>MANUFACTURING</text>
                  </g>
                  <g pointerEvents="none">
                    <circle cx="246.84" cy="231.2" r="5" fill="#F59E0B" opacity="0.22" />
                    <circle cx="246.84" cy="231.2" r="2.4" fill="#F59E0B" />
                    <line x1="246.84" y1="231.2" x2="272" y2="199" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2.5" opacity="0.5" />
                    <text x="274" y="195" fontSize="11.5" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start" style={{ paintOrder: 'stroke' as const, stroke: 'rgba(6,7,26,0.95)', strokeWidth: 4, strokeLinejoin: 'round' as const }}>DISTRIBUTION CENTER</text>
                    <text x="274" y="207" fontSize="7.5" fontWeight="800" fill="#F59E0B" letterSpacing="0.14em" textAnchor="start" opacity="0.9" style={{ paintOrder: 'stroke' as const, stroke: 'rgba(6,7,26,0.85)', strokeWidth: 2.5, strokeLinejoin: 'round' as const }}>REGIONAL HUB</text>
                  </g>

                </svg>

                {/* Bottom stats bar */}
                <div className="border-t border-white/[0.06] px-4 py-3 grid grid-cols-3 gap-3">
                  <AnimatePresence mode="wait">
                    {optimized ? (
                      <motion.div key="stats-on" className="contents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                        {[
                          { label: "Cost Saved",    value: "32%",   color: "text-primary" },
                          { label: "On-Time Rate",  value: "99.1%", color: "text-primary" },
                          { label: "Route Shorter", value: "41%",   color: "text-primary" },
                        ].map((s, i) => (
                          <div key={i} className="text-center">
                            <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] text-white/30 tracking-wide uppercase mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div key="stats-off" className="contents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                        {[
                          { label: "Cost Leakage", value: "38%",    color: "text-red-400" },
                          { label: "On-Time Rate", value: "61%",    color: "text-red-400" },
                          { label: "Avg Delay",    value: "47 min", color: "text-red-400" },
                        ].map((s, i) => (
                          <div key={i} className="text-center">
                            <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] text-white/30 tracking-wide uppercase mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
