import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  Sparkles, 
  Play, 
  MessageSquare, 
  Bell, 
  RotateCw, 
  CloudSun,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onToggleMobileSidebar, 
  isMobileSidebarOpen 
}) => {
  const { 
    isAnalyzing, 
    runAIAnalysis, 
    startDemo, 
    isDemoModeActive, 
    isChatOpen, 
    setIsChatOpen, 
    alerts, 
    weather, 
    localEvent, 
    setActiveTab, 
    activeTab 
  } = useFreshGuard();

  const unreadAlertsCount = alerts.filter(a => !a.resolved).length;

  const weatherLabel = {
    'normal': 'Normal (31°C)',
    'hot-weekend': 'Hot Weekend (38°C)',
    'heavy-rain': 'Monsoon Rain',
    'cold-wave': 'Cold Wave (16°C)'
  }[weather];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle navigation"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <a 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
          className="flex items-center gap-2 group text-decoration-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
            FG
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            FreshGuard AI
          </span>
        </a>
      </div>

      {/* Zone 2: Contextual Status & Active Navigation Indicator */}
      <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
        <button
          onClick={() => setActiveTab('scenarios')}
          className="flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <CloudSun className="w-4 h-4 text-emerald-400" />
          <span>Weather: {weatherLabel}</span>
          {localEvent !== 'none' && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 capitalize">Event: {localEvent.replace('-', ' ')}</span>
            </>
          )}
        </button>

        <span className="text-slate-700">|</span>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>4 Store Nodes Live (Hyderabad Cluster)</span>
        </div>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Run AI Analysis */}
        <button
          onClick={runAIAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-200 transition-all cursor-pointer disabled:opacity-50"
          title="Run continuous optimization analysis across all stores"
        >
          <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isAnalyzing ? 'Analyzing Fleet...' : 'Run AI Analysis'}</span>
        </button>

        {/* Start Demo Button - Priority CTA for Judges */}
        <button
          onClick={startDemo}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            isDemoModeActive 
              ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
          }`}
          title="Launch guided 7-stage hackathon presentation"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isDemoModeActive ? 'Demo Active' : 'Start Live Demo'}</span>
        </button>

        {/* Ask FreshGuard Chat Toggle */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-2 text-xs rounded-lg border transition-colors cursor-pointer relative ${
            isChatOpen 
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
              : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          title="Open Ask FreshGuard AI Assistant"
          aria-label="Open Ask FreshGuard AI Assistant"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="sr-only">Ask FreshGuard</span>
        </button>

        {/* Alerts Bell */}
        <button
          onClick={() => setActiveTab('alerts')}
          className={`p-2 text-xs rounded-lg border transition-colors cursor-pointer relative ${
            activeTab === 'alerts'
              ? 'bg-slate-700 border-slate-600 text-white'
              : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          title="View Alerts"
          aria-label="View Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
              {unreadAlertsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
