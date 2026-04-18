import type { AmortizationEntry } from '../types/loan';

/**
 * Calculate the Equated Monthly Instalment (EMI)
 * Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
 * Where:
 * P = Principal loan amount
 * R = Monthly interest rate (annual rate / 12 / 100)
 * N = Number of months (years × 12)
 */
export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): number {
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  if (monthlyRate === 0) {
    // If interest rate is 0, EMI is simply principal divided by number of months
    return principal / numberOfMonths;
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  return emi;
}

/**
 * Generate complete amortization schedule
 * Shows month-by-month breakdown of principal, interest, and remaining balance
 */
export function generateAmortizationSchedule(
  principal: number,
  annualInterestRate: number,
  tenureYears: number,
  emi: number
): AmortizationEntry[] {
  const schedule: AmortizationEntry[] = [];
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;
  
  let remainingBalance = principal;

  for (let month = 1; month <= numberOfMonths; month++) {
    // Interest for current month = remaining balance × monthly rate
    const interestPayment = remainingBalance * monthlyRate;
    
    // Principal payment = EMI - interest
    const principalPayment = emi - interestPayment;
    
    // Reduce balance
    remainingBalance -= principalPayment;

    // Handle floating point precision for last payment
    if (month === numberOfMonths) {
      remainingBalance = 0;
    }

    schedule.push({
      month,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance), // Ensure balance doesn't go negative
      emi,
    });
  }

  return schedule;
}
