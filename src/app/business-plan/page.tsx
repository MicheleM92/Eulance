import { FileText, Map, Target, TrendingUp, ShieldAlert, Coins, Users } from "lucide-react";
import Link from "next/link";

export default function BusinessPlan() {
  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[var(--color-eulance-border)] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--color-eulance-navy)] text-white text-xs font-bold uppercase tracking-wider mb-6">
            Executive Summary
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-eulance-navy)] mb-6">
            Europe's Fair Freelance Platform
          </h1>
          <p className="text-xl text-[var(--color-eulance-muted)] leading-relaxed">
            EULANCE is a European-first freelance platform connecting companies and independent professionals through a fast, fair, transparent, and compliant marketplace. The platform is built around a transaction fee model — free to join for everyone, charging a 15% fee from the client side only upon successful completion.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-[var(--color-eulance-border)] text-center">
            <h3 className="font-bold text-xl text-[var(--color-eulance-navy)] mb-2">Freedom</h3>
            <p className="text-[var(--color-eulance-muted)] text-sm">Empowering independent work without borders.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[var(--color-eulance-border)] text-center">
            <h3 className="font-bold text-xl text-[var(--color-eulance-blue)] mb-2">Fairness</h3>
            <p className="text-[var(--color-eulance-muted)] text-sm">0% freelancer launch fees. No pay-to-play.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[var(--color-eulance-border)] text-center">
            <h3 className="font-bold text-xl text-[var(--color-eulance-emerald)] mb-2">Future</h3>
            <p className="text-[var(--color-eulance-muted)] text-sm">Building European digital sovereignty.</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          
          <Section 
            icon={<Target size={24} />}
            title="Market Opportunity"
            content={
              <>
                <p className="mb-4">The European freelance market is rapidly growing, driven by digitalization, remote work, and evolving workforce preferences. Millions of professionals are shifting towards flexible work models, while SMEs increasingly rely on external talent to stay competitive.</p>
                <p>Europeans currently rely on overcrowded, expensive, overseas platforms. EULANCE changes that: a platform built for Europe, compliant by design, and structurally fairer to freelancers than any existing alternatives.</p>
              </>
            }
          />

          <Section 
            icon={<Map size={24} />}
            title="Launch & Expansion Plan"
            content={
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <strong className="text-[var(--color-eulance-navy)]">Phase 1 (2027): Iberian Peninsula (Portugal & Spain).</strong>
                    <p className="text-sm text-[var(--color-eulance-muted)]">Targeting 3,500 active clients and 9,000 active freelancers. Zero fees, strong onboarding, founder badges.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-eulance-soft)] text-[var(--color-eulance-blue)] flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <strong className="text-[var(--color-eulance-navy)]">Phase 2 (2028): Core EU (France, Germany, Italy).</strong>
                    <p className="text-sm text-[var(--color-eulance-muted)]">Leveraging cross-border hiring from Southern EU. Localized platform in FR, DE, IT.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-eulance-soft)] text-[var(--color-eulance-blue)] flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <strong className="text-[var(--color-eulance-navy)]">Phase 3 & 4 (2029/30): Rest of EU.</strong>
                    <p className="text-sm text-[var(--color-eulance-muted)]">Benelux, Nordics, CEE, Baltics & Southern EU.</p>
                  </div>
                </li>
              </ul>
            }
          />

          <Section 
            icon={<Coins size={24} />}
            title="Business Model"
            content={
              <>
                <p className="mb-4">EULANCE earns only when its users succeed. There are no subscriptions and no fees charged to freelancers initially. A double-fee scheme is expected in the long-term: 15% fee is charged to the client side and 5% to the freelancer at the point of payment release.</p>
                <div className="bg-[var(--color-eulance-soft)] p-4 rounded-lg border border-[var(--color-eulance-border)]">
                  <h4 className="font-bold text-[var(--color-eulance-navy)] mb-2">How a hire works:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--color-eulance-text)]">
                    <li>Client posts project or browses profiles (free)</li>
                    <li>Client and freelancer agree on scope</li>
                    <li>Client creates contract and deposits funds into Escrow (contract + 15% fee)</li>
                    <li>EULANCE invests cash in short-term instruments</li>
                    <li>Freelancer completes work, Client approves</li>
                    <li>Payment released automatically</li>
                  </ol>
                </div>
              </>
            }
          />

          <Section 
            icon={<ShieldAlert size={24} />}
            title="Risks & Mitigation"
            content={
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-[var(--color-eulance-border)] rounded-lg">
                  <strong className="block text-[var(--color-eulance-navy)] mb-1">Platform Leakage</strong>
                  <p className="text-sm text-[var(--color-eulance-muted)]">Escrow, reputation lock-in, legal contracts, and VAT tools make on-platform transacting superior.</p>
                </div>
                <div className="p-4 border border-[var(--color-eulance-border)] rounded-lg">
                  <strong className="block text-[var(--color-eulance-navy)] mb-1">Liquidity (Chicken & Egg)</strong>
                  <p className="text-sm text-[var(--color-eulance-muted)]">Freelancer-first acquisition; seed supply before demand via founding member program.</p>
                </div>
              </div>
            }
          />

          <Section 
            icon={<Users size={24} />}
            title="Vision"
            content={
              <div className="text-center py-6">
                <p className="text-xl font-medium text-[var(--color-eulance-navy)] italic mb-4">
                  "To become Europe’s leading freelance infrastructure — redefining how professionals and companies collaborate across all 27 EU member states in a fair, transparent and sustainable way."
                </p>
                <p className="text-[var(--color-eulance-muted)]">
                  From Lisbon to Tallinn, from Helsinki to Valletta — EULANCE brings fresh air to the EU workspace.
                </p>
              </div>
            }
          />
        </div>

        <div className="mt-12 text-center">
          <Link href="/prototype" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-eulance-blue)] text-white rounded-lg font-bold hover:bg-[var(--color-eulance-navy)] transition-colors shadow-md">
            Try the MVP Prototype
          </Link>
        </div>

      </div>
    </div>
  );
}

function Section({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--color-eulance-border)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-eulance-soft)] text-[var(--color-eulance-navy)] flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">{title}</h2>
      </div>
      <div className="text-[var(--color-eulance-text)]">
        {content}
      </div>
    </div>
  )
}
