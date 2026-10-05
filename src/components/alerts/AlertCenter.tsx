import React, { useState } from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  ShieldAlert,
  Filter
} from 'lucide-react';

export const AlertCenter: React.FC = () => {
  const { alerts, markAlertResolved, setActiveTab, setSelectedProductForDetail, products } = useFreshGuard();
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'active') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />;
      case 'high':
        return <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />;
      case 'medium':
        return <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />;
      case 'success':
      default:
        return <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Operational Notifications
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Operational Alert Stream
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Live telemetry notifications triggered when stockout, decay velocity, or ambient store parameters exceed safety thresholds.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          {(['all', 'active', 'resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer capitalize ${
                filter === tab 
                  ? 'bg-slate-800 text-white shadow border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">All alerts resolved</p>
            <p className="text-xs text-slate-400 mt-1">Zero pending operational flags across the store network.</p>
          </div>
        ) : (
          filteredAlerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 md:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                alt.resolved 
                  ? 'bg-slate-900/50 border-slate-800/60 opacity-70' 
                  : alt.level === 'critical'
                  ? 'bg-slate-900 border-rose-500/40 shadow-lg shadow-rose-950/20'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-1.5">
                  {getAlertIcon(alt.level)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{alt.title}</h3>
                    <span className="text-slate-400 text-xs font-mono">· {alt.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{alt.description}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                {alt.actionLabel && !alt.resolved && (
                  <button
                    onClick={() => {
                      if (alt.actionType === 'navigate-inventory') {
                        setActiveTab('inventory');
                      } else if (alt.actionType === 'approve-transfer') {
                        setActiveTab('transfers');
                      } else if (alt.actionType === 'reduce-order') {
                        setActiveTab('actions');
                      } else {
                        setActiveTab('inventory');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{alt.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {!alt.resolved ? (
                  <button
                    onClick={() => markAlertResolved(alt.id)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
