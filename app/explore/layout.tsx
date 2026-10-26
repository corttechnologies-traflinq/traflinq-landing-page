import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore the Platform',
  description: 'Take a guided look at the Traflinq platform: shuttle and pool routing, live tracking, billing transparency and AI insights.',
  alternates: { canonical: '/explore' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
