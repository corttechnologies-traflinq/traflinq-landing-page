import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingDown, Users, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-muted-foreground ring-1 ring-border/50 hover:ring-border/80 transition-all">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Smart Mobility Platform
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Cut Commute Costs{" "}
            <span className="text-primary">Smartly</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Tailored route plans and fleet management that save your business money daily. 
            Optimize routes, eliminate ghost seats, and streamline vendor operations.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8">
              Book a Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground">40%</span>
              <span className="text-sm text-muted-foreground">Cost Reduction</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground">500+</span>
              <span className="text-sm text-muted-foreground">Happy Clients</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground">Cities Covered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
