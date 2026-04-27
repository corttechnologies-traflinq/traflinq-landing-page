import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  "40% average cost reduction",
  "Real-time fleet tracking",
  "Dedicated account manager",
  "24/7 support",
]

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Ready to Cut Your Commute Costs?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join 500+ companies already saving with Traflinq&apos;s smart mobility solutions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="gap-2 px-8 bg-background text-foreground hover:bg-background/90">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
