import type { MetadataRoute } from 'next'

const BASE = 'https://www.traflinq.com'

const pages: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/request-briefing', priority: 0.9 },
  { path: '/explore', priority: 0.8 },
  { path: '/support', priority: 0.7 },
  { path: '/careers', priority: 0.5 },
  { path: '/privacy', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    priority,
    alternates: { languages: { en: `${BASE}${path}`, ar: `${BASE}/sa${path}` } },
  }))
}
