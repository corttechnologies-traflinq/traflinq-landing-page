"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Lock, ChevronRight, BarChart3, X } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────
// 12 corporate clients | 7 recurring (marked isRecurring: true)
const REPORTS = [
  {
    id: "OSR-001",
    codename: "Enterprise Meridian",
    industry: "Financial Services",
    fleetScale: "120 vehicles",
    workforce: "2,400 employees",
    outcome: "31% reduction in ghost-seat expenditure within 60 days of deployment.",
    metric: "−31% ghost seats",
    quarter: "Q2 2024",
    isRecurring: true,
    status: "Active",
    tags: ["Route Optimisation", "Compliance Reporting"],
  },
  {
    id: "OSR-002",
    codename: "Project Helix",
    industry: "Pharmaceuticals",
    fleetScale: "74 vehicles",
    workforce: "1,100 employees",
    outcome: "Eliminated 18% route redundancy; transit admin overhead reduced by $47K annually.",
    metric: "−$47K admin/yr",
    quarter: "Q3 2024",
    isRecurring: true,
    status: "Active",
    tags: ["Admin Automation", "Fleet Telemetry"],
  },
  {
    id: "OSR-003",
    codename: "Atlas Corporate",
    industry: "Energy & Utilities",
    fleetScale: "210 vehicles",
    workforce: "3,800 employees",
    outcome: "Full fiscal leakage audit completed. 68% variance closed in first operational quarter.",
    metric: "68% leakage closed",
    quarter: "Q4 2024",
    isRecurring: true,
    status: "Active",
    tags: ["Fiscal Audit", "Institutional Oversight"],
  },
  {
    id: "OSR-004",
    codename: "Stratum Holdings",
    industry: "Real Estate & Infrastructure",
    fleetScale: "45 vehicles",
    workforce: "620 employees",
    outcome: "Seat utilisation improved from 61% to 89% through predictive scheduling.",
    metric: "+28pp utilisation",
    quarter: "Q1 2025",
    isRecurring: false,
    status: "Completed",
    tags: ["Predictive Scheduling"],
  },
  {
    id: "OSR-005",
    codename: "Keystone Group",
    industry: "Professional Services",
    fleetScale: "58 vehicles",
    workforce: "940 employees",
    outcome: "Multi-site corridor consolidation reduced total fleet cost by 22% MoM.",
    metric: "−22% fleet cost",
    quarter: "Q1 2025",
    isRecurring: true,
    status: "Active",
    tags: ["Multi-site Operations", "Cost Reduction"],
  },
  {
    id: "OSR-006",
    codename: "Vantage Logistics",
    industry: "Supply Chain & Logistics",
    fleetScale: "330 vehicles",
    workforce: "5,200 employees",
    outcome: "Real-time vendor integration cut booking-to-departure latency to under 4 minutes.",
    metric: "<4 min dispatch",
    quarter: "Q2 2025",
    isRecurring: true,
    status: "Active",
    tags: ["Vendor Integration", "Real-time Telemetry"],
  },
  {
    id: "OSR-007",
    codename: "Pinnacle Manufacturing",
    industry: "Industrial Manufacturing",
    fleetScale: "95 vehicles",
    workforce: "1,700 employees",
    outcome: "Shift-aligned routing eliminated 100% of late-arrival penalties over 90-day period.",
    metric: "0 late penalties",
    quarter: "Q2 2025",
    isRecurring: false,
    status: "Completed",
    tags: ["Shift Routing", "SLA Compliance"],
  },
  {
    id: "OSR-008",
    codename: "Accord Capital",
    industry: "Investment Management",
    fleetScale: "28 vehicles",
    workforce: "380 employees",
    outcome: "Executive mobility tier separated from general fleet; NPS on transit satisfaction +41 pts.",
    metric: "+41 transit NPS",
    quarter: "Q3 2025",
    isRecurring: true,
    status: "Active",
    tags: ["Executive Mobility", "Experience Layer"],
  },
  {
    id: "OSR-009",
    codename: "Novara Telecoms",
    industry: "Telecommunications",
    fleetScale: "160 vehicles",
    workforce: "2,900 employees",
    outcome: "Automated compliance layer passed all three regulatory audits with zero findings.",
    metric: "0 audit findings",
    quarter: "Q3 2025",
    isRecurring: false,
    status: "Completed",
    tags: ["Regulatory Compliance", "Audit Readiness"],
  },
  {
    id: "OSR-010",
    codename: "Solaris Health",
    industry: "Healthcare",
    fleetScale: "82 vehicles",
    workforce: "1,450 employees",
    outcome: "24/7 shift coverage model deployed; 99.4% on-time performance over 6 months.",
    metric: "99.4% on-time",
    quarter: "Q4 2025",
    isRecurring: true,
    status: "Active",
    tags: ["24/7 Operations", "Performance SLA"],
  },
  {
    id: "OSR-011",
    codename: "Orbital Technologies",
    industry: "Aerospace & Defence",
    fleetScale: "67 vehicles",
    workforce: "1,020 employees",
    outcome: "Classified site access protocols integrated with Traflinq's identity layer. Zero security incidents.",
    metric: "0 security incidents",
    quarter: "Q4 2025",
    isRecurring: false,
    status: "Completed",
    tags: ["Security Integration", "Identity Layer"],
  },
  {
    id: "OSR-012",
    codename: "Concord Retail Group",
    industry: "Retail & Commerce",
    fleetScale: "143 vehicles",
    workforce: "4,600 employees",
    outcome: "Season-adjusted fleet scaling reduced idle vehicle overhead by 39% during off-peak cycles.",
    metric: "−39% idle overhead",
    quarter: "Q1 2026",
    isRecurring: false,
    status: "Completed",
    tags: ["Dynamic Scaling", "Seasonal Operations"],
  },
]

const RECURRING_COUNT = REPORTS.filter(r => r.isRecurring).length  // 7

export function OperationalSuccessReports() {
  const [activeFilter, setActiveFilter] = useState<"all" | "recurring" | "completed">("all")
  const [expandedId, setExpandedId]     = useState<string | null>(null)

  const filtered = REPORTS.filter(r => {
    if (activeFilter === "recurring")  return r.isRecurring
    if (activeFilter === "completed")  return !r.isRecurring
    return true
  })

  const expanded = REPORTS.find(r => r.id === expandedId) ?? null

  return (
    <section
      id="operational-success-reports"
      className="relative py-24 sm:py-32 bg-[#080b14] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-700/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary/80 tracking-widest uppercase font-medium mb-6">
                <BarChart3 className="h-3 w-3" />
                Operational Success Reports
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                Institutional results,{" "}
                <span className="text-white/35">at scale.</span>
              </h2>
              <p className="mt-5 text-base text-white/40 max-w-2xl leading-relaxed">
                Outcomes drawn from {REPORTS.length} corporate deployments.{" "}
                <span className="text-primary/70">{RECURRING_COUNT} organisations</span> operate
                on active recurring engagements. All performance data is independently audited.
                Client identities withheld per institutional confidentiality agreements.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 shrink-0">
              <div className="text-right">
                <p className="text-2xl font-bold text-white tabular-nums">{REPORTS.length}</p>
                <p className="text-xs text-white/30 mt-0.5">Deployments</p>
              </div>
              <div className="w-px bg-white/[0.06]" />
              <div className="text-right">
                <p className="text-2xl font-bold text-primary tabular-nums">{RECURRING_COUNT}</p>
                <p className="text-xs text-white/30 mt-0.5">Recurring</p>
              </div>
              <div className="w-px bg-white/[0.06]" />
              <div className="text-right">
                <p className="text-2xl font-bold text-white tabular-nums">
                  {REPORTS.filter(r => !r.isRecurring).length}
                </p>
                <p className="text-xs text-white/30 mt-0.5">Completed</p>
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-8 flex gap-2 flex-wrap">
            {(["all", "recurring", "completed"] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  activeFilter === f
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                {f === "all"       ? "All Reports"           : null}
                {f === "recurring" ? `Recurring Partners (${RECURRING_COUNT})` : null}
                {f === "completed" ? "Project Engagements"   : null}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((report, i) => (
              <motion.div
                key={report.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                className={`relative rounded-2xl border cursor-pointer group transition-all duration-200 p-5 ${
                  report.isRecurring
                    ? "border-primary/20 bg-primary/[0.04] hover:border-primary/40 hover:bg-primary/[0.07]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                {/* Recurring badge */}
                {report.isRecurring && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-primary/15 border border-primary/30 px-2 py-0.5">
                    <RefreshCw className="h-2.5 w-2.5 text-primary" />
                    <span className="text-[10px] text-primary font-medium tracking-wide">Recurring</span>
                  </div>
                )}

                {/* Report ID */}
                <p className="text-[10px] text-white/20 font-mono tracking-widest mb-3">{report.id}</p>

                {/* Codename */}
                <h3 className="text-sm font-semibold text-white leading-snug pr-16">{report.codename}</h3>
                <p className="text-xs text-white/35 mt-0.5">{report.industry}</p>

                {/* Key metric */}
                <div className="mt-4 rounded-lg bg-white/[0.04] border border-white/[0.05] px-3 py-2">
                  <p className="text-xs text-white/25 mb-0.5">Key Outcome</p>
                  <p className={`text-sm font-bold ${report.isRecurring ? "text-primary" : "text-white"} tabular-nums`}>
                    {report.metric}
                  </p>
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/25">{report.quarter}</span>
                  <div className="flex items-center gap-1">
                    <div className={`h-1.5 w-1.5 rounded-full ${report.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
                    <span className="text-xs text-white/30">{report.status}</span>
                  </div>
                </div>

                {/* Expand hint */}
                <div className="mt-3 flex items-center gap-1 text-xs text-white/20 group-hover:text-white/40 transition-colors">
                  <span>View report</span>
                  <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Confidentiality notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-white/20"
        >
          <Lock className="h-3 w-3" />
          <span>All client identities withheld under institutional confidentiality agreements. Metrics independently verified.</span>
        </motion.div>
      </div>

      {/* ── Expanded Report Modal ── */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setExpandedId(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 rounded-2xl border border-white/[0.1] bg-[#0d1120] shadow-2xl p-8"
            >
              {/* Close */}
              <button
                onClick={() => setExpandedId(null)}
                className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-start justify-between pr-6 mb-6">
                <div>
                  <p className="text-[10px] text-white/20 font-mono tracking-widest mb-1">{expanded.id}</p>
                  <h3 className="text-xl font-bold text-white">{expanded.codename}</h3>
                  <p className="text-sm text-white/40 mt-0.5">{expanded.industry}</p>
                </div>
                {expanded.isRecurring && (
                  <div className="flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1">
                    <RefreshCw className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary font-medium">Recurring Partner</span>
                  </div>
                )}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Fleet Scale",    value: expanded.fleetScale },
                  { label: "Workforce",      value: expanded.workforce },
                  { label: "Engagement",     value: expanded.quarter },
                  { label: "Status",         value: expanded.status },
                ].map(item => (
                  <div key={item.label} className="rounded-lg bg-white/[0.04] border border-white/[0.05] px-3 py-3">
                    <p className="text-xs text-white/25 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Outcome */}
              <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4 mb-5">
                <p className="text-xs text-primary/60 tracking-widest uppercase font-medium mb-2">Operational Outcome</p>
                <p className="text-sm text-white/70 leading-relaxed">{expanded.outcome}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {expanded.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full border border-white/[0.08] text-xs text-white/35">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Confidentiality */}
              <div className="mt-6 flex items-center gap-2 text-xs text-white/20">
                <Lock className="h-3 w-3 shrink-0" />
                <span>Full report available under NDA. Contact your account executive.</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
