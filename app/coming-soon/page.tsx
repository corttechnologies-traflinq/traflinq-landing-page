"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Bell, Mail, Twitter, Linkedin, Github, Armchair, Handshake, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#131313] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fe8503 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="z-10 max-w-4xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/traflinq_light_no_tagline-Photoroom.png"
            alt="TrafLinq Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Launching Soon
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#131313]">
            Stop Overpaying for <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Commute.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traflinq's AI-driven route optimization is engineered to <span className="text-primary font-semibold">cut your commute costs by up to 40%</span>. We're putting money back in your pocket.
          </p>
        </div>

        {/* Unique Savings Visualization */}
        <div className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-xl shadow-primary/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ArrowRight className="rotate-[-45deg] text-primary" size={48} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Projected Savings</div>
              <div className="text-5xl font-bold text-[#131313] flex items-baseline gap-2">
                40% <span className="text-primary text-lg font-normal">Less Cost</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary/80">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-[10px] text-primary font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                Optimized Routes Active
              </div>
            </div>
            <div className="h-24 flex items-end gap-2 px-4">
              {[40, 65, 45, 90, 55, 75, 45].map((h, i) => (
                <div
                  key={i}
                  className="w-3 bg-primary/10 rounded-t-full transition-all duration-500 group-hover:bg-primary group-hover:animate-pulse"
                  style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-12 pb-12">
          <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Twitter size={24} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Github size={24} />
          </Link>
        </div>
      </div>

      {/* Footer Links - Moved inside the flow or with safe spacing */}
      <div className="mt-auto py-8 flex items-center gap-8 text-xs text-gray-400 z-10">
        <Link href="/support" className="hover:text-primary transition-colors underline underline-offset-4">Support</Link>
        <Link href="/privacy" className="hover:text-primary transition-colors underline underline-offset-4">Privacy Policy</Link>
      </div>
    </div>
  )
}
