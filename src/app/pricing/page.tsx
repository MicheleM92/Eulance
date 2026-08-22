"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EULANCE_FEE_CONFIG, calculateContractBreakdown } from "@/lib/config/fees";
import { CheckCircle2, Zap, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Euro } from "lucide-react";

export default function PricingPage() {
  const [contractValue, setContractValue] = useState<number>(1000);
  const [isClientPro, setIsClientPro] = useState<boolean>(false);
  const [isFreelancerFounder, setIsFreelancerFounder] = useState<boolean>(true);

  const breakdown = calculateContractBreakdown(contractValue, {
    isClientPro,
    isFreelancerFounder,
  });

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-eulance-mint)] text-[var(--color-eulance-navy)] text-xs font-extrabold uppercase tracking-wider mb-4">
            Transparent Pricing • No Hidden Costs
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-eulance-navy)] tracking-tight mb-4">
            Free to Join. We Earn Only When You Succeed.
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-eulance-muted)] leading-relaxed">
            No mandatory monthly subscriptions, no paid bidding connects. EULANCE connects European talent and companies with total transparency.
          </p>
        </div>

        {/* Interactive Fee Breakdown Calculator Simulator */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[var(--color-eulance-border)] mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Interactive Fee Simulator</h2>
              <p className="text-xs text-[var(--color-eulance-muted)]">Simulate exact cash flows for any contract size</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[var(--color-eulance-blue)] text-xs font-bold">
              Formula Configured: 15% Client / 5% Freelancer
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <label className="block text-xs font-extrabold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">
                Contract Agreed Amount (€)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={contractValue}
                  onChange={(e) => setContractValue(Number(e.target.value))}
                  className="w-full accent-[var(--color-eulance-navy)]"
                />
                <input
                  type="number"
                  value={contractValue}
                  onChange={(e) => setContractValue(Math.max(1, Number(e.target.value)))}
                  className="w-28 p-3 border border-gray-300 rounded-xl font-bold text-center text-lg text-[var(--color-eulance-navy)]"
                />
              </div>

              {/* Toggles */}
              <div className="mt-6 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isClientPro}
                    onChange={(e) => setIsClientPro(e.target.checked)}
                    className="w-4 h-4 accent-[var(--color-eulance-navy)] rounded"
                  />
                  Client has Pro Plan (Reduced 5% fee)
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isFreelancerFounder}
                    onChange={(e) => setIsFreelancerFounder(e.target.checked)}
                    className="w-4 h-4 accent-[var(--color-eulance-emerald)] rounded"
                  />
                  Freelancer is Founder Member (0% fee promo)
                </label>
              </div>
            </div>

            {/* Simulated Receipt Card */}
            <div className="bg-[var(--color-eulance-soft)] p-6 rounded-2xl border border-gray-200 space-y-4 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Agreed Contract Value:</span>
                <span className="font-mono font-bold text-base text-gray-900">€{breakdown.contractAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div>
                  <span className="font-semibold text-gray-700 block">Client EULANCE Fee ({breakdown.clientFeeRate}%):</span>
                  <span className="text-[10px] text-gray-400">Added to escrow deposit</span>
                </div>
                <span className="font-mono font-bold text-blue-700">+€{breakdown.clientFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200 bg-blue-50/70 p-2 rounded-lg">
                <span className="font-extrabold text-[var(--color-eulance-navy)]">Total Client Deposit into Escrow:</span>
                <span className="font-mono font-black text-lg text-[var(--color-eulance-navy)]">€{breakdown.clientTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div>
                  <span className="font-semibold text-gray-700 block">Freelancer Fee ({breakdown.freelancerFeeRate}%):</span>
                  <span className="text-[10px] text-gray-400">Deducted upon payout</span>
                </div>
                <span className="font-mono font-bold text-emerald-700">-€{breakdown.freelancerFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-2 bg-emerald-50/70 p-2 rounded-lg">
                <span className="font-extrabold text-emerald-900">Net Freelancer Payout:</span>
                <span className="font-mono font-black text-lg text-emerald-700">€{breakdown.freelancerPayout.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-100">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-xl text-sm hover:bg-[var(--color-eulance-blue)] transition-colors shadow-sm"
            >
              Test This Calculation in Demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* Freelancers Tier */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px] mb-4">
                FOR FREELANCERS
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-2">Standard Talent</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-[var(--color-eulance-navy)]">5%</span>
                <span className="text-xs text-[var(--color-eulance-muted)]">of contract value upon payout</span>
              </div>
              <p className="text-xs text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                Free forever to join, create profile, and submit unlimited proposals. No connect credits required.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-gray-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  0% Launch Promo for First 500 Founders
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  Licensed EU Escrow Payment Protection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  Auto Reverse-Charge VAT Invoices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  eIDAS Certified Contract Generator
                </li>
              </ul>
            </div>
            <Link
              href="/demo/freelancer"
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-center text-xs hover:bg-emerald-700 transition-colors"
            >
              Start as Freelancer
            </Link>
          </div>

          {/* Client Standard */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[var(--color-eulance-navy)] shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-eulance-navy)] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[var(--color-eulance-navy)] font-extrabold text-[11px] mb-4">
                FOR CLIENTS
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-2">Standard Client</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-[var(--color-eulance-navy)]">15%</span>
                <span className="text-xs text-[var(--color-eulance-muted)]">charged on successful hire</span>
              </div>
              <p className="text-xs text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                Free to post projects and browse talent. Zero upfront commitment before you find the right talent.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-gray-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-navy)] shrink-0" />
                  Unlimited Job Posting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-navy)] shrink-0" />
                  Verified Pan-European Talent Pool
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-navy)] shrink-0" />
                  Escrow Funds Custody & Milestone Release
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-navy)] shrink-0" />
                  Automatic EU VAT Accounting
                </li>
              </ul>
            </div>
            <Link
              href="/demo/client"
              className="w-full py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-xl text-center text-xs hover:bg-[var(--color-eulance-blue)] transition-colors"
            >
              Post Project Now
            </Link>
          </div>

          {/* Client Pro Tier */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-extrabold text-[11px] mb-4">
                FOR HIGH VOLUME HIRING
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-2">Client Pro Plan</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-[var(--color-eulance-navy)]">€39</span>
                <span className="text-xs text-[var(--color-eulance-muted)]">/mo + 5% fee per contract</span>
              </div>
              <p className="text-xs text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                Designed for scaleups and enterprises hiring multiple freelancers per quarter. Saves up to 66% on fees.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-gray-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                  Reduced 5% Client Transaction Fee
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                  Priority Account Support & Dedicated Manager
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                  Advanced Multi-User Team Roles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                  Custom Contract & Legal Templates
                </li>
              </ul>
            </div>
            <Link
              href="/demo/client"
              className="w-full py-3 bg-purple-700 text-white font-bold rounded-xl text-center text-xs hover:bg-purple-800 transition-colors"
            >
              Explore Pro Plan
            </Link>
          </div>
        </div>

        {/* Add-on Services Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-[var(--color-eulance-navy)] mb-6 text-center">
            Optional Power Add-Ons (Pay-Per-Use)
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--color-eulance-soft)] border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-[var(--color-eulance-navy)]">AI Best Match</span>
                <span className="font-mono font-black text-base text-[var(--color-eulance-navy)]">€15 / use</span>
              </div>
              <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                Algorithmic shortlist ranking top 5 verified EU professionals matched to your project stack in under 60 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-eulance-soft)] border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-[var(--color-eulance-navy)]">Express Hire</span>
                <span className="font-mono font-black text-base text-[var(--color-eulance-navy)]">€90 / use</span>
              </div>
              <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                Priority matching & active concierge outreach to place verified talent within 24 hours for urgent missions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
