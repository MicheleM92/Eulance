"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import { Briefcase, Award, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import DemoHeader from "@/components/layout/DemoHeader";

export default function DemoEntryPage() {
  const router = useRouter();
  const { switchRole } = useDemoState();

  const handleSelectRole = (role: "client" | "freelancer") => {
    switchRole(role);
    if (role === "client") {
      router.push("/demo/client");
    } else {
      router.push("/demo/freelancer");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-[var(--color-eulance-navy)] font-bold text-xs mb-4">
              <Sparkles size={14} className="text-[var(--color-eulance-yellow)] fill-[var(--color-eulance-yellow)]" />
              Interactive Demo Experience • No Sign-Up Required
            </div>
            <h1 className="text-4xl font-black text-[var(--color-eulance-navy)] mb-3 tracking-tight">
              Explore EULANCE MVP
            </h1>
            <p className="text-base text-[var(--color-eulance-muted)] max-w-xl mx-auto">
              Select your perspective to test the connected commercial journey. You can switch roles anytime using the Demo Header.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            
            {/* Hiring Card */}
            <div
              onClick={() => handleSelectRole("client")}
              className="group block bg-white rounded-3xl p-8 border-2 border-transparent hover:border-[var(--color-eulance-navy)] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-blue-50 text-[var(--color-eulance-navy)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-eulance-navy)] group-hover:text-white transition-colors">
                  <Briefcase size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-3">I'm Hiring</h2>
                <p className="text-xs text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                  Post projects, view AI candidate rankings, send formal offers, sign contracts, and manage escrow deposits.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-gray-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-navy)]" />
                    AI Best Match (€15 add-on preview)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--color-eulance-navy)]" />
                    15% Client Fee model simulation
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold text-[var(--color-eulance-navy)] group-hover:translate-x-1 transition-transform">
                <span>Launch Client Perspective</span>
                <ArrowRight size={20} />
              </div>
            </div>

            {/* Freelancer Card */}
            <div
              onClick={() => handleSelectRole("freelancer")}
              className="group block bg-white rounded-3xl p-8 border-2 border-transparent hover:border-[var(--color-eulance-emerald)] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-emerald-50 text-[var(--color-eulance-emerald)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-eulance-emerald)] group-hover:text-white transition-colors">
                  <Award size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-3">I'm a Freelancer</h2>
                <p className="text-xs text-[var(--color-eulance-muted)] mb-6 leading-relaxed">
                  Browse European projects, submit zero-fee proposals, accept offers, submit work, and track earnings with auto VAT invoices.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-gray-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Founder Badge #042 (0% launch promo)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    100% Escrow payout guarantee
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold text-[var(--color-eulance-emerald)] group-hover:translate-x-1 transition-transform">
                <span>Launch Freelancer Perspective</span>
                <ArrowRight size={20} />
              </div>
            </div>

          </div>

          <div className="text-center text-xs text-[var(--color-eulance-muted)] bg-white p-4 rounded-2xl border border-gray-200">
            <strong>Connected End-to-End Flow:</strong> Any action taken in Client mode (posting project, sending offer, funding escrow) will immediately update Freelancer mode and the shared Workroom.
          </div>
        </div>
      </div>
    </div>
  );
}
