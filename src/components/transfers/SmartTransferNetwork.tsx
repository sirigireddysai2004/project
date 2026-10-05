import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  ArrowRight, 
  ArrowLeftRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Truck, 
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const SmartTransferNetwork: React.FC = () => {
  const { 
    transfers, 
    approveTransfer, 
    rejectTransfer, 
    stores 
  } = useFreshGuard();

  const heroTransfer = transfers[0]; // Banana transfer

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Inter-Store Logistics Intelligence
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Smart Transfer Network
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Autonomous multi-node inventory rebalancing. Transfers stock from stores with oversupply to stores with impending stockouts before shelf degradation occurs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>Intra-City Van Transit: 45–60 min avg</span>
        </div>
      </div>

      {/* Hero Visual Flow Card (Hyderabad Central -> Hyderabad North Bananas) */}
      {heroTransfer && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border-2 border-emerald-500/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Priority Inter-Store Route Recommendation
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {heroTransfer.productName} Rebalancing Flow
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
              heroTransfer.status === 'approved' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {heroTransfer.status === 'approved' ? 'Transfer Dispatched' : 'Awaiting Approval'}
            </span>
          </div>

          {/* Visual Flow diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            {/* Store A - Source */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Store A (Source)
                </span>
                <span className="text-[11px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                  Overstock
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{heroTransfer.fromStoreName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Banjara Hills Flagship</p>
              </div>

              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Current Stock</span>
                  <p className="font-mono font-bold text-white text-base mt-0.5">
                    {heroTransfer.status === 'approved' ? heroTransfer.fromStock - heroTransfer.transferUnits : heroTransfer.fromStock} units
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Daily Sales</span>
                  <p className="font-mono text-slate-300 text-sm mt-0.5">{heroTransfer.fromDemand} units/day</p>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Post-Transfer Status:</span>
                <span className="text-emerald-400 font-semibold">Healthy (100%)</span>
              </div>
            </div>

            {/* Transfer Action Connector */}
            <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Truck className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  AI Recommendation
                </span>
                <p className="text-xl font-extrabold font-mono text-white">
                  Transfer {heroTransfer.transferUnits} Units
                </p>
                <span className="text-[11px] text-slate-400">Via Dedicated Intra-City EV Van</span>
              </div>
            </div>

            {/* Store B - Destination */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Store B (Destination)
                </span>
                <span className="text-[11px] font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10">
                  Stockout Risk
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{heroTransfer.toStoreName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Kompally High-Street</p>
              </div>

              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Current Stock</span>
                  <p className="font-mono font-bold text-rose-400 text-base mt-0.5">
                    {heroTransfer.status === 'approved' ? heroTransfer.toStock + heroTransfer.transferUnits : heroTransfer.toStock} units
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Daily Sales</span>
                  <p className="font-mono text-white text-sm mt-0.5">{heroTransfer.toDemand} units/day</p>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Post-Transfer Status:</span>
                <span className="text-emerald-400 font-semibold">Healthy (100%)</span>
              </div>
            </div>
          </div>

          {/* Rationale & Action */}
          <div className="p-4 rounded-xl bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
            <div className="text-xs space-y-1">
              <span className="font-semibold text-emerald-400">Expected Rebalancing Impact:</span>
              <p className="text-slate-300">
                Averts <span className="font-mono font-bold text-white">{heroTransfer.wasteAvoidedUnits} units</span> of spoilage in Central · Eliminates <span className="font-mono font-bold text-white">{heroTransfer.stockoutRiskReducedPercent}%</span> stockout probability in North · Protects <span className="font-mono font-bold text-emerald-400">₹{heroTransfer.revenueProtected.toLocaleString('en-IN')}</span> revenue.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {heroTransfer.status === 'pending' ? (
                <>
                  <button
                    onClick={() => rejectTransfer(heroTransfer.id)}
                    className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => approveTransfer(heroTransfer.id)}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer ring-2 ring-emerald-500/40"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Transfer</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transfer Approved & Manifest Issued</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Additional Transfer Opportunities Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Active Store Redistribution Queue
        </h3>

        <div className="divide-y divide-slate-800">
          {transfers.map((t) => (
            <div key={t.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{t.productName}</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono text-emerald-400 font-semibold">{t.transferUnits} units</span>
                </div>
                <p className="text-slate-400">
                  From <span className="text-slate-200 font-medium">{t.fromStoreName}</span> → To <span className="text-slate-200 font-medium">{t.toStoreName}</span>
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">{t.explanation}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-slate-400 text-[11px]">Protected Value</span>
                  <p className="font-mono font-bold text-emerald-400 text-sm">
                    ₹{t.revenueProtected.toLocaleString('en-IN')}
                  </p>
                </div>

                {t.status === 'pending' ? (
                  <button
                    onClick={() => approveTransfer(t.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 rounded-lg transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Approved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
