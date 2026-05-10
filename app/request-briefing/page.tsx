import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BriefingFormSection } from "@/components/briefing-form-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Request a Strategic Briefing | Traflinq',
  description: 'Secure a focused session with our enterprise team to map your current transport spend against the Traflinq savings model.',
}

export default function RequestBriefingPage() {
  return (
    <main className="min-h-screen bg-[#080b14]">
      <Navbar />
      <div className="pt-20">
        <BriefingFormSection />
      </div>
      <Footer />
    </main>
  )
}
