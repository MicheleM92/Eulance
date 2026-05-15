"use client";

import { useState } from "react";
import { dashboardMetrics, projects, freelancers } from "@/lib/data/mock";
import { CheckCircle2, MapPin, Star, ShieldCheck, TrendingUp, Zap, FileText, Briefcase, ChevronRight, Info, Send, Upload, Euro } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function InvestorNote({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-eulance-navy)] text-white p-4 rounded-xl border border-[var(--color-eulance-blue)] mb-6 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Info size={16} className="text-[var(--color-eulance-gold)]" />
        <span className="font-bold text-sm text-[var(--color-eulance-gold)] uppercase tracking-wider">Investor Note: {title}</span>
      </div>
      <div className="text-sm text-white/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function FreelancerDashboard() {
  const [workState, setWorkState] = useState<'browsing' | 'proposal' | 'active' | 'submitting' | 'paid'>('browsing');
  const me = freelancers[0]; // Marco Rossi
  const targetProject = projects[0]; // E-commerce Redesign MVP

  const handleSendProposal = () => setWorkState('proposal');
  const handleSubmitProposal = () => setWorkState('active'); // Skipping 'pending' for demo brevity
  const handleDeliverWork = () => setWorkState('submitting');
  const handleConfirmSubmission = () => setWorkState('paid');

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-eulance-navy)] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              {me.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[var(--color-eulance-navy)]">{me.name}</h1>
                <span title="Verified EU Professional"><ShieldCheck size={20} className="text-[var(--color-eulance-emerald)]" /></span>
                <span className="bg-[var(--color-eulance-gold)]/20 text-[var(--color-eulance-darkGold)] text-xs font-bold px-2 py-0.5 rounded uppercase">Founder</span>
              </div>
              <p className="text-[var(--color-eulance-muted)] font-medium flex items-center gap-1">
                {me.role} • <MapPin size={14} /> {me.country}
              </p>
            </div>
          </div>
          {workState === 'browsing' && (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-[var(--color-eulance-border)] text-[var(--color-eulance-navy)] rounded-md font-medium hover:bg-[var(--color-eulance-soft)] transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-[var(--color-eulance-blue)] text-white rounded-md font-medium hover:bg-[var(--color-eulance-navy)] transition-colors flex items-center gap-2">
                <Zap size={16} /> Update Availability
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Progress Tracker */}
        {workState !== 'browsing' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-x-auto pb-4"
          >
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[var(--color-eulance-border)] shadow-sm min-w-[500px]">
            {[
              { id: 'proposal', label: '1. Send Proposal' },
              { id: 'active', label: '2. Work in Progress' },
              { id: 'submitting', label: '3. Submit Work' },
              { id: 'paid', label: '4. Get Paid' }
            ].map((step, idx) => {
              const states = ['proposal', 'active', 'submitting', 'paid'];
              const currentIndex = states.indexOf(workState);
              const stepIndex = states.indexOf(step.id);
              const isActive = step.id === workState;
              const isPast = stepIndex < currentIndex;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center flex-1 min-w-[80px] ${isActive ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 font-bold text-sm shrink-0 ${isActive ? 'bg-[var(--color-eulance-emerald)] text-white ring-4 ring-[var(--color-eulance-mint)]' : isPast ? 'bg-[var(--color-eulance-navy)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {isPast ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-[var(--color-eulance-emerald)]' : isPast ? 'text-[var(--color-eulance-navy)]' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && <div className={`w-full h-1 mx-2 rounded shrink-0 ${isPast ? 'bg-[var(--color-eulance-navy)]' : 'bg-gray-200'}`} />}
                </div>
              )
            })}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              
              {/* STATE 0: BROWSING */}
              {workState === 'browsing' && (
                <motion.div key="browsing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <InvestorNote title="No Pay-to-Play">
                    Unlike other platforms where freelancers must buy "connects" or credits to bid on jobs, EULANCE is 100% free to join and propose. We align incentives by only taking a 5% fee on successful delivery.
                  </InvestorNote>
                  
                  <h2 className="text-xl font-bold text-[var(--color-eulance-navy)] flex items-center gap-2 mb-6">
                    <Zap className="text-[var(--color-eulance-gold)]" size={20} /> AI Project Matches
                  </h2>
                  
                  <div className="bg-white p-6 rounded-xl border-2 border-[var(--color-eulance-blue)] shadow-md hover:border-[var(--color-eulance-navy)] transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-[var(--color-eulance-navy)]">{targetProject.title}</h3>
                          <span className="px-2 py-0.5 bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] text-xs font-bold rounded">
                            {targetProject.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-eulance-muted)] flex items-center gap-1">
                          <Briefcase size={14} /> {targetProject.client} • Posted {targetProject.postedDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-[var(--color-eulance-navy)]">{targetProject.budget}</div>
                        <div className="text-xs text-[var(--color-eulance-muted)]">Fixed Price</div>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-eulance-text)] mb-4">{targetProject.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {targetProject.skillsRequired.map(skill => (
                        <span key={skill} className={`px-2 py-1 text-xs rounded-md bg-blue-50 text-[var(--color-eulance-blue)] border border-blue-100 font-medium`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button onClick={handleSendProposal} className="w-full py-3 bg-[var(--color-eulance-blue)] text-white font-bold rounded-lg hover:bg-[var(--color-eulance-navy)] transition-colors shadow-sm">
                      Apply for Project
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 1: PROPOSAL */}
              {workState === 'proposal' && (
                <motion.div key="proposal" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <InvestorNote title="Verified Company Clients">
                    All clients on EULANCE undergo basic verification. When a freelancer sends a proposal, they know they are talking to a real EU company with a valid VAT number, drastically reducing scam risk.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-xl border border-[var(--color-eulance-border)] shadow-sm">
                    <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-6">Submit Proposal for {targetProject.title}</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-[var(--color-eulance-navy)] mb-2">Your Proposed Rate</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-[var(--color-eulance-muted)]">€</span>
                          </div>
                          <input type="text" readOnly value="4,500" className="bg-gray-50 border border-[var(--color-eulance-border)] text-[var(--color-eulance-navy)] text-lg rounded-lg block w-full pl-8 p-3" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--color-eulance-navy)] mb-2">Cover Letter</label>
                        <textarea readOnly className="bg-gray-50 border border-[var(--color-eulance-border)] text-[var(--color-eulance-text)] text-sm rounded-lg block w-full p-3 h-32" value="Hi TechNova team! I have over 5 years of experience building Next.js e-commerce sites and have successfully integrated Stripe over 10 times. I can deliver this MVP within your timeline." />
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-[var(--color-eulance-border)]">
                        <button onClick={() => setWorkState('browsing')} className="px-6 py-3 border border-[var(--color-eulance-border)] rounded-lg font-bold text-[var(--color-eulance-navy)]">Cancel</button>
                        <button onClick={handleSubmitProposal} className="flex-1 py-3 bg-[var(--color-eulance-emerald)] text-white font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                          Send Proposal <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: ACTIVE (SIMULATING FAST FORWARD) */}
              {workState === 'active' && (
                <motion.div key="active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <InvestorNote title="Escrow Security">
                    Freelancers often suffer from delayed or unpaid invoices. On EULANCE, once the contract is active, 100% of the funds are already secured in the platform's Escrow. The freelancer works with complete peace of mind.
                  </InvestorNote>

                  <div className="bg-[var(--color-eulance-mint)] border border-[var(--color-eulance-emerald)] p-8 rounded-xl text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <ShieldCheck size={40} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-eulance-emerald)] mb-2">Contract Active! Client Funded Escrow</h2>
                    <p className="text-[var(--color-eulance-emerald)]/80 max-w-lg mx-auto">
                      TechNova Solutions has deposited €4,500.00 into Escrow. You are protected and can begin working on the E-commerce Redesign MVP safely.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-[var(--color-eulance-border)] text-center">
                    <p className="text-[var(--color-eulance-muted)] mb-4">Fast-forward simulation:</p>
                    <button onClick={handleDeliverWork} className="px-8 py-3 bg-white border-2 border-[var(--color-eulance-navy)] text-[var(--color-eulance-navy)] font-bold rounded-lg hover:bg-[var(--color-eulance-soft)] transition-colors">
                      Simulate: Work Completed
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 3: SUBMIT WORK */}
              {workState === 'submitting' && (
                <motion.div key="submitting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-white p-8 rounded-xl border border-[var(--color-eulance-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[var(--color-eulance-soft)] text-[var(--color-eulance-navy)] rounded-full flex items-center justify-center">
                        <Upload size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Submit Work for Payment</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-[var(--color-eulance-navy)] mb-2">Message to Client</label>
                        <textarea className="bg-white border border-[var(--color-eulance-border)] focus:border-[var(--color-eulance-blue)] outline-none text-[var(--color-eulance-text)] text-sm rounded-lg block w-full p-3 h-32" defaultValue="Hi team! The Next.js storefront is complete and tested. The Stripe integration is live in test mode. Looking forward to your feedback!" />
                      </div>
                      
                      <div className="border-2 border-dashed border-[var(--color-eulance-border)] p-8 rounded-lg text-center text-[var(--color-eulance-muted)] bg-gray-50">
                        <FileText className="mx-auto mb-2 text-gray-400" size={32} />
                        <p className="text-sm font-medium">Attach Final Deliverables (ZIP, PDF, Links)</p>
                      </div>

                      <button onClick={handleConfirmSubmission} className="w-full py-4 bg-[var(--color-eulance-emerald)] text-white font-bold text-lg rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                        Submit Work & Request €4,500
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 4: PAID */}
              {workState === 'paid' && (
                <motion.div key="paid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <InvestorNote title="The Fair 5% Freelancer Fee">
                    While competitors charge up to 20%, EULANCE charges the freelancer a flat 5% ONLY upon successful delivery. The system automatically handles the payout and the cross-border VAT compliance paperwork.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-xl border-2 border-[var(--color-eulance-emerald)] shadow-lg text-center">
                    <div className="w-24 h-24 bg-[var(--color-eulance-mint)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Euro size={48} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-eulance-navy)] mb-2">Payment Released!</h2>
                    <p className="text-lg text-[var(--color-eulance-muted)] mb-8">
                      TechNova Solutions approved your work. Funds have been transferred to your connected bank account.
                    </p>

                    <div className="max-w-sm mx-auto bg-[var(--color-eulance-soft)] p-6 rounded-xl mb-8 text-left">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[var(--color-eulance-muted)] text-sm">Contract Amount</span>
                        <span className="font-semibold text-[var(--color-eulance-navy)]">€4,500.00</span>
                      </div>
                      <div className="flex justify-between items-center mb-3 pb-3 border-b border-[var(--color-eulance-border)]">
                        <span className="text-[var(--color-eulance-muted)] text-sm">EULANCE Fee (5%)</span>
                        <span className="font-semibold text-red-500">-€225.00</span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold text-[var(--color-eulance-navy)]">Your Earnings</span>
                        <span className="font-extrabold text-[var(--color-eulance-emerald)]">€4,275.00</span>
                      </div>
                    </div>

                    <button onClick={() => setWorkState('browsing')} className="px-8 py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-lg hover:bg-blue-900 transition-colors">
                      Return to Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar - Metrics */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[var(--color-eulance-border)] shadow-sm">
              <h3 className="font-bold text-[var(--color-eulance-navy)] mb-4">Your Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-[var(--color-eulance-muted)] mb-1">Total Earnings</div>
                  <div className="text-2xl font-bold text-[var(--color-eulance-emerald)]">{dashboardMetrics.freelancer.totalEarnings}</div>
                </div>
                <div className="pt-4 border-t border-[var(--color-eulance-border)]">
                  <div className="text-sm font-medium text-[var(--color-eulance-muted)] mb-1">Trust Score</div>
                  <div className="text-xl font-bold text-[var(--color-eulance-navy)]">{dashboardMetrics.freelancer.trustScore} / 100</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-eulance-navy)] to-[var(--color-eulance-blue)] rounded-xl p-6 text-white shadow-md">
              <FileText className="mb-3 text-[var(--color-eulance-gold)]" size={28} />
              <h3 className="font-bold text-lg mb-2">EU Compliance Ready</h3>
              <p className="text-sm text-white/80 mb-4">
                Your end-of-year VAT and income reports will be automatically generated based on your completed contracts.
              </p>
              <button className="text-sm font-bold flex items-center hover:text-[var(--color-eulance-gold)] transition-colors">
                View Tax Settings <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
