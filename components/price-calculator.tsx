"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calculator, ArrowRight } from "lucide-react"
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
    <Card className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <Calculator className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Preiskalkulator</h3>
          <p className="text-sm text-muted-foreground">Erhalten Sie eine unverbindliche Preisspanne</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Service Selection */}
        <div className="space-y-2">
          <Label htmlFor="service">Welche Leistung benötigen Sie?</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Leistung auswählen" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ungefähre Fläche</Label>
            <span className="text-sm font-medium text-foreground">{area[0]} m²</span>
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
        <div className="space-y-2">
          <Label htmlFor="frequency">Wie oft soll gereinigt werden?</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Häufigkeit auswählen" />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                  {f.multiplier < 1 && (
                    <span className="ml-2 text-accent">
                      ({Math.round((1 - f.multiplier) * 100)}% Rabatt)
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Display */}
        {showPrice && (
          <div className="rounded-lg bg-secondary p-4 mt-6">
            <p className="text-sm text-muted-foreground mb-1">Geschätzte Preisspanne</p>
            <p className="text-3xl font-bold text-foreground">
              {price.min} - {price.max} EUR
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              * Unverbindliche Schätzung. Der finale Preis wird nach Besichtigung festgelegt.
            </p>
          </div>
        )}

        {/* CTA */}
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/kontakt" className="flex items-center justify-center gap-2">
            Kostenlosen Besichtigungstermin anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
