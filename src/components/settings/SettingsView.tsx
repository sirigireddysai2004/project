import React, { useState } from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { Settings, ShieldCheck, Sliders, Bell, Store, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { stores, showToast } = useFreshGuard();

  const [autoApproveTransfers, setAutoApproveTransfers] = useState(false);
  const [markdownThresholdDays, setMarkdownThresholdDays] = useState(2);
  const [maxMarkdownPercent, setMaxMarkdownPercent] = useState(40);
  const [coldChainAlerts, setColdChainAlerts] = useState(true);

  const handleSave = () => {
    showToast('Configuration Saved', 'Multi-agent thresholds and store parameters updated.', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          System Configuration
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
          Platform & Optimization Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Adjust multi-agent sensitivity, human-in-the-loop approval thresholds, and automated markdown constraints.
        </p>
      </div>

      <div className="space-y-6 text-xs">
        {/* Policy & Automation Controls */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Autonomous Agent Execution Policies</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Automate Inter-Store Transfers Under 50 Units</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Allows the Logistics Agent to dispatch intra-city van transfers without manual manager signature.
                </p>
              </div>
              <button
                onClick={() => setAutoApproveTransfers(!autoApproveTransfers)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  autoApproveTransfers ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  autoApproveTransfers ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <p className="font-semibold text-white">Cold-Chain Environmental Sensors Integration</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Accelerate decay prediction curves when display chiller temperature exceeds 4°C.
                </p>
              </div>
              <button
                onClick={() => setColdChainAlerts(!coldChainAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  coldChainAlerts ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  coldChainAlerts ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <p className="font-semibold text-white">Markdown Initiation Window</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Trigger dynamic pricing when remaining shelf life drops to or below:
                </p>
              </div>
              <select
                value={markdownThresholdDays}
                onChange={(e) => setMarkdownThresholdDays(Number(e.target.value))}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              >
                <option value={1}>1 Day Remaining</option>
                <option value={2}>2 Days Remaining (Recommended)</option>
                <option value={3}>3 Days Remaining</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <p className="font-semibold text-white">Maximum Allowable Markdown Cap</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Hard ceiling on price discounts recommended by the Pricing Optimization Agent.
                </p>
              </div>
              <select
                value={maxMarkdownPercent}
                onChange={(e) => setMaxMarkdownPercent(Number(e.target.value))}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              >
                <option value={30}>30% Cap</option>
                <option value={40}>40% Cap (Optimal)</option>
                <option value={50}>50% Cap</option>
              </select>
            </div>
          </div>
        </div>

        {/* Connected Retail Stores */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Store className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Registered Supermarket Store Nodes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stores.map((s) => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{s.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{s.area} · <span className="font-mono">{s.activeSKUs} SKUs</span></p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                  Online
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
