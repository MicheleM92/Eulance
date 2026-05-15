"use client";

import { useState } from "react";
import { dashboardMetrics, projects, freelancers } from "@/lib/data/mock";
import { Plus, Search, ChevronRight, MapPin, Star, ShieldCheck, FileText, Zap, Info, CheckCircle2, Lock, ArrowRight, Euro } from "lucide-react";
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

export default function ClientDashboard() {
  const [hiringState, setHiringState] = useState<'browsing' | 'contract' | 'escrow' | 'active' | 'review' | 'completed'>('browsing');
  const targetFreelancer = freelancers[0]; // Marco Rossi
  
  const handleInvite = () => setHiringState('contract');
  const handleSignContract = () => setHiringState('escrow');
  const handleFundEscrow = () => setHiringState('active');
  const handleSimulateDelivery = () => setHiringState('review');
  const handleApproveWork = () => setHiringState('completed');

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-eulance-navy)] mb-2">Company Dashboard</h1>
            <p className="text-[var(--color-eulance-muted)]">Welcome back, TechNova Solutions.</p>
          </div>
          {hiringState === 'browsing' && (
            <button className="px-4 py-2 bg-[var(--color-eulance-blue)] text-white rounded-md font-medium hover:bg-[var(--color-eulance-navy)] transition-colors flex items-center gap-2">
              <Plus size={18} /> Post New Project
            </button>
          )}
        </div>

        {/* Dynamic Progress Tracker */}
        {hiringState !== 'browsing' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-x-auto pb-4"
          >
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[var(--color-eulance-border)] shadow-sm min-w-[600px]">
              {[
                { id: 'contract', label: '1. Sign Contract' },
              { id: 'escrow', label: '2. Fund Escrow' },
              { id: 'active', label: '3. Work in Progress' },
              { id: 'review', label: '4. Review Delivery' },
              { id: 'completed', label: '5. Funds Released' }
            ].map((step, idx) => {
              const states = ['contract', 'escrow', 'active', 'review', 'completed'];
              const currentIndex = states.indexOf(hiringState);
              const stepIndex = states.indexOf(step.id);
              const isActive = step.id === hiringState;
              const isPast = stepIndex < currentIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center min-w-[80px] ${isActive ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 font-bold text-sm shrink-0 ${isActive ? 'bg-[var(--color-eulance-blue)] text-white ring-4 ring-[var(--color-eulance-blue)]/20' : isPast ? 'bg-[var(--color-eulance-emerald)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {isPast ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-[var(--color-eulance-navy)]' : isPast ? 'text-[var(--color-eulance-emerald)]' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 4 && <div className={`w-8 md:w-16 h-1 mx-2 rounded shrink-0 ${isPast ? 'bg-[var(--color-eulance-emerald)]' : 'bg-gray-200'}`} />}
                </div>
              )
            })}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              
              {/* STATE 0: BROWSING */}
              {hiringState === 'browsing' && (
                <motion.div key="browsing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <InvestorNote title="AI Matching & Verified Talent">
                    Unlike traditional platforms, EULANCE surfaces a curated shortlist of verified EU professionals instantly using AI matching, reducing time-to-hire dramatically.
                  </InvestorNote>
                  
                  <h2 className="text-xl font-bold text-[var(--color-eulance-navy)] mb-6">AI Suggested Matches for "E-commerce Redesign MVP"</h2>
                  
                  <div className="bg-white p-6 rounded-xl border-2 border-[var(--color-eulance-blue)] shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[var(--color-eulance-blue)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                      <Zap size={12} /> 94% Match
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-eulance-navy)] text-white flex items-center justify-center font-bold text-xl">
                        {targetFreelancer.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-bold text-[var(--color-eulance-navy)]">{targetFreelancer.name}</h4>
                          <ShieldCheck size={18} className="text-[var(--color-eulance-emerald)]" />
                        </div>
                        <p className="text-sm text-[var(--color-eulance-muted)] mb-2">{targetFreelancer.role}</p>
                        <div className="flex items-center gap-4 text-sm text-[var(--color-eulance-navy)] font-medium">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {targetFreelancer.country}</span>
                          <span className="flex items-center gap-1"><Star size={14} className="text-[var(--color-eulance-gold)] fill-current" /> {targetFreelancer.rating}</span>
                          <span>€{targetFreelancer.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {targetFreelancer.skills.map(s => (
                        <span key={s} className="px-2 py-1 bg-[var(--color-eulance-soft)] text-xs rounded-md">{s}</span>
                      ))}
                    </div>
                    <button onClick={handleInvite} className="w-full py-3 bg-[var(--color-eulance-blue)] text-white font-bold rounded-lg hover:bg-[var(--color-eulance-navy)] transition-colors shadow-sm">
                      Hire for E-commerce MVP (€4,500)
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 1: CONTRACT */}
              {hiringState === 'contract' && (
                <motion.div key="contract" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <InvestorNote title="EU-Compliant Contracts">
                    EULANCE automatically generates multi-lingual, legally binding contracts localized to EU jurisdictions. This prevents off-platform leakage because freelancers rely on this built-in legal protection.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-xl border border-[var(--color-eulance-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-[var(--color-eulance-border)] pb-4">
                      <FileText className="text-[var(--color-eulance-blue)]" size={28} />
                      <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Independent Contractor Agreement</h2>
                    </div>
                    
                    <div className="space-y-4 mb-8 text-sm text-[var(--color-eulance-text)] bg-gray-50 p-6 rounded-lg border border-gray-200 h-64 overflow-y-auto">
                      <p><strong>Parties:</strong> TechNova Solutions (Client) and Marco Rossi (Contractor).</p>
                      <p><strong>Jurisdiction:</strong> Italy / European Union standard framework.</p>
                      <p><strong>Scope of Work:</strong> E-commerce Redesign MVP as detailed in Project ID #p1.</p>
                      <p><strong>Compensation:</strong> Fixed fee of €4,500.00 EUR.</p>
                      <p><strong>Payment Terms:</strong> Funds will be held in EULANCE Escrow and released immediately upon Client approval of delivered work.</p>
                      <p><strong>Intellectual Property:</strong> Upon full payment, all IP rights transfer to the Client.</p>
                      <p><em>(Simulated legal text for prototype purposes...)</em></p>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setHiringState('browsing')} className="px-6 py-3 border border-[var(--color-eulance-border)] rounded-lg font-bold text-[var(--color-eulance-navy)]">Cancel</button>
                      <button onClick={handleSignContract} className="flex-1 py-3 bg-[var(--color-eulance-blue)] text-white font-bold rounded-lg shadow-sm hover:bg-[var(--color-eulance-navy)] transition-colors flex justify-center items-center gap-2">
                        Digitally Sign & Proceed <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: ESCROW */}
              {hiringState === 'escrow' && (
                <motion.div key="escrow" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <InvestorNote title="The 15% Platform Fee & Escrow">
                    Clients pay a 15% transaction fee on top of the contract. The total amount is locked in a licensed Escrow. EULANCE earns interest on the float until delivery. Zero upfront subscriptions.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-xl border border-[var(--color-eulance-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Lock className="text-[var(--color-eulance-emerald)]" size={28} />
                      <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Fund Escrow</h2>
                    </div>
                    
                    <div className="bg-[var(--color-eulance-soft)] p-6 rounded-xl mb-8">
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--color-eulance-border)]">
                        <span className="font-medium text-[var(--color-eulance-navy)]">Freelancer Contract Value</span>
                        <span className="font-bold">€4,500.00</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--color-eulance-border)]">
                        <span className="font-medium flex items-center gap-2 text-[var(--color-eulance-navy)]">
                          EULANCE Platform Fee (15%)
                        </span>
                        <span className="font-bold text-[var(--color-eulance-blue)]">€675.00</span>
                      </div>
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-extrabold text-[var(--color-eulance-navy)]">Total to Fund</span>
                        <span className="font-extrabold text-[var(--color-eulance-navy)]">€5,175.00</span>
                      </div>
                    </div>

                    <div className="mb-8 p-4 border border-[var(--color-eulance-border)] rounded-lg flex items-start gap-4">
                      <input type="radio" checked readOnly className="mt-1" />
                      <div>
                        <div className="font-bold text-[var(--color-eulance-navy)]">Corporate SEPA Direct Debit / Credit Card</div>
                        <div className="text-sm text-[var(--color-eulance-muted)]">Ends in 4242</div>
                      </div>
                    </div>

                    <button onClick={handleFundEscrow} className="w-full py-4 bg-[var(--color-eulance-emerald)] text-white font-bold text-lg rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                      <Lock size={20} /> Secure €5,175.00 in Escrow
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 3: ACTIVE */}
              {hiringState === 'active' && (
                <motion.div key="active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="bg-[var(--color-eulance-mint)] border border-[var(--color-eulance-emerald)] p-8 rounded-xl text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <CheckCircle2 size={40} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-eulance-emerald)] mb-2">Contract Active & Funded!</h2>
                    <p className="text-[var(--color-eulance-emerald)]/80 max-w-lg mx-auto">
                      Marco Rossi has been notified and can begin work. Your funds are secured in the EU-licensed Escrow and will not be released until you approve the final delivery.
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-[var(--color-eulance-muted)] mb-4">Fast-forward simulation:</p>
                    <button onClick={handleSimulateDelivery} className="px-6 py-3 bg-white border-2 border-[var(--color-eulance-blue)] text-[var(--color-eulance-blue)] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                      Simulate: Freelancer Delivers Work
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 4: REVIEW */}
              {hiringState === 'review' && (
                <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <InvestorNote title="Dispute Protection">
                    By locking funds upfront, EULANCE eliminates non-payment risk. If the client is unhappy, the platform offers structured dispute resolution. If happy, 1-click approval handles the invoice and releases cash instantly.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-xl border-2 border-[var(--color-eulance-gold)] shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-yellow-100 text-[var(--color-eulance-darkGold)] rounded-full flex items-center justify-center">
                        <Zap size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Work Submitted for Approval</h2>
                        <p className="text-[var(--color-eulance-muted)]">Marco Rossi has delivered the E-commerce MVP.</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                      <h4 className="font-bold text-[var(--color-eulance-navy)] mb-2">Delivery Note from Freelancer:</h4>
                      <p className="text-sm text-[var(--color-eulance-text)] italic">"Hi team! The Next.js storefront is complete and tested. The Stripe integration is live in test mode. Looking forward to your feedback!"</p>
                    </div>

                    <div className="flex gap-4">
                      <button className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50">Request Changes</button>
                      <button onClick={handleApproveWork} className="flex-1 py-3 bg-[var(--color-eulance-emerald)] text-white font-bold text-lg rounded-lg shadow-md hover:bg-emerald-700 transition-colors">
                        Approve & Release Payment
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 5: COMPLETED */}
              {hiringState === 'completed' && (
                <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <InvestorNote title="VAT & Invoicing Compliance">
                    Upon release, EULANCE automatically generates a cross-border VAT-compliant invoice between the client and freelancer. Admin overhead is reduced to zero.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-xl border border-[var(--color-eulance-border)] shadow-sm text-center">
                    <div className="w-24 h-24 bg-[var(--color-eulance-mint)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Euro size={48} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-eulance-navy)] mb-2">Project Completed!</h2>
                    <p className="text-lg text-[var(--color-eulance-muted)] mb-8">
                      €4,500 has been released to Marco Rossi. Your official EU VAT invoice has been generated.
                    </p>
                    <button onClick={() => setHiringState('browsing')} className="px-8 py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-lg hover:bg-blue-900 transition-colors">
                      Return to Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar - Static Info */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-[var(--color-eulance-navy)] text-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-4 text-[var(--color-eulance-gold)]">Why use EULANCE?</h3>
              <ul className="space-y-4 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[var(--color-eulance-gold)] shrink-0" />
                  Free to post & browse. Pay only when you hire successfully.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[var(--color-eulance-gold)] shrink-0" />
                  Legally compliant contracts auto-generated for EU jurisdictions.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[var(--color-eulance-gold)] shrink-0" />
                  Automated reverse-charge VAT handling and invoicing.
                </li>
              </ul>
            </div>
            
            {hiringState === 'browsing' && (
              <div className="bg-white p-6 rounded-xl border border-[var(--color-eulance-border)] shadow-sm">
                <h3 className="font-bold text-[var(--color-eulance-navy)] mb-4">Your Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-eulance-muted)]">Total Spent</span>
                    <span className="font-bold">{dashboardMetrics.client.totalSpent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-eulance-muted)]">Hires</span>
                    <span className="font-bold">{dashboardMetrics.client.hiredFreelancers}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
