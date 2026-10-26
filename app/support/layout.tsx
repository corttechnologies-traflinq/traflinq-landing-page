import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Sales & Support',
  description: 'Talk to the Traflinq team about employee transport, corporate travel and fleet reconciliation for your enterprise.',
  alternates: { canonical: '/support' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
