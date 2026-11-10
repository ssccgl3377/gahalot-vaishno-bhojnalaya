import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  Sparkles,
  MessageCircle
} from 'lucide-react';

export const Navbar = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Menu', href: '#menu' },
    { name: 'Royal Thalis', href: '#thalis' },
    { name: 'Heritage', href: '#about' },
    { name: 'Reservations', href: '#reservations' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-forest text-ivory text-xs py-2 px-4 border-b border-gold/30">
        <div className="hallmark-container flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-gold font-medium">
              <span className="veg-badge">
                <span className="veg-badge-circle"></span>
              </span>
              <span>100% Shuddh Desi Ghee Vaishno Bhojan</span>
            </span>
            <span className="hidden md:inline-block text-gold/30">•</span>
            <span className="hidden md:flex items-center space-x-1 text-ivory/80">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{RESTAURANT_INFO.timing}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-sans">
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`} 
              className="flex items-center space-x-1 text-ivory hover:text-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span className="font-semibold">{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="text-gold/40">•</span>
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Namaste Gahlot Vaishno Bhojnalaya, I would like to place an order or enquire.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gold hover:text-ivory transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-cream/95 backdrop-blur-md shadow-royal border-b border-gold/30 py-2.5' 
            : 'bg-cream border-b border-forest/10 py-3.5'
        }`}
      >
        <div className="hallmark-container flex items-center justify-between">
          
          {/* Brand Mark & Typography */}
          <a 
            href="#home" 
            className="flex items-center space-x-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center border-2 border-gold shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="font-serif text-gold font-bold text-base tracking-wider">GV</span>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-semibold text-gold font-sans">
                  गहलोत वैष्णो भोजनालय
                </span>
                <span className="veg-badge" title="Certified Pure Veg">
                  <span className="veg-badge-circle"></span>
                </span>
              </div>
              <span className="font-serif text-base sm:text-lg font-bold text-forest tracking-wide leading-tight block">
                GAHLOT VAISHNO BHOJNALAYA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Hallmark Rule 9: body face, sentence case) */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="font-sans text-xs font-semibold text-charcoal hover:text-gold transition-colors relative py-1 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            
            <button
              onClick={() => handleNavClick('#menu')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-transform active:scale-95 border border-gold/40 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Order Online</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-ivory border border-gold/40 hover:border-gold hover:bg-gold/10 text-forest transition-colors shadow-sm flex items-center justify-center cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-forest" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-forest-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl lg:hidden text-forest hover:bg-gold/10 border border-gold/30 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream border-b border-gold/30 px-6 py-5 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-serif text-base font-semibold text-forest hover:text-gold transition-colors py-1.5 border-b border-forest/5 flex items-center justify-between cursor-pointer"
                >
                  <span>{link.name}</span>
                  <span className="text-gold text-xs">→</span>
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('#menu');
                  }}
                  className="w-full py-2.5 rounded-xl bg-forest text-ivory text-xs font-semibold uppercase tracking-wider shadow text-center cursor-pointer"
                >
                  Browse Menu & Order
                </button>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Hello Gahlot Vaishno Bhojnalaya! I would like to order food.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-gold/50 text-forest text-xs font-medium text-center flex items-center justify-center space-x-1.5 bg-ivory"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp: {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
