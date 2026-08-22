"use client";

import React from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import {
  Award,
  Coins,
  FileText,
  Briefcase,
  Search,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Star,
} from "lucide-react";

export default function FreelancerDashboard() {
  const { projects, contracts, activeContract, freelancers } = useDemoState();
  const currentFreelancer = freelancers[0]; // Marco Rossi

  const completedContracts = contracts.filter((c) => c.status === "Completed");
  const totalEarnings = completedContracts.reduce((sum, c) => sum + c.freelancerNetPayout, 0) + 14250; // seeded baseline

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] rounded-2xl font-black text-xl flex items-center justify-center shrink-0 shadow-sm">
                {currentFreelancer.avatar}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
                    {currentFreelancer.name}
                  </h1>
                  {currentFreelancer.founder && (
                    <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center gap-1">
                      <Award size={13} /> Verified Founder #{currentFreelancer.founderBadgeNumber}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-500">
                  {currentFreelancer.role} • {currentFreelancer.city}, {currentFreelancer.country}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo/freelancer/jobs"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors shadow-xs flex items-center gap-2"
              >
                <Search size={16} />
                Find European Work
              </Link>
              <Link
                href="/demo/freelancer/earnings"
                className="px-5 py-3 bg-white border border-gray-300 text-[var(--color-eulance-navy)] rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Coins size={16} />
                View Earnings & Invoices
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Net Earnings</span>
                <Coins size={18} className="text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                €{totalEarnings.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">0% Founder Fee Applied</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Active Contracts</span>
                <FileText size={18} className="text-[var(--color-eulance-navy)]" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                {contracts.filter((c) => c.status === "Active" || c.status === "Delivered").length}
              </div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1">Funds Secured in Escrow</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Completed Jobs</span>
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                {currentFreelancer.jobsCompleted}
              </div>
              <div className="text-[10px] text-gray-500 font-semibold mt-1">100% On-Time Delivery</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold uppercase">Trust Rating</span>
                <Star size={18} className="text-amber-500 fill-amber-400" />
              </div>
              <div className="text-2xl font-black text-[var(--color-eulance-navy)]">
                {currentFreelancer.rating} / 5.0
              </div>
              <div className="text-[10px] text-amber-600 font-semibold mt-1">Non-Transferable Reputation</div>
            </div>
          </div>

          {/* Active Contract Banner */}
          {activeContract && (
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-2">
                  <ShieldCheck size={14} className="text-emerald-300" /> Active Contract • Escrow {activeContract.escrowStatus}
                </div>
                <h3 className="text-xl font-extrabold">{activeContract.projectName}</h3>
                <p className="text-xs text-white/80 mt-1">
                  Client: {activeContract.clientName} ({activeContract.clientCountry}) • Payout Value: €{activeContract.freelancerNetPayout.toLocaleString()} • Status: {activeContract.status}
                </p>
              </div>

              <Link
                href={`/demo/workroom/${activeContract.id}`}
                className="px-6 py-3 bg-white text-emerald-950 font-extrabold rounded-xl text-xs hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2 shrink-0"
              >
                Go to Workroom & Deliver <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* Recommended Jobs & Messages Split */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Recommended Jobs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">Recommended Jobs for You</h2>
                <Link href="/demo/freelancer/jobs" className="text-xs font-bold text-[var(--color-eulance-navy)] hover:underline">
                  Browse All Jobs
                </Link>
              </div>

              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-[10px] mb-2 inline-block">
                          {p.category}
                        </span>
                        <h3 className="text-lg font-extrabold text-[var(--color-eulance-navy)]">{p.title}</h3>
                        <p className="text-xs text-gray-500 font-medium">Posted by {p.client} ({p.clientCountry})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-[var(--color-eulance-navy)] block">{p.budget}</span>
                        <span className="text-[10px] text-emerald-600 font-extrabold">0% Bid Fee</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1.5">
                        {p.skillsRequired.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/demo/freelancer/jobs/${p.id}`}
                        className="px-4 py-2 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white font-bold rounded-xl text-xs transition-colors"
                      >
                        View & Submit Proposal
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Founder Program & Messages */}
            <div className="space-y-6">
              
              {/* Founder Member Program Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-2">
                  <Award size={20} className="text-amber-600" /> Founder Member Badge #042
                </div>
                <p className="text-xs text-amber-950 leading-relaxed mb-4">
                  As one of the first 500 freelancers registered on EULANCE, you hold a permanent verified Founder badge and enjoy 0% platform launch fees.
                </p>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[42%]" />
                </div>
                <span className="text-[10px] text-amber-800 font-bold block mt-1.5 text-right">210 / 500 Founder Spots Claimed</span>
              </div>

              {/* Messages Quick Links */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[var(--color-eulance-navy)]">Active Conversations</h3>
                  <Link href="/demo/messages" className="text-xs font-bold text-[var(--color-eulance-navy)] hover:underline">
                    Open Inbox
                  </Link>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[var(--color-eulance-navy)] block">TechNova Solutions</span>
                    <span className="text-[11px] text-gray-500 truncate max-w-[180px] block">Formal Offer sent for €1,000</span>
                  </div>
                  <Link
                    href="/demo/messages"
                    className="p-2 bg-[var(--color-eulance-navy)] text-white rounded-lg hover:bg-[var(--color-eulance-blue)] transition-colors"
                  >
                    <MessageSquare size={14} />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
