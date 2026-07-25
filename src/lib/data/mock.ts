export interface Freelancer {
  id: string;
  name: string;
  role: string;
  country: string;
  countryCode: string;
  rating: number;
  jobsCompleted: number;
  hourlyRate: number;
  verified: boolean;
  founder: boolean;
  skills: string[];
  avatar: string;
  bio: string;
  availability: string;
  vatNumber: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  clientCountry: string;
  budget: string;
  budgetValue: number;
  status: "Open" | "In Progress" | "Completed";
  postedDate: string;
  description: string;
  skillsRequired: string[];
  matchScore: number;
  proposalsCount: number;
}

export interface Contract {
  id: string;
  projectName: string;
  clientName: string;
  clientVat: string;
  freelancerName: string;
  freelancerVat: string;
  amount: number;
  clientFee: number;
  freelancerFee: number;
  status: "Draft" | "Signed" | "Funded" | "Delivered" | "Completed";
  escrowStatus: "Pending" | "Funded" | "Released";
  deadline: string;
  jurisdiction: string;
}

export const freelancers: Freelancer[] = [
  {
    id: "f1",
    name: "Marco Rossi",
    role: "Senior React & Next.js Architect",
    country: "Italy",
    countryCode: "IT",
    rating: 4.9,
    jobsCompleted: 34,
    hourlyRate: 65,
    verified: true,
    founder: true,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    avatar: "MR",
    bio: "Senior frontend architect with 8+ years building enterprise SaaS and Next.js platforms.",
    availability: "Available now (30h/wk)",
    vatNumber: "IT09876543210"
  },
  {
    id: "f2",
    name: "Ana Silva",
    role: "Lead UX/UI & Product Designer",
    country: "Portugal",
    countryCode: "PT",
    rating: 5.0,
    jobsCompleted: 42,
    hourlyRate: 55,
    verified: true,
    founder: true,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Tailwind"],
    avatar: "AS",
    bio: "Award-winning product designer specializing in fintech and European startup branding.",
    availability: "Available in 1 week",
    vatNumber: "PT501234567"
  },
  {
    id: "f3",
    name: "Sofia Santos",
    role: "Full-Stack TypeScript Specialist",
    country: "Spain",
    countryCode: "ES",
    rating: 4.95,
    jobsCompleted: 29,
    hourlyRate: 70,
    verified: true,
    founder: true,
    skills: ["TypeScript", "Node.js", "GraphQL", "PostgreSQL", "React"],
    avatar: "SS",
    bio: "Full-stack engineer building fast, secure web apps for high-growth tech scaleups.",
    availability: "Available now (40h/wk)",
    vatNumber: "ESB12345678"
  },
  {
    id: "f4",
    name: "Jürgen Weber",
    role: "Backend & Cloud Engineer",
    country: "Germany",
    countryCode: "DE",
    rating: 4.85,
    jobsCompleted: 18,
    hourlyRate: 85,
    verified: true,
    founder: false,
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS", "Kubernetes"],
    avatar: "JW",
    bio: "Cloud specialist focused on resilient microservices and GDPR-compliant server architecture.",
    availability: "Available part-time",
    vatNumber: "DE999888777"
  },
  {
    id: "f5",
    name: "Claire Dubois",
    role: "AI & ML Integration Specialist",
    country: "France",
    countryCode: "FR",
    rating: 4.9,
    jobsCompleted: 22,
    hourlyRate: 90,
    verified: true,
    founder: false,
    skills: ["Python", "OpenAI", "LangChain", "FastAPI", "React"],
    avatar: "CD",
    bio: "AI engineer helping European enterprises integrate open-weight LLMs into existing workflows.",
    availability: "Available now",
    vatNumber: "FR12345678901"
  }
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "E-commerce Redesign MVP",
    client: "TechNova Solutions",
    clientCountry: "Portugal",
    budget: "€4,500",
    budgetValue: 4500,
    status: "Open",
    postedDate: "2 days ago",
    description: "Looking for a Next.js expert to rebuild our storefront. Must have experience with Stripe integration, SSR, and i18n.",
    skillsRequired: ["Next.js", "React", "TypeScript", "Stripe"],
    matchScore: 94,
    proposalsCount: 4
  },
  {
    id: "p2",
    title: "Fintech App UI/UX Dashboard",
    client: "EuroFinance GmbH",
    clientCountry: "Germany",
    budget: "€6,000",
    budgetValue: 6000,
    status: "Open",
    postedDate: "1 week ago",
    description: "Design a new dashboard for our wealth management application. Clean, institutional look required with full accessibility.",
    skillsRequired: ["Figma", "Design Systems", "UI Design", "Fintech"],
    matchScore: 88,
    proposalsCount: 7
  },
  {
    id: "p3",
    title: "Cross-Border VAT Analytics Engine",
    client: "Iberia Retail Group",
    clientCountry: "Spain",
    budget: "€8,200",
    budgetValue: 8200,
    status: "Open",
    postedDate: "3 days ago",
    description: "Build an automated tax reporting engine to calculate reverse-charge VAT across 27 EU member states.",
    skillsRequired: ["Node.js", "PostgreSQL", "TypeScript", "VAT API"],
    matchScore: 91,
    proposalsCount: 3
  }
];

export const mockMessages = [
  {
    id: "m1",
    sender: "TechNova Solutions",
    role: "client",
    text: "Hi Marco! We saw your profile on EULANCE. Your React and Next.js experience is a 94% match for our E-commerce MVP project.",
    timestamp: "10:30 AM"
  },
  {
    id: "m2",
    sender: "Marco Rossi",
    role: "freelancer",
    text: "Hello! Thank you for reaching out. I've reviewed the requirements for the Next.js storefront and Stripe integration. I'm ready to get started!",
    timestamp: "10:35 AM"
  },
  {
    id: "m3",
    sender: "TechNova Solutions",
    role: "client",
    text: "Great! Let's initiate the contract on EULANCE. The automated EU agreement looks solid and secures our milestone in Escrow.",
    timestamp: "10:40 AM"
  }
];

export const contracts: Contract[] = [
  {
    id: "c1",
    projectName: "E-commerce Redesign MVP",
    clientName: "TechNova Solutions",
    clientVat: "PT509876543",
    freelancerName: "Marco Rossi",
    freelancerVat: "IT09876543210",
    amount: 4500,
    clientFee: 675, // 15%
    freelancerFee: 225, // 5%
    status: "Signed",
    escrowStatus: "Funded",
    deadline: "2027-11-15",
    jurisdiction: "Italy / Portugal EU Cross-Border Agreement"
  }
];

export const dashboardMetrics = {
  freelancer: {
    totalEarnings: "€14,250",
    activeContracts: 1,
    pendingProposals: 3,
    trustScore: 98,
    completionRate: "100%",
    founderBadge: true
  },
  client: {
    totalSpent: "€32,400",
    activeProjects: 2,
    hiredFreelancers: 5,
    avgTimeToHire: "3 days",
    avgRating: 4.95
  }
};
