import { Metadata } from "next"
import { Factory } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Industrial Cleaning | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Professional industrial cleaning in Luxembourg. We clean production halls, warehouses, workshops and industrial facilities to the highest standards.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/leistungen/industriereinigung",
    languages: {
      de: "/leistungen/industriereinigung",
      en: "/en/leistungen/industriereinigung",
    },
  },
}

const features = [
  {
    title: "Hall Floor Cleaning",
    description: "Thorough cleaning of industrial floors of all kinds - concrete, epoxy, tile or coated surfaces.",
  },
  {
    title: "Machine Cleaning",
    description: "Gentle and effective cleaning of production machinery without interrupting operations.",
  },
  {
    title: "Warehouse Cleaning",
    description: "Systematic cleaning of storage areas and shelving systems for optimal hygiene.",
  },
  {
    title: "Ceiling & Wall Cleaning",
    description: "Removal of dust, cobwebs and deposits in hard-to-reach areas.",
  },
  {
    title: "Ventilation Cleaning",
    description: "Professional cleaning of ventilation and air conditioning systems for better air quality.",
  },
  {
    title: "Special Cleaning",
    description: "Custom cleaning solutions for special requirements and industries.",
  },
]

const benefits = [
  "Minimal disruption to operations through flexible working hours",
  "Experience with all common industrial environments",
  "Compliance with all safety and hygiene regulations",
  "Regular cleaning or one-off deep cleaning",
  "Modern cleaning techniques and eco-friendly agents",
  "Documented quality control after every visit",
]

const process = [
  { step: "Inspection", description: "Free on-site analysis of your requirements" },
  { step: "Quote", description: "Individual and transparent quote" },
  { step: "Scheduling", description: "Flexible timing to suit your needs" },
  { step: "Execution", description: "Professional cleaning by trained staff" },
  { step: "Sign-off", description: "Joint quality inspection" },
]

export default function IndustriereinigungEnPage() {
  return (
    <ServicePageTemplate
      slug="industriereinigung"
      title="Industrial Cleaning"
      subtitle="We clean production halls, warehouses and workshops to the highest standards - efficiently and with minimal impact on your operations."
      description="Industrial cleaning requires specialized know-how and experience. Our trained staff understand the requirements of different industries and ensure hygienic working conditions in your production halls, warehouses and workshops. We work efficiently and with minimal impact on your daily operations."
      icon={Factory}
      image="industrial+factory+production+hall+clean+polished+floor"
      features={features}
      benefits={benefits}
      process={process}
      showResults={false}
      showQuote={false}
      locale="en"
    />
  )
}
