
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAddress } from "../context/AddressContext";
import { toast } from "react-toastify";
import axios from "axios";
const user = {
  _id: "65f1a2b3c4d5e6f7890abcd1",
  name: "Shikha Ramrakhyani",
  email: "shikha@email.com",
  phone: "9876543210"
};

function Profile() {
  const { cart, clearCart } = useCart();
  const { orders, placeOrder } = useOrder();
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setSelectedAddress,
    selectedAddress
  } = useAddress();

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [editId, setEditId] = useState(null);

  // ✅ Single source of truth
  const isFormValid =
    newAddress.name.trim() &&
    newAddress.street.trim() &&
    newAddress.city.trim() &&
    newAddress.state.trim() &&
    newAddress.pincode.trim();

  // ✅ Fixed handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Add Address
  const handleAddAddress = async () => {
    try {
      const createdAddress = await addAddress(newAddress);

      if (createdAddress) {
        setSelectedAddress(createdAddress);
      }

      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
      });
      toast("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // ✅ Delete
  const handleDeleteAddress = async (id) => {
    await deleteAddress(id);

    if (selectedAddress?._id === id) {
      setSelectedAddress(null);
    }
  };

  // ✅ Start Edit
  // const startEdit = (addr) => {
  //   setNewAddress(addr);
  //   setEditId(addr._id);
  // };
const startEdit = (addr) => {
  const { _id, ...rest } = addr;
  setNewAddress(rest);
  setEditId(_id);
};
  // ✅ Update Address
  const handleUpdateAddress = async () => {
    if (!editId) return;
// debugger;
    const savedAddress = await updateAddress(editId, newAddress);

    if (savedAddress) {
      setSelectedAddress(savedAddress);
    }

    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      pincode: ""
    });

    setEditId(null);
  };

  // ✅ Place Order
  // const handlePlaceOrder = () => {
  //   if (!selectedAddress) {
  //     alert("Please select an address");
  //     return;
  //   }


// const handlePlaceOrder = async () => {
//   if (!selectedAddress) {
//     alert("Please select an address");
//     return;
//   }

//   try {
    // ✅ Clean address (remove unnecessary fields)
//     const { _id, userId: addrUserId, ...cleanAddress } = selectedAddress;

//     const orderData = {
//       userId: user._id,
//       items: cart,
//       address: cleanAddress,
//       total: cart.reduce((acc, item) => acc + item.price * item.qty, 0)
//     };

    // ✅ API CALL (THIS WAS MISSING)
//     const res = await axios.post(
//       "http://localhost:5000/api/orders/place",
//       orderData
//     );

    // ✅ Save in context (optional but good)
//     placeOrder(res.data);

//     clearCart();
//     setSelectedAddress(null);

//     alert("Order Placed Successfully!");
//   } catch (error) {
//     console.error(error);
//     alert("Failed to place order");
//   }


// const orderData = {
//   userId: user._id,
//   items: cart,
//   address: selectedAddress, // ✅ full object
//   total: cart.reduce((acc, item) => acc + item.price * item.qty, 0)
// };
//     placeOrder(cart, selectedAddress);
//     clearCart();
//     setSelectedAddress(null);
//     alert("Placed Order");
//   };
const handlePlaceOrder = async () => {
  debugger;
  if (!selectedAddress) {
    toast.warning("Please select an address");
    return;
  }

  try {
    // ✅ remove unnecessary fields
    const { _id, userId: addrUserId, ...cleanAddress } = selectedAddress;

    const orderData = {
      userId: user._id,
      items: cart,
      address: cleanAddress,
      total: cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    };

    const res = await axios.post(
      "https://ecommerce-mern-be-2026.vercel.app/api/orders/place",
      orderData
    );

    // ✅ update UI
    placeOrder(res.data);

    clearCart();
    setSelectedAddress(null);

    toast.success("Order Placed Successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to place order");
  }
};
  return (
    <div className="container mt-4">
      <h2>Profile</h2>

      {/* USER */}
      <div className="card p-3 mb-3">
        <h4>User Details</h4>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      {/* ADDRESS FORM */}
      <div className="card p-3 mb-3">
        <h4>Addresses</h4>

        <input
          className="form-control mt-2"
          placeholder="Full Name *"
          name="name"
          value={newAddress.name}
          onChange={handleChange}
        />

        <input
          className="form-control mt-2"
          placeholder="Street Address *"
          name="street"
          value={newAddress.street}
          onChange={handleChange}
        />

        <input
          className="form-control mt-2"
          placeholder="City *"
          name="city"
          value={newAddress.city}
          onChange={handleChange}
        />

        <input
          className="form-control mt-2"
          placeholder="State *"
          name="state"
          value={newAddress.state}
          onChange={handleChange}
        />

        <input
          className="form-control mt-2"
          placeholder="Pincode *"
          name="pincode"
          value={newAddress.pincode}
          onChange={handleChange}
        />

        {/* ✅ Toggle Add / Update */}
        {editId ? (
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleUpdateAddress}
            disabled={!isFormValid}
          >
            Update Address
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={handleAddAddress}
            disabled={!isFormValid}
          >
            Add Address
          </button>
        )}

        {/* ADDRESS LIST */}
        {addresses.length === 0 && (
          <p className="text-muted mt-2">No addresses added yet.</p>
        )}

        {addresses.map((addr) => (
          <div key={addr._id} className="border p-2 mt-2">
            <input
              type="radio"
              name="selectedAddress"
              checked={selectedAddress?._id === addr._id}
              onChange={() => setSelectedAddress(addr)}
            />

            <span className="ms-2">
              {[addr.name, addr.street, addr.city, addr.state, addr.pincode]
                .filter(Boolean)
                .join(", ")}
            </span>

            <div className="mt-2">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => startEdit(addr)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteAddress(addr._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PLACE ORDER */}
      <button
        className="btn btn-success mb-3"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>

      {/* ORDER HISTORY */}
      <div className="card p-3">
        <h4>Order History</h4>

        {orders.map(order => (
          <div key={order._id} className="border p-2 mb-2">
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <p>
              <strong>Address:</strong>{" "}
              {[order.address?.name, order.address?.street, order.address?.city, order.address?.state, order.address?.pincode]
                .filter(Boolean)
                .join(", ")}
            </p>

            <p><strong>Total:</strong> ₹{order.total}</p>

            {order.items.map(item => (
              <p key={item._id}>
                {item.name} x {item.qty}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;