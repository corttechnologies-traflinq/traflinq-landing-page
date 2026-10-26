import type { MetadataRoute } from 'next'

const BASE = 'https://www.traflinq.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/explore', '/request-briefing', '/support', '/careers', '/privacy', '/sa'].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }))
}
