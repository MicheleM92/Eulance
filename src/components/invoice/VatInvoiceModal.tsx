"use client";

import { X, Download, Printer, ShieldCheck, Euro, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface VatInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientVat: string;
  freelancerName: string;
  freelancerVat: string;
  projectName: string;
  amount: number;
}

export default function VatInvoiceModal({
  isOpen,
  onClose,
  clientName,
  clientVat,
  freelancerName,
  freelancerVat,
  projectName,
  amount
}: VatInvoiceModalProps) {
  if (!isOpen) return null;

  const clientFee = amount * 0.15;
  const totalClientPay = amount + clientFee;
  const freelancerFee = amount * 0.05;
  const freelancerPayout = amount - freelancerFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[var(--color-eulance-border)]"
      >
        {/* Header */}
        <div className="bg-[var(--color-eulance-navy)] text-white p-5 flex justify-between items-center print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-emerald)] flex items-center justify-center">
              <Euro size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">EU VAT Compliant Invoice Preview</h3>
              <p className="text-xs text-white/80">Cross-Border Reverse Charge (EU Directive 2006/112/EC)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-semibold flex items-center gap-1">
              <Printer size={16} /> Print
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1 bg-white">
          
          {/* Top Invoice Banner */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-[var(--color-eulance-navy)] text-[var(--color-eulance-gold)] font-bold rounded flex items-center justify-center text-lg">
                  E
                </div>
                <span className="font-extrabold text-2xl text-[var(--color-eulance-navy)] tracking-tight">EULANCE</span>
              </div>
              <p className="text-xs text-gray-500">Europe's Fair Freelance Platform B.V.</p>
              <p className="text-xs text-gray-500">EU VAT ID: EU372019481</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-md uppercase mb-2">
                PAID & RELEASED
              </span>
              <h2 className="text-xl font-bold text-[var(--color-eulance-navy)]">INVOICE #INV-2027-{Math.floor(1000 + Math.random() * 9000)}</h2>
              <p className="text-xs text-gray-500">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Client & Freelancer Grid */}
          <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200 text-xs">
            <div>
              <span className="font-bold text-gray-400 uppercase tracking-wider block mb-2">Billed To (Client):</span>
              <p className="font-bold text-sm text-[var(--color-eulance-navy)]">{clientName}</p>
              <p className="text-gray-600">EU VAT ID: <strong className="text-gray-800">{clientVat}</strong></p>
              <p className="text-gray-600">Location: Lisbon, Portugal (EU)</p>
            </div>
            <div>
              <span className="font-bold text-gray-400 uppercase tracking-wider block mb-2">Service Provider (Freelancer):</span>
              <p className="font-bold text-sm text-[var(--color-eulance-navy)]">{freelancerName}</p>
              <p className="text-gray-600">EU VAT ID: <strong className="text-gray-800">{freelancerVat}</strong></p>
              <p className="text-gray-600">Location: Milan, Italy (EU)</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">VAT Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-[var(--color-eulance-navy)]">{projectName}</p>
                    <p className="text-gray-500 text-[11px]">Independent Contractor Services (EU Direct Delivery)</p>
                  </td>
                  <td className="p-3 text-center text-gray-600 font-medium">0% (Reverse Charge)</td>
                  <td className="p-3 text-right font-bold">€{amount.toLocaleString()}.00</td>
                </tr>
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-[var(--color-eulance-navy)]">EULANCE Client Platform Fee (15%)</p>
                    <p className="text-gray-500 text-[11px]">Escrow handling, smart contract verification, legal compliance</p>
                  </td>
                  <td className="p-3 text-center text-gray-600 font-medium">20% (Standard EU)</td>
                  <td className="p-3 text-right font-bold text-[var(--color-eulance-blue)]">€{clientFee.toLocaleString()}.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Breakdown & Note */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 pt-4 border-t border-gray-200">
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 max-w-md text-xs text-[var(--color-eulance-navy)]">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <ShieldCheck size={16} className="text-[var(--color-eulance-emerald)]" />
                Reverse Charge Mechanism Applied
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                VAT to be accounted for by the recipient as per Article 196 of the EU VAT Directive 2006/112/EC. Transacting within EULANCE ensures compliance across all 27 EU member states.
              </p>
            </div>

            <div className="w-full md:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">€{amount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee (15%)</span>
                <span className="font-semibold">€{clientFee.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[var(--color-eulance-navy)] pt-2 border-t border-gray-300">
                <span>Total Paid</span>
                <span>€{totalClientPay.toLocaleString()}.00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end gap-3 print:hidden">
          <button onClick={onClose} className="px-6 py-2.5 bg-[var(--color-eulance-navy)] text-white font-bold text-xs rounded-lg hover:bg-blue-900 transition-colors">
            Close Invoice
          </button>
        </div>
      </motion.div>
    </div>
  );
}
