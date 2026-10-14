import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactThankYou } from "@/components/contact-thank-you"

export const metadata: Metadata = {
  title: "Thank You for Your Message | Blitzeblank",
  description: "Your message has been received by Blitzeblank. We will get back to you within 24 hours.",
  robots: { index: false, follow: false },
}

export default function KontaktDankeEnPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <ContactThankYou locale="en" />
      </main>
      <Footer />
    </div>
  )
}
