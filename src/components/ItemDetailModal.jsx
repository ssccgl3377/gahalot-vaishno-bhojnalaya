import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ShoppingBag,
  Star,
  Clock
} from 'lucide-react';

export const ItemDetailModal = () => {
  const { selectedItemForModal, setSelectedItemForModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [isJain, setIsJain] = useState(false);
  const [extraGhee, setExtraGhee] = useState(false);
  const [cookingNote, setCookingNote] = useState('');

  if (!selectedItemForModal) return null;

  const item = selectedItemForModal;
  const extraCost = extraGhee ? 35 : 0;
  const totalItemPrice = (item.price + extraCost) * quantity;

  const handleClose = () => {
    setSelectedItemForModal(null);
    setQuantity(1);
    setCookingNote('');
    setExtraGhee(false);
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, {
      spice: spiceLevel,
      isJainPrep: isJain,
      extraGheeAdded: extraGhee,
      specialInstructions: cookingNote
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-ivory w-full max-w-lg rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-forest-950/70 text-ivory hover:bg-forest flex items-center justify-center backdrop-blur-md transition-colors border border-gold/40 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-56 bg-forest-900 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent"></div>

          <div className="absolute bottom-4 left-5 right-5 text-ivory text-left">
            <div className="flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="veg-badge"><span className="veg-badge-circle"></span></span>
              <span>100% Vaishno • {item.hindiName}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-ivory leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-left flex-1 text-charcoal">
          
          {/* Detailed Description */}
          <div className="space-y-1">
            <p className="text-sm text-charcoal/85 leading-relaxed">
              {item.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-charcoal/60 pt-1">
              <span>🍽 {item.portion}</span>
              <span>⏱ Prep Time: {item.prepTime}</span>
            </div>
          </div>

          {/* Customization: Spice Level */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-forest uppercase tracking-wider">
              Choose Spice Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild', 'Medium', 'Spicy (Rajasthani)'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpiceLevel(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    spiceLevel === lvl
                      ? 'bg-forest text-ivory border-forest shadow-sm'
                      : 'bg-cream text-charcoal/70 border-gold/30 hover:bg-gold/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Customization: Jain preparation if available */}
          {item.isJainAvailable && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">Jain Preparation</span>
                  <span className="text-[11px] text-emerald-700">Strictly without onion, garlic, or root vegetables</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isJain}
                onChange={(e) => setIsJain(e.target.checked)}
                className="w-4 h-4 text-emerald-700 rounded border-emerald-300 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          )}

          {/* Add-on: Extra Pure Cow Desi Ghee */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-cream border border-gold/30">
            <div>
              <span className="text-xs font-bold text-forest block">Extra Pure Cow Desi Ghee Topping</span>
              <span className="text-[11px] text-charcoal/60">Poured piping hot over dish</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-gold-dark">+₹35</span>
              <input
                type="checkbox"
                checked={extraGhee}
                onChange={(e) => setExtraGhee(e.target.checked)}
                className="w-4 h-4 text-gold rounded border-gold/40 focus:ring-gold cursor-pointer"
              />
            </div>
          </div>

          {/* Special Cooking Note */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-forest uppercase tracking-wider">
              Special Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              value={cookingNote}
              onChange={(e) => setCookingNote(e.target.value)}
              placeholder="e.g. Less oil, pack chutney separately, extra crispy..."
              className="w-full p-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:outline-none focus:border-gold"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-cream/90 border-t border-gold/20 flex items-center justify-between gap-4">
          
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-ivory rounded-xl p-1.5 border border-gold/30">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-cream hover:bg-gold/20 flex items-center justify-center text-forest transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-serif font-bold text-base px-2 text-forest">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-cream hover:bg-gold/20 flex items-center justify-center text-forest transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 rounded-xl bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-all shadow-md flex items-center justify-center space-x-2 border border-gold/30 cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-gold" />
            <span>Add to Order • ₹{totalItemPrice}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
