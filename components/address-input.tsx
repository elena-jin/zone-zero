"use client"

import { useState } from "react"
import { Flame, MapPin } from "lucide-react"

export default function AddressInput({
  onSubmit,
}: {
  onSubmit: (address: string) => void
}) {
  const [address, setAddress] = useState("")

  const handleSubmit = () => {
    if (!address.trim()) return
    onSubmit(address.trim())
  }

  return (
    <section className="min-h-dvh flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-2xl w-full text-center flex flex-col items-center gap-12">
        {/* Branding */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-destructive font-black tracking-[0.4em] uppercase text-[10px]">
            Digital Fire Marshal
          </span>
          <h1 className="text-7xl md:text-9xl font-display font-extrabold tracking-tighter leading-none uppercase">
            ZONE<span className="text-destructive">ZERO</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium max-w-lg">
            California LE-100 Compliant AI Inspection Engine
          </p>
        </div>

        {/* Input Card */}
        <div className="glass rounded-[2rem] p-8 md:p-12 w-full text-left relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-destructive/10 blur-[100px] pointer-events-none" />

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="address-input"
                className="text-[10px] font-bold text-muted-foreground uppercase ml-1 flex items-center gap-2"
              >
                <MapPin className="h-3 w-3" />
                Target Address
              </label>
              <input
                id="address-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="e.g. 123 Paradise Ln, Malibu, CA"
                className="w-full bg-secondary/50 border border-border rounded-2xl p-5 outline-none focus:border-destructive text-lg font-medium transition-all text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!address.trim()}
              className="w-full py-5 bg-destructive rounded-2xl font-extrabold uppercase tracking-widest shadow-2xl shadow-destructive/30 hover:scale-[1.01] active:scale-[0.98] transition-all text-lg text-destructive-foreground disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <Flame className="h-5 w-5" />
              Engage System Scan
            </button>
          </div>
        </div>

        {/* Powered by */}
        <p className="text-muted-foreground/40 text-xs tracking-widest uppercase">
          Powered by Gemini VLM + Google Street View
        </p>
      </div>
    </section>
  )
}
