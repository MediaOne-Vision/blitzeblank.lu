import { Check } from "lucide-react"

const trustItems = [
  "24h Reaktionszeit",
  "Kostenlose Besichtigung",
  "Probearbeit moglich",
  "Transparente Preise",
  "Qualitatsgarantie",
]

export function TrustBar() {
  return (
    <section className="py-6 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
