import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
import { getUserIdFromToken } from "../utils/auth";



const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);

 


 // ✅ Fetch orders from DB
const fetchOrders = async () => {
    const userId = getUserIdFromToken(); // read fresh, not stale
    if (!userId) {
      setOrders([]); // no user logged in — clear any leftover data
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://ecommerce-mern-be-2026.vercel.app/api/orders/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Re-fetch whenever the token changes — covers login/logout in another
    // tab, and we'll also call fetchOrders() manually right after login below.
    window.addEventListener("storage", fetchOrders);
    return () => window.removeEventListener("storage", fetchOrders);
  }, []);

  const placeOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

   const clearOrders = () => setOrders([]);
  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchOrders, clearOrders}}>
      {children}
    </OrderContext.Provider>
  );
};