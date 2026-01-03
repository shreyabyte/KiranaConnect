
import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import StoreDetail from './views/StoreDetail';
import MerchantDashboard from './views/MerchantDashboard';
import CartSidebar from './components/CartSidebar';
import PaymentModal from './components/PaymentModal';
import OrderTracking from './components/OrderTracking';
import { Product, CartItem, Order, OrderStatus, Store } from './types';
import { MOCK_STORES, MOCK_PRODUCTS } from './constants';
import { ShoppingBag, User, Store as StoreIcon, Heart, PackageCheck, CalendarCheck } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import CustomerAuth from './views/CustomerAuth';
import SellerAuth from './views/SellerAuth';
import Welcome from './views/Welcome';

type View = 'Welcome' | 'Home' | 'StoreDetail' | 'Merchant' | 'CustomerAuth' | 'SellerAuth';
const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Welcome');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<CartItem[]>([]);
  const [subscriptionToast, setSubscriptionToast] = useState<{
    product: string;
    frequency: 'Daily' | 'Weekly' | 'Monthly';
  } | null>(null);
  
  // Real-time states for the mock environment
  const [allStores, setAllStores] = useState<Store[]>(MOCK_STORES);
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const handleStoreSelect = (id: string) => {
    setSelectedStoreId(id);
    setCurrentView('StoreDetail');
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && !item.isSubscription);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleSubscribe = (product: Product, frequency: 'Daily' | 'Weekly' | 'Monthly') => {
    const subItem: CartItem = { ...product, quantity: 1, isSubscription: true, frequency };
    setSubscriptions(prev => {
      if (prev.find(s => s.id === product.id)) return prev;
      return [...prev, subItem];
    });
    setSubscriptionToast({ product: product.name, frequency });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    const store = allStores.find(s => s.id === (cartItems[0]?.storeId || 's1'));
    const newOrder: Order = {
      id: `KC-${Math.floor(1000 + Math.random() * 9000)}`,
      storeId: cartItems[0]?.storeId || 's1',
      storeName: store?.name || "Local Kirana",
      items: [...cartItems],
      total: cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
      status: 'Pending',
      createdAt: Date.now(),
      estimatedMinutes: 0.5 // Reduced for testing: 30 seconds
    };
    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    setCartItems([]);
    setIsPaymentOpen(false);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleAddProduct = (newProd: Product) => {
    setAllProducts(prev => [...prev, newProd]);
  };

  const handleRateStore = (storeId: string, rating: number) => {
    setAllStores(prev => prev.map(s => {
      if (s.id === storeId) {
        const newReviewCount = s.reviewCount + 1;
        const newRating = Number(((s.rating * s.reviewCount + rating) / newReviewCount).toFixed(1));
        return { ...s, rating: newRating, reviewCount: newReviewCount };
      }
      return s;
    }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find(o => o.id === activeOrderId);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!subscriptionToast) return;
    const timer = setTimeout(() => setSubscriptionToast(null), 3000);
    return () => clearTimeout(timer);
  }, [subscriptionToast]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D3748]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#F7E8D0] sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => setCurrentView('Welcome')}
            >
              <img
                src="/imageasset/logo.png"
                alt="KiranaConnect logo"
                className="w-12 h-12 mr-3 object-contain"
              />
              <div>
                <span className="text-2xl font-black text-[#2D3748] tracking-tight block leading-none">
                  Kirana<span className="text-[#C05621]">Connect</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#A0AEC0]">Neighborhood Market</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <button 
                onClick={() => setCurrentView('Welcome')}
                className={`text-sm font-black uppercase tracking-widest transition-all ${currentView === 'Welcome' ? 'text-[#C05621]' : 'text-slate-400 hover:text-[#C05621]'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentView('Home')}
                className={`text-sm font-black uppercase tracking-widest transition-all ${currentView === 'Home' ? 'text-[#C05621]' : 'text-slate-400 hover:text-[#C05621]'}`}
              >
                Marketplace
              </button>
              <button 
                onClick={() => setCurrentView('Merchant')}
                className={`text-sm font-black uppercase tracking-widest transition-all ${currentView === 'Merchant' || currentView === 'SellerAuth' ? 'text-[#C05621]' : 'text-slate-400 hover:text-[#C05621]'}`}
              >
                Seller Portal
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                  <span>Hi, {user.name}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-900 text-white text-[10px]">{user.role}</span>
                  <button
                    onClick={logout}
                    className="text-[10px] font-black uppercase tracking-widest text-[#C05621]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentView('CustomerAuth')}
                  className="hidden md:inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#C05621]"
                >
                  <User className="w-4 h-4" /> Login
                </button>
              )}
              {subscriptions.length > 0 && (
                <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100">
                  <CalendarCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{subscriptions.length} Subscriptions</span>
                </div>
              )}
              {activeOrderId && activeOrder?.status !== 'Delivered' && (
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="hidden sm:flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100 animate-pulse"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span className="text-xs font-black uppercase">Tracking Order</span>
                </button>
              )}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] rounded-2xl transition-all"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C05621] text-white text-[10px] font-black h-6 w-6 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {activeOrder && (
          <OrderTracking 
            order={activeOrder} 
            onStatusUpdate={updateOrderStatus}
            onRateStore={handleRateStore}
            onClose={() => setActiveOrderId(null)}
          />
        )}

        {currentView === 'Welcome' && (
          <Welcome 
            onEnterMarketplace={() => setCurrentView('Home')} 
            onCustomerAuth={() => setCurrentView('CustomerAuth')} 
            onSellerAuth={() => setCurrentView('Merchant')}
          />
        )}
        {currentView === 'Home' && <Home stores={allStores} onStoreSelect={handleStoreSelect} />}
        {currentView === 'StoreDetail' && selectedStoreId && (
          <StoreDetail 
            store={allStores.find(s => s.id === selectedStoreId)!}
            products={allProducts.filter(p => p.storeId === selectedStoreId)}
            onBack={() => setCurrentView('Home')}
            onAddToCart={addToCart}
            onSubscribe={handleSubscribe}
            onRateStore={handleRateStore}
          />
        )}
        {currentView === 'CustomerAuth' && (
          <CustomerAuth onAuthSuccess={() => setCurrentView('Home')} />
        )}
        {currentView === 'Merchant' && (
          user?.role === 'seller' ? (
            <MerchantDashboard 
              orders={orders} 
              products={allProducts.filter(p => p.storeId === 's1')} // Assuming fixed merchant for demo
              onUpdateStatus={updateOrderStatus} 
              onAddProduct={handleAddProduct}
            />
          ) : (
            <SellerAuth onAuthSuccess={() => setCurrentView('Merchant')} />
          )
        )}
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQty={updateCartQty}
        onCheckout={handleCheckout}
      />

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onSuccess={handlePaymentSuccess}
        total={cartItems.reduce((s, i) => s + i.price * i.quantity, 0)}
      />

      {subscriptionToast && (
        <div className="fixed bottom-6 right-4 sm:right-8 z-40">
          <div className="bg-[#ECFDF3] border border-emerald-200 rounded-[2rem] px-5 py-4 shadow-2xl flex items-center gap-3 max-w-sm animate-[fadeIn_0.3s_ease-out]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Subscription Added</p>
              <p className="text-sm font-semibold text-emerald-900">
                {subscriptionToast.product} 
                <span className="text-emerald-600 font-medium"> · {subscriptionToast.frequency} delivery</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubscriptionToast(null)}
              className="ml-2 text-emerald-500 hover:text-emerald-700 text-lg leading-none"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
