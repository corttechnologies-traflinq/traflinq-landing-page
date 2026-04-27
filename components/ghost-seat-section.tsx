import { Ghost, Eye, BarChart3, Zap } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Real-Time Tracking",
    description: "Monitor seat occupancy live to avoid paying for empty rides across your entire fleet.",
  },
  {
    icon: BarChart3,
    title: "Smart Allocation",
    description: "Automatically adjust vehicle assignments based on actual demand patterns.",
  },
  {
    icon: Zap,
    title: "Instant Optimization",
    description: "Reduce unused seats instantly with our intelligent seat management system.",
  },
]

export function GhostSeatSection() {
  return (
    <section id="ghost-seat" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5">
              <Ghost className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Ghost Seat Management</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Eliminate Empty Seats, Maximize Savings
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Efficiently track and reduce unused seats to save money on fleet expenses. 
              Our ghost seat management ensures you never pay for empty rides.
            </p>

            <div className="mt-10 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-card rounded-2xl border border-border p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-foreground">Seat Occupancy Dashboard</h4>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
              
              {/* Shuttle visualization */}
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Shuttle A - Route 1</span>
                    <span className="text-sm text-primary font-semibold">85% Full</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((seat) => (
                      <div 
                        key={seat}
                        className={`h-6 w-6 rounded ${seat <= 10 ? 'bg-primary' : 'bg-border'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Shuttle B - Route 2</span>
                    <span className="text-sm text-primary font-semibold">100% Full</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((seat) => (
                      <div 
                        key={seat}
                        className="h-6 w-6 rounded bg-primary"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Shuttle C - Route 3</span>
                    <span className="text-sm text-muted-foreground font-semibold">50% Full</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((seat) => (
                      <div 
                        key={seat}
                        className={`h-6 w-6 rounded ${seat <= 6 ? 'bg-primary' : 'bg-border'}`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-primary font-medium">⚡ Optimization suggested: Merge with Route 1</p>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">36</p>
                    <p className="text-xs text-muted-foreground">Total Seats</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">28</p>
                    <p className="text-xs text-muted-foreground">Occupied</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">78%</p>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
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
