export const dictionaries = {
  en: {
    nav: {
      businessPlan: "Business Plan",
      tryMvp: "Try MVP",
      login: "Login",
    },
    hero: {
      headline: "Europe's Fair Freelance Platform",
      subheadline: "Hire trusted European freelancers with less friction, safer payments and compliant workflows.",
      ctaMvp: "Try the MVP",
      ctaPlan: "View Business Plan",
    },
    problem: {
      title: "The Problem",
      highFees: "High Fees",
      highFeesDesc: "Current platforms charge up to 20% to freelancers, killing margins.",
      compliance: "Weak Compliance",
      complianceDesc: "Cross-border VAT and EU legal frameworks are ignored.",
      trust: "Poor Trust",
      trustDesc: "Fake profiles and poor matching create massive hiring friction."
    },
    solution: {
      title: "The Solution",
      aiMatch: "AI-Assisted Matching",
      aiMatchDesc: "Find the exact talent you need in minutes.",
      escrow: "Protected Payments",
      escrowDesc: "Escrow-style protection for peace of mind on both sides.",
      invoicing: "VAT & Invoicing",
      invoicingDesc: "Automated EU compliance and seamless invoicing."
    },
    footer: {
      product: "Product",
      businessPlan: "Business Plan",
      mvp: "MVP",
      contact: "Contact (Placeholder)",
      legal: "Legal Disclaimer (Prototype only. Designed for EU compliance.)",
    }
  },
  it: {
    nav: {
      businessPlan: "Business Plan",
      tryMvp: "Prova MVP",
      login: "Accedi",
    },
    hero: {
      headline: "La Piattaforma Freelance Equa in Europa",
      subheadline: "Assumi freelance europei affidabili con meno attrito, pagamenti più sicuri e flussi di lavoro conformi.",
      ctaMvp: "Prova l'MVP",
      ctaPlan: "Vedi Business Plan",
    },
    problem: {
      title: "Il Problema",
      highFees: "Commissioni Alte",
      highFeesDesc: "Le piattaforme attuali addebitano fino al 20%, distruggendo i margini.",
      compliance: "Scarsa Conformità",
      complianceDesc: "L'IVA transfrontaliera e le leggi UE vengono ignorate.",
      trust: "Scarsa Fiducia",
      trustDesc: "Profili falsi e abbinamenti scadenti creano enormi attriti."
    },
    solution: {
      title: "La Soluzione",
      aiMatch: "Abbinamento con AI",
      aiMatchDesc: "Trova il talento esatto di cui hai bisogno in pochi minuti.",
      escrow: "Pagamenti Protetti",
      escrowDesc: "Protezione in stile escrow per la tranquillità di entrambe le parti.",
      invoicing: "IVA e Fatturazione",
      invoicingDesc: "Conformità UE automatizzata e fatturazione senza interruzioni."
    },
    footer: {
      product: "Prodotto",
      businessPlan: "Business Plan",
      mvp: "MVP",
      contact: "Contatto (Segnaposto)",
      legal: "Disclaimer (Solo prototipo. Progettato per la conformità UE.)",
    }
  },
  pt: {
    nav: {
      businessPlan: "Plano de Negócios",
      tryMvp: "Testar MVP",
      login: "Entrar",
    },
    hero: {
      headline: "A Plataforma Freelance Justa da Europa",
      subheadline: "Contrate freelancers europeus de confiança com menos atrito, pagamentos mais seguros e conformidade.",
      ctaMvp: "Testar o MVP",
      ctaPlan: "Ver Plano de Negócios",
    },
    problem: {
      title: "O Problema",
      highFees: "Taxas Altas",
      highFeesDesc: "As plataformas atuais cobram até 20%, destruindo as margens.",
      compliance: "Fraca Conformidade",
      complianceDesc: "O IVA transfronteiriço e as leis da UE são ignorados.",
      trust: "Baixa Confiança",
      trustDesc: "Perfis falsos e correspondência fraca criam enormes atritos."
    },
    solution: {
      title: "A Solução",
      aiMatch: "Correspondência com IA",
      aiMatchDesc: "Encontre o talento exato de que precisa em minutos.",
      escrow: "Pagamentos Protegidos",
      escrowDesc: "Proteção estilo escrow para a tranquilidade de ambas as partes.",
      invoicing: "IVA e Faturação",
      invoicingDesc: "Conformidade automatizada na UE e faturação sem interrupções."
    },
    footer: {
      product: "Produto",
      businessPlan: "Plano de Negócios",
      mvp: "MVP",
      contact: "Contato (Espaço reservado)",
      legal: "Aviso Legal (Apenas protótipo. Projetado para conformidade com a UE.)",
    }
  }
};

export type Language = 'en' | 'it' | 'pt';
export type Dictionary = typeof dictionaries.en;
