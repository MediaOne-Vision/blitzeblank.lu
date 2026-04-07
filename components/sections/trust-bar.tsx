import { Clock, Calendar, Eye, Wrench, MessageSquare, CheckCircle } from "lucide-react"

const trustItems = [
  {
    icon: Clock,
    title: "Schnelle Reaktionszeit",
    description: "Innerhalb von 24h",
  },
  {
    icon: Calendar,
    title: "Kurzfristige Termine",
    description: "Flexibel planbar",
  },
  {
    icon: Eye,
    title: "Kostenlose Besichtigung",
    description: "Unverbindlich vor Ort",
  },
  {
    icon: Wrench,
    title: "Probearbeit möglich",
    description: "Qualität testen",
  },
  {
    icon: MessageSquare,
    title: "Transparente Kommunikation",
    description: "Klare Absprachen",
  },
  {
    icon: CheckCircle,
    title: "Zuverlässige Ausführung",
    description: "Garantierte Qualität",
  },
]

export function TrustBar() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
