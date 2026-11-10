import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Toast } from './components/Toast';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialtiesShowcase } from './components/SpecialtiesShowcase';
import { ThaliExplorer } from './components/ThaliExplorer';
import { CulinaryRitual } from './components/CulinaryRitual';
import { Heritage } from './components/Heritage';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { HygienePromise } from './components/HygienePromise';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { MobileOrderBar } from './components/MobileOrderBar';

function AppContent() {
  const [upiOrderData, setUpiOrderData] = useState(null);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

  const handleOpenUpiModal = (orderData) => {
    setUpiOrderData(orderData);
    setIsUpiModalOpen(true);
  };

  const handleCloseUpiModal = () => {
    setIsUpiModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans flex flex-col selection:bg-gold/30 selection:text-forest">
      {/* Scroll-Craft Top Timeline Scrubber */}
      <ScrollProgressBar />

      {/* Toast Alert Notifications */}
      <Toast />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Acts */}
      <main className="flex-grow">
        {/* Act 1: Dimensional Hero with Parallax Planes */}
        <Hero />

        {/* Act 2: Crown Jewels Showcase */}
        <SpecialtiesShowcase />

        {/* Act 3: Signature Peak — Interactive Anatomy of the Royal Thali */}
        <ThaliExplorer />

        {/* Act 4: Scroll-Craft Pinned Beat — The 4-Step Sacred Dining Ritual */}
        <CulinaryRitual />

        {/* Act 5: Heritage & The 30-Year Vaishno Hearth */}
        <Heritage />

        {/* Act 6: Interactive Digital Menu with Real-Time Search & Jain Filters */}
        <MenuSection />

        {/* Act 7: Atithi Devo Bhava Table & Catering Concierge */}
        <ReservationSection />

        {/* Act 8: 5-Star Kitchen Hygiene & Purity Promise */}
        <HygienePromise />

        {/* Act 9: Verified Patrons & Traveler Testimonials */}
        <Testimonials />

        {/* Act 10: Location, Map & Official UPI Integration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer onOpenUpiModal={handleOpenUpiModal} />

      {/* Item Detail / Customization Modal */}
      <ItemDetailModal />

      {/* UPI Payment Modal (QR Code & Instant Confirmation) */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        orderData={upiOrderData}
        onClose={handleCloseUpiModal}
      />

      {/* Mobile Sticky Order Bar (Smartphone Adaptive) */}
      <MobileOrderBar />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
