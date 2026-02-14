"use client"

import { useState } from "react"
import Image from "next/image"
import { AlertTriangle, ChevronRight, Shield, X } from "lucide-react"
import { fireRisks, type FireRisk, type Alternative } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function RiskOverlay({
  risk,
  isSelected,
  onSelect,
}: {
  risk: FireRisk
  isSelected: boolean
  onSelect: () => void
}) {
  const severityConfig = {
    high: { border: "border-fire-red", bg: "bg-fire-red/20", text: "text-fire-red", label: "HIGH RISK" },
    medium: { border: "border-warning", bg: "bg-warning/20", text: "text-warning", label: "MEDIUM RISK" },
    low: { border: "border-safe", bg: "bg-safe/20", text: "text-safe", label: "LOW RISK" },
  }

  const config = severityConfig[risk.severity]

  return (
    <button
      onClick={onSelect}
      className={cn(
        "absolute border-2 rounded-lg transition-all duration-300 cursor-pointer group",
        config.border,
        isSelected ? `${config.bg} scale-[1.02]` : "bg-transparent hover:bg-black/10",
      )}
      style={{
        top: risk.position.top,
        left: risk.position.left,
        width: risk.position.width,
        height: risk.position.height,
      }}
      aria-label={`${risk.label} - ${config.label}`}
    >
      <span
        className={cn(
          "absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-xs font-bold tracking-wide",
          "glass-strong",
          config.text,
        )}
      >
        {risk.label} - {config.label}
      </span>
      <span
        className={cn(
          "absolute inset-0 rounded-lg border-2 animate-pulse opacity-50",
          config.border,
          isSelected && "opacity-0",
        )}
      />
    </button>
  )
}

function RiskDetailPanel({
  risk,
  onClose,
  onSelectAlternative,
}: {
  risk: FireRisk
  onClose: () => void
  onSelectAlternative: (alt: Alternative) => void
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 glass-strong rounded-t-2xl p-5 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle
            className={cn(
              "h-5 w-5",
              risk.severity === "high" ? "text-fire-red" : "text-warning",
            )}
          />
          <h3 className="font-display text-lg font-bold text-foreground">
            {risk.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-secondary transition-colors"
          aria-label="Close panel"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {risk.description}
      </p>
      <h4 className="text-xs font-bold uppercase tracking-widest text-safe mb-3">
        Safer Alternatives
      </h4>
      <div className="flex flex-col gap-2">
        {risk.alternatives.map((alt) => (
          <button
            key={alt.id}
            onClick={() => onSelectAlternative(alt)}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all group text-left"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-foreground">
                  {alt.name}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-safe/15 text-safe font-medium">
                  {alt.safetyScore}%
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{alt.costRange}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{alt.maintenance} maintenance</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{alt.style}</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

function AlternativeDetailPanel({
  alternative,
  onBack,
}: {
  alternative: Alternative
  onBack: () => void
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 glass-strong rounded-t-2xl p-5 animate-in slide-in-from-bottom duration-300">
      <button
        onClick={onBack}
        className="text-xs text-primary font-medium mb-3 flex items-center gap-1 hover:underline"
      >
        <ChevronRight className="h-3 w-3 rotate-180" />
        Back to alternatives
      </button>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-safe/15 flex items-center justify-center">
          <Shield className="h-6 w-6 text-safe" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {alternative.name}
          </h3>
          <span className="text-xs text-muted-foreground">{alternative.style} Style</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {alternative.description}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <div className="text-2xl font-display font-bold text-safe">
            {alternative.safetyScore}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">Safety Score</div>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <div className="text-sm font-bold text-foreground mt-1">
            {alternative.costRange}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Cost Range</div>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <div className="text-sm font-bold text-foreground mt-1">
            {alternative.maintenance}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Maintenance</div>
        </div>
      </div>
    </div>
  )
}

export default function ARCameraView() {
  const [selectedRisk, setSelectedRisk] = useState<FireRisk | null>(null)
  const [selectedAlternative, setSelectedAlternative] = useState<Alternative | null>(null)
  const [showOverlays, setShowOverlays] = useState(true)

  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      {/* Camera view simulation */}
      <div className="relative w-full h-full">
        <Image
          src="/images/home-exterior.jpg"
          alt="Home exterior camera view"
          fill
          className="object-cover"
          priority
        />

        {/* AR Scanning effect */}
        {showOverlays && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-primary/40 animate-pulse" />
          </div>
        )}

        {/* Risk overlays */}
        {showOverlays &&
          fireRisks.map((risk) => (
            <RiskOverlay
              key={risk.id}
              risk={risk}
              isSelected={selectedRisk?.id === risk.id}
              onSelect={() => {
                setSelectedRisk(risk)
                setSelectedAlternative(null)
              }}
            />
          ))}

        {/* Top HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fire animate-pulse" />
            <span className="text-xs font-bold text-foreground tracking-wide">
              ZONE 0 SCAN
            </span>
          </div>
          <button
            onClick={() => {
              setShowOverlays(!showOverlays)
              if (!showOverlays) {
                setSelectedRisk(null)
                setSelectedAlternative(null)
              }
            }}
            className={cn(
              "glass rounded-full px-4 py-2 text-xs font-bold transition-all",
              showOverlays ? "text-fire" : "text-muted-foreground",
            )}
          >
            {showOverlays ? "HIDE RISKS" : "SHOW RISKS"}
          </button>
        </div>

        {/* Risk count indicator */}
        {showOverlays && !selectedRisk && (
          <div className="absolute bottom-6 left-4 right-4 glass rounded-2xl p-4 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fire-red/15 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-fire-red" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {fireRisks.length} fire risks detected
                </p>
                <p className="text-xs text-muted-foreground">
                  Tap any highlighted area to explore safer alternatives
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Risk detail panel */}
        {selectedRisk && !selectedAlternative && (
          <RiskDetailPanel
            risk={selectedRisk}
            onClose={() => setSelectedRisk(null)}
            onSelectAlternative={setSelectedAlternative}
          />
        )}

        {/* Alternative detail panel */}
        {selectedAlternative && (
          <AlternativeDetailPanel
            alternative={selectedAlternative}
            onBack={() => setSelectedAlternative(null)}
          />
        )}
      </div>
    </div>
  )
}
