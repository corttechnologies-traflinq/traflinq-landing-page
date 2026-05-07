"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">About Traflinq</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Engineering the Future of Movement.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/45">
            Traflinq was born from a simple observation: corporate transport is an operational black box. We built the first "Intelligence Layer" for mobility to bridge the gap between fragmented logistics and enterprise strategic goals.
          </p>
          <p className="mt-4 text-sm text-white/30 leading-relaxed">
            Based at the intersection of logistics and software engineering, our team is dedicated to eliminating fiscal leakage and providing total visibility for the world's most complex organizations.
          </p>

          <div className="mt-10 flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-white tracking-tight">99.9%</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-semibold">System Uptime</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="text-3xl font-bold text-white tracking-tight">Zero</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-semibold">Data Silos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
