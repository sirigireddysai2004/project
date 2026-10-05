export type ProductCategory = 
  | 'Fruits' 
  | 'Vegetables' 
  | 'Dairy' 
  | 'Bakery' 
  | 'Meat' 
  | 'Beverages' 
  | 'Packaged Food';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type ActionType = 
  | 'markdown' 
  | 'transfer' 
  | 'reorder' 
  | 'reduce-order' 
  | 'hold' 
  | 'promote';

export interface Store {
  id: string;
  name: string;
  code: string;
  area: string;
  address: string;
  type: 'Hypermarket' | 'Supermarket' | 'Express Store';
  activeSKUs: number;
  dailyFootfall: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  storeId: string;
  storeName: string;
  currentStock: number; // units
  unitWeightKg: number; // kg per unit
  dailyDemand: number; // units / day
  baseDemand: number; // baseline
  daysRemaining: number; // shelf life in days
  expiryDate: string;
  costPrice: number; // INR
  sellingPrice: number; // INR
  currentDiscountPercent: number; // 0, 10, 20, 30...
  expiryRisk: RiskLevel;
  stockoutRisk: RiskLevel;
  wasteRiskScore: number; // 0 - 100
  recommendedAction: string;
  actionType: ActionType;
  actionApplied?: boolean;
  actionDetails?: {
    markdownPercent?: number;
    transferUnits?: number;
    transferToStoreId?: string;
    transferToStoreName?: string;
    expectedWasteAvoidedKg?: number;
    expectedRevenueRecovered?: number;
    sellThroughProbability?: number;
    orderAdjustmentUnits?: number;
  };
  weatherSensitivity: {
    hotMultiplier: number;
    rainMultiplier: number;
    coldMultiplier: number;
  };
  eventSensitivity: {
    festivalMultiplier: number;
    sportsMultiplier: number;
  };
  explanationFactors: string[];
}

export type WeatherType = 'normal' | 'hot-weekend' | 'heavy-rain' | 'cold-wave';
export type LocalEventType = 'none' | 'college-fest' | 'cricket-match' | 'city-festival' | 'concert' | 'weekend-market';

export interface AIAgent {
  id: string;
  name: string;
  codeName: string;
  role: string;
  status: 'active' | 'processing' | 'standby';
  confidence: number;
  lastAction: string;
  purpose: string;
  inputs: string[];
  output: string;
  latencyMs: number;
}

export interface StoreTransferProposal {
  id: string;
  productId: string;
  productName: string;
  fromStoreId: string;
  fromStoreName: string;
  fromStock: number;
  fromDemand: number;
  toStoreId: string;
  toStoreName: string;
  toStock: number;
  toDemand: number;
  transferUnits: number;
  wasteAvoidedUnits: number;
  stockoutRiskReducedPercent: number;
  revenueProtected: number;
  status: 'pending' | 'approved' | 'rejected' | 'in-transit';
  explanation: string;
}

export interface AlertItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  level: 'critical' | 'high' | 'medium' | 'success' | 'info';
  category: 'spoilage' | 'stockout' | 'transfer' | 'revenue' | 'weather';
  resolved: boolean;
  actionLabel?: string;
  actionType?: string;
  productId?: string;
}

export interface DemandHistoryPoint {
  date: string;
  actual?: number;
  predicted?: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface DemoStage {
  stage: number;
  title: string;
  subtitle: string;
  description: string;
  actionDescription: string;
  weather: WeatherType;
  event: LocalEventType;
  highlightCardId?: string;
  expectedAvoidedWasteKg: number;
  expectedRevenueProtected: number;
  expectedStockoutsPrevented: number;
}
