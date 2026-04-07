"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
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
  { value: "woechentlich", label: "Wochentlich", multiplier: 0.85 },
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
    <Card className="border-border">
      <CardContent className="p-6 lg:p-8 space-y-6">
        {/* Service Selection */}
        <div className="space-y-2">
          <Label htmlFor="service">Leistung</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Leistung auswahlen" />
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
            <Label>Flache</Label>
            <span className="text-lg font-semibold text-foreground">{area[0]} m2</span>
          </div>
          <Slider
            value={area}
            onValueChange={setArea}
            max={1000}
            min={20}
            step={10}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>20 m2</span>
            <span>1000 m2</span>
          </div>
        </div>

        {/* Frequency Selection */}
        <div className="space-y-2">
          <Label htmlFor="frequency">Haufigkeit</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Haufigkeit auswahlen" />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map((f) => (
                <SelectItem key={f.value} value={f.value}>
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
          <div className="rounded-lg bg-primary p-6 text-center">
            <p className="text-sm text-primary-foreground/80 mb-1">
              Geschatzte Preisspanne
            </p>
            <p className="text-3xl font-bold text-primary-foreground">
              {price.min} - {price.max} EUR
            </p>
            <p className="text-xs text-primary-foreground/60 mt-2">
              Unverbindliche Schatzung
            </p>
          </div>
        )}

        {/* CTA */}
        <Button asChild size="lg" className="w-full gap-2">
          <Link href="/kontakt" className="cursor-pointer">
            Termin anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
