"use client"

import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MitigationStyle } from "@/components/app-shell"

const styles: {
  value: MitigationStyle
  label: string
  description: string
  image: string
}[] = [
  {
    value: "ModernRock",
    label: "Architectural Rock",
    description: "Sleek, fire-proof mineral buffers",
    image: "images/arch_rock.png",
  },
  {
    value: "Xeriscape",
    label: "Native Xeriscape",
    description: "Water-wise, high-ignition resistance",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xeriscape-sxoNpSkDEIjwsm58iO5MZjBhgmJbFk.jpg",
  },
  {
    value: "ZenStone",
    label: "Zen Perimeter",
    description: "Balanced, non-combustible gravels",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "WildfireHardened",
    label: "Hardened Shield",
    description: "Full mineral & fire-glass coverage",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/native_grass-Yf2sFQBllooEH5OIXOqgNeMUSXSyZG.jpg",
  },
]

export default function StyleSelection({
  selectedStyle,
  onSelect,
  onNext,
}: {
  selectedStyle: MitigationStyle
  onSelect: (style: MitigationStyle) => void
  onNext: () => void
}) {
  return (
    <section className="min-h-dvh flex items-center justify-center py-12 md:py-20 px-4 md:px-6 animate-in fade-in duration-700">
      <div className="max-w-5xl w-full text-center flex flex-col items-center gap-12 md:gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight uppercase text-balance leading-tight">
            Select Mitigation Aesthetic
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Choose how your compliant property will be transformed
          </p>
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.value
            return (
              <button
                key={style.value}
                onClick={() => onSelect(style.value)}
                className={cn(
                  "relative rounded-[2rem] overflow-hidden aspect-[4/5] cursor-pointer border-2 transition-all duration-300 group text-left",
                  isSelected
                    ? "border-destructive shadow-[0_0_40px_hsla(0,75%,55%,0.3)] scale-[1.02]"
                    : "border-transparent hover:-translate-y-2"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={style.image}
                  alt={style.label}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    isSelected ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                  )}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
                  <h3 className="font-display font-extrabold text-lg uppercase italic text-foreground">
                    {style.label}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">{style.description}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                    <svg className="w-3 h-3 text-destructive-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          className="px-12 md:px-20 py-5 md:py-6 bg-destructive rounded-2xl font-extrabold uppercase tracking-widest shadow-2xl shadow-destructive/30 hover:scale-[1.02] transition-all text-lg text-destructive-foreground flex items-center gap-3"
        >
          <Flame className="h-5 w-5" />
          Run Transformation Engine
        </button>
      </div>
    </section>
  )
}
