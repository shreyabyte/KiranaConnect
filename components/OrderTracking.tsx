
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle2, Package, Truck, Smile, Store as StoreIcon, Home as HomeIcon, Star, X, Check } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingProps {
  order: Order;
  onStatusUpdate: (id: string, status: OrderStatus) => void;
  onRateStore: (storeId: string, rating: number) => void;
  onClose: () => void;
}

const DeliveryMap: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-full h-32 bg-[#FEF3C7]/20 rounded-[2.5rem] border-2 border-dashed border-orange-100 overflow-hidden mt-6 mb-2 group">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#C05621 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-4 left-10 w-24 h-1 bg-orange-300 rounded-full rotate-45" />
        <div className="absolute top-10 right-20 w-32 h-1 bg-orange-300 rounded-full -rotate-12" />
        <div className="absolute bottom-10 left-1/4 w-40 h-1 bg-orange-300 rounded-full rotate-90 opacity-40" />
      </div>
      
      <div className="flex items-center justify-between h-full px-10 relative">
        <div className="flex flex-col items-center z-10">
          <div className="bg-[#C05621] p-3 rounded-2xl shadow-xl border-4 border-white transform group-hover:scale-110 transition-transform">
            <StoreIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[8px] font-black uppercase text-[#C05621] mt-2 tracking-widest">Shop</span>
        </div>

        <div className="flex-grow h-2 bg-white/60 mx-6 relative rounded-full overflow-visible shadow-inner">
          <div 
            className="absolute h-full bg-[#C05621] transition-all duration-300 ease-linear" 
            style={{ width: `${progress}%` }} 
          />
          <div 
            className="absolute top-[-24px] transition-all duration-300 ease-linear z-20"
            style={{ left: `calc(${progress}% - 20px)` }}
          >
            <div className="bg-white p-2 rounded-xl shadow-2xl border-2 border-[#FEF3C7] animate-bounce">
              <Truck className="w-5 h-5 text-[#C05621]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center z-10">
          <div className="bg-slate-900 p-3 rounded-2xl shadow-xl border-4 border-white transform group-hover:scale-110 transition-transform">
            <HomeIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[8px] font-black uppercase text-slate-900 mt-2 tracking-widest">Home</span>
        </div>
      </div>
    </div>
  );
};

const OrderTracking: React.FC<OrderTrackingProps> = ({ order, onStatusUpdate, onRateStore, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(Math.round(order.estimatedMinutes * 60));
  const [progress, setProgress] = useState(0);
  const [storeRating, setStoreRating] = useState(0);
  const [productRatings, setProductRatings] = useState<Record<string, number>>({});
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  useEffect(() => {
    let baseProgress = 0;
    switch(order.status) {
      case 'Pending': baseProgress = 5; break;
      case 'Accepted': baseProgress = 25; break;
      case 'Packed': baseProgress = 45; break;
      case 'Out for Delivery': baseProgress = 70; break;
      case 'Delivered': baseProgress = 100; break;
    }
    setProgress(baseProgress);

    if (order.status === 'Delivered') {
      setTimeLeft(0);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          // If time is up and status is Out for Delivery, simulate delivery complete
          if (order.status === 'Out for Delivery') {
            onStatusUpdate(order.id, 'Delivered');
          }
          return 0;
        }
        return prev - 1;
      });
      
      if (order.status === 'Out for Delivery') {
        setProgress(prev => {
          if (prev < 98) return prev + 0.1; 
          return prev;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order.status, order.id, onStatusUpdate]);

  const handleRateProduct = (productId: string, rating: number) => {
    setProductRatings(prev => ({ ...prev, [productId]: rating }));
  };

  const submitFinalRating = () => {
    setIsSubmittingRating(true);
    if (storeRating > 0) {
      onRateStore(order.storeId, storeRating);
    }
    // Simulate API call for product ratings
    setTimeout(() => {
      setIsSubmittingRating(false);
      onClose();
    }, 1000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const statuses = [
    { label: 'Shop Confirmed', icon: CheckCircle2, active: order.status !== 'Pending' },
    { label: 'Freshly Packed', icon: Package, active: ['Packed', 'Out for Delivery', 'Delivered'].includes(order.status) },
    { label: 'On Neighborhood Way', icon: Truck, active: ['Out for Delivery', 'Delivered'].includes(order.status) },
    { label: 'Arrived Hot', icon: Smile, active: order.status === 'Delivered' },
  ];

  if (order.status === 'Delivered') {
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#2D3748]/80 backdrop-blur-lg" />
        <div className="relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-orange-100 flex flex-col max-h-[90vh]">
          <div className="bg-[#C05621] p-10 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
             <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                <Smile className="w-10 h-10 text-white" />
             </div>
             <h2 className="text-4xl font-black tracking-tight mb-2">Delivered & Hot!</h2>
             <p className="text-orange-100 font-medium">Your items from {order.storeName} have arrived.</p>
          </div>

          <div className="p-10 flex-grow overflow-y-auto space-y-10 no-scrollbar">
            <div className="text-center">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Rate the Shop</h3>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <button 
                    key={r} 
                    onClick={() => setStoreRating(r)}
                    className={`p-2 transition-transform hover:scale-125 ${r <= storeRating ? 'text-[#FFB300]' : 'text-slate-200'}`}
                  >
                    <Star className={`w-10 h-10 ${r <= storeRating ? 'fill-current' : 'fill-none stroke-current'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 text-center">Your Neighborhood Haul</h3>
              <div className="grid gap-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <img src={item.image} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={item.name} />
                      <div>
                        <p className="text-xs font-black text-slate-800 leading-none mb-1">{item.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{item.brand}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(r => (
                        <button 
                          key={r} 
                          onClick={() => handleRateProduct(item.id, r)}
                          className={`p-1 transition-colors ${r <= (productRatings[item.id] || 0) ? 'text-[#FFB300]' : 'text-slate-200'}`}
                        >
                          <Star className={`w-5 h-5 ${r <= (productRatings[item.id] || 0) ? 'fill-current' : 'fill-none stroke-current'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-10 border-t border-slate-50 bg-white">
            <button 
              onClick={submitFinalRating}
              disabled={isSubmittingRating}
              className="w-full bg-[#C05621] text-white font-black py-6 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmittingRating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Done <Check className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#C05621] text-white p-6 sm:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex-1 w-full lg:w-auto">
          <div className="flex items-center gap-6 mb-4 lg:mb-0">
            <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex flex-col items-center justify-center border-4 border-white/20 shadow-2xl backdrop-blur-sm">
              <span className="text-3xl font-black leading-none">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">left</span>
            </div>
            <div>
              <h3 className="text-3xl font-black mb-1 leading-none tracking-tight">Neighborhood Delivery</h3>
              <p className="text-orange-100 text-sm font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Coming from {order.storeName}
              </p>
            </div>
          </div>
          <div className="hidden lg:block w-full max-w-lg">
            <DeliveryMap progress={progress} />
          </div>
        </div>

        <div className="flex-1 w-full lg:w-auto">
          <div className="flex items-center gap-3 sm:gap-10 overflow-x-auto no-scrollbar py-4 justify-center">
            {statuses.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${s.active ? 'bg-white text-[#C05621] scale-110' : 'bg-white/10 text-white/30 border border-white/10'}`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest text-center max-w-[80px] leading-tight ${s.active ? 'text-white' : 'text-white/30'}`}>
                    {s.label}
                  </span>
                </div>
                {i < statuses.length - 1 && (
                  <div className={`h-1 w-6 sm:w-12 rounded-full transition-all duration-700 ${s.active ? 'bg-[#FFB300]' : 'bg-white/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="lg:hidden mt-6">
            <DeliveryMap progress={progress} />
          </div>
        </div>

        <button 
          onClick={onClose}
          className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all shadow-2xl border border-white/10 flex-shrink-0"
        >
          Hide Tracker
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
