"use client";

import { useState } from "react";
import { mockMessages } from "@/lib/data/mock";
import { Send, X, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface DirectMessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientRole: string;
  recipientCountry: string;
  avatar: string;
}

export default function DirectMessagingModal({
  isOpen,
  onClose,
  recipientName,
  recipientRole,
  recipientCountry,
  avatar
}: DirectMessagingModalProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState("");

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      sender: "You",
      role: "client",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");

    // Simulate auto response after 1 second
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `m_${Date.now() + 1}`,
          sender: recipientName,
          role: "freelancer",
          text: `Thanks for the details! I'm happy to review the scope and proceed under EULANCE Escrow protection.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-[var(--color-eulance-border)]"
      >
        {/* Header */}
        <div className="bg-[var(--color-eulance-navy)] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold flex items-center justify-center">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{recipientName}</h3>
                <ShieldCheck size={16} className="text-[var(--color-eulance-gold)]" />
              </div>
              <p className="text-xs text-white/80">{recipientRole} • {recipientCountry}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Anti-leakage Notice */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center gap-2">
          <Lock size={14} className="shrink-0 text-amber-600" />
          <span><strong>Secure EU Messaging:</strong> Contact details are protected. Transacting inside EULANCE guarantees Escrow and auto VAT invoicing.</span>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[var(--color-eulance-soft)]/40">
          {messages.map((msg) => {
            const isMe = msg.sender === "You" || msg.sender === "TechNova Solutions";
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-[10px] text-gray-500 mb-1 px-1">{msg.sender} • {msg.timestamp}</span>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    isMe
                      ? "bg-[var(--color-eulance-blue)] text-white rounded-tr-none"
                      : "bg-white text-[var(--color-eulance-navy)] border border-gray-200 rounded-tl-none font-medium"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-[var(--color-eulance-border)] flex gap-2">
          <input
            type="text"
            placeholder="Write a message to discuss project terms..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 border border-[var(--color-eulance-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-eulance-blue)]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[var(--color-eulance-blue)] hover:bg-[var(--color-eulance-navy)] text-white rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-xs"
          >
            Send <Send size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
