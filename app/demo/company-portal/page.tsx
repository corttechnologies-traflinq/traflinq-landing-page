"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { motion } from "framer-motion"
import {
  Bus, Car, Users, TrendingUp, Clock, Star,
  Activity, Shield, Zap, CheckCircle2,
  AlertTriangle, XCircle, RefreshCw, ArrowUpRight,
  Globe, BarChart2
} from "lucide-react"

const VENDORS = [
  {
    id: "shuttles",
    title: "Employee Shuttles",
    subtitle: "Dedicated Corporate Routes",
    icon: Bus,
    color: "#fe8503",
    bgGlow: "rgba(254,133,3,0.08)",
    border: "border-primary/20",
    fleet: 124,
    active: 98,
    utilization: 91,
    onTime: 96.4,
    rating: 4.8,
    trips: 2847,
    savings: "PKR 12,200",
    vendorCount: 6,
    change: "+4.2%",
    bars: [55, 70, 60, 85, 65, 90, 78],
  },
  {
    id: "rentacar",
    title: "Rent-a-Car",
    subtitle: "On-Demand Executive Fleet",
    icon: Car,
    color: "#3b82f6",
    bgGlow: "rgba(59,130,246,0.08)",
    border: "border-blue-500/20",
    fleet: 486,
    active: 312,
    utilization: 89,
    onTime: 94.1,
    rating: 4.9,
    trips: 1430,
    savings: "PKR 28,500",
    vendorCount: 12,
    change: "+2.7%",
    bars: [60, 80, 55, 75, 90, 85, 95],
  },
  {
    id: "poolcars",
    title: "Pool Cars",
    subtitle: "Shared Fleet Management",
    icon: Activity,
    color: "#10b981",
    bgGlow: "rgba(16,185,129,0.08)",
    border: "border-emerald-500/20",
    fleet: 42,
    active: 36,
    utilization: 84,
    onTime: 91.8,
    rating: 4.7,
    trips: 312,
    savings: "PKR 4,100",
    vendorCount: 3,
    change: "+1.1%",
    bars: [40, 55, 50, 70, 60, 75, 85],
  },
]

export default function CompanyPortalDemo() {
  return (
    <DashboardShell title="Company Portal" subtitle="Total Governance Overview">
      <div className="space-y-6">

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={Car} label="Total Fleet" value="652" change="+2.4%" />
          <KpiCard icon={Shield} label="Compliance Score" value="98.2%" change="+0.8%" />
          <KpiCard icon={Clock} label="Avg On-Time Rate" value="96.8%" change="+1.2%" />
          <KpiCard icon={TrendingUp} label="Monthly Savings" value="PKR 4.8M" change="+18.9%" />
        </div>

        {/* 3 Vendor Segments Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {VENDORS.map((v, i) => (
            <VendorCard key={v.id} vendor={v} delay={i * 0.12} />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Cross-Vendor Activity Chart */}
          <div className="lg:col-span-2 bg-[#0d1120] border border-white/10 rounded-[2rem] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart2 size={18} className="text-[#fe8503]" />
                Cross-Vendor Trip Activity
              </h3>
              <div className="flex items-center gap-3">
                {[
                  { label: "Shuttles", color: "bg-[#fe8503]" },
                  { label: "Rent-a-Car", color: "bg-blue-500" },
                  { label: "Pool Cars", color: "bg-emerald-500" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-white/40">
                    <div className={`h-2 w-2 rounded-full ${l.color}`} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/30 mb-6">Last 7 days — grouped by segment</p>

            <div className="flex items-end gap-3 h-40">
              {[
                [60, 75, 40], [70, 85, 55], [55, 65, 50], [80, 95, 68],
                [65, 78, 55], [90, 100, 80], [85, 92, 74],
              ].map((bars, i) => (
                <div key={i} className="flex-1 flex gap-0.5 items-end h-full group">
                  {bars.map((h, j) => {
                    const colors = ["bg-[#fe8503]/70 hover:bg-[#fe8503]", "bg-blue-500/70 hover:bg-blue-500", "bg-emerald-500/70 hover:bg-emerald-500"]
                    return (
                      <motion.div
                        key={j}
                        className={`flex-1 ${colors[j]} rounded-t-sm transition-colors cursor-default`}
                        style={{ height: `${h}%` }}
                        initial={{ scaleY: 0, originY: 1 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.06 + j * 0.02, duration: 0.7, ease: "easeOut" }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d} className="flex-1 text-center text-[10px] text-white/20 font-medium">{d}</span>
              ))}
            </div>
          </div>

          {/* Live Integrity Alerts */}
          <div className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Zap size={18} className="text-[#fe8503]" />
                Live Alerts
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Real-time</span>
            </div>
            <div className="space-y-3">
              <AlertPill type="warning" title="Ghost Seat — Route 42B" desc="4 unoccupied seats verified" time="12m ago" />
              <AlertPill type="error" title="No Telemetry — M104" desc="Global Fleet Ltd. non-compliant" time="45m ago" />
              <AlertPill type="success" title="Route Optimised" desc="Saved 18 min on North Corridor" time="2h ago" />
              <AlertPill type="success" title="Billing Gap Caught" desc="$14.50 variance on TR-8921" time="3h ago" />
              <AlertPill type="warning" title="Vendor SLA Breach" desc="Apex Transit — 3 late check-ins" time="4h ago" />
            </div>
          </div>
        </div>

      </div>
    </DashboardShell>
  )
}

/* ── Sub-components ── */

function KpiCard({ icon: Icon, label, value, change }: { icon: any; label: string; value: string; change: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d1120] border border-white/10 p-5 rounded-[2rem] shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-[#fe8503] transition-colors">
          <Icon size={18} />
        </div>
        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ArrowUpRight size={10} />{change}
        </span>
      </div>
      <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-black mt-1 tracking-tight">{value}</p>
    </motion.div>
  )
}

function VendorCard({ vendor: v, delay }: { vendor: any; delay: number }) {
  const Icon = v.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group"
    >
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: v.bgGlow }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl flex items-center justify-center" style={{ background: v.bgGlow, border: `1px solid ${v.color}30` }}>
              <Icon size={22} style={{ color: v.color }} />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{v.title}</h3>
              <p className="text-[11px] text-white/30 mt-0.5">{v.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>

        {/* Fleet number + change */}
        <div className="mb-5">
          <p className="text-4xl font-black tabular-nums tracking-tighter">{v.fleet.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[11px] text-white/30 font-bold uppercase tracking-wider">Total Fleet</p>
            <span className="text-[10px] font-bold text-emerald-500">{v.change}</span>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="flex items-end gap-1 h-12 mb-5">
          {v.bars.map((h: number, i: number) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, background: `${v.color}60` }}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: delay + i * 0.05, duration: 0.6 }}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "Utilization", value: `${v.utilization}%` },
            { label: "On-Time", value: `${v.onTime}%` },
            { label: "Rating", value: `${v.rating}★` },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{s.label}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: v.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Utilization bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-white/30">
            <span>Fleet Active</span>
            <span className="font-bold text-white/60">{v.active.toLocaleString()} / {v.fleet.toLocaleString()}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: v.color }}
              initial={{ width: "0%" }}
              animate={{ width: `${v.utilization}%` }}
              transition={{ delay: delay + 0.3, duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Savings footer */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Monthly Savings</p>
            <p className="text-lg font-black mt-0.5" style={{ color: v.color }}>{v.savings}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Vendors</p>
            <p className="text-lg font-black mt-0.5">{v.vendorCount}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AlertPill({ type, title, desc, time }: { type: "warning" | "error" | "success"; title: string; desc: string; time: string }) {
  const cfg = {
    warning: { icon: AlertTriangle, color: "text-orange-400", border: "border-orange-400/20", bg: "bg-orange-400/5" },
    error: { icon: XCircle, color: "text-red-400", border: "border-red-400/20", bg: "bg-red-400/5" },
    success: { icon: CheckCircle2, color: "text-emerald-400", border: "border-emerald-400/20", bg: "bg-emerald-400/5" },
  }
  const { icon: Icon, color, border, bg } = cfg[type]
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${border} ${bg}`}>
      <Icon size={14} className={`${color} mt-0.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white leading-tight">{title}</p>
        <p className="text-[10px] text-white/40 mt-0.5 leading-snug">{desc}</p>
      </div>
      <span className="text-[10px] text-white/20 shrink-0 mt-0.5">{time}</span>
    </div>
  )
}
