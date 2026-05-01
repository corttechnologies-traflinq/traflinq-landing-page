"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

// ─── Model constants (industry-calibrated) ───────────────────────────────────
const GHOST_SEAT_RATE          = 0.22   // 22% of seat-trips run empty
const TRIPS_PER_VEHICLE_MONTH  = 66     // 3 routes/day × 22 workdays
const SEATS_PER_VEHICLE        = 8
const COST_PER_SEAT_TRIP       = 3.20   // USD
const ADMIN_OVERHEAD_PER_EMP   = 10.50  // USD/employee/month on transit admin
const ROUTE_REDUNDANCY_RATE    = 0.14   // 14% of routes overlap
const AVG_VEHICLE_MONTHLY_COST = 1_800  // USD
const TRAFLINQ_EFFICIENCY_GAIN = 0.68   // 68% leakage reduction

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US")
}

export function LeakageCalculator() {
  const [fleetSize,    setFleetSize]    = useState(50)
  const [employeeSize, setEmployeeSize] = useState(500)

  const metrics = useMemo(() => {
    const ghostSeatLoss      = fleetSize * TRIPS_PER_VEHICLE_MONTH * SEATS_PER_VEHICLE * GHOST_SEAT_RATE * COST_PER_SEAT_TRIP
    const routeRedundancy    = fleetSize * AVG_VEHICLE_MONTHLY_COST * ROUTE_REDUNDANCY_RATE
    const adminOverhead      = employeeSize * ADMIN_OVERHEAD_PER_EMP
    const monthlyLeakage     = ghostSeatLoss + routeRedundancy + adminOverhead
    const monthlyRecovery    = monthlyLeakage * TRAFLINQ_EFFICIENCY_GAIN
    const annualVariance     = monthlyRecovery * 12
    const efficiencyVariance = TRAFLINQ_EFFICIENCY_GAIN * 100

    // Breakdown percentages
    const ghostPct    = ghostSeatLoss   / monthlyLeakage
    const routePct    = routeRedundancy / monthlyLeakage
    const adminPct    = adminOverhead   / monthlyLeakage

    return { ghostSeatLoss, routeRedundancy, adminOverhead, monthlyLeakage, monthlyRecovery, annualVariance, efficiencyVariance, ghostPct, routePct, adminPct }
  }, [fleetSize, employeeSize])

  return (
    <section
      id="leakage-calculator"
      className="relative py-24 sm:py-32 bg-[#080b14] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary/80 tracking-widest uppercase font-medium mb-6">
            <AlertTriangle className="h-3 w-3" />
            Fiscal Leakage Diagnostic
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            How much is slipping through?
          </h2>
          <p className="mt-5 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Input your fleet and workforce parameters. The model surfaces your projected monthly leakage and the efficiency variance Traflinq closes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: Inputs ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 backdrop-blur-sm"
          >
            <p className="text-xs text-white/30 tracking-widest uppercase font-medium mb-8">
              Fleet Parameters
            </p>

            {/* Fleet Size */}
            <div className="mb-10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <label className="text-sm font-semibold text-white">Fleet Size</label>
                  <p className="text-xs text-white/30 mt-0.5">Total vehicles in managed operation</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary tabular-nums">{formatNumber(fleetSize)}</span>
                  <span className="text-xs text-white/30 ml-1">vehicles</span>
                </div>
              </div>
              <Slider
                min={5}
                max={500}
                step={5}
                value={[fleetSize]}
                onValueChange={([v]) => setFleetSize(v)}
                className="[&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-range]]:bg-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-white/20">
                <span>5</span>
                <span>500</span>
              </div>
            </div>

            {/* Employee Size */}
            <div className="mb-8">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <label className="text-sm font-semibold text-white">Workforce Size</label>
                  <p className="text-xs text-white/30 mt-0.5">Total employees served by transit</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary tabular-nums">{formatNumber(employeeSize)}</span>
                  <span className="text-xs text-white/30 ml-1">employees</span>
                </div>
              </div>
              <Slider
                min={50}
                max={10000}
                step={50}
                value={[employeeSize]}
                onValueChange={([v]) => setEmployeeSize(v)}
                className="[&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-range]]:bg-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-white/20">
                <span>50</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Leakage breakdown bars */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-4">
              <p className="text-xs text-white/25 tracking-widest uppercase font-medium">Leakage Sources</p>

              {[
                { label: "Ghost Seat Utilisation", pct: metrics.ghostPct, value: metrics.ghostSeatLoss },
                { label: "Route Redundancy",        pct: metrics.routePct, value: metrics.routeRedundancy },
                { label: "Admin Overhead",          pct: metrics.adminPct, value: metrics.adminOverhead },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-white/50">{item.label}</span>
                    <span className="text-xs text-white/60 tabular-nums">{formatCurrency(item.value)}/mo</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Output ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="space-y-5"
          >
            {/* Projected Monthly Leakage */}
            <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.04] p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/30 tracking-widest uppercase font-medium">
                    Projected Monthly Leakage
                  </p>
                  <motion.p
                    key={metrics.monthlyLeakage}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-4xl font-bold text-white tabular-nums"
                  >
                    {formatCurrency(metrics.monthlyLeakage)}
                  </motion.p>
                  <p className="mt-1 text-sm text-white/30">
                    leaving your operation unrecovered
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </div>

            {/* Monthly Recovery with Traflinq */}
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.05] p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-primary/60 tracking-widest uppercase font-medium">
                    Monthly Recovery with Traflinq
                  </p>
                  <motion.p
                    key={metrics.monthlyRecovery}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-4xl font-bold text-primary tabular-nums"
                  >
                    {formatCurrency(metrics.monthlyRecovery)}
                  </motion.p>
                  <p className="mt-1 text-sm text-white/30">
                    recovered per month through automated governance
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* Annual Variance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <p className="text-xs text-white/30 tracking-widest uppercase font-medium mb-2">
                  Annual Variance
                </p>
                <motion.p
                  key={metrics.annualVariance}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-white tabular-nums"
                >
                  {formatCurrency(metrics.annualVariance)}
                </motion.p>
                <p className="text-xs text-white/25 mt-1">per annum recoverable</p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <p className="text-xs text-white/30 tracking-widest uppercase font-medium mb-2">
                  Efficiency Variance
                </p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-2xl font-bold text-primary tabular-nums">
                    {metrics.efficiencyVariance.toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-white/25 mt-1">operational improvement</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-5">
              <CheckCircle2 className="h-4 w-4 text-primary/60 mt-0.5 shrink-0" />
              <p className="text-xs text-white/30 leading-relaxed">
                Projections based on industry-calibrated benchmarks: 22% ghost-seat rate, 14% route redundancy, and $10.50 per-employee admin overhead. Actual variance is validated post-onboarding against your telemetry data.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
