"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import { Proposal } from "@/lib/data/mock";
import { ArrowLeft, MessageSquare, Check, X, User, Euro, FileText, ChevronRight } from "lucide-react";

export default function ProjectATSPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { projects, proposals, sendOffer } = useDemoState();

  const project = projects.find((p) => p.id === resolvedParams.id);
  const projectProposals = proposals.filter((p) => p.projectId === resolvedParams.id);

  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  if (!project) {
    return <div className="p-10 text-center">Project not found</div>;
  }

  // Group proposals by Kanban status
  const pendingProposals = projectProposals.filter((p) => p.status === "Pending");
  const acceptedProposals = projectProposals.filter((p) => p.status === "Accepted");
  const declinedProposals = projectProposals.filter((p) => p.status === "Declined");

  const handleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app we'd update status
    alert("Proposal shortlisted (simulated)");
  };

  const handleHire = (proposal: Proposal) => {
    sendOffer({
      projectId: project.id,
      freelancerId: proposal.freelancerId,
      amount: proposal.bidAmount,
      deadline: "2027-12-31" // Simulated deadline
    });
    router.push("/demo/messages");
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[var(--color-eulance-navy)] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          {/* Header */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight mb-2">
              Review Proposals
            </h1>
            <h2 className="text-lg font-bold text-gray-700">{project.title}</h2>
            <div className="flex gap-4 mt-4 text-sm font-medium text-gray-500">
              <span>Budget: {project.budget}</span>
              <span>•</span>
              <span>{projectProposals.length} Total Proposals</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT COLUMN: ATS Kanban Feed */}
            <div className="flex-1 space-y-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">All Candidates</h3>
              
              <div className="space-y-4">
                {projectProposals.length === 0 ? (
                  <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center text-gray-500">
                    No proposals yet.
                  </div>
                ) : (
                  projectProposals.map((proposal) => (
                    <div 
                      key={proposal.id} 
                      onClick={() => setSelectedProposal(proposal)}
                      className={`p-6 bg-white rounded-2xl border cursor-pointer transition-all ${selectedProposal?.id === proposal.id ? 'border-[var(--color-eulance-navy)] shadow-md ring-1 ring-[var(--color-eulance-navy)]' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 text-[var(--color-eulance-navy)] font-bold text-lg flex items-center justify-center shrink-0">
                            {proposal.freelancerName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-[var(--color-eulance-navy)]">{proposal.freelancerName}</h4>
                            <p className="text-xs text-gray-500">{proposal.freelancerCountry} • <span className="text-emerald-600 font-semibold">100% Free Trial</span></p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-black text-[var(--color-eulance-navy)] block">€{proposal.bidAmount.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 font-semibold block">{proposal.deliveryDays} Days Delivery</span>
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-700 line-clamp-2">
                        "{proposal.coverLetter}"
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedProposal(proposal); }} className="px-4 py-2 bg-[var(--color-eulance-navy)] text-white text-xs font-bold rounded-lg hover:bg-[var(--color-eulance-blue)]">
                          Review Proposal
                        </button>
                        <button onClick={handleShortlist} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 flex items-center gap-1">
                          <Check size={14}/> Shortlist
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Proposal Detail Modal/Panel */}
            {selectedProposal && (
              <aside className="w-full lg:w-96 shrink-0 h-max sticky top-8">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-black text-[var(--color-eulance-navy)]">Proposal Details</h2>
                    <button onClick={() => setSelectedProposal(null)} className="text-gray-400 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                      <div className="w-14 h-14 rounded-full bg-blue-100 text-[var(--color-eulance-navy)] font-bold text-xl flex items-center justify-center shrink-0">
                        {selectedProposal.freelancerName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-[var(--color-eulance-navy)]">{selectedProposal.freelancerName}</h4>
                        <Link href="/demo/client/talent" className="text-xs text-[var(--color-eulance-blue)] hover:underline flex items-center gap-1">
                          View Full Profile <ChevronRight size={12}/>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Bid Amount</span>
                        <span className="text-lg font-black text-[var(--color-eulance-navy)]">€{selectedProposal.bidAmount.toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Delivery</span>
                        <span className="text-lg font-black text-[var(--color-eulance-navy)]">{selectedProposal.deliveryDays} Days</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">Cover Letter</h3>
                      <div className="bg-blue-50/50 p-4 rounded-xl text-sm text-gray-700 leading-relaxed italic border border-blue-100">
                        {selectedProposal.coverLetter}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => setIsMessagingOpen(true)}
                        className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-[var(--color-eulance-navy)] font-bold rounded-xl text-xs transition-colors flex justify-center items-center gap-2"
                      >
                        <MessageSquare size={16} /> Message {selectedProposal.freelancerName.split(' ')[0]}
                      </button>
                      <button 
                        onClick={() => handleHire(selectedProposal)}
                        className="w-full py-3.5 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-extrabold rounded-xl text-xs transition-colors shadow-md"
                      >
                        Hire & Escrow €{selectedProposal.bidAmount.toLocaleString()}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            )}

          </div>

          {/* Direct Messaging Modal */}
          {selectedProposal && (
            <DirectMessagingModal
              isOpen={isMessagingOpen}
              onClose={() => setIsMessagingOpen(false)}
              recipientName={selectedProposal.freelancerName}
              recipientRole="Freelancer"
              recipientCountry={selectedProposal.freelancerCountry}
              avatar={selectedProposal.freelancerName.substring(0, 2).toUpperCase()}
            />
          )}

        </div>
      </main>
    </div>
  );
}
