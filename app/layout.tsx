import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { HtmlLangSync } from '@/components/html-lang-sync'
import { AudienceProvider } from '@/components/audience-provider'
import { localBusinessJsonLd, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['600', '700', '800'],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: 'Reinigungsfirma Luxemburg, Trier & Bitburg | Blitzeblank',
  description: 'Professionelle Industrie-, Fenster-, Stein- und Fassadenreinigung in Luxemburg, Trier und Bitburg. Jetzt kostenlose Besichtigung anfragen.',
  keywords: ['Reinigungsfirma Luxemburg', 'Reinigungsfirma Trier', 'Reinigungsfirma Bitburg', 'Industriereinigung', 'Fensterreinigung', 'Steinreinigung', 'Fassadenreinigung', 'Gewerbereinigung'],
  authors: [{ name: 'Blitzeblank' }],
  metadataBase: new URL('https://blitzeblank.lu'),
  openGraph: {
    title: 'Reinigungsfirma Luxemburg, Trier & Bitburg | Blitzeblank',
    description: 'Professionelle Industrie-, Fenster-, Stein- und Fassadenreinigung in Luxemburg, Trier und Bitburg. Jetzt kostenlose Besichtigung anfragen.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'de_DE',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
  },
}

export const viewport: Viewport = {
  themeColor: '#4AADE4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <AudienceProvider>{children}</AudienceProvider>
        <HtmlLangSync />
        <CookieConsentBanner />
      </body>
    </html>
  )
}
