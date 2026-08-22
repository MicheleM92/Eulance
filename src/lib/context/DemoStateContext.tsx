"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Freelancer,
  Project,
  Proposal,
  MessageItem,
  ContractItem,
  initialFreelancers,
  initialProjects,
  initialContract,
  initialMessages,
} from "@/lib/data/mock";
import { calculateContractBreakdown } from "@/lib/config/fees";

export type RoleType = "client" | "freelancer";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "info" | "success" | "warning";
  read: boolean;
}

interface DemoStateContextType {
  activeRole: RoleType;
  switchRole: (role: RoleType) => void;
  freelancers: Freelancer[];
  projects: Project[];
  contracts: ContractItem[];
  messages: MessageItem[];
  proposals: Proposal[];
  notifications: NotificationItem[];
  activeContract: ContractItem | null;
  addProject: (projectData: Omit<Project, "id" | "postedDate" | "status" | "proposalsCount" | "matchScore">) => Project;
  submitProposal: (proposalData: { projectId: string; bidAmount: number; deliveryDays: number; coverLetter: string }) => void;
  sendOffer: (offerData: { projectId: string; freelancerId: string; amount: number; deadline: string }) => ContractItem;
  signContract: (contractId: string, role: RoleType) => void;
  submitWork: (contractId: string, note: string, fileName?: string) => void;
  requestChanges: (contractId: string) => void;
  approveWork: (contractId: string, stars: number, comment: string) => void;
  sendMessage: (text: string, attachment?: MessageItem["attachment"]) => void;
  markNotificationAsRead: (id: string) => void;
  resetDemo: () => void;
}

const DemoStateContext = createContext<DemoStateContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "eulance_demo_state_v1";

export const DemoStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<RoleType>("client");
  const [freelancers, setFreelancers] = useState<Freelancer[]>(initialFreelancers);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [contracts, setContracts] = useState<ContractItem[]>([initialContract]);
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      title: "Contract Active & Escrow Funded",
      message: "Iberia Retail Group deposited €1,150 into Escrow for 'Iberian E-Commerce Storefront Redesign'.",
      timestamp: "Just now",
      type: "success",
      read: false,
    },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeRole) setActiveRole(parsed.activeRole);
        if (parsed.freelancers) setFreelancers(parsed.freelancers);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.contracts) setContracts(parsed.contracts);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.proposals) setProposals(parsed.proposals);
        if (parsed.notifications) setNotifications(parsed.notifications);
      }
    } catch (e) {
      console.error("Failed to load local state", e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const stateToSave = {
        activeRole,
        freelancers,
        projects,
        contracts,
        messages,
        proposals,
        notifications,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save local state", e);
    }
  }, [activeRole, freelancers, projects, contracts, messages, proposals, notifications]);

  const switchRole = (role: RoleType) => {
    setActiveRole(role);
  };

  const addNotification = (title: string, message: string, type: "info" | "success" | "warning" = "info") => {
    const newNotif: NotificationItem = {
      id: `n_${Date.now()}`,
      title,
      message,
      timestamp: "Just now",
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addProject = (
    projectData: Omit<Project, "id" | "postedDate" | "status" | "proposalsCount" | "matchScore">
  ): Project => {
    const newProject: Project = {
      ...projectData,
      id: `p_${Date.now()}`,
      postedDate: "Just now",
      status: "Open",
      proposalsCount: 0,
      matchScore: 95,
    };

    setProjects((prev) => [newProject, ...prev]);
    addNotification("New Project Posted", `Project "${newProject.title}" is now live on EULANCE.`, "success");
    return newProject;
  };

  const submitProposal = ({
    projectId,
    bidAmount,
    deliveryDays,
    coverLetter,
  }: {
    projectId: string;
    bidAmount: number;
    deliveryDays: number;
    coverLetter: string;
  }) => {
    const currentFreelancer = freelancers[0]; // Tiago Mendes by default for demo
    const newProposal: Proposal = {
      id: `prop_${Date.now()}`,
      projectId,
      freelancerId: currentFreelancer.id,
      freelancerName: currentFreelancer.name,
      freelancerCountry: currentFreelancer.country,
      bidAmount,
      deliveryDays,
      coverLetter,
      createdAt: "Just now",
      status: "Pending",
    };

    setProposals((prev) => [newProposal, ...prev]);

    // Update project proposals count
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, proposalsCount: p.proposalsCount + 1 } : p
      )
    );

    addNotification("Proposal Submitted", `Your proposal for €${bidAmount} was sent to the client.`, "success");
  };

  const sendOffer = ({
    projectId,
    freelancerId,
    amount,
    deadline,
  }: {
    projectId: string;
    freelancerId: string;
    amount: number;
    deadline: string;
  }): ContractItem => {
    const targetProject = projects.find((p) => p.id === projectId) || projects[0];
    const targetFreelancer = freelancers.find((f) => f.id === freelancerId) || freelancers[0];

    const feeBreakdown = calculateContractBreakdown(amount, {
      isFreelancerFounder: targetFreelancer.founder,
    });

    const newContract: ContractItem = {
      id: `c_${Date.now()}`,
      projectId: targetProject.id,
      projectName: targetProject.title,
      clientName: targetProject.client,
      clientCountry: targetProject.clientCountry,
      clientVat: targetProject.clientVat || "PT509876543",
      freelancerId: targetFreelancer.id,
      freelancerName: targetFreelancer.name,
      freelancerCountry: targetFreelancer.country,
      freelancerVat: targetFreelancer.vatNumber,
      amount,
      clientFee: feeBreakdown.clientFee,
      freelancerFee: feeBreakdown.freelancerFee,
      clientTotalPaid: feeBreakdown.clientTotal,
      freelancerNetPayout: feeBreakdown.freelancerPayout,
      status: "Client_Signed",
      escrowStatus: "Funded",
      deadline,
      jurisdiction: `EU Cross-Border Commercial Agreement (${targetProject.clientCountry} / ${targetFreelancer.country})`,
      contractLanguage: "English (Certified EU Template)",
      signedByClientAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    setContracts((prev) => [newContract, ...prev]);

    // Add offer message to chat
    const offerMessage: MessageItem = {
      id: `m_${Date.now()}`,
      conversationId: "conv1",
      senderId: "c_iberia",
      senderName: targetProject.client,
      senderRole: "client",
      text: `Formal Offer sent for "${targetProject.title}". Amount: €${amount}. Deposit of €${feeBreakdown.clientTotal} allocated to Escrow.`,
      timestamp: "Just now",
      offerData: {
        projectId: targetProject.id,
        projectTitle: targetProject.title,
        amount,
        deadline,
        status: "Pending",
      },
    };
    setMessages((prev) => [...prev, offerMessage]);

    addNotification("Offer Created & Signed by Client", `Offer sent to ${targetFreelancer.name} for €${amount}.`, "success");
    return newContract;
  };

  const signContract = (contractId: string, role: RoleType) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const now = new Date().toISOString().replace("T", " ").substring(0, 16);
        if (role === "freelancer") {
          return {
            ...c,
            status: "Active",
            escrowStatus: "Funded",
            signedByFreelancerAt: now,
          };
        } else {
          return {
            ...c,
            signedByClientAt: now,
          };
        }
      })
    );

    // Update project status to In Progress
    const targetContract = contracts.find((c) => c.id === contractId);
    if (targetContract) {
      setProjects((prev) =>
        prev.map((p) => (p.id === targetContract.projectId ? { ...p, status: "In Progress" } : p))
      );
    }

    addNotification("Contract Signed", `Contract is now ACTIVE. Escrow funds secured.`, "success");
  };

  const submitWork = (contractId: string, note: string, fileName: string = "EULANCE_Deliverables_v1.zip") => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          status: "Delivered",
          submissionNote: note,
          submissionFile: fileName,
        };
      })
    );

    // Update project status
    const targetContract = contracts.find((c) => c.id === contractId);
    if (targetContract) {
      setProjects((prev) =>
        prev.map((p) => (p.id === targetContract.projectId ? { ...p, status: "Under Review" } : p))
      );
    }

    addNotification("Work Submitted", `Work delivered! Client has been notified for approval.`, "info");
  };

  const requestChanges = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          status: "In Revision",
        };
      })
    );

    const targetContract = contracts.find((c) => c.id === contractId);
    if (targetContract) {
      setProjects((prev) =>
        prev.map((p) => (p.id === targetContract.projectId ? { ...p, status: "In Progress" } : p))
      );
    }

    addNotification("Changes Requested", `Freelancer has been notified to revise the deliverables.`, "warning");
  };

  const approveWork = (contractId: string, stars: number, comment: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          status: "Completed",
          escrowStatus: "Released",
          reviewStars: stars,
          reviewComment: comment,
        };
      })
    );

    // Update project status
    const targetContract = contracts.find((c) => c.id === contractId);
    if (targetContract) {
      setProjects((prev) =>
        prev.map((p) => (p.id === targetContract.projectId ? { ...p, status: "Completed" } : p))
      );
      // Update freelancer completed count
      setFreelancers((prev) =>
        prev.map((f) =>
          f.id === targetContract.freelancerId
            ? { ...f, jobsCompleted: f.jobsCompleted + 1 }
            : f
        )
      );
    }

    addNotification("Payment Released & Completed", `€${targetContract?.freelancerNetPayout || 950} released to freelancer. Contract completed!`, "success");
  };

  const sendMessage = (text: string, attachment?: MessageItem["attachment"]) => {
    const senderName = activeRole === "client" ? "Iberia Retail Group" : "Tiago Mendes";
    const senderId = activeRole === "client" ? "c_iberia" : "f1";

    const newMessage: MessageItem = {
      id: `m_${Date.now()}`,
      conversationId: "conv1",
      senderId,
      senderName,
      senderRole: activeRole,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachment,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const resetDemo = () => {
    setActiveRole("client");
    setFreelancers(initialFreelancers);
    setProjects(initialProjects);
    setContracts([initialContract]);
    setMessages(initialMessages);
    setProposals([]);
    setNotifications([
      {
        id: "n1",
        title: "Demo State Reset",
        message: "EULANCE demo restored to initial European baseline.",
        timestamp: "Just now",
        type: "info",
        read: false,
      },
    ]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const activeContract = contracts[0] || null;

  return (
    <DemoStateContext.Provider
      value={{
        activeRole,
        switchRole,
        freelancers,
        projects,
        contracts,
        messages,
        proposals,
        notifications,
        activeContract,
        addProject,
        submitProposal,
        sendOffer,
        signContract,
        submitWork,
        requestChanges,
        approveWork,
        sendMessage,
        markNotificationAsRead,
        resetDemo,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
};

export const useDemoState = () => {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error("useDemoState must be used within a DemoStateProvider");
  }
  return context;
};
