import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { RouteOptimizationSection } from "@/components/route-optimization-section"
import { GhostSeatSection } from "@/components/ghost-seat-section"
import { MobileIntegrationSection } from "@/components/mobile-integration-section"
import { FleetServicesSection } from "@/components/fleet-services-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b14]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <RouteOptimizationSection />
      <GhostSeatSection />
      <MobileIntegrationSection />
      <FleetServicesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
