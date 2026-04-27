import { Bus, Car, MapPin, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Bus,
    title: "Shuttle Service",
    description: "Efficient group rides with real-time tracking and route optimization tailored to your schedule.",
    features: ["Real-time GPS tracking", "Optimized pickup routes", "Capacity management", "Schedule flexibility"],
  },
  {
    icon: Car,
    title: "Chauffeur Service",
    description: "Professional drivers ensuring timely, comfortable, and secure rides for your team&apos;s daily commute.",
    features: ["Professional drivers", "Premium vehicles", "On-demand booking", "Executive transport"],
  },
]

const managementOptions = [
  {
    title: "Self-Managed Fleet",
    description: "Use your own vehicles and drivers with our tracking and optimization platform.",
  },
  {
    title: "Vendor-Managed Fleet",
    description: "Let verified vendors handle your shuttle and chauffeur needs while you focus on business.",
  },
  {
    title: "Hybrid Solution",
    description: "Combine your own pooled cars with vendor-managed vehicles for maximum flexibility.",
  },
]

export function FleetServicesSection() {
  return (
    <section id="fleet-services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5">
            <Bus className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Fleet Services</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Managed Fleet Solutions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Smart shuttle and chauffeur solutions designed to cut commute costs and improve employee comfort.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:shadow-xl transition-shadow"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-foreground">{service.title}</h3>
                  <p className="mt-3 text-muted-foreground">{service.description}</p>
                  
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management Options */}
        <div className="mx-auto mt-24 max-w-5xl">
          <h3 className="text-center text-2xl font-bold text-foreground mb-12">
            Flexible Fleet Management Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {managementOptions.map((option, index) => (
              <div
                key={option.title}
                className="p-6 bg-secondary/50 rounded-2xl text-center"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-foreground">{option.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Integration */}
        <div className="mx-auto mt-24 max-w-4xl">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Mobile Integration</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">Track Everything in Real-Time</h3>
                <p className="mt-4 text-muted-foreground">
                  Our platform supports both tracker API and mobile app integration for comprehensive fleet tracking. 
                  Drivers can use the app for navigation, while clients monitor everything from their dashboard.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Live GPS tracking for all vehicles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Driver app for seamless operations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Real-time ETA updates</span>
                  </li>
                </ul>
              </div>
              <div className="relative flex justify-center">
                <div className="relative w-48 h-96 bg-foreground rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden">
                    <div className="h-full flex flex-col">
                      <div className="bg-primary p-4 text-center">
                        <p className="text-sm font-semibold text-primary-foreground">Traflinq Driver</p>
                      </div>
                      <div className="flex-1 p-4 space-y-3">
                        <div className="h-24 bg-secondary rounded-lg flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-primary" />
                        </div>
                        <div className="p-3 bg-secondary rounded-lg">
                          <p className="text-xs text-muted-foreground">Next Stop</p>
                          <p className="text-sm font-medium text-foreground">Tech Park - Gate 2</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <p className="text-xs text-primary font-medium">ETA: 5 mins</p>
                        </div>
                      </div>
                    </div>
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
