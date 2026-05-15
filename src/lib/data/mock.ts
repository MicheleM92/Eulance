export const freelancers = [
  {
    id: "f1",
    name: "Marco Rossi",
    role: "Senior React Developer",
    country: "Italy",
    rating: 4.9,
    jobsCompleted: 34,
    hourlyRate: 65,
    verified: true,
    founder: true,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    avatar: "MR",
  },
  {
    id: "f2",
    name: "Ana Silva",
    role: "UX/UI Designer",
    country: "Portugal",
    rating: 5.0,
    jobsCompleted: 42,
    hourlyRate: 55,
    verified: true,
    founder: true,
    skills: ["Figma", "Prototyping", "Wireframing", "User Research"],
    avatar: "AS",
  },
  {
    id: "f3",
    name: "Jürgen Weber",
    role: "Backend Engineer",
    country: "Germany",
    rating: 4.8,
    jobsCompleted: 18,
    hourlyRate: 80,
    verified: true,
    founder: false,
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    avatar: "JW",
  }
];

export const projects = [
  {
    id: "p1",
    title: "E-commerce Redesign MVP",
    client: "TechNova Solutions",
    budget: "€4,500",
    status: "Open",
    postedDate: "2 days ago",
    description: "Looking for a Next.js expert to rebuild our storefront. Must have experience with Stripe integration.",
    skillsRequired: ["Next.js", "React", "Stripe"],
    matchScore: 94,
  },
  {
    id: "p2",
    title: "Fintech App UI/UX",
    client: "EuroFinance GmbH",
    budget: "€6,000",
    status: "Open",
    postedDate: "1 week ago",
    description: "Design a new dashboard for our wealth management application. Clean, institutional look required.",
    skillsRequired: ["Figma", "UI Design", "Fintech"],
    matchScore: 88,
  }
];

export const contracts = [
  {
    id: "c1",
    projectName: "E-commerce Redesign MVP",
    clientName: "TechNova Solutions",
    amount: "€4,500",
    status: "Active",
    escrowStatus: "Funded",
    deadline: "2027-11-15",
  }
];

export const dashboardMetrics = {
  freelancer: {
    totalEarnings: "€14,250",
    activeContracts: 1,
    pendingProposals: 3,
    trustScore: 98,
  },
  client: {
    totalSpent: "€32,400",
    activeProjects: 2,
    hiredFreelancers: 5,
    avgTimeToHire: "3 days",
  }
};
