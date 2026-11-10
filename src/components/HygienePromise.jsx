import React from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Sparkles, 
  Thermometer, 
  PackageCheck,
  CheckCircle2
} from 'lucide-react';

export const HygienePromise = () => {
  const standards = [
    {
      icon: Droplets,
      title: "100% RO Purified Water",
      desc: "Every vegetable wash, curry base, dough kneading, and table drinking water uses multi-stage RO UV purification."
    },
    {
      icon: PackageCheck,
      title: "Eco-Friendly Tamper-Evident Packaging",
      desc: "High-grade food-safe containers with seal security, retaining piping hot heat from tandoor to your table."
    },
    {
      icon: Thermometer,
      title: "Hygienic Temperature Monitoring",
      desc: "Continuous kitchen temperature checks, sanitized stainless steel cookware, and daily chef health verifications."
    },
    {
      icon: ShieldCheck,
      title: "Zero Preservatives or Chemicals",
      desc: "No artificial food colorings, no MSG/ajinomoto, and no palm oil. Cooked fresh twice daily."
    }
  ];

  return (
    <section className="py-16 bg-forest text-ivory relative border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-2 text-gold font-sans text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Purity, Cleanliness & Trust</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
            Our 5-Star Kitchen Hygiene & Purity Promise
          </h2>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-xl mx-auto">
            We hold ourselves to the highest standards of cleanliness so you and your loved ones can dine with peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-forest-900/80 p-6 rounded-2xl border border-gold/30 hover:border-gold transition-colors text-left space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-gold">
                  {s.title}
                </h3>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
