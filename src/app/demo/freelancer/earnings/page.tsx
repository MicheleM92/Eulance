"use client";

import React, { useState } from "react";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { Coins, FileText, Download, ShieldCheck, CheckCircle2, Building2, User } from "lucide-react";

export default function EarningsPage() {
  const { contracts, activeContract, freelancers } = useDemoState();
  const currentFreelancer = freelancers[0]; // Marco Rossi

  const completedContracts = contracts.filter((c) => c.status === "Completed");

  const grossEarnings = completedContracts.reduce((sum, c) => sum + c.amount, 0) + 15000;
  const eulanceFees = completedContracts.reduce((sum, c) => sum + c.freelancerFee, 0); // 0 under founder promo
  const netEarnings = grossEarnings - eulanceFees;
  const pendingEscrow = activeContract && activeContract.escrowStatus === "Funded" ? activeContract.freelancerNetPayout : 0;

  const [selectedInvoiceContract, setSelectedInvoiceContract] = useState(contracts[0]);

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mb-3">
              Financial Summary & Auto EU VAT Reports
            </div>
            <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
              Earnings & Cross-Border Invoices
            </h1>
            <p className="text-xs text-[var(--color-eulance-muted)] mt-1">
              Real-time income tracking, platform fee statements, and compliant reverse-charge VAT invoices across 27 EU member states.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Gross Earnings</div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">€{grossEarnings.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500 font-medium mt-1">Total contract value</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">EULANCE Fees (0%)</div>
              <div className="text-2xl font-black text-emerald-600">€{eulanceFees.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-1">Founder Promo Active</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Net Payouts</div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">€{netEarnings.toLocaleString()}</div>
              <div className="text-[10px] text-blue-600 font-medium mt-1">Disbursed to bank account</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Pending Escrow</div>
              <div className="text-2xl font-black text-amber-500">€{pendingEscrow.toLocaleString()}</div>
              <div className="text-[10px] text-amber-600 font-medium mt-1">Protected in custody</div>
            </div>
          </div>

          {/* Invoice Preview Generator Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Col: Contract History Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">Select Contract Invoice</h2>
              <div className="space-y-3">
                {contracts.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedInvoiceContract(c)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedInvoiceContract.id === c.id
                        ? "bg-white border-[var(--color-eulance-navy)] shadow-md ring-2 ring-[var(--color-eulance-navy)]/10"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm text-[var(--color-eulance-navy)]">{c.projectName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Client: {c.clientName} ({c.clientCountry})</p>
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-gray-800 pt-2 border-t border-gray-100">
                      <span>Value: €{c.amount.toLocaleString()}</span>
                      <span className="text-emerald-700">Net: €{c.freelancerNetPayout.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 2 Cols: Interactive VAT Reverse-Charge Invoice Preview */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">EU VAT Compliant Invoice Preview</h2>
                <button
                  onClick={() => alert("Simulating invoice PDF download...")}
                  className="px-4 py-2 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Download size={14} /> Download Tax Invoice (PDF)
                </button>
              </div>

              {/* Invoice Visual Sheet */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-300 space-y-6 text-xs text-gray-800">
                
                {/* Invoice Top Strip */}
                <div className="flex justify-between items-start pb-6 border-b border-gray-200">
                  <div>
                    <div className="font-black text-2xl text-[var(--color-eulance-navy)] tracking-tight">EULANCE INVOICE</div>
                    <span className="text-[10px] text-gray-500 font-mono">Invoice #: EU-INV-2026-08942</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded bg-blue-50 text-[var(--color-eulance-navy)]">
                      EU Cross-Border Reverse-Charge
                    </span>
                    <p className="text-[10px] text-gray-500 mt-1">Issue Date: 2026-08-22</p>
                  </div>
                </div>

                {/* Seller & Buyer Grid */}
                <div className="grid md:grid-cols-2 gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Freelancer (Seller)</span>
                    <strong className="text-sm font-extrabold text-[var(--color-eulance-navy)] block">{currentFreelancer.name}</strong>
                    <p className="text-gray-600">{currentFreelancer.city}, {currentFreelancer.country}</p>
                    <p className="font-mono text-gray-600 mt-1">VAT Number: {currentFreelancer.vatNumber}</p>
                  </div>

                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Client (Buyer)</span>
                    <strong className="text-sm font-extrabold text-[var(--color-eulance-navy)] block">{selectedInvoiceContract.clientName}</strong>
                    <p className="text-gray-600">{selectedInvoiceContract.clientCountry}</p>
                    <p className="font-mono text-gray-600 mt-1">VAT Number: {selectedInvoiceContract.clientVat}</p>
                  </div>
                </div>

                {/* Line Item Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase">
                        <th className="py-2">Description</th>
                        <th className="py-2 text-right">Agreed Value</th>
                        <th className="py-2 text-right">VAT Rate</th>
                        <th className="py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 font-semibold text-[var(--color-eulance-navy)]">
                          {selectedInvoiceContract.projectName}
                        </td>
                        <td className="py-3 text-right font-mono">€{selectedInvoiceContract.amount.toLocaleString()}</td>
                        <td className="py-3 text-right font-mono">0% (Reverse Charge)</td>
                        <td className="py-3 text-right font-mono font-bold">€{selectedInvoiceContract.amount.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* VAT Declaration Box */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 leading-snug">
                  <strong className="block mb-0.5">EU VAT Statutory Compliance Note:</strong>
                  VAT subject to reverse-charge mechanism in accordance with Article 196 of the EU VAT Directive 2006/112/EC. VAT to be accounted for by the recipient company ({selectedInvoiceContract.clientName}).
                </div>

                {/* Totals Summary */}
                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <div className="w-64 space-y-2 font-mono">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>€{selectedInvoiceContract.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>EU Reverse VAT (0%):</span>
                      <span>€0.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>EULANCE Fee (0% Founder):</span>
                      <span>€0.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-[var(--color-eulance-navy)] pt-2 border-t border-gray-300">
                      <span>Total Payout:</span>
                      <span>€{selectedInvoiceContract.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
