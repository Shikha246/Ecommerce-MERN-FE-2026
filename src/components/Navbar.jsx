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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

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
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Search Bar */}
          <form className="d-flex mx-auto w-50" onSubmit={onSearchClicked}>
            <input
  className="form-control me-2"
  type="search"
  placeholder="Search books..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)} 
/>

            <button className="btn btn-outline-light">
              Search
            </button>
     {searchValue && (
  <button onClick={() => {
    setSearchValue("");
    navigate("/products");
  }}>
    ❌
  </button>
)}
          </form>
          

          {/* Navigation Links */}
          {/* <div className="navbar-nav">

            <Link className="btn btn-outline-light mx-2"  to="/products">
              Products
              
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/wishlist">
              Wishlist 

  
  <span className="translate-middle badge rounded-pill bg-danger">
  {wishlist.length}
</span>
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/cart">
              Cart
              <span class="translate-middle badge rounded-pill bg-danger">
  {cart.length}
</span>
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/profile">
              Profile
            </Link>

          </div> */}
          <ul className="navbar-nav ms-auto">

  <li className="nav-item">
    <Link className="nav-link" to="/products">
      Products
    </Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/wishlist">
      Wishlist
      <span className="badge bg-danger ms-1">
        {wishlist.length}
      </span>
    </Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/cart">
      Cart
      <span className="badge bg-danger ms-1">
        {cart.length}
      </span>
    </Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/profile">
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