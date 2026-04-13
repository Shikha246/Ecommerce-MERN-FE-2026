
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);
  // console.log("This is wishlist STATE variable:",wishlist);
  const userId = "65f1a2b3c4d5e6f7890abcd1"; // static user

  // ✅ GET wishlist from backend (Axios)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-mern-be-2026.vercel.app/api/wishlist/${userId}`
        );

        setWishlist(res.data?.products || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ ADD to wishlist
  const addToWishlist = async (product) => {
  try {
   debugger;
    console.log("This is add to wishlist button click",product);
    const res = await axios.post(
      "https://ecommerce-mern-be-2026.vercel.app/api/wishlist/add",
      {
        userId,
        productId: product._id
      }
    );

    setWishlist(res.data.products); // ✅ VERY IMPORTANT
    console.log("Sending productId:", product._id);
    toast.success("Added successfully to wishlist")
    

  } catch (err) {
    console.log(err);
  }
};
  // ✅ REMOVE from wishlist (Axios)
  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(
        `https://ecommerce-mern-be-2026.vercel.app/api/wishlist/remove/${userId}/${productId}`
      );

      const data = res.data;

      setWishlist(data.products || data); // depends on your backend response
      toast.info("Removed from the wishlist");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};