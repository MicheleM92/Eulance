"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { Search, Filter, MapPin, Clock, Briefcase, ArrowRight, ShieldCheck, BookmarkPlus } from "lucide-react";

export default function JobMarketplacePage() {
  const { projects } = useDemoState();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState<string[]>([]);
  const [budgetFilter, setBudgetFilter] = useState<string>("All");

  const toggleExperience = (level: string) => {
    setExperienceFilter(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.skillsRequired.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    
    const matchesExperience = experienceFilter.length === 0 || experienceFilter.includes(p.experienceLevel);
    
    let matchesBudget = true;
    if (budgetFilter === "<1000") matchesBudget = p.budgetValue < 1000;
    if (budgetFilter === "1000-3000") matchesBudget = p.budgetValue >= 1000 && p.budgetValue <= 3000;
    if (budgetFilter === ">3000") matchesBudget = p.budgetValue > 3000;

    return matchesSearch && matchesCategory && matchesExperience && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDEBAR: FILTERS */}
            <aside className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-[var(--color-eulance-navy)] mb-4">Filter by</h2>

                {/* Category */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Design">Design & UX/UI</option>
                  </select>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Experience Level */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Experience Level</h3>
                  <div className="space-y-2">
                    {["Entry", "Intermediate", "Senior", "Expert"].map(level => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={experienceFilter.includes(level)}
                          onChange={() => toggleExperience(level)}
                          className="rounded text-[var(--color-eulance-navy)] focus:ring-[var(--color-eulance-navy)]"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Budget */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Fixed Budget</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Any budget", val: "All" },
                      { label: "Less than €1,000", val: "<1000" },
                      { label: "€1,000 - €3,000", val: "1000-3000" },
                      { label: "More than €3,000", val: ">3000" },
                    ].map(b => (
                      <label key={b.val} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="budget"
                          value={b.val}
                          checked={budgetFilter === b.val}
                          onChange={(e) => setBudgetFilter(e.target.value)}
                          className="text-[var(--color-eulance-navy)] focus:ring-[var(--color-eulance-navy)]"
                        />
                        <span className="text-sm text-gray-700">{b.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Client History */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Client History</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[var(--color-eulance-navy)] focus:ring-[var(--color-eulance-navy)]" />
                    <span className="text-sm text-gray-700">Payment Verified</span>
                  </label>
                </div>

              </div>
            </aside>

            {/* MAIN CONTENT: JOB FEED */}
            <div className="flex-1 space-y-6">
              
              {/* Search Bar */}
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by keyword or stack (e.g. Next.js, Figma, Node)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 shadow-sm rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                />
              </div>

              <div className="flex justify-between items-end">
                <h2 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">
                  Jobs you might like
                </h2>
                <span className="text-sm text-gray-500 font-medium">
                  {filteredProjects.length} jobs found
                </span>
              </div>

              {/* Job Listings Feed */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                {filteredProjects.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">No jobs match your criteria. Try adjusting the filters.</div>
                ) : (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-6 md:p-8 hover:bg-gray-50 transition-colors flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium tracking-wide">
                            Posted {project.postedDate}
                          </p>
                          <Link href={`/demo/freelancer/jobs/${project.id}`} className="hover:underline">
                            <h3 className="text-xl font-bold text-[var(--color-eulance-navy)]">{project.title}</h3>
                          </Link>
                          <p className="text-xs font-semibold text-gray-500">
                            Fixed-price - {project.experienceLevel} level - Est. Budget: <span className="text-gray-900">{project.budget}</span>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-[var(--color-eulance-navy)] hover:border-[var(--color-eulance-navy)] transition-colors">
                            <BookmarkPlus size={18} />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.skillsRequired.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 pt-3">
                        <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-600"/> Payment verified</span>
                        <span className="flex items-center gap-1">🏢 {project.client} ({project.clientCountry})</span>
                        <span>Proposals: <b>{project.proposalsCount}</b></span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
