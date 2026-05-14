"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { motion } from "framer-motion"
import {
  BrainCircuit, Zap, ArrowRight, TrendingDown,
  TrendingUp, Navigation, Users, Clock, Fuel, Info
} from "lucide-react"

const GHOST_DATA = [
  { week: "Wk 1", ghost: 38, filled: 62 },
  { week: "Wk 2", ghost: 32, filled: 68 },
  { week: "Wk 3", ghost: 28, filled: 72 },
  { week: "Wk 4", ghost: 22, filled: 78 },
  { week: "Wk 5", ghost: 16, filled: 84 },
  { week: "Wk 6", ghost: 10, filled: 90 },
  { week: "Wk 7", ghost: 6, filled: 94 },
]

export default function IntelligenceLayerDemo() {
  return (
    <DashboardShell title="Intelligence Layer" subtitle="Route Optimisation & Predictive Analytics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* TOP ROW — Map & Governance */}
        <div className="lg:col-span-2">
          {/* ── SVG Route Map ── */}
          <div className="bg-[#080c18] border border-white/10 rounded-[2rem] overflow-hidden relative shadow-[0_2px_16px_rgba(0,0,0,0.4)]" style={{ minHeight: 380 }}>
            {/* Map grid background */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Route SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 380" preserveAspectRatio="none">
              {/* Street-like background paths */}
              <path d="M0,170 H800" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <path d="M0,100 H800" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <path d="M0,240 H800" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <path d="M200,0 V380" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <path d="M450,0 V380" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <path d="M650,0 V380" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />

              {/* Planned Route — dashed white */}
              <motion.path
                d="M120,280 C180,280 200,120 300,110 S420,180 530,100 S660,60 700,80"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2.5"
                strokeDasharray="10,6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Actual Optimised Route — orange glow */}
              <motion.path
                d="M120,280 C160,240 220,180 300,170 S410,160 530,120 S660,80 700,80"
                fill="none"
                stroke="#fe8503"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="drop-shadow(0 0 10px rgba(254,133,3,0.8))"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
              />

              {/* Origin dot */}
              <circle cx="120" cy="280" r="8" fill="#fe8503" />
              <circle cx="120" cy="280" r="14" fill="none" stroke="#fe8503" strokeWidth="1.5" strokeOpacity="0.4" />

              {/* Midpoint dot */}
              <circle cx="420" cy="155" r="5" fill="white" fillOpacity="0.6" />

              {/* Destination dot */}
              <circle cx="700" cy="80" r="10" fill="#fe8503" />
              <circle cx="700" cy="80" r="18" fill="none" stroke="#fe8503" strokeWidth="1.5" strokeOpacity="0.3" />

              {/* Animated vehicle */}
              <motion.circle
                r="7"
                fill="white"
                filter="drop-shadow(0 0 6px white)"
                initial={{ offsetDistance: "0%" } as any}
                animate={{ offsetDistance: "100%" } as any}
                style={{
                  offsetPath: `path('M120,280 C160,240 220,180 300,170 S410,160 530,120 S660,80 700,80')`,
                } as any}
                transition={{ duration: 4, delay: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Time saved badge */}
              <g transform="translate(350, 120)">
                <rect x="-40" y="-16" width="80" height="28" rx="8" fill="#fe8503" />
                <text x="0" y="6" textAnchor="middle" fill="#080b14" fontSize="10" fontWeight="bold">−18 min</text>
              </g>
            </svg>

            {/* Overlay Controls */}
            <div className="absolute top-5 left-5 space-y-2 z-10">
              <LayerToggle label="Actual Route" active color="#fe8503" />
              <LayerToggle label="Planned Route" dashed color="rgba(255,255,255,0.5)" />
              <LayerToggle label="Ghost Hotspots" color="#ef4444" />
            </div>

            {/* Live stats overlay */}
            <div className="absolute bottom-5 right-5 bg-[#0d1120]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-56 z-10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Live Telemetry</span>
                <Zap size={13} className="text-[#fe8503] animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Route Efficiency</span>
                  <span className="text-sm font-bold text-emerald-400">+18.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Distance Saved</span>
                  <span className="text-sm font-bold text-white">482.4 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">CO₂ Avoided</span>
                  <span className="text-sm font-bold text-white">112.5 kg</span>
                </div>
                <div className="h-px bg-white/10 my-1" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">AI Confidence</span>
                  <span className="text-sm font-bold text-[#fe8503]">97.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* AI Governance Panel */}
          <div className="bg-[#fe8503] rounded-[2rem] p-7 text-[#080b14] shadow-[0_2px_16px_rgba(0,0,0,0.4)] flex flex-col justify-between h-full" style={{ minHeight: 380 }}>
            <div>
              <BrainCircuit size={28} className="mb-4" />
              <h3 className="text-xl font-black leading-tight mb-3 tracking-tight">Autonomous Governance</h3>
              <p className="text-[13px] font-bold opacity-80 leading-relaxed mb-5">
                The intelligence layer automatically reroutes vendors based on real-time traffic, weather, and telemetry.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  "14,820 routes optimised",
                  "97.2% AI accuracy",
                  "Zero-touch management",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-[10px] font-black uppercase tracking-wider">
                    <div className="h-4 w-4 rounded-full border-2 border-[#080b14]/30 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#080b14]" />
                    </div>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full bg-[#080b14] text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform">
              Review AI Log
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* BOTTOM ROW — Charts & Feed */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ghost Seats Elimination */}
          <div className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Users size={16} className="text-[#fe8503]" />
                Ghost Seats Eliminated
              </h3>
              <Info size={14} className="text-white/20" />
            </div>
            <p className="text-[11px] text-white/30 mb-5 font-medium uppercase tracking-wider">7-week trend — % of seats unoccupied</p>

            <div className="flex items-end gap-2 h-32">
              {GHOST_DATA.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5 h-full justify-end group">
                  {/* Ghost (shrinking) */}
                  <motion.div
                    className="w-full bg-[#fe8503]/60 rounded-t-sm group-hover:bg-[#fe8503] transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${d.ghost}%` }}
                    transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
                  />
                  {/* Filled (growing) */}
                  <motion.div
                    className="w-full bg-emerald-500/40 rounded-b-sm group-hover:bg-emerald-500/60 transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(d.filled * 0.4, 40)}%` }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-2 mb-4">
              {GHOST_DATA.map((d) => (
                <span key={d.week} className="flex-1 text-center text-[9px] text-white/20">{d.week}</span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <div className="h-2 w-2 rounded-sm bg-[#fe8503]/60" />Ghost
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <div className="h-2 w-2 rounded-sm bg-emerald-500/40" />Occupied
              </div>
            </div>
          </div>

          {/* Route Efficiency Gain */}
          <div className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="font-bold text-base mb-1 flex items-center gap-2">
              <Navigation size={16} className="text-[#fe8503]" />
              System Efficiency Gains
            </h3>
            <p className="text-[11px] text-white/30 mb-6 font-medium uppercase tracking-wider">Compared to baseline</p>

            <div className="space-y-5">
              {[
                { label: "Deadhead Mileage", value: "-24.5%", bar: 75, good: true },
                { label: "Fleet Utilisation", value: "+32.1%", bar: 88, good: false },
                { label: "Fuel Consumption", value: "-12.8%", bar: 60, good: true },
                { label: "Ghost Seats / Trip", value: "-84.2%", bar: 95, good: true },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-white/50 font-bold uppercase tracking-wide">{item.label}</span>
                    <span className={`text-xs font-black ${item.good ? "text-emerald-400" : "text-[#fe8503]"}`}>{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${item.good ? "bg-emerald-500" : "bg-[#fe8503]"}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${item.bar}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* AI Action Feed */}
          <div className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200 h-full">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-6">AI Action Feed</h4>
            <div className="space-y-6">
              {[
                { action: "Route Recalculated", detail: "Route 14-A → avoided 22-min jam", time: "2m ago", icon: Navigation, color: "text-[#fe8503]" },
                { action: "Ghost Seat Alert", detail: "3 seats on Bus 204 reallocated", time: "18m ago", icon: Users, color: "text-orange-400" },
                { action: "Vendor Rescheduled", detail: "Metro Shuttles — shifted 15 min early", time: "34m ago", icon: Clock, color: "text-blue-400" },
                { action: "Fuel Savings Logged", detail: "1.4L saved on North Corridor", time: "1h ago", icon: Fuel, color: "text-emerald-400" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white uppercase tracking-wide">{item.action}</p>
                      <p className="text-[10px] text-white/30 mt-1 leading-snug font-medium">{item.detail}</p>
                    </div>
                    <span className="text-[9px] font-bold text-white/20 shrink-0 uppercase tracking-widest">{item.time}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </DashboardShell>
  )
}

function LayerToggle({ label, active, dashed, color }: { label: string; active?: boolean; dashed?: boolean; color: string }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border cursor-pointer transition-all ${
      active ? "bg-[#fe8503]/10 border-[#fe8503]/30 text-white shadow-lg shadow-[#fe8503]/10" : "bg-[#0d1120]/80 border-white/10 text-white/40 hover:text-white"
    }`}>
      <svg width="16" height="8">
        <line x1="0" y1="4" x2="16" y2="4" stroke={color} strokeWidth="2"
          strokeDasharray={dashed ? "4,3" : undefined} />
      </svg>
      {label}
    </div>
  )
}
