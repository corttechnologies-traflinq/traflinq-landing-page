import Link from "next/link"
import Image from "next/image"
import { Linkedin, Facebook } from "lucide-react"

const footerColumns = [
  {
    heading: "Platform",
    links: [
      { name: "Platform Overview", href: "/#home" },
      { name: "The Intelligence Engine", href: "/#command-center" },
      { name: "Security & Compliance", href: "/#institutional-trust" },
      { name: "Integrations", href: "/#command-center" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { name: "Enterprise Mobility", href: "/#home" },
      { name: "Strategic Briefing", href: "/request-briefing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Vision & News", href: "/#home" },
      { name: "System Status", href: "/#home" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About Traflinq", href: "/#home" },
      { name: "Careers", href: "/#home" },
      { name: "Contact Sales", href: "/support" },
      { name: "Schedule a Call", href: "https://calendar.app.google/qeHQgMANfWNr77yz6", external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#060810] border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Top row: Brand + columns */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

          {/* Brand */}
          <div className="lg:max-w-[280px] shrink-0">
            <Link href="/#home" className="inline-block -ml-4">
              <Image
                src="/traflinq_dark_no_tagline-Photoroom.png"
                alt="Traflinq"
                width={240}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-white/30 leading-relaxed">
              The Operating System for Corporate Mobility.
            </p>
            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/traflinq/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Traflinq on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61589084191213"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Traflinq on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-10">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs text-white/20 tracking-widest uppercase font-medium mb-4">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors leading-snug"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Traflinq. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/20 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy" className="text-xs text-white/20 hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
