"use client"
import React from 'react';
import { Camera, MessageCircle, Sparkles } from 'lucide-react';

interface CustomOrderTriggerProps {
  onOpenCustomOrder?: () => void;
  whatsappNumber?: string;
}

export default function CustomOrderTrigger({
  onOpenCustomOrder,
  whatsappNumber = "2347034672159", // Replace with your actual WhatsApp line
}: CustomOrderTriggerProps) {
  
  const handleConnect = () => {
    if (onOpenCustomOrder) {
      onOpenCustomOrder();
    } else {
      // Fallback direct WhatsApp redirect with a pre-filled contextual message
      const message = encodeURIComponent("Hello Prowda Global! I have a picture of an electrical fixture / custom item I want to source.");
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-8 left-6 sm:bottom-8 sm:left-8 z-50 pointer-events-auto group">
      
      {/* Subtle Pulsing Radar Ring Behind the Button */}
      <div className="absolute inset-0 rounded bg-amber-500/30 animate-ping pointer-events-none" />

      {/* Main Floating Interactive Hub */}
      <button
        onClick={handleConnect}
        type="button"
        aria-label="Have a picture? Place a custom order via WhatsApp"
        className="relative flex items-center gap-3 p-2 sm:py-3.5 sm:px-5 rounded bg-gray-100 hover:bg-gray-200 text-white border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.25)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      >
      {/* <button
        onClick={handleConnect}
        type="button"
        aria-label="Have a picture? Place a custom order via WhatsApp"
        className="relative flex items-center gap-3 p-2 sm:py-3.5 sm:px-5 rounded bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.25)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      > */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded bg-amber-500/90 text-neutral-950 flex items-center justify-center shrink-0 shadow-inner">
          <Camera className="w-5 h-5 hidden md:block transition-transform duration-300 group-hover:scale-110" />
          <img src="/Image/w1.png" alt="" className="w-6 h-6 block md:hidden"/>
        </div>

        {/* Copy Deck: Hidden on very small screens, crisp and readable on sm+ */}
        <div className="hidden sm:flex flex-col text-left pr-2">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase leading-none mb-1 font-bold">
            Custom Order
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-tight text-neutral-800 leading-tight">
            Have a picture? We have it.
          </span>
        </div>

        {/* Small Action Icon */}
        <div className="hidden xl:flex items-center justify-center pl-2 border-l border-neutral-800 text-neutral-400 group-hover:text-amber-400 transition-colors">
          <img src="/Image/w1.png" alt="" className="w-6 h-6"/>
        </div>
      </button>

      {/* Tooltip / Label hint that shows up on hover for desktop users */}
      <div className="absolute right-0 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        <div className="bg-gray-200 text-neutral-800 text-xs py-1.5 px-3 rounded border border-gray-200 shadow-xl whitespace-nowrap font-medium">
          Chat with us to source any fixture 💬
        </div>
      </div>

    </div>
  );
}