import React, { useState } from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  Bot, 
  TrendingUp, 
  AlertTriangle, 
  Tag, 
  ArrowLeftRight, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export const AIAgentsView: React.FC = () => {
  const { agents, isAnalyzing, runAIAnalysis, setActiveTab } = useFreshGuard();
  const [selectedDiscountTest, setSelectedDiscountTest] = useState<number>(30);

  // Markdown elasticity simulation table for Agent 3
  const markdownScenarios = [
    { percent: 10, label: 'Insufficient', sellThrough: 48, revenue: 1680, wasteUnits: 38, evaluation: 'Leaves 38 units to spoil; discount too weak' },
    { percent: 20, label: 'Moderate', sellThrough: 72, revenue: 2520, wasteUnits: 20, evaluation: 'Leaves 20 units unsold past expiration window' },
    { percent: 30, label: 'Optimal', sellThrough: 91, revenue: 2940, wasteUnits: 6, evaluation: 'Mathematically maximizes revenue & 91% clearance' },
    { percent: 40, label: 'Excessive Loss', sellThrough: 96, revenue: 2352, wasteUnits: 3, evaluation: 'Clears stock but sacrifices ₹588 in unnecessary margin' },
  ];

  const agentIcons = [TrendingUp, AlertTriangle, Tag, ArrowLeftRight, Cpu];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Autonomous Operational Swarm
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Multi-Agent AI Architecture
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Five specialized autonomous agents continuously negotiate demand, shelf life degradation, inter-store logistics, and price elasticity to prevent food waste.
          </p>
        </div>

        <button
          onClick={runAIAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isAnalyzing ? 'Synchronizing Agents...' : 'Trigger Swarm Sync'}</span>
        </button>
      </div>

      {/* Agents Grid (5 Intelligent Agents) */}
      <div className="space-y-6">
        {/* Agent 1 — Demand Forecast Agent */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-blue-400 font-bold uppercase">Agent 01 · DFA-801</span>
                <h3 className="text-base font-bold text-white">Demand Forecast Agent</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">Confidence: <span className="text-emerald-400 font-bold">94%</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Purpose:</span>
              <p className="text-slate-200 leading-relaxed">
                Predict future product demand across store nodes before inventory commitments are finalized.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Continuous Inputs:</span>
              <ul className="text-slate-400 space-y-0.5">
                <li>• Historical sales by hour & day</li>
                <li>• Weather feeds (temperature, rain)</li>
                <li>• Hyperlocal events & festivals</li>
                <li>• Regional seasonal patterns</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Operational Output:</span>
              <p className="text-emerald-300 leading-relaxed font-mono">
                SKU-level daily demand forecast with upper and lower 95% confidence intervals.
              </p>
            </div>
          </div>
        </div>

        {/* Agent 2 — Spoilage Prediction Agent */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-rose-400 font-bold uppercase">Agent 02 · SPA-402</span>
                <h3 className="text-base font-bold text-white">Spoilage Prediction Agent</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">Accuracy: <span className="text-emerald-400 font-bold">91%</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Purpose:</span>
              <p className="text-slate-200 leading-relaxed">
                Identify products likely to expire before being sold under current sales velocity.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Inputs:</span>
              <ul className="text-slate-400 space-y-0.5">
                <li>• Real-time POS shelf inventory</li>
                <li>• Batch expiry date & shelf life</li>
                <li>• Ambient temperature sensors</li>
                <li>• Real-time sales velocity</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
              <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Live Output Example:</span>
              <p className="text-rose-200 leading-relaxed">
                «Bananas have an 82% probability of becoming waste within 48 hours at Hyderabad Central (46–58 units unsold).»
              </p>
            </div>
          </div>
        </div>

        {/* Agent 3 — Markdown Optimization Agent (With Interactive Elasticity Table!) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Agent 03 · MOA-205</span>
                <h3 className="text-base font-bold text-white">Markdown Optimization Agent</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">Elasticity Accuracy: <span className="text-emerald-400 font-bold">93%</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="text-xs text-slate-300">
            <p>
              <strong className="text-white">Core Objective: </strong>
              Determine the optimal discount percentage before expiry without giving away unnecessary profit margin.
            </p>
          </div>

          {/* Interactive Discount Comparison Table */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">
              Simulated Bananas Elasticity Curve (80 units · 2 days remaining):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {markdownScenarios.map((sc) => {
                const isOptimal = sc.percent === 30;
                return (
                  <div
                    key={sc.percent}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isOptimal
                        ? 'bg-emerald-950/25 border-emerald-500 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-extrabold text-lg text-white">{sc.percent}% Off</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isOptimal ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {sc.label}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-[11px] text-slate-400">
                        <div className="flex justify-between">
                          <span>Sell-Through:</span>
                          <span className="font-mono text-white font-semibold">{sc.sellThrough}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="font-mono text-emerald-400 font-semibold">₹{sc.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unsold Waste:</span>
                          <span className="font-mono text-rose-400 font-semibold">{sc.wasteUnits} units</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 leading-snug">
                      {sc.evaluation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
              <span>Recommendation Result: <strong className="text-white">30% Markdown</strong> is mathematically optimal.</span>
              <span className="font-mono text-[11px] text-emerald-400">Yield: +₹2,940 recovered</span>
            </div>
          </div>
        </div>

        {/* Agent 4 — Inventory Transfer Agent */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-purple-400 font-bold uppercase">Agent 04 · ITA-603</span>
                <h3 className="text-base font-bold text-white">Inventory Transfer Agent</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">Routing Score: <span className="text-emerald-400 font-bold">96%</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Store A (Central):</span>
              <p className="text-white font-bold">Bananas: 120 units</p>
              <p className="text-slate-400">Demand: 20/day · <span className="text-amber-400 font-semibold">Excess: 45 units</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Store B (North):</span>
              <p className="text-white font-bold">Bananas: 35 units</p>
              <p className="text-slate-400">Demand: 42/day · <span className="text-rose-400 font-semibold">Shortage: 49 units</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">Recommendation:</span>
              <p className="text-white font-bold">Transfer 40 units from Store A → Store B</p>
              <p className="text-slate-300 text-[11px]">
                Waste avoided: 38 units · Stockout prevented: 29 units · Revenue: ₹4,200
              </p>
            </div>
          </div>
        </div>

        {/* Agent 5 — Inventory Optimization Agent */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">Agent 05 · IOA-909</span>
                <h3 className="text-base font-bold text-white">Inventory Optimization Agent (Executive Orchestrator)</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">Consensus Rank: <span className="text-emerald-400 font-bold">95%</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">Purpose: </strong>
              Synthesizes signals from all upstream agents to assign the highest-ROI operational action across the chain:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-emerald-400 block">Reorder</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">High velocity safety</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-amber-400 block">Reduce Order</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Avoid grower surplus</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-rose-400 block">Markdown</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Flash 24h clearance</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-purple-400 block">Transfer</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Inter-store balance</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-slate-300 block">Hold</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Preserve full margin</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-blue-400 block">Promote</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Bundle cross-sell</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
