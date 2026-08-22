# EULANCE — Europe's Fair Freelance Platform (MVP)

> **Freedom. Fairness. Future.**  
> EULANCE is a European-first freelance platform connecting companies and independent professionals through a fast, fair, transparent, and compliant marketplace.

---

## 🌟 Overview & Master Value Proposition

EULANCE conceptually competes with traditional overseas platforms (Upwork, Fiverr) while eliminating their core friction points for European businesses and freelancers:
- **0% Freelancer Launch Promo** (5% standard fee vs 10%–20% on Upwork).
- **15% Client Fee** with **Zero Mandatory Subscriptions** or paid bidding connects.
- **100% Licensed EU Escrow Protection**: Client funds are secured before work begins and automatically released upon approval.
- **Auto Reverse-Charge VAT Invoicing**: Article 196 EU VAT Directive cross-border compliance across all 27 EU member states.
- **eIDAS Localized Contract Engine**: Auto-generated legal agreements adapt to client/freelancer jurisdictions.
- **Non-Transferable Reputation**: Verified skills, client reviews, and permanent **Founder Badges** (#001–#500).

---

## 🚀 Key Application Routes

### Public Website
- `/` — Premium European Landing Page (Value proposition, comparison grid, metrics, role selector).
- `/pricing` — Transparent Pricing Page with **Interactive Fee Calculator** for €1,000, €5,000, or custom contracts.
- `/business-plan` — Business Plan (2027–2030) executive summary, regional market breakdown, and **Embedded PDF Document Viewer** (`/EULANCE_Business_Plan_v2.pdf`).

### Interactive Demo Portal (`/demo` or `/prototype`)
- `/demo` — Role Selection Entry ("I'm Hiring" vs "I'm a Freelancer").
- **Client Portal**:
  - `/demo/client` — Client Dashboard (Projects, total spent, AI candidate matches, active contracts).
  - `/demo/client/projects/new` — **Post Project Wizard & EULANCE AI Best Match Algorithm** (top 5 matched EU professionals).
  - `/demo/client/talent` — Pan-European Freelancer Search & Filter Marketplace.
  - `/demo/client/talent/[id]` — Detailed Freelancer Profile (Verified VAT, ratings, Founder badge, portfolio).
- **Freelancer Portal**:
  - `/demo/freelancer` — Freelancer Dashboard (Net earnings, Founder badge #042, active contracts, job recommendations).
  - `/demo/freelancer/jobs` — Job Marketplace with multi-filters and 100% free proposals.
  - `/demo/freelancer/jobs/[id]` — Job Detail & Proposal Submission Form.
  - `/demo/freelancer/earnings` — Earnings Dashboard & **Auto Reverse-Charge EU VAT Invoice Generator**.
- **Commercial Relationship & Workroom**:
  - `/demo/messages` — **3-Column Messaging Center** (Left: Conversations list, Center: Chat with text/attachment/offer actions, Right: Commercial context panel).
  - `/demo/contracts` & `/demo/contracts/[id]` — Contract Management & **Simulated eIDAS e-Signature Flow**.
  - `/demo/workroom/[id]` — **Shared Project Workroom** featuring a 7-step commercial timeline:  
    `Contract Signed` → `Funds Secured` → `Work in Progress` → `Work Submitted` → `Client Review` → `Payment Released` → `Completed`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5 (Strict Mode)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 (Vanilla CSS utility extensions, Glassmorphism)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **i18n**: Multilingual context (English, Portuguese, Spanish, Italian, German)

---

## ⚙️ Configuration Single Source of Truth

All platform fees and pricing tiers are driven centrally by `src/lib/config/fees.ts`:

```ts
export const EULANCE_FEE_CONFIG = {
  clientFeePercentage: 15, // 15% Standard Client Fee
  freelancerFeePercentage: 5, // 5% Standard Freelancer Fee
  freelancerLaunchPromoPercentage: 0, // 0% Founder Member Promo
  proMonthlyPrice: 39, // €39/month Client Pro Tier
  proClientFeePercentage: 5, // 5% Reduced Pro Fee
  aiBestMatchPrice: 15, // €15 AI Candidate Shortlist Add-on
  expressHirePrice: 90, // €90 24h Express Hire Add-on
};
```

---

## 💻 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Run production build validation
npm run build
```

---

## 🌐 Deployment Instructions (Vercel)

To deploy to Vercel via CLI:
```bash
# Login to Vercel CLI
npx vercel login

# Deploy production build
npx vercel --prod
```

Or deploy directly by connecting your GitHub repository to [Vercel Dashboard](https://vercel.com/new).

---

## ⚖️ MVP Demo vs. Production Infrastructure

| Feature Area | In This MVP Prototype | Future Production Infrastructure |
| :--- | :--- | :--- |
| **Authentication** | Demo role switcher ("Client" <-> "Freelancer") | NextAuth / Supabase Auth + eIDAS ID Verification |
| **State & Data** | Persistent `localStorage` (`DemoStateContext`) | PostgreSQL / Prisma Database |
| **Escrow & Payments** | Simulated escrow deposit & instant release | Licensed EU Payment Institution (Stripe / Mangopay) |
| **Contracts & e-Sign** | Interactive e-signature UI simulator | Certified eIDAS e-Signature API & legal templates |
| **VAT & Invoices** | Live reverse-charge invoice preview generator | Automated EU VIES API + Tax compliance engine |
| **AI Best Match** | Deterministic stack scoring algorithm | Open-weight LLMs fine-tuned on EU job market data |
