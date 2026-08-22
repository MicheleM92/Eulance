"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { ArrowLeft, ShieldCheck, CheckCircle2, FileText, Lock, PenTool, Sparkles, Building2, User } from "lucide-react";

export default function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { contracts, signContract, activeRole } = useDemoState();

  const contract = contracts.find((c) => c.id === resolvedParams.id) || contracts[0];

  const isClientSigned = !!contract.signedByClientAt;
  const isFreelancerSigned = !!contract.signedByFreelancerAt;
  const isFullySigned = isClientSigned && isFreelancerSigned;

  const handleSign = () => {
    signContract(contract.id, activeRole);
  };

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex justify-between items-center no-print">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[var(--color-eulance-navy)] transition-colors"
            >
              <ArrowLeft size={16} /> Back to Contracts
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-eulance-navy)] text-white font-bold rounded-xl text-xs hover:bg-[var(--color-eulance-blue)] transition-colors shadow-sm"
            >
              <FileText size={16} /> Download PDF
            </button>
          </div>

          {/* Legal Notice Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-950 font-medium no-print">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-amber-600 shrink-0" />
              <span>
                <strong>Demo-Generated Contract Notice:</strong> This document is generated for MVP demonstration purposes under EU commercial standards.
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 font-extrabold text-[10px] uppercase">
              eIDAS Simulation
            </span>
          </div>

          {/* Main Contract Document Card */}
          <div className="print-container bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-300 space-y-8 text-xs text-gray-800">
            
            {/* Header */}
            <div className="flex justify-between items-start pb-6 border-b border-gray-200">
              <div>
                <div className="inline-block px-3 py-1 rounded bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-[10px] mb-2 uppercase">
                  EU Cross-Border Service Agreement
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-[var(--color-eulance-navy)]">{contract.projectName}</h1>
                <p className="text-gray-500 text-xs mt-1">Ref #: {contract.id.toUpperCase()} • Jurisdiction: {contract.jurisdiction}</p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black font-mono text-[var(--color-eulance-navy)] block">€{contract.amount.toLocaleString()}</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mt-1">
                  Escrow Status: {contract.escrowStatus}
                </span>
              </div>
            </div>

            {/* Parties Grid */}
            <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <div>
                <span className="font-extrabold text-[10px] text-gray-400 uppercase block mb-1">PARTY A — CLIENT</span>
                <strong className="text-base font-black text-[var(--color-eulance-navy)] block">{contract.clientName}</strong>
                <p className="text-gray-600">Jurisdiction: {contract.clientCountry}</p>
                <p className="font-mono text-gray-600">VAT Reg: {contract.clientVat}</p>
                <div className="mt-3">
                  {isClientSigned ? (
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 size={14} /> Signed by Client on {contract.signedByClientAt}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold text-[11px]">Signature Pending</span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-extrabold text-[10px] text-gray-400 uppercase block mb-1">PARTY B — FREELANCER</span>
                <strong className="text-base font-black text-[var(--color-eulance-navy)] block">{contract.freelancerName}</strong>
                <p className="text-gray-600">Jurisdiction: {contract.freelancerCountry}</p>
                <p className="font-mono text-gray-600">VAT Reg: {contract.freelancerVat}</p>
                <div className="mt-3">
                  {isFreelancerSigned ? (
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 size={14} /> Signed by Freelancer on {contract.signedByFreelancerAt}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold text-[11px]">Signature Pending</span>
                  )}
                </div>
              </div>
            </div>

            {/* Key Clauses & Scope */}
            <div className="space-y-4 leading-relaxed font-normal">
              <h3 className="font-extrabold text-sm text-[var(--color-eulance-navy)] uppercase tracking-wider">1. Scope of Work & Deliverables</h3>
              <p className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                The Freelancer agrees to perform technical services for "{contract.projectName}" including design, frontend/backend code implementation, API integration, and testing as agreed in EULANCE messaging stream.
              </p>

              <h3 className="font-extrabold text-sm text-[var(--color-eulance-navy)] uppercase tracking-wider">2. Commercial Terms & Escrow Custody</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span>Agreed Contract Value:</span>
                  <span className="font-mono font-bold">€{contract.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Client EULANCE Fee (15%):</span>
                  <span className="font-mono font-bold text-blue-700">+€{contract.clientFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-[var(--color-eulance-navy)]">
                  <span>Total Client Deposit Paid into Escrow:</span>
                  <span className="font-mono text-base">€{contract.clientTotalPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 pt-1 font-bold items-center">
                  <span>
                    Freelancer Net Payout 
                    {contract.freelancerFee === 0 ? (
                      <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full">
                        <span className="line-through text-emerald-600/60 mr-1">5% Fee</span>
                        0% Founder Promo
                      </span>
                    ) : (
                      <span className="ml-2 font-normal text-gray-500">(5% Fee)</span>
                    )}
                  </span>
                  <span className="font-mono text-base">€{contract.freelancerNetPayout.toLocaleString()}</span>
                </div>
              </div>

              <h3 className="font-extrabold text-sm text-[var(--color-eulance-navy)] uppercase tracking-wider">3. Intellectual Property & EU VAT Treatment</h3>
              <p className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                Upon full release of funds from Escrow, all Intellectual Property and code copyright automatically transfer to Client. Cross-border EU VAT is governed by Article 196 Reverse-Charge rules.
              </p>
            </div>

            {/* e-Signature Panel */}
            <div className="p-8 rounded-3xl bg-[var(--color-eulance-soft)] border-2 border-dashed border-[var(--color-eulance-navy)]/30 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[var(--color-eulance-navy)] flex items-center gap-2">
                    <PenTool size={20} className="text-[var(--color-eulance-navy)]" /> Simulated eIDAS Electronic Signatures
                  </h3>
                  <p className="text-xs text-gray-500">Cryptographically verified digital signature simulation</p>
                </div>
                {isFullySigned && (
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-xs">
                    ✓ CONTRACT FULLY EXECUTED & ACTIVE
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Client Signature Box */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
                  <span className="font-extrabold text-xs text-[var(--color-eulance-navy)] block">Client Signature ({contract.clientName})</span>
                  {isClientSigned ? (
                    <div className="p-3 bg-emerald-50 text-emerald-900 font-serif italic text-base rounded-xl border border-emerald-200">
                      Signed: {contract.clientName} (PT509876543)
                    </div>
                  ) : (
                    <button
                      onClick={handleSign}
                      className="w-full py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-xl text-xs no-print"
                    >
                      Sign as Client
                    </button>
                  )}
                </div>

                {/* Freelancer Signature Box */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
                  <span className="font-extrabold text-xs text-[var(--color-eulance-navy)] block">Freelancer Signature ({contract.freelancerName})</span>
                  {isFreelancerSigned ? (
                    <div className="p-3 bg-emerald-50 text-emerald-900 font-serif italic text-base rounded-xl border border-emerald-200">
                      Signed: {contract.freelancerName} (IT09876543210)
                    </div>
                  ) : (
                    <button
                      onClick={handleSign}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-xs no-print"
                    >
                      Sign as Freelancer ({activeRole === "freelancer" ? "Click to Sign" : "Switch to Freelancer Mode to Sign"})
                    </button>
                  )}
                </div>

              </div>

              {isFullySigned && (
                <div className="text-center pt-4 no-print">
                  <Link
                    href={`/demo/workroom/${contract.id}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-md"
                  >
                    Enter Commercial Workroom <CheckCircle2 size={16} />
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
