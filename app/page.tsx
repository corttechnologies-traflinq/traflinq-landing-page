import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AnchorScrollHandler } from "@/components/anchor-scroll-handler"

// Below-the-fold sections: code-split for faster initial load
const SelfAuditSection = dynamic(() => import("@/components/self-audit-section").then(m => ({ default: m.SelfAuditSection })))
const ProblemSection = dynamic(() => import("@/components/problem-section").then(m => ({ default: m.ProblemSection })))
const RouteOptimizationSection = dynamic(() => import("@/components/route-optimization-section").then(m => ({ default: m.RouteOptimizationSection })))
const AboutSection = dynamic(() => import("@/components/about-section").then(m => ({ default: m.AboutSection })))
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
      <ProblemSection />
      <RouteOptimizationSection />
      <AboutSection />
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
