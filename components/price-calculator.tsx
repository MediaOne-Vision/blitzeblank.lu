"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  { value: "industrie", label: "Industriereinigung", basePrice: 150, pricePerSqm: 2.5 },
  { value: "fenster", label: "Fensterreinigung", basePrice: 80, pricePerSqm: 8 },
  { value: "trockeneis", label: "Trockeneisreinigung", basePrice: 200, pricePerSqm: 15 },
  { value: "stein", label: "Steinreinigung", basePrice: 120, pricePerSqm: 12 },
  { value: "fassade", label: "Fassadenreinigung", basePrice: 180, pricePerSqm: 10 },
]

const frequencies = [
  { value: "einmalig", label: "Einmalig", multiplier: 1 },
  { value: "woechentlich", label: "Wöchentlich", multiplier: 0.85 },
  { value: "monatlich", label: "Monatlich", multiplier: 0.9 },
  { value: "quartalsweise", label: "Quartalsweise", multiplier: 0.95 },
]

export function PriceCalculator() {
  const [service, setService] = useState("")
  const [area, setArea] = useState([100])
  const [frequency, setFrequency] = useState("")

  const selectedService = services.find((s) => s.value === service)
  const selectedFrequency = frequencies.find((f) => f.value === frequency)

  const calculatePrice = () => {
    if (!selectedService || !selectedFrequency) return { min: 0, max: 0 }
    
    const basePrice = selectedService.basePrice
    const areaPrice = area[0] * selectedService.pricePerSqm
    const totalBase = basePrice + areaPrice
    const withFrequency = totalBase * selectedFrequency.multiplier
    
    return {
      min: Math.round(withFrequency * 0.85),
      max: Math.round(withFrequency * 1.15),
    }
  }

  const price = calculatePrice()
  const showPrice = service && frequency

  return (
    <div className="bg-card rounded-3xl border border-border p-8 lg:p-10">
      <div className="space-y-8">
        {/* Service Selection */}
        <div className="space-y-3">
          <Label htmlFor="service" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Leistung
          </Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service" className="h-14 rounded-xl border-border bg-background text-base">
              <SelectValue placeholder="Leistung auswählen" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {services.map((s) => (
                <SelectItem key={s.value} value={s.value} className="rounded-lg">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Fläche
            </Label>
            <span className="text-2xl font-serif font-medium text-foreground">{area[0]} m²</span>
          </div>
          <Slider
            value={area}
            onValueChange={setArea}
            max={1000}
            min={20}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>20 m²</span>
            <span>1000 m²</span>
          </div>
        </div>

        {/* Frequency Selection */}
        <div className="space-y-3">
          <Label htmlFor="frequency" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Häufigkeit
          </Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger id="frequency" className="h-14 rounded-xl border-border bg-background text-base">
              <SelectValue placeholder="Häufigkeit auswählen" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {frequencies.map((f) => (
                <SelectItem key={f.value} value={f.value} className="rounded-lg">
                  {f.label}
                  {f.multiplier < 1 && (
                    <span className="ml-2 text-primary">
                      -{Math.round((1 - f.multiplier) * 100)}%
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Display */}
        {showPrice && (
          <div className="rounded-2xl bg-foreground text-background p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-background/60 mb-2">
              Geschätzte Preisspanne
            </p>
            <p className="text-4xl font-serif font-medium">
              {price.min} - {price.max} EUR
            </p>
            <p className="text-xs text-background/60 mt-3">
              Unverbindliche Schätzung. Der finale Preis wird nach Besichtigung festgelegt.
            </p>
          </div>
        )}

        {/* CTA */}
        <Button 
          asChild 
          size="lg"
          className="w-full h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base"
        >
          <Link href="/kontakt" className="flex items-center justify-center gap-2 cursor-pointer">
            Termin anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
