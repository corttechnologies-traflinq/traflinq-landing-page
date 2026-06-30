"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, HelpCircle, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const FAQ_KEYS = ["optimize", "integrate", "ghostSeat", "security"] as const

export default function SupportPage() {
  const t = useTranslations("support")
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
        alert(errorData.message || t("errors.submitFailed"))
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(t("errors.serverError"))
    }
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />
      <div className="relative overflow-hidden px-6 pt-32 pb-16 md:py-32 lg:py-36">
      <div className="absolute top-0 end-0 w-[50%] h-[50%] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary/60 text-xs tracking-widest uppercase font-medium mb-6">
                <Mail size={12} />
                <span>{t("badge")}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {t.rich("title", {
                  highlight: (chunks) => <span className="text-primary">{chunks}</span>,
                })}
              </h1>
              <p className="text-white/45 text-lg">
                {t("description")}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl hover:border-primary/30 transition-colors w-full max-w-sm text-center">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold mb-1 text-white">{t("emailUs")}</h3>
                <p className="text-sm text-white/30 ltr-content" dir="ltr">support@traflinq.com</p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] p-8 rounded-3xl backdrop-blur-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/45">{t("form.name")}</label>
                        <Input name="name" placeholder={t("form.namePlaceholder")} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 focus:border-primary/50" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/45">{t("form.email")}</label>
                        <Input name="email" type="email" placeholder={t("form.emailPlaceholder")} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 focus:border-primary/50 ltr-content" dir="ltr" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/45">{t("form.subject")}</label>
                      <Input name="subject" placeholder={t("form.subjectPlaceholder")} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 focus:border-primary/50" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/45">{t("form.message")}</label>
                      <Textarea name="message" placeholder={t("form.messagePlaceholder")} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 focus:border-primary/50 min-h-[120px]" required />
                    </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-bold gap-2">
                    <Send size={18} className="rtl:rotate-180" /> {t("form.send")}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-2xl font-bold">{t("success.title")}</h2>
                  <p className="text-white/45">{t("success.message")}</p>
                  <Button variant="ghost" onClick={() => setSubmitted(false)} className="text-primary hover:text-primary/80 hover:bg-primary/5">
                    {t("success.sendAnother")}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-primary" size={28} />
              <h2 className="text-3xl font-bold">{t("faqTitle")}</h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQ_KEYS.map((key, index) => (
                <AccordionItem key={key} value={`item-${index}`} className="border border-white/[0.06] rounded-2xl bg-white/[0.02] px-6 overflow-hidden">
                  <AccordionTrigger className="text-start py-6 hover:text-primary transition-colors text-base font-medium hover:no-underline text-white">
                    {t(`faqs.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/45 pb-6 leading-relaxed">
                    {t(`faqs.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="bg-primary/[0.04] border border-primary/20 p-8 rounded-3xl mt-12">
              <h3 className="text-xl font-bold mb-2 text-white">{t("stillNeedHelp.title")}</h3>
              <p className="text-white/45 mb-6">{t("stillNeedHelp.description")}</p>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white rounded-xl" asChild>
                <a href="https://calendar.app.google/qeHQgMANfWNr77yz6" target="_blank" rel="noopener noreferrer">
                  {t("stillNeedHelp.scheduleCall")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
