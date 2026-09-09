import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThankYou } from "@/components/thank-you"

export const metadata: Metadata = {
  title: "Thank You for Your Inquiry | Blitzeblank",
  description: "Your inquiry has been received by Blitzeblank. We'll get back to you shortly.",
  // Conversion page - do not index
  robots: { index: false, follow: false },
}

export default function DankeEnPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <ThankYou variant="accepted" />
      </main>
      <Footer />
    </div>
  )
}
