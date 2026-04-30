"use client"

import { Route, Clock, Fuel, Brain } from "lucide-react"
import { motion } from "framer-motion"

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  }

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  }

  return (
    <section id="route-optimization" className="py-24 sm:py-32 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
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
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-xl shadow-sm bg-white/60 backdrop-blur-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 mx-auto max-w-4xl"
        >
          <div className="relative rounded-3xl bg-white border border-gray-100 shadow-2xl shadow-primary/5 p-8 lg:p-12 overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" 
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">How It Works</h3>
                <ul className="space-y-4">
                  {[
                    "Add employee details with addresses",
                    "AI analyzes optimal route combinations",
                    "Review and approve route suggestions",
                    "Requests sent to vendors automatically"
                  ].map((step, idx) => (
                    <motion.li key={idx} variants={listVariants} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{idx + 1}</span>
                      <span className="text-muted-foreground">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    {/* Simulated map routes */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <motion.circle 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        cx="100" cy="100" r="80" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" 
                      />
                      <motion.circle 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        cx="100" cy="100" r="50" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" 
                      />
                      {/* Route lines */}
                      {[
                        { d: "M100 100 L160 60", delay: 1 },
                        { d: "M100 100 L50 140", delay: 1.5 },
                        { d: "M100 100 L150 150", delay: 2 },
                        { d: "M100 100 L40 70", delay: 2.5 }
                      ].map((path, idx) => (
                        <motion.path 
                          key={idx}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: path.delay, ease: "easeInOut" }}
                          d={path.d} stroke="#fe8503" strokeWidth="3" strokeLinecap="round" 
                        />
                      ))}
                      {/* Points */}
                      <motion.circle 
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                        cx="100" cy="100" r="8" fill="#fe8503" 
                      />
                      {[
                        { cx: "160", cy: "60", delay: 2.5 },
                        { cx: "50", cy: "140", delay: 3 },
                        { cx: "150", cy: "150", delay: 3.5 },
                        { cx: "40", cy: "70", delay: 4 }
                      ].map((point, idx) => (
                        <motion.circle 
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }} 
                          whileInView={{ scale: 1, opacity: 1 }} 
                          transition={{ delay: point.delay - 1.5, type: "spring" }}
                          cx={point.cx} cy={point.cy} r="6" fill="#131313" 
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
