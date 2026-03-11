import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext(null);

const GUEST_CART_KEY = "cosmo_cart_guest";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const syncTimeout = useRef(null);
  const { user } = useContext(AuthContext);

  // ── On auth state change: logged in → server, guest → localStorage ──
  useEffect(() => {
    if (user) {
      // Logged in: server is the ONLY source of truth
      fetchAndMergeCart();
    } else if (user === null) {
      // Guest: load from localStorage
      try {
        const saved = localStorage.getItem(GUEST_CART_KEY);
        setCart(saved ? JSON.parse(saved) : []);
      } catch {
        setCart([]);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  // ── Persist to localStorage ONLY for guests ──
  useEffect(() => {
    if (user) return; // logged-in users: never touch localStorage
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  }, [cart, user]);

  // ── Fetch server cart, merge guest items, clear guest localStorage ──
  const fetchAndMergeCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      const serverCart = data.cart || [];

      // Merge any guest items that aren't already in server cart
      const guestCart = (() => {
        try {
          const saved = localStorage.getItem(GUEST_CART_KEY);
          return saved ? JSON.parse(saved) : [];
        } catch {
          return [];
        }
      })();

      const merged = [...serverCart];
      guestCart.forEach((guestItem) => {
        const exists = merged.find((i) => i.id === guestItem.id);
        if (!exists) merged.push(guestItem);
      });

      // Server is now source of truth — wipe guest localStorage
      localStorage.removeItem(GUEST_CART_KEY);

      // If there were guest items to merge, sync them to server immediately
      if (guestCart.length > 0) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ cart: merged }),
        });
      }

      setCart(merged);
    } catch (err) {
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Sync to backend (debounced) — logged-in users only ──
  const syncToBackend = (updatedCart) => {
    if (!user) return; // guests: localStorage only (handled by useEffect above)
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(async () => {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ cart: updatedCart }),
        });
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }, 600);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const updated = existing
        ? prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...product, qty: 1 }];
      syncToBackend(updated);
      return updated;
    });
  };

  const increaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      );
      syncToBackend(updated);
      return updated;
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );
      syncToBackend(updated);
      return updated;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      syncToBackend(updated);
      return updated;
    });
  };

  // ── Call this after successful purchase ──
  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem(GUEST_CART_KEY);
    if (user) {
      // No debounce — purchase is critical, sync immediately
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ cart: [] }),
        });
      } catch (err) {
        console.error("Clear cart sync error:", err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        fetchCart: fetchAndMergeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};