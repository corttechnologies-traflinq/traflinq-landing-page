"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { useLocale } from "@/lib/locale-context"
import { usePathname } from "next/navigation"

export function Navbar() {
  const t = useTranslations("landing.nav")
  const tCommon = useTranslations("common")
  const { locale, setLocale } = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isSaudiRoute = pathname === "/sa" || pathname.startsWith("/sa/")
  const basePath = isSaudiRoute ? "/sa" : ""

  const navItems = [
    { id: "platform", name: t("platform"), href: `${basePath}/#command-center` },
    { id: "solutions", name: t("solutions"), href: `${basePath}/#command-center` },
    { id: "security", name: t("security"), href: `${basePath}/#institutional-trust` },
    { id: "about", name: t("about"), href: `${basePath}/#about` },
    { id: "briefing", name: t("briefing"), href: `${basePath}/request-briefing` },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "bg-[#080b14]/95 backdrop-blur-md border-white/10 py-3" : "bg-transparent border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href={`${basePath}/#home`} className="-m-1.5 p-1.5 flex items-center">
            <Image
              src="/traflinq_dark_no_tagline-Photoroom.png"
              alt={tCommon("misc.brandAlt")}
              width={180}
              height={46}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full w-10 h-10 text-white/70 bg-white/5 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{tCommon("misc.toggleMenu")}</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors tracking-wide"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {isSaudiRoute && (
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="rounded-md px-2 py-1.5 text-xs font-bold text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              title={locale === "en" ? tCommon("locale.switchToArabic") : tCommon("locale.switchToEnglish")}
            >
              <span className={locale === "en" ? "text-white" : "text-white/40"}>{tCommon("locale.english")}</span>
              <span className="mx-1.5 text-white/20">|</span>
              <span className={locale === "ar" ? "text-white" : "text-white/40"}>{tCommon("locale.arabic")}</span>
            </button>
          )}
          <Link href="https://calendar.app.google/qeHQgMANfWNr77yz6" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all text-sm font-semibold tracking-wide h-11 px-8"
            >
              {tCommon("actions.bookDemo")}
            </Button>
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#080b14] border-t border-white/5"
          >
            <div className="space-y-1 px-6 pb-8 pt-4">
              {isSaudiRoute && (
                <div className="pb-4 border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                    className="rounded-md px-2 py-1.5 text-sm font-bold text-white/50 hover:text-white transition-colors"
                  >
                    <span className={locale === "en" ? "text-white" : "text-white/40"}>{tCommon("locale.english")}</span>
                    <span className="mx-1.5 text-white/20">|</span>
                    <span className={locale === "ar" ? "text-white" : "text-white/40"}>{tCommon("locale.arabic")}</span>
                  </button>
                </div>
              )}
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg py-3 text-lg font-medium text-white/60 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                className="pt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="https://calendar.app.google/qeHQgMANfWNr77yz6" target="_blank" rel="noopener noreferrer" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-base font-bold">
                    {tCommon("actions.bookDemo")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
