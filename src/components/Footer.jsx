import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  Sparkles, 
  Phone, 
  MapPin, 
  MessageCircle, 
  QrCode, 
  Heart,
  ArrowUp
} from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-ivory border-t-2 border-gold/40 relative">
      {/* Decorative Jali Pattern Accent */}
      <div className="absolute inset-0 bg-jali-dark opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gold/20 text-left">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-forest border-2 border-gold flex items-center justify-center">
                <span className="font-serif text-gold font-bold text-xl">GV</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gold font-semibold block">
                  गहलोत वैष्णो भोजनालय
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
                  {RESTAURANT_INFO.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-ivory/75 max-w-md leading-relaxed font-sans">
              Rajasthan's benchmark for 100% Shuddh Pure Vegetarian culinary excellence. Serving authentic royal Marwari thalis, wood-fired baatis, and slow-cooked dals in pure cow desi ghee since 1994.
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <span className="veg-badge"><span className="veg-badge-circle"></span></span>
              <span className="text-xs text-gold font-medium">Certified 100% Vaishno & Jain Compliant</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-gold text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-ivory/80">
              <li>
                <a href="#home" className="hover:text-gold transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold transition-colors">Our Royal Menu</a>
              </li>
              <li>
                <a href="#thalis" className="hover:text-gold transition-colors">Maharaja Thalis</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors">Heritage & Story</a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-gold transition-colors">Table Reservation</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold transition-colors">Contact & Location</a>
              </li>
            </ul>
          </div>

          {/* Specialties (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-gold text-sm uppercase tracking-wider">
              Our Specialties
            </h4>
            <ul className="space-y-2 text-xs text-ivory/80">
              <li>Dal Baati Churma (Desi Ghee)</li>
              <li>Govind Gatte ki Sabzi</li>
              <li>Royal Marwari Ker Sangri</li>
              <li>Paneer Butter Masala</li>
              <li>Jain Shuddh Thali</li>
              <li>Kulhad Kesari Lassi</li>
            </ul>
          </div>

          {/* Contact & Payment Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-gold text-sm uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-ivory/80">
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-gold">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a 
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-semibold"
                >
                  WhatsApp: {RESTAURANT_INFO.formattedWhatsApp}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <QrCode className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>UPI: <code className="font-mono text-gold font-bold">{RESTAURANT_INFO.upiId}</code></span>
              </p>
              <p className="flex items-start space-x-2 pt-1 text-[11px] text-ivory/70 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span>3ML, Guru Gobind Singh Chowk, Sri Ganganagar, Rajasthan 335001</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <div>
            © {new Date().getFullYear()} <strong className="text-ivory font-medium">GAHLOT VAISHNO BHOJNALAYA</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px]">Crafted with devotion for royal vegetarian dining</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-forest-800 hover:bg-gold text-ivory hover:text-forest-950 transition-colors cursor-pointer border border-gold/30"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
