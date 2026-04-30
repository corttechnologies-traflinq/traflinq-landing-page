"use client"

import { Ghost, Eye, BarChart3, Zap } from "lucide-react"
import { motion } from "framer-motion"

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
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="ghost-seat" className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
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

            <motion.div 
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 space-y-6"
            >
              {features.map((feature) => (
                <motion.div variants={itemVariants} key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-8 shadow-2xl shadow-primary/5">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-foreground">Seat Occupancy Dashboard</h4>
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs text-primary font-semibold flex items-center gap-1"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" /> Live
                </motion.span>
              </div>
              
              {/* Shuttle visualization */}
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 border border-secondary/50 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Shuttle A - Route 1</span>
                    <span className="text-sm text-primary font-semibold">85% Full</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((seat, i) => (
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.05, type: "spring" }}
                        viewport={{ once: true }}
                        key={seat}
                        className={`h-6 w-6 rounded ${seat <= 10 ? 'bg-primary shadow-sm shadow-primary/20' : 'bg-border/50'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-secondary/30 border border-secondary/50 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Shuttle B - Route 2</span>
                    <span className="text-sm text-primary font-semibold">100% Full</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((seat, i) => (
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: (i * 0.05) + 0.3, type: "spring" }}
                        viewport={{ once: true }}
                        key={seat}
                        className="h-6 w-6 rounded bg-primary shadow-sm shadow-primary/20"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-secondary/30 border border-secondary/50 rounded-xl hover:bg-secondary/50 transition-colors relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
                  />
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-sm font-medium text-foreground">Shuttle C - Route 3</span>
                    <span className="text-sm text-muted-foreground font-semibold">50% Full</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap relative z-10">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((seat, i) => (
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: (i * 0.05) + 0.6, type: "spring" }}
                        viewport={{ once: true }}
                        key={seat}
                        className={`h-6 w-6 rounded ${seat <= 6 ? 'bg-primary shadow-sm shadow-primary/20' : 'bg-border/50'}`}
                      />
                    ))}
                  </div>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    viewport={{ once: true }}
                    className="mt-3 text-xs text-primary font-medium flex items-center gap-1 relative z-10"
                  >
                    <Zap className="h-3 w-3" /> Optimization suggested: Merge with Route 1
                  </motion.p>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "36", label: "Total Seats", color: "text-foreground" },
                    { value: "28", label: "Occupied", color: "text-primary" },
                    { value: "78%", label: "Efficiency", color: "text-foreground" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + (i * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
