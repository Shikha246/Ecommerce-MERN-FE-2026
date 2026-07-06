
import { useState,useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAddress } from "../context/AddressContext";
import { toast } from "react-toastify";
import axios from "axios";


function Profile() {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
  const { cart, clearCart } = useCart();
  const { orders, placeOrder } = useOrder();
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

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

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token"); 
      console.log("1. Token retrieved from storage:", token ? "YES (exists)" : "NO (null)");

      if (!token) {
        toast.error("No token found, please log in.");
        setLoading(false);
        return;
      }

      console.log("2. Sending request to backend...");
      const res = await axios.get(
        "https://ecommerce-mern-be-2026.vercel.app/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("3. Backend successfully returned data:", res.data);
      setUser(res.data);
    } catch (error) {
      // This will print the exact response error text from the backend
      console.error("4. ERROR CAUGHT DURING FETCH:", error.response?.data || error.message || error);
      toast.error("Failed to load user profile details.");
    } finally {
      setLoading(false);
    }
  };

  fetchUserProfile();
}, []);


  // ✅ Single source of truth
  const isFormValid =
    newAddress.name.trim() &&
    newAddress.street.trim() &&
    newAddress.city.trim() &&
    newAddress.state.trim() &&
    newAddress.pincode.trim().length === 6;

  // ✅ Fixed handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

     // pincode must be digits only, max 6 characters
    //  \D means "not a digit"
  const finalValue =
    name === "pincode" ? value.replace(/\D/g, "").slice(0, 6) : value;

    setNewAddress((prev) => ({
      ...prev,
      [name]: finalValue
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
    } catch (err) {
  console.error("FULL ERROR:", err.response?.data || err);
}
  };

  // ✅ Delete
  const handleDeleteAddress = async (id) => {
    await deleteAddress(id);

    if (selectedAddress?._id === id) {
      setSelectedAddress(null);
    }
  };

  

const startEdit = (addr) => {
  const { _id, ...rest } = addr;
  setNewAddress(rest);
  setEditId(_id);
  setShowModal(true); // 🔥 open modal
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

const handlePlaceOrder = async () => {
  // debugger;
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

    await clearCart();
    setSelectedAddress(null);

    setShowOrderModal(true);
  } catch (error) {
    console.error(error);
    toast.error("Failed to place order");
  }

  
};
if (loading) {
  return <div className="container mt-4"><h3>Loading profile...</h3></div>;
}

if (!user) {
  return <div className="container mt-4"><h3>Please log in to view your profile.</h3></div>;
}


  return (
    <div className="container py-5" style={{ maxWidth: "1100px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="row g-4">
        
        {/* ================= LEFT COLUMN: USER PROFILE ================= */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white position-sticky" style={{ top: "20px" }}>
            {/* User Initial Avatar Badge */}
            <div 
              className="d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3"
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
                fontSize: "1.6rem",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
              }}
            >
              {user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U"}
            </div>
            
            <h4 className="fw-bold mb-1 text-dark">{user.name}</h4>
            <p className="text-muted small mb-3">{user.email}</p>
            
            <hr className="text-muted opacity-25" />
            
            <div className="text-start mt-3">
              <div className="d-flex align-items-center gap-2 text-muted small">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className="fw-medium">{user.phone || "No phone added"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: ADDRESSES & ORDERS ================= */}
        <div className="col-12 col-md-8">
          
          {/* Section: Addresses Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold m-0 text-dark">Select Shipping Address</h4>
            <button
              className="btn btn-sm px-3 py-2 rounded-3 fw-medium text-white d-flex align-items-center gap-1 shadow-sm"
              style={{ backgroundColor: "#4f46e5", border: "none" }}
              onClick={() => {
                setShowModal(true);
                setEditId(null);
                setNewAddress({ name: "", street: "", city: "", state: "", pincode: "" });
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add New
            </button>
          </div>

          {/* Address List State */}
          {addresses.length === 0 ? (
            <div className="card text-center p-4 border-dashed bg-light mb-4 rounded-4">
              <p className="text-muted m-0">No addresses saved yet. Please add an address to proceed with your order.</p>
            </div>
          ) : (
            <div className="row g-3 mb-4">
              {addresses.map((addr) => {
                const isSelected = selectedAddress?._id === addr._id;
                return (
                  <div key={addr._id} className="col-12 col-sm-6">
                    <div 
                      className="card h-100 p-3 rounded-4 transition-all"
                      style={{
                        cursor: "pointer",
                        border: isSelected ? "2px solid #4f46e5" : "1px solid #e5e7eb",
                        backgroundColor: isSelected ? "#f8fafc" : "#ffffff",
                        boxShadow: isSelected ? "0 4px 12px rgba(79, 70, 229, 0.08)" : "0 2px 4px rgba(0,0,0,0.02)"
                      }}
                      onClick={() => setSelectedAddress(addr)}
                    >
                      <div className="d-flex justify-content-between align-items-start w-100">
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="selectedAddress"
                            className="form-check-input m-0"
                            style={{ cursor: "pointer", accentColor: "#4f46e5" }}
                            checked={isSelected}
                            onChange={() => setSelectedAddress(addr)}
                          />
                          <span className="fw-bold text-dark text-truncate" style={{ maxWidth: "140px" }}>{addr.name}</span>
                        </div>
                        
                        {/* Action Dropdown Alternative (Inline Buttons for simplicity) */}
                        <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="btn btn-link text-warning p-0 me-2" 
                            title="Edit"
                            onClick={() => startEdit(addr)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button 
                            className="btn btn-link text-danger p-0" 
                            title="Delete"
                            onClick={() => handleDeleteAddress(addr._id)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </div>

                      <div className="text-muted small mt-2 ps-4">
                        {addr.street}, {addr.city}, <br />
                        {addr.state} — <span className="fw-medium text-dark">{addr.pincode}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Place Order CTA Banner */}
          <div className="card border-0 p-3 rounded-4 shadow-sm mb-5 text-white d-flex flex-sm-row justify-content-between align-items-center gap-3"
               style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
            <div>
              <h6 className="fw-bold m-0">Ready to finalize?</h6>
              <small className="text-white-50">Please ensure your destination address is explicitly checked above.</small>
            </div>
            <button
              className="btn btn-light px-4 py-2 rounded-3 fw-bold text-indigo shadow-sm"
              style={{ color: "#4f46e5", border: "none" }}
              onClick={handlePlaceOrder}
            >
              Place Order Now
            </button>
          </div>

          {/* ================= SECTION: ORDER HISTORY ================= */}
          <h4 className="fw-bold text-dark mb-3">Order History ({orders.length})</h4>
          
          {orders.length === 0 ? (
            <p className="text-muted small italic">No orders found in your account footprint yet.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {orders.map(order => (
                <div key={order._id} className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                  {/* Summary Ribbon Header */}
                  <div className="p-3 bg-light border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2 small text-muted">
                    <div><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</div>
                    <div><strong>ID:</strong> <span className="text-dark font-monospace">{order._id.slice(-8)}</span></div>
                    <div className="ms-auto text-dark fw-bold" style={{ fontSize: "1.05rem" }}>₹{order.total}</div>
                  </div>

                  <div className="p-3">
                    {/* Item mapping inside order wrapper */}
                    <div className="mb-2">
                      <span className="text-muted small d-block mb-1">Items Summary</span>
                      {order.items.map(item => (
                        <div key={item._id} className="d-flex justify-content-between align-items-center py-1 border-bottom-dashed small">
                          <span className="text-dark fw-medium">{item.name} <span className="text-muted small">x{item.qty}</span></span>
                          <span className="text-muted">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    {/* Meta Destination details */}
                    <div className="mt-2 pt-2 border-top border-light">
                      <span className="text-muted small d-block">Shipped To:</span>
                      <span className="small text-dark fw-medium">
                        {[order.address?.name, order.address?.street, order.address?.city, order.address?.state, order.address?.pincode]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT ADDRESS ================= */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow rounded-4 p-2">
                
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold text-dark">
                    {editId ? "✏️ Edit Address Details" : "📍 Add New Address"}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body py-3">
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <label className="small fw-medium text-muted mb-1">Recipient Full Name *</label>
                      <input className="form-control rounded-3" placeholder="e.g. John Doe" name="name" value={newAddress.name} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="small fw-medium text-muted mb-1">Street Address *</label>
                      <input className="form-control rounded-3" placeholder="Suite, Flat, Street location" name="street" value={newAddress.street} onChange={handleChange} />
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="small fw-medium text-muted mb-1">City *</label>
                        <input className="form-control rounded-3" placeholder="City" name="city" value={newAddress.city} onChange={handleChange} />
                      </div>
                      <div className="col-6">
                        <label className="small fw-medium text-muted mb-1">State *</label>
                        <input className="form-control rounded-3" placeholder="State" name="state" value={newAddress.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label className="small fw-medium text-muted mb-1">Postal Pincode *</label>
                      <input className="form-control rounded-3" placeholder="6-digit postal code" name="pincode" value={newAddress.pincode} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light rounded-3 fw-medium text-muted" onClick={() => setShowModal(false)}>Cancel</button>
                  <button 
                    type="button" 
                    className="btn px-4 rounded-3 text-white fw-medium"
                    style={{ backgroundColor: editId ? "#f59e0b" : "#10b981" }}
                    disabled={!isFormValid}
                    onClick={async () => {
                      if (editId) {
                        await handleUpdateAddress();
                      } else {
                        await handleAddAddress();
                      }
                      setShowModal(false);
                    }}
                  >
                    {editId ? "Update Info" : "Save Address"}
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      
      {/* MODAL : order Placed */}
      {showOrderModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center py-5">
          <div className="mb-3" style={{ fontSize: "3rem" }}>✅</div>
          <h4 className="fw-bold mb-2">Order Placed Successfully!</h4>
          <p className="text-muted mb-4">
            Thank you for your order. You can track it in your order history below.
          </p>
          <button
            className="btn btn-success px-4"
            onClick={() => setShowOrderModal(false)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Profile;