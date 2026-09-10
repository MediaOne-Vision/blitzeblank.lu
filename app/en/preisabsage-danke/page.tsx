import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThankYou } from "@/components/thank-you"

export const metadata: Metadata = {
  title: "Thank You for Your Inquiry | Blitzeblank",
  description: "Your inquiry has been received by Blitzeblank. Give us a call - we'll find a solution.",
  // Conversion page - do not index
  robots: { index: false, follow: false },
}

export default function DankePreisabsageEnPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <ThankYou variant="declined" />
      </main>
      <Footer />
    </div>
  )
}
