import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  HeartHandshake, 
  Flame, 
  ShieldCheck, 
  CheckCircle,
  Wheat
} from 'lucide-react';

export const Heritage = () => {
  const pillars = [
    {
      icon: Flame,
      title: "Pure Cow Desi Ghee",
      description: "We use only fragrant, unadulterated cow ghee for our baatis, dals, and royal mithais, ensuring authentic Marwari warmth and wholesome nourishment."
    },
    {
      icon: ShieldCheck,
      title: "100% Vaishno & Jain Purity",
      description: "Our kitchen is strictly vegetarian with zero compromise. We feature dedicated Jain culinary preparations without onion, garlic, or root vegetables."
    },
    {
      icon: Wheat,
      title: "Stone-Ground Spices & Chakki Atta",
      description: "Mathania red chillies, Hathras hing, and freshly roasted whole spices ground daily to preserve therapeutic essential oils and memorable aroma."
    },
    {
      icon: HeartHandshake,
      title: "Atithi Devo Bhava Warmth",
      description: "For over 30 years, every customer stepping into our bhojnalaya or ordering to their home is welcomed like royal family with generous care."
    }
  ];

  return (
    <section id="about" className="py-20 bg-cream/60 border-t border-gold/20 relative">
      <div className="hallmark-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-sans text-forest font-semibold">
            <span>Our 30-Year Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
            Tradition of Pure Vaishno Hospitality
          </h2>
          <p className="font-sans text-charcoal/80 text-xs sm:text-sm leading-relaxed">
            Founded in 1994, Gahlot Vaishno Bhojnalaya brings the royal feasts of Rajasthan to everyday dining with uncompromised hygiene and pure devotion.
          </p>
        </div>

        {/* Story Grid with Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Text Story (6 cols) */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="bg-ivory p-7 rounded-2xl border border-gold/30 shadow-soft-card relative">
              <span className="text-4xl font-serif text-gold/30 absolute top-4 left-5" aria-hidden="true">“</span>
              <p className="text-sm sm:text-base font-serif italic text-forest leading-relaxed relative z-10 pt-2">
                In our kitchen, food is not merely prepared; it is an offering of purity. True Rajasthani flavors require the slow simmer of lentils, wood-fired roasting of baatis, and the golden fragrance of pure cow desi ghee.
              </p>
              <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-forest text-sm">The Gahlot Family</h3>
                  <p className="text-[11px] text-charcoal/60">Custodians of Traditional Marwari Bhojan</p>
                </div>
                <span className="text-xs font-semibold text-gold-dark font-sans">Estd. 1994</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans">
              From travelers craving a comforting highway meal to families celebrating milestones with a grand Maharaja Thali, our tables have welcomed generations of patrons across Rajasthan.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
              <div className="flex items-center space-x-1.5 font-medium text-forest bg-forest/5 px-3 py-1.5 rounded-lg border border-forest/10">
                <CheckCircle className="w-3.5 h-3.5 text-forest" />
                <span>Zero Artificial Colors or MSG</span>
              </div>
              <div className="flex items-center space-x-1.5 font-medium text-forest bg-forest/5 px-3 py-1.5 rounded-lg border border-forest/10">
                <CheckCircle className="w-3.5 h-3.5 text-forest" />
                <span>RO Purified Cooking Water</span>
              </div>
              <div className="flex items-center space-x-1.5 font-medium text-forest bg-forest/5 px-3 py-1.5 rounded-lg border border-forest/10">
                <CheckCircle className="w-3.5 h-3.5 text-forest" />
                <span>Dedicated Jain Kitchen Preparations</span>
              </div>
            </div>
          </div>

          {/* Right Visual Collage (6 cols) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-soft-card border border-gold/30 group">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
                    alt="Authentic Dal Baati Churma in Pure Desi Ghee"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2.5 bg-ivory text-center">
                    <p className="font-serif font-bold text-xs text-forest">Wood-Fired Baatis</p>
                    <p className="text-[10px] text-charcoal/60">Drenched in Hot Cow Ghee</p>
                  </div>
                </div>

                <div className="bg-forest text-ivory p-5 rounded-2xl border border-gold text-center space-y-1">
                  <span className="font-serif text-3xl font-bold text-gold">30+</span>
                  <p className="font-serif text-xs font-semibold">Years of Culinary Heritage</p>
                  <p className="text-[10px] text-ivory/70">Preserving Royal Recipes</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="bg-gold-pale p-5 rounded-2xl border border-gold/40 text-center space-y-1">
                  <span className="font-serif text-3xl font-bold text-forest">100%</span>
                  <p className="font-serif text-xs font-semibold text-forest">Shuddh Vaishno</p>
                  <p className="text-[10px] text-charcoal/70">Certified Pure Vegetarian</p>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-soft-card border border-gold/30 group">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
                    alt="Slow Cooked Royal Curries and Freshly Rolled Rotis"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2.5 bg-ivory text-center">
                    <p className="font-serif font-bold text-xs text-forest">Overnight Simmered Dals</p>
                    <p className="text-[10px] text-charcoal/60">Tempered in Hathras Hing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={idx} 
                className="bg-ivory p-5 rounded-2xl border border-gold/25 hover:border-gold hover:shadow-royal transition-all duration-200 space-y-2 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-forest/10 border border-gold/40 flex items-center justify-center text-forest">
                  <IconComponent className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest">
                  {pillar.title}
                </h3>
                <p className="text-[11px] text-charcoal/75 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
