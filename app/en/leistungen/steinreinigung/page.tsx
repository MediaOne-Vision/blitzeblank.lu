import { Metadata } from "next"
import { Mountain } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Stone Cleaning | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Professional stone cleaning in Luxembourg. Expert care and cleaning of natural stone, paving, terraces and outdoor areas.",
}

const features = [
  {
    title: "Natural Stone Cleaning",
    description: "Gentle cleaning of marble, granite, sandstone and other natural stones.",
  },
  {
    title: "Paving Cleaning",
    description: "Thorough cleaning of paved areas, removing moss and weeds.",
  },
  {
    title: "Terrace Cleaning",
    description: "Professional cleaning and care of stone or concrete terraces.",
  },
  {
    title: "Stair Cleaning",
    description: "Safe and thorough cleaning of outdoor stairs and entrance areas.",
  },
  {
    title: "Masonry Restoration",
    description: "Cleaning and restoration of old walls and stone surfaces.",
  },
  {
    title: "Sealing",
    description: "Optional protection of cleaned surfaces through professional sealing.",
  },
]

const benefits = [
  "Expert treatment of different stone types",
  "Pressure washing with adapted pressure levels",
  "Environmentally friendly cleaning agents",
  "Removal of moss, algae and discoloration",
  "Optional impregnation for long-lasting protection",
  "Enhances the appearance of your property",
]

const process = [
  { step: "Inspection", description: "Analysis of stone type and degree of soiling" },
  { step: "Test Area", description: "Trial cleaning on an inconspicuous spot" },
  { step: "Quote", description: "Individual quote with optional sealing" },
  { step: "Cleaning", description: "Expert cleaning with tailored technique" },
  { step: "Sealing", description: "Optional: protective treatment for lasting cleanliness" },
]

export default function SteinreinigungEnPage() {
  return (
    <ServicePageTemplate
      slug="steinreinigung"
      title="Stone Cleaning"
      subtitle="We gently free natural stone, paving and terraces from moss, algae and weathering - restoring their natural shine."
      description="Over time, stone surfaces become unsightly due to weathering, moss, algae and dirt. Our professional stone cleaning brings your outdoor surfaces back to life. With techniques tailored to each stone type, we ensure a gentle and thorough clean that preserves the natural character of your stone surfaces."
      icon={Mountain}
      image="clean+natural+stone+pavement+terrace+outdoor+pressure+washing"
      features={features}
      benefits={benefits}
      process={process}
      locale="en"
    />
  )
}
