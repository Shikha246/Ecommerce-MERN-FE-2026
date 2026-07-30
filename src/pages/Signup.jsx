import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAddress } from "../context/AddressContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Set initial value to an empty string
  const navigate = useNavigate();
  const { fetchOrders } = useOrder();
  const { fetchCart } = useCart();
const { fetchWishlist } = useWishlist();
const { fetchAddresses } = useAddress();

  const handleSignup = async () => {
    try {
      if (!name || !email || !password || !phone) {
        alert("Please fill in all fields");
        return;
      }

      const response = await fetch(
        "https://ecommerce-mern-be-2026.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, password }),
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        await Promise.all([fetchOrders(), fetchCart(), fetchWishlist(), fetchAddresses()]);
  navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #e6e0b7, #a87d2e)" }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "20px", overflow: "hidden" }}
      >
        <div className="text-center text-white p-4" style={{ background: "#a87d2e" }}>
          <h2 className="fw-bold mb-1">Create Account</h2>
          <p className="mb-0 small">Join our Bookstore community</p>
        </div>
        <div className="card-body p-4">
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn text-white w-100 fw-bold mb-3"
            style={{ background: "#a87d2e", height: "50px", borderRadius: "12px" }}
            onClick={handleSignup}
          >
            Create Account
          </button>

          <div className="text-center">
            <span className="small text-muted">Already have an account? </span>
            <button 
              className="btn btn-link p-0 small fw-bold" 
              style={{ color: "#a87d2e", textDecoration: "none" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;