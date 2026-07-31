import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAddress } from "../context/AddressContext";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const { wishlist, clearWishlist } = useWishlist();
  const { cart, clearCartState } = useCart();
  const { clearOrders } = useOrder();
  const { clearAddresses } = useAddress();
  const navigate = useNavigate();
  const location = useLocation();

const handleLogout = () =>{
  localStorage.removeItem("token");
  clearOrders();
  clearCartState();
  clearWishlist();
  clearAddresses();
  navigate("/login");
}

  // Sync search input with URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  // Define paths where the navbar should NOT appear
  const hideNavbarPaths = ["/login", "/signup"];

  // ⚠️ FIX: Early return must happen AFTER all hooks have been declared
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  function onSearchClicked(e) {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      navigate(`/products`); // Back to all products
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          BookStore
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse align-items-start text-start" id="navbarContent">
          
          <form className="d-flex flex-column flex-lg-row mx-lg-auto my-2" style={{ maxWidth: "600px", width: "100%" }} onSubmit={onSearchClicked}>
            <input
              className="form-control w-100 mb-2 mb-lg-0 me-lg-2"
              type="search"
              placeholder="Search books..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-outline-light">
                Search
              </button>
              {searchValue && (
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => {
                    setSearchValue("");
                    navigate("/products");
                  }}
                >
                  ❌
                </button>
              )}
            </div>
          </form>

          {/* Navigation Links */}
          <ul className="navbar-nav ms-lg-auto flex-column flex-lg-row align-items-start align-items-lg-center">
            <li className="nav-item w-100 text-start">
              <Link className="nav-link w-100 text-start me-2" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item w-100 text-start">
              <Link className="nav-link w-100 text-start me-2 text-nowrap" to="/wishlist">
                Wishlist
                {wishlist.length > 0 && (
                  <span className="badge bg-danger ms-2">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item w-100 text-start">
              <Link className="nav-link w-100 text-start me-2 text-nowrap" to="/cart">
                Cart
                {cart.length > 0 && (
                  <span className="badge bg-danger ms-2">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item w-100 text-start">
              <Link className="nav-link w-100 text-start me-2" to="/profile">
                Profile
              </Link>
            </li>

            <li className="nav-item w-100 text-start">
             <button className="btn btn-outline-danger btn-sm ms-lg-2 mt-1 mt-lg-0"
             onClick={handleLogout}
             >
              Sign Out
             </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;