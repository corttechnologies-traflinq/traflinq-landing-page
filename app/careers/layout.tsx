import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Traflinq and help build the intelligence layer for managed mobility.',
  alternates: { canonical: '/careers' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
