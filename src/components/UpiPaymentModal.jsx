import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Copy, 
  Check, 
  QrCode, 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  Receipt,
  MessageCircle,
  Printer
} from 'lucide-react';

export const UpiPaymentModal = ({ orderData, isOpen, onClose }) => {
  const { clearCart, setIsCartOpen, showToast } = useCart();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isOpen && orderData) {
      const generatedId = `GVB-${Date.now().toString().slice(-6)}`;
      setOrderId(generatedId);

      // Generate standard NPCI UPI link
      const upiUrl = `upi://pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedId}`)}`;

      QRCode.toDataURL(upiUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#173D32',
          light: '#FFF9EF',
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error(err));
    } else {
      setIsConfirmed(false);
      setUtrNumber('');
    }
  }, [isOpen, orderData]);

  if (!isOpen || !orderData) return null;

  const copyUpiId = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.upiId);
    setCopiedUpi(true);
    showToast('Copied!', 'UPI ID copied to clipboard: ' + RESTAURANT_INFO.upiId, 'success');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsConfirmed(true);
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C49A52', '#173D32', '#FFF9EF', '#A6B49B']
      });
    } catch (e) {
      console.error(e);
    }
    clearCart();
    setIsCartOpen(false);
  };

  const handleSendConfirmationWhatsApp = () => {
    let msg = `*PAID ORDER CONFIRMATION — GAHLOT VAISHNO BHOJNALAYA*\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Order ID:* ${orderId}\n`;
    msg += `*Customer:* ${orderData.customerName}\n`;
    msg += `*Phone:* ${orderData.customerPhone}\n`;
    msg += `*Address / Table:* ${orderData.addressOrTable}\n`;
    msg += `*Order Type:* ${orderData.orderType.toUpperCase()}\n`;
    msg += `*Total Amount Paid:* ₹${orderData.grandTotal}\n`;
    msg += `*UPI ID Paid to:* ${RESTAURANT_INFO.upiId}\n`;
    if (utrNumber.trim()) {
      msg += `*UTR / Ref No:* ${utrNumber.trim()}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `*ITEMS:*\n`;
    orderData.cart.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.name} (x${it.quantity})\n`;
    });
    msg += `-----------------------------------------\n`;
    msg += `Payment completed. Please start preparing our royal meal! 🙏`;

    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const mobileUpiIntentUrl = `upi://pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-ivory w-full max-w-md rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl relative max-h-[95vh] flex flex-col text-charcoal text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-forest text-ivory border-b border-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-gold" />
            <h3 className="font-royal text-base sm:text-lg font-bold text-ivory">
              {isConfirmed ? 'Order Confirmed!' : 'Scan & Pay via UPI'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-ivory/80 hover:text-ivory hover:bg-forest-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-sans text-xs">
          
          {!isConfirmed ? (
            <>
              {/* Amount Showcase Banner */}
              <div className="bg-cream p-3.5 rounded-2xl border border-gold/30 text-center space-y-1">
                <span className="text-[10px] text-charcoal/60 uppercase tracking-wider font-semibold block">Total Payable Amount</span>
                <div className="font-royal text-3xl font-bold text-forest">
                  ₹{orderData.grandTotal}
                </div>
                <div className="text-[11px] text-gold-dark font-medium">
                  Order Ref: <span className="font-mono">{orderId}</span>
                </div>
              </div>

              {/* Mobile 1-Tap Payment Button (Smartphone Adaptive) */}
              <div className="block sm:hidden">
                <a
                  href={mobileUpiIntentUrl}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest text-ivory font-royal text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 border border-gold shadow-md text-center"
                >
                  <Smartphone className="w-4 h-4 text-gold" />
                  <span>Tap to Pay with GPay / PhonePe / Paytm</span>
                </a>
                <div className="text-center text-[10px] text-charcoal/60 my-2">— OR SCAN BELOW —</div>
              </div>

              {/* QR Code Container */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-gold/30 shadow-soft-card max-w-[210px] mx-auto text-center">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Scan UPI QR Code to Pay Gahlot Vaishno Bhojnalaya"
                    className="w-full h-auto mx-auto rounded-lg"
                  />
                ) : (
                  <div className="w-44 h-44 bg-cream animate-pulse rounded-lg flex items-center justify-center">
                    <span className="text-xs text-charcoal/50">Generating QR...</span>
                  </div>
                )}
                <div className="mt-1.5 text-[10px] text-charcoal/60 font-medium">
                  Scan with GPay, PhonePe, Paytm, or BHIM
                </div>
              </div>

              {/* UPI ID Copy Card */}
              <div className="bg-cream p-3 rounded-xl border border-gold/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-charcoal/50 uppercase tracking-wider block">Official Merchant UPI ID</span>
                  <span className="font-mono text-xs font-bold text-forest">{RESTAURANT_INFO.upiId}</span>
                </div>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-gold/15 text-forest border border-gold/40 text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer min-h-[36px]"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gold-dark" />}
                  <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Desktop Direct Pay Link */}
              <div className="hidden sm:block text-center">
                <a
                  href={mobileUpiIntentUrl}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-forest hover:text-gold-dark underline py-1"
                >
                  <Smartphone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>On Mobile? Tap here to open UPI App directly</span>
                </a>
              </div>

              {/* UTR / Reference ID Field */}
              <div className="space-y-1 pt-1 border-t border-gold/20">
                <label className="text-xs font-bold text-forest block font-royal">
                  Enter UPI Reference / UTR No. (Optional but recommended)
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="12-digit UPI Ref Number (e.g. 4310XXXXXXXX)"
                  className="w-full p-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-mono focus:outline-none focus:border-gold"
                />
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-800 text-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-royal border border-gold/40 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 min-h-[46px] font-royal"
              >
                <span>I Have Paid ₹{orderData.grandTotal} • Confirm Order</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

            </>
          ) : (
            /* Order Success Receipt View */
            <div className="space-y-4 text-center">
              
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-400">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-gold-dark tracking-widest font-royal">Dhanyawaad!</span>
                <h3 className="font-royal text-2xl font-bold text-forest">Order Placed Successfully</h3>
                <p className="text-xs text-charcoal/70 mt-1">
                  Your royal feast is being prepared with utmost hygiene & purity in pure cow desi ghee.
                </p>
              </div>

              {/* Printable Receipt Card */}
              <div className="bg-cream p-4 rounded-2xl border border-gold/30 text-left space-y-2 text-xs font-sans">
                <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                  <span className="font-royal font-bold text-forest">Gahlot Vaishno Bhojnalaya</span>
                  <span className="font-mono text-gold-dark font-bold">{orderId}</span>
                </div>

                <div className="space-y-1 text-charcoal/75">
                  <div><strong>Customer:</strong> {orderData.customerName} ({orderData.customerPhone})</div>
                  <div><strong>Delivery / Table:</strong> {orderData.addressOrTable}</div>
                  <div><strong>Payment Mode:</strong> UPI ({RESTAURANT_INFO.upiId})</div>
                  {utrNumber && <div><strong>UTR Ref:</strong> {utrNumber}</div>}
                  <div><strong>Amount Paid:</strong> ₹{orderData.grandTotal}</div>
                </div>

                <div className="border-t border-gold/20 pt-2 space-y-1">
                  <div className="font-semibold text-forest font-royal">Items:</div>
                  {orderData.cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-charcoal/80">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSendConfirmationWhatsApp}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order Receipt to WhatsApp (+91 7231858636)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrintReceipt}
                    className="py-2.5 rounded-xl bg-ivory border border-gold/40 text-forest text-xs font-semibold hover:bg-gold/10 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer min-h-[42px] font-royal"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="py-2.5 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors cursor-pointer min-h-[42px] font-royal"
                  >
                    Done / Close
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
