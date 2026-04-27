import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const navigation = {
  solutions: [
    { name: "Route Optimization", href: "#route-optimization" },
    { name: "Ghost Seat Management", href: "#ghost-seat" },
    { name: "Vendor Integration", href: "#vendor-integration" },
    { name: "Fleet Services", href: "#fleet-services" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#home">
              <span className="text-2xl font-bold">
                traf<span className="text-primary">linq</span>
              </span>
            </Link>
            <p className="mt-4 text-background/70 max-w-xs">
              Smart mobility platform helping businesses cut commute costs through intelligent route planning and fleet management.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@traflinq.com</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="h-5 w-5 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold">Solutions</h3>
            <ul className="mt-4 space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10">
          <p className="text-sm text-background/50 text-center">
            © {new Date().getFullYear()} Traflinq. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
