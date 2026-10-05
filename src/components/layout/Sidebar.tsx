import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  BadgePercent, 
  ArrowLeftRight, 
  Bot, 
  Zap, 
  FlaskConical, 
  Bell, 
  Settings,
  Play,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    activeTab, 
    setActiveTab, 
    startDemo, 
    isDemoModeActive, 
    alerts, 
    actionsRecommended,
    lastAnalysisTime 
  } = useFreshGuard();

  const unreadAlerts = alerts.filter(a => !a.resolved).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: '25 SKUs' },
    { id: 'forecast', label: 'Demand Forecast', icon: TrendingUp },
    { id: 'waste', label: 'Waste Risk', icon: AlertTriangle, badgeColor: 'rose' },
    { id: 'revenue', label: 'Revenue Impact', icon: BadgePercent },
    { id: 'transfers', label: 'Smart Transfers', icon: ArrowLeftRight, badge: '3 Ready' },
    { id: 'agents', label: 'AI Agents', icon: Bot, badge: '5 Active' },
    { id: 'actions', label: 'Action Center', icon: Zap, badge: `${actionsRecommended}`, badgeColor: 'amber' },
    { id: 'scenarios', label: 'Scenario Simulator', icon: FlaskConical },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlerts > 0 ? `${unreadAlerts}` : undefined, badgeColor: 'rose' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Quick Demo CTA inside sidebar */}
          <div className="mb-4 px-1">
            <button
              onClick={startDemo}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isDemoModeActive
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isDemoModeActive ? 'Demo Mode Active' : 'Start Demo (90s Presentation)'}</span>
            </button>
          </div>

          <p className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Operations Console
          </p>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left
                    ${isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded text-right tabular-nums ${
                      item.badgeColor === 'amber'
                        ? 'bg-amber-500/15 text-amber-300'
                        : item.badgeColor === 'rose'
                        ? 'bg-rose-500/15 text-rose-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: System Status */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                FreshGuard Core
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            
            <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
              5 autonomous agents syncing retail store models.
            </p>

            <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-400">
              <span>Last analysis:</span>
              <span className="font-mono text-slate-300">{lastAnalysisTime}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
