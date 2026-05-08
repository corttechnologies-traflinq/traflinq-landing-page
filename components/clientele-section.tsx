"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const CLIENTS = [
  { name: "Global Logistics", logo: "/traflinq_dark_no_tagline-Photoroom.png" }, // Using logo as placeholder
  { name: "Metropolitan Transit", logo: "/traflinq_dark_no_tagline-Photoroom.png" },
  { name: "Strategic Mobility", logo: "/traflinq_dark_no_tagline-Photoroom.png" },
  { name: "Institutional Fleet", logo: "/traflinq_dark_no_tagline-Photoroom.png" },
  { name: "Unified Transport", logo: "/traflinq_dark_no_tagline-Photoroom.png" },
]

export function ClienteleSection() {
  return (
    <section className="py-24 bg-[#080b14] border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs text-white/20 tracking-widest uppercase font-medium">
            Trusted by Industry Leaders
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-8 flex items-center"
            >
              {/* This is a placeholder structure for future logos */}
              <span className="text-xl font-bold tracking-tighter text-white opacity-50">
                {client.name.split(' ').map(w => w[0]).join('')}
                <span className="text-xs tracking-normal font-medium opacity-40 ml-1">
                  {client.name}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
