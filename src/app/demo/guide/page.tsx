"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DemoHeader from "@/components/layout/DemoHeader";
import {
  UserCheck,
  Building2,
  Briefcase,
  Search,
  MessageSquare,
  FileText,
  ShieldCheck,
  Coins,
  ArrowRight,
  Info,
  MousePointer2,
  CheckCircle2,
  Play
} from "lucide-react";

export default function DemoGuidePage() {
  const [activePath, setActivePath] = useState<"client" | "freelancer">("client");
  const [activeStep, setActiveStep] = useState(0);

  // Reset step when switching paths
  useEffect(() => {
    setActiveStep(0);
  }, [activePath]);

  const clientSteps = [
    {
      title: "1. Post Project & Match",
      desc: "Fill out the requirement form. The AI algorithm instantly surfaces verified EU candidates, bypassing manual search.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs text-blue-500 mb-4 font-bold uppercase tracking-wider border-b pb-2 flex items-center gap-2"><Building2 size={14}/> Client Perspective</div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
             <div className="flex justify-between items-center">
               <div className="text-sm font-black text-[var(--color-eulance-navy)]">Project Details</div>
               <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">AI Match €15</div>
             </div>
             <div className="w-full h-10 bg-white border border-gray-200 rounded text-xs text-gray-400 flex items-center px-3">Senior Next.js Developer</div>
             <div className="relative">
               <div className="absolute -inset-2 border-2 border-[var(--color-eulance-navy)] rounded-xl animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(1)}></div>
               <div className="absolute -bottom-6 -right-4 text-blue-600 animate-bounce z-20 pointer-events-none">
                 <MousePointer2 className="fill-blue-500" />
               </div>
               <div className="w-full h-10 bg-[var(--color-eulance-navy)] rounded-lg text-white font-black text-xs flex items-center justify-center">
                 Post & Find Matches
               </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "2. Send Formal Offer",
      desc: "In the Messages center, negotiate in real-time and send a binding Formal Offer.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 h-64">
          <div className="w-full md:w-1/3 bg-gray-50 rounded-xl border border-gray-200 p-3 space-y-2 overflow-hidden">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Inbox</div>
            <div className="p-2 bg-white rounded shadow-sm border-l-2 border-[var(--color-eulance-navy)]">
              <div className="text-xs font-bold text-gray-800">Tiago Mendes</div>
              <div className="text-[10px] text-gray-500 truncate">I am available for this...</div>
            </div>
          </div>
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-inner border border-gray-100 p-4 flex flex-col justify-end bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
             <div className="self-end mb-3 px-3 py-2 bg-gray-100 rounded-xl rounded-tr-sm text-xs text-gray-600 border border-gray-200">Hi Tiago, are you ready?</div>
             <div className="relative self-end">
                 <div className="absolute -inset-1 border-2 border-[var(--color-eulance-navy)] rounded-lg animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(2)}></div>
                 <div className="absolute -bottom-4 right-2 text-blue-500 animate-bounce z-20 pointer-events-none">
                   <MousePointer2 className="fill-blue-500" />
                 </div>
                 <div className="w-full px-4 py-2 bg-[var(--color-eulance-navy)] text-white text-[10px] font-black rounded-lg">
                   Send Formal Offer (€5,000)
                 </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Sign Contract",
      desc: "A legally binding PDF contract is generated. As the Client, type your name to sign it securely.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative">
           <div className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-wider border-b pb-2 flex items-center justify-between">
              <div>Contract #INV-2026</div>
              <div className="text-[9px] bg-red-100 text-red-700 px-2 py-0.5 rounded">Pending Your Signature</div>
           </div>
           <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
              <div className="text-xs text-gray-500">I, Iberia Retail Group, agree to the terms...</div>
              <div className="w-full h-10 bg-white border border-gray-300 rounded px-3 text-xs flex items-center text-gray-400">Type full name to sign...</div>
              <div className="relative">
                   <div className="absolute -inset-1 border-2 border-[var(--color-eulance-navy)] rounded-lg animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(3)}></div>
                   <div className="absolute -bottom-4 right-1/2 text-blue-500 animate-bounce z-20 pointer-events-none">
                     <MousePointer2 className="fill-blue-500" />
                   </div>
                   <div className="w-full py-2 bg-[var(--color-eulance-navy)] text-white text-xs font-black rounded text-center">
                     Sign Contract
                   </div>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "4. Request Revisions (Optional)",
      desc: "When work is submitted, test the dispute mechanism by clicking 'Request Changes'. Escrow mediation triggers automatically.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm bg-gradient-to-b from-amber-50 to-white">
          <div className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-wider border-b pb-2">Client Review Workroom</div>
          <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-sm">
             <div className="text-sm font-black text-amber-950 mb-4">Work Submitted for Review</div>
             <div className="flex flex-col sm:flex-row gap-3 relative">
                <div className="w-full sm:w-2/3 py-2.5 bg-emerald-600 text-white text-xs font-black rounded-lg text-center opacity-30">
                  Approve & Release Funds
                </div>
                <div className="relative w-full sm:w-1/3">
                  <div className="absolute -inset-1 border-2 border-red-500 rounded-xl animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(4)}></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-red-600 animate-bounce z-20 pointer-events-none">
                   <MousePointer2 className="fill-red-500" />
                 </div>
                  <div className="w-full py-2.5 bg-white border-2 border-amber-400 text-amber-700 text-xs font-bold rounded-lg text-center hover:bg-amber-50">
                    Request Changes
                  </div>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "5. Approve & Invoice",
      desc: "Approve the work to release funds. Download the B2B Reverse-Charge EU VAT invoice immediately.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm bg-emerald-50">
          <div className="text-xs text-emerald-600 mb-4 font-bold uppercase tracking-wider border-b border-emerald-100 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1"><CheckCircle2 size={14}/> Contract Completed</div>
            <div className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">Paid</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm text-center">
             <div className="text-emerald-500 mb-2 flex justify-center"><Coins size={32}/></div>
             <div className="text-lg font-black text-emerald-900 mb-1">€5,000 Released</div>
             <div className="relative mt-6">
                  <div className="absolute -inset-1 border-2 border-[var(--color-eulance-navy)] rounded-xl animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(0)}></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-blue-600 animate-bounce z-20 pointer-events-none">
                   <MousePointer2 className="fill-blue-500" />
                 </div>
                  <div className="w-full py-2.5 bg-white border-2 border-[var(--color-eulance-navy)] text-[var(--color-eulance-navy)] text-xs font-black rounded-lg text-center flex justify-center gap-2 items-center">
                    <FileText size={14}/> Download EU VAT Invoice
                  </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const freelancerSteps = [
    {
      title: "1. Accept Offer",
      desc: "Receive the Formal Offer in your Messages. Click 'Accept' to lock in the project budget securely.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 h-64">
          <div className="w-full md:w-1/3 bg-gray-50 rounded-xl border border-gray-200 p-3 space-y-2 overflow-hidden">
            <div className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1 border-b pb-1"><UserCheck size={12}/> Freelancer View</div>
            <div className="p-2 bg-white rounded shadow-sm border-l-2 border-emerald-500">
              <div className="text-xs font-bold text-gray-800">Iberia Retail Group</div>
              <div className="text-[10px] text-gray-500 truncate">Contract offer attached...</div>
            </div>
          </div>
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-inner border border-gray-100 p-4 flex flex-col justify-end bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
             <div className="w-5/6 self-start bg-emerald-700 rounded-2xl rounded-tl-sm p-4 text-white shadow-md relative">
                <div className="text-xs font-bold mb-2 flex items-center gap-1"><FileText size={14}/> Formal Contract Offer</div>
                <div className="text-[10px] text-gray-200 mb-3">Project: Build Marketplace MVP<br/>Amount: €5,000</div>
                <div className="relative">
                   <div className="absolute -inset-1 border-2 border-[var(--color-eulance-yellow)] rounded-lg animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(1)}></div>
                   <div className="absolute -bottom-4 right-2 text-yellow-500 animate-bounce z-20 pointer-events-none">
                     <MousePointer2 className="fill-[var(--color-eulance-yellow)]" />
                   </div>
                   <div className="w-full py-2 bg-[var(--color-eulance-yellow)] text-emerald-900 text-xs font-black rounded text-center">
                     Accept Offer
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "2. Sign Contract",
      desc: "Type your name to digitally counter-sign the contract. The 0% Founder Fee promo applies automatically.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative">
           <div className="text-xs text-emerald-600 mb-4 font-bold uppercase tracking-wider border-b pb-2 flex items-center justify-between">
              <div>Contract #INV-2026</div>
              <div className="text-[9px] bg-red-100 text-red-700 px-2 py-0.5 rounded">Pending Your Signature</div>
           </div>
           <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
              <div className="text-xs text-gray-500">I, Tiago Mendes, agree to the terms...</div>
              <div className="w-full h-10 bg-white border border-gray-300 rounded px-3 text-xs flex items-center text-gray-400">Type full name to sign...</div>
              <div className="relative">
                   <div className="absolute -inset-1 border-2 border-emerald-600 rounded-lg animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(2)}></div>
                   <div className="absolute -bottom-4 right-1/2 text-emerald-500 animate-bounce z-20 pointer-events-none">
                     <MousePointer2 className="fill-emerald-500" />
                   </div>
                   <div className="w-full py-2 bg-emerald-600 text-white text-xs font-black rounded text-center">
                     Sign Contract
                   </div>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "3. Submit Work",
      desc: "When the task is complete, open the Workroom, attach deliverables, and submit them for the Client's approval.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm bg-gradient-to-b from-gray-50 to-white">
          <div className="text-xs text-emerald-600 mb-4 font-bold uppercase tracking-wider border-b pb-2 flex items-center gap-1">
            <ShieldCheck size={14}/> Secure Workroom (Freelancer)
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
             <div className="text-sm font-black text-gray-800 mb-2">Submit Final Deliverables</div>
             <div className="w-full h-16 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-400 p-3 mb-4">Attach files or links here...</div>
             <div className="relative">
                  <div className="absolute -inset-1 border-2 border-emerald-600 rounded-xl animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(3)}></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-emerald-600 animate-bounce z-20 pointer-events-none">
                   <MousePointer2 className="fill-emerald-500" />
                 </div>
                  <div className="w-full py-2.5 bg-emerald-600 text-white text-xs font-black rounded-lg text-center shadow-sm">
                    Submit Work for Approval
                  </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "4. Receive Funds & Invoice",
      desc: "Once the Client approves, Escrow is released directly to your account and EULANCE generates the VAT Invoice.",
      wireframe: (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm bg-emerald-50">
          <div className="text-xs text-emerald-600 mb-4 font-bold uppercase tracking-wider border-b border-emerald-100 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1"><CheckCircle2 size={14}/> Contract Completed</div>
            <div className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">Paid to you</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm text-center">
             <div className="text-emerald-500 mb-2 flex justify-center"><Coins size={32}/></div>
             <div className="text-lg font-black text-emerald-900 mb-1">€5,000 Earned</div>
             <div className="text-xs text-emerald-700 mb-6 font-medium">Platform Fee: €0 (Founder Promo).</div>
             
             <div className="relative">
                  <div className="absolute -inset-1 border-2 border-emerald-600 rounded-xl animate-pulse cursor-pointer z-10" onClick={() => setActiveStep(0)}></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-emerald-600 animate-bounce z-20 pointer-events-none">
                   <MousePointer2 className="fill-emerald-500" />
                 </div>
                  <div className="w-full py-2.5 bg-emerald-600 text-white text-xs font-black rounded-lg text-center flex justify-center gap-2 items-center">
                    <FileText size={14}/> Download My VAT Invoice
                  </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const currentSteps = activePath === "client" ? clientSteps : freelancerSteps;

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 text-center space-y-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Info size={32} />
            </div>
            <h1 className="text-4xl font-black text-[var(--color-eulance-navy)]">Interactive Visual Guide</h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              EULANCE is a multi-sided marketplace. Follow the complete commercial lifecycle below from both perspectives.
            </p>

            {/* Path Toggle */}
            <div className="inline-flex bg-gray-100 rounded-2xl p-2 shadow-inner border border-gray-200">
              <button 
                onClick={() => setActivePath("client")}
                className={`px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${activePath === "client" ? "bg-[var(--color-eulance-navy)] text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}
              >
                <Building2 size={18} /> Client Path
              </button>
              <button 
                onClick={() => setActivePath("freelancer")}
                className={`px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${activePath === "freelancer" ? "bg-emerald-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}
              >
                <UserCheck size={18} /> Freelancer Path
              </button>
            </div>
          </div>

          {/* Interactive Schematic Section */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 flex flex-col md:flex-row">
            
            {/* Left Sidebar: Steps Menu */}
            <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-2">
              <h3 className="font-extrabold text-gray-400 mb-2 uppercase tracking-wider text-xs">
                {activePath === "client" ? "Hiring Flow" : "Working Flow"}
              </h3>
              {currentSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-xl transition-all border ${
                    activeStep === idx 
                      ? (activePath === "client" ? "bg-white border-[var(--color-eulance-navy)] shadow-xs" : "bg-white border-emerald-500 shadow-xs")
                      : "bg-transparent border-transparent hover:bg-gray-100"
                  }`}
                >
                  <h4 className={`font-bold text-sm ${activeStep === idx ? (activePath === "client" ? "text-[var(--color-eulance-navy)]" : "text-emerald-700") : "text-gray-600"}`}>
                    {step.title}
                  </h4>
                </button>
              ))}
            </div>

            {/* Right Panel: Wireframe Viewer */}
            <div className="w-full md:w-2/3 p-8 flex flex-col justify-center items-center bg-[var(--color-eulance-soft)]">
               
               <div className="w-full max-w-lg space-y-6">
                 <div className="text-center space-y-2">
                   <h2 className={`text-2xl font-black ${activePath === "client" ? "text-[var(--color-eulance-navy)]" : "text-emerald-800"}`}>
                     {currentSteps[activeStep].title}
                   </h2>
                   <p className="text-sm text-gray-600 font-medium">
                     {currentSteps[activeStep].desc}
                   </p>
                 </div>

                 {/* Render Wireframe */}
                 <div className="mt-8 transition-opacity duration-300">
                    {currentSteps[activeStep].wireframe}
                 </div>

                 {/* Next Button */}
                 <div className="pt-8 flex justify-center">
                   <button
                     onClick={() => setActiveStep((prev) => (prev + 1) % currentSteps.length)}
                     className={`px-6 py-2.5 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2 ${activePath === "client" ? "bg-[var(--color-eulance-navy)] hover:bg-[var(--color-eulance-blue)]" : "bg-emerald-600 hover:bg-emerald-700"}`}
                   >
                     {activeStep === currentSteps.length - 1 ? "Restart Flow" : "Next Step"} <ArrowRight size={14} />
                   </button>
                 </div>
               </div>

            </div>
          </div>
          
          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 flex items-start gap-4">
            <div className="shrink-0 mt-1">
              <Building2 size={24} className="text-amber-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-amber-950 text-sm mb-1">Testing Tip: The Unhappy Path</h4>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                Want to see what happens when things go wrong? When the Freelancer submits work in the Workroom, switch to the Client view and click <strong>"Request Changes"</strong> instead of Approving. This will throw the contract into an "In Revision" state and show the Escrow mediation warning.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
