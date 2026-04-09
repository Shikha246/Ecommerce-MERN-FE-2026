import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);
const userId = "65f1a2b3c4d5e6f7890abcd1";
  // const placeOrder = (cartItems, address) => {
  //   const newOrder = {
  //     id: Date.now(),
  //     items: cartItems,
  //     address,
  //     total: cartItems.reduce(
  //       (total, item) => total + item.price * item.qty,
  //       0
  //     ),
  //     date: new Date().toLocaleString()
  //   };

  //   setOrders(prev => [...prev, newOrder]);
  // };

 // ✅ Fetch orders from DB
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce-mern-be-2026.vercel.app/api/orders/${userId}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Load on refresh
  useEffect(() => {
    fetchOrders();
  }, []);


  const placeOrder = (order) => {
  setOrders(prev => [order, ...prev]);
};
  return (
    <OrderContext.Provider value={{ orders, placeOrder}}>
      {children}
    </OrderContext.Provider>
  );
};