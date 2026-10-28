import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactThankYou } from "@/components/contact-thank-you"

export const metadata: Metadata = {
  title: "Merci pour votre message | Blitzeblank",
  description: "Votre message a bien été reçu par Blitzeblank. Nous vous répondrons sous 24 heures.",
  robots: { index: false, follow: false },
}

export default function KontaktDankeFrPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <ContactThankYou locale="fr" />
      </main>
      <Footer />
    </div>
  )
}
