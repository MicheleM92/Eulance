"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import { Briefcase, Award, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import DemoHeader from "@/components/layout/DemoHeader";

export default function DemoEntryPage() {
  const router = useRouter();
  const { switchRole } = useDemoState();

  const handleSelectRole = (role: "client" | "freelancer") => {
    switchRole(role);
    if (role === "client") {
      router.push("/demo/client");
    } else {
      router.push("/demo/freelancer");
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-mono">
      <DemoHeader />

      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#050505] border border-[#00e5ff] text-[#00e5ff] font-bold text-xs mb-4 uppercase tracking-widest">
              <Sparkles size={14} />
              SYSTEM_DEMO_ACTIVE
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight uppercase">
              INITIALIZE_EULANCE_PROTOCOL
            </h1>
            <p className="text-base text-[#888888] max-w-xl mx-auto">
              Select your system node to test the connected commercial journey. State context is preserved across nodes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            
            {/* Hiring Card */}
            <div
              onClick={() => handleSelectRole("client")}
              className="group block bg-[#050505] p-8 border border-[#222222] hover:border-[#ffffff] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-[#111111] text-[#ffffff] flex items-center justify-center mb-6 border border-[#333333] group-hover:border-[#ffffff] transition-colors">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">[ CLIENT_NODE ]</h2>
                <p className="text-xs text-[#888888] mb-6 leading-relaxed">
                  Post projects, query AI candidate rankings, dispatch formal offers, execute smart contracts, and manage escrow protocols.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-[#555555] mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#00e5ff]" />
                    AI Match Verification System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#00e5ff]" />
                    15% Client Fee Simulation
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold text-[#ffffff] group-hover:translate-x-1 transition-transform">
                <span>EXECUTE_CLIENT_BOOT</span>
                <ArrowRight size={20} className="text-[#00e5ff]" />
              </div>
            </div>

            {/* Freelancer Card */}
            <div
              onClick={() => handleSelectRole("freelancer")}
              className="group block bg-[#050505] p-8 border border-[#222222] hover:border-[#00ff66] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-[#111111] text-[#00ff66] flex items-center justify-center mb-6 border border-[#333333] group-hover:border-[#00ff66] transition-colors">
                  <Award size={24} />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">[ FREELANCER_NODE ]</h2>
                <p className="text-xs text-[#888888] mb-6 leading-relaxed">
                  Query pan-European job registries, submit zero-fee payload proposals, accept contracts, and track multi-currency payouts.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-[#555555] mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#00ff66]" />
                    0% Commission Flag Active
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#00ff66]" />
                    100% Escrow Integrity Guarantee
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold text-[#00ff66] group-hover:translate-x-1 transition-transform">
                <span>EXECUTE_FREELANCER_BOOT</span>
                <ArrowRight size={20} />
              </div>
            </div>

          </div>

          <div className="text-center text-xs text-[#888888] bg-[#050505] p-4 border border-[#222222]">
            <strong className="text-white">WARNING: SYNCHRONIZED STATE.</strong> Actions taken in one node instantly propagate to the shared network graph.
          </div>
        </div>
      </div>
    </div>
  );
}
