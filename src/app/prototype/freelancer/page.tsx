"use client";

import { useState } from "react";
import { dashboardMetrics, projects as initialProjects, freelancers, Project } from "@/lib/data/mock";
import { CheckCircle2, MapPin, Star, ShieldCheck, TrendingUp, Zap, FileText, Briefcase, ChevronRight, Info, Send, Upload, Euro, MessageSquare, Filter, Search, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DirectMessagingModal from "@/components/messaging/DirectMessagingModal";
import VatInvoiceModal from "@/components/invoice/VatInvoiceModal";

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

export default function FreelancerDashboard() {
  const [workState, setWorkState] = useState<'browsing' | 'proposal' | 'active' | 'submitting' | 'paid'>('browsing');
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project>(initialProjects[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("Hi TechNova team! The Next.js storefront MVP is complete and tested. The Stripe integration is live in test mode.");
  
  // Modals state
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isVatModalOpen, setIsVatModalOpen] = useState(false);

  const me = freelancers[0]; // Marco Rossi

  const filteredProjects = projectList.filter((p) => {
    return searchQuery === "" || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleApplyClick = (project: Project) => {
    setSelectedProject(project);
    setWorkState('proposal');
  };

  const handleSubmitProposal = () => setWorkState('active');
  const handleDeliverWork = () => setWorkState('submitting');
  const handleConfirmSubmission = () => setWorkState('paid');

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] py-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-eulance-navy)] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
              {me.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-extrabold text-[var(--color-eulance-navy)]">{me.name}</h1>
                <span title="Verified EU Professional" className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-[var(--color-eulance-emerald)] px-2 py-0.5 rounded font-bold border border-emerald-200">
                  <ShieldCheck size={14} /> Verified EU
                </span>
                <span className="bg-[var(--color-eulance-gold)]/20 text-[var(--color-eulance-darkGold)] text-xs font-bold px-2 py-0.5 rounded uppercase">
                  Founder Badge #042
                </span>
              </div>
              <p className="text-xs text-[var(--color-eulance-muted)] font-medium flex items-center gap-2">
                <span>{me.role}</span> • <span className="flex items-center gap-1"><MapPin size={12} /> {me.country}</span> • <span>VAT: {me.vatNumber}</span>
              </p>
            </div>
          </div>

          {workState === 'browsing' && (
            <div className="flex gap-3">
              <button
                onClick={() => setIsMessagingOpen(true)}
                className="px-4 py-2 bg-white border border-[var(--color-eulance-border)] text-[var(--color-eulance-navy)] rounded-xl font-bold text-xs hover:bg-[var(--color-eulance-soft)] transition-colors flex items-center gap-2"
              >
                <MessageSquare size={16} /> Messages
              </button>
              <button className="px-4 py-2 bg-[var(--color-eulance-blue)] text-white rounded-xl font-bold text-xs hover:bg-[var(--color-eulance-navy)] transition-colors flex items-center gap-1.5 shadow-xs">
                <Zap size={14} /> Available Now
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
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm min-w-[550px]">
              {[
                { id: 'proposal', label: '1. Send Proposal (0% Fee)' },
                { id: 'active', label: '2. Escrow Funded & Work' },
                { id: 'submitting', label: '3. Submit Deliverables' },
                { id: 'paid', label: '4. Funds Released (5% Max)' }
              ].map((step, idx) => {
                const states = ['proposal', 'active', 'submitting', 'paid'];
                const currentIndex = states.indexOf(workState);
                const stepIndex = states.indexOf(step.id);
                const isActive = step.id === workState;
                const isPast = stepIndex < currentIndex;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className={`flex flex-col items-center flex-1 min-w-[100px] ${isActive ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 font-bold text-xs shrink-0 transition-all ${isActive ? 'bg-[var(--color-eulance-emerald)] text-white ring-4 ring-[var(--color-eulance-mint)]' : isPast ? 'bg-[var(--color-eulance-navy)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {isPast ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-[var(--color-eulance-emerald)] font-bold' : isPast ? 'text-[var(--color-eulance-navy)]' : 'text-gray-500'}`}>
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
                  <InvestorNote title="No Subscriptions & Zero Pay-to-Play">
                    Unlike other platforms where freelancers must buy "connects" to bid, EULANCE is 100% free to join and propose. We only deduct a flat 5% (0% for founding members during launch) upon successful payment release.
                  </InvestorNote>
                  
                  {/* Search bar */}
                  <div className="relative mb-6">
                    <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search AI matched projects by title or tech stack (e.g. Next.js, Figma, Node)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-eulance-blue)] shadow-xs"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-[var(--color-eulance-navy)] flex items-center gap-2 mb-4">
                    <Zap className="text-[var(--color-eulance-gold)]" size={20} /> Smart AI Project Matches ({filteredProjects.length})
                  </h2>
                  
                  <div className="space-y-4">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] hover:border-[var(--color-eulance-blue)] transition-colors shadow-xs"
                      >
                        <div className="flex justify-between items-start mb-3 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-xl font-bold text-[var(--color-eulance-navy)]">{project.title}</h3>
                              <span className="px-2 py-0.5 bg-[var(--color-eulance-mint)] text-[var(--color-eulance-emerald)] text-xs font-bold rounded">
                                {project.matchScore}% Match
                              </span>
                            </div>
                            <p className="text-xs text-[var(--color-eulance-muted)] flex items-center gap-2">
                              <span><Briefcase size={12} className="inline mr-1" />{project.client} ({project.clientCountry})</span> • <span>Posted {project.postedDate}</span>
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-extrabold text-xl text-[var(--color-eulance-navy)]">{project.budget}</div>
                            <div className="text-[11px] text-[var(--color-eulance-emerald)] font-bold">Escrow Protected</div>
                          </div>
                        </div>

                        <p className="text-xs text-[var(--color-eulance-text)] mb-4 leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.skillsRequired.map((skill) => (
                            <span key={skill} className="px-2.5 py-1 text-xs rounded-md bg-blue-50 text-[var(--color-eulance-blue)] font-medium border border-blue-100">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setIsMessagingOpen(true);
                            }}
                            className="px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-xs flex items-center gap-1.5"
                          >
                            <MessageSquare size={14} /> Contact Client
                          </button>

                          <button
                            onClick={() => handleApplyClick(project)}
                            className="flex-1 py-2.5 bg-[var(--color-eulance-blue)] text-white font-bold text-xs rounded-xl hover:bg-[var(--color-eulance-navy)] transition-colors shadow-xs flex justify-center items-center gap-1.5"
                          >
                            Apply & Submit Proposal (Free) <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STATE 1: PROPOSAL */}
              {workState === 'proposal' && (
                <motion.div key="proposal" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <InvestorNote title="Verified EU Clients & Legal Compliance">
                    All clients on EULANCE undergo basic corporate VAT verification. When a freelancer sends a proposal, they deal with verified EU businesses under protected contracts.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm">
                    <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)] mb-2">Submit Proposal for {selectedProject.title}</h2>
                    <p className="text-xs text-[var(--color-eulance-muted)] mb-6">Client: {selectedProject.client} ({selectedProject.clientCountry})</p>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">Proposed Fixed Amount</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 font-bold">€</div>
                          <input
                            type="text"
                            readOnly
                            value={selectedProject.budgetValue.toLocaleString()}
                            className="bg-gray-50 border border-[var(--color-eulance-border)] text-[var(--color-eulance-navy)] font-bold text-lg rounded-xl block w-full pl-8 p-3"
                          />
                        </div>
                        <p className="text-[11px] text-[var(--color-eulance-emerald)] mt-1 font-semibold">
                          0% Fee applied under Founder Promo (You receive net €{selectedProject.budgetValue.toLocaleString()}.00)
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">Proposal Cover Letter</label>
                        <textarea
                          rows={4}
                          readOnly
                          className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl block w-full p-3 leading-relaxed"
                          value="Hi TechNova team! I have extensive experience building Next.js web apps and integrating Stripe payment flows in TypeScript. Ready to execute your milestone under EULANCE Escrow framework."
                        />
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-[var(--color-eulance-border)]">
                        <button onClick={() => setWorkState('browsing')} className="px-6 py-3 border border-[var(--color-eulance-border)] rounded-xl font-bold text-[var(--color-eulance-navy)]">Cancel</button>
                        <button onClick={handleSubmitProposal} className="flex-1 py-3 bg-[var(--color-eulance-emerald)] text-white font-bold text-sm rounded-xl shadow-sm hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                          Send Proposal Now <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: ACTIVE */}
              {workState === 'active' && (
                <motion.div key="active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <InvestorNote title="Escrow Security - Guaranteed Payout">
                    Freelancers often suffer from delayed invoices. On EULANCE, 100% of contract funds are locked in Escrow before work begins, giving complete peace of mind.
                  </InvestorNote>

                  <div className="bg-[var(--color-eulance-mint)] border border-[var(--color-eulance-emerald)] p-8 rounded-2xl text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <ShieldCheck size={40} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-eulance-emerald)] mb-2">Contract Active! Escrow Fully Funded</h2>
                    <p className="text-xs text-[var(--color-eulance-emerald)]/90 max-w-lg mx-auto leading-relaxed">
                      TechNova Solutions has deposited €4,500.00 into Escrow. You are protected and can work safely.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] text-center">
                    <p className="text-xs text-[var(--color-eulance-muted)] mb-4">Fast-forward prototype simulation:</p>
                    <button onClick={handleDeliverWork} className="px-8 py-3 bg-white border-2 border-[var(--color-eulance-navy)] text-[var(--color-eulance-navy)] font-bold text-sm rounded-xl hover:bg-[var(--color-eulance-soft)] transition-colors">
                      Simulate: Work Completed & Ready for Submission
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 3: SUBMIT WORK */}
              {workState === 'submitting' && (
                <motion.div key="submitting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-white p-8 rounded-2xl border border-[var(--color-eulance-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[var(--color-eulance-soft)] text-[var(--color-eulance-navy)] rounded-xl flex items-center justify-center">
                        <Upload size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-[var(--color-eulance-navy)]">Submit Work Deliverables</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2">Completion Note to Client</label>
                        <textarea
                          rows={3}
                          className="bg-white border border-[var(--color-eulance-border)] focus:border-[var(--color-eulance-blue)] outline-none text-gray-800 text-xs rounded-xl block w-full p-3"
                          value={deliveryMessage}
                          onChange={(e) => setDeliveryMessage(e.target.value)}
                        />
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center text-gray-500 bg-gray-50">
                        <FileText className="mx-auto mb-2 text-gray-400" size={32} />
                        <p className="text-xs font-bold text-gray-700">Final Deliverables (Source Code Repository & ZIP Attached)</p>
                        <p className="text-[11px] text-gray-400">e-Commerce_Storefront_MVP_v1.0.zip (18.4 MB)</p>
                      </div>

                      <button onClick={handleConfirmSubmission} className="w-full py-4 bg-[var(--color-eulance-emerald)] text-white font-bold text-base rounded-xl shadow-md hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
                        Request Escrow Payment Release (€4,500)
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 4: PAID */}
              {workState === 'paid' && (
                <motion.div key="paid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <InvestorNote title="The Fair 5% Max Freelancer Fee & Auto VAT Statement">
                    Competitors charge freelancers up to 20%. EULANCE charges maximum 5% (0% for launch promo). The platform handles cross-border VAT compliance paperwork automatically.
                  </InvestorNote>

                  <div className="bg-white p-8 rounded-2xl border-2 border-[var(--color-eulance-emerald)] shadow-lg text-center">
                    <div className="w-20 h-20 bg-[var(--color-eulance-mint)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Euro size={44} className="text-[var(--color-eulance-emerald)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-eulance-navy)] mb-2">Escrow Funds Released!</h2>
                    <p className="text-sm text-[var(--color-eulance-muted)] mb-8">
                      TechNova Solutions approved your work. Payment transferred directly to your bank account.
                    </p>

                    <div className="max-w-sm mx-auto bg-[var(--color-eulance-soft)] p-6 rounded-xl mb-8 text-left space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-eulance-muted)]">Contract Amount</span>
                        <span className="font-semibold text-[var(--color-eulance-navy)]">€4,500.00</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[var(--color-eulance-border)]">
                        <span className="text-[var(--color-eulance-muted)]">EULANCE Fee (0% Founder Promo)</span>
                        <span className="font-semibold text-emerald-600">€0.00</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-extrabold">
                        <span className="text-[var(--color-eulance-navy)]">Net Payout</span>
                        <span className="text-[var(--color-eulance-emerald)]">€4,500.00</span>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mb-8">
                      <button
                        onClick={() => setIsVatModalOpen(true)}
                        className="px-6 py-3 bg-white border border-[var(--color-eulance-blue)] text-[var(--color-eulance-blue)] font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
                      >
                        <FileText size={16} /> View Automated EU VAT Statement
                      </button>
                    </div>

                    <button onClick={() => setWorkState('browsing')} className="px-8 py-3 bg-[var(--color-eulance-navy)] text-white font-bold text-xs rounded-xl hover:bg-blue-900 transition-colors">
                      Return to Freelancer Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[var(--color-eulance-border)] shadow-xs">
              <h3 className="font-bold text-[var(--color-eulance-navy)] mb-4 text-xs uppercase tracking-wider">Freelancer Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-[var(--color-eulance-muted)] mb-1">Total Lifetime Earnings</div>
                  <div className="text-2xl font-extrabold text-[var(--color-eulance-emerald)]">{dashboardMetrics.freelancer.totalEarnings}</div>
                </div>
                <div className="pt-3 border-t border-[var(--color-eulance-border)]">
                  <div className="text-xs font-medium text-[var(--color-eulance-muted)] mb-1">Platform Trust Score</div>
                  <div className="text-xl font-bold text-[var(--color-eulance-navy)]">{dashboardMetrics.freelancer.trustScore} / 100</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-eulance-navy)] to-[var(--color-eulance-blue)] rounded-2xl p-6 text-white shadow-md">
              <Award className="mb-3 text-[var(--color-eulance-gold)]" size={28} />
              <h3 className="font-bold text-base mb-2">Founding Member Status</h3>
              <p className="text-xs text-white/80 mb-4 leading-relaxed">
                As one of the first 500 freelancers, your Founder Badge gives you permanent 0% fee perks during Phase 1.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <DirectMessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        recipientName="TechNova Solutions"
        recipientRole="Client Company"
        recipientCountry="Portugal"
        avatar="TN"
      />

      <VatInvoiceModal
        isOpen={isVatModalOpen}
        onClose={() => setIsVatModalOpen(false)}
        clientName="TechNova Solutions"
        clientVat="PT509876543"
        freelancerName={me.name}
        freelancerVat={me.vatNumber}
        projectName={selectedProject.title}
        amount={selectedProject.budgetValue}
      />
    </div>
  );
}
