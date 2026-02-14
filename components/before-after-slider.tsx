"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { ArrowLeftRight, Clock, DollarSign, Flame, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    [],
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) handleMove(e.clientX)
    },
    [isDragging, handleMove],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX)
    },
    [handleMove],
  )

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Before / After
          </span>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Your Zone 0 Transformation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag the slider to compare
        </p>
      </div>

      {/* Slider */}
      <div className="px-4 flex-1 min-h-0">
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none touch-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          {/* After image (full) */}
          <Image
            src="/images/home-safe.jpg"
            alt="After: fire-safe Zone 0 design"
            fill
            className="object-cover"
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="/images/home-exterior.jpg"
              alt="Before: current home exterior"
              fill
              className="object-cover"
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-foreground/80 z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center shadow-lg">
              <ArrowLeftRight className="h-4 w-4 text-background" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-3 left-3 z-20">
            <span className="glass rounded-full px-3 py-1.5 text-xs font-bold text-fire-red flex items-center gap-1.5">
              <Flame className="h-3 w-3" />
              BEFORE
            </span>
          </div>
          <div className="absolute top-3 right-3 z-20">
            <span className="glass rounded-full px-3 py-1.5 text-xs font-bold text-safe flex items-center gap-1.5">
              <Shield className="h-3 w-3" />
              AFTER
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              Time to Install
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            2-3
            <span className="text-sm font-normal text-muted-foreground ml-1">
              days
            </span>
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              Estimated Cost
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            $1,200
            <span className="text-sm font-normal text-muted-foreground ml-1">
              - $3,500
            </span>
          </p>
        </div>
      </div>

      {/* Safety improvement */}
      <div className="mx-4 mb-6 p-4 rounded-2xl border border-safe/30 bg-safe/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">
            Fire Safety Improvement
          </span>
          <span className="text-safe font-display text-lg font-bold">+87%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-[87%] rounded-full bg-safe transition-all duration-1000" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your Zone 0 compliance would go from 12% to 99% with these changes.
        </p>
      </div>
    </div>
  )
}
