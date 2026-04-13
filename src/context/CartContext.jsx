import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // 🔹 Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

 useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-mern-be-2026.vercel.app/api/cart/65f1a2b3c4d5e6f7890abcd1"
      );

      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCart();
}, []);


  const addToCart = async (product) => {
  try {
    const res = await axios.post(
      "https://ecommerce-mern-be-2026.vercel.app/api/cart/add",
      {
        userId: "65f1a2b3c4d5e6f7890abcd1",
        product
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
          userId: "65f1a2b3c4d5e6f7890abcd1",
          productId
        }
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
        userId: "65f1a2b3c4d5e6f7890abcd1",
        productId,
        action
      }
    );

    setCart(res.data.items);
    setProducts(res.data.products); // 🔥 sync listing page
    
  } catch (err) {
    console.error(err);
  }
};
  // 🔹 Clear entire cart
  const clearCart = () => setCart([]);

  // 🔹 Total price (optimized)
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + (item.price || 0) * item.qty,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};