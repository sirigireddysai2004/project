import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  CloudSun, 
  PartyPopper, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { WeatherType, LocalEventType } from '../../types';

export const ScenarioSimulator: React.FC = () => {
  const { 
    weather, 
    setWeather, 
    localEvent, 
    setLocalEvent, 
    setActiveTab, 
    approveTransfer, 
    transfers 
  } = useFreshGuard();

  const handleResetToBaseline = () => {
    setWeather('normal');
    setLocalEvent('none');
  };

  // Check if Hot Weekend or Festival is active
  const isHotWeekend = weather === 'hot-weekend';
  const isCityFestival = localEvent === 'city-festival';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Predictive Decision Engine
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            What-If Scenario Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Simulate real-time external shocks (temperature spikes, monsoon rain, sports tournaments, city festivals) and witness multi-agent re-optimization across all store nodes.
          </p>
        </div>

        <button
          onClick={handleResetToBaseline}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Simulator Control Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario 1: Weather Factor */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Scenario 1 — Environmental Weather</h2>
              <p className="text-[11px] text-slate-400">Micro-climate and temperature variations</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-2">
              Select Regional Weather Condition:
            </label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value as WeatherType)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
            >
              <option value="normal">Normal Weather (Hyderabad 31°C · Baseline)</option>
              <option value="hot-weekend">Hot Weekend (Heatwave 38°C · Spoilage Accel)</option>
              <option value="heavy-rain">Heavy Rain / Monsoon (Footfall -35% · Delivery Delay)</option>
              <option value="cold-wave">Cold Wave (16°C · Hot Food Demand)</option>
            </select>
          </div>

          {/* Real-time Impact Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
            <span className="font-semibold text-slate-300 block text-[11px] uppercase tracking-wider">
              Simulated Demand Shift:
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <div className="flex items-center justify-between">
                <span>Bananas Demand:</span>
                <span className={`font-mono font-bold ${isHotWeekend ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isHotWeekend ? '↑ +28%' : 'Baseline (0%)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cold Beverages:</span>
                <span className={`font-mono font-bold ${isHotWeekend ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isHotWeekend ? '↑ +42%' : 'Baseline (0%)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ice Cream:</span>
                <span className={`font-mono font-bold ${isHotWeekend ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isHotWeekend ? '↑ +37%' : 'Baseline (0%)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Leafy Greens Decay:</span>
                <span className={`font-mono font-bold ${isHotWeekend ? 'text-rose-400' : 'text-slate-300'}`}>
                  {isHotWeekend ? '1.8x Faster' : 'Standard'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario 2: Local Event Factor */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <PartyPopper className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Scenario 2 — Hyperlocal Event & Footfall</h2>
              <p className="text-[11px] text-slate-400">Festivals, sporting events, and community crowds</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-2">
              Select Regional Footfall Event:
            </label>
            <select
              value={localEvent}
              onChange={(e) => setLocalEvent(e.target.value as LocalEventType)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
            >
              <option value="none">No Event (Standard Footfall)</option>
              <option value="city-festival">City Festival (Hyderabad Central & North Footfall Surge)</option>
              <option value="cricket-match">Cricket Match (Uppal Stadium / East Store Snacks)</option>
              <option value="college-fest">College Festival (Ready-to-eat & beverages)</option>
              <option value="concert">Weekend Music Concert (Evening Grab & Go)</option>
              <option value="weekend-market">Weekend Organic Farmers Market</option>
            </select>
          </div>

          {/* Real-time Event Impact */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
            <span className="font-semibold text-slate-300 block text-[11px] uppercase tracking-wider">
              Simulated Event Uplift:
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <div className="flex items-center justify-between">
                <span>Fresh Beverages:</span>
                <span className={`font-mono font-bold ${isCityFestival ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isCityFestival ? '↑ +35%' : 'Baseline'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Packaged Snacks:</span>
                <span className={`font-mono font-bold ${isCityFestival ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isCityFestival ? '↑ +41%' : 'Baseline'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Fresh Milk:</span>
                <span className={`font-mono font-bold ${isCityFestival ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isCityFestival ? '↑ +18%' : 'Baseline'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Artisan Bread:</span>
                <span className={`font-mono font-bold ${isCityFestival ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isCityFestival ? '↑ +23%' : 'Baseline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before vs After Comparative Impact Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border-2 border-emerald-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Live Comparative Recalculation
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Impact Comparison: Bananas (Cavendish Fresh)
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
            Active Parameters: {weather} + {localEvent}
          </span>
        </div>

        {/* Before vs After Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Before Scenario (Baseline)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-slate-300 tabular-nums">25</span>
              <span className="text-xs text-slate-400">units/day demand</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Store A (Central) expected surplus: 45 units · Store B (North) stockout risk: Normal
            </p>
          </div>

          {/* After */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
            <span className="text-xs text-emerald-400 font-semibold uppercase">
              After {isHotWeekend ? 'Hot Weekend' : weather} Simulation
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                {isHotWeekend ? '32' : '25'}
              </span>
              <span className="text-xs text-emerald-300">units/day demand ({isHotWeekend ? '+28%' : 'normal'})</span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Store B (North) faces imminent stockout · Store A (Central) holds excess buffer.
            </p>
          </div>
        </div>

        {/* Dynamic AI Recommendation Callout */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Autonomous AI Rebalancing Recommendation:
              </span>
              <p className="text-sm font-semibold text-emerald-300 mt-1">
                «AI detected increased demand and recommends moving 20 additional banana units to Store B (Hyderabad North).»
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('transfers')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 shadow-lg shadow-emerald-950/40 transition-colors cursor-pointer"
          >
            <span>Execute Smart Transfer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
