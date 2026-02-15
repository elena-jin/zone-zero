"use client"

import { useRef } from "react"
import { Printer, RotateCcw } from "lucide-react"
import type { InspectionReport } from "@/components/app-shell"

export default function ComplianceReport({
  address,
  report,
  onRestart,
}: {
  address: string
  report: InspectionReport | null
  onRestart: () => void
}) {
  const reportId = useRef(
    "0x" + Math.random().toString(16).substring(2, 10).toUpperCase()
  )

  const violationCount = report
    ? report.checklist.filter((i) => i.status === "Violation").length
    : 0

  return (
    <section className="min-h-dvh flex items-center justify-center py-12 md:py-20 px-4 md:px-6 animate-in fade-in duration-700">
      <div className="bg-foreground text-background p-8 md:p-16 max-w-[1000px] w-full relative shadow-inner overflow-hidden border-[6px] border-background/20 font-sans print:border-background">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-background pb-6 mb-10 gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none text-background">
              Compliance Certificate
            </h1>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-background/60">
              State of California | PRC 4291 Digital Audit
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-background text-foreground flex items-center justify-center font-black text-xl md:text-2xl rounded-full">
              {violationCount === 0 ? "SAFE" : "RISK"}
            </div>
            <p className="text-[10px] font-black uppercase text-background/50">
              ID: {reportId.current}
            </p>
          </div>
        </div>

        {/* Address + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-background/20 mb-10">
          <div className="p-6 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-background/20 bg-background/5">
            <p className="text-[10px] font-black uppercase text-background/40 mb-2">
              Validated Location
            </p>
            <p className="text-lg md:text-2xl font-black uppercase leading-tight text-background">
              {address || "UNSPECIFIED"}
            </p>
          </div>
          <div className="p-6 md:p-8 bg-background/5">
            <p className="text-[10px] font-black uppercase text-background/40 mb-2">
              Audit Status
            </p>
            <p className="text-lg md:text-2xl font-black uppercase text-green-700">
              {violationCount === 0 ? "FULLY COMPLIANT" : `${violationCount} VIOLATIONS FOUND`}
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="p-6 md:p-8 bg-background/5 border border-background/10 italic text-base md:text-lg leading-relaxed text-background/80 mb-8">
          {'"'}This digital audit verifies that the property structure has been assessed against the stringent requirements of Zone Zero defensible space, identifying risks and recommending mitigation strategies to significantly reduce ignition probability under typical wildfire ember-cast conditions.{'"'}
        </div>

        {/* Checklist Summary */}
        {report && (
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase text-background/40 mb-4">
              Inspection Items
            </p>
            <div className="flex flex-col gap-2">
              {report.checklist.map((item, i) => (
                <div
                  key={`${item.code}-${i}`}
                  className="flex items-center justify-between p-3 border border-background/10"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-[10px] font-black text-background/50 uppercase shrink-0">
                      {item.code}
                    </span>
                    <span className="text-xs font-medium text-background/70 truncate">
                      {item.note}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase shrink-0 ml-3 ${
                      item.status === "Compliant" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Corrections */}
        {report && (
          <div className="p-6 bg-background/5 border border-background/10 mb-8">
            <p className="text-[10px] font-black uppercase text-background/40 mb-3">
              Required Remediation
            </p>
            <p className="text-sm font-medium text-background/80 leading-relaxed">
              {report.corrections}
            </p>
          </div>
        )}

        {/* Seal + Signature */}
        <div className="grid grid-cols-2 gap-10 mb-10">
          <div>
            <p className="text-[10px] font-black uppercase mb-4 text-background/30">
              Marshal Seal
            </p>
            <div className="w-28 h-28 md:w-32 md:h-32 border-4 border-dashed border-background/15 rounded-full flex items-center justify-center text-[10px] font-black text-background/20 rotate-12">
              CAL-FIRE-AI
            </div>
          </div>
          <div className="text-right pt-16 md:pt-20">
            <p className="text-[10px] font-black uppercase border-t-2 border-background pt-2 text-background/60">
              Digital Signature: ZONEZERO_AI_V2.5
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 py-5 bg-background text-foreground font-extrabold rounded-2xl uppercase tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Printer className="h-5 w-5" />
            Download Protocol PDF
          </button>
          <button
            onClick={onRestart}
            className="py-5 px-8 border-2 border-background/30 text-background font-extrabold rounded-2xl uppercase tracking-widest hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            New Scan
          </button>
        </div>
      </div>
    </section>
  )
}
