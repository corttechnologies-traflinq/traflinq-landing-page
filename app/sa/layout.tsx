import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'ترافلينك — منصة إدارة نقل الموظفين والسفر المؤسسي' },
  description: 'ترافلينك هي منصة التنقل المُدار للمؤسسات: حسّن مسارات نقل الموظفين، وطبّق سياسات السفر، وسوِّ فواتير الموردين في مكان واحد.',
  alternates: {
    canonical: '/sa',
    languages: { en: '/', ar: '/sa', 'x-default': '/' },
  },
  openGraph: { url: '/sa', locale: 'ar_SA', alternateLocale: ['en_US'] },
}

export default function SaLayout({ children }: { children: React.ReactNode }) {
  return children
}
