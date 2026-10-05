import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { 
  Product, 
  Store, 
  AIAgent, 
  StoreTransferProposal, 
  AlertItem, 
  WeatherType, 
  LocalEventType 
} from '../types';
import { 
  STORES, 
  INITIAL_PRODUCTS, 
  INITIAL_AGENTS, 
  INITIAL_TRANSFERS, 
  INITIAL_ALERTS 
} from '../data/initialData';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface ExplanationData {
  title: string;
  subtitle: string;
  badge?: string;
  factors: string[];
  actionText: string;
  onApply: () => void;
  applied?: boolean;
}

interface FreshGuardContextType {
  // Navigation & UI
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data
  stores: Store[];
  products: Product[];
  agents: AIAgent[];
  transfers: StoreTransferProposal[];
  alerts: AlertItem[];
  
  // State variables
  weather: WeatherType;
  setWeather: (weather: WeatherType) => void;
  localEvent: LocalEventType;
  setLocalEvent: (event: LocalEventType) => void;
  
  // KPIs
  foodWasteKg: number;
  revenueSavedInr: number;
  wasteAvoidedKg: number;
  stockoutRiskCount: number;
  expiringSoonCount: number;
  actionsRecommended: number;
  
  // Status
  lastAnalysisTime: string;
  isAnalyzing: boolean;
  runAIAnalysis: () => Promise<void>;
  
  // Actions
  applyMarkdown: (productId: string, percent: number) => void;
  approveTransfer: (transferId: string) => void;
  rejectTransfer: (transferId: string) => void;
  applyOrderAdjustment: (productId: string, adjustment: number) => void;
  markAlertResolved: (alertId: string) => void;
  
  // Modals & Drawers
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  explanationModalData: ExplanationData | null;
  setExplanationModalData: (data: ExplanationData | null) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  
  // Demo Mode
  isDemoModeActive: boolean;
  demoStage: number;
  startDemo: () => void;
  stopDemo: () => void;
  nextDemoStage: () => void;
  prevDemoStage: () => void;
  setDemoStage: (stage: number) => void;
  
  // Toast notifications
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const FreshGuardContext = createContext<FreshGuardContextType | undefined>(undefined);

export const FreshGuardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [stores] = useState<Store[]>(STORES);
  const [rawProducts, setRawProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [agents, setAgents] = useState<AIAgent[]>(INITIAL_AGENTS);
  const [transfers, setTransfers] = useState<StoreTransferProposal[]>(INITIAL_TRANSFERS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const [weather, setWeatherState] = useState<WeatherType>('normal');
  const [localEvent, setLocalEventState] = useState<LocalEventType>('none');

  // Dynamic Impact KPIs
  const [avoidedWasteOffset, setAvoidedWasteOffset] = useState<number>(0);
  const [revenueSavedOffset, setRevenueSavedOffset] = useState<number>(0);

  const [lastAnalysisTime, setLastAnalysisTime] = useState<string>('2 minutes ago');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [explanationModalData, setExplanationModalData] = useState<ExplanationData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Demo Mode
  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(false);
  const [demoStage, setDemoStageState] = useState<number>(1);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Compute products dynamically based on weather and event multipliers
  const products = useMemo(() => {
    return rawProducts.map(prod => {
      let multiplier = 1.0;
      
      // Weather factor
      if (weather === 'hot-weekend') {
        multiplier *= prod.weatherSensitivity.hotMultiplier;
      } else if (weather === 'heavy-rain') {
        multiplier *= prod.weatherSensitivity.rainMultiplier;
      } else if (weather === 'cold-wave') {
        multiplier *= prod.weatherSensitivity.coldMultiplier;
      }

      // Event factor
      if (localEvent === 'city-festival' || localEvent === 'college-fest') {
        multiplier *= prod.eventSensitivity.festivalMultiplier;
      } else if (localEvent === 'cricket-match') {
        multiplier *= prod.eventSensitivity.sportsMultiplier;
      } else if (localEvent === 'weekend-market') {
        multiplier *= 1.15;
      }

      // Calculate adjusted daily demand
      const adjustedDemand = Math.round(prod.baseDemand * multiplier);

      // Re-evaluate stockout & spoilage risk based on adjusted velocity and actionApplied
      let expiryRisk = prod.expiryRisk;
      let stockoutRisk = prod.stockoutRisk;
      let wasteScore = prod.wasteRiskScore;

      if (prod.actionApplied) {
        wasteScore = Math.max(12, Math.round(prod.wasteRiskScore * 0.28));
        expiryRisk = wasteScore > 60 ? 'High' : (wasteScore > 35 ? 'Medium' : 'Low');
      } else if (weather === 'hot-weekend' && prod.name.includes('Banana')) {
        // Under Hot Weekend, bananas demand rises 25 -> 32/day
        wasteScore = Math.min(95, prod.wasteRiskScore + 5);
      }

      // Stockout risk for store B
      if (prod.id === 'prod-banana-hyd-02') {
        if (adjustedDemand > prod.currentStock) {
          stockoutRisk = 'Critical';
        } else if (adjustedDemand * 1.5 > prod.currentStock) {
          stockoutRisk = 'High';
        } else {
          stockoutRisk = 'Low';
        }
      }

      return {
        ...prod,
        dailyDemand: adjustedDemand,
        expiryRisk,
        stockoutRisk,
        wasteRiskScore: wasteScore,
      };
    });
  }, [rawProducts, weather, localEvent]);

  // Dynamic KPIs
  const foodWasteKg = 1284;
  const revenueSavedInr = 284000 + revenueSavedOffset;
  const wasteAvoidedKg = 742 + avoidedWasteOffset;
  
  const stockoutRiskCount = useMemo(() => {
    return products.filter(p => p.stockoutRisk === 'High' || p.stockoutRisk === 'Critical').length;
  }, [products]);

  const expiringSoonCount = useMemo(() => {
    return products.filter(p => p.daysRemaining <= 2 && !p.actionApplied).length;
  }, [products]);

  const actionsRecommended = useMemo(() => {
    return products.filter(p => !p.actionApplied && p.recommendedAction !== 'Maintain Current Velocity').length + 
      transfers.filter(t => t.status === 'pending').length;
  }, [products, transfers]);

  // Actions
  const applyMarkdown = useCallback((productId: string, percent: number) => {
    setRawProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const wasteKgAvoided = p.actionDetails?.expectedWasteAvoidedKg || 8.4;
        const revRecovered = p.actionDetails?.expectedRevenueRecovered || 2940;
        
        setAvoidedWasteOffset(curr => curr + wasteKgAvoided);
        setRevenueSavedOffset(curr => curr + revRecovered);

        return {
          ...p,
          currentDiscountPercent: percent,
          actionApplied: true,
          wasteRiskScore: Math.round(p.wasteRiskScore * 0.25),
          expiryRisk: 'Low',
          recommendedAction: `Markdown Applied (${percent}% Off)`,
        };
      }
      return p;
    }));

    showToast(
      'Markdown Applied Successfully',
      `Applied ${percent}% dynamic markdown. Clearance probability surged to 91%.`,
      'success'
    );
  }, [showToast]);

  const approveTransfer = useCallback((transferId: string) => {
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        setAvoidedWasteOffset(curr => curr + Math.round(t.wasteAvoidedUnits * 0.2));
        setRevenueSavedOffset(curr => curr + t.revenueProtected);

        // Adjust stocks in products
        setRawProducts(prodList => prodList.map(prod => {
          if (prod.id === t.productId) {
            return {
              ...prod,
              currentStock: Math.max(0, prod.currentStock - t.transferUnits),
              actionApplied: true,
              recommendedAction: `Dispatched ${t.transferUnits} units to ${t.toStoreName}`,
            };
          }
          if (prod.storeId === t.toStoreId && prod.name.includes(t.productName.split(' ')[0])) {
            return {
              ...prod,
              currentStock: prod.currentStock + t.transferUnits,
              stockoutRisk: 'Low',
              recommendedAction: `Inbound +${t.transferUnits} units confirmed`,
            };
          }
          return prod;
        }));

        return { ...t, status: 'approved' };
      }
      return t;
    }));

    showToast(
      'Smart Transfer Approved',
      'Logistics route scheduled. Inter-store dispatch manifest generated.',
      'success'
    );
  }, [showToast]);

  const rejectTransfer = useCallback((transferId: string) => {
    setTransfers(prev => prev.map(t => t.id === transferId ? { ...t, status: 'rejected' } : t));
    showToast('Transfer Dismissed', 'Inter-store transfer recommendation archived.', 'info');
  }, [showToast]);

  const applyOrderAdjustment = useCallback((productId: string, adjustment: number) => {
    setRawProducts(prev => prev.map(p => {
      if (p.id === productId) {
        setAvoidedWasteOffset(curr => curr + Math.abs(adjustment));
        setRevenueSavedOffset(curr => curr + Math.abs(adjustment) * p.costPrice);
        return {
          ...p,
          actionApplied: true,
          wasteRiskScore: Math.round(p.wasteRiskScore * 0.3),
          expiryRisk: 'Low',
          recommendedAction: `Procurement Adjusted (${adjustment > 0 ? '+' : ''}${adjustment} units)`,
        };
      }
      return p;
    }));
    showToast('Procurement Order Updated', `Supplier EDI order trimmed by ${Math.abs(adjustment)} units for tomorrow.`, 'success');
  }, [showToast]);

  const markAlertResolved = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    showToast('Alert Marked Resolved', 'Operational notification cleared.', 'info');
  }, [showToast]);

  // Weather and Event setters with alert creation
  const setWeather = useCallback((newWeather: WeatherType) => {
    setWeatherState(newWeather);
    if (newWeather === 'hot-weekend') {
      showToast('Weather Scenario: Hot Weekend', 'Demand updated: Bananas +28%, Cold beverages +42%, Ice cream +37%.', 'warning');
      setAlerts(prev => [
        {
          id: `alt-weather-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Hot Weekend Alert: Spoilage velocity accelerated',
          description: 'Temperatures reaching 38°C in Hyderabad. Perishable turnover recalculated across all 4 stores.',
          level: 'high',
          category: 'weather',
          resolved: false,
          actionLabel: 'View Impact',
        },
        ...prev
      ]);
    } else {
      showToast('Weather Adjusted', `External environmental parameter set to ${newWeather}.`, 'info');
    }
  }, [showToast]);

  const setLocalEvent = useCallback((newEvent: LocalEventType) => {
    setLocalEventState(newEvent);
    if (newEvent === 'city-festival') {
      showToast('Local Event: City Festival', 'Footfall surge detected: Fresh beverages +35%, Snacks +41%, Milk +18%.', 'warning');
      setAlerts(prev => [
        {
          id: `alt-event-${Date.now()}`,
          timestamp: 'Just now',
          title: 'City Festival in Hyderabad Central & North',
          description: 'High footfall cluster detected. Fresh dairy and beverage demand increased.',
          level: 'medium',
          category: 'stockout',
          resolved: false,
        },
        ...prev
      ]);
    } else {
      showToast('Event Setting Updated', `Regional event modifier set to ${newEvent}.`, 'info');
    }
  }, [showToast]);

  // Run AI analysis
  const runAIAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    // Update agents to processing
    setAgents(prev => prev.map(a => ({ ...a, status: 'processing' })));

    try {
      // Call server endpoint or simulate
      try {
        await fetch('/api/run-analysis', { method: 'POST' });
      } catch {
        // Fallback smooth simulation
      }

      await new Promise(resolve => setTimeout(resolve, 1400));
      
      setLastAnalysisTime('Just now');
      setAgents(prev => prev.map(a => ({ ...a, status: 'active', latencyMs: Math.floor(Math.random() * 150) + 120 })));
      showToast('AI Analysis Complete', 'Evaluated 4 stores, 28 perishables, local weather & weekend demand.', 'success');
    } finally {
      setIsAnalyzing(false);
    }
  }, [showToast]);

  // Demo sequence control
  const startDemo = useCallback(() => {
    setIsDemoModeActive(true);
    setDemoStageState(1);
    setWeatherState('normal');
    setLocalEventState('none');
    setActiveTab('dashboard');
    showToast('Live Hackathon Demo Started', 'Stage 1: Normal baseline conditions loaded.', 'info');
  }, [showToast]);

  const stopDemo = useCallback(() => {
    setIsDemoModeActive(false);
    showToast('Demo Mode Exited', 'Returning to live interactive dashboard.', 'info');
  }, [showToast]);

  const setDemoStage = useCallback((stage: number) => {
    setDemoStageState(stage);
    if (stage === 1) {
      setWeatherState('normal');
      setLocalEventState('none');
      setActiveTab('dashboard');
    } else if (stage === 2) {
      setWeatherState('hot-weekend');
      setLocalEventState('none');
      setActiveTab('scenarios');
    } else if (stage === 3) {
      setWeatherState('hot-weekend');
      setLocalEventState('city-festival');
      setActiveTab('scenarios');
    } else if (stage === 4) {
      setActiveTab('inventory');
    } else if (stage === 5) {
      setActiveTab('agents');
    } else if (stage === 6) {
      setActiveTab('transfers');
    } else if (stage === 7) {
      setActiveTab('revenue');
    }
  }, []);

  const nextDemoStage = useCallback(() => {
    if (demoStage < 7) {
      setDemoStage(demoStage + 1);
    }
  }, [demoStage, setDemoStage]);

  const prevDemoStage = useCallback(() => {
    if (demoStage > 1) {
      setDemoStage(demoStage - 1);
    }
  }, [demoStage, setDemoStage]);

  const value = {
    activeTab,
    setActiveTab,
    stores,
    products,
    agents,
    transfers,
    alerts,
    weather,
    setWeather,
    localEvent,
    setLocalEvent,
    foodWasteKg,
    revenueSavedInr,
    wasteAvoidedKg,
    stockoutRiskCount,
    expiringSoonCount,
    actionsRecommended,
    lastAnalysisTime,
    isAnalyzing,
    runAIAnalysis,
    applyMarkdown,
    approveTransfer,
    rejectTransfer,
    applyOrderAdjustment,
    markAlertResolved,
    selectedProductForDetail,
    setSelectedProductForDetail,
    explanationModalData,
    setExplanationModalData,
    isChatOpen,
    setIsChatOpen,
    isDemoModeActive,
    demoStage,
    startDemo,
    stopDemo,
    nextDemoStage,
    prevDemoStage,
    setDemoStage,
    toasts,
    dismissToast,
    showToast,
  };

  return (
    <FreshGuardContext.Provider value={value}>
      {children}
    </FreshGuardContext.Provider>
  );
};

export const useFreshGuard = () => {
  const context = useContext(FreshGuardContext);
  if (!context) {
    throw new Error('useFreshGuard must be used within a FreshGuardProvider');
  }
  return context;
};
