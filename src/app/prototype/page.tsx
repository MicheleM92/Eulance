import Link from "next/link";
import { Briefcase, Award, ArrowRight } from "lucide-react";

export default function PrototypeEntry() {
  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--color-eulance-blue)]/10 text-[var(--color-eulance-blue)] font-semibold text-sm mb-4">
            MVP Prototype
          </div>
          <h2 className="text-3xl font-extrabold text-[var(--color-eulance-navy)] mb-2">
            Welcome to EULANCE
          </h2>
          <p className="text-[var(--color-eulance-muted)]">
            Please select your experience to explore the prototype flows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          
          <Link href="/prototype/client" className="group block bg-white rounded-2xl p-8 border-2 border-transparent hover:border-[var(--color-eulance-blue)] shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="w-16 h-16 bg-[var(--color-eulance-soft)] text-[var(--color-eulance-navy)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-eulance-blue)] group-hover:text-white transition-colors">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-3">I am hiring</h3>
            <p className="text-[var(--color-eulance-muted)] mb-6">
              Post projects, view AI-matched European talent, create contracts, and manage escrow payments.
            </p>
            <div className="flex items-center text-[var(--color-eulance-blue)] font-semibold group-hover:translate-x-2 transition-transform">
              Client Prototype <ArrowRight size={20} className="ml-2" />
            </div>
          </Link>

          <Link href="/prototype/freelancer" className="group block bg-white rounded-2xl p-8 border-2 border-transparent hover:border-[var(--color-eulance-emerald)] shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="w-16 h-16 bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-eulance-emerald)] group-hover:text-white transition-colors">
              <Award size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-3">I am a freelancer</h3>
            <p className="text-[var(--color-eulance-muted)] mb-6">
              Receive smart matches, submit proposals, work under protected EU contracts, and build reputation.
            </p>
            <div className="flex items-center text-[var(--color-eulance-emerald)] font-semibold group-hover:translate-x-2 transition-transform">
              Freelancer Prototype <ArrowRight size={20} className="ml-2" />
            </div>
          </Link>

        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-[var(--color-eulance-muted)]">
            Note: This is an interactive MVP prototype. All data is mocked and no real payments or legal agreements are processed.
          </p>
        </div>
      </div>
    </div>
  );
}
