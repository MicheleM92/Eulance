"use client";

import React from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { FileText, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContractsOverviewPage() {
  const { contracts } = useDemoState();

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-xs mb-3">
              eIDAS Certified EU Contract Engine
            </div>
            <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
              Commercial Contract Management
            </h1>
            <p className="text-xs text-[var(--color-eulance-muted)] mt-1">
              Legally compliant cross-border commercial agreements auto-generated across all 27 EU member states.
            </p>
          </div>

          {/* Contracts List */}
          <div className="space-y-4">
            {contracts.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-[10px]">
                      {c.jurisdiction}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      Status: {c.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                      Escrow: {c.escrowStatus}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">{c.projectName}</h3>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                    <div>
                      <span className="font-bold text-gray-400 block text-[10px]">CLIENT</span>
                      <span>{c.clientName} ({c.clientCountry})</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-400 block text-[10px]">FREELANCER</span>
                      <span>{c.freelancerName} ({c.freelancerCountry})</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 w-full md:w-auto shrink-0">
                  <div className="text-left md:text-right font-mono">
                    <span className="text-2xl font-black text-[var(--color-eulance-navy)] block">€{c.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 font-semibold block">Client Paid: €{c.clientTotalPaid.toLocaleString()}</span>
                  </div>

                  <Link
                    href={`/demo/contracts/${c.id}`}
                    className="px-6 py-3 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-extrabold rounded-xl text-xs transition-colors shadow-xs text-center flex items-center justify-center gap-2"
                  >
                    View & Sign Contract <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
