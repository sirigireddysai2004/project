import React, { useState } from 'react';
import { FreshGuardProvider, useFreshGuard } from './context/FreshGuardContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { InventoryTable } from './components/inventory/InventoryTable';
import { DemandForecastView } from './components/forecast/DemandForecastView';
import { WastePredictionView } from './components/waste/WastePredictionView';
import { RevenueImpactView } from './components/revenue/RevenueImpactView';
import { SmartTransferNetwork } from './components/transfers/SmartTransferNetwork';
import { AIAgentsView } from './components/agents/AIAgentsView';
import { ActionCenter } from './components/actions/ActionCenter';
import { ScenarioSimulator } from './components/scenarios/ScenarioSimulator';
import { AlertCenter } from './components/alerts/AlertCenter';
import { SettingsView } from './components/settings/SettingsView';
import { ExplanationModal } from './components/modals/ExplanationModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { InteractiveDemoModal } from './components/demo/InteractiveDemoModal';
import { AskFreshGuardDrawer } from './components/assistant/AskFreshGuardDrawer';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent: React.FC = () => {
  const { activeTab } = useFreshGuard();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'inventory':
        return <InventoryTable />;
      case 'forecast':
        return <DemandForecastView />;
      case 'waste':
        return <WastePredictionView />;
      case 'revenue':
        return <RevenueImpactView />;
      case 'transfers':
        return <SmartTransferNetwork />;
      case 'agents':
        return <AIAgentsView />;
      case 'actions':
        return <ActionCenter />;
      case 'scenarios':
        return <ScenarioSimulator />;
      case 'alerts':
        return <AlertCenter />;
      case 'settings':
        return <SettingsView />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Top Navbar */}
      <Navbar 
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0 overflow-y-auto">
          <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <ExplanationModal />
      <ProductDetailModal />
      <InteractiveDemoModal />
      <AskFreshGuardDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <FreshGuardProvider>
      <MainAppContent />
    </FreshGuardProvider>
  );
}
