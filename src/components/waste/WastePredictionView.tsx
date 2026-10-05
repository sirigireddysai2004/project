import React from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  AlertTriangle, 
  TrendingDown, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  BarChart3
} from 'lucide-react';

export const WastePredictionView: React.FC = () => {
  const { products, applyMarkdown, setSelectedProductForDetail } = useFreshGuard();

  // Category breakdown
  const wasteByCategory = [
    { category: 'Fruits', percentage: 34, kg: 436, color: 'bg-amber-500' },
    { category: 'Vegetables', percentage: 26, kg: 334, color: 'bg-emerald-500' },
    { category: 'Bakery', percentage: 18, kg: 231, color: 'bg-rose-500' },
    { category: 'Dairy', percentage: 14, kg: 180, color: 'bg-blue-500' },
    { category: 'Meat', percentage: 5, kg: 64, color: 'bg-purple-500' },
    { category: 'Beverages', percentage: 3, kg: 39, color: 'bg-cyan-500' },
  ];

  // Store breakdown
  const wasteByStore = [
    { name: 'Hyderabad Central (Banjara Hills)', wasteKg: 520, percent: 40.5, status: 'Surplus hub' },
    { name: 'Hyderabad South (Gachibowli)', wasteKg: 340, percent: 26.5, status: 'Fast bakery turnover' },
    { name: 'Hyderabad North (Kompally)', wasteKg: 280, percent: 21.8, status: 'Produce spoilage' },
    { name: 'Hyderabad East (Uppal)', wasteKg: 144, percent: 11.2, status: 'Lean express node' },
  ];

  // Highest waste risk ranking: 1. Bananas, 2. Bread, 3. Tomatoes, 4. Yogurt, 5. Strawberries
  const highestWasteRanking = [
    { rank: 1, name: 'Bananas (Cavendish Fresh)', riskScore: 82, daysLeft: 2, potentialLoss: 3920, action: 'Apply 30% markdown', prodId: 'prod-banana-hyd-01' },
    { rank: 2, name: 'Artisanal White Bread 400g', riskScore: 89, daysLeft: 1, potentialLoss: 1575, action: 'Flash 40% Evening Sale', prodId: 'prod-bread-hyd-03' },
    { rank: 3, name: 'Vine Ripe Tomatoes (1kg)', riskScore: 78, daysLeft: 3, potentialLoss: 4200, action: 'Reduce tomorrow supplier order', prodId: 'prod-tomato-hyd-01' },
    { rank: 4, name: 'Greek Yogurt Plain 400g', riskScore: 71, daysLeft: 3, potentialLoss: 3120, action: 'Transfer 25 units to Store D', prodId: 'prod-yogurt-hyd-01' },
    { rank: 5, name: 'Fresh Hydroponic Strawberries 250g', riskScore: 68, daysLeft: 2, potentialLoss: 2975, action: 'Apply 20% markdown', prodId: 'prod-strawberries-hyd-03' },
  ];

  // Top opportunities
  const topOpportunities = [
    { title: 'Dynamic Markdown on Cavendish Bananas', impactKg: '8.4 kg waste avoided', impactRev: '₹2,940 recovered', prob: '91% clearance' },
    { title: 'Inter-Store Transfer of Surplus Greek Yogurt', impactKg: '10.0 kg waste avoided', impactRev: '₹2,437 recovered', prob: '89% clearance' },
    { title: 'Procurement Order Trimming on Vine Tomatoes', impactKg: '20.0 kg overstock prevented', impactRev: '₹960 saved', prob: '86% clearance' },
    { title: 'Evening Flash Markdown on Artisanal Bread', impactKg: '14.0 kg waste avoided', impactRev: '₹945 recovered', prob: '94% clearance' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Preventative Analytics
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
          Waste Prediction & Mitigation
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Multi-dimensional breakdown of organic landfill liabilities, vulnerability clusters by category and store node, and actionable waste-avoidance opportunities.
        </p>
      </div>

      {/* Top 2 Charts: Category & Store Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste by Category */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Projected Spoilage by Category</h3>
            <span className="text-xs font-mono text-slate-400">Total: 1,284 kg</span>
          </div>

          {/* Stacked bar representation */}
          <div className="h-4 rounded-full overflow-hidden flex bg-slate-800">
            {wasteByCategory.map((cat, idx) => (
              <div 
                key={idx} 
                className={`${cat.color} transition-all`} 
                style={{ width: `${cat.percentage}%` }}
                title={`${cat.category}: ${cat.percentage}% (${cat.kg} kg)`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {wasteByCategory.map((cat, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-sm ${cat.color}`} />
                  <span className="font-semibold text-white truncate">{cat.category}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between text-slate-400 font-mono">
                  <span className="text-xs font-bold text-slate-200">{cat.kg} kg</span>
                  <span className="text-[11px]">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waste by Store Node */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Spoilage Exposure by Store Cluster</h3>
            <span className="text-xs font-mono text-emerald-400">4 Store Nodes</span>
          </div>

          <div className="space-y-3">
            {wasteByStore.map((store, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-semibold">{store.name}</span>
                  <span className="font-mono text-white font-bold">{store.wasteKg} kg ({store.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" 
                    style={{ width: `${store.percent}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">{store.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highest Waste Risk Leaderboard */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Highest Waste Risk Perishables</h3>
            <p className="text-xs text-slate-400 mt-0.5">Top 5 items in critical danger of expiring unsold without proactive intervention.</p>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {highestWasteRanking.map((item) => (
            <div key={item.rank} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center shrink-0">
                  {item.rank}
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Remaining Shelf Life: <span className="font-mono text-rose-400 font-bold">{item.daysLeft} days</span> · Potential Gross Loss: <span className="font-mono text-slate-300 font-bold">₹{item.potentialLoss.toLocaleString('en-IN')}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-slate-400 text-[11px]">AI Risk Score</span>
                  <p className="font-mono font-bold text-rose-400 text-sm">{item.riskScore} / 100</p>
                </div>

                <button
                  onClick={() => {
                    const prod = products.find(p => p.id === item.prodId);
                    if (prod) setSelectedProductForDetail(prod);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer border border-slate-700 hover:border-emerald-500"
                >
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Opportunities Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/20 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          Top High-Yield Prevention Opportunities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topOpportunities.map((opp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white text-sm">{opp.title}</h4>
              <div className="flex flex-wrap items-center gap-4 text-slate-300 font-mono text-[11px] pt-1">
                <span className="text-emerald-400 font-semibold">{opp.impactKg}</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">{opp.impactRev}</span>
                <span>·</span>
                <span className="text-slate-400">{opp.prob}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
