"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoState } from "@/lib/context/DemoStateContext";
import DemoHeader from "@/components/layout/DemoHeader";
import { Search, ShieldCheck, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-mono">
      <DemoHeader />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-[#050505] p-8 border border-[#222222]">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#00ff66] text-[#00ff66] font-bold text-[10px] mb-3 uppercase tracking-widest">
              QUERY: EU_TALENT_REGISTRY
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              SCANNING_VERIFIED_NODES
            </h1>
            <p className="text-xs text-[#888888] mt-1 uppercase">
              // Filtering independent execution units across the network.
            </p>

            {/* Search & Filter Bar */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff66]" />
                <input
                  type="text"
                  placeholder="Regex query (e.g. Next.js, Figma, React)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-[#000000] border border-[#333333] text-white text-xs font-mono focus:border-[#00ff66] outline-none placeholder-[#444444]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[#888888]" />
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="py-2.5 px-4 bg-[#000000] border border-[#333333] text-[#00ff66] text-xs font-mono outline-none uppercase"
                >
                  <option value="All">ALL_ZONES</option>
                  <option value="Portugal">ZONE_PT</option>
                  <option value="Spain">ZONE_ES</option>
                  <option value="Italy">ZONE_IT</option>
                  <option value="France">ZONE_FR</option>
                  <option value="Germany">ZONE_DE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Freelancers Data Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((f) => (
              <div
                key={f.id}
                className="bg-[#050505] p-6 border border-[#222222] hover:border-[#00ff66] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4 border-b border-[#222222] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#111111] border border-[#333333] text-[#00ff66] font-bold text-sm flex items-center justify-center shrink-0">
                        {f.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white flex items-center gap-1.5 uppercase">
                          {f.name}
                          {f.verified && <ShieldCheck size={14} className="text-[#00e5ff]" />}
                        </h3>
                        <p className="text-[10px] text-[#00e5ff] uppercase">{f.role}</p>
                      </div>
                    </div>

                    {f.founder && (
                      <span className="px-1.5 py-0.5 border border-[#00ff66] text-[#00ff66] text-[8px] uppercase tracking-widest shrink-0">
                        NODE_FND_{f.founderBadgeNumber}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#888888] line-clamp-3 mb-4 leading-relaxed h-[50px]">
                    {f.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {f.skills.map((skill) => (
                      <span key={skill} className="px-1.5 py-0.5 border border-[#333333] text-[#aaaaaa] text-[9px] uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 bg-[#111111] border border-[#222222] space-y-1.5 text-[10px] text-[#888888] mb-6 uppercase">
                    <div className="flex justify-between">
                      <span>LOCATION:</span>
                      <span className="font-bold text-white">[{f.country}]</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YIELD_REQ:</span>
                      <span className="font-bold text-white">€{f.hourlyRate}/HR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>REP_SCORE:</span>
                      <span className="font-bold text-[#00e5ff]">{f.rating}_/5 ({f.jobsCompleted}_CYCLES)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-[#222222] mt-auto">
                  <Link
                    href={`/demo/client/talent/${f.id}`}
                    className="flex-1 text-center py-2 border border-[#333333] text-[#888888] hover:text-white hover:bg-[#111111] text-[10px] font-bold transition-colors uppercase"
                  >
                    DUMP_PROFILE
                  </Link>
                  <Link
                    href="/demo/messages"
                    className="flex-1 text-center py-2 bg-[#00ff66] text-[#000000] hover:bg-[#00cc55] text-[10px] font-bold transition-colors uppercase"
                  >
                    OPEN_SOCKET
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
