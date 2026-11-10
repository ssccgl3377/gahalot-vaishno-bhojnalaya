import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  UtensilsCrossed
} from 'lucide-react';

export const ReservationSection = () => {
  const { showToast } = useCart();
  const [bookingType, setBookingType] = useState('table'); // 'table' or 'catering'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('4');
  const [occasion, setOccasion] = useState('Family Dinner');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      showToast('Incomplete Info', 'Please fill in Name, Phone, and Date', 'info');
      return;
    }

    const bookingLabel = bookingType === 'table' ? '🍽 TABLE RESERVATION' : '🥘 BULK CATERING / PARTY ORDER';
    let msg = `*NEW ${bookingLabel} REQUEST*\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Name:* ${name.trim()}\n`;
    msg += `*Phone:* ${phone.trim()}\n`;
    msg += `*Date:* ${date}\n`;
    msg += `*Time:* ${time}\n`;
    msg += `*Guests / Thali Count:* ${guests} People\n`;
    msg += `*Occasion:* ${occasion}\n`;
    if (specialRequests.trim()) {
      msg += `*Special Preferences:* ${specialRequests.trim()}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `Kindly confirm our reservation. Dhanyawaad! 🙏`;

    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    showToast('Reservation Sent', 'We are redirecting to WhatsApp to confirm your table!', 'success');
  };

  return (
    <section id="reservations" className="py-16 md:py-24 bg-ivory relative border-t border-gold/20">
      <div className="hallmark-container">
        
        <div className="bg-forest rounded-3xl overflow-hidden border-2 border-gold shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Hospitality Invitation (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 text-ivory flex flex-col justify-between space-y-6 bg-jali-dark relative">
              <div className="space-y-3 text-left">
                <div className="inline-flex items-center space-x-2 text-gold font-sans text-xs uppercase tracking-widest font-bold">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-gold" />
                  <span className="font-royal">Royal Marwari Hospitality</span>
                </div>
                <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory leading-tight">
                  Reserve a Table or Plan a Royal Event
                </h3>
                <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-sans">
                  Whether it is an intimate family dinner, a milestone anniversary, or a traditional Marwari feast for your wedding party, our hospitable staff ensures a memorable dining experience.
                </p>
              </div>

              <div className="space-y-4 text-left border-t border-gold/20 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-800 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold uppercase tracking-wider block font-sans">Direct Concierge</span>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-sm font-bold text-ivory hover:text-gold transition-colors font-royal">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-800 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold uppercase tracking-wider block font-sans">Service Hours</span>
                    <span className="text-xs text-ivory/90 font-sans">{RESTAURANT_INFO.timing}</span>
                  </div>
                </div>

                <div className="p-3 bg-forest-800/80 rounded-xl border border-gold/30 text-xs text-ivory/80 font-sans">
                  ✨ <em>Dedicated AC family dining hall & Jain dining arrangements available.</em>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Booking Form (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-cream text-charcoal text-left">
              
              {/* Toggle Booking Type */}
              <div className="flex items-center gap-2 p-1.5 bg-ivory rounded-2xl border border-gold/30 max-w-sm mb-6">
                <button
                  type="button"
                  onClick={() => setBookingType('table')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-royal min-h-[38px] ${
                    bookingType === 'table'
                      ? 'bg-forest text-ivory shadow'
                      : 'text-charcoal/70 hover:text-forest'
                  }`}
                >
                  Table Reservation
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('catering')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-royal min-h-[38px] ${
                    bookingType === 'catering'
                      ? 'bg-forest text-ivory shadow'
                      : 'text-charcoal/70 hover:text-forest'
                  }`}
                >
                  Bulk Catering / Party
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-forest block mb-1 font-royal">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra Sharma"
                      className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-forest block mb-1 font-royal">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98290XXXXX"
                      className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-forest block mb-1 font-royal">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-forest block mb-1 font-royal">
                      Preferred Time *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    >
                      <option value="12:00 PM">12:00 PM (Lunch)</option>
                      <option value="01:00 PM">01:00 PM (Lunch)</option>
                      <option value="02:00 PM">02:00 PM (Lunch)</option>
                      <option value="07:30 PM">07:30 PM (Dinner)</option>
                      <option value="08:30 PM">08:30 PM (Dinner)</option>
                      <option value="09:30 PM">09:30 PM (Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-forest block mb-1 font-royal">
                      {bookingType === 'table' ? 'Guests' : 'Thali Count'} *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    >
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8 Guests</option>
                      <option value="12+">12+ Guests (Family Hall)</option>
                      <option value="25+">25+ Thalis (Party)</option>
                      <option value="50+">50+ Thalis (Bulk Catering)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-forest block mb-1 font-royal">
                    Occasion / Dietary Preferences
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. Birthday, Anniversary, Jain Food Only, Highway Stop..."
                    className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-forest block mb-1 font-royal">
                    Special Seating / Menu Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Need high chair for child, courtyard seating, extra garlic chutney..."
                    className="w-full p-2.5 rounded-xl bg-ivory border border-gold/30 text-xs focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-800 text-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-royal border border-gold/40 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 min-h-[48px] font-royal"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send Reservation Request to WhatsApp (+91 7231858636)</span>
                </button>

              </form>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
