"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/dictionaries";
import { Globe, Menu, X, Sparkles, Star } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { language, setLanguage, dict } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-[var(--color-eulance-border)] sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Authentic PDF EULANCE Icon: Blue rounded square with EU yellow star and horizontal lines */}
              <div className="w-9 h-9 bg-[var(--color-eulance-navy)] rounded-xl flex flex-col items-center justify-center p-1.5 shadow-sm relative group-hover:bg-[#0E2A52] transition-colors">
                <div className="flex items-center gap-1 w-full justify-between px-0.5">
                  <Star size={11} className="fill-[var(--color-eulance-yellow)] text-[var(--color-eulance-yellow)] shrink-0" />
                  <div className="h-0.5 w-3 bg-white/80 rounded-full"></div>
                </div>
                <div className="h-0.5 w-full bg-white/80 rounded-full mt-1"></div>
                <div className="h-0.5 w-full bg-white/80 rounded-full mt-1"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-[var(--color-eulance-navy)] tracking-tight leading-none">
                  EULANCE
                </span>
                <span className="text-[9px] font-bold text-[var(--color-eulance-muted)] tracking-widest uppercase mt-0.5">
                  Europe's Fair Platform
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
              <Link href="/demo/client/talent" className="text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] transition-colors">
                Find Talent
              </Link>
              <Link href="/demo/freelancer/jobs" className="text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] transition-colors">
                Find Work
              </Link>
              <Link href="/pricing" className="text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] transition-colors">
                Pricing
              </Link>
              <Link href="/business-plan" className="text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] transition-colors">
                {dict.nav.businessPlan}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-[var(--color-eulance-navy)] hover:bg-gray-50 transition-colors"
              >
                <Globe size={15} className="text-[var(--color-eulance-blue)]" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-[var(--color-eulance-border)] rounded-xl shadow-xl py-2 z-50 text-xs font-semibold">
                  {([
                    { code: "en", label: "English 🇬🇧" },
                    { code: "pt", label: "Português 🇵🇹" },
                    { code: "es", label: "Español 🇪🇸" },
                    { code: "it", label: "Italiano 🇮🇹" },
                    { code: "de", label: "Deutsch 🇩🇪" },
                  ] as { code: Language; label: string }[]).map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleLanguageChange(item.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-[var(--color-eulance-soft)] ${
                        language === item.code ? "font-bold text-[var(--color-eulance-blue)] bg-blue-50" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/demo"
              className="px-5 py-2.5 bg-[var(--color-eulance-navy)] text-white rounded-xl text-xs font-extrabold hover:bg-[var(--color-eulance-blue)] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Sparkles size={14} className="text-[var(--color-eulance-yellow)]" />
              Try EULANCE Demo
            </Link>
          </div>

          <div className="flex items-center md:hidden gap-2">
            <Link
              href="/demo"
              className="px-3 py-1.5 bg-[var(--color-eulance-navy)] text-white rounded-lg text-xs font-bold"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-eulance-navy)] p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-eulance-border)] bg-white px-4 py-6 space-y-4">
          <Link
            href="/demo/client/talent"
            className="block text-sm font-bold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Find Talent
          </Link>
          <Link
            href="/demo/freelancer/jobs"
            className="block text-sm font-bold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Find Work
          </Link>
          <Link
            href="/pricing"
            className="block text-sm font-bold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/business-plan"
            className="block text-sm font-bold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Business Plan
          </Link>

          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Language</div>
            <div className="flex flex-wrap gap-2">
              {(["en", "pt", "es", "it", "de"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                    language === lang
                      ? "bg-[var(--color-eulance-navy)] text-white border-[var(--color-eulance-navy)]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
