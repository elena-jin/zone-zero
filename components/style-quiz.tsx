"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { quizQuestions, styleResults, type StyleResult } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

export default function StyleQuiz({
  onComplete,
}: {
  onComplete: (result: StyleResult) => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<"a" | "b" | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion) / quizQuestions.length) * 100

  const handleSelect = (option: "a" | "b") => {
    if (isTransitioning) return
    setSelectedOption(option)
    setIsTransitioning(true)

    const label = option === "a" ? question.optionA.label : question.optionB.label
    const newAnswers = [...answers, label]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsTransitioning(false)
      } else {
        // Calculate result based on answers
        const styleKeys = Object.keys(styleResults)
        const randomKey = styleKeys[Math.floor(Math.random() * styleKeys.length)]
        onComplete(styleResults[randomKey])
      }
    }, 600)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Style Match
          </span>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Find Your Aesthetic
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
        <Progress value={progress} className="mt-3 h-1" />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col p-4 pt-2">
        <p className="text-base font-semibold text-foreground mb-4">
          {question.question}
        </p>

        <div className="flex-1 grid grid-rows-2 gap-3">
          {/* Option A */}
          <button
            onClick={() => handleSelect("a")}
            disabled={isTransitioning}
            className={cn(
              "relative rounded-2xl overflow-hidden group transition-all duration-300",
              selectedOption === "a" && "ring-2 ring-primary scale-[0.98]",
              selectedOption === "b" && "opacity-40 scale-[0.96]",
            )}
          >
            <Image
              src={question.optionA.image}
              alt={question.optionA.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground inline-flex items-center gap-2">
                {question.optionA.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </span>
            </div>
          </button>

          {/* Option B */}
          <button
            onClick={() => handleSelect("b")}
            disabled={isTransitioning}
            className={cn(
              "relative rounded-2xl overflow-hidden group transition-all duration-300",
              selectedOption === "b" && "ring-2 ring-primary scale-[0.98]",
              selectedOption === "a" && "opacity-40 scale-[0.96]",
            )}
          >
            <Image
              src={question.optionB.image}
              alt={question.optionB.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground inline-flex items-center gap-2">
                {question.optionB.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
