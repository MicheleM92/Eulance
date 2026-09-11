"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Send,
  Paperclip,
  Star,
  ArrowRight,
  Sparkles,
  Download,
  Building2,
  UserCheck,
  MessageSquare,
} from "lucide-react";

export default function WorkroomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { contracts, activeRole, submitWork, approveWork, requestChanges } = useDemoState();

  const contract = contracts.find((c) => c.id === resolvedParams.id) || contracts[0];

  const [deliveryNote, setDeliveryNote] = useState(
    "Hi Iberia Retail Group! The Next.js storefront redesign is complete with full TypeScript code, Stripe checkout components, and responsive layout. Please review the attached deliverables package."
  );
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState(
    "Outstanding freelancer! Code quality was exceptional, communication was proactive, and delivery was 3 days ahead of deadline."
  );
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);

  const isClient = activeRole === "client";
  const recipientName = isClient ? contract.freelancerName : contract.clientName;
  const recipientRole = isClient ? "Freelancer" : "Client";
  const recipientCountry = isClient ? contract.freelancerCountry : contract.clientCountry;
  const recipientAvatar = isClient ? "TM" : "IR";

  const handleFreelancerSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    submitWork(contract.id, deliveryNote, "EULANCE_Storefront_Deliverables_v1.zip");
  };

  const handleClientApprove = () => {
    setShowReviewModal(true);
  };

  const handleFinalizeReview = (e: React.FormEvent) => {
    e.preventDefault();
    approveWork(contract.id, reviewStars, reviewComment);
    setShowReviewModal(false);
  };

  // Compute timeline steps
  const steps = [
    { label: "Contract Signed", done: true },
    { label: "Funds Secured in Escrow", done: contract.escrowStatus === "Funded" || contract.escrowStatus === "Released" },
    { label: "Work in Progress", done: true },
    { label: "Work Submitted", done: contract.status === "Delivered" || contract.status === "Completed" },
    { label: "Client Review", done: contract.status === "Delivered" || contract.status === "Completed" },
    { label: "Payment Released", done: contract.escrowStatus === "Released" },
    { label: "Completed", done: contract.status === "Completed" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs mb-2">
                <ShieldCheck size={14} /> Shared Commercial Workroom • Escrow {contract.escrowStatus}
              </div>
              <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
                {contract.projectName}
              </h1>
              <p className="text-xs text-[var(--color-eulance-muted)] mt-1">
                Client: {contract.clientName} ({contract.clientCountry}) • Freelancer: {contract.freelancerName} ({contract.freelancerCountry})
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMessagingModal(true)}
                className="px-5 py-3 bg-white border border-gray-300 text-[var(--color-eulance-navy)] font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer flex items-center gap-2"
              >
                <MessageSquare size={16} /> Open Direct Chat
              </button>
              <Link
                href={`/demo/contracts/${contract.id}`}
                className="px-5 py-3 bg-[var(--color-eulance-navy)] text-white font-extrabold rounded-xl text-xs hover:bg-[var(--color-eulance-blue)] transition-colors shadow-xs"
              >
                View Contract PDF
              </Link>
            </div>
          </div>

          {/* Visual Timeline Stepper */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
            <h3 className="text-xs font-extrabold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-6">
              Commercial Lifecycle Progress
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-2 shadow-2xs ${
                      step.done
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-400 border border-gray-300"
                    }`}
                  >
                    {step.done ? <CheckCircle2 size={18} /> : idx + 1}
                  </div>
                  <span className={`text-[11px] font-bold ${step.done ? "text-[var(--color-eulance-navy)]" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Action Workroom Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Deliverables & Action Area */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* If Work Submitted / Delivered State */}
              {contract.status === "Delivered" && (
                <div className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-200 text-amber-950 font-extrabold rounded-full text-xs">
                      ⚡ Work Submitted for Client Review
                    </span>
                    <span className="text-xs text-amber-900 font-bold">Awaiting Client Approval</span>
                  </div>

                  <h3 className="text-xl font-black text-amber-950">Deliverables Submitted by Freelancer</h3>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200 text-xs text-gray-800 space-y-2">
                    <p className="leading-relaxed">{contract.submissionNote || deliveryNote}</p>
                    <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-blue-700 font-bold">
                      <Download size={16} /> {contract.submissionFile || "EULANCE_Storefront_Deliverables_v1.zip"} (14.2 MB)
                    </div>
                  </div>

                  {isClient ? (
                    <div className="pt-4 flex flex-wrap gap-4">
                      <button
                        onClick={handleClientApprove}
                        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs transition-colors shadow-md flex items-center gap-2"
                      >
                        <CheckCircle2 size={18} /> Approve Work & Release €{contract.freelancerNetPayout.toLocaleString()} Escrow
                      </button>
                      <button
                        onClick={() => requestChanges(contract.id)}
                        className="px-6 py-4 bg-white border border-amber-300 text-amber-900 font-bold rounded-2xl text-xs hover:bg-amber-100"
                      >
                        Request Changes
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-white/70 rounded-2xl text-xs text-amber-900 font-medium">
                      Your work has been submitted! Iberia Retail Group is reviewing the deliverables. You will be notified when escrow funds are released.
                    </div>
                  )}
                </div>
              )}

              {/* If Contract is Active & Work in Progress (Not Yet Submitted or In Revision) */}
              {(contract.status === "Active" || contract.status === "In Revision") && (
                <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200 space-y-6">
                  {contract.status === "In Revision" && (
                    <div className="p-4 mb-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs font-bold rounded-r-xl">
                      ⚠️ Revision Requested: The client has requested changes. Escrow remains secured. If a dispute arises, EULANCE Platform Dispute Mediation can be requested.
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-black text-[var(--color-eulance-navy)]">
                      {contract.status === "In Revision" ? "Revising Deliverables" : "Work in Progress"}
                    </h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-800 font-extrabold rounded-full text-xs">
                      Escrow Funded: €{contract.clientTotalPaid.toLocaleString()}
                    </span>
                  </div>

                  {/* Milestone Breakdown (Upwork Style) */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                      <span>Milestones</span>
                      <span>Amount</span>
                    </div>
                    <div className="p-4 flex justify-between items-center bg-white">
                      <div>
                        <div className="font-bold text-[var(--color-eulance-navy)] text-sm">1. Final Project Deliverables</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <CheckCircle2 size={12} className="text-emerald-500"/> Active & Escrow Funded
                        </div>
                      </div>
                      <div className="font-black text-[var(--color-eulance-navy)]">
                        €{contract.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {!isClient ? (
                    <form onSubmit={handleFreelancerSubmitWork} className="space-y-4 text-xs font-semibold">
                      <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                        <strong className="text-emerald-900 block mb-1">Submit Your Deliverables to Client</strong>
                        <p className="text-emerald-800 font-normal">
                          Provide delivery notes and attach final code/design assets to request client approval & instant escrow payout release.
                        </p>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Delivery Notes / Handover Message</label>
                        <textarea
                          rows={4}
                          required
                          value={deliveryNote}
                          onChange={(e) => setDeliveryNote(e.target.value)}
                          className="w-full p-3.5 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
                        >
                          Submit Work for Review <Send size={16} />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-2xl text-xs text-gray-600 leading-relaxed font-medium">
                      The freelancer is currently executing the project deliverables. Once submitted, you will review and trigger escrow release here.
                    </div>
                  )}
                </div>
              )}

              {/* If Contract is Completed */}
              {contract.status === "Completed" && (
                <div className="bg-emerald-50 rounded-3xl p-8 border-2 border-emerald-300 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-lg">
                      <CheckCircle2 size={24} className="text-emerald-600" /> Contract Successfully Completed & Paid
                    </div>
                    <span className="px-3 py-1 bg-emerald-200 text-emerald-950 font-black text-xs rounded-full">
                      Escrow Released
                    </span>
                  </div>

                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Payment of €{contract.freelancerNetPayout.toLocaleString()} has been released to freelancer {contract.freelancerName}.
                  </p>

                  <div className="pt-2 pb-4">
                    <button onClick={() => alert("Downloading Auto-Generated Reverse-Charge EU VAT Invoice...")} className="px-5 py-3 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-extrabold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-2">
                      <FileText size={16} /> Download Auto-Generated EU VAT Invoice
                    </button>
                  </div>

                  {/* Review Display */}
                  {contract.reviewStars && (
                    <div className="bg-white p-6 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[var(--color-eulance-navy)]">Client Verified Review</span>
                        <div className="flex text-amber-500 font-bold text-sm">
                          {"★".repeat(contract.reviewStars)}
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{contract.reviewComment}"</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right Column: Escrow & Financial Summary Panel */}
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Financial & Escrow Summary</h4>
                
                <div className="p-4 rounded-2xl bg-[var(--color-eulance-soft)] border border-gray-200 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Value:</span>
                    <span className="font-mono font-bold text-gray-900">€{contract.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Client EULANCE Fee (15%):</span>
                    <span className="font-mono font-bold text-blue-700">+€{contract.clientFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-2 font-extrabold text-[var(--color-eulance-navy)]">
                    <span>Total Client Escrow Deposit:</span>
                    <span className="font-mono text-sm">€{contract.clientTotalPaid.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-700 pt-1 font-extrabold items-center">
                    <span>
                      Net Freelancer Payout
                      {contract.freelancerFee === 0 ? (
                        <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-bold">
                          <span className="line-through text-emerald-600/60 mr-1">5% Fee</span>
                          0% Founder Promo
                        </span>
                      ) : (
                        <span className="ml-2 font-normal text-gray-500 text-[10px]">(5% Fee)</span>
                      )}
                    </span>
                    <span className="font-mono text-sm">€{contract.freelancerNetPayout.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl text-[11px] text-emerald-900 leading-snug font-medium">
                  <strong>Licensed EU Custody:</strong> Funds are locked safely in money market instruments until work delivery is approved by client.
                </div>
              </div>

            </div>

          </div>

          {/* Modal for Client Approval & Review */}
          {showReviewModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-black text-[var(--color-eulance-navy)]">Approve Work & Rate Freelancer</h3>
                  <button onClick={() => setShowReviewModal(false)} className="text-gray-400 font-bold">✕</button>
                </div>

                <form onSubmit={handleFinalizeReview} className="space-y-4 text-xs font-semibold">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950">
                    <strong className="block text-sm mb-1">Confirm Release of Escrow Payout</strong>
                    Approving work will instantly transfer €{contract.freelancerNetPayout.toLocaleString()} to {contract.freelancerName} and update non-transferable reputation.
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-bold">Star Rating (1 to 5 Stars)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewStars(star)}
                          className={`w-10 h-10 rounded-xl font-extrabold text-base transition-colors ${
                            reviewStars >= star ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">Written Review & Feedback</label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs shadow-md"
                    >
                      Release Payment & Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Direct Messaging Modal */}
          <DirectMessagingModal
            isOpen={showMessagingModal}
            onClose={() => setShowMessagingModal(false)}
            recipientName={recipientName}
            recipientRole={recipientRole}
            recipientCountry={recipientCountry}
            avatar={recipientAvatar}
          />

        </div>
      </main>
    </div>
  );
}
