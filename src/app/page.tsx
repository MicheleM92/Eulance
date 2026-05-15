"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Scale, Euro, Users, ArrowRight, FileText, Briefcase, Award } from "lucide-react";

export default function Home() {
  const { dict } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[var(--color-eulance-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-eulance-border)] shadow-sm mb-8 text-sm font-medium text-[var(--color-eulance-navy)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-eulance-emerald)]"></span>
              Built for EU Digital Sovereignty
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-eulance-navy)] tracking-tight mb-6">
              {dict.hero.headline}
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--color-eulance-muted)] mb-10 max-w-3xl mx-auto leading-relaxed">
              {dict.hero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/prototype" 
                className="px-8 py-4 bg-[var(--color-eulance-blue)] text-white rounded-lg font-semibold text-lg hover:bg-[var(--color-eulance-navy)] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {dict.hero.ctaMvp} <ArrowRight size={20} />
              </Link>
              <Link 
                href="/business-plan" 
                className="px-8 py-4 bg-white text-[var(--color-eulance-navy)] border border-[var(--color-eulance-border)] rounded-lg font-semibold text-lg hover:bg-[var(--color-eulance-soft)] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <FileText size={20} /> {dict.hero.ctaPlan}
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-eulance-mint)] opacity-50 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[var(--color-eulance-blue)] opacity-10 blur-3xl"></div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-eulance-navy)] mb-4">{dict.problem.title}</h2>
            <p className="text-lg text-[var(--color-eulance-muted)] max-w-2xl mx-auto">Why current freelance platforms are failing European businesses and independent professionals.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[var(--color-eulance-soft)] border border-[var(--color-eulance-border)]">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <Euro size={24} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-eulance-navy)] mb-3">{dict.problem.highFees}</h3>
              <p className="text-[var(--color-eulance-muted)]">{dict.problem.highFeesDesc}</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[var(--color-eulance-soft)] border border-[var(--color-eulance-border)]">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Scale size={24} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-eulance-navy)] mb-3">{dict.problem.compliance}</h3>
              <p className="text-[var(--color-eulance-muted)]">{dict.problem.complianceDesc}</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[var(--color-eulance-soft)] border border-[var(--color-eulance-border)]">
              <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-eulance-navy)] mb-3">{dict.problem.trust}</h3>
              <p className="text-[var(--color-eulance-muted)]">{dict.problem.trustDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-[var(--color-eulance-navy)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{dict.solution.title}</h2>
            <p className="text-lg text-[var(--color-eulance-border)] max-w-2xl mx-auto">A structurally fairer marketplace built specifically for the European market.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-[var(--color-eulance-blue)] text-white rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{dict.solution.aiMatch}</h3>
              <p className="text-[var(--color-eulance-border)]">{dict.solution.aiMatchDesc}</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{dict.solution.escrow}</h3>
              <p className="text-[var(--color-eulance-border)]">{dict.solution.escrowDesc}</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-[var(--color-eulance-gold)]/20 text-[var(--color-eulance-gold)] rounded-xl flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{dict.solution.invoicing}</h3>
              <p className="text-[var(--color-eulance-border)]">{dict.solution.invoicingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Opportunity */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-eulance-blue)] mb-2">11.5M+</div>
              <div className="text-sm font-semibold text-[var(--color-eulance-navy)] uppercase tracking-wider">EU Freelancers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-eulance-blue)] mb-2">15%</div>
              <div className="text-sm font-semibold text-[var(--color-eulance-navy)] uppercase tracking-wider">Client Fee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-eulance-emerald)] mb-2">0%</div>
              <div className="text-sm font-semibold text-[var(--color-eulance-navy)] uppercase tracking-wider">Freelancer Launch Fee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-eulance-gold)] mb-2">27</div>
              <div className="text-sm font-semibold text-[var(--color-eulance-navy)] uppercase tracking-wider">EU Markets Targeted</div>
            </div>
          </div>
          <p className="text-center text-xs text-[var(--color-eulance-muted)] mt-8">* Numbers are indicative and based on the EULANCE Business Plan 2027-2030.</p>
        </div>
      </section>

      {/* Flows Section */}
      <section className="py-24 bg-[var(--color-eulance-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* For Companies */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[var(--color-eulance-border)]">
              <div className="w-14 h-14 bg-[var(--color-eulance-navy)] text-white rounded-2xl flex items-center justify-center mb-8">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-6">For Companies</h3>
              <ul className="space-y-4">
                {[
                  "Post your project requirements",
                  "Receive AI-matched European freelancers",
                  "Compare proposals and verified profiles",
                  "Create localized EU-compliant contracts",
                  "Fund the project securely via Escrow",
                  "Approve delivery and auto-generate invoices"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[var(--color-eulance-emerald)] shrink-0 mt-0.5" size={20} />
                    <span className="text-[var(--color-eulance-text)] font-medium">{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-[var(--color-eulance-border)]">
                <Link href="/prototype/client" className="text-[var(--color-eulance-blue)] font-bold hover:underline flex items-center gap-1">
                  Try Client Prototype <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* For Freelancers */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[var(--color-eulance-border)]">
              <div className="w-14 h-14 bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] rounded-2xl flex items-center justify-center mb-8">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-6">For Freelancers</h3>
              <ul className="space-y-4">
                {[
                  "Create your professional profile",
                  "Get discovered without paying to play",
                  "Receive highly relevant project matches",
                  "Send proposals to verified clients",
                  "Work under protected EU contracts",
                  "Build immutable reputation and badges"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[var(--color-eulance-emerald)] shrink-0 mt-0.5" size={20} />
                    <span className="text-[var(--color-eulance-text)] font-medium">{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-[var(--color-eulance-border)]">
                <Link href="/prototype/freelancer" className="text-[var(--color-eulance-blue)] font-bold hover:underline flex items-center gap-1">
                  Try Freelancer Prototype <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[var(--color-eulance-navy)] mb-6">Ready to see the future of EU freelance?</h2>
          <p className="text-xl text-[var(--color-eulance-muted)] mb-10">Explore the business plan or test drive the initial MVP prototype.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/prototype" 
              className="px-8 py-4 bg-[var(--color-eulance-blue)] text-white rounded-lg font-semibold text-lg hover:bg-[var(--color-eulance-navy)] transition-colors shadow-md"
            >
              Explore the MVP
            </Link>
            <Link 
              href="/business-plan" 
              className="px-8 py-4 bg-white text-[var(--color-eulance-navy)] border-2 border-[var(--color-eulance-navy)] rounded-lg font-semibold text-lg hover:bg-[var(--color-eulance-soft)] transition-colors"
            >
              Read Business Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
