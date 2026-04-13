import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
const [searchValue, setSearchValue] = useState("");
// const [filteredProd, setFilteredProd] = useState([]);
const { products } = useProducts();
const {wishlist} = useWishlist();
const {cart} = useCart();
  const navigate = useNavigate();
function onSearchClicked(e) {
  e.preventDefault();
  if (searchValue.trim()) {
    navigate(`/products?search=${searchValue}`);
  } else {
    navigate(`/products`); // 👈 back to all products
  }
}
  // const filtered = products.filter((p) =>
  //   p.name.toLowerCase().includes(searchValue.toLowerCase())
  // );
// const filteredProd = products.filter(product =>
//   product.name.toLowerCase().includes(searchQuery.toLowerCase())
// );
  // setFilteredProd(filteredProd);

  const location = useLocation();

const queryParams = new URLSearchParams(location.search);
const searchQuery = queryParams.get("search") || "";
useEffect(() => {
  setSearchValue(searchQuery);
}, [searchQuery]);

  return (
    <>
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse align-items-start text-start" id="navbarContent">

          {/* Search Bar */}
          <form className="d-flex flex-column flex-lg-row mx-lg-auto my-2" style={{ maxWidth: "600px", width: "100%" }} onSubmit={onSearchClicked}>
            <input
  className="form-control w-100 mb-2 mb-lg-0 me-lg-2"
  type="search"
  placeholder="Search books..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>


            <button className="btn btn-outline-light w-20 w-lg-auto">
  Search
</button>
     {searchValue && (
  <button
  type="button"
  className="btn btn-outline-light mt-2 mt-lg-0"
  onClick={() => {
    setSearchValue("");
    navigate("/products");
  }}
>
  ❌
</button>
)}
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
      <span className="badge bg-danger ms-2">
        {wishlist.length}
      </span>
    </Link>
  </li>

  <li className="nav-item w-100 text-start">
    <Link className="nav-link w-100 text-start me-2 text-nowrap" to="/cart">
      Cart
      <span className="badge bg-danger ms-2">
        {cart.length}
      </span>
    </Link>
  </li>

  <li className="nav-item w-100 text-start">
    <Link className="nav-link w-100 text-start me-2" to="/profile">
      Profile
    </Link>
  </li>

</ul>

        </div>
      </div>

    </nav>
    
  </>
  );
  

}

export default Navbar;