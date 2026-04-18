import { useState } from 'react';
import type { AmortizationEntry } from '../types/loan';
import { formatCurrency, getMonthName } from '../utils/formatting';

interface AmortizationScheduleProps {
  schedule: AmortizationEntry[];
}

interface YearlyData {
  year: number;
  totalPrincipal: number;
  totalInterest: number;
  startMonth: number;
  endMonth: number;
  months: AmortizationEntry[];
}

export default function AmortizationSchedule({ schedule }: AmortizationScheduleProps) {
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const exportToCSV = () => {
    const headers = ['Month', 'Month Name', 'EMI', 'Principal', 'Interest', 'Balance'];
    const rows = schedule.map((entry) => [
      entry.month,
      getMonthName(entry.month),
      entry.emi.toFixed(2),
      entry.principal.toFixed(2),
      entry.interest.toFixed(2),
      entry.balance.toFixed(2),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-amortization-schedule.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Group schedule by year
  const yearlyData: YearlyData[] = [];
  let currentYear: YearlyData | null = null;

  schedule.forEach((entry) => {
    const yearIndex = Math.floor((entry.month - 1) / 12);
    
    if (!currentYear || currentYear.year !== yearIndex + 1) {
      currentYear = {
        year: yearIndex + 1,
        totalPrincipal: 0,
        totalInterest: 0,
        startMonth: entry.month,
        endMonth: entry.month,
        months: [],
      };
      yearlyData.push(currentYear);
    }

    currentYear.totalPrincipal += entry.principal;
    currentYear.totalInterest += entry.interest;
    currentYear.endMonth = entry.month;
    currentYear.months.push(entry);
  });

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl font-semibold text-white flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/50">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          Amortization Schedule
        </h2>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setViewMode('yearly')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              viewMode === 'yearly'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              viewMode === 'monthly'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={exportToCSV}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/50 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {viewMode === 'yearly' ? (
        <div className="space-y-3">
          {yearlyData.map((yearData) => (
            <div key={yearData.year} className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
              <button
                onClick={() => toggleYear(yearData.year)}
                className="w-full px-6 py-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-purple-400 transition-transform duration-300 ${expandedYears.has(yearData.year) ? 'rotate-90' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="font-bold text-white text-lg">
                    Year {yearData.year}
                  </span>
                  <span className="text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
                    {getMonthName(yearData.startMonth)} - {getMonthName(yearData.endMonth)}
                  </span>
                </div>
                <div className="flex gap-8 text-sm">
                  <div className="text-right">
                    <div className="text-gray-400 text-xs mb-1">Principal</div>
                    <div className="font-bold text-cyan-400 text-lg">
                      {formatCurrency(yearData.totalPrincipal)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs mb-1">Interest</div>
                    <div className="font-bold text-rose-400 text-lg">
                      {formatCurrency(yearData.totalInterest)}
                    </div>
                  </div>
                </div>
              </button>

              {expandedYears.has(yearData.year) && (
                <div className="px-6 py-4 bg-black/20">
                  <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Month</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">EMI</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Principal</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Interest</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearData.months.map((entry) => (
                          <tr
                            key={entry.month}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm text-white font-medium">
                              {getMonthName(entry.month)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-300">
                              {formatCurrency(entry.emi)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-cyan-400 font-semibold">
                              {formatCurrency(entry.principal)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-rose-400 font-semibold">
                              {formatCurrency(entry.interest)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right font-bold text-white">
                              {formatCurrency(entry.balance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-black/20">
          <table className="min-w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Month</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">EMI</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Principal</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Interest</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Balance</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Breakdown</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry, index) => (
                <tr
                  key={entry.month}
                  className={`border-b border-white/5 hover:bg-white/10 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {getMonthName(entry.month)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-300">
                    {formatCurrency(entry.emi)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-cyan-400 font-semibold">
                    {formatCurrency(entry.principal)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-rose-400 font-semibold">
                    {formatCurrency(entry.interest)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-white">
                    {formatCurrency(entry.balance)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-white/10">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300 hover:brightness-110"
                        style={{
                          width: `${(entry.principal / entry.emi) * 100}%`,
                        }}
                        title={`Principal: ${formatCurrency(entry.principal)}`}
                      />
                      <div
                        className="bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-300 hover:brightness-110"
                        style={{
                          width: `${(entry.interest / entry.emi) * 100}%`,
                        }}
                        title={`Interest: ${formatCurrency(entry.interest)}`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
