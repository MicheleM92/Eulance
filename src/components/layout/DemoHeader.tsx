"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemoState } from "@/lib/context/DemoStateContext";
import {
  Briefcase,
  UserCheck,
  RotateCcw,
  Bell,
  MessageSquare,
  FileText,
  Layers,
  Search,
  PlusCircle,
  Coins,
  User,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function DemoHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeRole, switchRole, notifications, markNotificationAsRead, resetDemo, activeContract } = useDemoState();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleToggle = (newRole: "client" | "freelancer") => {
    switchRole(newRole);
    if (newRole === "client") {
      router.push("/demo/client");
    } else {
      router.push("/demo/freelancer");
    }
  };

  const isClientView = activeRole === "client";

  return (
    <div className="bg-[var(--color-eulance-navy)] text-white border-b border-blue-900 sticky top-16 z-40">
      {/* Top Banner Control Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Role Perspective Switcher Pill */}
        <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleRoleToggle("client")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              isClientView
                ? "bg-[var(--color-eulance-yellow)] text-[var(--color-eulance-navy)] shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            <Briefcase size={14} />
            Client Mode (Hiring)
          </button>
          <button
            onClick={() => handleRoleToggle("freelancer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              !isClientView
                ? "bg-[var(--color-eulance-emerald)] text-white shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            <UserCheck size={14} />
            Freelancer Mode (Working)
          </button>
        </div>

        {/* Right Controls: Notifications, Demo Badge, Reset Button */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Notifications"
            >
              <Bell size={15} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-extrabold text-xs text-[var(--color-eulance-navy)]">Demo Alerts</span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                    {notifications.length} Total
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 text-xs cursor-pointer hover:bg-gray-50 transition-colors ${
                        !n.read ? "bg-blue-50/50 font-medium" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--color-eulance-navy)]">{n.title}</span>
                        <span className="text-[10px] text-gray-400">{n.timestamp}</span>
                      </div>
                      <p className="text-gray-600 text-[11px] leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Demo Mode Active
          </div>

          <Link
            href="/demo/guide"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 transition-colors font-bold text-[11px]"
            title="How to use this demo"
          >
            <Search size={12} />
            Demo Info
          </Link>

          <button
            onClick={resetDemo}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-colors font-bold text-[11px]"
            title="Reset demo data state"
          >
            <RotateCcw size={12} />
            Reset Demo
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar based on active role */}
      <div className="bg-[#102D54] border-t border-blue-900/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto py-2">
          {isClientView ? (
            <>
              <Link
                href="/demo/client"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname === "/demo/client" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Layers size={13} /> Dashboard
              </Link>
              <Link
                href="/demo/client/projects/new"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors text-[var(--color-eulance-yellow)] hover:underline`}
              >
                <PlusCircle size={13} /> Post Project (AI Match)
              </Link>
              <Link
                href="/demo/client/talent"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/talent") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Search size={13} /> Find Talent
              </Link>
              <Link
                href="/demo/messages"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/messages") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <MessageSquare size={13} /> Messages & Offers
              </Link>
              <Link
                href="/demo/contracts"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/contracts") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <FileText size={13} /> Contracts
              </Link>
              {activeContract && (
                <Link
                  href={`/demo/workroom/${activeContract.id}`}
                  className={`font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors ml-auto shrink-0`}
                >
                  <CheckCircle2 size={13} /> Shared Workroom ({activeContract.escrowStatus})
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/demo/freelancer"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname === "/demo/freelancer" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Layers size={13} /> Dashboard
              </Link>
              <Link
                href="/demo/freelancer/jobs"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/jobs") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Search size={13} /> Job Marketplace
              </Link>
              <Link
                href="/demo/freelancer/earnings"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/earnings") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Coins size={13} /> Earnings & Invoices
              </Link>
              <Link
                href="/demo/messages"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/messages") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <MessageSquare size={13} /> Messages & Offers
              </Link>
              <Link
                href="/demo/contracts"
                className={`font-bold flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  pathname.includes("/contracts") ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <FileText size={13} /> Contracts
              </Link>
              {activeContract && (
                <Link
                  href={`/demo/workroom/${activeContract.id}`}
                  className={`font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors ml-auto shrink-0`}
                >
                  <CheckCircle2 size={13} /> Shared Workroom ({activeContract.status})
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
