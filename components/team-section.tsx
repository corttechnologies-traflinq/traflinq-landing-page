"use client"

import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function TeamSection() {
  const t = useTranslations("landing.team")
  const tCommon = useTranslations("common")

  const leadership = [
    {
      name: "Aqeel Tarani",
      role: t("members.aqeel.role"),
      bio: t("members.aqeel.bio"),
      linkedin: "https://www.linkedin.com/in/aqeeltarani/",
      image: "/Aqeel Tarani for Website.jpg",
      initial: "A",
    },
    {
      name: "Hashir Ahmed Khan",
      role: t("members.hashir.role"),
      bio: t("members.hashir.bio"),
      linkedin: "https://www.linkedin.com/in/hashirahmedkhan/",
      image: "/Gemini_Generated_Image_3svsc53svsc53svs.png",
      initial: "H",
    },
  ]

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#080b14] border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="text-xs text-primary/60 tracking-widest uppercase font-medium">{t("eyebrow")}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-10 max-w-2xl mx-auto">
          {leadership.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="group relative flex-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080b14] via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-white/5 select-none transition-transform duration-700 group-hover:scale-110">
                    {member.initial}
                  </div>
                )}

                <Link
                  href={member.linkedin}
                  target="_blank"
                  className="absolute top-4 end-4 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>

                <div className="absolute bottom-0 inset-x-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white tracking-tight">{member.name}</h3>
                </div>
              </div>

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
                  {tCommon("actions.connect")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
