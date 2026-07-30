import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useProducts } from "./ProductContext";
import { getUserIdFromToken } from "../utils/auth";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { setProducts } = useProducts();

  // Fetch the CURRENT logged-in user's cart, read fresh every time this runs
  const fetchCart = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setCart([]); // no one logged in — don't show anyone's leftover cart
      return;
    }
    try {
      const res = await axios.get(
        `https://ecommerce-mern-be-2026.vercel.app/api/cart/${userId}`
      );
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCartState = () => setCart([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const res = await axios.post(
        "https://ecommerce-mern-be-2026.vercel.app/api/cart/add",
        {
          userId: getUserIdFromToken(),
          product,
        }
      );

      setCart(res.data.items);
      setProducts(res.data.products);
      toast.success("Added successfully to cart");
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(
        "https://ecommerce-mern-be-2026.vercel.app/api/cart/remove",
        {
          data: {
            userId: getUserIdFromToken(),
            productId,
          },
        }
      );

      setCart(res.data.items);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = async (productId, action) => {
    try {
      const res = await axios.put(
        "https://ecommerce-mern-be-2026.vercel.app/api/cart/update",
        {
          userId: getUserIdFromToken(),
          productId,
          action,
        }
      );

      setCart(res.data.items);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  // Clear entire cart (locally + on the backend)
  const clearCart = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setCart([]);
      return;
    }

    try {
      await axios.delete(
        `https://ecommerce-mern-be-2026.vercel.app/api/clear/${userId}`
      );
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.qty, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice,
        fetchCart,
        clearCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};