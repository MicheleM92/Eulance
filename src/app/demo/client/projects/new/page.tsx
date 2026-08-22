"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { Zap, CheckCircle2, ArrowRight, Sparkles, Building2, ShieldCheck, UserCheck } from "lucide-react";

export default function PostProjectPage() {
  const router = useRouter();
  const { addProject, freelancers, sendOffer } = useDemoState();

  const [step, setStep] = useState<"form" | "matching" | "matched">("form");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Software Development");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [duration, setDuration] = useState("2-4 weeks");
  const [remotePreference, setRemotePreference] = useState("Remote (EU Timezone)");
  const [experienceLevel, setExperienceLevel] = useState("Senior");
  const [enableAiAddon, setEnableAiAddon] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("matching");

    // Add project to demo state
    const created = addProject({
      title,
      category,
      description,
      client: "TechNova Solutions",
      clientCountry: "Portugal",
      clientCity: "Lisbon",
      clientVat: "PT509876543",
      budget: `€${Number(budget).toLocaleString()}`,
      budgetValue: Number(budget) || 0,
      skillsRequired: skills.split(",").map((s) => s.trim()).filter(Boolean),
      duration,
      remotePreference,
      experienceLevel,
    });

    // Simulate AI algorithmic matching calculation
    setTimeout(() => {
      setStep("matched");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {step === "form" && (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-[var(--color-eulance-navy)] rounded-2xl flex items-center justify-center font-bold">
                  <Building2 size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-[var(--color-eulance-navy)]">Post a Project</h1>
                  <p className="text-xs text-[var(--color-eulance-muted)]">Find verified European freelancers with 100% escrow protection</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-semibold">
                
                <div>
                  <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                    placeholder="e.g. Next.js E-Commerce Redesign"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none bg-white"
                    >
                      <option>Software Development</option>
                      <option>Design & UX/UI</option>
                      <option>Data & Analytics</option>
                      <option>AI & Machine Learning</option>
                      <option>Digital Marketing & Copywriting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Experience Level</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none bg-white"
                    >
                      <option>Intermediate</option>
                      <option>Senior</option>
                      <option>Expert Lead</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Project Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Looking for an experienced React developer to help us build a dashboard. We need Stripe and basic CRUD features."
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Budget (€)</label>
                    <input
                      type="number"
                      required
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      placeholder="e.g. 2500"
                      className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--color-eulance-navy)] uppercase tracking-wider mb-2 font-bold">Required Skills (Comma separated)</label>
                    <input
                      type="text"
                      required
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. React, Next.js, PostgreSQL"
                      className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                    />
                  </div>
                </div>

                {/* AI Best Match Add-on Selection */}
                <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] rounded-xl flex items-center justify-center font-bold">
                      <Zap size={20} />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-[var(--color-eulance-navy)] block">Enable EULANCE AI Best Match Add-on</span>
                      <span className="text-[11px] text-gray-600">Instantly surface top 5 algorithmic candidates fine-tuned to EU tech stacks (€15 add-on)</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableAiAddon}
                    onChange={(e) => setEnableAiAddon(e.target.checked)}
                    className="w-5 h-5 accent-[var(--color-eulance-navy)] rounded cursor-pointer"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[var(--color-eulance-navy)] text-white rounded-xl font-bold hover:bg-[var(--color-eulance-blue)] transition-colors shadow-md flex items-center gap-2 text-sm"
                  >
                    Post Project & Surface Matches <ArrowRight size={18} />
                  </button>
                </div>

              </form>
            </div>
          )}

          {step === "matching" && (
            <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-200 text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-[var(--color-eulance-navy)] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Zap size={40} className="text-[var(--color-eulance-navy)]" />
              </div>
              <h2 className="text-3xl font-black text-[var(--color-eulance-navy)]">
                EULANCE Algorithmic Matching...
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Analyzing verified European freelancer skills, availability, tax compliance, and client ratings for "{title}".
              </p>
            </div>
          )}

          {step === "matched" && (
            <div className="space-y-8">
              {/* Success Header */}
              <div className="bg-gradient-to-r from-[var(--color-eulance-navy)] to-[var(--color-eulance-blue)] text-white rounded-3xl p-8 shadow-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-xs mb-3">
                  <CheckCircle2 size={14} /> Project Posted Successfully
                </div>
                <h2 className="text-3xl font-black mb-2">EULANCE Best Match Top Candidates</h2>
                <p className="text-xs text-white/80">
                  Algorithmic scoring selected top 5 verified EU professionals. Select a freelancer to send an instant offer.
                </p>
              </div>

              {/* Candidates List */}
              <div className="space-y-4">
                {freelancers.map((f, idx) => {
                  const matchScore = [96, 94, 91, 88, 85][idx] || 85;
                  return (
                    <div key={f.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:border-[var(--color-eulance-navy)] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] font-bold text-lg flex items-center justify-center shrink-0">
                          {f.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-extrabold text-[var(--color-eulance-navy)]">{f.name}</h3>
                            {f.founder && (
                              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                Founder #{f.founderBadgeNumber}
                              </span>
                            )}
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                              {matchScore}% Match
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-gray-600 mb-2">{f.role}</p>
                          <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                            <span>📍 {f.city}, {f.country}</span>
                            <span>•</span>
                            <span className="font-bold text-[var(--color-eulance-navy)]">€{f.hourlyRate}/hr</span>
                            <span>•</span>
                            <span>⭐ {f.rating} ({f.jobsCompleted} jobs)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                          onClick={() => {
                            sendOffer({
                              projectId: "p1",
                              freelancerId: f.id,
                              amount: Number(budget) || 0,
                              deadline: "2027-12-01",
                            });
                            router.push("/demo/messages");
                          }}
                          className="flex-1 md:flex-initial px-5 py-2.5 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-xl text-xs font-extrabold transition-colors shadow-xs text-center"
                        >
                          Send Formal Offer (€{budget})
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => router.push("/demo/client")}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
