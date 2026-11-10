import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, showToast } = useCart();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm w-full animate-bounce-short pointer-events-auto">
      <div className="bg-forest-900 text-ivory border-2 border-gold/40 rounded-xl shadow-2xl p-4 flex items-start space-x-3 backdrop-blur-md">
        <div className="mt-0.5 flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-gold" />}
          {isInfo && <Info className="w-5 h-5 text-sage" />}
          {!isSuccess && !isInfo && <AlertCircle className="w-5 h-5 text-amber-400" />}
        </div>
        <div className="flex-1">
          <p className="font-serif font-bold text-gold text-sm tracking-wide">
            {toastMessage.title}
          </p>
          <p className="text-xs text-ivory/80 mt-0.5 leading-relaxed">
            {toastMessage.message}
          </p>
        </div>
      </div>
    </div>
  );
};
