export interface FeeConfig {
  clientFeePercentage: number; // e.g. 15 for 15%
  freelancerFeePercentage: number; // e.g. 5 for 5%
  freelancerLaunchPromoPercentage: number; // 0% for founding freelancers
  proMonthlyPrice: number; // €39/month
  proClientFeePercentage: number; // 5%
  aiBestMatchPrice: number; // €15 per use
  expressHirePrice: number; // €90 per use
}

export const EULANCE_FEE_CONFIG: FeeConfig = {
  clientFeePercentage: 15,
  freelancerFeePercentage: 5,
  freelancerLaunchPromoPercentage: 0,
  proMonthlyPrice: 39,
  proClientFeePercentage: 5,
  aiBestMatchPrice: 15,
  expressHirePrice: 90,
};

export function calculateContractBreakdown(
  contractAmount: number,
  options?: {
    isClientPro?: boolean;
    isFreelancerFounder?: boolean;
  }
) {
  const clientFeeRate = options?.isClientPro
    ? EULANCE_FEE_CONFIG.proClientFeePercentage
    : EULANCE_FEE_CONFIG.clientFeePercentage;

  const freelancerFeeRate = options?.isFreelancerFounder
    ? EULANCE_FEE_CONFIG.freelancerLaunchPromoPercentage
    : EULANCE_FEE_CONFIG.freelancerFeePercentage;

  const clientFee = (contractAmount * clientFeeRate) / 100;
  const clientTotal = contractAmount + clientFee;

  const freelancerFee = (contractAmount * freelancerFeeRate) / 100;
  const freelancerPayout = contractAmount - freelancerFee;

  const eulanceTotalRevenue = clientFee + freelancerFee;

  return {
    contractAmount,
    clientFeeRate,
    clientFee,
    clientTotal,
    freelancerFeeRate,
    freelancerFee,
    freelancerPayout,
    eulanceTotalRevenue,
  };
}
