"use client"

import { useEffect } from "react"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const

export function AnchorScrollHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmData: Record<string, string> = {}

    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value) utmData[key] = value
    }

    if (Object.keys(utmData).length > 0) {
      try {
        sessionStorage.setItem("traflinq_utm", JSON.stringify(utmData))
      } catch {
        // Safari private mode can throw on sessionStorage
      }
    }

    if (window.location.hash !== "#self-audit") return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scrollToSection = () => {
      const section = document.getElementById("self-audit")
      if (!section) return false
      section.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      })
      return true
    }

    if (scrollToSection()) return

    let attempts = 0
    const timer = window.setInterval(() => {
      attempts += 1
      if (scrollToSection() || attempts >= 20) {
        window.clearInterval(timer)
      }
    }, 50)

    return () => window.clearInterval(timer)
  }, [])

  return null
}
