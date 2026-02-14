"use client"

import { BarChart3, TrendingUp, Users } from "lucide-react"
import { type StyleResult, predictionData } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function PredictionPanel({
  styleResult,
}: {
  styleResult: StyleResult
}) {
  const styleKey = styleResult.style.toLowerCase() as keyof typeof predictionData
  const predictions = predictionData[styleKey] || predictionData.mediterranean

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Behavioral Prediction
          </span>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">
          What You{"'"}ll Most Likely Install
        </h2>
      </div>

      {/* Style Result Card */}
      <div className="mx-4 p-4 rounded-2xl bg-secondary/50 border border-border mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Your aesthetic profile</p>
            <p className="font-display text-lg font-bold text-foreground">
              {styleResult.style}{" "}
              <span className="text-sm font-normal text-primary">
                ({styleResult.confidence}% confidence)
              </span>
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {styleResult.description}
        </p>
      </div>

      {/* Prediction Bars */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Homeowners with your style choose:
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {predictions.map((item, index) => (
            <div key={item.name} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-foreground">
                  {item.name}
                </span>
                <span
                  className={cn(
                    "text-lg font-display font-bold",
                    index === 0 ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    index === 0
                      ? "bg-primary"
                      : index === 1
                      ? "bg-safe"
                      : "bg-warning",
                  )}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mx-4 mb-6 p-4 rounded-2xl border border-primary/30 bg-primary/5">
        <p className="text-sm font-semibold text-foreground mb-1">
          Our Recommendation
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Based on your {styleResult.style} aesthetic, we recommend{" "}
          <span className="text-primary font-semibold">{predictions[0].name}</span>.
          It matches your style and has the highest adoption rate among similar
          homeowners.
        </p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          {"\""}We recommend what you{"'"}re most likely to actually install.{"\""}
        </p>
      </div>
    </div>
  )
}
