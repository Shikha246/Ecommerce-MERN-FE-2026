import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AddressProvider } from "./context/AddressContext";
import { OrderProvider } from "./context/OrderContext";
import Footer from "./components/Footer";

// Wrapper for Routes that REQUIRE a user to be logged in
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// Wrapper for Routes that are ONLY for logged-out users (Login & Signup)
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <AddressProvider>
              <OrderProvider>
                <Navbar />
                <ToastContainer />
                
                <Routes>
                  {/* ==============================================
                      PROTECTED ROUTES (Must log in to see)
                     ============================================== */}
                  <Route 
                    path="/" 
                    element={<ProtectedRoute><Home /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/profile" 
                    element={<ProtectedRoute><Profile /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/checkout" 
                    element={<ProtectedRoute><Checkout /></ProtectedRoute>} 
                  />

                  {/* ==============================================
                      PUBLIC-ONLY ROUTES (Hidden if logged in)
                     ============================================== */}
                  <Route 
                    path="/login" 
                    element={<PublicRoute><Login /></PublicRoute>} 
                  />
                  <Route 
                    path="/signup" 
                    element={<PublicRoute><Signup /></PublicRoute>} 
                  />

                  {/* ==============================================
                      OPEN ROUTES (Anyone can view anytime)
                     ============================================== */}
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/address" element={<Address />} />

                  {/* CATCH-ALL REDIRECT */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                <Footer />
              </OrderProvider>
            </AddressProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;