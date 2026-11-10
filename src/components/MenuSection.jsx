import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Crown, 
  Flame, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Utensils, 
  Leaf,
  Clock
} from 'lucide-react';

export const MenuSection = () => {
  const { cart, addToCart, updateQuantity, setSelectedItemForModal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, bestseller, chef, jain

  // Filtered and searched items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (activeFilter === 'bestseller' && !item.isBestseller) return false;
      if (activeFilter === 'chef' && !item.isChefSpecial) return false;
      if (activeFilter === 'jain' && !item.isJainAvailable) return false;

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesHindi = item.hindiName.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesHindi || matchesDesc;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, activeFilter]);

  const getItemCartQuantity = (itemId) => {
    return cart
      .filter((ci) => ci.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  const getItemCartId = (itemId) => {
    const found = cart.find((ci) => ci.id === itemId);
    return found ? found.cartItemId : null;
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-cream/70 border-t border-gold/20 relative">
      <div className="hallmark-container">
        
        {/* Section Heading with Royal Marcellus Font */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 text-gold-dark font-sans text-xs font-semibold">
            <Utensils className="w-3.5 h-3.5 text-gold" />
            <span className="font-royal">100% Shuddh Pure Vegetarian Menu</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-forest tracking-wide">
            Explore Our Royal Menu
          </h2>
          <p className="font-sans text-charcoal/75 text-xs sm:text-sm">
            Every dish is prepared fresh to order in pure cow desi ghee, featuring authentic stone-ground spices.
          </p>
        </div>

        {/* Search & Sticky Filter Bar */}
        <div className="bg-ivory p-4 sm:p-5 rounded-2xl border border-gold/30 shadow-soft-card mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Dal Baati, Paneer, Ker Sangri, Jain..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-cream/80 border border-gold/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/40 hover:text-charcoal"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Tags (Mobile & Desktop Scrollable) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-sans min-h-[36px] ${
                  activeFilter === 'all'
                    ? 'bg-forest text-ivory shadow-sm'
                    : 'bg-cream text-charcoal/75 hover:bg-gold/10 border border-gold/20'
                }`}
              >
                All ({MENU_ITEMS.length})
              </button>
              <button
                onClick={() => setActiveFilter('bestseller')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer font-sans min-h-[36px] ${
                  activeFilter === 'bestseller'
                    ? 'bg-forest text-ivory shadow-sm'
                    : 'bg-cream text-charcoal/75 hover:bg-gold/10 border border-gold/20'
                }`}
              >
                <Flame className="w-3 h-3 text-amber-500" />
                <span>Bestsellers</span>
              </button>
              <button
                onClick={() => setActiveFilter('chef')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer font-sans min-h-[36px] ${
                  activeFilter === 'chef'
                    ? 'bg-forest text-ivory shadow-sm'
                    : 'bg-cream text-charcoal/75 hover:bg-gold/10 border border-gold/20'
                }`}
              >
                <Crown className="w-3 h-3 text-gold" />
                <span>Chef Specials</span>
              </button>
              <button
                onClick={() => setActiveFilter('jain')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer font-sans min-h-[36px] ${
                  activeFilter === 'jain'
                    ? 'bg-emerald-900 text-ivory shadow-sm'
                    : 'bg-cream text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
                }`}
              >
                <Leaf className="w-3 h-3 text-emerald-500" />
                <span>Jain Available</span>
              </button>
            </div>
          </div>

          {/* Category Tabs (Horizontal Scroll on Mobile) */}
          <div className="pt-3 border-t border-gold/15 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer font-royal min-h-[38px] ${
                    isSelected
                      ? 'bg-gold text-forest-950 shadow-royal-gold'
                      : 'bg-cream/90 text-charcoal/80 hover:bg-gold/15 border border-gold/20'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Count & Verification Tag */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-charcoal/60 mb-6 gap-2 px-1">
          <span>Showing <strong className="text-forest font-bold">{filteredItems.length}</strong> strictly authentic items</span>
          <span className="flex items-center space-x-1 text-emerald-800 font-medium">
            <span className="veg-badge mr-1"><span className="veg-badge-circle"></span></span>
            100% Shuddh Pure Vegetarian Dishes Only
          </span>
        </div>

        {/* Menu Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        {filteredItems.length === 0 ? (
          <div className="bg-ivory p-10 rounded-2xl border border-gold/30 text-center space-y-3">
            <Utensils className="w-8 h-8 text-gold-dark mx-auto opacity-50" />
            <h3 className="font-royal text-xl font-bold text-forest">No Dishes Found</h3>
            <p className="text-xs text-charcoal/70">
              We couldn't find any dish matching "{searchQuery}". Try searching for Dal Baati, Paneer, or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveFilter('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors font-royal"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item) => {
              const currentQty = getItemCartQuantity(item.id);
              const cartItemId = getItemCartId(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-ivory rounded-2xl overflow-hidden border border-gold/25 hover:border-gold hover:shadow-royal transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image + Badges */}
                  <div 
                    className="relative h-48 bg-forest-900 overflow-hidden cursor-pointer" 
                    onClick={() => setSelectedItemForModal(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>

                    {/* Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      {item.isBestseller && (
                        <span className="bg-amber-600/90 backdrop-blur-sm text-ivory text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow">
                          <Flame className="w-2.5 h-2.5" />
                          <span>Bestseller</span>
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="bg-forest-900/90 backdrop-blur-sm text-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/40 flex items-center space-x-1 shadow font-royal">
                          <Crown className="w-2.5 h-2.5 text-gold" />
                          <span>Chef Special</span>
                        </span>
                      )}
                      {item.isJainAvailable && (
                        <span className="bg-emerald-800/90 backdrop-blur-sm text-ivory text-[10px] font-medium px-2 py-0.5 rounded-full shadow font-sans">
                          Jain Option
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-ivory/95 p-1 rounded-md shadow">
                      <span className="veg-badge">
                        <span className="veg-badge-circle"></span>
                      </span>
                    </div>

                    {/* Spice Meter & Portion note */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-ivory text-xs">
                      <span className="bg-forest-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-sans">
                        Spice: <strong className="text-gold">{item.spiceLevel}</strong>
                      </span>
                      <span className="text-[10px] text-ivory/80 font-medium">
                        ⏱ {item.prepTime}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                    <div>
                      <div className="text-[11px] text-gold-dark font-sans font-semibold">
                        {item.hindiName}
                      </div>
                      <h3 
                        onClick={() => setSelectedItemForModal(item)}
                        className="font-royal text-base sm:text-lg font-bold text-forest group-hover:text-gold-dark transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-charcoal/75 line-clamp-2 mt-1 leading-relaxed font-sans">
                        {item.description}
                      </p>
                      <div className="mt-2 text-[10px] text-charcoal/50 italic font-sans">
                        {item.portion}
                      </div>
                    </div>

                    {/* Bottom Price & Add to Cart Controls */}
                    <div className="pt-3 border-t border-gold/15 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xl font-royal font-bold text-forest">₹{item.price}</span>
                        <span className="text-[10px] text-charcoal/50 block font-sans">Net Price</span>
                      </div>

                      {currentQty > 0 ? (
                        <div className="flex items-center space-x-2 bg-forest text-ivory rounded-xl p-1 shadow">
                          <button
                            onClick={() => updateQuantity(cartItemId, -1)}
                            className="w-8 h-8 rounded-lg bg-forest-800 hover:bg-forest-700 flex items-center justify-center text-ivory transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-royal font-bold text-sm px-1.5 text-gold">
                            {currentQty}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItemId, 1)}
                            className="w-8 h-8 rounded-lg bg-forest-800 hover:bg-forest-700 flex items-center justify-center text-ivory transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="px-4 py-2.5 rounded-xl bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-transform active:scale-95 flex items-center space-x-1.5 shadow-sm cursor-pointer border border-gold/30 min-h-[40px] font-royal"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                          <span>Add to Thali</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
