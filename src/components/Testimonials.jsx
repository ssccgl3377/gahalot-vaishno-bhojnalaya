import React from 'react';
import { TESTIMONIALS, RESTAURANT_INFO } from '../data/menuData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-20 bg-cream relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-gold-dark font-sans text-xs uppercase tracking-widest font-bold">
            <span className="w-5 h-px bg-gold"></span>
            <span>Voices of Our Patrons</span>
            <span className="w-5 h-px bg-gold"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
            Cherished by Families & Travelers Alike
          </h2>
          <p className="font-sans text-charcoal/70 text-sm sm:text-base">
            Rated <strong className="text-forest font-bold">4.9 out of 5</strong> across Google & TripAdvisor with over 15,000+ satisfied guests.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-ivory p-7 rounded-3xl border border-gold/30 shadow-soft-card hover:shadow-royal hover:border-gold transition-all duration-300 flex flex-col justify-between text-left relative group"
            >
              <Quote className="w-8 h-8 text-gold/30 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                  <span className="text-xs font-bold text-charcoal/50 ml-1">5.0</span>
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-charcoal/85 text-sm sm:text-base leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-gold/15 flex items-center space-x-3 mt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold/40 flex-shrink-0"
                />
                <div>
                  <h4 className="font-serif font-bold text-forest text-sm flex items-center space-x-1.5">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" title="Verified Customer" />
                  </h4>
                  <p className="text-[11px] text-charcoal/60 leading-tight">
                    {t.role}
                  </p>
                  <span className="text-[10px] text-gold-dark font-medium">{t.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Live Google Review Bar */}
        <div className="mt-12 bg-ivory/80 border border-gold/30 rounded-2xl p-4 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-forest text-gold font-serif font-bold flex items-center justify-center text-sm">
              4.9
            </div>
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs text-charcoal/80 font-medium">Over 15,400+ Verified Customer Ratings</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Namaste! I would like to share my feedback / order food.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-forest hover:text-gold-dark underline"
          >
            Leave Your Review on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
