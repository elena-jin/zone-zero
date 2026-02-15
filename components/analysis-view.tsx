"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { AlertTriangle, ChevronRight, Shield, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { InspectionReport } from "@/components/app-shell"

interface HotspotData {
  x: number
  y: number
  code: string
  detail: string
}

function Hotspot({ data }: { data: HotspotData }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div
      className="absolute z-30 pointer-events-auto"
      style={{ left: `${data.x}%`, top: `${data.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <button
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        onClick={() => setShowPopup(!showPopup)}
        className="relative w-9 h-9 rounded-full bg-destructive border-2 border-foreground flex items-center justify-center text-destructive-foreground font-black text-sm cursor-pointer transition-all hover:scale-125 hover:bg-destructive/90"
        style={{ boxShadow: "0 0 20px hsla(0, 75%, 55%, 0.6)" }}
        aria-label={`Violation ${data.code}: ${data.detail}`}
      >
        !
        {/* Ripple */}
        <span className="absolute inset-0 rounded-full border-2 border-destructive animate-ping opacity-30" />
      </button>

      {/* Popup */}
      <div
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 glass-strong rounded-2xl p-4 pointer-events-none transition-all duration-300 z-50",
          showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
        style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)" }}
      >
        <span className="block text-[11px] font-black text-destructive uppercase tracking-[0.15em] mb-1.5 pb-1.5 border-b border-border">
          {"Section "}{data.code}
        </span>
        <span className="text-[13px] text-foreground/90 leading-relaxed font-medium">
          {data.detail}
        </span>
      </div>
    </div>
  )
}

export default function AnalysisView({
  address,
  streetViewUrl,
  onComplete,
  onNext,
  report,
}: {
  address: string
  streetViewUrl: string
  onComplete: (report: InspectionReport) => void
  onNext: () => void
  report: InspectionReport | null
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStatus, setAnalysisStatus] = useState("Loading Street View...")
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const hasStartedAnalysis = useRef(false)

  const runAnalysis = useCallback(async (imgElement: HTMLImageElement) => {
    if (report) return // Already have a report
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey) {
      setAnalysisStatus("Missing Gemini API key")
      return
    }

    setIsAnalyzing(true)
    setAnalysisStatus("Analyzing vegetation density...")

    try {
      const canvas = document.createElement("canvas")
      canvas.width = imgElement.naturalWidth || 800
      canvas.height = imgElement.naturalHeight || 600
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas not supported")
      ctx.drawImage(imgElement, 0, 0)
      const base64Data = canvas.toDataURL("image/jpeg", 0.8).split(",")[1]

      const modelName = "gemini-2.5-flash"
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`

      const prompt = `You are a California Fire Marshal. Perform a LE-100 inspection on this property image.
Identify critical Zone 0/1 violations (0-30ft).

JSON SCHEMA:
{
  "checklist": [{"code": "A", "status": "Compliant"|"Violation", "note": "Detailed issue description"}],
  "summary": "1-sentence executive risk summary",
  "corrections": "Short, punchy required actions",
  "annotations": [{"x": 0-100, "y": 0-100, "code": "A", "detail": "What is the hazard exactly?"}]
}
Focus on: Combustible mulch, wood siding, dead plants, overhanging limbs, brush near foundation, roof debris, dry vegetation, wood fencing within zone 0.`

      const payload = {
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: base64Data } }
          ]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error?.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const text = data.candidates[0].content.parts[0].text

      let scrubbed = text.replace(/```json/g, "").replace(/```/g, "").trim()
      const firstBrace = scrubbed.indexOf("{")
      const lastBrace = scrubbed.lastIndexOf("}")
      if (firstBrace !== -1 && lastBrace !== -1) {
        scrubbed = scrubbed.substring(firstBrace, lastBrace + 1)
      }

      const parsed: InspectionReport = JSON.parse(scrubbed)
      onComplete(parsed)
      setAnalysisStatus("Audit Verified")
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error"
      setAnalysisStatus(`Audit Error: ${msg}`)
    } finally {
      setIsAnalyzing(false)
    }
  }, [onComplete, report])

  useEffect(() => {
    if (imageLoaded && imgRef.current && !hasStartedAnalysis.current && !report) {
      hasStartedAnalysis.current = true
      runAnalysis(imgRef.current)
    }
  }, [imageLoaded, runAnalysis, report])

  const violationCount = report
    ? report.checklist.filter((i) => i.status === "Violation").length
    : 0

  return (
    <section className="min-h-dvh flex items-center py-12 md:py-20 px-4 md:px-6 animate-in fade-in duration-700">
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column - Analysis Results */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-destructive/30">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-destructive">
                Live Marshal Analysis
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-none uppercase text-balance">
            Vulnerability Audit
          </h2>

          {/* Checklist */}
          <div className="glass rounded-[2rem] p-6 md:p-8 flex flex-col gap-6">
            <h3 className="text-xs font-black border-b border-border pb-4 uppercase tracking-[0.2em] text-foreground">
              LE-100 Standard Checklist
            </h3>
            <div className="flex flex-col gap-3 max-h-[440px] overflow-y-auto pr-2">
              {!report ? (
                <div className="flex items-center gap-4 text-muted-foreground italic">
                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                  <span className="text-sm">Initiating VLM protocols...</span>
                </div>
              ) : (
                report.checklist.map((item, i) => (
                  <div
                    key={`${item.code}-${i}`}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border/30 hover:border-destructive/30 transition-all"
                  >
                    <div className="flex flex-col gap-1 flex-1 min-w-0 mr-3">
                      <span className="text-[9px] font-black text-destructive uppercase tracking-widest">
                        Section {item.code}
                      </span>
                      <p className="text-xs font-bold text-foreground/80 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[8px] font-black uppercase tracking-wider px-3 py-1 rounded-full",
                        item.status === "Compliant"
                          ? "bg-safe/15 text-safe"
                          : "bg-destructive/15 text-destructive"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Summary */}
          {report && (
            <div className="bg-destructive/5 border-l-4 border-destructive p-6 md:p-8 rounded-r-[2rem]">
              <h4 className="text-destructive font-black text-xs mb-3 uppercase tracking-widest">
                Digital Inspector Summary
              </h4>
              <p className="text-foreground/70 text-sm leading-relaxed italic">
                {report.summary}
              </p>
            </div>
          )}

          {/* Corrections */}
          {report && (
            <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">
                Required Remediation
              </h4>
              <p className="text-foreground text-sm font-medium leading-relaxed">
                {report.corrections}
              </p>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!report}
            className="w-full py-5 bg-foreground text-background font-black rounded-2xl uppercase tracking-widest hover:bg-destructive hover:text-destructive-foreground transition-all shadow-xl disabled:opacity-30 disabled:hover:bg-foreground flex items-center justify-center gap-2"
          >
            Proceed to Mitigation
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Right Column - Street View Image + Hotspots */}
        <div className="relative lg:sticky lg:top-10 order-1 lg:order-2">
          <div className="aspect-[4/3] glass rounded-[2rem] overflow-hidden border border-border shadow-2xl relative">
            {/* Scanning line effect */}
            {isAnalyzing && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-destructive/40 z-10 animate-scan" />
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={streetViewUrl}
              alt={`Street view of ${address}`}
              className="w-full h-full object-cover opacity-80"
              crossOrigin="anonymous"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

            {/* Hotspots */}
            {report?.annotations.map((anno, i) => (
              <Hotspot key={`${anno.code}-${i}`} data={anno} />
            ))}
          </div>

          {/* Status bar below image */}
          <div className="absolute -bottom-5 left-6 right-6 glass-strong p-5 rounded-2xl flex justify-between items-center border border-border shadow-2xl">
            <div>
              <p className="text-[10px] font-black text-destructive uppercase tracking-widest">
                Violation Level
              </p>
              <p className="text-xs font-bold text-foreground mt-0.5 flex items-center gap-2">
                {isAnalyzing && <Loader2 className="h-3 w-3 animate-spin" />}
                {analysisStatus}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-muted-foreground uppercase">
                Critical Risks
              </p>
              <p className="text-3xl font-display font-black text-foreground">
                {violationCount.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
