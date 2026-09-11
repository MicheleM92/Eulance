"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Scale,
  Euro,
  Users,
  ArrowRight,
  FileText,
  Briefcase,
  Award,
  Lock,
  Sparkles,
  MapPin,
  Globe,
  ChevronRight,
  Calculator,
  Building2,
  UserCheck,
  Star,
} from "lucide-react";

export default function Home() {
  const { dict } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-28 overflow-hidden bg-[var(--color-eulance-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-eulance-border)] shadow-xs mb-8 text-xs font-bold text-[var(--color-eulance-navy)]">
              <Star size={14} className="fill-[var(--color-eulance-yellow)] text-[var(--color-eulance-yellow)]" />
              Europe's Fair Freelance Platform • Phase 1 Iberian Launch
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--color-eulance-navy)] tracking-tight mb-6 leading-tight">
              Freedom. Fairness. Future.
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-eulance-muted)] mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
              Hire great European talent and work across borders without unnecessary bureaucracy. Protected escrow, auto reverse-charge VAT, and EU-compliant contracts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 bg-[var(--color-eulance-navy)] text-white rounded-xl font-bold text-base hover:bg-[var(--color-eulance-blue)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles size={18} className="text-[var(--color-eulance-yellow)]" /> Explore EULANCE MVP <ArrowRight size={20} />
              </Link>
              <Link
                href="/business-plan"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-eulance-navy)] border border-[var(--color-eulance-border)] rounded-xl font-bold text-base hover:bg-gray-50 transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <FileText size={20} className="text-[var(--color-eulance-navy)]" /> {dict.hero.ctaPlan}
              </Link>
            </div>
          </motion.div>

          {/* Interactive Feature Cards Floating Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--color-eulance-navy)] flex items-center justify-center font-bold mb-4">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-lg text-[var(--color-eulance-navy)] mb-2">AI-Powered Best Match</h3>
              <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                Algorithmic candidate scoring surfaces top 5 verified EU professionals matched to your exact project stack.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[var(--color-eulance-emerald)] flex items-center justify-center font-bold mb-4">
                <Lock size={20} />
              </div>
              <h3 className="font-bold text-lg text-[var(--color-eulance-navy)] mb-2">100% Protected Escrow</h3>
              <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                Funds are deposited in licensed EU financial institutions before work starts. Instant release upon approval.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-lg text-[var(--color-eulance-navy)] mb-2">Auto Reverse-Charge VAT</h3>
              <p className="text-xs text-[var(--color-eulance-muted)] leading-relaxed">
                Cross-border invoicing across all 27 EU member states generated automatically with zero admin overhead.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-12 bg-[var(--color-eulance-navy)] text-white border-y border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--color-eulance-yellow)] mb-1">11.5M+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">EU Freelancer Market</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">15%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">Client Fee (No Subs)</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--color-eulance-mint)] mb-1 text-emerald-300">5%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">Freelancer Fee (0% Founder)</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">27</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">EU Member States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid (EULANCE vs Traditional Platforms) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-eulance-navy)] mb-4">
              Why Europe Needs EULANCE
            </h2>
            <p className="text-base text-[var(--color-eulance-muted)] max-w-2xl mx-auto">
              Traditional overseas platforms charge extortionate fees, ignore EU VAT compliance, and force freelancers into pay-to-play bidding wars.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200 text-xs font-bold text-[var(--color-eulance-navy)] uppercase">
                  <th className="p-4">Feature / Term</th>
                  <th className="p-4 bg-[var(--color-eulance-mint)] text-[var(--color-eulance-navy)] text-sm rounded-t-xl">
                    EULANCE (EU Platform)
                  </th>
                  <th className="p-4 text-gray-500">Upwork / Fiverr</th>
                  <th className="p-4 text-gray-500">Off-Platform Direct</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                <tr>
                  <td className="p-4 font-bold text-[var(--color-eulance-navy)]">Freelancer Fee</td>
                  <td className="p-4 bg-[var(--color-eulance-soft)] font-bold text-[var(--color-eulance-emerald)]">
                    5% (0% Founder Launch Promo)
                  </td>
                  <td className="p-4 text-red-500 font-medium">10% – 20% + Bidding Credits</td>
                  <td className="p-4 text-gray-600">0% (High Invoice Chase Risk)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-eulance-navy)]">Payment Protection</td>
                  <td className="p-4 bg-[var(--color-eulance-soft)] font-bold text-[var(--color-eulance-navy)]">
                    Licensed EU Escrow
                  </td>
                  <td className="p-4 text-gray-600">US Jurisdiction Escrow</td>
                  <td className="p-4 text-red-500 font-medium">Unsecured / No Escrow</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-eulance-navy)]">EU VAT & Invoicing</td>
                  <td className="p-4 bg-[var(--color-eulance-soft)] font-bold text-[var(--color-eulance-navy)]">
                    Automated Reverse Charge
                  </td>
                  <td className="p-4 text-red-500 font-medium">Manual / Generic US Receipt</td>
                  <td className="p-4 text-gray-600">Manual Accounting Admin</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-eulance-navy)]">Legal Contracts</td>
                  <td className="p-4 bg-[var(--color-eulance-soft)] font-bold text-[var(--color-eulance-navy)]">
                    EU Local Jurisdiction (eIDAS)
                  </td>
                  <td className="p-4 text-gray-600">Standard US Terms</td>
                  <td className="p-4 text-red-500 font-medium">Expensive Legal Drafts</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-eulance-navy)]">Pay-to-Play Bidding</td>
                  <td className="p-4 bg-[var(--color-eulance-soft)] font-bold text-[var(--color-eulance-emerald)]">
                    Never (100% Free Proposals)
                  </td>
                  <td className="p-4 text-red-500 font-medium">Required (Must Buy Connects)</td>
                  <td className="p-4 text-gray-600">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Role Selection Interactive Portal */}
      <section className="py-20 bg-[var(--color-eulance-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-eulance-navy)] mb-4">
              Explore the Interactive MVP
            </h2>
            <p className="text-base text-[var(--color-eulance-muted)] max-w-2xl mx-auto">
              Test both sides of Europe's fair freelance platform in real-time. No sign-up required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Companies */}
            <div className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-[var(--color-eulance-navy)] transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-[var(--color-eulance-navy)] text-white rounded-2xl flex items-center justify-center mb-6">
                  <Building2 size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-3">I'm Hiring</h3>
                <p className="text-sm text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                  Post projects, browse verified Iberian & EU talent, generate localized legal agreements, and manage escrow payments safely.
                </p>
                <ul className="space-y-3 text-xs font-medium text-gray-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-emerald)] shrink-0" />
                    AI-Matched shortlist in seconds (€15 add-on ready)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-emerald)] shrink-0" />
                    eIDAS e-Signature contract generator
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-emerald)] shrink-0" />
                    Auto reverse-charge VAT invoices
                  </li>
                </ul>
              </div>

              <Link
                href="/demo/client"
                className="w-full py-3.5 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-bold rounded-xl text-center text-sm transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                Launch Client Experience <ArrowRight size={16} />
              </Link>
            </div>

            {/* For Freelancers */}
            <div className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-[var(--color-eulance-emerald)] transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-emerald-100 text-[var(--color-eulance-emerald)] rounded-2xl flex items-center justify-center mb-6">
                  <UserCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-3">I'm a Freelancer</h3>
                <p className="text-sm text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                  Receive smart project matches, submit proposals with zero fees, work with 100% escrow protection, and build verified reputation.
                </p>
                <ul className="space-y-3 text-xs font-medium text-gray-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-emerald)] shrink-0" />
                    100% Free proposals (No connect credits)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-emerald)] shrink-0" />
                    0% Launch Promo for founding members
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-emerald)] shrink-0" />
                    Verified EU Founder Badge #042
                  </li>
                </ul>
              </div>

              <Link
                href="/demo/freelancer"
                className="w-full py-3.5 bg-[var(--color-eulance-emerald)] hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-sm transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                Launch Freelancer Experience <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-eulance-navy)] via-[#0F2A4D] to-[var(--color-eulance-navy)] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-[var(--color-eulance-yellow)]">
            Ready to experience Europe's fair workspace?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto mb-8">
            From Lisbon to Tallinn, from Helsinki to Valletta — EULANCE brings fresh air to European tech collaboration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-eulance-yellow)] text-[var(--color-eulance-navy)] font-extrabold rounded-xl text-base hover:bg-yellow-400 transition-colors shadow-lg"
            >
              <Sparkles size={18} /> Enter EULANCE MVP
            </Link>
            <Link
              href="/business-plan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl text-base hover:bg-white/20 transition-colors"
            >
              <Calculator size={18} /> Read Business Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
