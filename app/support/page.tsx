"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare, Phone, HelpCircle, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

    try {
      const response = await fetch(`${apiUrl}/support/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred. Please check if the server is running.")
    }
  }

  const faqs = [
    {
      question: "How does Traflinq optimize my commute?",
      answer: "Traflinq uses advanced AI algorithms to analyze real-time traffic data, historical patterns, and vehicle capacity to find the most efficient routes and schedules, reducing both time and cost."
    },
    {
      question: "Can I integrate Traflinq with my existing fleet?",
      answer: "Yes! Traflinq is designed with vendor integration in mind. Our platform can connect with most modern fleet management systems via our robust API."
    },
    {
      question: "What is Ghost Seat Management?",
      answer: "Ghost Seat Management identifies and fills empty seats in existing commuter routes, maximizing vehicle utilization and significantly lowering the cost per passenger."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security protocols to ensure that all your fleet and passenger data remains private and protected."
    }
  ]

  return (
    <div className="min-h-screen bg-[#131313] text-white p-6 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Info & Form */}
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we <span className="text-primary">help you?</span></h1>
              <p className="text-gray-400 text-lg">
                Have questions about Traflinq? Our team is here to support your journey towards smarter mobility.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-colors w-full max-w-sm text-center">
                <Mail className="text-primary mx-auto mb-4" size={24} />
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-sm text-gray-500">support@traflinq.com</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Name</label>
                        <Input name="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email</label>
                        <Input name="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Subject</label>
                      <Input name="subject" placeholder="General Inquiry" className="bg-white/5 border-white/10 text-white" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Message</label>
                      <Textarea name="message" placeholder="Tell us how we can help..." className="bg-white/5 border-white/10 text-white min-h-[120px]" required />
                    </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-bold gap-2">
                    <Send size={18} /> Send Message
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-2xl font-bold">Message Sent!</h2>
                  <p className="text-gray-400">Thank you for reaching out. Our support team will get back to you within 24 hours.</p>
                  <Button variant="ghost" onClick={() => setSubmitted(false)} className="text-primary hover:text-primary/80 hover:bg-primary/5">
                    Send another message
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: FAQs */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-primary" size={28} />
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-2xl bg-white/5 px-6 overflow-hidden">
                  <AccordionTrigger className="text-left py-6 hover:text-primary transition-colors text-lg font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl mt-12">
              <h3 className="text-xl font-bold mb-2">Still need help?</h3>
              <p className="text-gray-400 mb-6">Our enterprise support team is available for custom integrations and large fleet management.</p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-xl">
                Schedule a call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
