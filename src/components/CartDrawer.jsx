import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  QrCode, 
  MessageCircle, 
  Phone, 
  User, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Banknote, 
  Smartphone,
  Printer
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
    grandTotal,
    showToast
  } = useCart();

  const [orderType, setOrderType] = useState('delivery'); // delivery, dinein, takeaway
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'cod' (Pay on Delivery)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [codSuccessOrder, setCodSuccessOrder] = useState(null);

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
          : 'Please enter your Delivery Address & Landmark';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = (method = 'cod', orderId = '') => {
    const orderTypeLabel = orderType === 'delivery' 
      ? '🛵 Home Delivery' 
      : orderType === 'dinein' 
        ? '🍽 Dine-in Table Service' 
        : '🥡 Express Takeaway';

    const paymentLabel = method === 'cod' 
      ? '💵 PAY ON DELIVERY (Cash / Pay at Table)' 
      : `📱 PAID VIA UPI (${RESTAURANT_INFO.upiId})`;

    let msg = `*NEW ORDER — GAHLOT VAISHNO BHOJNALAYA*\n`;
    if (orderId) msg += `*Order ID:* ${orderId}\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Order Type:* ${orderTypeLabel}\n`;
    msg += `*Payment Option:* ${paymentLabel}\n`;
    msg += `*Customer:* ${customerName.trim()}\n`;
    msg += `*Mobile Number:* ${customerPhone.trim()}\n`;
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
    msg += `*Subtotal:* ₹${subtotal}\n`;
    msg += `*GST (5%):* ₹${gstAmount}\n`;
    msg += `*Packaging & Hygiene:* ₹${packagingFee}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE (Order above ₹500)' : `₹${deliveryFee}`}\n`;
    }
    msg += `*TOTAL AMOUNT:* ₹${grandTotal}\n`;
    msg += `-----------------------------------------\n`;
    if (method === 'cod') {
      msg += `*Status:* Order received! Customer will pay ₹${grandTotal} on delivery/table.\n`;
    } else {
      msg += `*Status:* UPI Payment initiated.\n`;
    }
    msg += `Please start preparing our fresh pure vegetarian meal. Dhanyawaad! 🙏`;

    return encodeURIComponent(msg);
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    if (paymentMethod === 'cod') {
      // PAY ON DELIVERY FLOW (Swiggy / Zomato style)
      const orderId = `GVB-COD-${Date.now().toString().slice(-6)}`;
      const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${generateWhatsAppMessage('cod', orderId)}`;
      
      // Directly dispatch message to owner's WhatsApp number
      window.open(waUrl, '_blank');

      // Trigger celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C49A52', '#173D32', '#FFF9EF', '#16A34A']
        });
      } catch (e) {
        console.error(e);
      }

      setCodSuccessOrder({
        orderId,
        customerName,
        customerPhone,
        addressOrTable,
        orderType,
        grandTotal,
        cart: [...cart]
      });

      clearCart();
    } else {
      // PAY VIA UPI FLOW (Swiggy style with app selection & deep links)
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
        packagingFee,
        rawWhatsAppMessageGen: (id, utr) => {
          let text = generateWhatsAppMessage('upi', id);
          if (utr) {
            text += encodeURIComponent(`\n*UTR / Transaction Ref:* ${utr}`);
          }
          return text;
        }
      });
    }
  };

  const handleCloseSuccess = () => {
    setCodSuccessOrder(null);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div 
        className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-cream border-l-2 border-gold/40 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-forest text-ivory border-b border-gold/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-royal text-lg font-bold text-ivory">Your Royal Order</h3>
                <span className="text-[11px] text-gold block font-sans">
                  {codSuccessOrder ? 'Order Confirmed' : `${cart.length} item${cart.length === 1 ? '' : 's'} in your thali`}
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 font-sans">
            
            {codSuccessOrder ? (
              /* Pay on Delivery Instant Confirmation Receipt */
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-400">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-gold-dark tracking-widest font-royal">Order Placed</span>
                  <h4 className="font-royal text-2xl font-bold text-forest">Order Sent via WhatsApp!</h4>
                  <p className="text-xs text-charcoal/70 max-w-xs mx-auto leading-relaxed">
                    Your order details were sent directly to Gahlot Vaishno Bhojnalaya (+91 7231858636).
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-ivory p-4 rounded-2xl border border-gold/30 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                    <span className="font-royal font-bold text-forest">Gahlot Vaishno Bhojnalaya</span>
                    <span className="font-mono text-gold-dark font-bold">{codSuccessOrder.orderId}</span>
                  </div>

                  <div className="space-y-1 text-charcoal/80">
                    <div><strong>Customer:</strong> {codSuccessOrder.customerName} ({codSuccessOrder.customerPhone})</div>
                    <div><strong>Location:</strong> {codSuccessOrder.addressOrTable}</div>
                    <div><strong>Payment Method:</strong> <span className="text-emerald-800 font-bold">Pay on Delivery (Cash / at Table)</span></div>
                    <div><strong>Amount to Pay:</strong> <span className="font-royal font-bold text-forest text-sm">₹{codSuccessOrder.grandTotal}</span></div>
                  </div>

                  <div className="border-t border-gold/20 pt-2 space-y-1">
                    <div className="font-semibold text-forest font-royal">Items:</div>
                    {codSuccessOrder.cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-charcoal/80">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(`Namaste, checking on my order ${codSuccessOrder.orderId}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp (+91 7231858636)</span>
                  </a>

                  <button
                    onClick={handleCloseSuccess}
                    className="w-full py-2.5 rounded-xl bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-colors font-royal"
                  >
                    Close
                  </button>
                </div>

              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest/5 border border-gold/30 flex items-center justify-center mx-auto text-gold-dark">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-royal text-xl font-bold text-forest">Your Thali is Empty</h4>
                <p className="text-xs text-charcoal/70 max-w-xs mx-auto">
                  Add some fragrant Dal Baati, rich Paneer Lababdar, or chilled Kulhad Chaas to begin your royal feast.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition-all shadow cursor-pointer font-royal"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* 1. Order Type Toggle */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-forest uppercase tracking-wider font-royal">
                    1. Select Order Type
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
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer min-h-[38px] font-royal ${
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

                {/* 2. Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-charcoal/70 border-b border-gold/20 pb-1">
                    <span className="font-royal">2. Order Items ({cart.length})</span>
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
                      className="bg-ivory p-3 rounded-2xl border border-gold/20 shadow-soft-card flex items-start space-x-3 text-left"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gold/20"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="veg-badge"><span className="veg-badge-circle"></span></span>
                          <h4 className="font-royal text-sm font-bold text-forest truncate">
                            {item.name}
                          </h4>
                        </div>

                        {item.customization && (
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                            {item.customization.spice && (
                              <span className="bg-cream px-1.5 py-0.5 rounded text-charcoal/70">
                                {item.customization.spice}
                              </span>
                            )}
                            {item.customization.isJainPrep && (
                              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                Jain
                              </span>
                            )}
                            {item.customization.extraGheeAdded && (
                              <span className="bg-gold-pale text-forest px-1.5 py-0.5 rounded font-medium">
                                +Ghee
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-forest/5">
                          <span className="font-royal font-bold text-sm text-forest">
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
                            <span className="text-xs font-bold font-royal px-1 text-forest">
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

                {/* 3. Customer Information Form */}
                <div className="bg-ivory p-4 rounded-2xl border border-gold/30 space-y-3 text-left">
                  <h4 className="font-royal text-sm font-bold text-forest flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-gold-dark" />
                    <span>3. Delivery Details</span>
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
                          ? 'e.g. Table #4 (Courtyard AC Hall)'
                          : orderType === 'takeaway'
                            ? 'e.g. In 25 minutes (around 7:30 PM)'
                            : 'e.g. House 14, Near Royal Palace, Main Road...'
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
                      placeholder="e.g. Send extra garlic chutney, pack for travel"
                      className="w-full p-2 rounded-xl bg-cream border border-gold/30 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>

                </div>

                {/* 4. Swiggy-Style Payment Method Selection */}
                <div className="bg-ivory p-4 rounded-2xl border-2 border-gold/40 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-royal text-sm font-bold text-forest flex items-center space-x-1.5">
                      <Banknote className="w-4 h-4 text-gold-dark" />
                      <span>4. Select Payment Method</span>
                    </h4>
                    <span className="text-[10px] bg-gold/15 text-forest font-bold px-2 py-0.5 rounded font-sans">
                      Swiggy / Zomato Checkout
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Option A: Pay Online via UPI (Recommended) */}
                    <label
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3.5 rounded-xl border-2 transition-all flex items-start space-x-3 cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-forest/5 border-forest shadow-sm'
                          : 'bg-cream/60 border-gold/25 hover:border-gold/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="mt-0.5 text-forest focus:ring-forest cursor-pointer"
                      />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-royal font-bold text-xs sm:text-sm text-forest">
                            Pay Online via UPI (Instant)
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            Fast & Safe
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal/70 mt-0.5">
                          Choose GPay, PhonePe, Paytm, CRED or scan QR code. Autofills amount on your app.
                        </p>
                      </div>
                    </label>

                    {/* Option B: Pay on Delivery (Cash on Delivery) */}
                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3.5 rounded-xl border-2 transition-all flex items-start space-x-3 cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'bg-forest/5 border-forest shadow-sm'
                          : 'bg-cream/60 border-gold/25 hover:border-gold/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-0.5 text-forest focus:ring-forest cursor-pointer"
                      />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-royal font-bold text-xs sm:text-sm text-forest">
                            Pay on Delivery (Cash / at Table)
                          </span>
                          <span className="text-[10px] bg-gold-pale text-forest font-bold px-1.5 py-0.5 rounded font-royal">
                            Direct WhatsApp
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal/70 mt-0.5">
                          Sends order details directly to the restaurant WhatsApp (+91 7231858636). Pay cash or UPI upon delivery.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 5. Bill Breakdown */}
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

                  <div className="pt-2 border-t border-gold/30 flex justify-between items-baseline font-royal">
                    <span className="text-sm font-bold text-forest">Total To Pay</span>
                    <span className="text-xl font-bold text-forest">₹{grandTotal}</span>
                  </div>
                </div>

              </>
            )}

          </div>

          {/* Drawer Footer: Dynamic Single Primary Action Button */}
          {cart.length > 0 && !codSuccessOrder && (
            <div className="p-4 bg-cream/95 border-t border-gold/30 space-y-2">
              
              {paymentMethod === 'cod' ? (
                /* Pay on Delivery Action */
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95 min-h-[48px]"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Place Order (Pay on Delivery) • ₹{grandTotal}</span>
                </button>
              ) : (
                /* Pay via UPI Action */
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest hover:bg-forest-800 text-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-royal border border-gold/40 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 min-h-[48px] font-royal"
                >
                  <Smartphone className="w-5 h-5 text-gold" />
                  <span>Proceed to UPI Payment • ₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              )}

              <div className="flex items-center justify-center space-x-2 text-[10px] text-charcoal/60 pt-1 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {paymentMethod === 'cod' 
                    ? `Directly connects to owner's WhatsApp: ${RESTAURANT_INFO.phone}` 
                    : `Verified Merchant UPI: ${RESTAURANT_INFO.upiId}`}
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
