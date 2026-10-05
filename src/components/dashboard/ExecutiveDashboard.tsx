import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  TrendingDown, 
  TrendingUp, 
  RotateCw, 
  Sparkles, 
  Play, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeftRight,
  ShieldCheck,
  Zap,
  Package,
  Layers
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { 
    foodWasteKg, 
    revenueSavedInr, 
    wasteAvoidedKg, 
    stockoutRiskCount, 
    expiringSoonCount, 
    actionsRecommended,
    lastAnalysisTime,
    isAnalyzing,
    runAIAnalysis,
    startDemo,
    products,
    applyMarkdown,
    approveTransfer,
    transfers,
    setExplanationModalData,
    setSelectedProductForDetail,
    setActiveTab,
    agents
  } = useFreshGuard();

  // Find the Hero Banana product
  const bananaHero = products.find(p => p.id === 'prod-banana-hyd-01') || products[0];

  // Top urgent perishables for the preview list
  const urgentProducts = products
    .filter(p => !p.actionApplied && (p.expiryRisk === 'Critical' || p.expiryRisk === 'High'))
    .slice(0, 4);

  // Top pending transfer
  const pendingTransfer = transfers.find(t => t.status === 'pending');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Dashboard Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 md:p-8">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Zero-Waste Grocery Intelligence
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight text-balance">
              Turn Food Waste Into Revenue
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              FreshGuard AI continuously predicts what will sell, what will spoil, and orchestrates the exact markdown or transfer before food becomes landfill waste.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={runAIAnalysis}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing Fleet...' : 'Run AI Analysis'}</span>
              </button>

              <button
                onClick={startDemo}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>Start Demo (90s Pitch)</span>
              </button>
            </div>
          </div>

          {/* Today's AI Impact Snapshot */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 shrink-0 w-full lg:w-80 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800/80">
              <span className="font-semibold text-slate-200">Today's AI Impact</span>
              <span className="text-[11px] font-mono text-emerald-400">Live Active</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-left">
              <div>
                <span className="text-[11px] text-slate-400">Waste Avoided</span>
                <p className="text-lg font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
                  {wasteAvoidedKg} <span className="text-xs font-normal text-slate-400">kg</span>
                </p>
                <span className="text-[10px] text-emerald-500 font-mono">↑ 31%</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400">Revenue Saved</span>
                <p className="text-lg font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
                  ₹{(revenueSavedInr / 100000).toFixed(2)}L
                </p>
                <span className="text-[10px] text-emerald-500 font-mono">↑ 18.4%</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400">Actions</span>
                <p className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">
                  {actionsRecommended}
                </p>
                <span className="text-[10px] text-slate-400">recommended</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Indicators (5 KPI cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Food Waste</span>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-white tabular-nums">
              {foodWasteKg.toLocaleString()} <span className="text-xs font-normal text-slate-400">kg</span>
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
              <TrendingDown className="w-3.5 h-3.5" />
              <span className="font-mono">↓ 23.6%</span>
              <span className="text-slate-400 text-[11px]">vs last month</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Revenue Saved</span>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              ₹{(revenueSavedInr / 100000).toFixed(2)}L
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-mono">↑ 18.4%</span>
              <span className="text-slate-400 text-[11px]">recovered</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Waste Avoided</span>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {wasteAvoidedKg} <span className="text-xs font-normal text-slate-400">kg</span>
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-mono">↑ 31%</span>
              <span className="text-slate-400 text-[11px]">efficiency</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Stockout Risk</span>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-white tabular-nums">
              {stockoutRiskCount} <span className="text-xs font-normal text-slate-400">products</span>
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
              <TrendingDown className="w-3.5 h-3.5" />
              <span className="font-mono">↓ 12%</span>
              <span className="text-slate-400 text-[11px]">rebalanced</span>
            </div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between col-span-2 md:col-span-1">
          <span className="text-xs font-medium text-slate-400">Expiring Soon</span>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-rose-400 tabular-nums">
              {expiringSoonCount} <span className="text-xs font-normal text-slate-400">products</span>
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
              <span>≤ 48 hours shelf life</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live AI Operations Status Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              AI Operations Status
            </h2>
            <span className="text-xs text-slate-400 font-mono">· Last analysis: {lastAnalysisTime}</span>
          </div>

          <button
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Processing Agents...' : 'Run AI Analysis'}</span>
          </button>
        </div>

        {/* 5 Agent Status Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${agent.status === 'processing' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="font-medium text-slate-200 truncate">{agent.name}</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 shrink-0 ml-2">
                {agent.status === 'processing' ? 'Syncing...' : 'Active'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. THE HERO DEMO: BANANAS (Urgent AI Recommendation Card) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border-2 border-amber-500/40 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                CRITICAL SPOILAGE RISK
              </span>
              <span className="text-xs text-slate-400">Hyderabad Central · Store #01</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="banana">🍌</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Bananas (Cavendish Fresh) — Critical Waste Risk
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="font-mono text-white font-semibold">{bananaHero.currentStock} units</span> currently in stock · Estimated shelf life remaining: <span className="font-mono text-rose-400 font-semibold">{bananaHero.daysRemaining} days</span>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-emerald-400">AI Continuous Prediction: </span>
              «46–58 units are likely to remain unsold before expiry at current price point.»
            </div>

            {/* Expected outcome row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-[11px]">Sell-Through Rate</span>
                <p className="font-mono font-bold text-emerald-400 text-base mt-0.5">91%</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-[11px]">Waste Reduction</span>
                <p className="font-mono font-bold text-emerald-400 text-base mt-0.5">42 units</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-[11px]">Revenue Recovered</span>
                <p className="font-mono font-bold text-emerald-400 text-base mt-0.5">₹2,940</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-[11px]">Waste Avoided</span>
                <p className="font-mono font-bold text-emerald-400 text-base mt-0.5">8.4 kg</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-2.5 shrink-0 sm:w-60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Recommended Action:
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center">
              <span className="text-xs text-slate-400">Dynamic Pricing Agent</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5">Apply 30% Markdown</p>
            </div>

            <button
              onClick={() => applyMarkdown(bananaHero.id, 30)}
              disabled={bananaHero.actionApplied}
              className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                bananaHero.actionApplied
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50 ring-2 ring-emerald-500/40'
              }`}
            >
              {bananaHero.actionApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>30% Markdown Active</span>
                </>
              ) : (
                <>
                  <span>Apply Recommendation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={() => {
                setExplanationModalData({
                  title: 'Why is FreshGuard recommending a 30% markdown?',
                  subtitle: 'Bananas (Cavendish Fresh) at Hyderabad Central',
                  factors: bananaHero.explanationFactors,
                  actionText: 'Apply 30% Markdown on 80 Banana Units',
                  onApply: () => applyMarkdown(bananaHero.id, 30),
                  applied: bananaHero.actionApplied,
                });
              }}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              View Explanation (Why?)
            </button>
          </div>
        </div>
      </div>

      {/* 5. The Operational Decision-Support Business Loop */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">
          FreshGuard Closed-Loop Operational Architecture
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block uppercase font-mono">01. Step</span>
            <span className="font-bold text-white mt-1 block">DATA</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">POS, Weather, Shelf</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block uppercase font-mono">02. Step</span>
            <span className="font-bold text-emerald-400 mt-1 block">PREDICTION</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Velocity & Elasticity</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block uppercase font-mono">03. Step</span>
            <span className="font-bold text-rose-400 mt-1 block">RISK</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Spoilage & Stockout</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block uppercase font-mono">04. Step</span>
            <span className="font-bold text-indigo-400 mt-1 block">AI DECISION</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Markdown vs Transfer</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block uppercase font-mono">05. Step</span>
            <span className="font-bold text-amber-400 mt-1 block">ACTION</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Price POS / Dispatch</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block uppercase font-mono">06. Step</span>
            <span className="font-bold text-emerald-400 mt-1 block">IMPACT</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">₹ Saved + 0 Landfill</span>
          </div>
        </div>
      </div>

      {/* 6. Dual Action Section: Critical Perishables + Inter-Store Transfer Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Perishables Table preview */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">Urgent Waste Interventions</h3>
              </div>
              <button
                onClick={() => setActiveTab('inventory')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
              >
                View Full Inventory →
              </button>
            </div>

            <div className="divide-y divide-slate-800/80 mt-2">
              {urgentProducts.map((prod) => (
                <div key={prod.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{prod.name}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      <span>{prod.storeName}</span>
                      <span className="mx-1">·</span>
                      <span className="font-mono text-slate-300">{prod.currentStock} in stock</span>
                      <span className="mx-1">·</span>
                      <span className="font-mono text-rose-400">{prod.daysRemaining}d remaining</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedProductForDetail(prod)}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => {
                        if (prod.actionType === 'markdown') {
                          applyMarkdown(prod.id, prod.actionDetails?.markdownPercent || 25);
                        } else {
                          setSelectedProductForDetail(prod);
                        }
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
                    >
                      {prod.actionApplied ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Transfer Highlight */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Smart Inter-Store Rebalancing</h3>
              </div>
              <button
                onClick={() => setActiveTab('transfers')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
              >
                All Transfers →
              </button>
            </div>

            {pendingTransfer ? (
              <div className="mt-4 space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Product:</span>
                    <span className="font-semibold text-white">{pendingTransfer.productName}</span>
                  </div>

                  {/* Flow graphic */}
                  <div className="mt-3 grid grid-cols-3 items-center text-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-amber-400 font-medium">Store A (Overstock)</span>
                      <p className="font-semibold text-white mt-0.5 truncate">{pendingTransfer.fromStoreName}</p>
                      <p className="text-[11px] font-mono text-slate-400">{pendingTransfer.fromStock} units</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="font-mono text-emerald-400 font-bold text-xs">
                        ↓ {pendingTransfer.transferUnits} units
                      </span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 mt-0.5" />
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-rose-400 font-medium">Store B (Stockout)</span>
                      <p className="font-semibold text-white mt-0.5 truncate">{pendingTransfer.toStoreName}</p>
                      <p className="text-[11px] font-mono text-slate-400">{pendingTransfer.toStock} units</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                    {pendingTransfer.explanation}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs">
                    <span className="text-slate-400">Protected Value: </span>
                    <span className="font-mono font-bold text-emerald-400">
                      ₹{pendingTransfer.revenueProtected.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => approveTransfer(pendingTransfer.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-950/40 transition-colors cursor-pointer"
                  >
                    Approve Transfer
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p>All inter-store redistributions are currently active and balanced.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
