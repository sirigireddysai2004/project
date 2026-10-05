import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  Zap, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  AlertTriangle, 
  TrendingDown, 
  Tag, 
  ArrowLeftRight,
  ShieldAlert
} from 'lucide-react';

export const ActionCenter: React.FC = () => {
  const { 
    products, 
    transfers, 
    applyMarkdown, 
    approveTransfer, 
    rejectTransfer,
    applyOrderAdjustment,
    setExplanationModalData,
    actionsRecommended 
  } = useFreshGuard();

  // 1. Critical Actions
  const bananaHero = products.find(p => p.id === 'prod-banana-hyd-01');
  const breadHero = products.find(p => p.id === 'prod-bread-hyd-03');
  const chickenHero = products.find(p => p.id === 'prod-chicken-hyd-01');

  // 2. High Priority Transfers
  const pendingTransfers = transfers.filter(t => t.status === 'pending');

  // 3. Medium Priority Order Reductions
  const tomatoHero = products.find(p => p.id === 'prod-tomato-hyd-01');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Operational Execution Queue
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            AI Action Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Prioritized multi-agent decision queue. Review, inspect explanations, and execute recommended markdowns, inter-store transfers, and procurement order adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <Zap className="w-4 h-4" />
          <span>{actionsRecommended} Actions Pending Approval</span>
        </div>
      </div>

      {/* Priority Queues */}
      <div className="space-y-6">
        {/* Tier 1: Critical Priority */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h2 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Critical Urgency — Execute Within 4 Hours
            </h2>
          </div>

          <div className="space-y-3">
            {/* Banana Action */}
            {bananaHero && (
              <div className="p-5 rounded-2xl bg-slate-900 border-2 border-rose-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      CRITICAL
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {bananaHero.storeName} · {bananaHero.currentStock} units in stock (2 days left)
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Apply 30% Dynamic Markdown on Bananas (Cavendish Fresh)
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>Expected waste avoided: <strong className="text-emerald-400 font-bold">42 units (8.4 kg)</strong></span>
                    <span>·</span>
                    <span>Expected revenue: <strong className="text-emerald-400 font-bold">₹2,940</strong></span>
                    <span>·</span>
                    <span>Clearance rate: <strong className="text-white font-bold">91%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      setExplanationModalData({
                        title: 'Why is FreshGuard recommending a 30% markdown?',
                        subtitle: `${bananaHero.name} at ${bananaHero.storeName}`,
                        factors: bananaHero.explanationFactors,
                        actionText: 'Apply 30% Markdown on 80 Banana Units',
                        onApply: () => applyMarkdown(bananaHero.id, 30),
                        applied: bananaHero.actionApplied,
                      });
                    }}
                    className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    View Explanation
                  </button>

                  <button
                    onClick={() => applyMarkdown(bananaHero.id, 30)}
                    disabled={bananaHero.actionApplied}
                    className={`px-5 py-2 text-xs font-bold rounded-lg shadow-lg transition-all cursor-pointer ${
                      bananaHero.actionApplied
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                    }`}
                  >
                    {bananaHero.actionApplied ? 'Active' : 'Approve'}
                  </button>
                </div>
              </div>
            )}

            {/* Bread Action */}
            {breadHero && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      CRITICAL
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {breadHero.storeName} · 1 day shelf life remaining
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Flash 40% Evening Markdown on Artisanal White Bread
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>Expected waste avoided: <strong className="text-emerald-400 font-bold">14 kg</strong></span>
                    <span>·</span>
                    <span>Expected revenue: <strong className="text-emerald-400 font-bold">₹945</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      setExplanationModalData({
                        title: 'Why recommend a 40% Flash Evening Markdown?',
                        subtitle: `${breadHero.name} at ${breadHero.storeName}`,
                        factors: breadHero.explanationFactors,
                        actionText: 'Execute 40% Flash Markdown',
                        onApply: () => applyMarkdown(breadHero.id, 40),
                        applied: breadHero.actionApplied,
                      });
                    }}
                    className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    View Explanation
                  </button>

                  <button
                    onClick={() => applyMarkdown(breadHero.id, 40)}
                    disabled={breadHero.actionApplied}
                    className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      breadHero.actionApplied
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {breadHero.actionApplied ? 'Active' : 'Approve'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tier 2: High Priority (Inter-Store Transfers) */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              High Priority — Inter-Store Rebalancing
            </h2>
          </div>

          <div className="space-y-3">
            {pendingTransfers.map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      HIGH PRIORITY
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      From {t.fromStoreName} → To {t.toStoreName}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Transfer {t.transferUnits} Units of {t.productName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>Waste avoided: <strong className="text-emerald-400 font-bold">{t.wasteAvoidedUnits} units</strong></span>
                    <span>·</span>
                    <span>Stockout risk reduced: <strong className="text-emerald-400 font-bold">{t.stockoutRiskReducedPercent}%</strong></span>
                    <span>·</span>
                    <span>Revenue protected: <strong className="text-emerald-400 font-bold">₹{t.revenueProtected.toLocaleString('en-IN')}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => rejectTransfer(t.id)}
                    className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => approveTransfer(t.id)}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Medium Priority (Procurement Adjustments) */}
        {tomatoHero && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Medium Priority — Procurement Order Optimization
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    MEDIUM
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {tomatoHero.storeName} · Grower Purchase Order
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Reduce Tomorrow's Vine Tomato Order by 20 Units
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>Expected waste reduction: <strong className="text-emerald-400 font-bold">20.0 kg</strong></span>
                  <span>·</span>
                  <span>Supplier capital saved: <strong className="text-emerald-400 font-bold">₹960</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    setExplanationModalData({
                      title: "Why trim tomorrow's tomato order by 20 units?",
                      subtitle: `${tomatoHero.name} at ${tomatoHero.storeName}`,
                      factors: tomatoHero.explanationFactors,
                      actionText: 'Trim Tomorrow Procurement by 20 kg',
                      onApply: () => applyOrderAdjustment(tomatoHero.id, -20),
                      applied: tomatoHero.actionApplied,
                    });
                  }}
                  className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  View Explanation
                </button>

                <button
                  onClick={() => applyOrderAdjustment(tomatoHero.id, -20)}
                  disabled={tomatoHero.actionApplied}
                  className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    tomatoHero.actionApplied
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {tomatoHero.actionApplied ? 'Active' : 'Approve'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
