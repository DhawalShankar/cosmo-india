import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const syncTimeout = useRef(null);

  const getToken = () => localStorage.getItem('token');

  // On mount — fetch cart if logged in
  useEffect(() => {
    if (getToken()) fetchCart();
  }, []);

  // Sync cart to backend (debounced — waits 600ms after last change)
  const syncToBackend = (updatedCart) => {
    const token = getToken();
    if (!token) return;
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(async () => {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ cart: updatedCart }),
        });
      } catch (err) {
        console.error('Cart sync error:', err);
      }
    }, 600);
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;
      const res = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart || []);
      }
    } catch (err) {
      console.error('Fetch cart error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      const updated = existing
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
      syncToBackend(updated);
      return updated;
    });
  };

  const increaseQty = (id) => {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      syncToBackend(updated);
      return updated;
    });
  };

  const decreaseQty = (id) => {
    setCart(prev => {
      const updated = prev.map(i =>
        i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );
      syncToBackend(updated);
      return updated;
    });
  };

  const removeItem = (id) => {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      syncToBackend(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    syncToBackend([]);
  };

  return (
    <CartContext.Provider value={{
      cart, loading,
      addToCart, increaseQty, decreaseQty,
      removeItem, clearCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};