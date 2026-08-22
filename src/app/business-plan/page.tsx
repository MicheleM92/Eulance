"use client";

import { FileText, Map, Target, TrendingUp, ShieldAlert, Coins, Users, ArrowRight, ShieldCheck, Download, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import FinancialCalculator from "@/components/calculator/FinancialCalculator";

export default function BusinessPlan() {
  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xs border border-[var(--color-eulance-border)] mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-eulance-navy)] text-white text-xs font-bold uppercase tracking-wider">
              <Star size={12} className="fill-[var(--color-eulance-yellow)] text-[var(--color-eulance-yellow)]" />
              Executive Summary & Strategy (2027–2030)
            </div>

            {/* Direct PDF Access Button */}
            <a
              href="/EULANCE_Business_Plan_v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[var(--color-eulance-navy)] border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors shadow-2xs"
            >
              <Download size={14} className="text-[var(--color-eulance-navy)]" />
              Original PDF Document (308 KB)
              <ExternalLink size={12} />
            </a>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-eulance-navy)] mb-6 tracking-tight">
            EULANCE: Europe's Fair Freelance Platform
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-eulance-muted)] leading-relaxed">
            Connecting European companies and independent professionals through a fast, transparent, and legally compliant marketplace. Built around a transaction fee model: free to join, 15% client side fee upon successful completion, and 5% freelancer side fee (0% launch promo for founding talent).
          </p>
        </div>

        {/* Core Principles Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-eulance-navy)] flex items-center justify-center font-bold text-xl mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-xl text-[var(--color-eulance-navy)] mb-2">Freedom</h3>
            <p className="text-[var(--color-eulance-muted)] text-sm">Empowering independent work across all 27 EU member states without bureaucratic friction.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-eulance-blue)] flex items-center justify-center font-bold text-xl mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-xl text-[var(--color-eulance-navy)] mb-2">Fairness</h3>
            <p className="text-[var(--color-eulance-muted)] text-sm">0% freelancer launch fees. No pay-to-play bid credits. No hidden subscriptions.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[var(--color-eulance-emerald)] flex items-center justify-center font-bold text-xl mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-xl text-[var(--color-eulance-emerald)] mb-2">Future</h3>
            <p className="text-[var(--color-eulance-muted)] text-sm">Building European digital sovereignty, GDPR compliance, and localized contract engines.</p>
          </div>
        </div>

        {/* PDF Embedded Preview */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-[var(--color-eulance-border)] mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-[var(--color-eulance-navy)]" />
              <h2 className="text-xl font-bold text-[var(--color-eulance-navy)]">Business Plan PDF Viewer</h2>
            </div>
            <a
              href="/EULANCE_Business_Plan_v2.pdf"
              download="EULANCE_Business_Plan_v2.pdf"
              className="text-xs font-bold text-[var(--color-eulance-navy)] hover:underline flex items-center gap-1"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>

          <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <iframe
              src="/EULANCE_Business_Plan_v2.pdf"
              className="w-full h-full"
              title="EULANCE Business Plan PDF"
            />
          </div>
        </div>

        {/* Interactive Unit Economics Calculator */}
        <div className="mb-8">
          <FinancialCalculator />
        </div>

        {/* Strategy Sections */}
        <div className="space-y-8">
          
          <Section 
            icon={<Target size={24} />}
            title="1. Market Opportunity & EU Landscape"
            content={
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  The European freelance market is rapidly growing, driven by digitalization, remote work, and evolving workforce preferences. Millions of professionals are shifting towards flexible work models, while SMEs increasingly rely on external talent to stay competitive.
                </p>
                <p>
                  Europeans currently rely on overcrowded, expensive, overseas platforms. EULANCE changes that: a platform built specifically for Europe, compliant by design, and structurally fairer to freelancers than any existing alternatives.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-center">
                  <div className="bg-[var(--color-eulance-soft)] p-3 rounded-xl">
                    <div className="text-xl font-bold text-[var(--color-eulance-navy)]">1.5M+</div>
                    <div className="text-[11px] text-[var(--color-eulance-muted)]">Iberian Freelancers</div>
                  </div>
                  <div className="bg-[var(--color-eulance-soft)] p-3 rounded-xl">
                    <div className="text-xl font-bold text-[var(--color-eulance-navy)]">4.7M+</div>
                    <div className="text-[11px] text-[var(--color-eulance-muted)]">Core EU Freelancers</div>
                  </div>
                  <div className="bg-[var(--color-eulance-soft)] p-3 rounded-xl">
                    <div className="text-xl font-bold text-[var(--color-eulance-navy)]">11.5M+</div>
                    <div className="text-[11px] text-[var(--color-eulance-muted)]">Total EU Market</div>
                  </div>
                  <div className="bg-[var(--color-eulance-soft)] p-3 rounded-xl">
                    <div className="text-xl font-bold text-[var(--color-eulance-emerald)]">27</div>
                    <div className="text-[11px] text-[var(--color-eulance-muted)]">EU Countries</div>
                  </div>
                </div>
              </div>
            }
          />

          <Section 
            icon={<Map size={24} />}
            title="2. Five-Phase Phased Rollout Plan"
            content={
              <div className="space-y-4">
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-eulance-soft)]/60 border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-eulance-emerald)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <strong className="text-[var(--color-eulance-navy)] text-base">Phase 1 (2027): Iberian Peninsula (Portugal & Spain)</strong>
                      <p className="text-xs text-[var(--color-eulance-muted)] mt-1">Targeting 3,500 active clients and 9,000 active freelancers by year-end. Shared language family, high tech density, 2 jurisdictions.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-eulance-navy)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <strong className="text-[var(--color-eulance-navy)] text-base">Phase 2 (2028): Core EU (France, Germany, Italy)</strong>
                      <p className="text-xs text-[var(--color-eulance-muted)] mt-1">Targeting 14,000 clients & 38,000 freelancers. Expanding cross-border hiring from Southern EU to Western EU enterprises.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-eulance-navy)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <strong className="text-[var(--color-eulance-navy)] text-base">Phases 3 & 4 (2029–2030): Benelux, Nordics, CEE & Baltics</strong>
                      <p className="text-xs text-[var(--color-eulance-muted)] mt-1">Completing coverage across all 27 EU member states with automated multi-currency support (NOK, SEK, DKK, EUR).</p>
                    </div>
                  </li>
                </ul>
              </div>
            }
          />

          <Section 
            icon={<Coins size={24} />}
            title="3. Monetization & Cash-Flow Architecture"
            content={
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  EULANCE earns only when its users succeed. There are no mandatory subscriptions for clients or freelancers. A double-fee scheme operates upon payment release:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-[var(--color-eulance-navy)]">1. Client Deposit</span>
                    <span className="font-mono text-sm text-[var(--color-eulance-navy)]">Contract Value + 15% Platform Fee</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-[var(--color-eulance-navy)]">2. Escrow Custody</span>
                    <span className="font-mono text-sm text-[var(--color-eulance-navy)]">Invested in short-term money market instruments</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-eulance-navy)]">3. Payment Release</span>
                    <span className="font-mono text-sm text-[var(--color-eulance-emerald)]">Freelancer receives 95% (5% fee) + Auto VAT Invoice</span>
                  </div>
                </div>
              </div>
            }
          />

          <Section 
            icon={<ShieldAlert size={24} />}
            title="4. Risks & Mitigation Strategies"
            content={
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-xl bg-white">
                  <strong className="block text-[var(--color-eulance-navy)] text-sm mb-1">Platform Off-Bypassing</strong>
                  <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                    Escrow safety, non-transferable reputation badges, legally binding local contracts, and auto reverse-charge VAT invoicing make remaining in-platform far superior.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl bg-white">
                  <strong className="block text-[var(--color-eulance-navy)] text-sm mb-1">Liquidity Chicken-and-Egg</strong>
                  <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                    Freelancer-first acquisition: seed top supply before demand via the Founding Member Program (first 500 freelancers receive permanent verified founder badges).
                  </p>
                </div>
              </div>
            }
          />

          <Section 
            icon={<Users size={24} />}
            title="5. Long-Term EU Vision"
            content={
              <div className="text-center py-6 bg-gradient-to-br from-[var(--color-eulance-navy)] to-[var(--color-eulance-navy)] text-white rounded-2xl p-8 shadow-md">
                <p className="text-xl font-serif italic mb-4 text-[var(--color-eulance-yellow)]">
                  "To become Europe’s leading freelance infrastructure — redefining how professionals and companies collaborate across all 27 EU member states in a fair, transparent and sustainable way."
                </p>
                <p className="text-sm text-white/80">
                  From Lisbon to Tallinn, from Helsinki to Valletta — EULANCE brings fresh air to the EU workspace.
                </p>
              </div>
            }
          />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-eulance-navy)] text-white rounded-xl font-bold text-lg hover:bg-[var(--color-eulance-blue)] transition-colors shadow-lg gap-2">
            Try the MVP Prototype Now <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}

function Section({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xs border border-[var(--color-eulance-border)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-soft)] text-[var(--color-eulance-navy)] flex items-center justify-center font-bold">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">{title}</h2>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}
