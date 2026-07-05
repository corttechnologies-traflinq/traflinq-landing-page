import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExploreGate } from "@/components/explore-gate"

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#080b14]">
      <Navbar />
      <div className="pt-20">
        <ExploreGate />
      </div>
      <Footer />
    </main>
  )
}

