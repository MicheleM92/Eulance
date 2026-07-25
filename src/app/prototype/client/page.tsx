"use client";

import { useState } from "react";
import { dashboardMetrics, projects as initialProjects, freelancers as initialFreelancers, Freelancer, Project } from "@/lib/data/mock";
import { Plus, Search, ChevronRight, MapPin, Star, ShieldCheck, FileText, Zap, Info, CheckCircle2, Lock, ArrowRight, Euro, MessageSquare, Download, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import LegalContractModal from "@/components/contract/LegalContractModal";
import VatInvoiceModal from "@/components/invoice/VatInvoiceModal";
import PostProjectModal from "@/components/projects/PostProjectModal";

function InvestorNote({ title, children }: { title: string; children: React.ReactNode }) {
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
  const [freelancerList, setFreelancerList] = useState<Freelancer[]>(initialFreelancers);
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFreelancer, setActiveFreelancer] = useState<Freelancer>(initialFreelancers[0]);
  const [digitalSignature, setDigitalSignature] = useState<string>("");

  // Modals state
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isVatModalOpen, setIsVatModalOpen] = useState(false);
  const [isPostProjectOpen, setIsPostProjectOpen] = useState(false);

  // Filter logic
  const filteredFreelancers = freelancerList.filter((f) => {
    const matchesCountry = selectedCountry === "All" || f.country === selectedCountry;
    const matchesQuery = searchQuery === "" || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCountry && matchesQuery;
  });

  const handleHireClick = (freelancer: Freelancer) => {
    setActiveFreelancer(freelancer);
    setHiringState('contract');
  };

  const handleContractSigned = (sig: string) => {
    setDigitalSignature(sig);
    setIsContractModalOpen(false);
    setHiringState('escrow');
  };

  const handleFundEscrow = () => setHiringState('active');
  const handleSimulateDelivery = () => setHiringState('review');
  const handleApproveWork = () => setHiringState('completed');

  const handleNewProjectPosted = (newProj: Project) => {
    setProjectList([newProj, ...projectList]);
  };

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-extrabold text-[var(--color-eulance-navy)]">Company Portal</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] text-xs font-bold uppercase">
                Verified EU Client
              </span>
            </div>
            <p className="text-[var(--color-eulance-muted)]">TechNova Solutions (EU VAT ID: PT509876543)</p>
          </div>

          <div className="flex items-center gap-3">
            {hiringState === 'browsing' && (
              <button
                onClick={() => setIsPostProjectOpen(true)}
                className="px-5 py-2.5 bg-[var(--color-eulance-blue)] text-white rounded-xl font-bold hover:bg-[var(--color-eulance-navy)] transition-all shadow-md flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> Post New Project
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Progress Tracker */}
        {hiringState !== 'browsing' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-x-auto pb-4"
          >
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm min-w-[650px]">
              {[
                { id: 'contract', label: '1. Sign EU Contract' },
                { id: 'escrow', label: '2. Fund Escrow (15%)' },
                { id: 'active', label: '3. Work in Progress' },
                { id: 'review', label: '4. Review Delivery' },
                { id: 'completed', label: '5. VAT Invoice & Release' }
              ].map((step, idx) => {
                const states = ['contract', 'escrow', 'active', 'review', 'completed'];
                const currentIndex = states.indexOf(hiringState);
                const stepIndex = states.indexOf(step.id);
                const isActive = step.id === hiringState;
                const isPast = stepIndex < currentIndex;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex flex-col items-center min-w-[100px] ${isActive ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'}`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 font-bold text-sm shrink-0 transition-all ${isActive ? 'bg-[var(--color-eulance-blue)] text-white ring-4 ring-[var(--color-eulance-blue)]/20' : isPast ? 'bg-[var(--color-eulance-emerald)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {isPast ? <CheckCircle2 size={18} /> : idx + 1}
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-[var(--color-eulance-navy)] font-bold' : isPast ? 'text-[var(--color-eulance-emerald)]' : 'text-gray-500'}`}>
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
                  <InvestorNote title="Curated EU Talent & Direct Messaging">
                    EULANCE eliminates cold reach-outs and unverified bids. Clients browse verified EU professionals filtered by country (Portugal, Spain, Italy, Germany, France) and chat safely in-platform before signing.
                  </InvestorNote>
                  
                  {/* Search and Filters */}
                  <div className="bg-white p-4 rounded-xl border border-[var(--color-eulance-border)] shadow-xs mb-6 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search talent by skill, name, or role (e.g. Next.js, React, Designer)..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--color-eulance-blue)]"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-500 shrink-0" />
                        <select
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 font-medium text-[var(--color-eulance-navy)] focus:outline-none"
                        >
                          <option value="All">All EU Countries</option>
                          <option value="Portugal">Portugal (Phase 1)</option>
                          <option value="Spain">Spain (Phase 1)</option>
                          <option value="Italy">Italy (Phase 2)</option>
                          <option value="Germany">Germany (Phase 2)</option>
                          <option value="France">France (Phase 2)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-[var(--color-eulance-navy)] mb-4 flex items-center justify-between">
                    <span>Available Verified Freelancers ({filteredFreelancers.length})</span>
                    <span className="text-xs text-[var(--color-eulance-blue)] font-semibold flex items-center gap-1">
                      <Sparkles size={14} /> AI Ranked Shortlist
                    </span>
                  </h2>
                  
                  <div className="space-y-4">
                    {filteredFreelancers.map((freelancer) => (
                      <div
                        key={freelancer.id}
                        className={`bg-white p-6 rounded-2xl border transition-all shadow-sm ${
                          freelancer.id === "f1"
                            ? "border-2 border-[var(--color-eulance-blue)] shadow-md"
                            : "border-[var(--color-eulance-border)] hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--color-eulance-navy)] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
                              {freelancer.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-xl font-bold text-[var(--color-eulance-navy)]">{freelancer.name}</h4>
                                {freelancer.verified && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-[var(--color-eulance-emerald)] text-xs font-bold border border-emerald-200">
                                    <ShieldCheck size={14} /> Verified EU
                                  </span>
                                )}
                                {freelancer.founder && (
                                  <span className="px-2 py-0.5 rounded bg-[var(--color-eulance-gold)]/20 text-[var(--color-eulance-darkGold)] text-xs font-bold uppercase">
                                    Founder Badge
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[var(--color-eulance-muted)] font-medium mb-1">{freelancer.role}</p>
                              <div className="flex items-center gap-4 text-xs text-[var(--color-eulance-navy)] font-semibold">
                                <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {freelancer.country}</span>
                                <span className="flex items-center gap-1"><Star size={14} className="text-[var(--color-eulance-gold)] fill-current" /> {freelancer.rating} ({freelancer.jobsCompleted} jobs)</span>
                                <span>€{freelancer.hourlyRate}/hr</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs bg-blue-50 text-[var(--color-eulance-blue)] px-2.5 py-1 rounded-md font-bold block mb-2">
                              {freelancer.availability}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[var(--color-eulance-text)] mb-4 leading-relaxed">{freelancer.bio}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {freelancer.skills.map((s) => (
                            <span key={s} className="px-2.5 py-1 bg-[var(--color-eulance-soft)] text-xs rounded-md font-medium text-[var(--color-eulance-navy)]">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => {
                              setActiveFreelancer(freelancer);
                              setIsMessagingOpen(true);
                            }}
                            className="px-4 py-2.5 border border-[var(--color-eulance-border)] text-[var(--color-eulance-navy)] hover:bg-gray-50 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                          >
                            <MessageSquare size={16} /> Direct Message
                          </button>

                          <button
                            onClick={() => handleHireClick(freelancer)}
                            className="flex-1 py-2.5 bg-[var(--color-eulance-blue)] hover:bg-[var(--color-eulance-navy)] text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            Create Contract with {freelancer.name.split(" ")[0]} (€4,500) <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STATE 1: CONTRACT */}
              {hiringState === 'contract' && (
                <motion.div key="contract" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <InvestorNote title="EU-Compliant Contracts & Legal Lock-In">
                    EULANCE automatically generates multi-lingual, legally binding contracts localized to EU jurisdictions. This eliminates legal ambiguity and prevents off-platform leakage.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm">
                    <div className="flex items-center justify-between border-b border-[var(--color-eulance-border)] pb-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 text-[var(--color-eulance-blue)] rounded-xl flex items-center justify-center">
                          <FileText size={28} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">EU Contractor Agreement</h2>
                          <p className="text-xs text-[var(--color-eulance-muted)]">Client: TechNova Solutions | Freelancer: {activeFreelancer.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsContractModalOpen(true)}
                        className="px-3 py-1.5 bg-blue-50 text-[var(--color-eulance-blue)] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        Open Full Inspector & Signature
                      </button>
                    </div>
                    
                    <div className="space-y-4 mb-8 text-sm text-[var(--color-eulance-text)] bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <p><strong>Parties:</strong> TechNova Solutions (Client, Portugal VAT PT509876543) and {activeFreelancer.name} (Contractor, {activeFreelancer.country} VAT {activeFreelancer.vatNumber}).</p>
                      <p><strong>Jurisdiction:</strong> Portugal / {activeFreelancer.country} EU Harmonized Framework.</p>
                      <p><strong>Scope of Work:</strong> E-commerce Redesign MVP (Next.js storefront & Stripe payment portal).</p>
                      <p><strong>Agreed Amount:</strong> €4,500.00 EUR (Fixed Fee).</p>
                      <p><strong>Escrow Terms:</strong> Funds held securely by EULANCE licensed payment provider prior to work commencement.</p>
                    </div>

                    {digitalSignature && (
                      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900">
                        <CheckCircle2 className="text-[var(--color-eulance-emerald)] shrink-0" size={20} />
                        <div>
                          <p className="font-bold">Digitally Signed by {digitalSignature}</p>
                          <p className="text-emerald-700 font-mono text-[11px]">Timestamp: {new Date().toLocaleString()} | Hash: SHA256-e7a9...f4</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button onClick={() => setHiringState('browsing')} className="px-6 py-3 border border-[var(--color-eulance-border)] rounded-xl font-bold text-[var(--color-eulance-navy)] hover:bg-gray-50">
                        Back to Talent
                      </button>
                      
                      {!digitalSignature ? (
                        <button
                          onClick={() => setIsContractModalOpen(true)}
                          className="flex-1 py-3 bg-[var(--color-eulance-blue)] text-white font-bold rounded-xl shadow-sm hover:bg-[var(--color-eulance-navy)] transition-colors flex justify-center items-center gap-2"
                        >
                          Review & Digitally Sign Contract <ArrowRight size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setHiringState('escrow')}
                          className="flex-1 py-3 bg-[var(--color-eulance-emerald)] text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2"
                        >
                          Proceed to Escrow Deposit (€5,175.00) <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: ESCROW */}
              {hiringState === 'escrow' && (
                <motion.div key="escrow" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <InvestorNote title="15% Client Platform Fee & Escrow Interest Float">
                    Clients pay a 15% transaction fee on top of the contract. The total sum (€5,175) is locked in a licensed EU Escrow. EULANCE earns interest on the float until delivery. No subscriptions required.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-emerald-50 text-[var(--color-eulance-emerald)] rounded-xl flex items-center justify-center">
                        <Lock size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Fund Licensed Escrow</h2>
                        <p className="text-xs text-[var(--color-eulance-muted)]">Secured by Licensed EU Financial Institution</p>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--color-eulance-soft)] p-6 rounded-2xl mb-8 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-[var(--color-eulance-border)]">
                        <span className="font-medium text-[var(--color-eulance-navy)]">Freelancer Contract Sum</span>
                        <span className="font-bold">€4,500.00</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-[var(--color-eulance-border)]">
                        <span className="font-medium text-[var(--color-eulance-navy)] flex items-center gap-1.5">
                          EULANCE Platform Fee (15%)
                        </span>
                        <span className="font-bold text-[var(--color-eulance-blue)]">€675.00</span>
                      </div>
                      <div className="flex justify-between items-center text-xl pt-2">
                        <span className="font-extrabold text-[var(--color-eulance-navy)]">Total Escrow Deposit</span>
                        <span className="font-black text-[var(--color-eulance-navy)]">€5,175.00</span>
                      </div>
                    </div>

                    <div className="mb-8 p-4 border border-gray-200 rounded-xl flex items-start gap-4 bg-gray-50">
                      <input type="radio" checked readOnly className="mt-1 accent-[var(--color-eulance-emerald)]" />
                      <div>
                        <div className="font-bold text-[var(--color-eulance-navy)] text-sm">Corporate SEPA Instant Transfer / Corporate Visa</div>
                        <div className="text-xs text-[var(--color-eulance-muted)]">TechNova Solutions (IBAN PT50 **** **** 4242)</div>
                      </div>
                    </div>

                    <button onClick={handleFundEscrow} className="w-full py-4 bg-[var(--color-eulance-emerald)] text-white font-bold text-lg rounded-xl shadow-md hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                      <Lock size={20} /> Secure €5,175.00 in Escrow
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 3: ACTIVE */}
              {hiringState === 'active' && (
                <motion.div key="active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="bg-[var(--color-eulance-mint)] border border-[var(--color-eulance-emerald)] p-8 rounded-2xl text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <CheckCircle2 size={40} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-eulance-emerald)] mb-2">Escrow Funded & Contract Active!</h2>
                    <p className="text-sm text-[var(--color-eulance-emerald)]/90 max-w-lg mx-auto leading-relaxed">
                      {activeFreelancer.name} has been notified and work is underway. Funds remain 100% protected in Escrow until you review and approve final delivery.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] text-center">
                    <p className="text-sm text-[var(--color-eulance-muted)] mb-4">Fast-forward prototype simulation:</p>
                    <button onClick={handleSimulateDelivery} className="px-6 py-3 bg-white border-2 border-[var(--color-eulance-blue)] text-[var(--color-eulance-blue)] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
                      Simulate: Freelancer Submits Work Deliverables
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 4: REVIEW */}
              {hiringState === 'review' && (
                <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <InvestorNote title="Dispute Protection & 1-Click Release">
                    Funds are locked upfront so freelancers know payment is guaranteed. If the client approves, 1-click release issues the automated EU VAT invoice and settles the payout instantly.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-2xl border-2 border-[var(--color-eulance-gold)] shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shrink-0">
                        <Zap size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Work Submitted for Client Review</h2>
                        <p className="text-xs text-[var(--color-eulance-muted)]">{activeFreelancer.name} delivered E-commerce MVP</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200 text-sm">
                      <h4 className="font-bold text-[var(--color-eulance-navy)] mb-2">Deliverables Submission Note:</h4>
                      <p className="text-gray-700 italic">"Hi TechNova team! The Next.js storefront MVP is complete with responsive UI, Tailwind CSS styling, and active Stripe test integration. GitHub repo link & deployment keys attached!"</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50">Request Revisions</button>
                      <button onClick={handleApproveWork} className="flex-1 py-3 bg-[var(--color-eulance-emerald)] text-white font-bold text-base rounded-xl shadow-md hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                        Approve & Release Payment (€4,500)
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 5: COMPLETED */}
              {hiringState === 'completed' && (
                <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <InvestorNote title="Automated Reverse-Charge EU VAT Invoicing">
                    Upon release, EULANCE automatically generates an official cross-border reverse charge VAT invoice. Both parties save hours of compliance admin.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm text-center">
                    <div className="w-20 h-20 bg-[var(--color-eulance-mint)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Euro size={44} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[var(--color-eulance-navy)] mb-2">Hire Successfully Completed!</h2>
                    <p className="text-base text-[var(--color-eulance-muted)] max-w-md mx-auto mb-8">
                      €4,500 has been released to {activeFreelancer.name}. Your official EU VAT invoice is ready.
                    </p>
                    
                    <div className="flex justify-center gap-4 mb-8">
                      <button
                        onClick={() => setIsVatModalOpen(true)}
                        className="px-6 py-3 bg-white border border-[var(--color-eulance-blue)] text-[var(--color-eulance-blue)] font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm"
                      >
                        <FileText size={18} /> View & Download EU VAT Invoice
                      </button>
                    </div>

                    <button onClick={() => setHiringState('browsing')} className="px-8 py-3 bg-[var(--color-eulance-navy)] text-white font-bold rounded-xl hover:bg-blue-900 transition-colors">
                      Return to Company Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-[var(--color-eulance-navy)] text-white p-6 rounded-2xl shadow-md">
              <h3 className="font-bold text-lg mb-4 text-[var(--color-eulance-gold)]">Why European Companies Choose EULANCE</h3>
              <ul className="space-y-4 text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-gold)] shrink-0 mt-0.5" />
                  <span><strong>Zero Upfront Subscriptions:</strong> Free to post & browse. Pay 15% only on successful delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-gold)] shrink-0 mt-0.5" />
                  <span><strong>Automated Contracts:</strong> Multi-lingual legal templates auto-generated for EU jurisdictions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--color-eulance-gold)] shrink-0 mt-0.5" />
                  <span><strong>Tax & VAT Simplified:</strong> Automatic reverse-charge handling across all 27 EU states.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] shadow-xs">
              <h3 className="font-bold text-[var(--color-eulance-navy)] mb-4 text-sm uppercase tracking-wider">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--color-eulance-muted)]">Total Escrow Processed</span>
                  <span className="font-bold">{dashboardMetrics.client.totalSpent}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--color-eulance-muted)]">Successful Hires</span>
                  <span className="font-bold">{dashboardMetrics.client.hiredFreelancers}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--color-eulance-muted)]">Avg Time-to-Hire</span>
                  <span className="font-bold text-[var(--color-eulance-emerald)]">{dashboardMetrics.client.avgTimeToHire}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <DirectMessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        recipientName={activeFreelancer.name}
        recipientRole={activeFreelancer.role}
        recipientCountry={activeFreelancer.country}
        avatar={activeFreelancer.avatar}
      />

      <LegalContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        onSign={handleContractSigned}
        clientName="TechNova Solutions"
        freelancerName={activeFreelancer.name}
        projectTitle="E-commerce Redesign MVP"
        contractAmount={4500}
      />

      <VatInvoiceModal
        isOpen={isVatModalOpen}
        onClose={() => setIsVatModalOpen(false)}
        clientName="TechNova Solutions"
        clientVat="PT509876543"
        freelancerName={activeFreelancer.name}
        freelancerVat={activeFreelancer.vatNumber}
        projectName="E-commerce Redesign MVP"
        amount={4500}
      />

      <PostProjectModal
        isOpen={isPostProjectOpen}
        onClose={() => setIsPostProjectOpen(false)}
        onPost={handleNewProjectPosted}
      />
    </div>
  );
}
