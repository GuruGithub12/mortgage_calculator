import type { LoanInputs, AmortizationEntry } from '../types/loan';
import { formatCurrency } from '../utils/formatting';

interface LoanSummaryProps {
  loanData: LoanInputs;
  emi: number;
  schedule: AmortizationEntry[];
}

export default function LoanSummary({ loanData, emi, schedule }: LoanSummaryProps) {
  const totalPayment = emi * loanData.tenureYears * 12;
  const totalInterest = totalPayment - loanData.principal;
  const firstMonth = schedule[0];

  return (
    <div className="mb-10">
      {/* Monthly EMI - Hero Card */}
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-3xl p-10 mb-8 shadow-2xl shadow-purple-500/30 border border-purple-400/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className="relative">
          <div className="text-sm font-semibold mb-3 text-purple-100 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Monthly EMI Payment
          </div>
          <div className="text-6xl md:text-7xl font-bold text-white mb-2">{formatCurrency(emi)}</div>
          <p className="text-purple-100 text-sm">Fixed monthly payment for {loanData.tenureYears} years</p>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Loan Amount */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Total Loan Amount</div>
              <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform">{formatCurrency(loanData.principal)}</div>
            </div>
            <div className="ml-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Interest */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Total Interest</div>
              <div className="text-3xl font-bold text-orange-400 group-hover:scale-105 transition-transform">{formatCurrency(totalInterest)}</div>
            </div>
            <div className="ml-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Payment */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Total Payment</div>
              <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform">{formatCurrency(totalPayment)}</div>
            </div>
            <div className="ml-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Interest Rate</div>
              <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform">{loanData.annualInterestRate.toFixed(2)}%</div>
            </div>
            <div className="ml-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* First Month Principal */}
        {firstMonth && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">First Month Principal</div>
                <div className="text-3xl font-bold text-cyan-400 group-hover:scale-105 transition-transform">{formatCurrency(firstMonth.principal)}</div>
              </div>
              <div className="ml-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* First Month Interest */}
        {firstMonth && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">First Month Interest</div>
                <div className="text-3xl font-bold text-rose-400 group-hover:scale-105 transition-transform">{formatCurrency(firstMonth.interest)}</div>
              </div>
              <div className="ml-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
