import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform Demo',
  description: 'Interactive Traflinq demo.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
