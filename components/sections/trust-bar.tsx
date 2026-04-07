const trustItems = [
  { title: "24h Reaktionszeit" },
  { title: "Kostenlose Besichtigung" },
  { title: "Probearbeit möglich" },
  { title: "Transparente Preise" },
  { title: "Qualitätsgarantie" },
]

export function TrustBar() {
  return (
    <section className="py-12 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-16">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
