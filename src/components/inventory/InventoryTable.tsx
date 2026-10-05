import React, { useState, useMemo } from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Eye,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { ProductCategory, RiskLevel } from '../../types';

export const InventoryTable: React.FC = () => {
  const { 
    products, 
    stores, 
    applyMarkdown, 
    setSelectedProductForDetail,
    setExplanationModalData 
  } = useFreshGuard();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'risk' | 'expiry' | 'stock' | 'demand'>('risk');

  const categories: (ProductCategory | 'all')[] = [
    'all',
    'Fruits',
    'Vegetables',
    'Dairy',
    'Bakery',
    'Meat',
    'Beverages',
  ];

  // Filtering and Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        const matchesSearch = 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        // Store
        if (selectedStore !== 'all' && p.storeId !== selectedStore) return false;

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Risk
        if (selectedRisk !== 'all' && p.expiryRisk !== selectedRisk) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'risk') {
          return b.wasteRiskScore - a.wasteRiskScore;
        }
        if (sortBy === 'expiry') {
          return a.daysRemaining - b.daysRemaining;
        }
        if (sortBy === 'stock') {
          return b.currentStock - a.currentStock;
        }
        if (sortBy === 'demand') {
          return b.dailyDemand - a.dailyDemand;
        }
        return 0;
      });
  }, [products, searchTerm, selectedStore, selectedCategory, selectedRisk, sortBy]);

  // Risk styling helper adhering strictly to anti-slop zero-pill discipline
  const renderRiskIndicator = (level: RiskLevel, score?: number) => {
    switch (level) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Critical</span>
            {score !== undefined && <span className="font-mono text-slate-400 text-[11px]">({score})</span>}
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>High Risk</span>
            {score !== undefined && <span className="font-mono text-slate-400 text-[11px]">({score})</span>}
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span>Medium</span>
            {score !== undefined && <span className="font-mono text-slate-400 text-[11px]">({score})</span>}
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Low Risk</span>
            {score !== undefined && <span className="font-mono text-slate-400 text-[11px]">({score})</span>}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Perishable Inventory Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry across {stores.length} store locations. Continually scored for remaining shelf life and stockout risk.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Active SKU Count:</span>
          <span className="font-mono font-bold text-white tabular-nums">{filteredProducts.length}</span>
          <span>of {products.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar Controls (Functional segmented buttons per design constitution) */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search product by name, SKU or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Store Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0">Store:</span>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="all">All Stores (Hyderabad Network)</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="risk">Highest Waste Risk</option>
              <option value="expiry">Earliest Expiry</option>
              <option value="stock">Highest Stock</option>
              <option value="demand">Highest Demand Velocity</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Clean segmented control buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800/80 pb-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-2 shrink-0">
            Category:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Product & Category</th>
                <th className="py-3 px-3">Store</th>
                <th className="py-3 px-3 text-right">Stock</th>
                <th className="py-3 px-3 text-right">Demand / Day</th>
                <th className="py-3 px-3 text-right">Days Left</th>
                <th className="py-3 px-3">Expiry Risk</th>
                <th className="py-3 px-3">Stockout Risk</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th className="py-3 px-4 text-right">Decisions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <p>No products match your active search filters.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isCritical = p.expiryRisk === 'Critical';
                  return (
                    <tr 
                      key={p.id}
                      className={`hover:bg-slate-800/40 transition-colors group ${
                        p.actionApplied ? 'opacity-85' : isCritical ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Product Name */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedProductForDetail(p)}
                          className="text-left font-bold text-slate-100 hover:text-emerald-400 transition-colors cursor-pointer group-hover:underline flex items-center gap-1.5"
                        >
                          <span>{p.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                        </button>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <span>{p.category}</span>
                          <span>·</span>
                          <span className="font-mono">{p.sku}</span>
                        </div>
                      </td>

                      {/* Store */}
                      <td className="py-3 px-3 text-slate-300">
                        <span className="text-xs">{p.storeName}</span>
                      </td>

                      {/* Current Stock */}
                      <td className="py-3 px-3 text-right font-mono font-semibold text-slate-200 tabular-nums">
                        {p.currentStock}
                      </td>

                      {/* Daily Demand */}
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-300 tabular-nums">
                        {p.dailyDemand} <span className="text-[10px] text-slate-400">/day</span>
                      </td>

                      {/* Days Left */}
                      <td className="py-3 px-3 text-right font-mono font-bold tabular-nums">
                        <span className={p.daysRemaining <= 2 ? 'text-rose-400' : p.daysRemaining <= 4 ? 'text-amber-400' : 'text-slate-300'}>
                          {p.daysRemaining}d
                        </span>
                      </td>

                      {/* Expiry Risk */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {renderRiskIndicator(p.expiryRisk, p.wasteRiskScore)}
                      </td>

                      {/* Stockout Risk */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {renderRiskIndicator(p.stockoutRisk)}
                      </td>

                      {/* Recommended Action */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-200 truncate max-w-[200px]" title={p.recommendedAction}>
                            {p.recommendedAction}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setExplanationModalData({
                                title: `Why recommend: ${p.recommendedAction}?`,
                                subtitle: `${p.name} at ${p.storeName}`,
                                factors: p.explanationFactors,
                                actionText: p.recommendedAction,
                                onApply: () => {
                                  if (p.actionType === 'markdown') {
                                    applyMarkdown(p.id, p.actionDetails?.markdownPercent || 30);
                                  }
                                },
                                applied: p.actionApplied,
                              });
                            }}
                            className="px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                          >
                            Why?
                          </button>

                          {!p.actionApplied && p.actionType === 'markdown' && (
                            <button
                              onClick={() => applyMarkdown(p.id, p.actionDetails?.markdownPercent || 30)}
                              className="px-3 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded transition-colors cursor-pointer shadow"
                            >
                              Apply
                            </button>
                          )}

                          {p.actionApplied && (
                            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
