"use client";

import { useState } from "react";
import { X, Plus, Sparkles, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/lib/data/mock";

interface PostProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (newProject: Project) => void;
}

export default function PostProjectModal({ isOpen, onClose, onPost }: PostProjectModalProps) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("3500");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("React, Next.js, TypeScript");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !budget) return;

    const newProj: Project = {
      id: `p_${Date.now()}`,
      title: title,
      client: "TechNova Solutions",
      clientCountry: "Portugal",
      budget: `€${Number(budget).toLocaleString()}`,
      budgetValue: Number(budget),
      status: "Open",
      postedDate: "Just now",
      description: description || "Looking for top EU freelancer to execute technical scope.",
      skillsRequired: skills.split(",").map(s => s.trim()),
      matchScore: 96,
      proposalsCount: 0
    };

    onPost(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[var(--color-eulance-border)]"
      >
        <div className="bg-[var(--color-eulance-navy)] text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-eulance-blue)] flex items-center justify-center">
              <Briefcase size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Post a New EU Project</h3>
              <p className="text-xs text-white/80">AI matches top European talent in seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-eulance-navy)] mb-1 uppercase tracking-wider">
              Project Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Next.js SaaS Storefront & Payment Portal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-eulance-blue)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-eulance-navy)] mb-1 uppercase tracking-wider">
                Fixed Budget (€)
              </label>
              <input
                type="number"
                required
                min="500"
                step="100"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-eulance-blue)]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-eulance-navy)] mb-1 uppercase tracking-wider">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-eulance-blue)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-eulance-navy)] mb-1 uppercase tracking-wider">
              Project Description & Requirements
            </label>
            <textarea
              rows={4}
              placeholder="Describe scope of work, technical requirements, and target delivery dates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-eulance-blue)]"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-center gap-2 text-xs text-[var(--color-eulance-navy)]">
            <Zap className="text-[var(--color-eulance-gold)] shrink-0" size={16} />
            <span>Posting is <strong>100% free</strong>. Pay 15% platform fee only when you hire successfully and fund Escrow.</span>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[var(--color-eulance-blue)] hover:bg-[var(--color-eulance-navy)] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
            >
              Post & Find Candidates <Sparkles size={16} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
