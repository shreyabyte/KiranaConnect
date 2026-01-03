import React from 'react';
import { Heart } from 'lucide-react';
// @ts-ignore - Vite handles bundling this static GLB asset
import heroModelUrl from '../Model/glb/model.glb?url';

interface WelcomeProps {
  onEnterMarketplace: () => void;
  onCustomerAuth: () => void;
  onSellerAuth: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onEnterMarketplace, onCustomerAuth, onSellerAuth }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="mb-10 lg:mb-0 text-center lg:text-left relative">
          <div className="absolute top-0 left-1/2 lg:left-0 -translate-x-1/2 lg:-translate-x-1/3 -translate-y-20 w-full h-80 bg-orange-100/40 blur-[100px] -z-10 rounded-full" />
          
          <div className="inline-flex items-center space-x-2 bg-[#FEF3C7] text-[#92400E] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-8 border border-[#FDE68A]">
            <Heart className="w-3 h-3 fill-[#92400E]" />
            <span>Real Neighborhood Shops, No Dark Stores</span>
          </div>
  
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#2D3748] mb-8 tracking-tighter leading-none">
            Local commerce <br/> <span className="text-[#C05621] italic font-serif">digitally empowered.</span>
          </h1>
          
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl font-medium leading-relaxed">
            From your neighborhood pharmacy to home kitchens, KiranaConnect brings the local economy to your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 max-w-xl mx-auto lg:mx-0">
            <button
              onClick={onEnterMarketplace}
              className="w-full sm:w-auto px-10 py-4 bg-[#C05621] text-white font-black rounded-[2rem] shadow-xl hover:bg-[#A0481B] transition-all hover:scale-[1.02] text-xs tracking-widest uppercase"
            >
              Enter Marketplace
            </button>
            <button
              onClick={onCustomerAuth}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#C05621] font-black rounded-[2rem] border border-[#F7E8D0] hover:border-[#C05621]/40 hover:bg-orange-50 transition-all text-xs tracking-widest uppercase"
            >
              Customer Login
            </button>
            <button
              onClick={onSellerAuth}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-[2rem] border border-slate-900/80 hover:bg-black transition-all text-xs tracking-widest uppercase"
            >
              Seller Portal
            </button>
          </div>
        </div>

        <div className="flex items-start justify-center lg:justify-end mt-4 lg:mt-0">
          <div className="w-full max-w-3xl h-[560px] md:h-[640px] rounded-[3rem] bg-transparent flex items-center justify-center px-6 -translate-y-8">
            {/* @ts-ignore - model-viewer is a web component provided by an external script */}
            <model-viewer
              src={heroModelUrl}
              alt="3D neighborhood kirana model"
              auto-rotate
              auto-rotate-speed="14"
              camera-orbit="160deg 75deg 2.2m"
              disable-zoom
              shadow-intensity="0.6"
              exposure="1.1"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
