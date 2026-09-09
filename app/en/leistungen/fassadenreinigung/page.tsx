import { Metadata } from "next"
import { Building2 } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Facade Cleaning | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Professional facade cleaning in Luxembourg. Exterior cleaning for building facades of all kinds - from office buildings to industrial sites.",
}

const features = [
  {
    title: "Plaster Facades",
    description: "Gentle cleaning of plastered facades without damaging the surface.",
  },
  {
    title: "Brick Facades",
    description: "Thorough cleaning of brick and clinker with removal of efflorescence.",
  },
  {
    title: "Metal Facades",
    description: "Professional care for metal facades and cladding.",
  },
  {
    title: "Glass Facades",
    description: "Streak-free cleaning of large glass facades, even at great heights.",
  },
  {
    title: "Concrete Facades",
    description: "Removal of dirt, graffiti and discoloration from concrete surfaces.",
  },
  {
    title: "Graffiti Removal",
    description: "Professional and gentle removal of unwanted graffiti.",
  },
]

const benefits = [
  "Enhances your building's appearance",
  "Preserves the value of your property",
  "Different techniques for every facade material",
  "Work at height by trained personnel",
  "Environmentally friendly cleaning agents",
  "Optional facade protection against renewed soiling",
]

const process = [
  { step: "Inspection", description: "Analysis of the facade type and degree of soiling" },
  { step: "Test Area", description: "Trial cleaning to determine the method" },
  { step: "Planning", description: "Detailed quote with schedule" },
  { step: "Cleaning", description: "Professional facade cleaning" },
  { step: "Protection", description: "Optional: sealing and anti-graffiti coating" },
]

export default function FassadenreinigungEnPage() {
  return (
    <ServicePageTemplate
      slug="fassadenreinigung"
      title="Facade Cleaning"
      subtitle="We gently and material-appropriately remove algae, dirt and discoloration - for a radiant facade that stays beautiful for longer."
      description="The facade is the face of your building. Over time, environmental factors, exhaust fumes and organic deposits leave their mark. Our professional facade cleaning gently and effectively removes even stubborn dirt. We work with a range of techniques, optimally matched to your facade material."
      icon={Building2}
      image="modern+building+facade+exterior+cleaning+architecture"
      features={features}
      benefits={benefits}
      process={process}
      locale="en"
    />
  )
}
