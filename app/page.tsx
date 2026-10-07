import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AnchorScrollHandler } from "@/components/anchor-scroll-handler"

// Below-the-fold sections: code-split for faster initial load
const SelfAuditSection = dynamic(() => import("@/components/self-audit-section").then(m => ({ default: m.SelfAuditSection })))
const OperationsSwitcherSection = dynamic(() => import("@/components/operations-switcher-section").then(m => ({ default: m.OperationsSwitcherSection })))
const PillarsSection = dynamic(() => import("@/components/pillars-section").then(m => ({ default: m.PillarsSection })))
const TravelSection = dynamic(() => import("@/components/travel-section").then(m => ({ default: m.TravelSection })))
const TeamSection = dynamic(() => import("@/components/team-section").then(m => ({ default: m.TeamSection })))
const OperationalSuccessReports = dynamic(() => import("@/components/operational-success-reports").then(m => ({ default: m.OperationalSuccessReports })))
const PlatformSection = dynamic(() => import("@/components/platform-section").then(m => ({ default: m.PlatformSection })))
const ClienteleSection = dynamic(() => import("@/components/clientele-section").then(m => ({ default: m.ClienteleSection })))
const CTASection = dynamic(() => import("@/components/cta-section").then(m => ({ default: m.CTASection })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b14]">
      <AnchorScrollHandler />
      <Navbar />
      <HeroSection />
      <OperationsSwitcherSection />
      <PillarsSection />
      <TravelSection />
      <SelfAuditSection />
      <TeamSection />
      <OperationalSuccessReports />
      {/* <ClienteleSection /> */}
      {/* <PlatformSection /> */}
      <CTASection />
      <Footer />
    </main>
  )
}
