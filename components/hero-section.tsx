"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion, useAnimationFrame } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import Link from "next/link"

const CALENDAR_URL = "https://calendar.app.google/qeHQgMANfWNr77yz6"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Waypoint { x: number; y: number }

// ─── Path helpers (straight segments only) ───────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getPositionOnPath(waypoints: Waypoint[], t: number): { x: number; y: number } {
  const segments = waypoints.length - 1
  if (segments === 0) return waypoints[0]
  const scaled = t * segments
  const seg = Math.min(Math.floor(scaled), segments - 1)
  const segT = scaled - seg
  const a = waypoints[seg]
  const b = waypoints[seg + 1]
  return { x: lerp(a.x, b.x, segT), y: lerp(a.y, b.y, segT) }
}

function getAngle(waypoints: Waypoint[], t: number): number {
  const eps = 0.001
  const a = getPositionOnPath(waypoints, Math.max(0, t - eps))
  const b = getPositionOnPath(waypoints, Math.min(1, t + eps))
  return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI)
}

function pathToD(waypoints: Waypoint[]): string {
  return waypoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
}

// ─── Hub coordinates ──────────────────────────────────────────────────────────
const HUB: Waypoint = { x: 261, y: 335 }

// ─── Zone destinations ────────────────────────────────────────────────────────
const ZONE_A: Waypoint = { x: 397, y: 318 }
const ZONE_B: Waypoint = { x: 87,  y: 324 }
const ZONE_C: Waypoint = { x: 252, y: 234 }

// ─── AFTER Traflinq: Short direct straight paths ──────────────────────────────
// Hub → Zone A: direct
const SHORT_A: Waypoint[] = [
  HUB,
  { x: 329, y: 327 },
  ZONE_A,
  { x: 329, y: 327 },
  HUB,
]

// Hub → Zone B: direct
const SHORT_B: Waypoint[] = [
  HUB,
  { x: 174, y: 330 },
  ZONE_B,
  { x: 174, y: 330 },
  HUB,
]

// Hub → Zone C: direct
const SHORT_C: Waypoint[] = [
  HUB,
  { x: 256, y: 285 },
  ZONE_C,
  { x: 256, y: 285 },
  HUB,
]

// ─── BEFORE Traflinq: Long inefficient paths (detours, extra stops) ────────────
// Zone A: Hub → far south detour → swing wide east → Zone A
const LONG_A: Waypoint[] = [
  HUB,
  { x: 261, y: 400 },  // detour south
  { x: 350, y: 410 },  // swing east-south
  { x: 430, y: 380 },  // continue east
  { x: 460, y: 350 },  // curve north
  ZONE_A,
  { x: 460, y: 350 },
  { x: 430, y: 380 },
  { x: 350, y: 410 },
  { x: 261, y: 400 },
  HUB,
]

// Zone B: Hub → detour north → swing far west → Zone B
const LONG_B: Waypoint[] = [
  HUB,
  { x: 261, y: 260 },  // go north first
  { x: 160, y: 248 },  // far northwest
  { x: 60,  y: 280 },  // loop down-west
  ZONE_B,
  { x: 60,  y: 280 },
  { x: 160, y: 248 },
  { x: 261, y: 260 },
  HUB,
]

// Zone C: Hub → east detour → loop around → Zone C
const LONG_C: Waypoint[] = [
  HUB,
  { x: 340, y: 300 },  // go east
  { x: 340, y: 230 },  // go north
  { x: 295, y: 210 },  // come west
  ZONE_C,
  { x: 295, y: 210 },
  { x: 340, y: 230 },
  { x: 340, y: 300 },
  HUB,
]

// ─── Car color palette ────────────────────────────────────────────────────────
const CAR_COLORS = [
  { body: "#fe8503", top: "#ffa040", head: "#fff5cc" }, // Zone A – orange
  { body: "#22d3ee", top: "#67e8f9", head: "#e0f9ff" }, // Zone B – cyan
  { body: "#a78bfa", top: "#c4b5fd", head: "#f0ebff" }, // Zone C – violet
]

function getCarOpacity(t: number) {
  const distToDest = Math.abs(t - 0.5) // 0 = at destination
  const distToHub = Math.min(t, 1 - t) // 0 = at hub start/end

  const fadeRange = 0.07 // how wide the fade zone is

  // Fade near destination (entering/exiting building)
  const destFade = distToDest < fadeRange ? distToDest / fadeRange : 1
  // Fade near hub (entering/exiting hub)
  const hubFade = distToHub < fadeRange ? distToHub / fadeRange : 1

  return Math.min(destFade, hubFade)
}

function Car({ waypoints, progress, color }: CarProps) {
  const pos = getPositionOnPath(waypoints, progress)
  const angle = getAngle(waypoints, progress)
  const op = getCarOpacity(progress)

  return (
    <g
      transform={`translate(${pos.x},${pos.y}) rotate(${angle})`}
      opacity={op}
      style={{ filter: "drop-shadow(0 0 6px " + color.body + "88)" }}
    >
      <ellipse cx="0" cy="8" rx="11" ry="3.5" fill="#000" opacity="0.4" style={{ filter: "blur(2px)" }} />
      <polygon points="-10,4 10,4 10,-2 -10,-2" fill="#1a0a00" opacity="0.85" />
      <polygon points="10,4 14,2 14,-4 10,-2" fill={color.body} opacity="0.95" />
      <polygon points="-10,-2 10,-2 14,-4 -6,-4" fill={color.top} />
      <polygon points="-2,-2 6,-2 8,-4 0,-4" fill="#0a1a2a" opacity="0.85" />
      <circle cx="12" cy="0" r="1.8" fill={color.head} opacity="0.95" />
      <circle cx="-6" cy="5" r="2.5" fill="#080c1c" />
      <circle cx="-6" cy="5" r="1.2" fill="#2a2840" />
      <circle cx="7" cy="5" r="2.5" fill="#080c1c" />
      <circle cx="7" cy="5" r="1.2" fill="#2a2840" />
    </g>
  )
}

// ─── Road renderer (straight segments) ───────────────────────────────────────
interface RoadProps {
  waypoints: Waypoint[]
  color: string
  opacity?: number
}

function Road({ waypoints, color, opacity = 1 }: RoadProps) {
  const d = pathToD(waypoints)
  return (
    <g opacity={opacity} pointerEvents="none">
      <path d={d} stroke="#0d0b04" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="#1a1508" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d={d} stroke={color} strokeWidth="5" fill="none" opacity="0.12" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "blur(4px)" }} />
      <path d={d} stroke={color} strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" fill="none" opacity="0.7" strokeLinejoin="round" />
    </g>
  )
}

// ─── Staggered progress offsets so cars don't overlap ────────────────────────
const OFFSETS = [0, 0.33, 0.66]
const DURATION = 12000 // ms

// ─── IsometricMap ─────────────────────────────────────────────────────────────
function IsometricMap() {
  const [mode, setMode] = useState<"before" | "after">("before")
  const [transitioning, setTransitioning] = useState(false)
  const [displayMode, setDisplayMode] = useState<"before" | "after">("before")
  const startTime = useRef<number | null>(null)
  const [progresses, setProgresses] = useState([0, 0.33, 0.66])

  useAnimationFrame((time) => {
    if (startTime.current === null) startTime.current = time
    const elapsed = time - startTime.current
    setProgresses(OFFSETS.map(off => ((elapsed / DURATION) + off) % 1))
  })

  const handleSwitch = useCallback(() => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      const next = mode === "before" ? "after" : "before"
      setMode(next)
      setDisplayMode(next)
      setTransitioning(false)
    }, 400)
  }, [mode, transitioning])

  const isBefore = displayMode === "before"

  const routes = isBefore
    ? [LONG_A, LONG_B, LONG_C]
    : [SHORT_A, SHORT_B, SHORT_C]

  return (
    <div
      className="relative w-full aspect-[530/560] lg:aspect-auto lg:h-[600px] min-h-[320px] sm:min-h-[500px] rounded-3xl border overflow-hidden"
      style={{
        background: "radial-gradient(at 50% 30%, rgba(254,133,3,0.15) 0%, #080b14 70%)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Grid lines background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="-23 48 530 560" preserveAspectRatio="none">
        {Array.from({ length: 14 }).map((_, i) => {
          const x1 = 205.7 - i * 18.6, x2 = 520.3 - i * 18.6
          return <line key={`h${i}`} x1={x1} y1="479" x2={x2} y2="297" stroke="white" strokeWidth="0.6" />
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = 278.3 + i * 22, x2 = -36.3 + i * 22
          return <line key={`v${i}`} x1={x1} y1="479" x2={x2} y2="297" stroke="white" strokeWidth="0.5" />
        })}
      </svg>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/90 z-10">
        <span>Live Map</span>
        {/* Toggle Switch */}
        <button
          onClick={handleSwitch}
          disabled={transitioning}
          className="flex items-center gap-1 rounded-full p-0.5 cursor-pointer select-none transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            opacity: transitioning ? 0.6 : 1,
          }}
        >
          <div
            className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
            style={{
              background: isBefore ? "#ef4444" : "transparent",
              color: isBefore ? "white" : "rgba(255,255,255,0.38)",
            }}
          >
            Before
          </div>
          <div
            className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
            style={{
              background: !isBefore ? "#fe8503" : "transparent",
              color: !isBefore ? "white" : "rgba(255,255,255,0.38)",
            }}
          >
            Traflinq
          </div>
        </button>
      </div>

      {/* Mode label */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <div
          className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500"
          style={{
            background: isBefore ? "rgba(239,68,68,0.15)" : "rgba(254,133,3,0.15)",
            border: `1px solid ${isBefore ? "rgba(239,68,68,0.4)" : "rgba(254,133,3,0.4)"}`,
            color: isBefore ? "#ef4444" : "#fe8503",
          }}
        >
          {isBefore ? "⚠ Inefficient Routes — Without Traflinq" : "✓ Optimized Routes — Traflinq Active"}
        </div>
      </div>

      <svg
        viewBox="-23 48 530 560"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ opacity: transitioning ? 0.3 : 1, transition: "opacity 0.4s ease" }}
      >
        <defs>
          {/* Building clip paths */}
          <clipPath id="clip-hub">
            <polygon points="216,345 261,371 306,345 261,319" />
          </clipPath>
          <clipPath id="clip-a">
            <polygon points="380,323 397,333 414,323 397,313" />
          </clipPath>
          <clipPath id="clip-b">
            <polygon points="70,329 87,339 104,329 87,319" />
          </clipPath>
          <clipPath id="clip-c">
            <polygon points="235,239 252,249 269,239 252,229" />
          </clipPath>

          <linearGradient id="grad-top-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D1FAE5" /><stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
          <linearGradient id="grad-front-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fe8503" /><stop offset="100%" stopColor="#d97006" />
          </linearGradient>
          <linearGradient id="grad-side-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0a00" /><stop offset="100%" stopColor="#0a0500" />
          </linearGradient>
          <linearGradient id="grad-top-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" /><stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="grad-front-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fe8503" /><stop offset="100%" stopColor="#d97006" />
          </linearGradient>
          <linearGradient id="grad-side-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a1500" /><stop offset="100%" stopColor="#1a0800" />
          </linearGradient>
        </defs>

        {/* Platform */}
        <g pointerEvents="none">
          <ellipse cx="280" cy="500" rx="200" ry="8" fill="#000" opacity="0.38" style={{ filter: "blur(8px)" }} />
          <path d="M 242 458 L 484 318 L 484 350 L 242 490 Z" fill="#04060e" stroke="#fe8503" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M 0 318 L 242 458 L 242 490 L 0 350 Z" fill="#1c1a0a" stroke="#fe8503" strokeOpacity="0.18" strokeWidth="1" />
          <path d="M 242 458 L 484 318 L 242 178 L 0 318 Z" fill="#0d0a02" stroke="#fe8503" strokeOpacity="0.38" strokeWidth="1.2" />
          <line x1="242" y1="458" x2="484" y2="318" stroke="#fe8503" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="242" y1="458" x2="0" y2="318" stroke="#fe8503" strokeOpacity="0.65" strokeWidth="2" />
          <line x1="242" y1="458" x2="242" y2="490" stroke="#fe8503" strokeOpacity="0.55" strokeWidth="1.8" />
        </g>

        {/* Roads */}
        <Road waypoints={routes[0]} color={CAR_COLORS[0].body} />
        <Road waypoints={routes[1]} color={CAR_COLORS[1].body} />
        <Road waypoints={routes[2]} color={CAR_COLORS[2].body} />

        {/* Highlight zone overlays */}
        {[
          { pts: "278.7,308.8 216.3,344.8 244.0,360.8 306.4,324.8" },
          { pts: "402.1,308.0 379.6,321.0 391.7,328.0 414.2,315.0" },
          { pts: "92.3,313.6 69.8,326.6 81.9,333.6 104.4,320.6" },
          { pts: "256.9,224.0 234.4,237.0 246.5,244.0 269.0,231.0" },
        ].map((z, i) => (
          <g key={i} pointerEvents="none">
            <polygon points={z.pts} fill="#fe8503" opacity="0.10" style={{ filter: "blur(5px)" }} />
            <polygon points={z.pts} fill="#fe8503" fillOpacity="0.05" stroke="#fe8503" strokeOpacity="0.70" strokeWidth="1.2" strokeDasharray="5 4" />
          </g>
        ))}

        {/* Buildings BOTTOM layer (side/back faces) */}
        {/* Hub */}
        <g transform="translate(261,335)" pointerEvents="none">
          <polygon points="-45,10 -17.3,26 -17.3,-9 -45,-25" fill="url(#grad-side-hub)" />
        </g>
        {/* Zone A */}
        <g transform="translate(397,318)" pointerEvents="none">
          <polygon points="-17.3,3 -5.2,10 -5.2,-15 -17.3,-22" fill="url(#grad-side-secondary)" />
        </g>
        {/* Zone B */}
        <g transform="translate(87,324)" pointerEvents="none">
          <polygon points="-17.3,3 -5.2,10 -5.2,-15 -17.3,-22" fill="url(#grad-side-secondary)" />
        </g>
        {/* Zone C */}
        <g transform="translate(252,234)" pointerEvents="none">
          <polygon points="-17.3,3 -5.2,10 -5.2,-15 -17.3,-22" fill="url(#grad-side-secondary)" />
        </g>

        {/* Animated Cars - between back and front faces */}
        <Car waypoints={routes[0]} progress={progresses[0]} color={CAR_COLORS[0]} />
        <Car waypoints={routes[1]} progress={progresses[1]} color={CAR_COLORS[1]} />
        <Car waypoints={routes[2]} progress={progresses[2]} color={CAR_COLORS[2]} />

        {/* Buildings FRONT layer (front faces + top) */}
        {/* Hub */}
        <g transform="translate(261,335)" pointerEvents="none">
          <polygon points="-17.3,26 45,-10 45,-45 -17.3,-9" fill="url(#grad-front-hub)" />
          <polygon points="-17.3,-9 45,-45 17.3,-61 -45,-25" fill="url(#grad-top-hub)" />
          <polyline points="-17.3,-9 45,-45 17.3,-61 -45,-25 -17.3,-9" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.6" />
          <polygon points="-11.1,22.4 1.9,14.9 1.9,-0.1 -11.1,7.4" fill="rgba(0,0,0,0.55)" />
          <polygon points="7.6,11.6 20.6,4.1 20.6,-10.9 7.6,-3.4" fill="rgba(0,0,0,0.55)" />
          <polygon points="26.3,0.8 39.3,-6.7 39.3,-21.7 26.3,-14.2" fill="rgba(0,0,0,0.55)" />
          <polygon points="-13.3,-2.96 41,-39 41,-34 -13.3,2.04" fill="#FDE68A" opacity="0.75" />
        </g>

        {/* Zone A */}
        <g transform="translate(397,318)" pointerEvents="none">
          <polygon points="-5.2,10 17.3,-3 17.3,-28 -5.2,-15" fill="url(#grad-front-secondary)" />
          <polygon points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22" fill="url(#grad-top-secondary)" />
          <polyline points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22 -5.2,-15" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
          <polygon points="3.1,5.2 10.1,1.1 10.1,-9.9 3.1,-5.8" fill="rgba(0,0,0,0.6)" />
          <polygon points="-3.6,1.1 2.4,-2.4 2.4,-8.4 -3.6,-4.9" fill="#FDE68A" opacity="0.9" />
          <polygon points="10.1,-6.8 16.1,-10.3 16.1,-16.3 10.1,-12.8" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* Zone B */}
        <g transform="translate(87,324)" pointerEvents="none">
          <polygon points="-5.2,10 17.3,-3 17.3,-28 -5.2,-15" fill="url(#grad-front-secondary)" />
          <polygon points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22" fill="url(#grad-top-secondary)" />
          <polyline points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22 -5.2,-15" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
          <polygon points="3.1,5.2 10.1,1.1 10.1,-9.9 3.1,-5.8" fill="rgba(0,0,0,0.6)" />
          <polygon points="-3.6,1.1 2.4,-2.4 2.4,-8.4 -3.6,-4.9" fill="#FDE68A" opacity="0.9" />
          <polygon points="10.1,-6.8 16.1,-10.3 16.1,-16.3 10.1,-12.8" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* Zone C */}
        <g transform="translate(252,234)" pointerEvents="none">
          <polygon points="-5.2,10 17.3,-3 17.3,-28 -5.2,-15" fill="url(#grad-front-secondary)" />
          <polygon points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22" fill="url(#grad-top-secondary)" />
          <polyline points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22 -5.2,-15" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
          <polygon points="3.1,5.2 10.1,1.1 10.1,-9.9 3.1,-5.8" fill="rgba(0,0,0,0.6)" />
          <polygon points="-3.6,1.1 2.4,-2.4 2.4,-8.4 -3.6,-4.9" fill="#FDE68A" opacity="0.9" />
          <polygon points="10.1,-6.8 16.1,-10.3 16.1,-16.3 10.1,-12.8" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* Location Labels */}
        {/* Hub */}
        <g pointerEvents="none">
          <circle cx="261" cy="335" r="5" fill="#fe8503" opacity="0.3" />
          <circle cx="261" cy="335" r="2.4" fill="#fe8503" />
          <line x1="261" y1="335" x2="283" y2="363" stroke="#fe8503" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="285" y="373" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            HEAD QUARTER / PLANT
          </text>
          <text x="285" y="384" fontSize="8" fontWeight="800" fill="#fe8503" letterSpacing="0.14em" textAnchor="start" opacity="0.95"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.85)", strokeWidth: 2.5, strokeLinejoin: "round" }}>
            WORK / DESTINATION
          </text>
        </g>

        {/* Zone A */}
        <g pointerEvents="none">
          <circle cx="397" cy="318" r="5" fill={CAR_COLORS[0].body} opacity="0.3" />
          <circle cx="397" cy="318" r="2.4" fill={CAR_COLORS[0].body} />
          <line x1="397" y1="318" x2="419" y2="286" stroke={CAR_COLORS[0].body} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="421" y="282" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            ROUTE A
          </text>
        </g>

        {/* Zone B */}
        <g pointerEvents="none">
          <circle cx="87" cy="324" r="5" fill={CAR_COLORS[1].body} opacity="0.3" />
          <circle cx="87" cy="324" r="2.4" fill={CAR_COLORS[1].body} />
          <line x1="87" y1="324" x2="65" y2="292" stroke={CAR_COLORS[1].body} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="63" y="288" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="end"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            ROUTE B
          </text>
        </g>

        {/* Zone C */}
        <g pointerEvents="none">
          <circle cx="252" cy="234" r="5" fill={CAR_COLORS[2].body} opacity="0.3" />
          <circle cx="252" cy="234" r="2.4" fill={CAR_COLORS[2].body} />
          <line x1="252" y1="234" x2="274" y2="202" stroke={CAR_COLORS[2].body} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="276" y="198" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            ROUTE C
          </text>
        </g>

        {/* Route length indicator badges */}
        {isBefore ? (
          <g>
            <rect x="160" y="408" width="164" height="18" rx="9" fill="rgba(50,0,0,0.92)" stroke="#ef4444" strokeOpacity="0.7" strokeWidth="1" />
            <text x="242" y="420.5" fontSize="8.5" fontWeight="700" fill="#ef4444" textAnchor="middle" letterSpacing="0.05em">3× LONGER ROUTES — NO OPTIMIZATION</text>
          </g>
        ) : (
          <g>
            <rect x="168" y="408" width="148" height="18" rx="9" fill="rgba(0,30,0,0.92)" stroke="#22c55e" strokeOpacity="0.7" strokeWidth="1" />
            <text x="242" y="420.5" fontSize="8.5" fontWeight="700" fill="#22c55e" textAnchor="middle" letterSpacing="0.05em">ROUTES OPTIMIZED — 60% SAVED</text>
          </g>
        )}

        {/* Car legend */}
        {[
          { label: "Route A", color: "#fe8503", x: 15, y: 452 },
          { label: "Route B", color: "#22d3ee", x: 95, y: 452 },
          { label: "Route C", color: "#a78bfa", x: 175, y: 452 },
        ].map((item) => (
          <g key={item.label} pointerEvents="none">
            <circle cx={item.x} cy={item.y} r="4" fill={item.color} opacity="0.9" />
            <text x={item.x + 8} y={item.y + 4} fontSize="7.5" fontWeight="700" fill="white" opacity="0.65" letterSpacing="0.06em"
              style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.8)", strokeWidth: 2 }}>
              {item.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden bg-[#080b14]"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[700px] h-[300px] sm:h-[700px] bg-[#fe8503]/6 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-0 left-1/5 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-orange-900/5 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

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
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fe8503]/20 bg-[#fe8503]/5 px-4 py-1.5 text-xs text-[#fe8503]/80 tracking-widest uppercase font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fe8503] animate-pulse" />
                Enterprise Mobility Infrastructure
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[2.5rem] sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.05]"
            >
              The Operating System for{" "}
              <span className="text-[#fe8503]">Corporate Mobility.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 text-lg leading-8 text-white/45 max-w-xl"
            >
              Centralize fragmented transport operations into a single intelligence layer. Orchestrate enterprise movement, eliminate cost leakage, and achieve total visibility through a unified platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <Link href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-[#fe8503] text-white hover:bg-[#fe8503]/90 px-8 gap-2 shadow-lg shadow-[#fe8503]/20 text-sm tracking-wide"
                >
                  Request Enterprise Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#briefing">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white/50 hover:text-white hover:bg-white/5 gap-1.5 px-6 text-sm tracking-wide"
                >
                  Explore the Platform
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Isometric Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-[#fe8503]/6 rounded-3xl blur-3xl" />
            <IsometricMap />
          </motion.div>

        </div>
      </div>
    </section>
  )
}