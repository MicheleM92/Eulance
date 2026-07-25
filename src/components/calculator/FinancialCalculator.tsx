"use client";

import { useState } from "react";
import { Calculator, Euro, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";

export default function FinancialCalculator() {
  const [contractValue, setContractValue] = useState<number>(1200);
  const [isProTier, setIsProTier] = useState<boolean>(false);
  const [useExpressHire, setUseExpressHire] = useState<boolean>(false);
  const [useAiMatch, setUseAiMatch] = useState<boolean>(false);
  const [isLaunchPromo, setIsLaunchPromo] = useState<boolean>(true); // 0% launch fee vs 5% standard

  // Calculations
  const clientFeeRate = isProTier ? 0.05 : 0.15;
  const clientFeeAmount = contractValue * clientFeeRate;
  const proSubscription = isProTier ? 39 : 0;
  
  const addOnsCost = (useExpressHire ? 90 : 0) + (useAiMatch ? 15 : 0);
  const totalClientPayment = contractValue + clientFeeAmount + proSubscription + addOnsCost;

  const freelancerFeeRate = isLaunchPromo ? 0.0 : 0.05;
  const freelancerFeeAmount = contractValue * freelancerFeeRate;
  const freelancerPayout = contractValue - freelancerFeeAmount;

  const eulanceTotalRevenue = clientFeeAmount + proSubscription + addOnsCost + freelancerFeeAmount;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--color-eulance-border)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-soft)] text-[var(--color-eulance-navy)] flex items-center justify-center font-bold">
          <Calculator size={22} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Interactive Unit Economics Calculator</h3>
          <p className="text-xs text-[var(--color-eulance-muted)]">Test cash-flows, platform fees, and escrow float based on EULANCE business plan</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6 bg-[var(--color-eulance-soft)]/50 p-6 rounded-xl border border-[var(--color-eulance-border)]">
          {/* Contract Value Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[var(--color-eulance-navy)]">Contract Value (€)</label>
              <span className="text-lg font-extrabold text-[var(--color-eulance-blue)]">€{contractValue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="20000"
              step="100"
              value={contractValue}
              onChange={(e) => setContractValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-eulance-blue)]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>€200 (Micro)</span>
              <span>€1,200 (Avg contract)</span>
              <span>€20,000 (Enterprise)</span>
            </div>
          </div>

          {/* Client Plan Options */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">Client Subscription Tier</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsProTier(false)}
                className={`p-3 rounded-lg border text-left text-xs transition-all ${
                  !isProTier
                    ? "bg-white border-[var(--color-eulance-blue)] ring-2 ring-[var(--color-eulance-blue)]/20 font-bold text-[var(--color-eulance-navy)]"
                    : "bg-white/60 border-gray-200 text-gray-600"
                }`}
              >
                <div className="font-bold">Standard Client</div>
                <div className="text-[11px] text-gray-500">15% fee, Free account</div>
              </button>

              <button
                type="button"
                onClick={() => setIsProTier(true)}
                className={`p-3 rounded-lg border text-left text-xs transition-all ${
                  isProTier
                    ? "bg-white border-[var(--color-eulance-blue)] ring-2 ring-[var(--color-eulance-blue)]/20 font-bold text-[var(--color-eulance-navy)]"
                    : "bg-white/60 border-gray-200 text-gray-600"
                }`}
              >
                <div className="font-bold flex items-center gap-1">
                  Pro Tier <Sparkles size={12} className="text-[var(--color-eulance-gold)]" />
                </div>
                <div className="text-[11px] text-gray-500">5% fee + €39/mo</div>
              </button>
            </div>
          </div>

          {/* Add-ons Toggles */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">Platform Add-ons</label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
                <span className="font-medium text-[var(--color-eulance-navy)]">Express Hire (24h match)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--color-eulance-blue)]">+€90</span>
                  <input
                    type="checkbox"
                    checked={useExpressHire}
                    onChange={(e) => setUseExpressHire(e.target.checked)}
                    className="rounded text-[var(--color-eulance-blue)]"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
                <span className="font-medium text-[var(--color-eulance-navy)]">AI Best-Match Shortlist</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--color-eulance-blue)]">+€15</span>
                  <input
                    type="checkbox"
                    checked={useAiMatch}
                    onChange={(e) => setUseAiMatch(e.target.checked)}
                    className="rounded text-[var(--color-eulance-blue)]"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 cursor-pointer">
                <span className="font-medium text-emerald-900 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[var(--color-eulance-emerald)]" /> Freelancer Launch Promo (0% fee)
                </span>
                <input
                  type="checkbox"
                  checked={isLaunchPromo}
                  onChange={(e) => setIsLaunchPromo(e.target.checked)}
                  className="rounded text-[var(--color-eulance-emerald)]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Breakdown Output Column */}
        <div className="flex flex-col justify-between space-y-4 bg-[var(--color-eulance-navy)] text-white p-6 rounded-xl shadow-md">
          <div>
            <span className="text-xs font-bold text-[var(--color-eulance-gold)] uppercase tracking-wider block mb-4">
              Cash-Flow & Platform Breakdown
            </span>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/80">Client Deposits into Escrow</span>
                <span className="font-bold text-lg text-white">€{totalClientPayment.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-white/70 pl-3">
                <span>• Base Contract Value</span>
                <span>€{contractValue.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-white/70 pl-3">
                <span>• Client Fee ({isProTier ? "5%" : "15%"})</span>
                <span>€{clientFeeAmount.toLocaleString()}</span>
              </div>

              {addOnsCost > 0 && (
                <div className="flex justify-between items-center text-xs text-white/70 pl-3">
                  <span>• Selected Add-ons</span>
                  <span>€{addOnsCost}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 pb-2 border-b border-white/10">
                <span className="text-[var(--color-eulance-mint)] font-medium">Freelancer Receives Payout</span>
                <span className="font-extrabold text-lg text-[var(--color-eulance-mint)]">€{freelancerPayout.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-white/70 pl-3">
                <span>• Deducted Fee ({isLaunchPromo ? "0% Promo" : "5% Standard"})</span>
                <span>€{freelancerFeeAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10 mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[var(--color-eulance-gold)] uppercase">Total EULANCE Revenue</span>
              <span className="text-xl font-black text-[var(--color-eulance-gold)]">€{eulanceTotalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-white/70">
              Plus short-term interest earned on Escrow float while contract is active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
