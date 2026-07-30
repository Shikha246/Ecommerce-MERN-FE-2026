import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAddress } from "../context/AddressContext";


const Login = () => {
  const navigate = useNavigate();
  const { fetchOrders } = useOrder();
  const { fetchCart } = useCart();
const { fetchWishlist } = useWishlist();
const { fetchAddresses } = useAddress();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }

      const response = await fetch(
        "https://ecommerce-mern-be-2026.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        await Promise.all([fetchOrders(), fetchCart(), fetchWishlist(), fetchAddresses()]);
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials");
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
        {/* Header */}
        <div className="text-center text-white p-4" style={{ background: "#a87d2e" }}>
          <h2 className="fw-bold mb-1">BookStore</h2>
          <p className="mb-0 small">Login to continue</p>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope-fill text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                placeholder="Enter your email"
                value={email}
                style={{ height: "50px", boxShadow: "none" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-lock-fill text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                placeholder="Enter your password"
                value={password}
                style={{ height: "50px", boxShadow: "none" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons Layout */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              className="btn flex-fill text-white fw-bold"
              style={{ background: "#a87d2e", height: "50px", borderRadius: "12px" }}
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              className="btn flex-fill fw-bold"
              style={{
                height: "50px",
                borderRadius: "12px",
                border: "2px solid #a87d2e",
                color: "#9e856b",
                background: "#fff",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;