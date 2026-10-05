import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  BadgePercent, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  ArrowUpRight, 
  Coins, 
  DollarSign,
  PieChart
} from 'lucide-react';

export const RevenueImpactView: React.FC = () => {
  const { revenueSavedInr, wasteAvoidedKg } = useFreshGuard();

  // Financial impact figures
  const withoutAIWaste = 480000; // ₹4.8L
  const withAIWaste = 310000; // ₹3.1L
  const monthlySavings = withoutAIWaste - withAIWaste; // ₹1.7L (35.4% reduction)

  // Breakdown items
  const financialBreakdown = [
    { title: 'Revenue Recovered (Dynamic Markdown Clearance)', value: '₹1,42,800', share: '46%', positive: true },
    { title: 'Waste Disposal & Landfill Fees Avoided', value: '₹42,500', share: '14%', positive: true },
    { title: 'Stockout Revenue Protected (Inter-Store Transfers)', value: '₹98,700', share: '32%', positive: true },
    { title: 'Discount Loss Incurred (Cost of Markdowns)', value: '-₹24,000', share: '-8%', positive: false },
  ];

  const netMonthlyBenefit = 142800 + 42500 + 98700 - 24000; // ₹2,60,000 net monthly commercial gain

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Financial & Margin Intelligence
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
          Revenue Impact & ROI Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Quantified bottom-line economic returns delivered by FreshGuard AI across the 4-store supermarket cluster.
        </p>
      </div>

      {/* Top Comparison Card: Without AI vs With FreshGuard AI */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Monthly Waste Reduction Performance
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
              ₹1.7 Lakhs Projected Monthly Savings
            </h2>
          </div>
          <span className="text-xs px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
            35.4% Net Waste Cut
          </span>
        </div>

        {/* Side by side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Without AI */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">Without AI (Legacy Operations)</span>
            <p className="text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
              ₹4.8L <span className="text-xs font-normal text-slate-400">/ month</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard static markdowns, reactive end-of-day throwing, no inter-store logistics coordination.
            </p>
          </div>

          {/* With FreshGuard AI */}
          <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase">With FreshGuard AI</span>
            <p className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              ₹3.1L <span className="text-xs font-normal text-emerald-300">/ month</span>
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Continuous multi-agent demand sensing, automated 30% markdown sweet-spot, and proactive transfers.
            </p>
          </div>

          {/* Potential Net Savings */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase">Potential Net Savings</span>
            <p className="text-3xl font-extrabold font-mono text-white tabular-nums">
              ₹1.7L <span className="text-xs font-normal text-slate-400">/ month</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct gross margin preservation directly added to chain EBITDA margin.
            </p>
          </div>
        </div>

        {/* Progress Bar Comparison */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Baseline Waste Liability: ₹4,80,000</span>
            <span className="text-emerald-400 font-bold font-mono">Protected: ₹1,70,000 (35.4%)</span>
          </div>
          <div className="h-3 rounded-full bg-slate-800 overflow-hidden flex">
            <div className="h-full bg-emerald-500" style={{ width: '35.4%' }} />
            <div className="h-full bg-rose-500/80" style={{ width: '64.6%' }} />
          </div>
        </div>
      </div>

      {/* Financial Breakdown Table & Net Benefit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown Items */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Value Creation Breakdown</h3>
          <div className="divide-y divide-slate-800">
            {financialBreakdown.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Share of total impact: {item.share}</p>
                </div>
                <span className={`font-mono font-bold text-sm tabular-nums ${item.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-white text-sm">Net Monthly Commercial Benefit:</span>
            <span className="font-mono font-extrabold text-emerald-400 text-lg tabular-nums">
              +₹{(netMonthlyBenefit).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Operational ROI Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Platform ROI Multiplier</h3>
            
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Calculated Return on Investment:</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-400">14.2x</p>
              <p className="text-[11px] text-slate-400 mt-1">
                For every ₹1 spent on operations & logistics, ₹14.2 in perishable inventory is recovered.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Annualized Net Recovery:</span>
                <span className="font-mono text-white font-bold">₹31.2 Lakhs</span>
              </div>
              <div className="flex justify-between">
                <span>Total Avoided Organic Waste:</span>
                <span className="font-mono text-emerald-400 font-bold">8,900 kg / year</span>
              </div>
              <div className="flex justify-between">
                <span>Avoided Carbon Emissions:</span>
                <span className="font-mono text-white font-bold">22.4 Tonnes CO₂e</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
            FreshGuard aligns grocery profitability directly with zero-waste sustainability metrics.
          </div>
        </div>
      </div>
    </div>
  );
};
