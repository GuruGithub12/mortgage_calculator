export interface LoanInputs {
  principal: number;
  annualInterestRate: number;
  tenureYears: number;
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  emi: number;
}
