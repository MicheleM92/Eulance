"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import {
  Briefcase,
  Users,
  PlusCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  Coins,
  Search,
} from "lucide-react";

export default function ClientDashboard() {
  const { projects, contracts, freelancers, activeContract } = useDemoState();
  const [selectedRecipient, setSelectedRecipient] = useState<typeof freelancers[0] | null>(null);

  const totalSpent = contracts
    .filter((c) => c.status === "Completed" || c.status === "Active")
    .reduce((sum, c) => sum + c.clientTotalPaid, 0);

  const activeContractsCount = contracts.filter((c) => c.status === "Active" || c.status === "Delivered").length;
  const openProjectsCount = projects.filter((p) => p.status === "Open").length;

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header & Quick Action */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-xs mb-2">
                Client Portal • TechNova Solutions (Portugal)
              </div>
              <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
                Company Dashboard
              </h1>
              <p className="text-xs text-[var(--color-eulance-muted)] mt-1">
                Manage your European project postings, AI candidate matches, and active escrow contracts.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo/client/projects/new"
                className="px-5 py-3 bg-[var(--color-eulance-navy)] text-white rounded-xl font-bold text-xs hover:bg-[var(--color-eulance-blue)] transition-colors shadow-sm flex items-center gap-2"
              >
                <PlusCircle size={16} className="text-[var(--color-eulance-yellow)]" />
                Post Project (AI Match)
              </Link>
              <Link
                href="/demo/client/talent"
                className="px-5 py-3 bg-white border border-gray-300 text-[var(--color-eulance-navy)] rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors shadow-xs flex items-center gap-2"
              >
                <Search size={16} />
                Find EU Talent
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Total Invested</span>
                <Coins size={18} className="text-[var(--color-eulance-navy)]" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                €{totalSpent.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">Includes 15% EULANCE fee</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Active Contracts</span>
                <FileText size={18} className="text-[var(--color-eulance-blue)]" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                {activeContractsCount}
              </div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1">Escrow Funds Protected</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Open Projects</span>
                <Briefcase size={18} className="text-amber-500" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                {openProjectsCount}
              </div>
              <div className="text-[10px] text-gray-500 font-semibold mt-1">Receiving Candidates</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Matched Candidates</span>
                <Users size={18} className="text-purple-600" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                {freelancers.length}
              </div>
              <div className="text-[10px] text-purple-600 font-semibold mt-1">AI Verified Ratings</div>
            </div>
          </div>

          {/* Active Workroom Banner if active contract exists */}
          {activeContract && (
            <div className="bg-gradient-to-r from-[var(--color-eulance-navy)] to-[var(--color-eulance-blue)] text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs mb-2">
                  <ShieldCheck size={14} /> Active Commercial Contract • Escrow {activeContract.escrowStatus}
                </div>
                <h3 className="text-xl font-extrabold">{activeContract.projectName}</h3>
                <p className="text-xs text-white/80 mt-1">
                  Contract Value: €{activeContract.amount.toLocaleString()} • Client Total: €{activeContract.clientTotalPaid.toLocaleString()} • Freelancer: {activeContract.freelancerName} ({activeContract.freelancerCountry})
                </p>
              </div>

              <Link
                href={`/demo/workroom/${activeContract.id}`}
                className="px-6 py-3 bg-[var(--color-eulance-yellow)] text-[var(--color-eulance-navy)] font-extrabold rounded-xl text-xs hover:bg-yellow-400 transition-colors shadow-md flex items-center gap-2 shrink-0"
              >
                Go to Commercial Workroom <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* Projects & Suggested Candidates Split */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Open Projects */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">Your Projects</h2>
                <Link href="/demo/client/projects/new" className="text-xs font-bold text-[var(--color-eulance-navy)] hover:underline flex items-center gap-1">
                  <PlusCircle size={14} /> Post New Project
                </Link>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-[10px] mb-2">
                          {project.category}
                        </span>
                        <h3 className="font-extrabold text-lg text-[var(--color-eulance-navy)]">{project.title}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-[var(--color-eulance-navy)] block">{project.budget}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          Status: {project.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {project.skillsRequired.map((skill) => (
                          <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                          <Users size={12} /> {project.proposalsCount} Proposals
                        </span>
                        <Link
                          href={`/demo/client/projects/${project.id}`}
                          className="px-3 py-1.5 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-lg font-bold text-[11px] transition-colors"
                        >
                          View Proposals
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: AI Best Match Candidates */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[var(--color-eulance-navy)] flex items-center gap-2">
                  <Zap size={18} className="text-[var(--color-eulance-navy)]" /> AI Candidate Matches
                </h2>
                <Link href="/demo/client/talent" className="text-xs font-bold text-[var(--color-eulance-navy)] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {freelancers.slice(0, 3).map((f, idx) => (
                  <div key={f.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-[var(--color-eulance-navy)] transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] font-bold text-sm flex items-center justify-center shrink-0">
                        {f.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-[var(--color-eulance-navy)] truncate">{f.name}</h4>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                            {96 - idx * 4}% Match
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate">{f.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3 bg-gray-50 p-2 rounded-lg">
                      <span>📍 {f.city}, {f.country}</span>
                      <span className="font-bold text-[var(--color-eulance-navy)]">€{f.hourlyRate}/hr</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/demo/client/talent/${f.id}`}
                        className="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => setSelectedRecipient(f)}
                        className="flex-1 text-center py-2 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Message / Offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Direct Messaging Modal Integration */}
          {selectedRecipient && (
            <DirectMessagingModal
              isOpen={!!selectedRecipient}
              onClose={() => setSelectedRecipient(null)}
              recipientName={selectedRecipient.name}
              recipientRole={selectedRecipient.role}
              recipientCountry={selectedRecipient.country}
              avatar={selectedRecipient.avatar}
            />
          )}

        </div>
      </main>
    </div>
  );
}
