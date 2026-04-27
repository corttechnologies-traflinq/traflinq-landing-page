import { Link2, Building2, Settings, Shield } from "lucide-react"

const integrations = [
  {
    icon: Link2,
    title: "Route Sync",
    description: "Integrate vendor routes directly into your system to optimize employee travel paths seamlessly.",
  },
  {
    icon: Building2,
    title: "Fleet Control",
    description: "Manage vendor fleets like shuttles and chauffeurs in one place for smoother operations.",
  },
  {
    icon: Settings,
    title: "Vendor Dashboard",
    description: "Vendors get their own dashboard to track vehicles, drivers, assignments, and analytics.",
  },
  {
    icon: Shield,
    title: "Secure Integration",
    description: "Enterprise-grade security with role-based access for clients and vendors alike.",
  },
]

export function VendorIntegrationSection() {
  return (
    <section id="vendor-integration" className="py-24 sm:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/20 px-4 py-1.5">
            <Link2 className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Vendor Integration</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Seamless Vendor Connectivity
          </h2>
          <p className="mt-4 text-lg text-background/70">
            Connect effortlessly with multiple vendors to unify your mobility services and streamline employee commutes.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((item) => (
              <div
                key={item.title}
                className="relative group p-8 bg-background/5 backdrop-blur rounded-2xl border border-background/10 hover:border-primary/50 transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-background/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Flow */}
        <div className="mt-20 mx-auto max-w-4xl">
          <div className="relative">
            <h3 className="text-center text-xl font-semibold mb-12">Multi-Vendor Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Company Side */}
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 mb-4">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <p className="font-semibold">Your Company</p>
                <p className="text-sm text-background/60 mt-1">Client Dashboard</p>
              </div>

              {/* Connection */}
              <div className="text-center">
                <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-full mb-4 hidden md:block" />
                <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
                  Traflinq Platform
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-full mt-4 hidden md:block" />
              </div>

              {/* Vendor Side */}
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 mb-4">
                  <Settings className="h-10 w-10 text-primary" />
                </div>
                <p className="font-semibold">Multiple Vendors</p>
                <p className="text-sm text-background/60 mt-1">Vendor Dashboards</p>
              </div>
            </div>

            {/* Features list */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Real-time Tracking", "Fleet Assignment", "Pricing Management", "Analytics"].map((feature) => (
                <div key={feature} className="text-center p-4 rounded-xl bg-background/5">
                  <p className="text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
