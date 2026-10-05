import React, { useState } from 'react';
import { useFreshGuard } from '../../context/FreshGuardContext';
import { DEMAND_FORECAST_DATA } from '../../data/initialData';
import { TrendingUp, ShieldCheck, Calendar, ArrowRight, Zap, Info } from 'lucide-react';

export const DemandForecastView: React.FC = () => {
  const { weather, localEvent } = useFreshGuard();
  const [selectedProduct, setSelectedProduct] = useState<string>('Bananas');
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('14d');

  const productsList = ['Bananas', 'Milk', 'Tomatoes', 'Apples', 'Bread'];
  const fullData = DEMAND_FORECAST_DATA[selectedProduct] || DEMAND_FORECAST_DATA['Bananas'];

  // Slice data based on timeframe
  const displayData = timeframe === '7d' ? fullData.slice(0, 7) : fullData;

  // Key metrics
  const productKeyMetrics: Record<string, { current: number; predicted: number; confidence: number; trend: string }> = {
    Bananas: { current: 25, predicted: weather === 'hot-weekend' ? 32 : 28, confidence: 87, trend: '+28% (Hot Weekend)' },
    Milk: { current: 45, predicted: localEvent === 'city-festival' ? 56 : 51, confidence: 93, trend: '+18% (Festival)' },
    Tomatoes: { current: 40, predicted: 42, confidence: 89, trend: '+5% (Steady)' },
    Apples: { current: 28, predicted: 31, confidence: 91, trend: '+10% (Seasonal)' },
    Bread: { current: 30, predicted: 36, confidence: 88, trend: '+20% (Weekend Lift)' },
  };

  const metrics = productKeyMetrics[selectedProduct] || productKeyMetrics['Bananas'];

  // Chart calculation
  const maxVal = Math.max(...displayData.map(d => Math.max(d.actual || 0, d.predicted || 0, d.upperBound || 0))) + 8;
  const chartHeight = 220;
  const chartWidth = 720;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index: number) => paddingX + (index / (displayData.length - 1)) * (chartWidth - 2 * paddingX);
  const getY = (val: number) => chartHeight - paddingY - (val / maxVal) * (chartHeight - 2 * paddingY);

  // Confidence area path (upperBound forward, lowerBound backward)
  const confidencePoints = displayData.filter(d => d.upperBound !== undefined && d.lowerBound !== undefined);
  const confidenceAreaPath = confidencePoints.length > 0
    ? `M ${getX(displayData.indexOf(confidencePoints[0]))} ${getY(confidencePoints[0].upperBound!)} ` +
      confidencePoints.map(d => `L ${getX(displayData.indexOf(d))} ${getY(d.upperBound!)}`).join(' ') + ' ' +
      confidencePoints.slice().reverse().map(d => `L ${getX(displayData.indexOf(d))} ${getY(d.lowerBound!)}`).join(' ') +
      ' Z'
    : '';

  // Actual sales line
  const actualPoints = displayData.filter(d => d.actual !== undefined);
  const actualLinePath = actualPoints.length > 0
    ? `M ${getX(0)} ${getY(actualPoints[0].actual!)} ` +
      actualPoints.map(d => `L ${getX(displayData.indexOf(d))} ${getY(d.actual!)}`).join(' ')
    : '';

  // Predicted sales line
  const predictedPoints = displayData.filter(d => d.predicted !== undefined);
  const predictedLinePath = predictedPoints.length > 0
    ? `M ${getX(displayData.indexOf(predictedPoints[0]))} ${getY(predictedPoints[0].predicted!)} ` +
      predictedPoints.map(d => `L ${getX(displayData.indexOf(d))} ${getY(d.predicted!)}`).join(' ')
    : '';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Demand Forecasting</h1>
          <p className="text-xs text-slate-400 mt-1">
            Bayesian regression & LSTM multi-variable forecasting with real-time weather and city footfall modifiers.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          {(['7d', '14d', '30d'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                timeframe === tf
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf === '7d' ? '7 Days' : tf === '14d' ? '14 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Product Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {productsList.map(prod => (
          <button
            key={prod}
            onClick={() => setSelectedProduct(prod)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              selectedProduct === prod
                ? 'bg-slate-800 border-emerald-500/50 text-white shadow-lg shadow-emerald-950/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {prod}
          </button>
        ))}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400">Current Daily Demand</span>
          <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
            {metrics.current} <span className="text-xs font-normal text-slate-400">units/day</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">Baseline Sales Velocity</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400">AI Predicted Demand</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
            {metrics.predicted} <span className="text-xs font-normal text-slate-400">units/day</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">{metrics.trend}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400">Model Confidence</span>
          <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
            {metrics.confidence}%
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">p-value &lt; 0.01 validated</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400">Recommended Stock Buffer</span>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
            {Math.round(metrics.predicted * 1.3)} <span className="text-xs font-normal text-slate-400">units</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">Safety coverage (2.5 days)</span>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">
              {selectedProduct} — Historical Sales vs. AI Predicted Velocity
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dotted trajectory represents forward prediction with ±10% confidence bounds.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-slate-300">Historical Sales</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-400" />
              <span className="text-emerald-400 font-medium">AI Predicted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
              <span className="text-slate-400">Confidence Band</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative w-full overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-64 overflow-visible">
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingY + ratio * (chartHeight - 2 * paddingY);
              const val = Math.round(maxVal * (1 - ratio));
              return (
                <g key={i}>
                  <line 
                    x1={paddingX} 
                    y1={y} 
                    x2={chartWidth - paddingX} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.06)" 
                    strokeDasharray="4 4" 
                  />
                  <text 
                    x={paddingX - 10} 
                    y={y + 3} 
                    fill="#64748b" 
                    fontSize="10" 
                    fontFamily="monospace" 
                    textAnchor="end"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Confidence Area */}
            {confidenceAreaPath && (
              <path 
                d={confidenceAreaPath} 
                fill="rgba(16, 185, 129, 0.12)" 
                stroke="rgba(16, 185, 129, 0.25)" 
                strokeWidth="1" 
                strokeDasharray="2 2" 
              />
            )}

            {/* Predicted Trajectory Line */}
            {predictedLinePath && (
              <path 
                d={predictedLinePath} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2.5" 
                strokeDasharray="5 4" 
              />
            )}

            {/* Actual Sales Line */}
            {actualLinePath && (
              <path 
                d={actualLinePath} 
                fill="none" 
                stroke="#94a3b8" 
                strokeWidth="2.5" 
              />
            )}

            {/* Data points */}
            {displayData.map((d, idx) => {
              const cx = getX(idx);
              const cyActual = d.actual !== undefined ? getY(d.actual) : null;
              const cyPred = d.predicted !== undefined ? getY(d.predicted) : null;

              return (
                <g key={idx}>
                  {cyActual !== null && (
                    <circle cx={cx} cy={cyActual} r="3.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
                  )}
                  {cyPred !== null && d.actual === undefined && (
                    <circle cx={cx} cy={cyPred} r="4" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
                  )}
                  <text 
                    x={cx} 
                    y={chartHeight - 8} 
                    fill="#64748b" 
                    fontSize="9" 
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {d.date.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
