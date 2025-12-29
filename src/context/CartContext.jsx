import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Fetch cart from backend when user is logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      if (!token) {
        // If no token, use local cart
        return;
      }

      const res = await fetch('/api/cart/get', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart || []);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    const token = getToken();

    if (!token) {
      // Guest mode - use local state
      setCart(prev => {
        const existing = prev.find(i => i.id === product.id);
        if (existing) {
          return prev.map(i =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
      return;
    }

    // Logged in - use backend
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ book: product })
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  const increaseQty = async (id) => {
    const token = getToken();

    if (!token) {
      // Guest mode
      setCart(prev =>
        prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      );
      return;
    }

    // Logged in
    try {
      const item = cart.find(i => i.id === id);
      const res = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: id, qty: item.qty + 1 })
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Update cart error:', error);
    }
  };

  const decreaseQty = async (id) => {
    const token = getToken();

    if (!token) {
      // Guest mode
      setCart(prev =>
        prev.map(i =>
          i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
        )
      );
      return;
    }

    // Logged in
    try {
      const item = cart.find(i => i.id === id);
      if (item.qty <= 1) return;

      const res = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: id, qty: item.qty - 1 })
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Update cart error:', error);
    }
  };

  const removeItem = async (id) => {
    const token = getToken();

    if (!token) {
      // Guest mode
      setCart(prev => prev.filter(i => i.id !== id));
      return;
    }

    // Logged in
    try {
      const res = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: id, qty: 0 })
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Remove item error:', error);
    }
  };

  const clearCart = async () => {
    const token = getToken();

    if (!token) {
      // Guest mode
      setCart([]);
      return;
    }

    // Logged in
    try {
      const res = await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setCart([]);
      }
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};