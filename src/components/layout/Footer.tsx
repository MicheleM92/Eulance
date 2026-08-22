"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Globe, ShieldCheck, Star } from "lucide-react";

export default function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="bg-[var(--color-eulance-navy)] text-white pt-16 pb-8 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white text-[var(--color-eulance-navy)] rounded-xl flex items-center justify-center p-1 font-black text-xl shadow-xs">
                <Star size={16} className="fill-[var(--color-eulance-yellow)] text-[var(--color-eulance-yellow)]" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                EULANCE
              </span>
            </Link>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              Europe's Fair Freelance Infrastructure. Connecting independent talent and companies with instant escrow and automated EU VAT compliance.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold text-[var(--color-eulance-yellow)]">
              <ShieldCheck size={14} /> EU Digital Sovereignty
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-eulance-yellow)]">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-white/70 hover:text-white transition-colors">
                  Try EULANCE Demo
                </Link>
              </li>
              <li>
                <Link href="/demo/client" className="text-white/70 hover:text-white transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/demo/freelancer" className="text-white/70 hover:text-white transition-colors">
                  Freelancer Portal
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Pricing & Calculator
                </Link>
              </li>
              <li>
                <Link href="/business-plan" className="text-white/70 hover:text-white transition-colors">
                  Business Plan (2027–2030)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-eulance-yellow)]">Key Features</h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li>AI-Powered Candidate Match</li>
              <li>Licensed EU Escrow Payments</li>
              <li>Localized eIDAS Contracts</li>
              <li>Automated Reverse Charge VAT</li>
              <li>0% Freelancer Launch Promo</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-eulance-yellow)]">EU Compliance</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              Designed under EU Directive 2019/1152 and VAT Directive 2006/112/EC. GDPR compliant by design.
            </p>
            <p className="text-[11px] text-white/50">
              EULANCE B.V. • Lisbon | Milan | Berlin
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
          <p>© 2027-2030 EULANCE. All rights reserved. Built for Europe.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-white/60">
            <Globe size={14} className="text-[var(--color-eulance-yellow)]" />
            <span>Serving all 27 EU Member States</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
