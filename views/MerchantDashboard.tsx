
import React, { useState } from 'react';
import { Package, Users, DollarSign, CheckCircle2, Clock, Truck, ChevronRight, Plus, X, Tag, Weight, Camera, Sparkles, Loader2 } from 'lucide-react';
import { Order, OrderStatus, Product } from '../types';
import { generateProductImage } from '../services/geminiService';

interface MerchantDashboardProps {
  orders: Order[];
  products: Product[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onAddProduct: (product: Product) => void;
}

const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ orders, products, onUpdateStatus, onAddProduct }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [showAddStock, setShowAddStock] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    price: '',
    weight: '',
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
  });

  const activeOrders = orders.filter(o => o.status !== 'Delivered');

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const endOfToday = startOfToday + 24 * 60 * 60 * 1000;

  const todaysOrders = orders.filter(o => o.createdAt >= startOfToday && o.createdAt < endOfToday);
  const todaysSales = todaysOrders.reduce((sum, o) => sum + o.total, 0);
  const formattedTodaysSales = `₹${todaysSales.toLocaleString('en-IN')}`;

  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const happyGuests = deliveredOrders.length;

  const handleGenerateImage = async () => {
    if (!newProd.name) {
      alert("Please enter a product name first!");
      return;
    }
    setIsGenerating(true);
    try {
      const generated = await generateProductImage(`${newProd.name} ${newProd.weight}`);
      if (generated) {
        setNewProd(prev => ({ ...prev, imageUrl: generated }));
      }
    } catch (err) {
      console.error(err);
      alert("AI Photography is busy. Using standard placeholder.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `p-new-${Date.now()}`,
      name: newProd.name,
      brand: 'Neighborhood Original',
      weight: newProd.weight,
      price: parseInt(newProd.price),
      originalPrice: parseInt(newProd.price) + 20,
      category: newProd.category,
      image: newProd.imageUrl,
      storeId: 's1'
    };
    onAddProduct(product);
    setShowAddStock(false);
    setNewProd({ name: '', price: '', weight: '', category: 'Groceries', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#2D3748]">Merchant Kitchen</h1>
          <p className="text-slate-500 font-medium">Managing Gupta’s Family Kirana</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowAddStock(true)}
            className="bg-[#2F855A] text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-100 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add to Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { label: 'Today Sales', val: formattedTodaysSales, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Orders', val: activeOrders.length.toString(), icon: Package, color: 'text-[#C05621]', bg: 'bg-orange-50' },
          { label: 'Happy Guests', val: happyGuests.toString(), icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Market Rank', val: `#${Math.max(1, 10 - happyGuests)}`, icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#F7E8D0] group hover:border-[#C05621] transition-all">
            <div className={`p-4 ${s.bg} ${s.color} rounded-2xl w-fit mb-6 transition-all group-hover:scale-110`}>
              <s.icon className="w-8 h-8" />
            </div>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{s.label}</h3>
            <p className="text-3xl font-black text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-xl font-black text-slate-900 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-[#C05621]" />
            Fulfillment Queue ({activeOrders.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeOrders.length === 0 ? (
              <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400">
                <Package className="w-12 h-12 mb-4 text-slate-200" />
                <p className="font-bold">Neighborhood is quiet. No orders yet.</p>
              </div>
            ) : (
              activeOrders.map(o => (
                <div 
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className={`bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${selectedOrder?.id === o.id ? 'border-[#C05621] shadow-xl shadow-orange-100' : 'border-slate-50 hover:border-[#C05621]/30'}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded-full mb-2 inline-block">#{o.id}</span>
                      <h4 className="font-black text-slate-900 text-lg">₹{o.total}</h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {o.status === 'Pending' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(o.id, 'Accepted'); }}
                        className="flex-grow bg-[#2F855A] text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        Accept
                      </button>
                    )}
                    {o.status === 'Accepted' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(o.id, 'Packed'); }}
                        className="flex-grow bg-[#C05621] text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        Pack
                      </button>
                    )}
                    {o.status === 'Packed' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(o.id, 'Out for Delivery'); }}
                        className="flex-grow bg-[#2D3748] text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        Deliver
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-black text-slate-900">Items List</h3>
          {selectedOrder ? (
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-[#F7E8D0]">
              <div className="space-y-6">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      referrerPolicy="no-referrer" 
                      crossOrigin="anonymous"
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-50" 
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-black text-slate-800 leading-none mb-1">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-10 border-2 border-dashed border-slate-100 text-center text-slate-400">
              <p className="text-sm font-bold">Pick an order to see details.</p>
            </div>
          )}
        </div>
      </div>

      {showAddStock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D3748]/60 backdrop-blur-md" onClick={() => setShowAddStock(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-[#F7E8D0]">
            <div className="p-8 text-center border-b border-[#F7E8D0]">
              <button onClick={() => setShowAddStock(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black text-[#2D3748]">Restock Artisan Shelf</h2>
            </div>
            
            <form onSubmit={handleAddStockSubmit} className="p-8 space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-40 h-40 bg-slate-100 rounded-3xl overflow-hidden mb-4 border-2 border-slate-200">
                  {isGenerating ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <Loader2 className="w-8 h-8 text-[#C05621] animate-spin" />
                    </div>
                  ) : (
                    <img 
                      src={newProd.imageUrl} 
                      referrerPolicy="no-referrer" 
                      crossOrigin="anonymous"
                      alt="Preview"
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                <button 
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateImage}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C05621] hover:text-[#A0481B]"
                >
                  <Sparkles className="w-4 h-4" /> Magic AI Photo
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Tag className="w-5 h-5 text-[#C05621] mr-4" />
                  <input required placeholder="Product Name" className="bg-transparent border-none focus:ring-0 text-sm font-bold flex-grow" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} />
                </div>
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <DollarSign className="w-5 h-5 text-[#C05621] mr-4" />
                  <input required type="number" placeholder="Price (₹)" className="bg-transparent border-none focus:ring-0 text-sm font-bold flex-grow" value={newProd.price} onChange={(e) => setNewProd({...newProd, price: e.target.value})} />
                </div>
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Weight className="w-5 h-5 text-[#C05621] mr-4" />
                  <input required placeholder="Weight (e.g. 500g)" className="bg-transparent border-none focus:ring-0 text-sm font-bold flex-grow" value={newProd.weight} onChange={(e) => setNewProd({...newProd, weight: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#2F855A] text-white font-black py-5 rounded-[2rem] shadow-xl hover:bg-[#236343] transition-all">
                Publish to Market
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard;
