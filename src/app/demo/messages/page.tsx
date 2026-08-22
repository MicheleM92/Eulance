"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import {
  Send,
  Paperclip,
  ShieldCheck,
  FileText,
  Building2,
  UserCheck,
  CheckCircle2,
  Coins,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function MessagesPage() {
  const router = useRouter();
  const { messages, sendMessage, activeRole, activeContract, sendOffer } = useDemoState();
  const [inputText, setInputText] = useState("");
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState(1000);
  const [offerDeadline, setOfferDeadline] = useState("2027-11-30");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    sendOffer({
      projectId: "p1",
      freelancerId: "f1",
      amount: offerAmount,
      deadline: offerDeadline,
    });
    setShowOfferModal(false);
  };

  const isClient = activeRole === "client";

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col">
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex-1 flex overflow-hidden">
            
            {/* LEFT COLUMN: Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0">
              <div className="p-4 border-b border-gray-200 bg-white">
                <h2 className="font-extrabold text-base text-[var(--color-eulance-navy)]">Commercial Inbox</h2>
                <p className="text-[10px] text-gray-500">Verified encrypted chat & offer stream</p>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                <div className="p-4 bg-white border-l-4 border-[var(--color-eulance-navy)] cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs text-[var(--color-eulance-navy)]">
                      {isClient ? "Tiago Mendes (Portugal)" : "Iberia Retail Group (Spain)"}
                    </span>
                    <span className="text-[10px] text-gray-400">10:30 AM</span>
                  </div>
                  <p className="text-[11px] text-gray-600 truncate font-medium">
                    Iberian E-Commerce Storefront Redesign
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Offer Accepted • Escrow Funded
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Chat View & Actions */}
            <div className="flex-1 flex flex-col bg-white min-w-0">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] font-bold text-sm flex items-center justify-center">
                    {isClient ? "TM" : "IR"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[var(--color-eulance-navy)]">
                      {isClient ? "Tiago Mendes" : "Iberia Retail Group"}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Project: Iberian E-Commerce Storefront Redesign (€1,000)
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isClient && (
                    <button
                      onClick={() => setShowOfferModal(true)}
                      className="px-3.5 py-2 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-extrabold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles size={14} className="text-[var(--color-eulance-yellow)]" /> Send Formal Offer
                    </button>
                  )}
                  {activeContract && (
                    <Link
                      href={`/demo/workroom/${activeContract.id}`}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 size={14} /> Open Workroom
                    </Link>
                  )}
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/40">
                {messages.map((m) => {
                  const isMe =
                    (isClient && m.senderRole === "client") || (!isClient && m.senderRole === "freelancer");

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-gray-500">{m.senderName}</span>
                        <span className="text-[9px] text-gray-400">{m.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? "bg-[var(--color-eulance-navy)] text-white rounded-br-none shadow-xs"
                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-xs"
                        }`}
                      >
                        {m.text}

                        {/* If message contains offer data */}
                        {m.offerData && (
                          <div className="mt-3 p-3 rounded-xl bg-white/10 border border-white/20 text-white space-y-2">
                            <div className="flex justify-between font-bold">
                              <span>Formal Contract Offer</span>
                              <span className="text-[var(--color-eulance-yellow)]">€{m.offerData.amount}</span>
                            </div>
                            <p className="text-[10px] text-white/80">Project: {m.offerData.projectTitle}</p>
                            <Link
                              href="/demo/contracts/c1"
                              className="block w-full py-1.5 bg-[var(--color-eulance-yellow)] text-[var(--color-eulance-navy)] text-center rounded-lg font-extrabold text-[11px] hover:bg-yellow-400 transition-colors"
                            >
                              Review & Sign Contract
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type message, clarify milestones, or discuss deliverable specs..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                />
                <button
                  type="button"
                  onClick={() => sendMessage("Attached deliverables preview file: Storefront_Prototype_v1.fig")}
                  className="p-3 text-gray-500 hover:text-[var(--color-eulance-navy)] hover:bg-gray-100 rounded-xl transition-colors"
                  title="Simulate Attachment"
                >
                  <Paperclip size={18} />
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-xl font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                >
                  Send <Send size={14} />
                </button>
              </form>

            </div>

            {/* RIGHT COLUMN: Context Panel */}
            <div className="w-80 border-l border-gray-200 p-6 flex flex-col bg-gray-50/70 overflow-y-auto space-y-6 shrink-0 hidden lg:block">
              
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Commercial Context</h4>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <span className="font-extrabold text-[var(--color-eulance-navy)] block">
                    {activeContract?.projectName || "Pending Project Assignment"}
                  </span>
                  <div className="flex justify-between text-gray-600">
                    <span>Agreed Amount:</span>
                    <span className="font-mono font-bold text-gray-900">€{activeContract?.amount?.toLocaleString() || "0"}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Client Deposit (+15%):</span>
                    <span className="font-mono font-bold text-blue-700">€{activeContract?.clientTotalPaid?.toLocaleString() || "0"}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 items-center">
                    <span>Freelancer Payout:</span>
                    <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
                      €{activeContract?.freelancerNetPayout?.toLocaleString() || "0"} 
                      {activeContract?.freelancerFee === 0 ? (
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[9px] ml-1">
                          <span className="line-through text-emerald-600/60 mr-1">5%</span>0% Promo
                        </span>
                      ) : (
                        <span className="text-[10px] font-normal text-gray-400">(5% fee)</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {activeContract && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Escrow Security State</h4>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2 text-xs text-emerald-950">
                    <div className="flex items-center gap-2 font-extrabold text-emerald-900">
                      <ShieldCheck size={16} className="text-emerald-600" /> Funds Secured in Escrow
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      Client deposited €1,150 into licensed EU escrow institution. Funds will release automatically upon delivery approval.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/demo/contracts/c1"
                  className="w-full py-2.5 bg-white border border-gray-300 text-[var(--color-eulance-navy)] rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors block text-center shadow-2xs"
                >
                  View Full Legal Contract
                </Link>
              </div>

            </div>

          </div>

          {/* Modal for Creating Offer */}
          {showOfferModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-black text-[var(--color-eulance-navy)]">Send Commercial Offer</h3>
                  <button onClick={() => setShowOfferModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                </div>

                <form onSubmit={handleCreateOffer} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-gray-700 mb-1">Offer Contract Value (€)</label>
                    <input
                      type="number"
                      required
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-xl font-mono text-sm"
                    />
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      Client pays €{(offerAmount * 1.15).toLocaleString()} (includes 15% EULANCE fee)
                    </span>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Delivery Target Date</label>
                    <input
                      type="date"
                      required
                      value={offerDeadline}
                      onChange={(e) => setOfferDeadline(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowOfferModal(false)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[var(--color-eulance-navy)] text-white rounded-xl font-bold hover:bg-[var(--color-eulance-blue)]"
                    >
                      Send Offer & Lock Escrow
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
