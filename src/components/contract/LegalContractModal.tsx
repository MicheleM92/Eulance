"use client";

import { useState } from "react";
import { FileText, X, CheckCircle2, ShieldCheck, Download, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface LegalContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: (signature: string) => void;
  clientName: string;
  freelancerName: string;
  projectTitle: string;
  contractAmount: number;
}

export default function LegalContractModal({
  isOpen,
  onClose,
  onSign,
  clientName,
  freelancerName,
  projectTitle,
  contractAmount
}: LegalContractModalProps) {
  const [jurisdiction, setJurisdiction] = useState<string>("PT-IT");
  const [signature, setSignature] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signature.trim() && agreed) {
      onSign(signature);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[var(--color-eulance-border)]"
      >
        {/* Header */}
        <div className="bg-[var(--color-eulance-navy)] text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-blue)] flex items-center justify-center">
              <FileText size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">EU Independent Contractor Agreement</h3>
              <p className="text-xs text-white/80">Auto-generated & EU Jurisdiction Compliant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Jurisdiction Picker */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <span className="text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider block mb-1">
                Applicable EU Jurisdiction
              </span>
              <span className="text-sm text-[var(--color-eulance-muted)]">
                Selected Legal Template: Cross-Border EU Standard
              </span>
            </div>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="bg-white border border-[var(--color-eulance-border)] rounded-lg text-sm px-3 py-2 font-medium text-[var(--color-eulance-navy)] focus:outline-none focus:border-[var(--color-eulance-blue)]"
            >
              <option value="PT-IT">Portugal / Italy (Iberia-Core EU)</option>
              <option value="ES-FR">Spain / France (Iberia-Core EU)</option>
              <option value="DE-PT">Germany / Portugal (Core EU)</option>
              <option value="EU-GENERAL">General EU Directive 2019/1152</option>
            </select>
          </div>

          {/* Legal Text Scroll Box */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-xs font-mono leading-relaxed space-y-3 text-gray-700 h-64 overflow-y-auto shadow-inner">
            <p className="font-bold text-sm text-[var(--color-eulance-navy)] font-sans border-b pb-2 border-gray-200">
              EUROPEAN UNION INDEPENDENT SERVICES CONTRACT #EUL-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p><strong>1. PARTIES:</strong></p>
            <p>Client: {clientName} (EU VAT Reg ID: PT509876543)</p>
            <p>Contractor: {freelancerName} (EU VAT Reg ID: IT09876543210)</p>
            
            <p><strong>2. ENGAGEMENT & SCOPE:</strong></p>
            <p>The Client hereby engages Contractor to perform services for project titled "{projectTitle}". Deliverables shall strictly conform to agreed technical specs.</p>
            
            <p><strong>3. COMPENSATION & ESCROW:</strong></p>
            <p>Total Agreed Fixed Compensation: €{contractAmount.toLocaleString()}.00 EUR. Client agrees to lock 100% of funds plus 15% platform fee into EULANCE Licensed Escrow Account prior to commencement of work.</p>
            
            <p><strong>4. INTELLECTUAL PROPERTY:</strong></p>
            <p>Upon unconditional release of escrow funds by Client, Contractor transfers all IP rights, source code, and assets to Client worldwide in perpetuity.</p>

            <p><strong>5. DISPUTE RESOLUTION & APPLICABLE LAW:</strong></p>
            <p>This contract is governed under EU Law and the designated Member State jurisdiction. Platform arbitration via EULANCE Dispute Resolution Service shall serve as primary binding mediator.</p>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center text-xs text-[var(--color-eulance-muted)]">
            <span className="flex items-center gap-1"><ShieldCheck className="text-[var(--color-eulance-emerald)]" size={16} /> Encrypted Digital Hash SHA-256</span>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1 font-medium text-[var(--color-eulance-navy)]">
                <Copy size={14} /> {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>
          </div>

          {/* Signature Box */}
          <form onSubmit={handleSignSubmit} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
            <h4 className="font-bold text-sm text-[var(--color-eulance-navy)] flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[var(--color-eulance-blue)]" />
              Digital e-Signature (eIDAS Compliant)
            </h4>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Type Full Legal Name to Sign
              </label>
              <input
                type="text"
                required
                placeholder="e.g. TechNova Solutions Authorized Signatory"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white font-serif italic focus:outline-none focus:border-[var(--color-eulance-blue)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agree"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded border-gray-300 text-[var(--color-eulance-blue)] focus:ring-[var(--color-eulance-blue)]"
              />
              <label htmlFor="agree" className="text-xs text-gray-600">
                I agree to the legally binding terms of this contract and the EULANCE Escrow framework.
              </label>
            </div>

            <button
              type="submit"
              disabled={!signature.trim() || !agreed}
              className="w-full py-3 bg-[var(--color-eulance-blue)] hover:bg-[var(--color-eulance-navy)] disabled:opacity-50 text-white rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Sign Contract & Continue
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
