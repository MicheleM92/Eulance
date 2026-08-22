"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { Search, Filter, MapPin, Clock, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";

export default function JobMarketplacePage() {
  const { projects } = useDemoState();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.skillsRequired.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mb-3">
              100% Free Proposals • Zero Pay-to-Play Bid Connects
            </div>
            <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
              European Job Marketplace
            </h1>
            <p className="text-xs text-[var(--color-eulance-muted)] mt-1">
              Work with verified European companies under EU jurisdiction contracts and protected escrow payments.
            </p>

            {/* Filters */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by keyword or stack (e.g. Next.js, Figma, Node)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="py-3 px-4 border border-gray-300 rounded-xl text-xs font-bold bg-white text-[var(--color-eulance-navy)] outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Design">Design & UX/UI</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-[10px]">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">• Posted {project.postedDate}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Escrow Verified
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--color-eulance-navy)]">{project.title}</h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 pt-1">
                    <span>🏢 {project.client} ({project.clientCountry})</span>
                    <span>⏱️ {project.duration}</span>
                    <span>🌐 {project.remotePreference}</span>
                    <span>🎯 Level: {project.experienceLevel}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.skillsRequired.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-2xl font-black text-[var(--color-eulance-navy)] block">{project.budget}</span>
                    <span className="text-[10px] text-gray-400 font-semibold block">Fixed Price • 0% Proposal Fee</span>
                  </div>

                  <Link
                    href={`/demo/freelancer/jobs/${project.id}`}
                    className="px-6 py-3 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-xl text-xs font-extrabold transition-colors shadow-xs text-center flex items-center justify-center gap-2"
                  >
                    View & Apply <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
