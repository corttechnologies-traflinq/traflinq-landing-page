"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Facebook } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export function Footer() {
  const t = useTranslations("landing.footer")
  const tCommon = useTranslations("common")
  const pathname = usePathname()
  const isSaudiRoute = pathname === "/sa" || pathname.startsWith("/sa/")
  const basePath = isSaudiRoute ? "/sa" : ""

  const footerColumns = [
    {
      heading: t("columns.platform.heading"),
      links: [
        { name: t("columns.platform.overview"), href: `${basePath}/#home` },
        { name: t("columns.platform.intelligenceEngine"), href: `${basePath}/#command-center` },
        { name: t("columns.platform.securityCompliance"), href: `${basePath}/#institutional-trust` },
        { name: t("columns.platform.integrations"), href: `${basePath}/#command-center` },
      ],
    },
    {
      heading: t("columns.solutions.heading"),
      links: [
        { name: t("columns.solutions.enterpriseMobility"), href: `${basePath}/#home` },
        { name: t("columns.solutions.selfAudit"), href: `${basePath}/#self-audit` },
        { name: t("columns.solutions.strategicBriefing"), href: `${basePath}/request-briefing` },
      ],
    },
    {
      heading: t("columns.resources.heading"),
      links: [
        { name: t("columns.resources.visionNews"), href: `${basePath}/#home` },
        { name: t("columns.resources.systemStatus"), href: `${basePath}/#home` },
      ],
    },
    {
      heading: t("columns.company.heading"),
      links: [
        { name: t("columns.company.about"), href: `${basePath}/#home` },
        { name: t("columns.company.careers"), href: `${basePath}/#home` },
        { name: t("columns.company.contactSales"), href: `${basePath}/support` },
        { name: t("columns.company.scheduleCall"), href: "https://calendar.app.google/qeHQgMANfWNr77yz6", external: true },
      ],
    },
  ]

  return (
    <footer className="bg-[#060810] border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

          <div className="lg:max-w-[280px] shrink-0">
            <Link href={`${basePath}/#home`} className="inline-block -ms-4">
              <Image
                src="/traflinq_dark_no_tagline-Photoroom.png"
                alt={tCommon("misc.brandAlt")}
                width={240}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-white/30 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/traflinq/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/20 transition-colors"
                aria-label={t("social.linkedin")}
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61589084191213"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/20 transition-colors"
                aria-label={t("social.facebook")}
              >
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>

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

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`${basePath}/privacy`} className="text-xs text-white/20 hover:text-white/50 transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href={`${basePath}/privacy`} className="text-xs text-white/20 hover:text-white/50 transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
