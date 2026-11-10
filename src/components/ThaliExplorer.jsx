import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Sparkles, 
  Crown, 
  ShoppingBag, 
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';

export const ThaliExplorer = () => {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  const thaliComponents = [
    {
      id: 'raj-1',
      title: 'Wood-Fired Baati in Cow Ghee',
      hindi: 'देसी घी में डूबी बाटी',
      subtitle: 'The Heart of Marwar',
      description: 'Hand-shaped whole wheat dough baked slowly over smoldering wood embers, cracked open by hand and drenched in hot, golden pure cow desi ghee.',
      spices: 'Ajwain, rock salt, coarse whole wheat, pure cow ghee',
      pairing: 'Best enjoyed crushed and mixed with steaming Panchratna Dal',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Dal_Baati_2.jpg',
      price: 220
    },
    {
      id: 'dal-3',
      title: 'Dal Panchratna (5-Lentil Simmer)',
      hindi: 'पंचमेल शाही दाल तड़का',
      subtitle: 'Charcoal Slow-Cooked',
      description: 'A harmonious blend of five royal lentils (Moong, Chana, Toor, Masoor, and Urad) slow-cooked for hours and tempered twice with pungent Hathras hing, cumin, and Mathania chillies.',
      spices: 'Hathras hing, clove, whole cinnamon, Mathania red chilli',
      pairing: 'Poured piping hot directly over crushed baatis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Rajasthani_Thali_from_The_Rajdhani_Restaurant.jpg',
      price: 180
    },
    {
      id: 'raj-3',
      title: 'Marwari Ker Sangri',
      hindi: 'शाही केर सांगरी',
      subtitle: 'The Desert Treasure',
      description: 'Rare wild desert berries (Ker) and desert beans (Sangri) handpicked from Thar desert shrubs, sun-dried, and cooked with dry amchur, raisins, and mustard spices.',
      spices: 'Mathania chilli, amchur, whole mustard, kishmish',
      pairing: 'Unmatched pairing with Missi Roti or Bajra Roti',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Ker_Sangri.jpg',
      price: 240
    },
    {
      id: 'raj-2',
      title: 'Shahi Govind Gatte ki Sabzi',
      hindi: 'शाही गोविंद गट्टे',
      subtitle: 'Royal Court Recipe',
      description: 'Tender gram flour dumplings stuffed with rich mawa, crumbled paneer, and roasted dry fruits, gently poached and served in a spiced, slow-whisked curd gravy.',
      spices: 'Hung curd, fenugreek, coriander seeds, mawa',
      pairing: 'A staple of royal feasts across Jodhpur and Jaipur palaces',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Gatte_ki_sabzi_served_with_aamras_and_garlic_chutney.jpg',
      price: 190
    },
    {
      id: 'des-3',
      title: 'Desi Ghee Badam Churma',
      hindi: 'देसी घी बादाम चूरमा',
      subtitle: 'Sweet Harmony',
      description: 'Coarsely ground roasted wheat muthiyas churned with copious amounts of hot desi cow ghee, fragrant green cardamom, and crunchy slivers of Kashmiri almonds.',
      spices: 'Green cardamom, crushed almonds, organic bura sugar, desi ghee',
      pairing: 'Eaten alongside dal baati to balance the spicy tadka',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Dal_Baati_2.jpg',
      price: 120
    },
    {
      id: 'des-4',
      title: 'Kesari Malpua with Rabdi',
      hindi: 'केसरी मालपुआ रबड़ी',
      subtitle: 'Grand Finale',
      description: 'Crisp-edged, porous saffron pancakes fried in desi ghee, steeped in rose-cardamom syrup, and topped with thick, slow-reduced creamy buffalo milk rabdi.',
      spices: 'Kashmiri saffron, cardamom, reduced milk rabdi, pistachio',
      pairing: 'The royal crown dessert concluding the Maharaja Thali feast',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Malpua_sweet_in_Kolkata%2C_India.jpg',
      price: 110
    }
  ];

  const current = thaliComponents[activeIndex];

  const handleQuickAdd = () => {
    addToCart({
      id: current.id,
      name: current.title,
      hindiName: current.hindi,
      price: current.price,
      image: current.image,
      category: 'rajasthani',
      description: current.description
    }, 1);
  };

  return (
    <section className="py-16 md:py-24 bg-ivory relative border-t border-gold/20 overflow-hidden">
      
      {/* Background Decorative Arch Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div className="hallmark-container relative">
        
        {/* Section Header with Royal Typography */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-sans text-forest font-semibold">
            <Crown className="w-3.5 h-3.5 text-gold-dark" />
            <span className="font-royal">Royal Culinary Scrutiny</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight tracking-wide">
            Anatomy of the Royal Thali
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed">
            Every element in our Maharaja Thali has a three-decade heritage. Select a dish below to explore its authentic ingredients and preparation secrets.
          </p>
        </div>

        {/* Mobile Horizontal Carousel Tabs (Smartphone Adaptive) */}
        <div className="lg:hidden flex items-center space-x-2 overflow-x-auto pb-3 mb-6 no-scrollbar snap-x">
          {thaliComponents.map((comp, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={comp.id}
                onClick={() => setActiveIndex(idx)}
                className={`snap-center flex-shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-2 cursor-pointer ${
                  isActive 
                    ? 'bg-forest text-ivory border-gold shadow-md' 
                    : 'bg-cream text-charcoal border-gold/30 hover:bg-gold/10'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  isActive ? 'bg-gold text-forest-950' : 'bg-forest/10 text-forest'
                }`}>
                  {idx + 1}
                </span>
                <span className="whitespace-nowrap font-royal">{comp.title.split(' ')[0]} {comp.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Scrollytelling Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-gold/30 shadow-royal">
          
          {/* Left Column: Component Selector Tabs (Desktop 5 cols) */}
          <div className="hidden lg:block lg:col-span-5 space-y-2 text-left">
            <span className="text-[11px] font-sans font-bold text-gold-dark uppercase tracking-wider block mb-2 font-royal">
              Select Royal Element
            </span>

            <div className="space-y-2">
              {thaliComponents.map((comp, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-forest text-ivory border-gold shadow-md scale-[1.02]' 
                        : 'bg-ivory/80 text-charcoal hover:bg-gold/10 border-gold/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-serif text-xs font-bold ${
                        isActive ? 'bg-gold text-forest-950' : 'bg-forest/10 text-forest'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-royal font-bold text-sm leading-snug">
                          {comp.title}
                        </h4>
                        <span className={`text-[10px] font-sans ${isActive ? 'text-gold' : 'text-charcoal/60'}`}>
                          {comp.hindi}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-gold' : 'text-charcoal/40'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Stage with Verified Dish Image (7 cols) */}
          <div className="lg:col-span-7 bg-ivory p-5 sm:p-7 rounded-2xl border border-gold/30 shadow-soft-card text-left space-y-4">
            
            {/* Visual Image Banner with Pure Veg mark */}
            <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden bg-forest-900 shadow group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent"></div>

              <div className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 flex items-center space-x-1.5 text-xs text-gold">
                <Sparkles className="w-3 h-3 text-gold" />
                <span className="font-sans font-medium text-[11px]">{current.subtitle}</span>
              </div>

              <div className="absolute top-3 right-3 bg-ivory/95 p-1 rounded-md shadow">
                <span className="veg-badge"><span className="veg-badge-circle"></span></span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-ivory">
                <span className="text-[11px] text-gold font-sans font-semibold block">
                  {current.hindi}
                </span>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-ivory">
                  {current.title}
                </h3>
              </div>
            </div>

            {/* Preparation Details */}
            <div className="space-y-3 font-sans text-xs">
              <p className="text-charcoal/85 text-xs sm:text-sm leading-relaxed">
                {current.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 bg-cream rounded-xl border border-gold/20">
                  <span className="font-bold text-forest block text-[11px] mb-0.5 font-royal">Key Aromatics & Spices:</span>
                  <span className="text-charcoal/70 text-[11px] leading-snug">{current.spices}</span>
                </div>
                <div className="p-3 bg-cream rounded-xl border border-gold/20">
                  <span className="font-bold text-forest block text-[11px] mb-0.5 font-royal">Heritage Serving Note:</span>
                  <span className="text-charcoal/70 text-[11px] leading-snug">{current.pairing}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-gold/20 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-charcoal/60 uppercase tracking-wider font-semibold block">A La Carte</span>
                <span className="font-royal text-xl sm:text-2xl font-bold text-forest">₹{current.price}</span>
              </div>

              <button
                onClick={handleQuickAdd}
                className="py-2.5 px-4 sm:px-5 rounded-xl bg-forest hover:bg-forest-800 text-ivory text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md flex items-center space-x-2 border border-gold/30 cursor-pointer min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                <span>Add to Basket</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
