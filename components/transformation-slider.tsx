"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ArrowLeftRight, Shield, Flame, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MitigationStyle, InspectionReport } from "@/components/app-shell"

const styleAfterImages: Record<MitigationStyle, string> = {
  ModernRock: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/house-Fv2byh9tw5mihB3DMBuUZkGVaqxMQ7.png",
  Xeriscape: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xeriscape-sxoNpSkDEIjwsm58iO5MZjBhgmJbFk.jpg",
  ZenStone: "zen.png",
  WildfireHardened: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/native_grass-Yf2sFQBllooEH5OIXOqgNeMUSXSyZG.jpg",
}

const styleMarketplaceLinks: Record<MitigationStyle, { name: string; url: string }[]> = {
  ModernRock: [
    { name: "Premium Grey River Stone", url: "https://www.facebook.com/marketplace/search/?query=landscaping%20river%20rock" },
    { name: "Fiber Cement Siding", url: "https://www.facebook.com/marketplace/search/?query=hardie%20plank" },
  ],
  Xeriscape: [
    { name: "Drought Tolerant Native Sage", url: "https://www.facebook.com/marketplace/search/?query=native%20sage" },
    { name: "Decomposed Granite", url: "https://www.facebook.com/marketplace/search/?query=decomposed%20granite" },
  ],
  ZenStone: [
    { name: "White Beach Pebbles", url: "https://www.facebook.com/marketplace/search/?query=white%20beach%20pebble" },
    { name: "Bamboo Landscaping", url: "https://www.facebook.com/marketplace/search/?query=bamboo%20plants" },
  ],
  WildfireHardened: [
    { name: "Wildfire Grass Plugs", url: "https://www.facebook.com/marketplace/search/?query=native%20grass%20plugs" },
    { name: "Heat Shield Barriers", url: "https://www.facebook.com/marketplace/search/?query=fireproof%20barrier" },
  ],
}

export default function TransformationSlider({
  streetViewUrl,
  selectedStyle,
  report,
  onNext,
}: {
  streetViewUrl: string
  selectedStyle: MitigationStyle
  report: InspectionReport | null
  onNext: () => void
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const afterImageUrl = styleAfterImages[selectedStyle]
  const links = styleMarketplaceLinks[selectedStyle]

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handlePointerDown = useCallback(() => setIsDragging(true), [])
  const handlePointerUp = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      handleMove(clientX)
    }
    const handleGlobalUp = () => setIsDragging(false)

    window.addEventListener("mousemove", handleGlobalMove)
    window.addEventListener("mouseup", handleGlobalUp)
    window.addEventListener("touchmove", handleGlobalMove, { passive: true })
    window.addEventListener("touchend", handleGlobalUp)
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove)
      window.removeEventListener("mouseup", handleGlobalUp)
      window.removeEventListener("touchmove", handleGlobalMove)
      window.removeEventListener("touchend", handleGlobalUp)
    }
  }, [isDragging, handleMove])

  const violationCount = report
    ? report.checklist.filter((i) => i.status === "Violation").length
    : 0

  return (
    <section className="min-h-dvh flex items-center py-12 md:py-20 px-4 md:px-6 animate-in fade-in duration-700">
      <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center gap-10 md:gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter uppercase leading-none text-balance">
            Your Zone 0 Transformation
          </h2>
          <p className="text-muted-foreground text-lg font-medium italic">
            Automatic compliance simulation cycle active
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] cursor-col-resize select-none touch-none"
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          {/* After Image (full background) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterImageUrl}
            alt="After: Compliant property"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setAfterLoaded(true)}
          />

          {/* After label overlay */}
          {afterLoaded && (
            <div className="absolute top-5 md:top-8 right-5 md:right-8 glass-strong p-4 md:p-6 rounded-2xl border border-safe/30 text-right z-20 pointer-events-none">
              <span className="text-[10px] font-black text-safe tracking-[0.3em] uppercase block">
                Result Optimized
              </span>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-xs md:text-sm text-foreground font-bold flex items-center justify-end gap-1.5">
                  <Shield className="h-3 w-3 text-safe" />
                  PRC 4291 Certified
                </p>
                <p className="text-xs md:text-sm text-foreground font-bold flex items-center justify-end gap-1.5">
                  <Shield className="h-3 w-3 text-safe" />
                  0-5ft Embodied Buffer
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Validated by AI Marshal
                </p>
              </div>
            </div>
          )}

          {/* Before Image (clipped from left) */}
          <div
            className="absolute inset-0 overflow-hidden border-r border-foreground/20 z-[2]"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={streetViewUrl}
              alt="Before: Original condition"
              className="absolute top-0 left-0 h-full object-cover"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw" }}
              crossOrigin="anonymous"
              onLoad={() => setBeforeLoaded(true)}
            />

            {/* Before label */}
            {beforeLoaded && (
              <div className="absolute top-5 md:top-8 left-5 md:left-8 glass-strong p-4 md:p-6 rounded-2xl border border-destructive/30 text-left z-20 pointer-events-none">
                <span className="text-[10px] font-black text-destructive tracking-[0.3em] uppercase block">
                  Detected Hazard
                </span>
                <p className="text-xs md:text-sm text-foreground font-bold mt-2 uppercase flex items-center gap-1.5">
                  <Flame className="h-3 w-3 text-destructive" />
                  Original Condition
                </p>
                {violationCount > 0 && (
                  <p className="text-[10px] text-destructive mt-1">
                    {violationCount} violation{violationCount !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 z-[9] h-full flex items-center justify-center"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)", width: "40px" }}
          >
            <div className="w-0.5 h-full bg-foreground/80 absolute" style={{ boxShadow: "0 0 15px rgba(255,255,255,0.5)" }} />
            <div className="relative w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center shadow-lg z-10">
              <ArrowLeftRight className="h-4 w-4 text-background" />
            </div>
          </div>
        </div>

        {/* Marketplace Links */}
        <div className="glass rounded-[2rem] p-8 md:p-12 w-full flex flex-col items-center gap-6">
          <h3 className="text-xl md:text-2xl font-display font-extrabold uppercase tracking-tight text-foreground">
            Recommended Remediation Supply
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-primary rounded-2xl font-extrabold text-sm text-primary-foreground hover:opacity-90 transition-all shadow-lg active:scale-95 flex items-center gap-2 uppercase tracking-wide"
              >
                <ExternalLink className="h-4 w-4" />
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="px-12 md:px-16 py-5 border-2 border-border rounded-2xl font-extrabold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all text-foreground"
        >
          Final Assessment Report
        </button>
      </div>
    </section>
  )
}
