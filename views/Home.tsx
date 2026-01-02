
import React, { useState } from 'react';
import { Store } from '../types';
import StoreCard from '../components/StoreCard';
import { Search, Heart, Leaf, Clock, MapPin, Sparkles, ShieldCheck, XCircle } from 'lucide-react';

interface HomeProps {
  stores: Store[];
  onStoreSelect: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ stores, onStoreSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Pharmacy', 'Home Made', 'Dairy', 'Organic', 'Groceries'];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' 
      || store.category.some(cat => cat.toLowerCase().includes(activeFilter.toLowerCase()))
      || (activeFilter === 'Home Made' && store.type === 'HomeSeller')
      || (activeFilter === 'Pharmacy' && store.type === 'Pharmacy');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
      <div className="mb-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 w-full h-80 bg-orange-100/30 blur-[100px] -z-10 rounded-full" />
        
        <div className="inline-flex items-center space-x-2 bg-[#FEF3C7] text-[#92400E] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-8 border border-[#FDE68A]">
          <Heart className="w-3 h-3 fill-[#92400E]" />
          <span>Real Neighborhood Shops • No Dark Stores</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-[#2D3748] mb-8 tracking-tighter leading-none">
          Local commerce <br/> <span className="text-[#C05621] italic font-serif">digitally empowered.</span>
        </h1>
        
        <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
          From your neighborhood pharmacy to home kitchens, KiranaConnect brings the local economy to your fingertips.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl mx-auto bg-white p-3 rounded-[3rem] shadow-2xl border border-[#F7E8D0]">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-[#C05621]" />
            </div>
            <input 
              type="text" 
              readOnly
              value="MG Road, Bangalore"
              className="block w-full pl-14 pr-3 py-5 border-none bg-[#FFFDF9] rounded-[2rem] text-sm font-black text-slate-700 focus:ring-0"
            />
          </div>
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-300" />
            </div>
            <input 
              type="text" 
              placeholder="Pharmacy, Pickles, Fresh Milk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-14 pr-3 py-5 border-none bg-white focus:ring-0 text-sm font-medium placeholder-slate-300"
            />
          </div>
          <button className="w-full md:w-auto px-10 py-5 bg-[#C05621] text-white font-black rounded-[2rem] shadow-xl hover:bg-[#A0481B] transition-all hover:scale-[1.02]">
            Search
          </button>
        </div>
      </div>

      <div className="mb-12 border-b border-[#F7E8D0] pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="text-3xl font-black text-slate-900">Neighborhood Shops</h2>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar py-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeFilter === f 
                    ? 'bg-[#C05621] text-white shadow-xl shadow-orange-100 translate-y-[-2px]' 
                    : 'bg-white text-slate-400 border border-slate-100 hover:border-[#C05621]/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredStores.map(store => (
          <StoreCard key={store.id} store={store} onClick={onStoreSelect} />
        ))}
      </div>
    </div>
  );
};

export default Home;
