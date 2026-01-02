
import React from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Heart } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQty, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-[#2D3748]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col rounded-l-[4rem] overflow-hidden border-l border-[#F7E8D0]">
          <div className="px-10 py-10 border-b border-[#F7E8D0] flex justify-between items-center bg-white">
            <div>
              <h2 className="text-2xl font-black flex items-center text-[#2D3748]">
                <div className="bg-[#C05621]/10 p-3 rounded-2xl mr-3">
                  <ShoppingBag className="w-6 h-6 text-[#C05621]" />
                </div>
                Neighborhood Bag
              </h2>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 text-slate-400 rounded-full transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-10 py-8 space-y-8 no-scrollbar">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                <h3 className="text-xl font-black text-slate-800">Your bag is light!</h3>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center space-x-6 group">
                  <div className="w-24 h-24 bg-white rounded-3xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                    <img 
                      src={item.image} 
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-black text-slate-800 truncate text-lg">{item.name}</h4>
                    <p className="font-black text-[#C05621]">₹{item.price}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 border rounded-xl"><Minus className="w-4 h-4" /></button>
                      <span className="font-black">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 border rounded-xl"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="px-10 py-10 border-t bg-white">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total</span>
                  <div className="text-5xl font-black text-slate-900">₹{total}</div>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-[#C05621] text-white font-black py-6 rounded-[2.5rem] flex items-center justify-center space-x-4 shadow-2xl"
              >
                <span>Checkout</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
