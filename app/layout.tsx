import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LocaleProvider } from '@/components/locale-provider'
import { MotionProvider } from '@/components/motion-provider'
import { geist, notoSansArabic } from './fonts'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#080b14',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Traflinq — The Intelligence Layer for Managed Mobility',
  description: 'Traflinq is the architectural foundation for corporate transit. We provide the logic, oversight, and telemetry required to orchestrate workforce movement at an institutional scale.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${geist.variable} ${notoSansArabic.variable}`}>
      <body className="font-sans antialiased">
        <LocaleProvider>
          <MotionProvider>
            {children}
          </MotionProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
