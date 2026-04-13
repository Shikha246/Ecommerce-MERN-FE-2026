import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AddressProvider } from "./context/AddressContext";
import { OrderProvider } from "./context/OrderContext";
import Footer from "./components/Footer";

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

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />

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