"use client"

import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"
import Link from "next/link"

const leadership = [
  {
    name: "Aqeel Tarani",
    role: "Chief Executive Officer",
    image: "/arsalan.jpg",
    bio: "Visionary leader driving the mission to modernize global corporate mobility infrastructure through automated governance and data-driven intelligence.",
    linkedin: "https://www.linkedin.com/in/aqeeltarani/",
    initial: "A",
  },
  {
    name: "Hashir Ahmed Khan",
    role: "Chief Technology Officer",
    image: "/taha.jpg",
    bio: "Architect of the Traflinq intelligence layer, specializing in distributed systems and high-fidelity telemetry for mission-critical operations.",
    linkedin: "https://www.linkedin.com/in/hashirahmedkhan/",
    initial: "H",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Mission Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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

          {/* Right: Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {leadership.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.21, 0.45, 0.32, 0.9] }}
                className="group relative"
              >
                {/* Image/Avatar Container with Premium Border */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080b14] via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                  
                  {/* Avatar Placeholder (will be replaced by Image) */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/5 select-none transition-transform duration-700 group-hover:scale-110">
                    {member.initial}
                  </div>

                  {/* LinkedIn Float Button */}
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/40 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>

                  {/* Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Bio Section with refined typography */}
                <div className="mt-6">
                  <p className="text-xs text-primary/80 font-bold uppercase tracking-widest mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-white/45 leading-relaxed font-light">
                    {member.bio}
                  </p>
                  
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="mt-6 flex items-center gap-2 text-[11px] font-bold text-white/30 uppercase tracking-widest hover:text-primary transition-colors group/link"
                  >
                    <span className="h-px w-4 bg-white/20 transition-all group-hover/link:w-8 group-hover/link:bg-primary" />
                    Connect
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
