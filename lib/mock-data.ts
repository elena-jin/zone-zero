export interface FireRisk {
  id: string
  label: string
  severity: "high" | "medium" | "low"
  description: string
  position: { top: string; left: string; width: string; height: string }
  alternatives: Alternative[]
}

export interface Alternative {
  id: string
  name: string
  safetyScore: number
  costRange: string
  maintenance: "Low" | "Medium" | "High"
  style: "Modern" | "Mediterranean" | "Natural"
  description: string
}

export interface QuizQuestion {
  id: number
  question: string
  optionA: { image: string; label: string }
  optionB: { image: string; label: string }
}

export const fireRisks: FireRisk[] = [
  {
    id: "mulch",
    label: "Wood Mulch",
    severity: "high",
    description: "Wood mulch within 5 feet of your home is a major ember-catching risk during wildfire events.",
    position: { top: "58%", left: "15%", width: "35%", height: "18%" },
    alternatives: [
      {
        id: "gravel",
        name: "Gravel",
        safetyScore: 95,
        costRange: "$2-5/sq ft",
        maintenance: "Low",
        style: "Modern",
        description: "Non-combustible ground cover that prevents ember ignition.",
      },
      {
        id: "dg",
        name: "Decomposed Granite",
        safetyScore: 92,
        costRange: "$3-6/sq ft",
        maintenance: "Low",
        style: "Mediterranean",
        description: "Natural-looking, fire-resistant ground cover popular in arid climates.",
      },
      {
        id: "pavers",
        name: "Concrete Pavers",
        safetyScore: 98,
        costRange: "$8-15/sq ft",
        maintenance: "Low",
        style: "Modern",
        description: "Hardscape solution that eliminates all combustible ground material.",
      },
    ],
  },
  {
    id: "fence",
    label: "Wood Fence",
    severity: "medium",
    description: "Wood fencing can act as a wick, carrying fire directly to your home structure.",
    position: { top: "25%", left: "72%", width: "22%", height: "50%" },
    alternatives: [
      {
        id: "metal-fence",
        name: "Metal Fence",
        safetyScore: 97,
        costRange: "$20-40/linear ft",
        maintenance: "Low",
        style: "Modern",
        description: "Non-combustible fencing that won't carry fire to your home.",
      },
      {
        id: "stone-wall",
        name: "Stone Wall",
        safetyScore: 99,
        costRange: "$30-60/linear ft",
        maintenance: "Low",
        style: "Mediterranean",
        description: "Beautiful, permanent fire barrier that enhances property value.",
      },
      {
        id: "composite",
        name: "Fire-Rated Composite",
        safetyScore: 85,
        costRange: "$15-30/linear ft",
        maintenance: "Medium",
        style: "Natural",
        description: "Looks like wood but is treated for fire resistance.",
      },
    ],
  },
  {
    id: "vegetation",
    label: "Dry Vegetation",
    severity: "high",
    description: "Dead or dry plants within Zone 0 provide easy fuel for approaching embers.",
    position: { top: "45%", left: "55%", width: "20%", height: "25%" },
    alternatives: [
      {
        id: "succulents",
        name: "Fire-Resistant Succulents",
        safetyScore: 88,
        costRange: "$5-15/plant",
        maintenance: "Low",
        style: "Modern",
        description: "High-moisture plants that resist ignition and require minimal water.",
      },
      {
        id: "lavender",
        name: "Lavender & Sage",
        safetyScore: 82,
        costRange: "$4-10/plant",
        maintenance: "Medium",
        style: "Mediterranean",
        description: "Aromatic, low-fuel plants with natural fire-resistant properties.",
      },
      {
        id: "rock-garden",
        name: "Rock Garden",
        safetyScore: 96,
        costRange: "$6-12/sq ft",
        maintenance: "Low",
        style: "Natural",
        description: "Decorative stones with minimal plantings, creating a natural fire break.",
      },
    ],
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which landscape style appeals to you more?",
    optionA: { image: "/images/style-modern.jpg", label: "Clean & Modern" },
    optionB: { image: "/images/style-mediterranean.jpg", label: "Warm & Mediterranean" },
  },
  {
    id: 2,
    question: "Which ground cover do you prefer?",
    optionA: { image: "/images/style-zen.jpg", label: "Minimal & Zen" },
    optionB: { image: "/images/style-natural.jpg", label: "Organic & Natural" },
  },
  {
    id: 3,
    question: "Which garden layout speaks to you?",
    optionA: { image: "/images/style-contemporary.jpg", label: "Geometric & Structured" },
    optionB: { image: "/images/style-cottage.jpg", label: "Flowing & Cottage" },
  },
  {
    id: 4,
    question: "Which outdoor mood do you prefer?",
    optionA: { image: "/images/style-desert.jpg", label: "Arid & Dramatic" },
    optionB: { image: "/images/style-tropical.jpg", label: "Lush & Tropical" },
  },
  {
    id: 5,
    question: "Which pathway style fits your home?",
    optionA: { image: "/images/style-rustic.jpg", label: "Rustic & Rural" },
    optionB: { image: "/images/style-modern.jpg", label: "Sleek & Urban" },
  },
]

export interface StyleResult {
  style: string
  confidence: number
  description: string
}

export const styleResults: Record<string, StyleResult> = {
  mediterranean: {
    style: "Mediterranean",
    confidence: 91,
    description: "You gravitate toward warm, earthy tones and natural materials. Think terracotta, olive trees, and stone accents.",
  },
  modern: {
    style: "Modern",
    confidence: 87,
    description: "You prefer clean lines, minimalist layouts, and contemporary materials like concrete and steel.",
  },
  natural: {
    style: "Natural",
    confidence: 84,
    description: "You love organic shapes, native plantings, and landscapes that blend seamlessly with the environment.",
  },
}

export const predictionData = {
  mediterranean: [
    { name: "Decomposed Granite", percentage: 78, color: "hsl(var(--fire-orange))" },
    { name: "River Rock", percentage: 14, color: "hsl(var(--safe-green))" },
    { name: "Pavers", percentage: 8, color: "hsl(var(--warning-amber))" },
  ],
  modern: [
    { name: "Concrete Pavers", percentage: 65, color: "hsl(var(--fire-orange))" },
    { name: "Gravel", percentage: 22, color: "hsl(var(--safe-green))" },
    { name: "Decomposed Granite", percentage: 13, color: "hsl(var(--warning-amber))" },
  ],
  natural: [
    { name: "Rock Garden", percentage: 58, color: "hsl(var(--fire-orange))" },
    { name: "Decomposed Granite", percentage: 28, color: "hsl(var(--safe-green))" },
    { name: "Fire-Resistant Succulents", percentage: 14, color: "hsl(var(--warning-amber))" },
  ],
}
