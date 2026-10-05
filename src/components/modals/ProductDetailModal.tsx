import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  X, 
  Clock, 
  TrendingDown, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  BarChart2, 
  Calendar
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    applyMarkdown,
    setExplanationModalData 
  } = useFreshGuard();

  if (!selectedProductForDetail) return null;

  const prod = selectedProductForDetail;
  const isHighRisk = prod.expiryRisk === 'High' || prod.expiryRisk === 'Critical';

  // Expiry steps for timeline
  const maxDays = Math.max(3, Math.min(prod.daysRemaining, 5));
  const timelineSteps = Array.from({ length: maxDays + 1 }, (_, i) => {
    if (i === 0) return { label: 'Today', status: 'optimal' };
    if (i === maxDays) return { label: `Day ${i} (Expiry)`, status: 'expired' };
    return { label: `Day ${i}`, status: 'decaying' };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>{prod.category}</span>
              <span>·</span>
              <span>{prod.storeName}</span>
              <span>·</span>
              <span className="font-mono">{prod.sku}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{prod.name}</h2>
          </div>

          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">Current Stock</span>
              <p className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">
                {prod.currentStock} <span className="text-xs font-normal text-slate-400">units</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">Daily Demand</span>
              <p className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">
                {prod.dailyDemand} <span className="text-xs font-normal text-slate-400">units/day</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">Shelf Life Left</span>
              <p className={`text-lg font-bold font-mono mt-0.5 tabular-nums ${prod.daysRemaining <= 2 ? 'text-rose-400' : 'text-slate-200'}`}>
                {prod.daysRemaining} <span className="text-xs font-normal text-slate-400">days</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">AI Risk Score</span>
              <p className={`text-lg font-bold font-mono mt-0.5 tabular-nums ${
                prod.wasteRiskScore > 70 ? 'text-rose-400' : prod.wasteRiskScore > 40 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {prod.wasteRiskScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </p>
            </div>
          </div>

          {/* Expiry Timeline */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Degradation & Expiry Timeline
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{prod.expiryDate}</span>
            </div>

            {/* Timeline Bar */}
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 text-center text-xs">
              {timelineSteps.slice(0, 4).map((step, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-lg border flex flex-col items-center justify-center ${
                    idx === 0 
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
                      : idx === timelineSteps.length - 1 || idx === 3
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-medium">{step.label}</span>
                  <span className="font-mono font-bold mt-1 text-xs">
                    {idx === 0 ? 'Full Quality' : idx === 1 ? 'Prime Fresh' : idx === 2 ? 'Aging (-30%)' : 'Critical Waste'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Decision & Recommendation Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700/80">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Recommended Action
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {prod.recommendedAction}
                </h4>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
                prod.actionApplied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {prod.actionApplied ? 'Active' : 'Action Required'}
              </span>
            </div>

            {/* Expected Impact Summary */}
            {prod.actionDetails && (
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Sell-Through</span>
                  <p className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    {prod.actionDetails.sellThroughProbability || 91}%
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Waste Avoided</span>
                  <p className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    {prod.actionDetails.expectedWasteAvoidedKg || 8.4} kg
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Revenue Recovered</span>
                  <p className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    ₹{(prod.actionDetails.expectedRevenueRecovered || 2940).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            )}

            {/* Factors list */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Commercial Decision Factors:</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                {prod.explanationFactors.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              setExplanationModalData({
                title: `Why recommend: ${prod.recommendedAction}?`,
                subtitle: `${prod.name} at ${prod.storeName}`,
                factors: prod.explanationFactors,
                actionText: prod.recommendedAction,
                onApply: () => {
                  if (prod.actionType === 'markdown') {
                    applyMarkdown(prod.id, prod.actionDetails?.markdownPercent || 30);
                  }
                },
                applied: prod.actionApplied,
              });
            }}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
          >
            View Full "Why?" Explanation
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProductForDetail(null)}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>

            {!prod.actionApplied && prod.actionType === 'markdown' && (
              <button
                onClick={() => {
                  applyMarkdown(prod.id, prod.actionDetails?.markdownPercent || 30);
                  setSelectedProductForDetail(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
              >
                <span>Apply {prod.actionDetails?.markdownPercent || 30}% Markdown</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
