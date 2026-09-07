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
  CheckCircle2,
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
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-mono">
      <DemoHeader />

      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col">
          
          <div className="bg-[#050505] border border-[#222222] flex-1 flex overflow-hidden">
            
            {/* LEFT COLUMN: Conversations List */}
            <div className="w-80 border-r border-[#222222] flex flex-col shrink-0">
              <div className="p-4 border-b border-[#222222] bg-[#000000]">
                <h2 className="font-extrabold text-xs text-[#00ff66] uppercase tracking-widest">COMM_STREAM</h2>
                <p className="text-[10px] text-[#888888] mt-1">ENCRYPTED_P2P_SOCKET</p>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#222222]">
                <div className="p-4 bg-[#111111] border-l-2 border-[#00ff66] cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs text-white uppercase">
                      {isClient ? "Tiago Mendes [PT]" : "Iberia Retail Group [ES]"}
                    </span>
                    <span className="text-[10px] text-[#888888]">10:30_Z</span>
                  </div>
                  <p className="text-[10px] text-[#aaaaaa] truncate">
                    HASH: IBERIAN_ECOMMERCE_V1
                  </p>
                  <span className="inline-block mt-2 px-1.5 py-0.5 border border-[#00ff66] text-[#00ff66] text-[9px] uppercase font-bold">
                    ESCROW_LOCKED
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Chat View & Actions */}
            <div className="flex-1 flex flex-col bg-[#050505] min-w-0">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#000000] z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#222222] bg-[#111111] text-[#00ff66] font-bold text-xs flex items-center justify-center">
                    {isClient ? "TM" : "IR"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-white uppercase">
                      {isClient ? "NODE: TMENDES" : "NODE: IBERIA"}
                    </h3>
                    <p className="text-[10px] text-[#888888]">
                      CONTRACT_ID: 0x8f4...e2a
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isClient && (
                    <button
                      onClick={() => setShowOfferModal(true)}
                      className="px-3 py-1.5 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#111111] font-bold text-[10px] uppercase transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles size={12} /> DEPLOY_OFFER
                    </button>
                  )}
                  {activeContract && (
                    <Link
                      href={`/demo/workroom/${activeContract.id}`}
                      className="px-3 py-1.5 bg-[#00ff66] text-[#000000] hover:bg-[#00cc55] font-bold text-[10px] uppercase transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} /> INIT_WORKROOM
                    </Link>
                  )}
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#050505]">
                {messages.map((m) => {
                  const isMe =
                    (isClient && m.senderRole === "client") || (!isClient && m.senderRole === "freelancer");

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold uppercase ${isMe ? "text-[#00ff66]" : "text-[#888888]"}`}>
                          {m.senderName}
                        </span>
                        <span className="text-[9px] text-[#444444]">{m.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-md p-3 text-xs leading-relaxed border ${
                          isMe
                            ? "bg-[#111111] border-[#333333] text-white"
                            : "bg-[#000000] border-[#222222] text-[#dddddd]"
                        }`}
                      >
                        {m.text}

                        {/* If message contains offer data */}
                        {m.offerData && (
                          <div className="mt-3 p-3 bg-[#0a0a0a] border border-[#00e5ff] text-white space-y-2 font-mono text-[10px]">
                            <div className="text-[#00e5ff] font-bold mb-2">{"{"}</div>
                            <div className="pl-4 space-y-1">
                              <div><span className="text-[#888888]">"type":</span> "smart_contract_offer",</div>
                              <div><span className="text-[#888888]">"amount":</span> "€{m.offerData.amount}",</div>
                              <div><span className="text-[#888888]">"project":</span> "{m.offerData.projectTitle}"</div>
                            </div>
                            <div className="text-[#00e5ff] font-bold mt-2">{"}"}</div>
                            
                            <Link
                              href="/demo/contracts/c1"
                              className="block w-full py-1.5 mt-3 border border-[#00e5ff] text-[#00e5ff] text-center font-bold text-[10px] uppercase hover:bg-[#111111] transition-colors"
                            >
                              SIGN_PAYLOAD
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSend} className="p-4 bg-[#000000] border-t border-[#222222] flex items-center gap-3">
                <div className="text-[#00ff66] font-bold">&gt;</div>
                <input
                  type="text"
                  placeholder="Transmit payload..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-transparent border-none text-[#ffffff] text-xs font-mono focus:ring-0 outline-none placeholder-[#444444]"
                />
                <button
                  type="button"
                  onClick={() => sendMessage("ATTACH_PAYLOAD: Storefront_Prototype_v1.fig")}
                  className="p-2 text-[#888888] hover:text-[#ffffff] transition-colors"
                  title="Simulate Attachment"
                >
                  <Paperclip size={14} />
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-[#00ff66] text-[#00ff66] hover:bg-[#111111] font-bold text-[10px] uppercase transition-colors flex items-center gap-1.5"
                >
                  SEND <Send size={12} />
                </button>
              </form>

            </div>

            {/* RIGHT COLUMN: Context Panel */}
            <div className="w-80 border-l border-[#222222] p-6 flex flex-col bg-[#000000] overflow-y-auto space-y-6 shrink-0 hidden lg:block">
              
              <div>
                <h4 className="text-[10px] font-bold text-[#888888] uppercase tracking-widest mb-3 border-b border-[#222222] pb-1">
                  SYS_STATE
                </h4>
                <div className="bg-[#050505] p-4 border border-[#222222] space-y-3 text-xs">
                  <span className="font-bold text-white block uppercase text-[10px]">
                    {activeContract?.projectName || "AWAITING_ASSIGNMENT"}
                  </span>
                  <div className="flex justify-between text-[#888888] text-[10px]">
                    <span>BASE_VAL:</span>
                    <span className="font-bold text-white">€{activeContract?.amount?.toLocaleString() || "0"}</span>
                  </div>
                  <div className="flex justify-between text-[#888888] text-[10px]">
                    <span>IN_ESCROW (+15%):</span>
                    <span className="font-bold text-[#00e5ff]">€{activeContract?.clientTotalPaid?.toLocaleString() || "0"}</span>
                  </div>
                  <div className="flex justify-between text-[#888888] items-center text-[10px]">
                    <span>NET_YIELD:</span>
                    <span className="font-bold text-[#00ff66] flex items-center gap-1">
                      €{activeContract?.freelancerNetPayout?.toLocaleString() || "0"} 
                      {activeContract?.freelancerFee === 0 ? (
                        <span className="border border-[#00ff66] text-[#00ff66] px-1 py-0.5 text-[8px] ml-1 uppercase">
                          0%_PROMO
                        </span>
                      ) : (
                        <span className="text-[9px] text-[#444444]">(5%_FEE)</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {activeContract && (
                <div>
                  <h4 className="text-[10px] font-bold text-[#888888] uppercase tracking-widest mb-3 border-b border-[#222222] pb-1">
                    ESCROW_MODULE
                  </h4>
                  <div className="bg-[#050505] p-4 border border-[#00ff66] space-y-2 text-[#00ff66]">
                    <div className="flex items-center gap-2 font-bold text-[10px] uppercase">
                      <ShieldCheck size={14} /> FUNDS_LOCKED
                    </div>
                    <p className="text-[9px] text-[#00aa44] leading-snug">
                      Hash validation complete. €1,150 secured in EU node. Automatic release upon delivery approval.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#222222]">
                <Link
                  href="/demo/contracts/c1"
                  className="w-full py-2 bg-[#111111] border border-[#333333] text-white font-bold text-[10px] uppercase hover:bg-[#222222] transition-colors block text-center"
                >
                  DUMP_CONTRACT_DATA
                </Link>
              </div>

            </div>

          </div>

          {/* Modal for Creating Offer */}
          {showOfferModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-[#050505] border border-[#222222] p-6 max-w-md w-full space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">INITIATE_OFFER_PAYLOAD</h3>
                  <button onClick={() => setShowOfferModal(false)} className="text-[#888888] hover:text-white font-bold">✕</button>
                </div>

                <form onSubmit={handleCreateOffer} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-[#888888] mb-1 text-[10px] uppercase">Transaction Value (€)</label>
                    <input
                      type="number"
                      required
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(Number(e.target.value))}
                      className="w-full p-2 bg-[#000000] border border-[#333333] text-white focus:border-[#00e5ff] outline-none"
                    />
                    <span className="text-[9px] text-[#444444] mt-1 block">
                      NODE_DEBIT: €{(offerAmount * 1.15).toLocaleString()} (INC 15% PROTOCOL FEE)
                    </span>
                  </div>

                  <div>
                    <label className="block text-[#888888] mb-1 text-[10px] uppercase">TTL (Delivery Date)</label>
                    <input
                      type="date"
                      required
                      value={offerDeadline}
                      onChange={(e) => setOfferDeadline(e.target.value)}
                      className="w-full p-2 bg-[#000000] border border-[#333333] text-white focus:border-[#00e5ff] outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowOfferModal(false)}
                      className="flex-1 py-2 border border-[#333333] text-[#888888] hover:bg-[#111111] font-bold uppercase text-[10px]"
                    >
                      ABORT
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#00e5ff] text-[#000000] font-bold hover:bg-[#00ccff] uppercase text-[10px]"
                    >
                      EXECUTE & LOCK
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
