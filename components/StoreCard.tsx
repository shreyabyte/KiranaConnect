
import React from 'react';
import { Store } from '../types';
import { Star, Clock, MapPin, ChevronRight, Heart } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  onClick: (id: string) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onClick }) => {
  return (
    <div 
      onClick={() => onClick(store.id)}
      className="group bg-white rounded-[3rem] shadow-sm border border-[#F7E8D0] overflow-hidden hover:shadow-2xl hover:shadow-orange-100/40 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name} 
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748]/60 via-transparent to-transparent opacity-60" />
        
        <button className="absolute top-6 right-6 p-2.5 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
          <Heart className="w-5 h-5" />
        </button>

        {store.isBestPrice && (
          <div className="absolute top-6 left-6 bg-[#FFB300] text-[#7B341E] text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-widest border border-white/20">
            Locals’ Favorite
          </div>
        )}

        <div className="absolute bottom-6 left-6 flex items-center space-x-2">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center">
            <Clock className="w-3.5 h-3.5 text-[#FFB300] mr-2" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">{store.deliveryTime}</span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-black text-2xl text-[#2D3748] line-clamp-1 group-hover:text-[#C05621] transition-colors tracking-tight">{store.name}</h3>
          <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-xl text-[#C05621] text-xs font-black">
            {store.rating} <Star className="w-3.5 h-3.5 ml-1.5 fill-[#C05621]" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {store.category.slice(0, 2).map(c => (
            <span key={c} className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">{c}</span>
          ))}
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <MapPin className="w-4 h-4 mr-2 text-[#C05621]" />
            {store.distance} away
          </div>
          <div className="bg-[#FFFDF9] border border-[#F7E8D0] p-3 rounded-2xl group-hover:bg-[#C05621] group-hover:text-white transition-all shadow-sm">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
