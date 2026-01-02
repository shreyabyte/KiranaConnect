
import React, { useState } from 'react';
import { ShoppingBag, Plus, Star, MapPin, Clock, ArrowLeft, Heart, Sparkles, MessageSquare, CheckCircle, CalendarClock } from 'lucide-react';
import ProductComparison from '../components/ProductComparison';
import { Product, Store, CartItem } from '../types';

interface StoreDetailProps {
  store: Store;
  products: Product[];
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onSubscribe: (p: Product, freq: 'Daily' | 'Weekly' | 'Monthly') => void;
  onRateStore: (id: string, rating: number) => void;
}

const StoreDetail: React.FC<StoreDetailProps> = ({ store, products, onBack, onAddToCart, onSubscribe, onRateStore }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCat, setActiveCat] = useState('All');
  const [showRateModal, setShowRateModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratedProducts, setRatedProducts] = useState<Record<string, boolean>>({});
  const [subModal, setSubModal] = useState<{ open: boolean, product: Product | null }>({ open: false, product: null });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = products.filter(p => activeCat === 'All' || p.category === activeCat);

  const handleStoreRating = (r: number) => {
    setUserRating(r);
    onRateStore(store.id, r);
    setTimeout(() => setShowRateModal(false), 500);
  };

  const handleProductRating = (productId: string) => {
    setRatedProducts(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
        setRatedProducts(prev => {
            const next = { ...prev };
            delete next[productId];
            return next;
        });
    }, 2000);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      <div className="relative h-64 md:h-80">
        <img 
          src={store.image} 
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="w-full h-full object-cover" 
          alt={store.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748] to-transparent opacity-80" />
        
        <div className="absolute top-6 left-6 flex space-x-3">
          <button 
            onClick={onBack} 
            className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl hover:bg-white/30 transition-all shadow-xl"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-10 left-6 right-6 text-white">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-3">{store.name}</h2>
              <div className="flex flex-wrap gap-4 items-center text-[10px] font-black uppercase tracking-widest">
                <button 
                  onClick={() => setShowRateModal(true)}
                  className="flex items-center bg-[#FFB300] text-[#7B341E] px-3 py-1.5 rounded-xl hover:scale-105 transition-transform"
                >
                  <Star className="w-3 h-3 mr-1.5 fill-[#7B341E]" />
                  {store.rating} ({store.reviewCount}) • Rate Store
                </button>
                <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <Clock className="w-3 h-3 mr-1.5 text-orange-400" />
                  {store.deliveryTime}
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <MapPin className="w-3 h-3 mr-1.5 text-orange-400" />
                  {store.distance}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {subModal.open && subModal.product && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D3748]/60 backdrop-blur-md" onClick={() => setSubModal({ open: false, product: null })} />
          <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl w-full max-w-sm">
            <h3 className="text-xl font-black text-[#2D3748] mb-6">Subscribe to {subModal.product.name}</h3>
            <div className="space-y-4">
              {(['Daily', 'Weekly', 'Monthly'] as const).map(freq => (
                <button 
                  key={freq}
                  onClick={() => {
                    onSubscribe(subModal.product!, freq);
                    setSubModal({ open: false, product: null });
                  }}
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 hover:border-[#C05621] hover:bg-orange-50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-700">{freq} Delivery</span>
                    <CalendarClock className="w-5 h-5 text-slate-300 group-hover:text-[#C05621]" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hassle free replenishment</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#2D3748] p-4 rounded-3xl shadow-xl flex space-x-2 overflow-x-auto no-scrollbar border border-slate-700">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCat === c 
                      ? 'bg-[#FFB300] text-[#7B341E] shadow-lg' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map(p => (
                <div 
                  key={p.id} 
                  className={`group bg-white p-5 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden ${
                    selectedProduct?.id === p.id 
                      ? 'border-[#C05621] ring-4 ring-orange-50' 
                      : 'border-slate-100 hover:border-orange-200'
                  }`}
                  onClick={() => setSelectedProduct(p)}
                >
                  <div className="flex space-x-5">
                    <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                      <img 
                        src={p.image} 
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-black text-slate-900 text-base leading-tight mb-1">{p.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.brand} • {p.weight}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-black text-slate-900">₹{p.price}</span>
                        </div>
                        <div className="flex gap-2">
                          {p.subscriptionEligible && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSubModal({ open: true, product: p });
                              }}
                              className="bg-emerald-50 text-emerald-600 p-2.5 rounded-2xl hover:bg-emerald-100 transition-all border border-emerald-100"
                              title="Subscribe"
                            >
                              <CalendarClock className="w-5 h-5" />
                            </button>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(p);
                            }}
                            className="bg-[#C05621] text-white p-2.5 rounded-2xl hover:bg-[#A0481B] transition-all shadow-lg active:scale-95"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {selectedProduct ? (
              <div className="sticky top-24">
                <ProductComparison 
                  productName={selectedProduct.name}
                  stores={[
                    { storeName: store.name, price: selectedProduct.price, isBest: true },
                    { storeName: 'Big Dark Store', price: Math.round(selectedProduct.price * 1.15), isBest: false },
                    { storeName: 'Online Corp', price: Math.round(selectedProduct.price * 1.3), isBest: false },
                  ]}
                />
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-10 border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center text-slate-400 shadow-sm">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-orange-300" />
                </div>
                <h4 className="font-black text-slate-900 mb-2">Direct Comparison</h4>
                <p className="text-xs font-medium">Select an item to see why neighborhood family stores beat cold warehouses every time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
