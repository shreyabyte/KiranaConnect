
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Banknote, ShieldCheck, Heart } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, total }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'cash'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2D3748]/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#FFFDF9] w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-[#F7E8D0]">
        <div className="p-8 text-center border-b border-[#F7E8D0]">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <X className="w-6 h-6" />
          </button>
          <div className="w-20 h-20 bg-[#C05621]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-[#C05621]" />
          </div>
          <h2 className="text-2xl font-black text-[#2D3748]">Choose your payment</h2>
          <p className="text-slate-500 font-medium text-sm">Supporting local business with every bite.</p>
        </div>

        <div className="p-8 space-y-4">
          <div 
            onClick={() => setMethod('upi')}
            className={`flex items-center p-5 rounded-3xl border-2 cursor-pointer transition-all ${method === 'upi' ? 'border-[#C05621] bg-[#C05621]/5' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl mr-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <h4 className="font-black text-slate-800">UPI (Google Pay, PhonePe)</h4>
              <p className="text-xs font-bold text-slate-400">Fast & Secure</p>
            </div>
            {method === 'upi' && <div className="w-6 h-6 bg-[#C05621] rounded-full flex items-center justify-center border-4 border-white"><div className="w-1.5 h-1.5 bg-white rounded-full"/></div>}
          </div>

          <div 
            onClick={() => setMethod('card')}
            className={`flex items-center p-5 rounded-3xl border-2 cursor-pointer transition-all ${method === 'card' ? 'border-[#C05621] bg-[#C05621]/5' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl mr-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <h4 className="font-black text-slate-800">Credit / Debit Card</h4>
              <p className="text-xs font-bold text-slate-400">Visa, Mastercard, RuPay</p>
            </div>
            {method === 'card' && <div className="w-6 h-6 bg-[#C05621] rounded-full flex items-center justify-center border-4 border-white"><div className="w-1.5 h-1.5 bg-white rounded-full"/></div>}
          </div>

          <div 
            onClick={() => setMethod('cash')}
            className={`flex items-center p-5 rounded-3xl border-2 cursor-pointer transition-all ${method === 'cash' ? 'border-[#C05621] bg-[#C05621]/5' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl mr-4">
              <Banknote className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <h4 className="font-black text-slate-800">Cash on Delivery</h4>
              <p className="text-xs font-bold text-slate-400">Pay the merchant directly</p>
            </div>
            {method === 'cash' && <div className="w-6 h-6 bg-[#C05621] rounded-full flex items-center justify-center border-4 border-white"><div className="w-1.5 h-1.5 bg-white rounded-full"/></div>}
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-[#F7E8D0]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 mr-2" /> Encrypted Payment
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Amount to Pay</p>
              <p className="text-3xl font-black text-slate-900">₹{total}</p>
            </div>
          </div>
          <button 
            disabled={isProcessing}
            onClick={handlePay}
            className="w-full bg-[#C05621] text-white font-black py-5 rounded-[2rem] shadow-xl shadow-orange-100 flex items-center justify-center space-x-3 hover:bg-[#A0481B] transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-lg">Place Order</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
