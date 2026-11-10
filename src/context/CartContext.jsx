import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('gahlot_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('gahlot_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (item, quantity = 1, customization = {}) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (ci) => ci.id === item.id && JSON.stringify(ci.customization || {}) === JSON.stringify(customization || {})
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...item,
            cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            quantity,
            customization
          }
        ];
      }
    });

    showToast(
      'Added to Order',
      `${quantity}x ${item.name} added to your thali basket!`,
      'success'
    );
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    showToast('Removed', 'Item removed from your order', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery is free over ₹500, else ₹40 for local delivery
  const deliveryFee = subtotal === 0 || subtotal >= 500 ? 0 : 40;
  // Packaging fee ₹20
  const packagingFee = subtotal > 0 ? 20 : 0;
  // 5% GST on Restaurant food
  const gstAmount = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + packagingFee + gstAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        packagingFee,
        gstAmount,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        selectedItemForModal,
        setSelectedItemForModal,
        toastMessage,
        showToast,
        orderSuccessData,
        setOrderSuccessData
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
