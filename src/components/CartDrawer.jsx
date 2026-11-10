import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  QrCode, 
  MessageCircle, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer = ({ onOpenUpiModal }) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    deliveryFee, 
    packagingFee, 
    gstAmount, 
    grandTotal 
  } = useCart();

  const [orderType, setOrderType] = useState('delivery'); // delivery, dinein, takeaway
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [formErrors, setFormErrors] = useState({});

  if (!isCartOpen) return null;

  const validateForm = () => {
    const errors = {};
    if (!customerName.trim()) errors.name = 'Please enter your name';
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!addressOrTable.trim()) {
      errors.address = orderType === 'dinein' 
        ? 'Please enter your Table Number' 
        : orderType === 'takeaway' 
          ? 'Please enter your expected Pickup Time' 
          : 'Please enter your Delivery Address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const orderTypeLabel = orderType === 'delivery' 
      ? '🛵 Home Delivery' 
      : orderType === 'dinein' 
        ? '🍽 Dine-in Table Service' 
        : '🥡 Express Takeaway';

    let msg = `*NEW ORDER — GAHLOT VAISHNO BHOJNALAYA*\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Order Type:* ${orderTypeLabel}\n`;
    msg += `*Customer:* ${customerName.trim()}\n`;
    msg += `*Contact:* ${customerPhone.trim()}\n`;
    msg += `*${orderType === 'dinein' ? 'Table No' : orderType === 'takeaway' ? 'Pickup Time' : 'Delivery Address'}:* ${addressOrTable.trim()}\n`;
    if (orderNote.trim()) {
      msg += `*Special Note:* ${orderNote.trim()}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `*ITEMS ORDERED:*\n`;

    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (x${item.quantity}) — ₹${item.price * item.quantity}\n`;
      if (item.customization) {
        const details = [];
        if (item.customization.spice) details.push(`Spice: ${item.customization.spice}`);
        if (item.customization.isJainPrep) details.push(`Jain (No Onion/Garlic)`);
        if (item.customization.extraGheeAdded) details.push(`Extra Desi Ghee`);
        if (item.customization.specialInstructions) details.push(`Note: ${item.customization.specialInstructions}`);
        if (details.length > 0) {
          msg += `   ↳ _(${details.join(', ')})_\n`;
        }
      }
    });

    msg += `-----------------------------------------\n`;
    msg += `*Item Subtotal:* ₹${subtotal}\n`;
    msg += `*GST (5%):* ₹${gstAmount}\n`;
    msg += `*Packaging Fee:* ₹${packagingFee}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE (Order above ₹500)' : `₹${deliveryFee}`}\n`;
    }
    msg += `*GRAND TOTAL:* ₹${grandTotal}\n`;
    msg += `*UPI ID for Payment:* ${RESTAURANT_INFO.upiId}\n`;
    msg += `-----------------------------------------\n`;
    msg += `Kindly confirm our order and let us know the preparation time. Dhanyawaad! 🙏`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppCheckout = () => {
    if (!validateForm()) return;
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
  };

  const handleUpiCheckout = () => {
    if (!validateForm()) return;
    onOpenUpiModal({
      customerName,
      customerPhone,
      addressOrTable,
      orderType,
      orderNote,
      cart,
      grandTotal,
      subtotal,
      gstAmount,
      deliveryFee,
      packagingFee
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div 
        className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream border-l-2 border-gold/40 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 bg-forest text-ivory border-b border-gold/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-serif text-lg font-bold text-ivory">Your Royal Order</h3>
                <span className="text-[11px] text-gold block font-sans">
                  {cart.length} unique {cart.length === 1 ? 'item' : 'items'} in basket
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-ivory/80 hover:text-ivory hover:bg-forest-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest/5 border border-gold/30 flex items-center justify-center mx-auto text-gold-dark">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-forest">Your Thali is Empty</h4>
                <p className="text-xs text-charcoal/70 max-w-xs mx-auto">
                  Add some fragrant Dal Baati, rich Paneer Lababdar, or chilled Kulhad Chaas to begin your royal feast.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-all shadow cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Toggle */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-forest uppercase tracking-wider">
                    Select Order Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'delivery', label: 'Delivery' },
                      { id: 'dinein', label: 'Dine-in' },
                      { id: 'takeaway', label: 'Takeaway' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setOrderType(t.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                          orderType === t.id
                            ? 'bg-forest text-ivory border-forest shadow-sm'
                            : 'bg-ivory text-charcoal/70 border-gold/30 hover:bg-gold/10'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-charcoal/70 border-b border-gold/20 pb-1">
                    <span>Order Items</span>
                    <button 
                      onClick={clearCart}
                      className="text-[11px] text-red-700 hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-ivory p-3.5 rounded-2xl border border-gold/20 shadow-soft-card flex items-start space-x-3 text-left"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gold/20"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="veg-badge"><span className="veg-badge-circle"></span></span>
                          <h4 className="font-serif text-sm font-bold text-forest truncate">
                            {item.name}
                          </h4>
                        </div>

                        {/* Customization pills */}
                        {item.customization && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.customization.spice && (
                              <span className="text-[10px] bg-cream px-1.5 py-0.5 rounded text-charcoal/70">
                                {item.customization.spice}
                              </span>
                            )}
                            {item.customization.isJainPrep && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                Jain
                              </span>
                            )}
                            {item.customization.extraGheeAdded && (
                              <span className="text-[10px] bg-gold-pale text-forest px-1.5 py-0.5 rounded font-medium">
                                +Ghee
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-forest/5">
                          <span className="font-serif font-bold text-sm text-forest">
                            ₹{item.price * item.quantity}
                          </span>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="w-6 h-6 rounded-md bg-cream hover:bg-gold/20 flex items-center justify-center text-forest transition-colors cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold font-serif px-1 text-forest">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 rounded-md bg-cream hover:bg-gold/20 flex items-center justify-center text-forest transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-charcoal/40 hover:text-red-600 transition-colors ml-1 p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Information Form */}
                <div className="bg-ivory p-4 rounded-2xl border border-gold/30 space-y-3 text-left">
                  <h4 className="font-serif text-sm font-bold text-forest flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-gold-dark" />
                    <span>Customer Details</span>
                  </h4>

                  <div>
                    <label className="text-[11px] font-semibold text-charcoal/70 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra Sharma"
                      className={`w-full p-2.5 rounded-xl bg-cream border text-xs focus:outline-none focus:border-gold ${
                        formErrors.name ? 'border-red-500' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[10px] text-red-600 mt-0.5 block">{formErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-charcoal/70 block mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98290XXXXX"
                      className={`w-full p-2.5 rounded-xl bg-cream border text-xs focus:outline-none focus:border-gold ${
                        formErrors.phone ? 'border-red-500' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[10px] text-red-600 mt-0.5 block">{formErrors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-charcoal/70 block mb-1">
                      {orderType === 'dinein' 
                        ? 'Table Number *' 
                        : orderType === 'takeaway' 
                          ? 'Expected Pickup Time *' 
                          : 'Complete Delivery Address & Landmark *'}
                    </label>
                    <textarea
                      rows={2}
                      value={addressOrTable}
                      onChange={(e) => setAddressOrTable(e.target.value)}
                      placeholder={
                        orderType === 'dinein'
                          ? 'e.g. Table #4 (Courtyard)'
                          : orderType === 'takeaway'
                            ? 'e.g. In 25 minutes (around 7:30 PM)'
                            : 'e.g. House 14, Near Royal Palace, High Street...'
                      }
                      className={`w-full p-2.5 rounded-xl bg-cream border text-xs focus:outline-none focus:border-gold resize-none ${
                        formErrors.address ? 'border-red-500' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.address && (
                      <span className="text-[10px] text-red-600 mt-0.5 block">{formErrors.address}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-charcoal/70 block mb-1">
                      Cooking Note / Extra Chutney Request (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="e.g. Send extra lahsun chutney, pack for journey"
                      className="w-full p-2 rounded-xl bg-cream border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>

                </div>

                {/* Bill Breakdown */}
                <div className="bg-ivory p-4 rounded-2xl border border-gold/25 space-y-2 text-xs text-charcoal/80 text-left">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging & Sanitization</span>
                    <span>₹{packagingFee}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Charge</span>
                      <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : ''}>
                        {deliveryFee === 0 ? 'FREE (Orders > ₹500)' : `₹${deliveryFee}`}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gold/30 flex justify-between items-baseline font-serif">
                    <span className="text-sm font-bold text-forest">To Pay</span>
                    <span className="text-xl font-bold text-forest">₹{grandTotal}</span>
                  </div>
                </div>

              </>
            )}

          </div>

          {/* Drawer Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-4 bg-cream/95 border-t border-gold/30 space-y-2.5">
              
              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order Directly on WhatsApp (+91 7231858636)</span>
              </button>

              {/* UPI Instant Payment & Confirm Button */}
              <button
                onClick={handleUpiCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-forest hover:bg-forest-800 text-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-royal flex items-center justify-center space-x-2 border border-gold/40 cursor-pointer active:scale-95"
              >
                <QrCode className="w-4 h-4 text-gold" />
                <span>Pay via UPI & Instant Confirm (gahlotvb@slc)</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Secure • Official UPI: <strong>{RESTAURANT_INFO.upiId}</strong></span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
