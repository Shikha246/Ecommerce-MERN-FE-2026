import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import { useProducts } from "../context/ProductContext";

import { useState } from "react";


function Navbar() {
const [searchValue, setSearchValue] = useState("");
const [filteredProd, setFilteredProd] = useState([]);
const { products } = useProducts();
  
function onSearchClicked(e) {
  e.preventDefault();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  setFilteredProd(filtered);
}
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
          <form className="d-flex mx-auto w-50">
            <input
  className="form-control me-2"
  type="search"
  placeholder="Search books..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>
            <button className="btn btn-outline-light" onClick={onSearchClicked}>
              Search
            </button>
     
          </form>

          {/* Navigation Links */}
          <div className="d-flex">

            <Link className="btn btn-outline-light mx-2" to="/products">
              Products
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/wishlist">
              Wishlist
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/cart">
              Cart
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/profile">
              Profile
            </Link>

          </div>

        </div>
      </div>

    </nav>
    <div className="container mt-4">
    {filteredProd.length > 0 ? (
      filteredProd.map(product => (
        <ProductCard key={product._id} product={product} />
      ))
    ) : (
      <p></p>
    )}
  </div>
  </>
  );
  

}

export default Navbar;