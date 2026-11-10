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
  Printer,
  Clock,
  Phone,
  Info,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export const UpiPaymentModal = ({ orderData, isOpen, onClose }) => {
  const { clearCart, setIsCartOpen, showToast } = useCart();
  
  // Payment Tab: 'upi_id' or 'mobile_number'
  const [activeTab, setActiveTab] = useState('upi_id'); // 'upi_id' | 'mobile_number'
  
  const [qrCodeUpiUrl, setQrCodeUpiUrl] = useState('');
  const [qrCodeMobileUrl, setQrCodeMobileUrl] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedMobile, setCopiedMobile] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes Swiggy style countdown
  const [showQrView, setShowQrView] = useState(false);

  useEffect(() => {
    if (isOpen && orderData) {
      const generatedId = `GVB-${Date.now().toString().slice(-6)}`;
      setOrderId(generatedId);
      setTimeLeft(600);

      // 1. Generate standard NPCI UPI link for UPI ID (gahlotvb@slc)
      const upiIdUrl = `upi://pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedId}`)}`;
      QRCode.toDataURL(upiIdUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#173D32',
          light: '#FFF9EF',
        },
      })
        .then((url) => setQrCodeUpiUrl(url))
        .catch((err) => console.error(err));

      // 2. Generate standard NPCI UPI link for Mobile Number (7231858636)
      const upiMobileUrl = `upi://pay?pa=${RESTAURANT_INFO.upiMobile}@upi&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedId}`)}`;
      QRCode.toDataURL(upiMobileUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#173D32',
          light: '#FFF9EF',
        },
      })
        .then((url) => setQrCodeMobileUrl(url))
        .catch((err) => console.error(err));

    } else {
      setIsConfirmed(false);
      setUtrNumber('');
      setShowQrView(false);
      setCopiedUpi(false);
      setCopiedMobile(false);
    }
  }, [isOpen, orderData]);

  // Countdown timer like Swiggy checkout
  useEffect(() => {
    if (!isOpen || isConfirmed || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isConfirmed, timeLeft]);

  if (!isOpen || !orderData) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Intent links for UPI ID (gahlotvb@slc)
  const upiIdIntentLinks = {
    gpay: `tez://upi/pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`,
    phonepe: `phonepe://pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`,
    paytm: `paytmmp://pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`,
    any: `upi://pay?pa=${RESTAURANT_INFO.upiId}&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`
  };

  // Intent links for Mobile Number (7231858636)
  const mobileIntentLinks = {
    phonepe: `phonepe://pay?pa=${RESTAURANT_INFO.upiMobile}@ybl&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`,
    gpay: `tez://upi/pay?pa=${RESTAURANT_INFO.upiMobile}@okaxis&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`,
    paytm: `paytmmp://pay?pa=${RESTAURANT_INFO.upiMobile}@paytm&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`,
    any: `upi://pay?pa=${RESTAURANT_INFO.upiMobile}@upi&pn=${encodeURIComponent(RESTAURANT_INFO.upiName)}&am=${orderData.grandTotal}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.upiId);
    setCopiedUpi(true);
    showToast('Copied!', 'UPI ID copied: ' + RESTAURANT_INFO.upiId, 'success');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const copyMobileNumber = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.upiMobile);
    setCopiedMobile(true);
    showToast('Copied!', 'Mobile number copied: ' + RESTAURANT_INFO.upiMobile, 'success');
    setTimeout(() => setCopiedMobile(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsConfirmed(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C49A52', '#173D32', '#FFF9EF', '#16A34A']
      });
    } catch (e) {
      console.error(e);
    }
    clearCart();
    setIsCartOpen(false);

    // Automatically send confirmation message to restaurant owner's WhatsApp
    handleSendConfirmationWhatsApp();
  };

  const handleSendConfirmationWhatsApp = () => {
    const paymentModeLabel = activeTab === 'upi_id' 
      ? `UPI ID (${RESTAURANT_INFO.upiId})` 
      : `Mobile Number UPI (${RESTAURANT_INFO.upiMobile})`;

    let msg = `*PAID ORDER CONFIRMATION — GAHLOT VAISHNO BHOJNALAYA*\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Order ID:* ${orderId}\n`;
    msg += `*Payment Status:* PAID VIA UPI\n`;
    msg += `*Method Used:* ${paymentModeLabel}\n`;
    msg += `*Total Amount Paid:* ₹${orderData.grandTotal}\n`;
    if (utrNumber.trim()) {
      msg += `*UTR / Ref No:* ${utrNumber.trim()}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `*Customer:* ${orderData.customerName}\n`;
    msg += `*Phone:* ${orderData.customerPhone}\n`;
    msg += `*Order Type:* ${orderData.orderType.toUpperCase()}\n`;
    msg += `*Address / Table:* ${orderData.addressOrTable}\n`;
    if (orderData.orderNote) {
      msg += `*Special Note:* ${orderData.orderNote}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `*ITEMS ORDERED:*\n`;
    orderData.cart.forEach((it, idx) => {
      msg += `${idx + 1}. *${it.name}* (x${it.quantity}) — ₹${it.price * it.quantity}\n`;
    });
    msg += `-----------------------------------------\n`;
    msg += `Payment has been completed. Please start preparing our royal meal! 🙏`;

    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-ivory w-full max-w-lg rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl relative max-h-[95vh] flex flex-col text-charcoal text-left font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Swiggy-Style Top Header with Live Timer */}
        <div className="p-4 bg-forest text-ivory border-b border-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-gold" />
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-ivory leading-tight">
                {isConfirmed ? 'Order Confirmed!' : 'Choose Payment Method'}
              </h3>
              {!isConfirmed && (
                <div className="flex items-center space-x-1 text-[11px] text-gold font-sans">
                  <Clock className="w-3 h-3 animate-pulse" />
                  <span>Time left to pay: <strong className="font-mono">{formattedTime}</strong></span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-ivory/80 hover:text-ivory hover:bg-forest-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          
          {!isConfirmed ? (
            <>
              {/* Total Payable Amount Banner */}
              <div className="bg-cream p-3.5 rounded-2xl border border-gold/30 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] text-charcoal/60 uppercase tracking-wider font-semibold block font-sans">
                    Total Amount To Pay
                  </span>
                  <div className="font-royal text-2xl sm:text-3xl font-bold text-forest">
                    ₹{orderData.grandTotal}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-charcoal/60 uppercase tracking-wider block font-sans">Payee Name</span>
                  <div className="font-royal text-xs font-bold text-forest">
                    Gahlot Vaishno Bhojnalaya
                  </div>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                    Verified Merchant
                  </span>
                </div>
              </div>

              {/* Two Payment Method Tabs: UPI ID vs Direct Mobile Number */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-cream rounded-2xl border border-gold/30">
                <button
                  type="button"
                  onClick={() => setActiveTab('upi_id')}
                  className={`py-2 px-3 rounded-xl font-royal text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeTab === 'upi_id'
                      ? 'bg-forest text-ivory shadow-md border border-gold/40'
                      : 'text-charcoal/70 hover:text-forest hover:bg-white/50'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-gold" />
                  <span>1. Pay via UPI ID</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('mobile_number')}
                  className={`py-2 px-3 rounded-xl font-royal text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeTab === 'mobile_number'
                      ? 'bg-forest text-ivory shadow-md border border-gold/40'
                      : 'text-charcoal/70 hover:text-forest hover:bg-white/50'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>2. Pay via Mobile No.</span>
                </button>
              </div>

              {/* TAB 1: PAY VIA UPI ID (gahlotvb@slc) */}
              {activeTab === 'upi_id' && (
                <div className="space-y-3 animate-fadeIn">
                  
                  {/* Verified UPI ID Banner with 1-Tap Copy */}
                  <div className="bg-white p-3 rounded-2xl border border-gold/30 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] text-charcoal/60 uppercase tracking-wider block font-sans">
                        Official Merchant UPI ID
                      </span>
                      <code className="font-mono text-xs sm:text-sm font-bold text-forest">
                        {RESTAURANT_INFO.upiId}
                      </code>
                    </div>
                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="px-3 py-1.5 rounded-xl bg-cream hover:bg-gold/20 text-forest border border-gold/40 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gold-dark" />}
                      <span>{copiedUpi ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>

                  {/* Direct 1-Tap App Intent Links */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-forest font-royal">
                      <span>TAP TO OPEN INSTALLED APP (AUTORUNS)</span>
                      <span className="text-emerald-700 font-sans font-semibold">Prefills ₹{orderData.grandTotal}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* PhonePe */}
                      <a
                        href={upiIdIntentLinks.phonepe}
                        className="p-2.5 rounded-2xl bg-white border border-gold/30 hover:border-gold hover:shadow-md transition-all flex items-center justify-between cursor-pointer group active:scale-98"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center font-bold text-purple-700 text-xs font-sans">
                            Pe
                          </div>
                          <div>
                            <span className="font-royal font-bold text-xs text-forest block group-hover:text-gold-dark">
                              PhonePe
                            </span>
                            <span className="text-[10px] text-charcoal/60 block">Direct launch</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      {/* Google Pay */}
                      <a
                        href={upiIdIntentLinks.gpay}
                        className="p-2.5 rounded-2xl bg-white border border-gold/30 hover:border-gold hover:shadow-md transition-all flex items-center justify-between cursor-pointer group active:scale-98"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-xs font-sans">
                            GPay
                          </div>
                          <div>
                            <span className="font-royal font-bold text-xs text-forest block group-hover:text-gold-dark">
                              Google Pay
                            </span>
                            <span className="text-[10px] text-charcoal/60 block">Direct launch</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      {/* Paytm */}
                      <a
                        href={upiIdIntentLinks.paytm}
                        className="p-2.5 rounded-2xl bg-white border border-gold/30 hover:border-gold hover:shadow-md transition-all flex items-center justify-between cursor-pointer group active:scale-98"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center font-bold text-sky-700 text-[10px] font-sans">
                            Paytm
                          </div>
                          <div>
                            <span className="font-royal font-bold text-xs text-forest block group-hover:text-gold-dark">
                              Paytm UPI
                            </span>
                            <span className="text-[10px] text-charcoal/60 block">Direct launch</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      {/* Any Other UPI App */}
                      <a
                        href={upiIdIntentLinks.any}
                        className="p-2.5 rounded-2xl bg-forest text-ivory border border-gold shadow hover:bg-forest-800 transition-all flex items-center justify-between cursor-pointer group active:scale-98"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gold text-forest-950 flex items-center justify-center font-bold text-[10px] font-royal">
                            UPI
                          </div>
                          <div>
                            <span className="font-royal font-bold text-xs text-gold block">
                              Any UPI App
                            </span>
                            <span className="text-[10px] text-ivory/80 block">CRED, BHIM, Bank</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Important Explanatory Banner regarding PhonePe Gallery QR ₹2000 warning */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 text-[11px] text-amber-950 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-900 font-royal">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Why does PhonePe show "Gallery QR limit is ₹2,000"?</span>
                    </div>
                    <p className="text-[10px] text-amber-900/80 leading-relaxed pl-5 font-sans">
                      As per NPCI fraud prevention rules, PhonePe displays a security advisory when uploading a QR screenshot from your photo gallery. 
                      <strong> To avoid this restriction:</strong> Tap the direct app buttons above, or switch to <strong>"2. Pay via Mobile No."</strong> to pay {RESTAURANT_INFO.upiMobile} directly with zero limits!
                    </p>
                  </div>

                  {/* QR Code Toggle */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowQrView(!showQrView)}
                      className="w-full py-2 px-3 rounded-xl bg-cream border border-gold/30 text-forest text-xs font-semibold flex items-center justify-between hover:bg-gold/10 transition-colors"
                    >
                      <span className="flex items-center space-x-1.5 font-royal">
                        <QrCode className="w-4 h-4 text-gold-dark" />
                        <span>{showQrView ? 'Hide QR Code' : 'Scan UPI QR Code (Camera / Desktop)'}</span>
                      </span>
                      <span className="text-gold-dark font-bold">{showQrView ? '▲' : '▼'}</span>
                    </button>

                    {showQrView && (
                      <div className="mt-2.5 p-3.5 bg-white rounded-2xl border-2 border-gold/30 shadow-soft-card max-w-[210px] mx-auto text-center animate-fadeIn">
                        {qrCodeUpiUrl ? (
                          <img
                            src={qrCodeUpiUrl}
                            alt="Scan UPI QR Code for Gahlot Vaishno Bhojnalaya"
                            className="w-full h-auto mx-auto rounded-lg"
                          />
                        ) : (
                          <div className="w-44 h-44 bg-cream animate-pulse rounded-lg flex items-center justify-center">
                            <span className="text-xs text-charcoal/50">Generating QR...</span>
                          </div>
                        )}
                        <div className="mt-1.5 text-[10px] text-charcoal/60 font-medium font-sans">
                          Scan via live camera • ₹{orderData.grandTotal}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: PAY VIA DIRECT MOBILE NUMBER (7231858636) */}
              {activeTab === 'mobile_number' && (
                <div className="space-y-3 animate-fadeIn">
                  
                  {/* Highlighted Mobile Number Card */}
                  <div className="bg-white p-3.5 rounded-2xl border-2 border-gold/50 shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-charcoal/60 uppercase tracking-wider font-semibold font-sans">
                        UPI Mobile Number (PhonePe / GPay / Paytm)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        100% Reliable • No Limit
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-royal text-xl sm:text-2xl font-bold text-forest tracking-wide">
                          {RESTAURANT_INFO.upiMobile}
                        </div>
                        <span className="text-[11px] text-charcoal/70 block">
                          Name: <strong>{RESTAURANT_INFO.upiName}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={copyMobileNumber}
                        className="py-2 px-3 rounded-xl bg-forest text-ivory hover:bg-forest-800 border border-gold/40 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm active:scale-95 font-royal"
                      >
                        {copiedMobile ? <Check className="w-3.5 h-3.5 text-gold" /> : <Copy className="w-3.5 h-3.5 text-gold" />}
                        <span>{copiedMobile ? 'Copied!' : 'Copy Number'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Simple Steps Guide for Customers */}
                  <div className="bg-cream/90 p-3 rounded-2xl border border-gold/30 space-y-1.5 text-[11px] text-charcoal/80">
                    <span className="font-royal font-bold text-forest block text-xs">
                      How to Pay via Mobile Number (Takes 5 seconds):
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-[10px] sm:text-[11px]">
                      <li>Open <strong>PhonePe</strong>, <strong>Google Pay</strong>, or <strong>Paytm</strong>.</li>
                      <li>Tap <strong>"To Mobile Number"</strong> (or 'Pay Phone Number').</li>
                      <li>Enter or paste <strong>{RESTAURANT_INFO.upiMobile}</strong>.</li>
                      <li>Confirm name <em>({RESTAURANT_INFO.upiName})</em> & pay <strong>₹{orderData.grandTotal}</strong>.</li>
                    </ol>
                  </div>

                  {/* Direct 1-Tap Links to Mobile UPI Handles */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-forest font-royal block">
                      OR TAP DIRECT MOBILE UPI LINK:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={mobileIntentLinks.phonepe}
                        className="p-2.5 rounded-xl bg-white border border-gold/30 hover:border-gold hover:shadow-sm flex items-center justify-between text-xs font-royal font-semibold text-forest cursor-pointer active:scale-95"
                      >
                        <span>PhonePe Mobile</span>
                        <ChevronRight className="w-4 h-4 text-gold" />
                      </a>
                      <a
                        href={mobileIntentLinks.gpay}
                        className="p-2.5 rounded-xl bg-white border border-gold/30 hover:border-gold hover:shadow-sm flex items-center justify-between text-xs font-royal font-semibold text-forest cursor-pointer active:scale-95"
                      >
                        <span>GPay Mobile</span>
                        <ChevronRight className="w-4 h-4 text-gold" />
                      </a>
                      <a
                        href={mobileIntentLinks.paytm}
                        className="p-2.5 rounded-xl bg-white border border-gold/30 hover:border-gold hover:shadow-sm flex items-center justify-between text-xs font-royal font-semibold text-forest cursor-pointer active:scale-95"
                      >
                        <span>Paytm Mobile</span>
                        <ChevronRight className="w-4 h-4 text-gold" />
                      </a>
                      <a
                        href={mobileIntentLinks.any}
                        className="p-2.5 rounded-xl bg-forest text-ivory border border-gold hover:bg-forest-800 flex items-center justify-between text-xs font-royal font-semibold cursor-pointer active:scale-95"
                      >
                        <span>Any Mobile UPI</span>
                        <ArrowRight className="w-4 h-4 text-gold" />
                      </a>
                    </div>
                  </div>

                  {/* QR Code view for Mobile handle */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowQrView(!showQrView)}
                      className="w-full py-2 px-3 rounded-xl bg-cream border border-gold/30 text-forest text-xs font-semibold flex items-center justify-between hover:bg-gold/10 transition-colors"
                    >
                      <span className="flex items-center space-x-1.5 font-royal">
                        <QrCode className="w-4 h-4 text-gold-dark" />
                        <span>{showQrView ? 'Hide Mobile QR Code' : 'Show Mobile QR Code (7231858636)'}</span>
                      </span>
                      <span className="text-gold-dark font-bold">{showQrView ? '▲' : '▼'}</span>
                    </button>

                    {showQrView && (
                      <div className="mt-2.5 p-3.5 bg-white rounded-2xl border-2 border-gold/30 shadow-soft-card max-w-[210px] mx-auto text-center animate-fadeIn">
                        {qrCodeMobileUrl ? (
                          <img
                            src={qrCodeMobileUrl}
                            alt="Scan Mobile UPI QR Code for Gahlot Vaishno Bhojnalaya"
                            className="w-full h-auto mx-auto rounded-lg"
                          />
                        ) : (
                          <div className="w-44 h-44 bg-cream animate-pulse rounded-lg flex items-center justify-center">
                            <span className="text-xs text-charcoal/50">Generating QR...</span>
                          </div>
                        )}
                        <div className="mt-1.5 text-[10px] text-charcoal/60 font-medium font-sans">
                          {RESTAURANT_INFO.upiMobile} • ₹{orderData.grandTotal}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* UTR / Reference ID Field */}
              <div className="space-y-1 pt-2 border-t border-gold/20">
                <label className="text-[11px] font-bold text-forest block font-royal">
                  UPI Transaction ID / UTR (Optional)
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 12-digit Ref / UTR number after payment"
                  className="w-full p-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-mono focus:outline-none focus:border-gold"
                />
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95 min-h-[46px] font-royal"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>I Have Completed Payment • Confirm Order</span>
              </button>

            </>
          ) : (
            /* Order Success Receipt View */
            <div className="space-y-4 text-center">
              
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-400">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-gold-dark tracking-widest font-royal">Payment Verified</span>
                <h3 className="font-royal text-2xl font-bold text-forest">Order Placed Successfully</h3>
                <p className="text-xs text-charcoal/70 mt-1">
                  Your payment of ₹{orderData.grandTotal} was received and order details sent to WhatsApp (+91 7231858636).
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
                  <div><strong>Location / Table:</strong> {orderData.addressOrTable}</div>
                  <div>
                    <strong>Payment Method:</strong>{' '}
                    <span className="text-emerald-800 font-bold">
                      {activeTab === 'upi_id' 
                        ? `Paid via UPI ID (${RESTAURANT_INFO.upiId})` 
                        : `Paid via Mobile No. (${RESTAURANT_INFO.upiMobile})`}
                    </span>
                  </div>
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
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Resend Receipt to WhatsApp (+91 7231858636)</span>
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
