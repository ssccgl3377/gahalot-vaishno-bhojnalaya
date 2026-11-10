import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Wheat, 
  HeartHandshake, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const CulinaryRitual = () => {
  const [activeStep, setActiveStep] = useState(0);

  const ritualSteps = [
    {
      step: '01',
      title: 'The Wood-Fired Hearth',
      hindi: 'अंगारों पर सिकाई',
      desc: 'Whole wheat flour kneaded with carom seeds and rock salt is hand-shaped and roasted over smoldering embers until a firm, fragrant golden-brown crust forms.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Dal_Baati_2.jpg',
      highlight: 'Slow-baked over traditional embers'
    },
    {
      step: '02',
      title: 'Desi Cow Ghee Immersion',
      hindi: 'शुद्ध देसी घी में स्नान',
      desc: 'While piping hot, each baati is gently crushed by hand and fully immersed into hot, golden cow desi ghee until every pore absorbs the wholesome richness.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Rajasthani_Thali_at_Rajdhani.jpg',
      highlight: '100% Unadulterated Cow Ghee'
    },
    {
      step: '03',
      title: 'Panchratna Dal Confluence',
      hindi: 'पंचमेल दाल का संगम',
      desc: 'Five sacred lentils slow-simmered for hours and tempered with pungent Hathras hing, cumin, and fiery Mathania red chillies are poured steaming over the crushed baati.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Rajasthani_Thali_from_The_Rajdhani_Restaurant.jpg',
      highlight: 'Double-tempered with Hathras Hing'
    },
    {
      step: '04',
      title: 'Almond Churma Harmony',
      hindi: 'बादाम इलायची चूरमा',
      desc: 'To balance the fiery tadka, coarse roasted wheat sweet churned with desi ghee, green cardamom, and sliced Kashmiri almonds completes the divine feast.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Dal_Baati_2.jpg',
      highlight: 'Pure Cardamom & Badam Giri'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-forest text-ivory relative border-t-2 border-gold/40 overflow-hidden">
      
      {/* Background Jali Pattern Overlay */}
      <div className="absolute inset-0 bg-jali-dark opacity-30 pointer-events-none" aria-hidden="true"></div>

      <div className="hallmark-container relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-sans text-gold font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-gold" />
            <span className="font-royal">Scroll-Craft Ritual Beat</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight tracking-wide">
            The 4-Step Sacred Dining Ritual
          </h2>
          <p className="text-xs sm:text-sm text-ivory/80 font-sans max-w-xl mx-auto leading-relaxed">
            In Rajasthan, dining is not merely eating—it is a traditional ceremony practiced across royal courts for centuries.
          </p>
        </div>

        {/* Step Navigation Bar (Smartphone & Desktop Adaptive) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8">
          {ritualSteps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3 sm:p-4 rounded-2xl text-left transition-all border cursor-pointer min-h-[44px] ${
                  isActive 
                    ? 'bg-gold text-forest-950 border-gold shadow-royal-gold scale-[1.02]' 
                    : 'bg-forest-900/80 text-ivory/80 border-gold/30 hover:bg-forest-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-forest-950' : 'text-gold'}`}>
                    {s.step}
                  </span>
                  <span className={`text-[10px] font-sans ${isActive ? 'text-forest-900 font-semibold' : 'text-ivory/60'}`}>
                    {s.hindi}
                  </span>
                </div>
                <h4 className="font-royal text-xs sm:text-sm font-bold leading-tight">
                  {s.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display */}
        <div className="bg-forest-900/90 rounded-3xl p-5 sm:p-8 border-2 border-gold/40 shadow-royal grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
          
          {/* Left Visual Image (6 cols) */}
          <div className="md:col-span-6 relative h-60 sm:h-80 rounded-2xl overflow-hidden border border-gold/30 shadow-lg">
            <img
              src={ritualSteps[activeStep].image}
              alt={ritualSteps[activeStep].title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent"></div>
            
            <div className="absolute top-3 left-3 bg-forest/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[11px] text-gold font-royal">
              {ritualSteps[activeStep].highlight}
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-ivory">
              <span className="text-[10px] text-gold uppercase tracking-wider block font-sans">
                Stage {ritualSteps[activeStep].step} of 04
              </span>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-ivory">
                {ritualSteps[activeStep].title}
              </h3>
            </div>
          </div>

          {/* Right Description & Story (6 cols) */}
          <div className="md:col-span-6 space-y-4 font-sans">
            <div className="space-y-1">
              <span className="text-gold text-xs font-semibold block font-royal">
                {ritualSteps[activeStep].hindi}
              </span>
              <h4 className="font-royal text-2xl font-bold text-ivory">
                {ritualSteps[activeStep].title}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed">
              {ritualSteps[activeStep].desc}
            </p>

            <div className="p-3.5 bg-forest-950/70 rounded-xl border border-gold/30 space-y-1">
              <span className="text-[11px] font-bold text-gold block font-royal">The Royal Taste Experience:</span>
              <p className="text-xs text-ivory/80 leading-snug">
                {activeStep === 0 && 'The crunchy exterior contrasts beautifully with the tender, aromatic inner crumb.'}
                {activeStep === 1 && 'Pure cow ghee infuses deep warmth, making the meal rich yet soothing and wholesome.'}
                {activeStep === 2 && 'Hing and Mathania spices stimulate digestion while delivering fiery Rajasthan flavors.'}
                {activeStep === 3 && 'Cardamom and almond sweetness calms the palate, leaving an unforgettable aftertaste.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
                className="inline-flex items-center space-x-2 text-xs font-bold text-gold hover:text-ivory transition-colors cursor-pointer py-2"
              >
                <span>Next Stage: {ritualSteps[(activeStep + 1) % 4].title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#menu"
                className="px-4 py-2 rounded-xl bg-gold text-forest-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow cursor-pointer font-royal"
              >
                Taste This Ritual
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
