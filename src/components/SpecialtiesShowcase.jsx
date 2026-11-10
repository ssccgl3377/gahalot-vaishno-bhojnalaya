import React from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { 
  Crown, 
  ShoppingBag, 
  Eye, 
  ArrowRight,
  Star
} from 'lucide-react';

export const SpecialtiesShowcase = () => {
  const { addToCart, setSelectedItemForModal } = useCart();
  
  // Pick the top 4 flagship signature items with exact verified images
  const signatureItems = MENU_ITEMS.filter(
    (item) => ['thali-1', 'raj-1', 'raj-3', 'des-2'].includes(item.id)
  );

  return (
    <section id="thalis" className="py-16 md:py-20 bg-cream relative overflow-hidden">
      
      {/* Decorative ambient element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="hallmark-container relative">
        
        {/* Header with Royal Marcellus Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center space-x-2 text-gold-dark font-sans text-xs font-bold uppercase tracking-wider">
              <Crown className="w-4 h-4 text-gold" />
              <span className="font-royal">Royal Marwari Signatures</span>
            </div>
            <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-forest tracking-wide">
              Crown Jewels of Our Kitchen
            </h2>
            <p className="font-sans text-charcoal/70 text-xs sm:text-sm max-w-xl">
              Authentic delicacies that have defined the prestige of Gahlot Vaishno Bhojnalaya across Rajasthan.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center space-x-2 text-forest font-semibold text-xs sm:text-sm hover:text-gold-dark transition-colors group cursor-pointer font-royal"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {signatureItems.map((item) => (
            <div
              key={item.id}
              className="bg-ivory rounded-2xl overflow-hidden border border-gold/30 hover:border-gold hover:shadow-royal transition-all duration-300 flex flex-col group relative"
            >
              {/* Image Container with Exact Photo */}
              <div 
                className="relative h-52 sm:h-56 overflow-hidden bg-forest-900 cursor-pointer" 
                onClick={() => setSelectedItemForModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-forest-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-gold border border-gold/40 flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-gold" />
                    <span className="font-royal">Royal Special</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-ivory/90 backdrop-blur-sm p-1.5 rounded-lg shadow">
                  <span className="veg-badge">
                    <span className="veg-badge-circle"></span>
                  </span>
                </div>

                {/* Quick View Button on Hover (Desktop) */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-forest-950/40 backdrop-blur-[2px]">
                  <span className="px-3.5 py-1.5 rounded-full bg-ivory text-forest text-xs font-bold shadow-lg flex items-center space-x-1.5 font-royal">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </span>
                </div>

                {/* Rating Overlay */}
                <div className="absolute bottom-2.5 left-3 flex items-center space-x-1 text-ivory text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-ivory/60 text-[10px]">({item.orders})</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 text-left">
                <div>
                  <div className="text-[11px] text-gold-dark font-sans font-semibold">
                    {item.hindiName}
                  </div>
                  <h3 
                    onClick={() => setSelectedItemForModal(item)}
                    className="font-royal text-base sm:text-lg font-bold text-forest group-hover:text-gold-dark transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 line-clamp-2 mt-1 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gold/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal/50 uppercase tracking-wider block font-sans">Price</span>
                    <span className="font-royal text-xl font-bold text-forest">₹{item.price}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="px-3.5 py-2 rounded-xl bg-forest text-ivory text-xs font-bold hover:bg-forest-800 transition-transform active:scale-95 flex items-center space-x-1.5 shadow-sm cursor-pointer border border-gold/30 min-h-[40px] font-royal"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                    <span>Add to Order</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
