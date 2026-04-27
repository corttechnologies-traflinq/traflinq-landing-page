import { Route, Clock, Fuel, Brain } from "lucide-react"

const features = [
  {
    icon: Route,
    title: "Smart Algorithms",
    description: "AI-powered algorithms that find the fastest, most cost-effective routes for your team.",
  },
  {
    icon: Clock,
    title: "Real-Time Adjustments",
    description: "Adjust routes dynamically with real-time traffic data for optimal commute times.",
  },
  {
    icon: Fuel,
    title: "Fuel Efficiency",
    description: "Reduce fuel consumption by directing the smartest paths, saving money daily.",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "System uses AI to judge if employees can be added to existing routes or if new routes are better.",
  },
]

export function RouteOptimizationSection() {
  return (
    <section id="route-optimization" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5">
            <Route className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Route Optimization</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Smart Routes, Smarter Savings
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Optimize employee paths to cut wasted travel time and reduce fuel costs with our intelligent routing system.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Element */}
        <div className="mt-20 mx-auto max-w-4xl">
          <div className="relative rounded-3xl bg-foreground/5 p-8 lg:p-12">
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground">How It Works</h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                    <span className="text-muted-foreground">Add employee details with addresses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                    <span className="text-muted-foreground">AI analyzes optimal route combinations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                    <span className="text-muted-foreground">Review and approve route suggestions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
                    <span className="text-muted-foreground">Requests sent to vendors automatically</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    {/* Simulated map routes */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
                      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
                      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
                      {/* Route lines */}
                      <path d="M100 100 L160 60" stroke="#fe8503" strokeWidth="3" strokeLinecap="round" />
                      <path d="M100 100 L50 140" stroke="#fe8503" strokeWidth="3" strokeLinecap="round" />
                      <path d="M100 100 L150 150" stroke="#fe8503" strokeWidth="3" strokeLinecap="round" />
                      <path d="M100 100 L40 70" stroke="#fe8503" strokeWidth="3" strokeLinecap="round" />
                      {/* Points */}
                      <circle cx="100" cy="100" r="8" fill="#fe8503" />
                      <circle cx="160" cy="60" r="5" fill="#131313" />
                      <circle cx="50" cy="140" r="5" fill="#131313" />
                      <circle cx="150" cy="150" r="5" fill="#131313" />
                      <circle cx="40" cy="70" r="5" fill="#131313" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
