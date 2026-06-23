"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
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
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-blue/10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Inputs */}
        <div className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service" className="text-sm text-neutral-600">Leistung</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="service" className="bg-white border-neutral-200 h-12 rounded-xl">
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
              <Label className="text-sm text-neutral-600">Flache</Label>
              <span className="text-lg font-medium text-neutral-900">{area[0]} m2</span>
            </div>
            <Slider
              value={area}
              onValueChange={setArea}
              max={1000}
              min={20}
              step={10}
              className="[&_[role=slider]]:bg-[#4AADE4] [&_[role=slider]]:border-[#4AADE4]"
            />
            <div className="flex justify-between text-xs text-neutral-400">
              <span>20 m2</span>
              <span>1000 m2</span>
            </div>
          </div>

          {/* Frequency Selection */}
          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-sm text-neutral-600">Haufigkeit</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency" className="bg-white border-neutral-200 h-12 rounded-xl">
                <SelectValue placeholder="Haufigkeit auswahlen" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                    {f.multiplier < 1 && (
                      <span className="ml-2 text-[#4AADE4]">
                        -{Math.round((1 - f.multiplier) * 100)}%
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right: Result + CTA */}
        <div className="flex flex-col justify-center h-full space-y-6 lg:border-l lg:border-brand-blue/10 lg:pl-12">
          {/* Price Display */}
          {showPrice ? (
            <div className="bg-gradient-to-br from-brand-blue to-brand-teal rounded-xl p-8 text-center">
              <p className="text-sm text-white/80 mb-1">
                Geschatzte Preisspanne
              </p>
              <p className="font-display text-4xl font-extrabold text-white">
                {price.min} - {price.max} EUR
              </p>
              <p className="text-xs text-white/70 mt-2">
                Unverbindliche Schatzung
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-brand-blue/30 bg-brand-mint p-8 text-center">
              <p className="text-sm text-neutral-500">
                Wahlen Sie eine Leistung und Haufigkeit, um Ihre 
                Preisschatzung zu sehen.
              </p>
            </div>
          )}

          {/* CTA */}
          <Button asChild size="lg" className="w-full bg-brand-blue hover:bg-brand-teal text-white rounded-full h-12">
            <Link href="/kontakt" className="cursor-pointer">
              Termin anfragen
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
