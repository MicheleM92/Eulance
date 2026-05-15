"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="bg-[var(--color-eulance-navy)] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white text-[var(--color-eulance-navy)] rounded flex items-center justify-center font-bold text-xl">
                E
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                EULANCE
              </span>
            </Link>
            <p className="text-[var(--color-eulance-border)] text-sm mb-6">
              {dict.hero.headline}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[var(--color-eulance-gold)]">{dict.footer.product}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/prototype" className="text-[var(--color-eulance-border)] hover:text-white transition-colors text-sm">
                  {dict.footer.mvp}
                </Link>
              </li>
              <li>
                <Link href="/business-plan" className="text-[var(--color-eulance-border)] hover:text-white transition-colors text-sm">
                  {dict.footer.businessPlan}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[var(--color-eulance-gold)]">Legal</h3>
            <ul className="space-y-2">
              <li className="text-[var(--color-eulance-border)] text-sm">
                {dict.footer.legal}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[var(--color-eulance-gold)]">Contact</h3>
            <ul className="space-y-2">
              <li className="text-[var(--color-eulance-border)] text-sm">
                {dict.footer.contact}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-eulance-blue)]/30 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-eulance-border)]">
          <p>&copy; {new Date().getFullYear()} EULANCE. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span>Built for the European Union</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
