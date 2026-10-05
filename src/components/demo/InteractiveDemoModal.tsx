import React, { useState, useEffect } from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Volume2
} from 'lucide-react';

export const InteractiveDemoModal: React.FC = () => {
  const { 
    isDemoModeActive, 
    stopDemo, 
    demoStage, 
    setDemoStage, 
    nextDemoStage, 
    prevDemoStage,
    applyMarkdown,
    approveTransfer
  } = useFreshGuard();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && isDemoModeActive) {
      timer = setTimeout(() => {
        if (demoStage < 7) {
          nextDemoStage();
        } else {
          setIsPlaying(false);
        }
      }, 7000); // 7s per stage in auto-play
    }
    return () => clearTimeout(timer);
  }, [isPlaying, isDemoModeActive, demoStage, nextDemoStage]);

  if (!isDemoModeActive) return null;

  const stages = [
    {
      stage: 1,
      title: 'Stage 1 — Normal Conditions (0–15s)',
      presenterQuote: '«FreshGuard AI predicts which grocery products will become waste before they expire.»',
      description: 'Supermarket chain operations baseline across 4 Hyderabad stores. 742 kg waste avoided, ₹2.84L revenue protected.',
      actionHint: 'Review baseline metrics and active AI agents.',
    },
    {
      stage: 2,
      title: 'Stage 2 — Weather Shift: Hot Weekend (15–30s)',
      presenterQuote: '«A heatwave hits Hyderabad. Temperature surges to 38°C.»',
      description: 'AI detects immediate demand shifts: Bananas +28% (25 → 32/day), Cold drinks +42%, leafy greens decay velocity 1.8x faster.',
      actionHint: 'AI recalculates perishables demand automatically.',
    },
    {
      stage: 3,
      title: 'Stage 3 — Local Event: City Festival (30–45s)',
      presenterQuote: '«City Festival announced in central Hyderabad.»',
      description: 'Footfall surge detected: Fresh beverages +35%, Milk +18%, Bakery snacks +41%. Store B demand soars.',
      actionHint: 'Multi-agent system detects sudden demand imbalance.',
    },
    {
      stage: 4,
      title: 'Stage 4 — Risk Identification (45–60s)',
      presenterQuote: '«Store B faces imminent stockout while Store A holds 45 surplus units.»',
      description: 'AI identifies: Banana stockout risk in Store B, Banana surplus in Store A, Vine Tomato soft-rot risk, Milk depletion.',
      actionHint: 'Inspect prioritized risks in Inventory.',
    },
    {
      stage: 5,
      title: 'Stage 5 — Autonomous Agent Consensus (60–75s)',
      presenterQuote: '«Five specialized agents generate coordinated actions in parallel.»',
      description: 'Demand Forecast, Spoilage, Pricing, and Logistics agents finalize non-competing operational solutions.',
      actionHint: 'Observe multi-agent reasoning matrix.',
    },
    {
      stage: 6,
      title: 'Stage 6 — Propose & Execute Actions (75–90s)',
      presenterQuote: '«Approve 40-unit transfer Store A → Store B, plus 30% markdown for remaining bananas.»',
      description: 'Simultaneous logistics rebalancing and dynamic price markdown avoids organic landfill waste.',
      actionHint: 'System executes inter-store dispatch manifest.',
    },
    {
      stage: 7,
      title: 'Stage 7 — Final Business Impact',
      presenterQuote: '«FreshGuard AI doesn’t just predict waste. It decides what to do before waste happens.»',
      description: 'Final measured outcome: 42 kg waste avoided · ₹8,420 revenue protected · 3 stockouts prevented.',
      actionHint: 'Demonstration complete! Full ROI quantified.',
    },
  ];

  const current = stages[demoStage - 1] || stages[0];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[580px] z-50 animate-in slide-in-from-bottom-4 duration-200">
      <div className="bg-slate-900/95 border-2 border-amber-500/60 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden text-xs">
        {/* Header Bar */}
        <div className="p-3.5 bg-gradient-to-r from-amber-950/60 to-slate-900 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300 text-xs uppercase tracking-wider">
              Hackathon Live Demo Presenter Dock
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto Play toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Auto-Playing' : 'Auto-Play'}</span>
            </button>

            <button
              onClick={stopDemo}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close demo mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stage Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-white">{current.title}</h4>
            <span className="font-mono text-amber-400 font-bold text-xs">
              Step {demoStage} of 7
            </span>
          </div>

          {/* Presenter Speech Quote */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-200 flex items-start gap-2.5">
            <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="font-medium italic leading-relaxed text-xs">
              {current.presenterQuote}
            </p>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            {current.description}
          </p>

          {/* Progress Dots */}
          <div className="grid grid-cols-7 gap-1 pt-1">
            {stages.map((st) => (
              <button
                key={st.stage}
                onClick={() => setDemoStage(st.stage)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  st.stage === demoStage 
                    ? 'bg-amber-400 shadow-sm shadow-amber-400' 
                    : st.stage < demoStage 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Jump to ${st.title}`}
              />
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={prevDemoStage}
            disabled={demoStage === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {demoStage === 6 && (
            <button
              onClick={() => {
                applyMarkdown('prod-banana-hyd-01', 30);
                approveTransfer('trn-banana-01');
                nextDemoStage();
              }}
              className="px-3 py-1.5 font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer"
            >
              Approve All Recommendations
            </button>
          )}

          {demoStage < 7 ? (
            <button
              onClick={nextDemoStage}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Next Stage</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={stopDemo}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Finish Demo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
