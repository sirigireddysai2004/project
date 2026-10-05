import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { X, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';

export const ExplanationModal: React.FC = () => {
  const { explanationModalData, setExplanationModalData } = useFreshGuard();

  if (!explanationModalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                AI Commercial Rationale
              </p>
              <h3 className="text-lg font-bold text-white mt-0.5 leading-snug">
                {explanationModalData.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setExplanationModalData(null)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Factors */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            FreshGuard continuous multi-agent consensus based on real-time inventory telemetry, decay velocity, and store price elasticity:
          </p>

          <ol className="space-y-3">
            {explanationModalData.factors.map((factor, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed flex-1">{factor}</span>
              </li>
            ))}
          </ol>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
            <div>
              <span className="text-emerald-400 font-medium">Consensus Decision:</span>
              <p className="font-semibold text-white mt-0.5">{explanationModalData.actionText}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px]">Model Confidence</span>
              <p className="font-mono font-bold text-emerald-400 text-sm">94.8%</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-end gap-3">
          <button
            onClick={() => setExplanationModalData(null)}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            Dismiss
          </button>

          <button
            onClick={() => {
              explanationModalData.onApply();
              setExplanationModalData(null);
            }}
            disabled={explanationModalData.applied}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg shadow-lg transition-all cursor-pointer ${
              explanationModalData.applied
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
            }`}
          >
            {explanationModalData.applied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Action Active</span>
              </>
            ) : (
              <>
                <span>Apply Recommendation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
