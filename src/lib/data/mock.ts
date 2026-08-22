export interface Freelancer {
  id: string;
  name: string;
  role: string;
  country: string;
  countryCode: string;
  city: string;
  rating: number;
  jobsCompleted: number;
  hourlyRate: number;
  verified: boolean;
  founder: boolean;
  founderBadgeNumber?: number;
  skills: string[];
  avatar: string;
  bio: string;
  availability: string;
  vatNumber: string;
  languages: string[];
  portfolioItems?: { title: string; category: string; link?: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  clientCountry: string;
  clientCity: string;
  clientVat: string;
  budget: string;
  budgetValue: number;
  status: "Open" | "In Progress" | "Under Review" | "Completed";
  postedDate: string;
  description: string;
  skillsRequired: string[];
  matchScore: number;
  proposalsCount: number;
  duration: string;
  remotePreference: string;
  experienceLevel: string;
}

export interface Proposal {
  id: string;
  projectId: string;
  freelancerId: string;
  freelancerName: string;
  freelancerCountry: string;
  bidAmount: number;
  deliveryDays: number;
  coverLetter: string;
  createdAt: string;
  status: "Pending" | "Accepted" | "Declined";
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: "client" | "freelancer";
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: "pdf" | "zip" | "image" | "offer";
    url?: string;
  };
  offerData?: {
    projectId: string;
    projectTitle: string;
    amount: number;
    deadline: string;
    status: "Pending" | "Accepted" | "Declined";
  };
}

export interface ContractItem {
  id: string;
  projectId: string;
  projectName: string;
  clientName: string;
  clientCountry: string;
  clientVat: string;
  freelancerId: string;
  freelancerName: string;
  freelancerCountry: string;
  freelancerVat: string;
  amount: number;
  clientFee: number; // 15% = 150
  freelancerFee: number; // 5% = 50
  clientTotalPaid: number; // 1150
  freelancerNetPayout: number; // 950
  status: "Draft" | "Client_Signed" | "Active" | "Delivered" | "In Revision" | "Completed";
  escrowStatus: "Pending" | "Funded" | "Released";
  deadline: string;
  jurisdiction: string;
  contractLanguage: string;
  signedByClientAt?: string;
  signedByFreelancerAt?: string;
  submissionNote?: string;
  submissionFile?: string;
  reviewStars?: number;
  reviewComment?: string;
}

export const initialFreelancers: Freelancer[] = [
  {
    id: "f1",
    name: "Tiago Mendes",
    role: "Senior React & Next.js Developer",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    rating: 4.9,
    jobsCompleted: 34,
    hourlyRate: 65,
    verified: true,
    founder: true,
    founderBadgeNumber: 42,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    avatar: "TM",
    bio: "I'm a frontend developer with 8 years of experience. I specialize in Next.js, React, and building fast SaaS and fintech apps.",
    availability: "Available now (30h/wk)",
    vatNumber: "PT509123456",
    languages: ["Portuguese (Native)", "English (Fluent)", "Spanish (Working)"],
    portfolioItems: [
      { title: "Payment Gateway Dashboard", category: "Fintech UI" },
      { title: "Next.js E-commerce Template", category: "Full-Stack Web" }
    ]
  },
  {
    id: "f2",
    name: "Ana Silva",
    role: "UX/UI & Product Designer",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    rating: 5.0,
    jobsCompleted: 42,
    hourlyRate: 55,
    verified: true,
    founder: true,
    founderBadgeNumber: 18,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Tailwind"],
    avatar: "AS",
    bio: "Product designer focused on clean, user-friendly UI/UX. Experienced with SaaS, fintech, and marketplaces using Figma.",
    availability: "Available in 1 week",
    vatNumber: "PT501234567",
    languages: ["Portuguese (Native)", "English (Fluent)", "French (Intermediate)"],
    portfolioItems: [
      { title: "Tech Startup Brand & App Design", category: "Design System" },
      { title: "Banking App Mobile Flow", category: "UX Research" }
    ]
  },
  {
    id: "f3",
    name: "Sofia Santos",
    role: "Full-Stack TypeScript Developer",
    country: "Spain",
    countryCode: "ES",
    city: "Barcelona",
    rating: 4.95,
    jobsCompleted: 29,
    hourlyRate: 70,
    verified: true,
    founder: true,
    founderBadgeNumber: 7,
    skills: ["TypeScript", "Node.js", "GraphQL", "PostgreSQL", "React"],
    avatar: "SS",
    bio: "Full-stack developer (Node.js/React). I build secure, scalable web apps and REST APIs from scratch.",
    availability: "Available now (40h/wk)",
    vatNumber: "ESB12345678",
    languages: ["Spanish (Native)", "Catalan (Native)", "English (Fluent)"],
    portfolioItems: [
      { title: "Invoicing Engine API", category: "Backend API" },
      { title: "Real-time SaaS Dashboard", category: "TypeScript / Node" }
    ]
  },
  {
    id: "f4",
    name: "Jürgen Weber",
    role: "DevOps & Backend Engineer",
    country: "Germany",
    countryCode: "DE",
    city: "Berlin",
    rating: 4.85,
    jobsCompleted: 18,
    hourlyRate: 85,
    verified: true,
    founder: false,
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS", "Kubernetes"],
    avatar: "JW",
    bio: "DevOps and backend engineer. I handle AWS, Docker, Kubernetes, and ensure your infrastructure is secure and scalable.",
    availability: "Available part-time",
    vatNumber: "DE999888777",
    languages: ["German (Native)", "English (Fluent)"]
  },
  {
    id: "f5",
    name: "Claire Dubois",
    role: "Machine Learning & Python Developer",
    country: "France",
    countryCode: "FR",
    city: "Paris",
    rating: 4.9,
    jobsCompleted: 22,
    hourlyRate: 90,
    verified: true,
    founder: false,
    skills: ["Python", "PyTorch", "LangChain", "FastAPI", "Mistral AI"],
    avatar: "CD",
    bio: "Machine learning engineer focused on Python, PyTorch, and NLP. I can help integrate and fine-tune LLMs for your app.",
    availability: "Available now",
    vatNumber: "FR12345678901",
    languages: ["French (Native)", "English (Fluent)"]
  },
  {
    id: "f6",
    name: "Inês Pereira",
    role: "Copywriter & Content Strategist",
    country: "Portugal",
    countryCode: "PT",
    city: "Porto",
    rating: 4.98,
    jobsCompleted: 31,
    hourlyRate: 45,
    verified: true,
    founder: true,
    founderBadgeNumber: 89,
    skills: ["Copywriting", "SEO", "Localization", "Brand Strategy", "Content Marketing"],
    avatar: "IP",
    bio: "Copywriter and content strategist. I write SEO-friendly articles, landing pages, and marketing copy for tech companies.",
    availability: "Available now",
    vatNumber: "PT509988776",
    languages: ["Portuguese (Native)", "English (Fluent)", "Spanish (Fluent)"]
  }
];

export const initialProjects: Project[] = [
  {
    id: "p1",
    title: "Iberian E-Commerce Storefront Redesign",
    category: "Software Development",
    client: "Iberia Retail Group",
    clientCountry: "Spain",
    clientCity: "Madrid",
    clientVat: "ESB98765432",
    budget: "€1,000",
    budgetValue: 1000,
    status: "In Progress",
    postedDate: "2 days ago",
    description: "Looking for an experienced Next.js/React developer to build our e-commerce frontend. You will need to integrate Stripe checkout and handle multi-currency logic.",
    skillsRequired: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe"],
    matchScore: 96,
    proposalsCount: 5,
    duration: "2-4 weeks",
    remotePreference: "Remote (EU Timezone)",
    experienceLevel: "Senior"
  },
  {
    id: "p2",
    title: "Fintech Mobile Dashboard UI/UX Architecture",
    category: "Design",
    client: "EuroFinance GmbH",
    clientCountry: "Germany",
    clientCity: "Frankfurt",
    clientVat: "DE812345678",
    budget: "€3,500",
    budgetValue: 3500,
    status: "Open",
    postedDate: "5 days ago",
    description: "Need a UI/UX designer to create a dashboard for a fintech app. We need clean, modern wireframes and a clickable Figma prototype.",
    skillsRequired: ["Figma", "Design Systems", "UI Design", "Fintech"],
    matchScore: 91,
    proposalsCount: 8,
    duration: "1-2 months",
    remotePreference: "Remote",
    experienceLevel: "Expert"
  },
  {
    id: "p3",
    title: "Automated Cross-Border VAT Reporting Engine",
    category: "Software Development",
    client: "Iberia Retail Group",
    clientCountry: "Spain",
    clientCity: "Madrid",
    clientVat: "ESB98765432",
    budget: "€4,200",
    budgetValue: 4200,
    status: "Open",
    postedDate: "1 week ago",
    description: "Looking for a backend dev (Node/TypeScript) to build a small microservice that connects to the EU VAT API for validation and reporting.",
    skillsRequired: ["Node.js", "PostgreSQL", "TypeScript", "VAT APIs"],
    matchScore: 89,
    proposalsCount: 4,
    duration: "1 month",
    remotePreference: "Remote (Spain / Portugal preferred)",
    experienceLevel: "Intermediate"
  }
];

export const initialContract: ContractItem = {
  id: "c1",
  projectId: "p1",
  projectName: "Iberian E-Commerce Storefront Redesign",
  clientName: "Iberia Retail Group",
  clientCountry: "Spain",
  clientVat: "ESB98765432",
  freelancerId: "f1",
  freelancerName: "Tiago Mendes",
  freelancerCountry: "Portugal",
  freelancerVat: "PT509123456",
  amount: 1000,
  clientFee: 150, // 15%
  freelancerFee: 0, // 0% Founder Promo
  clientTotalPaid: 1150,
  freelancerNetPayout: 1000,
  status: "Active",
  escrowStatus: "Funded",
  deadline: "2027-11-30",
  jurisdiction: "EU Cross-Border Commercial Agreement (ES / PT)",
  contractLanguage: "English (Certified Law Version)",
  signedByClientAt: "2026-08-20 14:30",
  signedByFreelancerAt: "2026-08-20 15:15"
};

export const initialMessages: MessageItem[] = [
  {
    id: "m1",
    conversationId: "conv1",
    senderId: "c_iberia",
    senderName: "Iberia Retail Group",
    senderRole: "client",
    text: "Hi Tiago, I saw your profile and it looks like a great fit. We're looking for someone to help us build a Next.js storefront.",
    timestamp: "10:15 AM"
  },
  {
    id: "m2",
    conversationId: "conv1",
    senderId: "f1",
    senderName: "Tiago Mendes",
    senderRole: "freelancer",
    text: "Hi! Thanks for reaching out. I've read the project details. The €1,000 budget and 2-week timeline work for me. When do you want to start?",
    timestamp: "10:22 AM"
  },
  {
    id: "m3",
    conversationId: "conv1",
    senderId: "c_iberia",
    senderName: "Iberia Retail Group",
    senderRole: "client",
    text: "Great! I'm sending the offer now. Let's get started as soon as the escrow is funded.",
    timestamp: "10:30 AM",
    offerData: {
      projectId: "p1",
      projectTitle: "Iberian E-Commerce Storefront Redesign",
      amount: 1000,
      deadline: "2027-11-30",
      status: "Accepted"
    }
  }
];
