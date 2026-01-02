
import React, { useState, useEffect } from 'react';
import { ComparisonResult } from '../types';
import { TrendingUp, Check, Info, ShieldCheck, Zap } from 'lucide-react';
import { getPriceTrendAnalysis } from '../services/geminiService';

interface ProductComparisonProps {
  productName: string;
  stores: { storeName: string; price: number; isBest: boolean }[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ productName, stores }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      try {
        const insight = await getPriceTrendAnalysis(productName);
        setAiInsight(insight || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [productName]);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-slate-900 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-orange-500" />
          Price Match
        </h3>
        <div className="text-[10px] font-black text-orange-500 bg-slate-900 px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-800">
          Live Data
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {stores.map((s, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-between p-5 rounded-[1.5rem] border transition-all ${
              s.isBest 
                ? 'border-orange-500 bg-orange-50 shadow-lg' 
                : 'border-slate-50 bg-slate-50/50'
            }`}
          >
            <div className="flex items-center">
              {s.isBest ? (
                <div className="bg-[#0F172A] rounded-2xl p-2 mr-4 shadow-lg">
                  <Check className="w-4 h-4 text-orange-500" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-2xl border border-slate-200 mr-4" />
              )}
              <span className={`font-black uppercase tracking-tight text-xs ${s.isBest ? 'text-slate-900' : 'text-slate-500'}`}>
                {s.storeName}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-2xl font-black ${s.isBest ? 'text-slate-900' : 'text-slate-400'}`}>
                ₹{s.price}
              </span>
              {s.isBest && (
                <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest mt-1">
                  Lowest Found
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0F172A] rounded-[2rem] p-6 text-white relative overflow-hidden group border border-slate-800">
        <div className="flex items-start">
          <div className="bg-slate-800 p-2 rounded-xl mr-4">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-orange-500">Market Insight</h4>
            {loading ? (
              <div className="h-4 w-32 bg-slate-800 animate-pulse rounded-full" />
            ) : (
              <p className="text-[11px] font-medium leading-relaxed text-slate-300">
                {aiInsight || "Analyzing local price trends... checking 4 stores nearby."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
