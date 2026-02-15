"use client"

import { useState, useCallback } from "react"
import AddressInput from "@/components/address-input"
import AnalysisView from "@/components/analysis-view"
import StyleSelection from "@/components/style-selection"
import TransformationSlider from "@/components/transformation-slider"
import ComplianceReport from "@/components/compliance-report"

export interface InspectionReport {
  checklist: { code: string; status: string; note: string }[]
  summary: string
  corrections: string
  annotations: { x: number; y: number; code: string; detail: string }[]
}

export type MitigationStyle = "ModernRock" | "Xeriscape" | "ZenStone" | "WildfireHardened"

export default function AppShell() {
  const [currentStep, setCurrentStep] = useState(1)
  const [address, setAddress] = useState("")
  const [streetViewUrl, setStreetViewUrl] = useState("")
  const [report, setReport] = useState<InspectionReport | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<MitigationStyle>("ModernRock")

  const navigateTo = useCallback((step: number) => {
    setCurrentStep(step)
    window.scrollTo(0, 0)
  }, [])

  const handleAddressSubmit = useCallback((addr: string) => {
    setAddress(addr)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    if (!apiKey) return
    const url = `https://maps.googleapis.com/maps/api/streetview?size=1200x900&location=${encodeURIComponent(addr)}&key=${apiKey}`
    setStreetViewUrl(url)
    navigateTo(2)
  }, [navigateTo])

  const handleAnalysisComplete = useCallback((r: InspectionReport) => {
    setReport(r)
  }, [])

  const handleStyleSelect = useCallback((style: MitigationStyle) => {
    setSelectedStyle(style)
  }, [])

  return (
    <div className="min-h-dvh bg-background text-foreground overflow-x-hidden">
      {currentStep === 1 && (
        <AddressInput onSubmit={handleAddressSubmit} />
      )}
      {currentStep === 2 && (
        <AnalysisView
          address={address}
          streetViewUrl={streetViewUrl}
          onComplete={handleAnalysisComplete}
          onNext={() => navigateTo(3)}
          report={report}
        />
      )}
      {currentStep === 3 && (
        <StyleSelection
          selectedStyle={selectedStyle}
          onSelect={handleStyleSelect}
          onNext={() => navigateTo(4)}
        />
      )}
      {currentStep === 4 && (
        <TransformationSlider
          streetViewUrl={streetViewUrl}
          selectedStyle={selectedStyle}
          report={report}
          onNext={() => navigateTo(5)}
        />
      )}
      {currentStep === 5 && (
        <ComplianceReport
          address={address}
          report={report}
          onRestart={() => {
            setCurrentStep(1)
            setAddress("")
            setStreetViewUrl("")
            setReport(null)
          }}
        />
      )}
    </div>
  )
}
