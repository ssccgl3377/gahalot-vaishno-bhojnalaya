import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Mail, 
  QrCode, 
  ExternalLink,
  Navigation,
  Compass
} from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-cream relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-gold-dark font-sans text-xs uppercase tracking-widest font-bold">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Visit Us or Get in Touch</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
            Find Us in the Heart of Rajasthan
          </h2>
          <p className="font-sans text-charcoal/70 text-sm sm:text-base">
            Easily accessible with ample parking, AC dining halls, and fast delivery coverage across the city.
          </p>
        </div>

        {/* 2-Column Info & Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-ivory p-8 rounded-3xl border border-gold/30 shadow-royal flex flex-col justify-between text-left space-y-6">
            
            <div className="space-y-6">
              <div className="border-b border-gold/20 pb-4">
                <span className="text-xs uppercase font-bold text-gold-dark tracking-widest font-sans">
                  Restaurant Location
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest mt-1">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  100% Pure Vegetarian Rajasthani Dining & Online Delivery
                </p>
              </div>

              {/* Detail Items */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-forest/10 border border-gold/40 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">Address</span>
                    <p className="text-charcoal/80 leading-relaxed mt-0.5">
                      {RESTAURANT_INFO.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-forest/10 border border-gold/40 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">Call For Orders & Tables</span>
                    <a 
                      href={`tel:${RESTAURANT_INFO.phone}`} 
                      className="text-forest hover:text-gold-dark font-bold text-sm block mt-0.5"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-forest/10 border border-gold/40 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">Official WhatsApp Ordering</span>
                    <a 
                      href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-emerald-800 hover:text-emerald-900 font-bold text-sm block mt-0.5"
                    >
                      {RESTAURANT_INFO.formattedWhatsApp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-forest/10 border border-gold/40 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <QrCode className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">UPI Merchant ID</span>
                    <code className="text-xs font-mono font-bold text-forest bg-gold/15 px-2 py-0.5 rounded inline-block mt-0.5">
                      {RESTAURANT_INFO.upiId}
                    </code>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-forest/10 border border-gold/40 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">Dining & Kitchen Timings</span>
                    <p className="text-charcoal/80 mt-0.5 font-medium">
                      {RESTAURANT_INFO.timing}
                    </p>
                    <span className="inline-flex items-center space-x-1.5 text-[11px] text-emerald-700 font-semibold mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Open Now For Lunch & Dinner</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex-1 py-3 px-4 rounded-xl bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-colors text-center flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Hello Gahlot Vaishno Bhojnalaya! I want to inquire or place an order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors text-center flex items-center justify-center space-x-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-gold/30 shadow-royal relative min-h-[400px] flex flex-col justify-between bg-forest-900 group">
            
            {/* Background Map Imagery / Stylized Map View */}
            <img
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"
              alt="Rajasthan Royal Heritage Location"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/40"></div>

            {/* Top Map Card Overlay */}
            <div className="relative z-10 p-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-forest-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40 text-gold text-xs font-bold">
                <Navigation className="w-3.5 h-3.5 text-gold" />
                <span>Sri Ganganagar, Rajasthan</span>
              </div>
            </div>

            {/* Bottom Direction Card Overlay */}
            <div className="relative z-10 p-6 sm:p-8 text-left text-ivory space-y-4">
              <div className="bg-forest-900/90 backdrop-blur-md p-5 rounded-2xl border border-gold/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-lg text-ivory">
                    Visiting Gahlot Vaishno Bhojnalaya
                  </h4>
                  <span className="text-xs bg-gold text-forest-950 font-bold px-2 py-0.5 rounded">
                    Prime Location
                  </span>
                </div>
                <p className="text-xs text-ivory/80 leading-relaxed font-sans">
                  Conveniently situated at 3ML, Guru Gobind Singh Chowk, Sri Ganganagar, with dedicated parking and a spacious pure vegetarian AC family dining hall.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-gold">
                  <span>✓ Valet Parking Available</span>
                  <span>•</span>
                  <span>✓ AC Family Hall</span>
                  <span>•</span>
                  <span>✓ Clean Restrooms</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${RESTAURANT_INFO.googleMapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-5 rounded-xl bg-gold hover:bg-gold-light text-forest-950 font-sans text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Navigation className="w-4 h-4 text-forest-950" />
                  <span>Get Driving Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-forest-950" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
