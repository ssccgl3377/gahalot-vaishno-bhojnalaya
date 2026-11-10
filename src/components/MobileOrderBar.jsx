import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

export const MobileOrderBar = () => {
  const { totalItemsCount, grandTotal, setIsCartOpen } = useCart();

  if (totalItemsCount === 0) {
    return (
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Hello Gahlot Vaishno Bhojnalaya! I would like to order food.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl border-2 border-white font-bold text-xs active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Order on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-cream/95 backdrop-blur-md border-t border-gold/30 shadow-2xl animate-slideUp">
      <div className="max-w-md mx-auto flex items-center justify-between bg-forest text-ivory p-3.5 rounded-2xl border border-gold/40 shadow-royal">
        <div className="flex items-center space-x-3 text-left">
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-gold" />
            <span className="absolute -top-1.5 -right-1.5 bg-gold text-forest-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gold uppercase tracking-wider block font-semibold">Your Royal Order</span>
            <span className="font-serif text-base font-bold text-ivory">₹{grandTotal}</span>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-gold text-forest-950 font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-1.5 shadow active:scale-95 cursor-pointer"
        >
          <span>View Thali</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
