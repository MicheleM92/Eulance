"use client";

import React from "react";
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
  Info
} from "lucide-react";

export default function DemoGuidePage() {
  const steps = [
    {
      icon: <UserCheck size={32} className="text-blue-600" />,
      title: "1. The Role Switcher (Top Left)",
      description: "EULANCE is a multi-sided marketplace. Use the toggle in the top-left corner of the header to instantly switch your perspective between Client Mode (Hiring) and Freelancer Mode (Working). The state is shared, meaning actions taken as a Client will be immediately visible when you switch to the Freelancer view, simulating a live collaboration.",
      actionLabel: "Try it now in the header!",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Briefcase size={32} className="text-indigo-600" />,
      title: "2. Posting a Project (Client Mode)",
      description: "As a Client, navigate to 'Post Project' in the sub-menu. You can type a custom project title, budget, and description. Once submitted, EULANCE's simulated AI Matching algorithm will instantly surface the top 5 verified EU professionals that match your criteria.",
      actionLabel: "Post Project",
      link: "/demo/client/projects/new",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <MessageSquare size={32} className="text-amber-600" />,
      title: "3. Real-Time Chat & Offers",
      description: "After selecting a candidate, you enter the 'Commercial Inbox'. You can chat in real-time (try sending a message, then switch to Freelancer Mode to reply!). As a Client, you can click 'Send Formal Offer' to propose a binding contract.",
      actionLabel: "Go to Messages",
      link: "/demo/messages",
      bgColor: "bg-amber-50"
    },
    {
      icon: <FileText size={32} className="text-gray-600" />,
      title: "4. Smart Contracts & PDF Generation",
      description: "Once an offer is accepted, a formal EU-compliant contract is generated. Both parties can digitally sign it. You can also click 'Download PDF' to see how EULANCE dynamically generates a pixel-perfect printable contract using your custom data.",
      actionLabel: "View Contracts",
      link: "/demo/contracts",
      bgColor: "bg-gray-100"
    },
    {
      icon: <ShieldCheck size={32} className="text-emerald-600" />,
      title: "5. The Workroom & Escrow",
      description: "When fully signed, you unlock the 'Shared Workroom'. This is where the magic happens: Freelancers submit work, Clients approve it (releasing Escrow funds), or request revisions. Once completed, you can even download the auto-generated Reverse-Charge EU VAT Invoice.",
      actionLabel: "Open Workroom",
      link: "/demo/workroom/c1",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <Coins size={32} className="text-teal-600" />,
      title: "6. The Financial Model (0% Founder Promo)",
      description: "Keep an eye on the financial breakdowns! You will notice the Client pays a 15% EULANCE fee, while the Freelancer pays 0% due to the 'Founder Promo' (normally 5%). This demonstrates the strategic launch plan to acquire initial supply for free.",
      actionLabel: "Reset Demo to see default data",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-eulance-soft)] flex flex-col">
      <DemoHeader />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info size={32} />
            </div>
            <h1 className="text-4xl font-black text-[var(--color-eulance-navy)]">How to Demo EULANCE</h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Welcome to the EULANCE interactive MVP. This prototype is designed to simulate a fully functional European cross-border marketplace without a backend database. 
              Here is how to navigate the platform and test its core features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className={`w-14 h-14 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-black text-[var(--color-eulance-navy)] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium flex-1 mb-6">
                  {step.description}
                </p>
                {step.link ? (
                  <Link 
                    href={step.link}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[var(--color-eulance-navy)] hover:text-blue-700 transition-colors"
                  >
                    {step.actionLabel} <ArrowRight size={14} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500">
                    {step.actionLabel}
                  </span>
                )}
              </div>
            ))}
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
