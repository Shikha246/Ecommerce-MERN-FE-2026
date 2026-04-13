import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  
  const userId = "65f1a2b3c4d5e6f7890abcd1";

  const normalizeAddressesPayload = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.addresses)) return payload.addresses;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  };

 const normalizeAddressPayload = (payload) => {
  if (!payload) return null;

  // ✅ if backend sends { address: {...} }
  if (payload.address) return payload.address;

  // ✅ if backend sends direct object
  if (payload._id) return payload;

  return null;
};
  // 📥 Fetch Addresses
  const fetchAddresses = async () => {
    try {
      if (!userId) return; // ✅ safety

      const res = await axios.get(
        `https://ecommerce-mern-be-2026.vercel.app/api/address/${userId}`
      );

      setAddresses(normalizeAddressesPayload(res.data));
      console.log("FETCH RESPONSE:", res.data); 

    } catch (err) {
      console.error(err);
    }
  };
// ✅ Load once when app starts
  useEffect(() => {
    fetchAddresses();
  }, [userId]); // ✅ important

  // ➕ Add Address
  const addAddress = async (address) => {
    try {
      if (!userId) return null;

      const res = await axios.post(
        "https://ecommerce-mern-be-2026.vercel.app/api/address",
        { ...address, userId }
      );

      const createdAddress = normalizeAddressPayload(res.data);
console.log("API RESPONSE:", res.data);
      if (createdAddress) {
        setAddresses((current) => [...current, createdAddress]);
        return createdAddress;
      }
// 🔥 fallback (VERY IMPORTANT)
      await fetchAddresses();
      return null;

    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // ❌ Delete Address
  const deleteAddress = async (id) => {
    try {
      await axios.delete(
        `https://ecommerce-mern-be-2026.vercel.app/api/address/delete/${id}`
      );

      setAddresses((current) =>
        current.filter((addr) => addr._id !== id)
      );

      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }

    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Update Address
  const updateAddress = async (id, updatedAddress) => {
    try {
      // const res = await axios.put(
      //   `http://localhost:5000/api/address/${id}`,
      //   updatedAddress
      // );
// debugger;
      const response = await axios.put(`https://ecommerce-mern-be-2026.vercel.app/api/address/update/${id}`, updatedAddress);
  console.log("FULL RESPONSE:", response);
console.log("RESPONSE.DATA:", response.data);
// debugger;
      const savedAddress = normalizeAddressPayload(response.data);

      if (savedAddress) {
        setAddresses((current) =>
          current.map((addr) =>
            addr._id === id ? savedAddress : addr
          )
        );

        if (selectedAddress?._id === id) {
          setSelectedAddress(savedAddress);
        }

        return savedAddress;
      }

      await fetchAddresses();
      return response.data;

    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        deleteAddress,
        updateAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};