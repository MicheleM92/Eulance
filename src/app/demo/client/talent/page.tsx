"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { Search, MapPin, Star, Award, ShieldCheck, CheckCircle2, Filter } from "lucide-react";

export default function FindTalentPage() {
  const { freelancers } = useDemoState();
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");

  const filteredFreelancers = freelancers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCountry = countryFilter === "All" || f.country === countryFilter;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[var(--color-eulance-navy)] font-bold text-xs mb-3">
              Pan-European Talent Marketplace
            </div>
            <h1 className="text-3xl font-black text-[var(--color-eulance-navy)] tracking-tight">
              Hire Verified European Talent
            </h1>
            <p className="text-xs text-[var(--color-eulance-muted)] mt-1">
              Browse top independent professionals across Portugal, Spain, France, Germany, and Italy.
            </p>

            {/* Search & Filter Bar */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by skill, role, or name (e.g. Next.js, Figma, React)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[var(--color-eulance-navy)] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="py-3 px-4 border border-gray-300 rounded-xl text-xs font-bold bg-white text-[var(--color-eulance-navy)] outline-none"
                >
                  <option value="All">All EU Countries</option>
                  <option value="Portugal">Portugal (Phase 1)</option>
                  <option value="Spain">Spain (Phase 1)</option>
                  <option value="Italy">Italy (Phase 2)</option>
                  <option value="France">France (Phase 2)</option>
                  <option value="Germany">Germany (Phase 2)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Freelancers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-eulance-navy)] text-[var(--color-eulance-yellow)] font-bold text-base flex items-center justify-center shrink-0">
                        {f.avatar}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[var(--color-eulance-navy)] flex items-center gap-1.5">
                          {f.name}
                          {f.verified && <ShieldCheck size={14} className="text-blue-600" />}
                        </h3>
                        <p className="text-xs font-semibold text-gray-500">{f.role}</p>
                      </div>
                    </div>

                    {f.founder && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold text-[10px] shrink-0">
                        Founder #{f.founderBadgeNumber}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {f.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {f.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-bold text-[var(--color-eulance-navy)]">📍 {f.city}, {f.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hourly Rate:</span>
                      <span className="font-bold text-[var(--color-eulance-navy)]">€{f.hourlyRate} / hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating / Jobs:</span>
                      <span className="font-bold text-amber-600">⭐ {f.rating} ({f.jobsCompleted} completed)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/demo/client/talent/${f.id}`}
                    className="flex-1 text-center py-2.5 bg-gray-100 hover:bg-gray-200 text-[var(--color-eulance-navy)] rounded-xl text-xs font-bold transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/demo/messages"
                    className="flex-1 text-center py-2.5 bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                  >
                    Message / Offer
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
