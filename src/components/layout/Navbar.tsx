"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/dictionaries";
import { Globe, Menu } from "lucide-react";
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
    <nav className="bg-white border-b border-[var(--color-eulance-border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-eulance-navy)] text-[var(--color-eulance-gold)] rounded flex items-center justify-center font-bold text-xl">
                E
              </div>
              <span className="font-bold text-xl text-[var(--color-eulance-navy)] tracking-tight">
                EULANCE
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/business-plan" className="text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] font-medium transition-colors">
              {dict.nav.businessPlan}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] transition-colors"
              >
                <Globe size={18} />
                <span className="uppercase text-sm font-semibold">{language}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-[var(--color-eulance-border)] rounded-md shadow-lg py-1">
                  {(['en', 'it', 'pt'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-eulance-soft)] ${language === lang ? 'font-bold text-[var(--color-eulance-blue)]' : 'text-[var(--color-eulance-text)]'}`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/prototype" className="px-4 py-2 bg-[var(--color-eulance-blue)] text-white rounded-md font-medium hover:bg-[var(--color-eulance-navy)] transition-colors shadow-sm">
              {dict.nav.tryMvp}
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-eulance-text)] hover:text-[var(--color-eulance-blue)] p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-eulance-border)] bg-white pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/business-plan" 
              className="block px-3 py-2 text-[var(--color-eulance-text)] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.businessPlan}
            </Link>
            
            <div className="px-3 py-2">
              <div className="font-medium text-[var(--color-eulance-text)] mb-2">Language</div>
              <div className="flex gap-2">
                {(['en', 'it', 'pt'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 border rounded ${language === lang ? 'bg-[var(--color-eulance-soft)] border-[var(--color-eulance-blue)] text-[var(--color-eulance-blue)] font-bold' : 'border-[var(--color-eulance-border)] text-[var(--color-eulance-text)]'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <Link 
              href="/prototype" 
              className="block mt-4 px-3 py-2 bg-[var(--color-eulance-blue)] text-white font-medium rounded-md text-center mx-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.tryMvp}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
