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
      sessionStorage.setItem("traflinq_utm", JSON.stringify(utmData))
    }

    if (window.location.hash !== "#self-audit") return

    const scrollToSection = () => {
      const section = document.getElementById("self-audit")
      if (!section) return
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const timeoutId = window.setTimeout(scrollToSection, 100)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return null
}
