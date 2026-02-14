"use client"

import { useState } from "react"
import {
  ScanLine,
  Palette,
  BarChart3,
  ArrowLeftRight,
} from "lucide-react"
import ARCameraView from "@/components/ar-camera-view"
import StyleQuiz from "@/components/style-quiz"
import PredictionPanel from "@/components/prediction-panel"
import BeforeAfterSlider from "@/components/before-after-slider"
import WelcomeScreen from "@/components/welcome-screen"
import { type StyleResult } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Tab = "scan" | "style" | "predict" | "compare"

const tabs: { id: Tab; label: string; icon: typeof ScanLine }[] = [
  { id: "scan", label: "Scan", icon: ScanLine },
  { id: "style", label: "Style", icon: Palette },
  { id: "predict", label: "Predict", icon: BarChart3 },
  { id: "compare", label: "Compare", icon: ArrowLeftRight },
]

export default function AppShell() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("scan")
  const [styleResult, setStyleResult] = useState<StyleResult | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleQuizComplete = (result: StyleResult) => {
    setStyleResult(result)
    setQuizCompleted(true)
    // Auto-navigate to prediction panel after quiz
    setTimeout(() => setActiveTab("predict"), 500)
  }

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Main Content */}
      <main className="flex-1 min-h-0 relative">
        <div className={cn("absolute inset-0", activeTab !== "scan" && "hidden")}>
          <ARCameraView />
        </div>
        <div className={cn("absolute inset-0", activeTab !== "style" && "hidden")}>
          {quizCompleted && styleResult ? (
            <QuizResultScreen result={styleResult} onRetake={() => {
              setQuizCompleted(false)
              setStyleResult(null)
            }} />
          ) : (
            <StyleQuiz onComplete={handleQuizComplete} />
          )}
        </div>
        <div className={cn("absolute inset-0", activeTab !== "predict" && "hidden")}>
          {styleResult ? (
            <PredictionPanel styleResult={styleResult} />
          ) : (
            <EmptyState
              title="Complete the Style Quiz first"
              description="Head to the Style tab to discover your aesthetic profile and see personalized predictions."
              action={() => setActiveTab("style")}
              actionLabel="Take the Quiz"
            />
          )}
        </div>
        <div className={cn("absolute inset-0", activeTab !== "compare" && "hidden")}>
          <BeforeAfterSlider />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav
        className="glass-strong border-t border-border/50 px-2 pb-[env(safe-area-inset-bottom)]"
        role="tablist"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]")} />
                <span className="text-[10px] font-bold tracking-wide uppercase">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function QuizResultScreen({
  result,
  onRetake,
}: {
  result: StyleResult
  onRetake: () => void
}) {
  return (
    <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-safe/10 flex items-center justify-center mb-5 border border-safe/20">
        <Palette className="h-8 w-8 text-safe" />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-safe mb-2">
        Your Aesthetic
      </p>
      <h2 className="font-display text-3xl font-bold text-foreground mb-1">
        {result.style}
      </h2>
      <p className="text-primary font-semibold text-sm mb-4">
        {result.confidence}% confidence
      </p>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-8">
        {result.description}
      </p>
      <button
        onClick={onRetake}
        className="px-6 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors"
      >
        Retake Quiz
      </button>
    </div>
  )
}

function EmptyState({
  title,
  description,
  action,
  actionLabel,
}: {
  title: string
  description: string
  action: () => void
  actionLabel: string
}) {
  return (
    <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center">
      <BarChart3 className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
        {description}
      </p>
      <button
        onClick={action}
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        {actionLabel}
      </button>
    </div>
  )
}
