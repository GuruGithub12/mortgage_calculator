import { useState } from 'react';
import LoanForm from './LoanForm';
import LoanSummary from './LoanSummary';
import AmortizationSchedule from './AmortizationSchedule';
import { calculateEMI, generateAmortizationSchedule } from '../utils/loanCalculations';
import type { LoanInputs, AmortizationEntry } from '../types/loan';

export default function LoanCalculator() {
  const [loanData, setLoanData] = useState<LoanInputs | null>(null);
  const [schedule, setSchedule] = useState<AmortizationEntry[]>([]);
  const [emi, setEmi] = useState<number>(0);

  const handleCalculate = (inputs: LoanInputs) => {
    const calculatedEMI = calculateEMI(
      inputs.principal,
      inputs.annualInterestRate,
      inputs.tenureYears
    );
    
    const amortizationSchedule = generateAmortizationSchedule(
      inputs.principal,
      inputs.annualInterestRate,
      inputs.tenureYears,
      calculatedEMI
    );

    setLoanData(inputs);
    setEmi(calculatedEMI);
    setSchedule(amortizationSchedule);
  };

  const handleReset = () => {
    setLoanData(null);
    setSchedule([]);
    setEmi(0);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
          Home Loan Calculator
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Plan your mortgage with precision and clarity
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-6 md:p-10">
            <LoanForm onCalculate={handleCalculate} onReset={handleReset} hasResults={!!loanData} />
            
            {loanData && (
              <>
                <LoanSummary 
                  loanData={loanData} 
                  emi={emi} 
                  schedule={schedule}
                />
                
                <div className="mt-10">
                  <AmortizationSchedule schedule={schedule} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
