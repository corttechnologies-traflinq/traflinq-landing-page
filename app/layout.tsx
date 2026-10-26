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

const SITE_URL = 'https://www.traflinq.com'
const SITE_TITLE = 'Traflinq — Employee Transport & Corporate Travel Management Platform'
const SITE_DESCRIPTION =
  'Traflinq is the managed mobility platform for enterprises: optimize employee shuttle routes, govern travel policy and reconcile vendor invoices in one place.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | Traflinq' },
  description: SITE_DESCRIPTION,
  applicationName: 'Traflinq',
  keywords: [
    'employee transport management',
    'corporate shuttle software',
    'managed mobility platform',
    'corporate travel management',
    'fleet vendor reconciliation',
    'workforce commute optimization',
  ],
  alternates: {
    canonical: '/',
    languages: { en: '/', ar: '/sa', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Traflinq',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Traflinq',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      description: SITE_DESCRIPTION,
      sameAs: [
        'https://www.linkedin.com/company/traflinq/',
        'https://www.facebook.com/profile.php?id=61589084191213',
      ],
      founder: [
        { '@type': 'Person', name: 'Aqeel Tarani', jobTitle: 'Chief Executive Officer', sameAs: 'https://www.linkedin.com/in/aqeeltarani/' },
        { '@type': 'Person', name: 'Hashir Ahmed Khan', jobTitle: 'Chief Technology Officer', sameAs: 'https://www.linkedin.com/in/hashirahmedkhan/' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Traflinq',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['en', 'ar'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Traflinq',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
