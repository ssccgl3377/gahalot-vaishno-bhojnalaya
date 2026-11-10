import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { 
  Crown, 
  ArrowRight, 
  MessageCircle, 
  Flame, 
  ShieldCheck, 
  Star,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Hero = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle pointer depth for dimensional layering (Scroll-Craft hero depth)
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only run pointer tracking on larger screens to avoid mobile battery drain
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickAddMaharajaThali = () => {
    const maharajaThali = {
      id: 'thali-1',
      name: 'Maharaja Royal Rajasthani Thali',
      hindiName: 'महाराजा शाही राजस्थानी थाली',
      category: 'thali',
      price: 380,
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Rajasthani_Thali_at_Rajdhani.jpg',
      description: 'Grand Feast: Dal Baati Churma, Ker Sangri, Paneer Lababdar, Gatte, Kadhi, Missi Roti, Chaas & Malpua in Pure Desi Ghee.'
    };
    addToCart(maharajaThali, 1, { spice: 'Medium', note: 'Hero Quick Special' });
    setIsCartOpen(true);
  };

  return (
    <header id="home" className="relative overflow-hidden pt-6 pb-12 md:pt-12 md:pb-20 bg-cream">
      
      {/* Background Texture & Palace Ambient Glow */}
      <div className="absolute inset-0 bg-jali-pattern opacity-30 pointer-events-none" aria-hidden="true"></div>
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[700px] h-[550px] md:h-[700px] bg-gold/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * -0.5}px), calc(-50% + ${mouseOffset.y * -0.5}px))`
        }}
      ></div>

      <div className="relative hallmark-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Typography & Direct Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6 text-left z-10">
            
            {/* Untracked Body-Face Badge (Hallmark Rule 9) */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest/5 border border-gold/40 text-forest text-xs">
              <span className="veg-badge"><span className="veg-badge-circle"></span></span>
              <span className="font-sans font-medium text-forest-900 text-[11px] sm:text-xs">
                Estd. 1994 • Sri Ganganagar, Rajasthan • 100% Shuddh Cow Desi Ghee
              </span>
            </div>

            {/* Royal Headline with Marcellus Typography */}
            <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-bold text-forest leading-[1.1] tracking-tight">
              Royal Rajasthani Feasts in Pure Desi Ghee
            </h1>

            {/* 12-Word Subtitle (Hallmark Rule 13) */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal/85 max-w-xl leading-relaxed">
              Authentic wood-fired thalis and slow-cooked dals prepared with thirty years of devotion.
            </p>

            {/* Trust Badges: Grid on Mobile, Row on Desktop */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-charcoal font-sans">
              <div className="flex items-center space-x-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-ivory border border-gold/30 shadow-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">100% Vaishno</span>
              </div>
              <div className="flex items-center space-x-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-ivory border border-gold/30 shadow-sm font-medium">
                <Flame className="w-4 h-4 text-gold-dark flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">Pure Cow Ghee</span>
              </div>
              <div className="flex items-center space-x-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-ivory border border-gold/30 shadow-sm font-medium">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">4.9★ (15K+ Reviews)</span>
              </div>
            </div>

            {/* Primary Action Buttons (Thumb-friendly & Accessible) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              <button
                onClick={handleScrollToMenu}
                className="px-6 py-3.5 rounded-xl bg-forest text-ivory font-royal text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-transform active:scale-95 shadow-royal flex items-center justify-center space-x-2 border border-gold/40 cursor-pointer min-h-[48px]"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Namaste Gahlot Vaishno Bhojnalaya! I would like to order fresh food.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-ivory text-forest font-sans text-xs font-bold hover:bg-gold-pale transition-transform active:scale-95 shadow-sm border border-gold/60 flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Order: {RESTAURANT_INFO.phone}</span>
              </a>

            </div>

            {/* Live Kitchen & UPI Status */}
            <div className="text-[11px] text-charcoal/70 flex items-center space-x-2 pt-1 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
              <span>Kitchen Open • Express Packaging • UPI ID: <code className="font-mono font-bold text-forest bg-gold/15 px-1 py-0.5 rounded">{RESTAURANT_INFO.upiId}</code></span>
            </div>

          </div>

          {/* Right Column: Dimensional Layered Showcase with Verified Image (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div 
              className="relative mx-auto max-w-md lg:max-w-none transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`
              }}
            >
              
              {/* Outer Golden Border Framing */}
              <div className="relative p-2.5 sm:p-3 rounded-3xl bg-gradient-to-b from-gold/40 via-gold/15 to-transparent border-2 border-gold/40 shadow-royal">
                
                {/* Visual Image Plate with Verified Authentic Rajasthani Thali */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-forest-900 group">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/94/Rajasthani_Thali_at_Rajdhani.jpg"
                    alt="Authentic Maharaja Royal Rajasthani Thali in Pure Desi Ghee at Gahlot Vaishno Bhojnalaya"
                    className="w-full h-72 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent"></div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 flex items-center space-x-1.5 text-ivory text-xs">
                    <Crown className="w-3.5 h-3.5 text-gold" />
                    <span className="font-royal font-bold text-gold text-[11px]">Maharaja Signature Feast</span>
                  </div>

                  {/* Pure Veg Badge */}
                  <div className="absolute top-3 right-3 bg-ivory/95 p-1 rounded-md shadow">
                    <span className="veg-badge"><span className="veg-badge-circle"></span></span>
                  </div>

                  {/* Bottom Dish Information */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-ivory text-left">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-gold font-sans font-semibold uppercase tracking-wider block font-royal">
                          100% Shuddh Desi Ghee
                        </span>
                        <h2 className="font-royal text-lg sm:text-2xl font-bold text-ivory">
                          Maharaja Royal Thali
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-ivory/60 line-through">₹450</span>
                        <div className="text-xl sm:text-2xl font-bold font-royal text-gold">₹380</div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-ivory/80 line-clamp-2 mt-1 font-sans">
                      Dal Baati Churma, Ker Sangri, Shahi Gatte, Paneer Lababdar, Missi Roti & Kesari Malpua.
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={handleQuickAddMaharajaThali}
                        className="flex-1 py-2.5 rounded-xl bg-gold text-forest-950 font-royal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all text-center shadow-md cursor-pointer active:scale-95 min-h-[40px]"
                      >
                        Order This Thali • ₹380
                      </button>
                      <button
                        onClick={handleScrollToMenu}
                        className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-ivory text-xs font-medium border border-white/20 transition-all cursor-pointer min-h-[40px]"
                      >
                        Menu
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Quote Card (Desktop only) */}
              <div 
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-ivory p-3.5 rounded-2xl shadow-xl border border-gold/40 max-w-[240px] hidden sm:block transition-transform duration-300"
                style={{
                  transform: `translate(${mouseOffset.x * -0.7}px, ${mouseOffset.y * -0.7}px)`
                }}
              >
                <div className="flex items-center space-x-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                  <span className="text-[10px] text-charcoal/60 ml-1 font-bold">5.0</span>
                </div>
                <p className="text-[11px] text-charcoal/80 italic leading-snug">
                  "The fragrance of pure desi ghee and wood-baked baati is unforgettable."
                </p>
                <div className="text-[10px] text-gold-dark font-medium mt-1 font-royal">
                  — Food Critic Review, Rajasthan
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </header>
  );
};
