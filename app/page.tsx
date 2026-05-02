import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"

// Below-the-fold sections: code-split for faster initial load
const ProblemSection = dynamic(() => import("@/components/problem-section").then(m => ({ default: m.ProblemSection })))
const RouteOptimizationSection = dynamic(() => import("@/components/route-optimization-section").then(m => ({ default: m.RouteOptimizationSection })))
const AboutSection = dynamic(() => import("@/components/about-section").then(m => ({ default: m.AboutSection })))
const OperationalSuccessReports = dynamic(() => import("@/components/operational-success-reports").then(m => ({ default: m.OperationalSuccessReports })))
const CTASection = dynamic(() => import("@/components/cta-section").then(m => ({ default: m.CTASection })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b14]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <RouteOptimizationSection />
      <AboutSection />
      <OperationalSuccessReports />
      <CTASection />
      <Footer />
    </main>
  )
}
