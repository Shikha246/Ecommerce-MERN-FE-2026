import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserIdFromToken } from "../utils/auth";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setWishlist([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://ecommerce-mern-be-2026.vercel.app/api/wishlist/${userId}`
      );
      setWishlist(res.data?.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const clearWishlist = () => setWishlist([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    try {
      const res = await axios.post(
        "https://ecommerce-mern-be-2026.vercel.app/api/wishlist/add",
        {
          userId: getUserIdFromToken(),
          productId: product._id,
        }
      );

      setWishlist(res.data.products);
      toast.success("Added successfully to wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const userId = getUserIdFromToken();

      const res = await axios.delete(
        `https://ecommerce-mern-be-2026.vercel.app/api/wishlist/remove/${userId}/${productId}`
      );

      const data = res.data;
      setWishlist(data.products || data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};