"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import { ArrowLeft, CheckCircle2, ShieldCheck, Send, Paperclip, Euro, MessageSquare } from "lucide-react";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { projects, submitProposal } = useDemoState();

  const project = projects.find((p) => p.id === resolvedParams.id) || projects[0];

  const [bidAmount, setBidAmount] = useState<number>(project.budgetValue || 1000);
  const [deliveryDays, setDeliveryDays] = useState<number>(14);
  const [coverLetter, setCoverLetter] = useState(
    "Hello! I am a senior Next.js & React engineer based in Milan, Italy. I have reviewed your storefront requirements and can deliver high quality, fully typed, responsive code with complete EU VAT compliance within 14 days."
  );
  const [attachmentSimulated, setAttachmentSimulated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    submitProposal({
      projectId: project.id,
      bidAmount,
      deliveryDays,
      coverLetter,
    });
    setSubmitted(true);
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
            <ArrowLeft size={16} /> Back to Job Marketplace
          </button>

          {/* Project Overview */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xs border border-gray-200">
            <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-gray-100">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-[10px] mb-2 inline-block">
                  {project.category}
                </span>
                <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] mb-2">{project.title}</h1>
                <p className="text-xs font-semibold text-gray-500">
                  Posted by {project.client} ({project.clientCountry}) • {project.postedDate}
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-[var(--color-eulance-navy)] block">{project.budget}</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mt-1">
                  100% Escrow Funded
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 space-y-4 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-[var(--color-eulance-navy)] uppercase tracking-wider">Project Description</h3>
              <p className="text-xs text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Skills */}
            <div className="pt-6">
              <h3 className="font-extrabold text-xs text-[var(--color-eulance-navy)] uppercase tracking-wider mb-3">Required Skills & Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.skillsRequired.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Proposal Section */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xs border border-gray-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-2xl font-black text-[var(--color-eulance-navy)]">Proposal Submitted!</h2>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Your bid for €{bidAmount.toLocaleString()} has been transmitted to {project.client}. You will receive a notification when the client opens your proposal.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link
                    href="/demo/freelancer/jobs"
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-200"
                  >
                    Browse More Jobs
                  </Link>
                  <Link
                    href="/demo/messages"
                    className="px-6 py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-xl text-xs hover:bg-[var(--color-eulance-blue)]"
                  >
                    Open Messages
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-6 text-xs font-semibold">
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                  <Send size={18} className="text-[var(--color-eulance-navy)]" />
                  <h2 className="text-xl font-black text-[var(--color-eulance-navy)]">Submit Proposal</h2>
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    0% Bid Connects Fee
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Your Total Bid Amount (€)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                      <input
                        type="number"
                        required
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                      />
                    </div>
                    
                    {/* Fee Breakdown (Upwork Style) */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 font-bold">Standard 5% Platform Fee</span>
                        <span className="text-gray-400 line-through">€{(bidAmount * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-700 font-bold">Founder Promo Fee (0%)</span>
                        <span className="text-emerald-700 font-bold">- €{(bidAmount * 0.05).toFixed(2)}</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-eulance-navy)] font-black">You'll Receive</span>
                        <span className="text-lg font-black text-[var(--color-eulance-navy)]">€{bidAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Estimated Delivery (Days)</label>
                    <input
                      type="number"
                      required
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(Number(e.target.value))}
                      className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Cover Letter / Pitch</label>
                  <textarea
                    rows={5}
                    required
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                  />
                </div>

                {/* Attachment Simulation */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Paperclip size={16} />
                    <span>Attach Portfolio / Sample Files</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachmentSimulated(!attachmentSimulated)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      attachmentSimulated ? "bg-emerald-100 text-emerald-800" : "bg-white border border-gray-300"
                    }`}
                  >
                    {attachmentSimulated ? "✓ Sample_Portfolio_v1.pdf Attached" : "Simulate Attachment"}
                  </button>
                </div>

                <div className="pt-2 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMessagingOpen(true)}
                    className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-[var(--color-eulance-navy)] font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare size={16} /> Message Client First
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-xl text-xs font-extrabold transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    Submit Proposal <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Messaging Modal */}
          <DirectMessagingModal
            isOpen={isMessagingOpen}
            onClose={() => setIsMessagingOpen(false)}
            recipientName={project.client}
            recipientRole="Client"
            recipientCountry={project.clientCountry}
            avatar="TN"
          />

        </div>
      </main>
    </div>
  );
}
