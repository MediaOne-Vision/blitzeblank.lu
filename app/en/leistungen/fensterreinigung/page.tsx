import { Metadata } from "next"
import { Grid3X3 } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Window Cleaning | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Professional window cleaning in Luxembourg. Streak-free glass cleaning for office buildings, shops and industrial sites of any size.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/leistungen/fensterreinigung",
    languages: {
      de: "/leistungen/fensterreinigung",
      en: "/en/leistungen/fensterreinigung",
    },
  },
}

const features = [
  {
    title: "Office Windows",
    description: "Regular cleaning of windows in office buildings for a pleasant working environment.",
  },
  {
    title: "Shop Windows",
    description: "Flawless presentation of your goods through streak-free shop window cleaning.",
  },
  {
    title: "Glass Facades",
    description: "Professional cleaning of glass facades, even at great heights.",
  },
  {
    title: "Industrial Glazing",
    description: "Efficient cleaning of large-scale industrial glazing and skylights.",
  },
  {
    title: "Frame Cleaning",
    description: "Thorough cleaning of window frames, sills and ledges.",
  },
  {
    title: "Specialty Glazing",
    description: "Gentle cleaning of safety glass, solar control glass and specialty glazing.",
  },
]

const benefits = [
  "Streak-free results through professional techniques",
  "Flexible intervals from weekly to quarterly",
  "Experience working at great heights",
  "Use of environmentally friendly cleaning agents",
  "Cleaning of hard-to-reach windows too",
  "Frames and fittings cleaned on request (optional)",
]

const process = [
  { step: "Inspection", description: "Free assessment of all glass surfaces" },
  { step: "Quote", description: "Transparent quote based on area and frequency" },
  { step: "Scheduling", description: "Regular appointments to suit you" },
  { step: "Cleaning", description: "Streak-free glass cleaning by professionals" },
  { step: "Check", description: "Quality check after every visit" },
]

export default function FensterreinigungEnPage() {
  return (
    <ServicePageTemplate
      slug="fensterreinigung"
      title="Window Cleaning"
      subtitle="Streak-free views from a single shop window to a full glass facade - with modern technology and years of experience."
      description="Clean windows are your company's calling card. Our professional window cleaning delivers streak-free results on every glass surface - from the shop window to the glass facade. With modern techniques and eco-friendly products, we guarantee an efficient and thorough clean that shows your spaces in their best light."
      icon={Grid3X3}
      image="clean+modern+glass+office+windows+reflection+blue+sky"
      features={features}
      benefits={benefits}
      process={process}
      locale="en"
    />
  )
}
