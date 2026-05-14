"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Receipt, ShieldCheck, AlertCircle, Download,
  Filter, CheckCircle2, XCircle, Zap, TrendingDown,
  MapPin, Navigation, Clock, Star, ChevronRight
} from "lucide-react"

const TRIPS = [
  {
    id: "TR-8921", vendor: "Global Fleet Ltd.", date: "09 May 2026", route: "Gulberg → DHA Phase 5",
    claimed: 8250, verified: 7200, diff: 1050, status: "flagged",
    detail: {
      distance: { claimed: "18.7 km", verified: "14.2 km", gap: "4.5 km unverified by GPS" },
      baseFare: { claimed: "PKR 440 × 18.7 km", verified: "PKR 440 × 14.2 km" },
      waiting: { claimed: "PKR 600 (30 min)", verified: "PKR 300 (15 min verified)", gap: "15 min wait not corroborated" },
      fuel: { claimed: "PKR 400", verified: "PKR 400" },
      gapReason: "Vendor claimed 4.5 km of additional travel and 15 min of waiting time not supported by telematics.",
    }
  },
  { id: "TR-8920", vendor: "Apex Transit", date: "09 May 2026", route: "Johar Town → Cavalry", claimed: 4500, verified: 4500, diff: 0, status: "verified" },
  {
    id: "TR-8919", vendor: "Metro Shuttles", date: "08 May 2026", route: "Model Town → Airport",
    claimed: 65000, verified: 58000, diff: 7000, status: "flagged",
    detail: {
      distance: { claimed: "62.0 km", verified: "60.5 km", gap: "1.5 km route deviation" },
      baseFare: { claimed: "PKR 950 × 62 km", verified: "PKR 950 × 60.5 km" },
      waiting: { claimed: "PKR 2,500 (1 hr)", verified: "PKR 2,500 (1 hr verified)" },
      fuel: { claimed: "PKR 1,800", verified: "PKR 1,800" },
      gapReason: "Vehicle deviated 1.5 km from pre-approved route. Surcharge not in contract.",
    }
  },
  { id: "TR-8918", vendor: "Global Fleet Ltd.", date: "08 May 2026", route: "Clifton → Korangi", claimed: 3420, verified: 3420, diff: 0, status: "verified" },
  {
    id: "TR-8917", vendor: "Apex Transit", date: "07 May 2026", route: "Bahria Town → F-10",
    claimed: 5100, verified: 4850, diff: 250, status: "flagged",
    detail: {
      distance: { claimed: "10.2 km", verified: "9.8 km", gap: "0.4 km discrepancy" },
      baseFare: { claimed: "PKR 425 × 10.2 km", verified: "PKR 425 × 9.8 km" },
      waiting: { claimed: "PKR 850", verified: "PKR 850" },
      fuel: { claimed: "PKR 210", verified: "PKR 210" },
      gapReason: "Minor GPS path deviation — 0.4 km not on approved route.",
    }
  },
  { id: "TR-8916", vendor: "Metro Shuttles", date: "07 May 2026", route: "Satellite Town → Mall", claimed: 24500, verified: 24500, diff: 0, status: "verified" },
]

const PRICING_TIERS = [
  { tier: "Bronze", compliance: "< 80%", rate: "PKR 420 / km", color: "#cd7f32", active: false },
  { tier: "Silver", compliance: "80 – 89%", rate: "PKR 350 / km", color: "#9ca3af", active: false },
  { tier: "Gold", compliance: "90 – 95%", rate: "PKR 285 / km", color: "#eab308", active: true },
  { tier: "Platinum", compliance: "> 95%", rate: "PKR 210 / km", color: "#a78bfa", active: false },
]

export default function BillingTransparencyDemo() {
  const [selected, setSelected] = useState<typeof TRIPS[0] | null>(null)

  return (
    <DashboardShell title="Billing & Audit" subtitle="Performance-Linked Pricing & Fiscal Transparency">
      <div className="space-y-6">

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <BillingKpi icon={ShieldCheck} label="Integrity Score" value="94.2" unit="/ 100" color="text-emerald-400" bg="bg-emerald-400/10" />
          <BillingKpi icon={AlertCircle} label="Recovered MTD" value="PKR 1.2M" color="text-[#fe8503]" bg="bg-[#fe8503]/10" />
          <BillingKpi icon={XCircle} label="Flagged Trips" value="23" unit="/ 186" color="text-orange-400" bg="bg-orange-400/10" />
          <BillingKpi icon={TrendingDown} label="Overbilling Rate" value="4.8%" unit="↓ from 18.2%" color="text-blue-400" bg="bg-blue-400/10" />
        </div>

        {/* Performance-Linked Pricing Tiers */}
        <div className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-8 shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Star size={18} className="text-[#fe8503]" />
                Performance-Linked Pricing
              </h3>
              <p className="text-xs text-white/30 mt-1 font-medium">Vendor rates auto-adjust monthly based on compliance & audit integrity</p>
            </div>
            <span className="text-[10px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-4 py-2 rounded-full font-black uppercase tracking-widest">
              Current: Gold Tier
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING_TIERS.map((t) => (
              <div key={t.tier}
                className={`relative rounded-[1.5rem] border p-6 transition-all ${t.active
                  ? "border-yellow-500/40 bg-yellow-500/5 shadow-lg shadow-yellow-500/5"
                  : "border-white/5 bg-white/[0.02]"}`}>
                {t.active && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-[#080b14] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    Current
                  </div>
                )}
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${t.color}20` }}>
                  <Star size={16} style={{ color: t.color }} />
                </div>
                <p className="font-black text-sm mb-1 uppercase tracking-wider" style={{ color: t.color }}>{t.tier}</p>
                <p className="text-[10px] text-white/30 mb-4 font-bold uppercase tracking-widest">{t.compliance} compliance</p>
                <p className="text-2xl font-black tracking-tight">{t.rate}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 text-[11px] text-white/30 font-medium">
            <Zap size={14} className="text-[#fe8503] shrink-0" />
            Traflinq automatically applies the correct tier rate at invoice generation — no manual intervention.
          </div>
        </div>

        {/* Audit Log + Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Table */}
          <div className="lg:col-span-2 bg-[#0d1120] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
            <div className="p-7 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Receipt size={18} className="text-[#fe8503]" />
                Automated Audit Log
              </h3>
              <div className="flex gap-2">
                <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center gap-2 transition-colors">
                  <Filter size={13} /> Filter
                </button>
                <button className="h-10 px-4 rounded-xl bg-[#fe8503] text-[#080b14] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#fe8503]/20">
                  <Download size={13} /> Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[9px] uppercase tracking-widest font-black text-white/20 border-b border-white/5">
                    <th className="px-8 py-4">Trip ID</th>
                    <th className="px-8 py-4">Vendor</th>
                    <th className="px-8 py-4">Route</th>
                    <th className="px-8 py-4">Claimed</th>
                    <th className="px-8 py-4">Verified</th>
                    <th className="px-8 py-4">Variance</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {TRIPS.map((trip) => {
                    const isFlagged = trip.status === "flagged"
                    const isSelected = selected?.id === trip.id
                    return (
                      <tr
                        key={trip.id}
                        onClick={() => trip.detail ? setSelected(isSelected ? null : trip) : null}
                        className={`group transition-all duration-200 ${trip.detail ? "cursor-pointer" : ""} ${isSelected ? "bg-[#fe8503]/5" : "hover:bg-white/[0.02]"}`}
                      >
                        <td className="px-8 py-5 text-xs font-mono font-black text-white/70">
                          <div className="flex items-center gap-1.5">
                            {trip.id}
                            {trip.detail && <ChevronRight size={11} className="text-[#fe8503] opacity-0 group-hover:opacity-100 transition-opacity" />}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-white/40 border border-white/5">{trip.vendor[0]}</div>
                            <span className="text-xs text-white/50 font-bold">{trip.vendor}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-[11px] text-white/30 max-w-[140px] truncate font-medium">{trip.route}</td>
                        <td className="px-8 py-5 text-xs font-black tabular-nums">PKR {trip.claimed.toLocaleString()}</td>
                        <td className="px-8 py-5 text-xs font-black tabular-nums">PKR {trip.verified.toLocaleString()}</td>
                        <td className={`px-8 py-5 text-xs font-black tabular-nums ${isFlagged ? "text-[#fe8503]" : "text-emerald-400"}`}>
                          {isFlagged ? `-PKR ${trip.diff.toLocaleString()}` : "—"}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${isFlagged
                            ? "border-[#fe8503]/30 bg-[#fe8503]/5 text-[#fe8503]"
                            : "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"}`}>
                            {isFlagged ? <XCircle size={9} /> : <CheckCircle2 size={9} />}
                            {trip.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-5 border-t border-white/5 flex items-center justify-between">
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">6 trips found • 3 flagged by AI</p>
              <button className="text-[10px] text-[#fe8503] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">View all transactions →</button>
            </div>
          </div>

          {/* Detail Panel */}
          <div>
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[#0b0e1a] border border-[#fe8503]/25 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl"
                >
                  {/* Background glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#fe8503]/5 blur-[100px] rounded-full" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-[#fe8503]">Deep Telemetry Audit</span>
                        <p className="text-2xl font-black mt-1 tracking-tighter">{selected.id}</p>
                      </div>
                      <Receipt size={32} className="text-white/5" />
                    </div>

                    {/* Route info */}
                    <div className="bg-white/5 rounded-2xl p-5 mb-8 flex items-center gap-4 border border-white/5">
                      <div className="h-10 w-10 rounded-xl bg-[#fe8503]/10 flex items-center justify-center text-[#fe8503]">
                        <Navigation size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-0.5">Route Path</p>
                        <p className="text-xs font-bold text-white/80">{selected.route}</p>
                      </div>
                    </div>

                    {/* Breakdown table */}
                    <div className="space-y-4 mb-8">
                      <CostRow label="Distance Claimed" value={selected.detail!.distance.claimed} />
                      <CostRow label="GPS Verified Path" value={selected.detail!.distance.verified} highlight />
                      <div className="bg-[#fe8503]/10 border border-[#fe8503]/20 rounded-xl px-4 py-3">
                        <p className="text-[10px] text-[#fe8503] font-bold uppercase tracking-widest">{selected.detail!.distance.gap}</p>
                      </div>

                      <div className="h-px bg-white/5 my-2" />

                      <CostRow label="Base Rate (Claimed)" value={selected.detail!.baseFare.claimed} />
                      <CostRow label="Base Rate (Verified)" value={selected.detail!.baseFare.verified} highlight />

                      <div className="h-px bg-white/5 my-2" />

                      <CostRow label="Waiting Time (Claimed)" value={selected.detail!.waiting.claimed} />
                      <CostRow label="Waiting (Verified)" value={selected.detail!.waiting.verified} highlight />
                      {selected.detail!.waiting.gap && (
                        <div className="bg-[#fe8503]/10 border border-[#fe8503]/20 rounded-xl px-4 py-3 mt-2">
                          <p className="text-[10px] text-[#fe8503] font-bold uppercase tracking-widest">{selected.detail!.waiting.gap}</p>
                        </div>
                      )}
                    </div>

                    {/* Totals */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6 space-y-4 shadow-inner">
                      <div className="flex justify-between">
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Amount Claimed</span>
                        <span className="text-sm font-black text-white/40 line-through tabular-nums">PKR {selected.claimed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">System Verified</span>
                        <span className="text-xl font-black text-emerald-400 tabular-nums">PKR {selected.verified.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Variance callout */}
                    <div className="bg-[#fe8503]/10 border border-[#fe8503]/30 rounded-2xl p-6 shadow-lg shadow-[#fe8503]/5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={16} className="text-[#fe8503]" />
                        <span className="text-xs font-black text-[#fe8503] uppercase tracking-widest">Audit Variance Caught</span>
                      </div>
                      <p className="text-[10px] text-white/50 leading-relaxed mb-4 font-medium italic">"{selected.detail!.gapReason}"</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-[#fe8503] tracking-tighter">−PKR {selected.diff.toLocaleString()}</p>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Adjusted</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelected(null)}
                      className="mt-8 w-full py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-white/20 hover:text-white"
                    >
                      Dismiss Deep Audit
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0d1120] border border-white/10 rounded-[2rem] p-12 h-full flex flex-col items-center justify-center text-center shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
                >
                  <div className="h-20 w-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 border border-white/5 shadow-xl">
                    <Receipt size={32} className="text-white/10" />
                  </div>
                  <h4 className="font-black text-lg mb-3 tracking-tight">Select a Flagged Trip</h4>
                  <p className="text-xs text-white/30 max-w-[220px] leading-relaxed font-medium">
                    Click any transaction marked <span className="text-[#fe8503] font-black">flagged</span> to perform a deep telemetry cross-check.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </DashboardShell>
  )
}

/* ── Sub-components ── */

function BillingKpi({ icon: Icon, label, value, unit, color, bg }: any) {
  return (
    <div className="bg-[#0d1120] border border-white/10 p-6 rounded-[2rem] shadow-[0_2px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-200">
      <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center mb-5 ${color} border border-white/5`}>
        <Icon size={18} />
      </div>
      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-1.5 mt-1">
        <p className={`text-3xl font-black tracking-tighter ${color}`}>{value}</p>
        {unit && <span className="text-[11px] text-white/20 font-bold">{unit}</span>}
      </div>
    </div>
  )
}

function CostRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">{label}</span>
      <span className={`text-xs font-black tabular-nums ${highlight ? "text-emerald-400" : "text-white/70"}`}>{value}</span>
    </div>
  )
}
