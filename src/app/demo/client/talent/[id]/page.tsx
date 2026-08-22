"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import {
  ShieldCheck,
  Star,
  Award,
  MapPin,
  CheckCircle2,
  Globe,
  FileText,
  MessageSquare,
  ArrowLeft,
  Send,
} from "lucide-react";

export default function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { freelancers, sendOffer } = useDemoState();
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const freelancer = freelancers.find((f) => f.id === resolvedParams.id) || freelancers[0];

  const handleSendOffer = () => {
    sendOffer({
      projectId: "p1",
      freelancerId: freelancer.id,
      amount: 1000,
      deadline: "2027-11-30",
    });
    router.push("/demo/messages");
  };

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[var(--color-eulance-navy)] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Talent Search
          </button>

          {/* Profile Hero Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xs border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-100">
              <div className="flex items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
                  {freelancer.avatar}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="text-3xl font-black text-[var(--color-eulance-navy)]">{freelancer.name}</h1>
                    {freelancer.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                        <ShieldCheck size={14} /> EU Verified Identity & VAT
                      </span>
                    )}
                    {freelancer.founder && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
                        <Award size={14} /> Founder Member #{freelancer.founderBadgeNumber}
                      </span>
                    )}
                  </div>
                  <p className="text-base font-bold text-gray-600 mb-2">{freelancer.role}</p>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500">
                    <span>📍 {freelancer.city}, {freelancer.country} ({freelancer.countryCode})</span>
                    <span>•</span>
                    <span>⚡ {freelancer.availability}</span>
                    <span>•</span>
                    <span className="font-mono">VAT: {freelancer.vatNumber}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsMessagingOpen(true)}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-[var(--color-eulance-navy)] font-bold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={16} /> Direct Message
                </button>
                <button
                  onClick={handleSendOffer}
                  className="px-6 py-3 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-extrabold rounded-xl text-xs text-center transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} className="text-[var(--color-eulance-yellow)]" /> Send Formal Offer (€1,000)
                </button>
              </div>
            </div>

            {/* Direct Messaging Modal */}
            <DirectMessagingModal
              isOpen={isMessagingOpen}
              onClose={() => setIsMessagingOpen(false)}
              recipientName={freelancer.name}
              recipientRole={freelancer.role}
              recipientCountry={freelancer.country}
              avatar={freelancer.avatar}
            />

            {/* Profile Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase">Hourly Rate</div>
                <div className="text-2xl font-black text-[var(--color-eulance-navy)] mt-1">€{freelancer.hourlyRate}/hr</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase">Reputation Rating</div>
                <div className="text-2xl font-black text-amber-500 mt-1 flex items-center justify-center gap-1">
                  ⭐ {freelancer.rating} <span className="text-xs text-gray-400 font-normal">(5.0 max)</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase">Jobs Completed</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">{freelancer.jobsCompleted}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase">Founder Fee Tier</div>
                <div className="text-2xl font-black text-blue-600 mt-1">0% Fee Promo</div>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Bio & Portfolio */}
            <div className="md:col-span-2 space-y-6">
              
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
                <h3 className="text-lg font-extrabold text-[var(--color-eulance-navy)] mb-4">About {freelancer.name}</h3>
                <p className="text-xs text-gray-700 leading-relaxed space-y-3 font-normal">
                  {freelancer.bio}
                </p>
              </div>

              {/* Verified Skills */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
                <h3 className="text-lg font-extrabold text-[var(--color-eulance-navy)] mb-4">Verified European Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-blue-50 text-[var(--color-eulance-navy)] rounded-xl text-xs font-bold flex items-center gap-1.5 border border-blue-100"
                    >
                      <CheckCircle2 size={14} className="text-emerald-500" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Items */}
              {freelancer.portfolioItems && freelancer.portfolioItems.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
                  <h3 className="text-lg font-extrabold text-[var(--color-eulance-navy)] mb-4">Featured Work & Portfolio</h3>
                  <div className="grid gap-4">
                    {freelancer.portfolioItems.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[var(--color-eulance-soft)] border border-gray-200 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase">{item.category}</span>
                          <h4 className="font-extrabold text-sm text-[var(--color-eulance-navy)]">{item.title}</h4>
                        </div>
                        <span className="px-3 py-1 bg-white text-xs font-bold text-[var(--color-eulance-navy)] rounded-lg border border-gray-200">
                          Verified Contract
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Languages & Compliance Summary */}
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200 space-y-4">
                <h3 className="text-sm font-extrabold text-[var(--color-eulance-navy)] uppercase tracking-wider">Languages</h3>
                <div className="space-y-2 text-xs font-medium text-gray-700">
                  {freelancer.languages.map((lang) => (
                    <div key={lang} className="flex items-center gap-2">
                      <Globe size={14} className="text-[var(--color-eulance-navy)]" /> {lang}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50/80 rounded-3xl p-6 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                  <ShieldCheck size={18} className="text-emerald-600" /> Verified EU Compliance
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  This freelancer is registered in {freelancer.country} with valid VAT registration ({freelancer.vatNumber}). Transactions automatically issue reverse-charge EU invoices.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
