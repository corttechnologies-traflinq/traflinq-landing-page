import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter } from "lucide-react"

const navLinks = [
  { name: "Platform", href: "#command-center" },
  { name: "Solutions", href: "#predictive-logic" },
  { name: "Security", href: "#institutional-trust" },
  { name: "About", href: "#home" },
]

export function Footer() {
  return (
    <footer className="bg-[#060810] border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Brand */}
          <div className="md:max-w-xs">
            <Link href="#home" className="inline-block">
              <Image
                src="/traflinq_dark_no_tagline-Photoroom.png"
                alt="Traflinq"
                width={200}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-white/30 leading-relaxed">
              The Mobility OS.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div>
              <p className="text-xs text-white/20 tracking-widest uppercase font-medium mb-4">Platform</p>
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-white/20 tracking-widest uppercase font-medium mb-4">Connect</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/support" className="text-sm text-white/40 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                    <Twitter className="h-3.5 w-3.5" />
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
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
            <Link href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
