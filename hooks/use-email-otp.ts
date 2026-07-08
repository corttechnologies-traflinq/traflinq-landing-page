import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"

interface UseEmailOtpProps {
  email: string
  translationNamespace?: string
}

export function useEmailOtp({ email, translationNamespace = "briefing.otp" }: UseEmailOtpProps) {
  const t = useTranslations(translationNamespace)

  const [emailVerified, setEmailVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [otpCountdown, setOtpCountdown] = useState(0)

  // Timer for cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [otpCountdown])

  // Reset verification if email changes
  useEffect(() => {
    if (emailVerified) {
      setEmailVerified(false)
      setOtpSent(false)
      setOtpValue("")
    }
  }, [email])

  const sendOtp = useCallback(async () => {
    if (!email) {
      setOtpError(t("emailRequired"))
      return
    }

    // Basic email validation regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setOtpError(t("emailRequired"))
      return
    }

    const domain = email.split('@')[1]?.toLowerCase()
    const blockedDomains = [
      // Competitors / Restricted
      'yango.com', 'indrive.com', 'bykea.com', 'buscaro.com',
      'truckitin.com', 'oware.co', 'truckkr.com', 'truckker.pk',
      // Free personal email providers
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
      'icloud.com', 'aol.com', 'protonmail.com', 'mail.com', 
      'zoho.com', 'yandex.com'
    ]
    if (domain && (blockedDomains.includes(domain) || domain.includes('moveit'))) {
      setOtpError(t("domainNotAllowed") || "This email domain is not allowed.")
      return
    }

    setOtpLoading(true)
    setOtpError(null)

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ""
      const res = await fetch(`${apiBase}/support/email-otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 429) {
        setOtpError(t("rateLimited"))
        if (data.cooldown) setOtpCountdown(data.cooldown)
        return
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP")
      }

      setOtpSent(true)
      setOtpCountdown(data.cooldown || 45)
    } catch (err: any) {
      setOtpError(err.message || t("error"))
    } finally {
      setOtpLoading(false)
    }
  }, [email, t])

  const verifyOtp = useCallback(async () => {
    if (!otpValue || otpValue.length !== 6) return

    setOtpLoading(true)
    setOtpError(null)

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ""
      const res = await fetch(`${apiBase}/support/email-otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.code === "EXPIRED") {
          setOtpError(t("expired"))
          setOtpSent(false)
          setOtpValue("")
        } else {
          setOtpError(t("invalid"))
        }
        return
      }

      setEmailVerified(true)
      setOtpError(null)
    } catch (err: any) {
      setOtpError(err.message || t("error"))
    } finally {
      setOtpLoading(false)
    }
  }, [email, otpValue, t])

  return {
    emailVerified,
    otpSent,
    otpValue,
    setOtpValue,
    otpLoading,
    otpError,
    otpCountdown,
    sendOtp,
    verifyOtp,
    t,
  }
}
