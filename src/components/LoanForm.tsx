import { useState, FormEvent } from 'react';
import type { LoanInputs } from '../types/loan';

interface LoanFormProps {
  onCalculate: (inputs: LoanInputs) => void;
  onReset: () => void;
  hasResults: boolean;
}

export default function LoanForm({ onCalculate, onReset, hasResults }: LoanFormProps) {
  const [principal, setPrincipal] = useState('500000');
  const [annualInterestRate, setAnnualInterestRate] = useState('7.5');
  const [tenureYears, setTenureYears] = useState('20');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const inputs: LoanInputs = {
      principal: parseFloat(principal),
      annualInterestRate: parseFloat(annualInterestRate),
      tenureYears: parseFloat(tenureYears),
    };

    onCalculate(inputs);
  };

  const handleResetClick = () => {
    setPrincipal('500000');
    setAnnualInterestRate('7.5');
    setTenureYears('20');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Principal Amount */}
        <div className="group">
          <label htmlFor="principal" className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Loan Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">$</span>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 group-hover:border-purple-500/50 text-lg font-medium"
              placeholder="500000"
              required
              min="1000"
              step="1000"
            />
          </div>
          <p className="mt-2 text-xs text-gray-400">Outstanding loan balance</p>
        </div>

        {/* Interest Rate */}
        <div className="group">
          <label htmlFor="interestRate" className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Interest Rate
          </label>
          <div className="relative">
            <input
              type="number"
              id="interestRate"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 group-hover:border-blue-500/50 text-lg font-medium"
              placeholder="7.5"
              required
              min="0.1"
              max="30"
              step="0.1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">%</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">Annual percentage rate</p>
        </div>

        {/* Tenure */}
        <div className="group">
          <label htmlFor="tenure" className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Loan Tenure
          </label>
          <div className="relative">
            <input
              type="number"
              id="tenure"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 group-hover:border-green-500/50 text-lg font-medium"
              placeholder="20"
              required
              min="1"
              max="40"
              step="0.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">yrs</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">Repayment period</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button
          type="submit"
          className="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Calculate EMI
        </button>
        
        {hasResults && (
          <button
            type="button"
            onClick={handleResetClick}
            className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        )}
      </div>
    </form>
  );
}
