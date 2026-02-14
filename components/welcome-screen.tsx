"use client"

import { Flame, ScanLine, Shield } from "lucide-react"

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 border border-primary/20">
          <Flame className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
          ZoneZero AI
        </h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto leading-relaxed">
          Visualize fire-safe Zone 0 designs while preserving your home{"'"}s aesthetic.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3 w-full max-w-xs mb-10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 text-left">
          <ScanLine className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">AR Risk Scanner</p>
            <p className="text-xs text-muted-foreground">Detect fire hazards in your yard</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 text-left">
          <Shield className="h-5 w-5 text-safe shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Smart Alternatives</p>
            <p className="text-xs text-muted-foreground">Personalized to your style</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
      >
        Start Scanning
      </button>
      <p className="text-xs text-muted-foreground mt-3">
        No camera required for this demo
      </p>
    </div>
  )
}
