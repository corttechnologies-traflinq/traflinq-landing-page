"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Play, MonitorPlay } from "lucide-react"
import Link from "next/link"

const CALENDAR_URL = "https://calendar.app.google/qeHQgMANfWNr77yz6"

const actions = [
  {
    icon: MonitorPlay,
    badge: "Enterprise Access",
    title: "Request Enterprise Demo",
    description:
      "Get a live walkthrough of the Mobility Intelligence Dashboard tailored to your fleet size and operational footprint.",
    cta: "Book a Demo",
    href: CALENDAR_URL,
    external: true,
    accent: "#fe8503",
  },
  {
    icon: Calendar,
    badge: "Leadership Session",
    title: "Schedule a Strategic Briefing",
    description:
      "A focused session with our enterprise team to map your current transport spend against the Traflinq savings model.",
    cta: "Fill in the Form",
    href: "/request-briefing",
    external: false,
    accent: "#a78bfa",
  },
]

export function PlatformSection() {
  return (
    <section
      id="platform"
      className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">
            Get Started
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight max-w-2xl">
            Your next step with Traflinq.
          </h2>
          <p className="mt-4 text-base text-white/35 max-w-xl leading-relaxed">
            Choose how you want to engage — book time directly, or explore the platform on your own terms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Action Cards */}
          {actions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.21, 0.45, 0.32, 0.9] }}
            >
              <Link
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div
                  className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30` }}
                >
                  <item.icon className="h-5 w-5" style={{ color: item.accent }} />
                </div>

                <span
                  className="mb-3 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: `${item.accent}99` }}
                >
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed flex-1">
                  {item.description}
                </p>

                <div
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: item.accent }}
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Explore the Platform — Video Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/15 transition-all duration-300"
          >
            {/* Video Placeholder */}
            <div className="relative flex-1 min-h-[180px] bg-[#0c0f1a] flex items-center justify-center group cursor-pointer">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

              {/* Animated ring */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative h-16 w-16 flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-40" />
                  <Play className="h-7 w-7 text-primary fill-primary ml-1" />
                </div>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  90-sec Platform Walkthrough
                </span>
              </div>

              {/* Coming soon badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/30">
                Video Coming Soon
              </div>
            </div>

            {/* Card body */}
            <div className="p-8 pt-6 border-t border-white/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                Product Experience
              </span>
              <h3 className="mt-3 text-lg font-bold text-white tracking-tight leading-snug">
                Explore the Platform
              </h3>
              <p className="mt-3 text-sm text-white/40 leading-relaxed">
                A crisp, 90-second walkthrough of the AI-driven fleet management dashboard — live route optimisation, telemetry, and cost intelligence in action.
              </p>
              <p className="mt-3 text-xs text-white/20 leading-relaxed italic">
                Interactive click-through demo available upon enterprise onboarding.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
