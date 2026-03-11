import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // ── Hydrate instantly from localStorage so cart never flashes empty ──
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cosmo_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const syncTimeout = useRef(null);
  const { user } = useContext(AuthContext); // watch login/logout

  // ── Mirror cart to localStorage on every change (guest cache + instant hydration) ──
  useEffect(() => {
    localStorage.setItem("cosmo_cart", JSON.stringify(cart));
  }, [cart]);

  // ── When user logs IN → fetch their server cart and merge with local guest cart ──
  // ── When user logs OUT → keep local cart in state (or clear, your choice)       ──
  useEffect(() => {
    if (user) {
      fetchAndMergeCart();
    }
    // Uncomment to wipe cart on logout:
    // else { setCart([]); localStorage.removeItem("cosmo_cart"); }
  }, [user]);

  // Fetch server cart, then merge any guest items that aren't already there
  const fetchAndMergeCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        credentials: "include", // ← uses httpOnly cookie, no token needed
      });
      if (!res.ok) return;
      const data = await res.json();
      const serverCart = data.cart || [];

      setCart((localCart) => {
        // Merge: server cart is authoritative; add any local-only guest items
        const merged = [...serverCart];
        localCart.forEach((localItem) => {
          const exists = merged.find((i) => i.id === localItem.id);
          if (!exists) merged.push(localItem);
        });
        // Persist merged result back to server
        syncToBackend(merged);
        return merged;
      });
    } catch (err) {
      console.error("Fetch cart error:", err);
      // Falls back to localStorage-hydrated cart silently
    } finally {
      setLoading(false);
    }
  };

  // Debounced sync to backend — only fires for logged-in users (cookie present)
  const syncToBackend = (updatedCart) => {
    if (!user) return; // guests: localStorage only
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(async () => {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ← cookie-based, no Authorization header
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

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cosmo_cart");
    syncToBackend([]);
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