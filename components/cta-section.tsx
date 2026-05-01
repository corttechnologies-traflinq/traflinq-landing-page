"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#080b14] border-t border-white/[0.04]">
      {/* Background: subtle logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <Image
          src="/traflinq_dark_no_tagline-Photoroom.png"
          alt=""
          aria-hidden="true"
          width={600}
          height={200}
          className="w-[600px] max-w-full opacity-[0.025] grayscale"
        />
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs text-primary/50 tracking-widest uppercase font-medium mb-6">
            The Transition
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            Focus on your core.{" "}
            <span className="text-white/40">We'll handle the movement.</span>
          </h2>
          <p className="mt-8 text-lg text-white/35 max-w-xl mx-auto leading-8">
            Join the elite organizations redefining workforce transit.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-10 gap-2.5 shadow-xl shadow-primary/20 text-sm tracking-wide"
            >
              Schedule a Strategic Briefing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

