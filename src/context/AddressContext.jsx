import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUserIdFromToken } from "../utils/auth";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const normalizeAddressesPayload = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.addresses)) return payload.addresses;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  };

  const normalizeAddressPayload = (payload) => {
    if (!payload) return null;
    if (payload.address) return payload.address;
    if (payload._id) return payload;
    return null;
  };

  // 📥 Fetch Addresses — always reads the CURRENT logged-in user, fresh
  const fetchAddresses = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setAddresses([]); // no one logged in — don't show anyone's addresses
      return;
    }
    try {
      const res = await axios.get(
        `https://ecommerce-mern-be-2026.vercel.app/api/address/${userId}`
      );
      setAddresses(normalizeAddressesPayload(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const clearAddresses = () => {
    setAddresses([]);
    setSelectedAddress(null);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const addAddress = async (address) => {
    const userId = getUserIdFromToken();
    if (!userId) return null;

    try {
      const res = await axios.post(
        "https://ecommerce-mern-be-2026.vercel.app/api/address",
        { ...address, userId }
      );

      const createdAddress = normalizeAddressPayload(res.data);
      if (createdAddress) {
        setAddresses((current) => [...current, createdAddress]);
        return createdAddress;
      }
      await fetchAddresses();
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(
        `https://ecommerce-mern-be-2026.vercel.app/api/address/delete/${id}`
      );
      setAddresses((current) => current.filter((addr) => addr._id !== id));
      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateAddress = async (id, updatedAddress) => {
    try {
      const response = await axios.put(
        `https://ecommerce-mern-be-2026.vercel.app/api/address/update/${id}`,
        updatedAddress
      );
      const savedAddress = normalizeAddressPayload(response.data);

      if (savedAddress) {
        setAddresses((current) =>
          current.map((addr) => (addr._id === id ? savedAddress : addr))
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
        updateAddress,
        fetchAddresses,
        clearAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};