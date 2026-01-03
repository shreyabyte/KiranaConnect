import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Store } from '../types';
import StoreCard from '../components/StoreCard';

interface HomeProps {
  stores: Store[];
  onStoreSelect: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ stores, onStoreSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationLabel, setLocationLabel] = useState('Your Location');

  const filters = ['All', 'Pharmacy', 'Home Made', 'Dairy', 'Groceries'];

  const filteredStores = stores.filter(store => {
    const matchesFilter = activeFilter === 'All' 
      || store.category.some(cat => cat.toLowerCase().includes(activeFilter.toLowerCase()))
      || (activeFilter === 'Home Made' && store.type === 'HomeSeller')
      || (activeFilter === 'Pharmacy' && store.type === 'Pharmacy');
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      search === '' ||
      store.name.toLowerCase().includes(search) ||
      store.category.some(cat => cat.toLowerCase().includes(search)) ||
      (store.type && store.type.toLowerCase().includes(search));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16">
      <div className="mb-12 border-b border-[#F7E8D0] pb-10">
        {/* Top horizontal location + search bar */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-[#C05621]" />
            </div>
            <input
              type="text"
              value={locationLabel}
              onChange={(e) => setLocationLabel(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-none bg-[#FFFDF9] rounded-[1.75rem] text-xs font-black text-slate-700 focus:ring-0 shadow-sm"
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-300" />
            </div>
            <input
              type="text"
              placeholder="Pharmacy, Pickles, Fresh Milk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-none bg-slate-50 focus:ring-0 text-xs md:text-sm font-medium placeholder-slate-300 rounded-[1.75rem] shadow-sm"
            />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-6">
          Tip: You can browse the marketplace without logging in, but signing in keeps your favorite kirana and subscriptions handy.
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Neighborhood Shops</h2>
            <p className="text-sm text-slate-500 max-w-md">
              Start from your lane in{' '}
              <span className="font-semibold text-slate-900">{locationLabel}</span>
              {' '}or search for pharmacy, pickles, fresh milk and more.
            </p>
          </div>
        </div>

        <div className="mt-10 flex space-x-3 overflow-x-auto no-scrollbar py-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredStores.map(store => (
          <StoreCard key={store.id} store={store} onClick={onStoreSelect} />
        ))}
      </div>
    </div>
  );
};

export default Home;
