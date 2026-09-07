"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Globe,
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
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-mono">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-[#888888] hover:text-[#ffffff] transition-colors uppercase"
          >
            <ArrowLeft size={14} /> TERMINATE_PROFILE_VIEW
          </button>

          {/* Profile Hero Card */}
          <div className="bg-[#050505] p-8 md:p-10 border border-[#222222]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#222222]">
              <div className="flex items-start md:items-center gap-6">
                <div className="w-20 h-20 bg-[#111111] border border-[#333333] text-[#00ff66] font-black text-2xl flex items-center justify-center shrink-0">
                  {freelancer.avatar}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="text-3xl font-black text-white uppercase">{freelancer.name}</h1>
                    {freelancer.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-[#00e5ff] text-[#00e5ff] font-bold text-[10px] uppercase">
                        <ShieldCheck size={12} /> EU_VERIFIED
                      </span>
                    )}
                    {freelancer.founder && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-[#00ff66] text-[#00ff66] font-extrabold text-[10px] uppercase">
                        <Award size={12} /> NODE_FND_{freelancer.founderBadgeNumber}
                      </span>
                    )}
                  </div>
                  <p className="text-base font-bold text-[#00e5ff] mb-2 uppercase">{freelancer.role}</p>
                  <div className="flex flex-wrap gap-4 text-[10px] font-semibold text-[#888888] uppercase tracking-widest">
                    <span>LOC: {freelancer.countryCode}</span>
                    <span>•</span>
                    <span>STATUS: {freelancer.availability}</span>
                    <span>•</span>
                    <span>VAT: {freelancer.vatNumber}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsMessagingOpen(true)}
                  className="px-5 py-2.5 border border-[#333333] hover:bg-[#111111] text-[#ffffff] font-bold text-[10px] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={14} /> P2P_MESSAGE
                </button>
                <button
                  onClick={handleSendOffer}
                  className="px-6 py-2.5 bg-[#00e5ff] hover:bg-[#00ccff] text-[#000000] font-extrabold text-[10px] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} /> DISPATCH_OFFER_PAYLOAD
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
                <div className="text-[10px] font-bold text-[#888888] uppercase tracking-widest">BASE_YIELD</div>
                <div className="text-2xl font-black text-white mt-1">€{freelancer.hourlyRate}<span className="text-xs text-[#888888]">/HR</span></div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#888888] uppercase tracking-widest">REP_SCORE</div>
                <div className="text-2xl font-black text-[#00e5ff] mt-1 flex items-center justify-center gap-1">
                  {freelancer.rating} <span className="text-[10px] text-[#444444] font-normal uppercase">/5.0</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#888888] uppercase tracking-widest">CYCLES_DONE</div>
                <div className="text-2xl font-black text-[#00ff66] mt-1">{freelancer.jobsCompleted}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#888888] uppercase tracking-widest">FEE_TIER</div>
                <div className="text-2xl font-black text-[#ffffff] mt-1 uppercase">0%_PROMO</div>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Bio & Portfolio */}
            <div className="md:col-span-2 space-y-6">
              
              <div className="bg-[#050505] p-8 border border-[#222222]">
                <h3 className="text-sm font-extrabold text-[#888888] mb-4 uppercase tracking-widest border-b border-[#222222] pb-2">NODE_DATA</h3>
                <p className="text-xs text-[#aaaaaa] leading-relaxed space-y-3 font-normal">
                  {freelancer.bio}
                </p>
              </div>

              {/* Verified Skills */}
              <div className="bg-[#050505] p-8 border border-[#222222]">
                <h3 className="text-sm font-extrabold text-[#888888] mb-4 uppercase tracking-widest border-b border-[#222222] pb-2">VERIFIED_VECTORS</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 border border-[#333333] text-[#ffffff] text-[10px] font-bold flex items-center gap-1.5 uppercase"
                    >
                      <CheckCircle2 size={12} className="text-[#00ff66]" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Items */}
              {freelancer.portfolioItems && freelancer.portfolioItems.length > 0 && (
                <div className="bg-[#050505] p-8 border border-[#222222]">
                  <h3 className="text-sm font-extrabold text-[#888888] mb-4 uppercase tracking-widest border-b border-[#222222] pb-2">HASHED_PORTFOLIO_OUTPUT</h3>
                  <div className="grid gap-4">
                    {freelancer.portfolioItems.map((item, idx) => (
                      <div key={idx} className="p-4 bg-[#111111] border border-[#333333] flex justify-between items-center">
                        <div>
                          <span className="text-[9px] font-bold text-[#00ff66] uppercase">{item.category}</span>
                          <h4 className="font-extrabold text-xs text-white uppercase mt-1">{item.title}</h4>
                        </div>
                        <span className="px-2 py-1 bg-[#000000] text-[9px] font-bold text-[#888888] border border-[#222222] uppercase tracking-widest">
                          VERIFIED_TX
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Languages & Compliance Summary */}
            <div className="space-y-6">
              
              <div className="bg-[#050505] p-6 border border-[#222222] space-y-4">
                <h3 className="text-[10px] font-extrabold text-[#888888] uppercase tracking-widest border-b border-[#222222] pb-2">COMM_PROTOCOLS</h3>
                <div className="space-y-2 text-xs font-medium text-white uppercase">
                  {freelancer.languages.map((lang) => (
                    <div key={lang} className="flex items-center gap-2">
                      <Globe size={14} className="text-[#00e5ff]" /> {lang}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#050505] p-6 border border-[#00ff66] space-y-3">
                <div className="flex items-center gap-2 text-[#00ff66] font-extrabold text-xs uppercase">
                  <ShieldCheck size={16} /> EU_COMPLIANCE_VALID
                </div>
                <p className="text-[10px] text-[#00aa44] leading-relaxed font-medium uppercase">
                  Node is registered in {freelancer.countryCode} with active VAT index ({freelancer.vatNumber}). Transactions automatically compute reverse-charge EU routing.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
