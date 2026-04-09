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

  // 🔹 Save cart to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

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

  // 🔹 Add to Cart
  // const addToCart = (product) => {
  //   setCart(prevCart => {
  //     const existing = prevCart.find(item => item._id === product._id);

  //     if (existing) {
  //       return prevCart.map(item =>
  //         item._id === product._id
  //           ? { ...item, qty: item.qty + 1 }
  //           : item 
  //       );
  //     } else {
  //       return [
  //         ...prevCart,
  //         {
  //           _id: product._id,
  //           name: product.name,
  //           price: product.price || 0,
  //           image: product.image,
  //           stock:product.stock,
  //           qty: 1
  //         }
  //       ];
  //     }
  //   });
  //   toast.success("Added to cart successfully.");
  // };


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
    toast.success("Added successfully to cart");

  } catch (err) {
    console.error(err);
  }
};

  // 🔹 Remove item completely
  // const removeFromCart = (id) => {
  //   setCart(prevCart => prevCart.filter(item => item._id !== id));
  //   toast.info("Removed from the cart");
  // };

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
  } catch (err) {
    console.error(err);
  }
};

  // 🔹 Increase quantity
  // const increaseQty = (id) => {
  //   setCart(prevCart =>
  //     prevCart.map(item =>
  //       item._id === id
  //         ? { ...item, qty: item.qty + 1 }
  //         : item
  //     )
  //   );
  // };

  // 🔹 Decrease quantity
  // const decreaseQty = (id) => {
  //   setCart(prevCart =>
  //     prevCart
  //       .map(item =>
  //         item._id === id
  //           ? { ...item, qty: Math.max(item.qty - 1, 0) }
  //           : item
  //       )
  //       .filter(item => item.qty > 0)
  //   );
  // };
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