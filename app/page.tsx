import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { RouteOptimizationSection } from "@/components/route-optimization-section"
import { GhostSeatSection } from "@/components/ghost-seat-section"
import { VendorIntegrationSection } from "@/components/vendor-integration-section"
import { FleetServicesSection } from "@/components/fleet-services-section"
import { MobileIntegrationSection } from "@/components/mobile-integration-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <RouteOptimizationSection />
      <GhostSeatSection />
      <MobileIntegrationSection />
      <VendorIntegrationSection />
      <FleetServicesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
