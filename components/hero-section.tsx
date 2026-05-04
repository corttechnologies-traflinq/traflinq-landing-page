"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion, useAnimationFrame } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// ─── Isometric Map Animation ─────────────────────────────────────────────────
// Road path control points in isometric space (x, y pairs)
// The car will interpolate along these waypoints
const ROAD_WAYPOINTS = [
  { x: 261, y: 335 }, // Hub / Distribution Center
  { x: 315, y: 366 }, // → Dealer Zone A direction
  { x: 397, y: 318 }, // Dealer Zone A
  { x: 315, y: 366 }, // ← back through hub branch
  { x: 261, y: 335 }, // Hub
  { x: 184, y: 380 }, // → Dealer Zone B direction
  { x: 87,  y: 324 }, // Dealer Zone B
  { x: 184, y: 380 }, // ← back
  { x: 261, y: 335 }, // Hub
  { x: 344, y: 287 }, // → Dealer Zone C direction
  { x: 252, y: 234 }, // Dealer Zone C
  { x: 344, y: 287 }, // ← back
  { x: 261, y: 335 }, // Hub (loop reset)
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getPositionOnPath(t: number) {
  // t in [0, 1] → position along the full route
  const segments = ROAD_WAYPOINTS.length - 1
  const scaled = t * segments
  const seg = Math.min(Math.floor(scaled), segments - 1)
  const segT = scaled - seg
  const a = ROAD_WAYPOINTS[seg]
  const b = ROAD_WAYPOINTS[seg + 1]
  return { x: lerp(a.x, b.x, segT), y: lerp(a.y, b.y, segT) }
}

function getAngle(t: number) {
  const eps = 0.001
  const a = getPositionOnPath(Math.max(0, t - eps))
  const b = getPositionOnPath(Math.min(1, t + eps))
  return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI)
}

function IsometricMap() {
  const [progress, setProgress] = useState(0)
  const startTime = useRef<number | null>(null)
  const DURATION = 14000 // ms for full loop

  useAnimationFrame((time) => {
    if (startTime.current === null) startTime.current = time
    const elapsed = (time - startTime.current) % DURATION
    setProgress(elapsed / DURATION)
  })

  const carPos = getPositionOnPath(progress)
  const carAngle = getAngle(progress)

  return (
    <div
      className="relative w-full aspect-[530/540] lg:aspect-auto lg:h-full min-h-[520px] rounded-3xl border overflow-hidden"
      style={{
        background: "radial-gradient(at 50% 30%, rgba(254,133,3,0.15) 0%, #080b14 70%)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Grid lines background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="-23 48 530 540"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const x1 = 205.7 - i * 18.6
          const x2 = 520.3 - i * 18.6
          return <line key={`h${i}`} x1={x1} y1="479" x2={x2} y2="297" stroke="white" strokeWidth="0.6" />
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = 278.3 + i * 22
          const x2 = -36.3 + i * 22
          return <line key={`v${i}`} x1={x1} y1="479" x2={x2} y2="297" stroke="white" strokeWidth="0.5" />
        })}
      </svg>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/90 z-10">
        <span>Live Map</span>
        <div
          className="flex items-center gap-1 rounded-full p-0.5"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <div className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
            style={{ background: "#fe8503" }}>
            Traflinq Active
          </div>
          <div className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.38)" }}>
            Fleet View
          </div>
        </div>
      </div>

      <svg viewBox="-23 48 530 540" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="grad-top-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
          <linearGradient id="grad-front-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fe8503" />
            <stop offset="100%" stopColor="#d97006" />
          </linearGradient>
          <linearGradient id="grad-side-secondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0a00" />
            <stop offset="100%" stopColor="#0a0500" />
          </linearGradient>
          <linearGradient id="grad-top-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="grad-front-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fe8503" />
            <stop offset="100%" stopColor="#d97006" />
          </linearGradient>
          <linearGradient id="grad-side-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a1500" />
            <stop offset="100%" stopColor="#1a0800" />
          </linearGradient>
          <filter id="glow-orange">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-car">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Platform / ground surface */}
        <g pointerEvents="none">
          <ellipse cx="200" cy="195" rx="300" ry="60" fill="#fe8503" opacity="0.04" />
          <ellipse cx="280" cy="500" rx="200" ry="8" fill="#000" opacity="0.38" style={{ filter: "blur(8px)" }} />

          {/* Isometric platform */}
          <path d="M 242 458 L 484 318 L 484 350 L 242 490 Z" fill="#04060e" stroke="#fe8503" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M 0 318 L 242 458 L 242 490 L 0 350 Z" fill="#1c1a0a" stroke="#fe8503" strokeOpacity="0.18" strokeWidth="1" />
          <path d="M 242 458 L 484 318 L 242 178 L 0 318 Z" fill="#0d0a02" stroke="#fe8503" strokeOpacity="0.38" strokeWidth="1.2" />

          {/* Edge highlights */}
          <line x1="242" y1="458" x2="484" y2="318" stroke="#fe8503" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="242" y1="458" x2="0" y2="318" stroke="#fe8503" strokeOpacity="0.65" strokeWidth="2" />
          <line x1="242" y1="178" x2="0" y2="318" stroke="white" strokeOpacity="0.10" strokeWidth="0.8" />
          <line x1="242" y1="178" x2="484" y2="318" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" />
          <line x1="242" y1="458" x2="242" y2="490" stroke="#fe8503" strokeOpacity="0.55" strokeWidth="1.8" />
          <line x1="484" y1="318" x2="484" y2="350" stroke="#000" strokeOpacity="0.60" strokeWidth="1.2" />
          <line x1="0" y1="318" x2="0" y2="350" stroke="#fe8503" strokeOpacity="0.25" strokeWidth="1" />

          {/* Grid on surface */}
          <g opacity="0.18">
            {[24, 48, 72, 96, 120, 144, 168, 192, 216].map((offset, i) => (
              <line key={`sg${i}`}
                x1={242 - offset} y1={458 - offset * 0.578}
                x2={484 - offset} y2={318 - offset * 0.578}
                stroke="#fe8503" strokeWidth="0.5"
              />
            ))}
            {[24, 48, 72, 96, 120, 144, 168, 192, 216].map((offset, i) => (
              <line key={`sg2${i}`}
                x1={242 + offset} y1={458 - offset * 0.578}
                x2={0 + offset} y2={318 - offset * 0.578}
                stroke="#fe8503" strokeWidth="0.5"
              />
            ))}
          </g>
        </g>

        {/* ── Roads ─────────────────────────────────────────────────────────── */}
        {/* Road track (dark base) */}
        {[
          { d: "M261,335 C279,345 297,355 315,366" },
          { d: "M315,366 C342,350 369,334 397,318" },
          { d: "M261,335 C236,350 210,365 184,380" },
          { d: "M184,380 C152,361 119,342 87,324" },
          { d: "M261,335 C289,319 316,303 344,287" },
          { d: "M344,287 C313,269 282,252 252,234" },
        ].map((r, i) => (
          <g key={i} pointerEvents="none">
            <path d={r.d} stroke="#0d0b04" strokeWidth="22" fill="none" strokeLinecap="round" />
            <path d={r.d} stroke="#1a1508" strokeWidth="16" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d={r.d} stroke="#2a2010" strokeWidth="14" fill="none" opacity="0.55" strokeLinecap="round" />
          </g>
        ))}

        {/* Road center dashes (orange) */}
        {[
          "M261,335 C279,345 297,355 315,366",
          "M315,366 C342,350 369,334 397,318",
          "M261,335 C236,350 210,365 184,380",
          "M184,380 C152,361 119,342 87,324",
          "M261,335 C289,319 316,303 344,287",
          "M344,287 C313,269 282,252 252,234",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#fe8503" strokeWidth="5" fill="none" opacity="0.15" style={{ filter: "blur(5px)" }} />
            <path d={d} stroke="#fe8503" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" fill="none" opacity="0.75" />
          </g>
        ))}

        {/* ── Highlight zone overlays ───────────────────────────────────────── */}
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

        {/* ── Buildings ─────────────────────────────────────────────────────── */}
        {/* Hub – large */}
        <g transform="translate(261,335)">
          <polygon points="-45,10 -17.3,26 -17.3,-9 -45,-25" fill="url(#grad-side-hub)" />
          <polygon points="-17.3,26 45,-10 45,-45 -17.3,-9" fill="url(#grad-front-hub)" />
          <polygon points="-17.3,-9 45,-45 17.3,-61 -45,-25" fill="url(#grad-top-hub)" />
          <polyline points="-17.3,-9 45,-45 17.3,-61 -45,-25 -17.3,-9" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.6" />
          {/* Windows */}
          <polygon points="-11.1,22.4 1.9,14.9 1.9,-0.1 -11.1,7.4" fill="rgba(0,0,0,0.55)" />
          <polygon points="7.6,11.6 20.6,4.1 20.6,-10.9 7.6,-3.4" fill="rgba(0,0,0,0.55)" />
          <polygon points="26.3,0.8 39.3,-6.7 39.3,-21.7 26.3,-14.2" fill="rgba(0,0,0,0.55)" />
          {/* Roof stripe */}
          <polygon points="-13.3,-2.96 41,-39 41,-34 -13.3,2.04" fill="#FDE68A" opacity="0.75" />
        </g>

        {/* Dealer Zone A – small */}
        <g transform="translate(397,318)">
          <polygon points="-17.3,3 -5.2,10 -5.2,-15 -17.3,-22" fill="url(#grad-side-secondary)" />
          <polygon points="-5.2,10 17.3,-3 17.3,-28 -5.2,-15" fill="url(#grad-front-secondary)" />
          <polygon points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22" fill="url(#grad-top-secondary)" />
          <polyline points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22 -5.2,-15" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
          <polygon points="3.1,5.2 10.1,1.1 10.1,-9.9 3.1,-5.8" fill="rgba(0,0,0,0.6)" />
          <polygon points="-3.6,1.1 2.4,-2.4 2.4,-8.4 -3.6,-4.9" fill="#FDE68A" opacity="0.9" />
          <polygon points="10.1,-6.8 16.1,-10.3 16.1,-16.3 10.1,-12.8" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* Dealer Zone B */}
        <g transform="translate(87,324)">
          <polygon points="-17.3,3 -5.2,10 -5.2,-15 -17.3,-22" fill="url(#grad-side-secondary)" />
          <polygon points="-5.2,10 17.3,-3 17.3,-28 -5.2,-15" fill="url(#grad-front-secondary)" />
          <polygon points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22" fill="url(#grad-top-secondary)" />
          <polyline points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22 -5.2,-15" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
          <polygon points="3.1,5.2 10.1,1.1 10.1,-9.9 3.1,-5.8" fill="rgba(0,0,0,0.6)" />
          <polygon points="-3.6,1.1 2.4,-2.4 2.4,-8.4 -3.6,-4.9" fill="#FDE68A" opacity="0.9" />
          <polygon points="10.1,-6.8 16.1,-10.3 16.1,-16.3 10.1,-12.8" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* Dealer Zone C */}
        <g transform="translate(252,234)">
          <polygon points="-17.3,3 -5.2,10 -5.2,-15 -17.3,-22" fill="url(#grad-side-secondary)" />
          <polygon points="-5.2,10 17.3,-3 17.3,-28 -5.2,-15" fill="url(#grad-front-secondary)" />
          <polygon points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22" fill="url(#grad-top-secondary)" />
          <polyline points="-5.2,-15 17.3,-28 5.2,-35 -17.3,-22 -5.2,-15" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
          <polygon points="3.1,5.2 10.1,1.1 10.1,-9.9 3.1,-5.8" fill="rgba(0,0,0,0.6)" />
          <polygon points="-3.6,1.1 2.4,-2.4 2.4,-8.4 -3.6,-4.9" fill="#FDE68A" opacity="0.9" />
          <polygon points="10.1,-6.8 16.1,-10.3 16.1,-16.3 10.1,-12.8" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* ── Animated Car ──────────────────────────────────────────────────── */}
        <g
          transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carAngle})`}
          filter="url(#glow-car)"
        >
          {/* Car shadow */}
          <ellipse cx="0" cy="8" rx="12" ry="4" fill="#000" opacity="0.45" style={{ filter: "blur(3px)" }} />
          {/* Car body - isometric style */}
          {/* Bottom face */}
          <polygon points="-10,4 10,4 10,-2 -10,-2" fill="#1a0a00" opacity="0.8" />
          {/* Front face */}
          <polygon points="10,4 14,2 14,-4 10,-2" fill="#fe8503" opacity="0.95" />
          {/* Top face */}
          <polygon points="-10,-2 10,-2 14,-4 -6,-4" fill="#ffa040" />
          {/* Windshield */}
          <polygon points="-2,-2 6,-2 8,-4 0,-4" fill="#0a1a2a" opacity="0.85" />
          {/* Headlight */}
          <circle cx="12" cy="0" r="1.8" fill="#fff5cc" opacity="0.95" />
          {/* Wheels */}
          <circle cx="-6" cy="5" r="2.5" fill="#080c1c" />
          <circle cx="-6" cy="5" r="1.2" fill="#2a2840" />
          <circle cx="7" cy="5" r="2.5" fill="#080c1c" />
          <circle cx="7" cy="5" r="1.2" fill="#2a2840" />
          {/* Orange pulse ring */}
          <circle cx="0" cy="0" r="14" fill="none" stroke="#fe8503" strokeWidth="1" opacity="0.3" />
        </g>

        {/* ── Location Labels ───────────────────────────────────────────────── */}
        {/* Hub */}
        <g pointerEvents="none">
          <circle cx="261" cy="335" r="5" fill="#fe8503" opacity="0.3" />
          <circle cx="261" cy="335" r="2.4" fill="#fe8503" />
          <line x1="261" y1="335" x2="283" y2="363" stroke="#fe8503" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="285" y="373" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            DISTRIBUTION CENTER
          </text>
          <text x="285" y="384" fontSize="8" fontWeight="800" fill="#fe8503" letterSpacing="0.14em" textAnchor="start" opacity="0.95"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.85)", strokeWidth: 2.5, strokeLinejoin: "round" }}>
            HUB
          </text>
        </g>

        {/* Zone A */}
        <g pointerEvents="none">
          <circle cx="397" cy="318" r="5" fill="#fe8503" opacity="0.3" />
          <circle cx="397" cy="318" r="2.4" fill="#fe8503" />
          <line x1="397" y1="318" x2="419" y2="286" stroke="#fe8503" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="421" y="282" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            ZONE A
          </text>
          <text x="421" y="293" fontSize="8" fontWeight="800" fill="#fe8503" letterSpacing="0.14em" textAnchor="start" opacity="0.95"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.85)", strokeWidth: 2.5, strokeLinejoin: "round" }}>
            LAST-MILE
          </text>
        </g>

        {/* Zone B */}
        <g pointerEvents="none">
          <circle cx="87" cy="324" r="5" fill="#fe8503" opacity="0.3" />
          <circle cx="87" cy="324" r="2.4" fill="#fe8503" />
          <line x1="87" y1="324" x2="65" y2="292" stroke="#fe8503" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="63" y="288" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="end"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            ZONE B
          </text>
          <text x="63" y="299" fontSize="8" fontWeight="800" fill="#fe8503" letterSpacing="0.14em" textAnchor="end" opacity="0.95"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.85)", strokeWidth: 2.5, strokeLinejoin: "round" }}>
            LAST-MILE
          </text>
        </g>

        {/* Zone C */}
        <g pointerEvents="none">
          <circle cx="252" cy="234" r="5" fill="#fe8503" opacity="0.3" />
          <circle cx="252" cy="234" r="2.4" fill="#fe8503" />
          <line x1="252" y1="234" x2="274" y2="202" stroke="#fe8503" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="276" y="198" fontSize="11" fontWeight="900" fill="white" letterSpacing="0.08em" textAnchor="start"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.95)", strokeWidth: 4, strokeLinejoin: "round" }}>
            ZONE C
          </text>
          <text x="276" y="209" fontSize="8" fontWeight="800" fill="#fe8503" letterSpacing="0.14em" textAnchor="start" opacity="0.95"
            style={{ paintOrder: "stroke", stroke: "rgba(8,11,20,0.85)", strokeWidth: 2.5, strokeLinejoin: "round" }}>
            LAST-MILE
          </text>
        </g>

        {/* Alert badges */}
        <g>
          <circle cx="356" cy="342" r="3" fill="#ef4444" />
          <circle cx="356" cy="342" fill="#ef4444" r="7" opacity="0.08" />
          <path d="M356,342 L420,342 L420,330" stroke="#ef4444" strokeWidth="0.9" fill="none" opacity="0.55" />
          <rect x="380" y="322" width="80" height="16" rx="8" fill="rgba(50,0,0,0.92)" stroke="#ef4444" strokeOpacity="0.7" strokeWidth="1" />
          <text x="420" y="333.5" fontSize="8.5" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="0.05em">Delay Alert</text>
        </g>
        <g>
          <circle cx="223" cy="357" r="3" fill="#ef4444" />
          <path d="M223,357 L55,357 L55,351" stroke="#ef4444" strokeWidth="0.9" fill="none" opacity="0.55" />
          <rect x="16" y="343" width="78" height="16" rx="8" fill="rgba(50,0,0,0.92)" stroke="#ef4444" strokeOpacity="0.7" strokeWidth="1" />
          <text x="55" y="354.5" fontSize="8.5" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="0.05em">ETA Update</text>
        </g>
      </svg>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#080b14]"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-[#fe8503]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/5 w-[500px] h-[500px] bg-orange-900/5 rounded-full blur-[120px]" />
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
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fe8503]/20 bg-[#fe8503]/5 px-4 py-1.5 text-xs text-[#fe8503]/80 tracking-widest uppercase font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fe8503] animate-pulse" />
                Enterprise Mobility Infrastructure
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] leading-[1.05]"
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
              className="mt-12 flex flex-col sm:flex-row items-start gap-4"
            >
              <Button
                size="lg"
                className="bg-[#fe8503] text-white hover:bg-[#fe8503]/90 px-8 gap-2 shadow-lg shadow-[#fe8503]/20 text-sm tracking-wide"
              >
                Request Enterprise Demo
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

          {/* Right: Isometric Map Animation */}
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