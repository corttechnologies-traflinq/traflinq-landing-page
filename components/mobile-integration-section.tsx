"use client"

import { Smartphone, Navigation, Map, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const features = [
  {
    icon: Map,
    title: "Live GPS tracking for all vehicles",
  },
  {
    icon: Navigation,
    title: "Driver app for seamless operations",
  },
  {
    icon: Clock,
    title: "Real-time ETA updates",
  },
]

export function MobileIntegrationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="mobile-integration" className="py-24 sm:py-32 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-2xl" />
            <div className="relative">
              {/* Phone Mockup Frame */}
              <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl shadow-primary/20">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[11px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[11px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[11px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-[284px] h-[584px] bg-white dark:bg-gray-800 relative">
                  <Image 
                    src="/mobile-integration.jpeg" 
                    alt="TrafLinq Mobile App Integration" 
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-32 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-1 z-10 hidden sm:flex"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Navigation className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">TrafLinq Driver</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Next Stop</p>
                <p className="text-sm font-bold text-primary">Tech Park - Gate 2</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5">
              <Smartphone className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mobile Integration</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Track Everything in Real-Time
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our platform supports both tracker API and mobile app integration for comprehensive fleet tracking. Drivers can use the app for navigation, while clients monitor everything from their dashboard.
            </p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 space-y-4"
            >
              {features.map((feature, idx) => (
                <motion.div variants={itemVariants} key={idx} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-md font-semibold text-foreground">{feature.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
