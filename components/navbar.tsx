"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const CALENDAR_URL = "https://calendar.app.google/qeHQgMANfWNr77yz6"

const navItems = [
  { name: "Platform", href: "#command-center" },
  { name: "Solutions", href: "#command-center" },
  { name: "Security", href: "#institutional-trust" },
  { name: "About", href: "#about" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080b14]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="#home" className="-m-1.5 p-1.5 flex items-center">
            <Image
              src="/traflinq_dark_no_tagline-Photoroom.png"
              alt="Traflinq"
              width={220}
              height={56}
              className="h-14 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/70"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors tracking-wide"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link href="#briefing">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all text-xs tracking-wide"
            >
              Request a Briefing
            </Button>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5">
          <div className="space-y-1 px-6 pb-4 pt-3 bg-[#080b14]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/60 hover:text-white hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Link href="#briefing" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Request a Briefing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
