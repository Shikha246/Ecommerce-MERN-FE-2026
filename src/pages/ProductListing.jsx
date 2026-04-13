import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
function ProductListing(){
// debugger;
  const { products,setProducts } = useProducts();

  const location = useLocation();
 
  const [filters, setFilters] = useState({
    category: [],
    sort: "",
    rating: 0
  });
 
  const queryParams = new URLSearchParams(location.search);
const category = queryParams.get("category");
const searchQuery = queryParams.get("search") || "";

const filteredProducts = products
  .filter(product => {
    // URL category filter
    const matchesURLCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;

    // Search filter
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Sidebar category filter
    const matchesFilterCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category);

    // Rating filter
    const matchesRating =
      product.rating >= filters.rating;

    return (
      matchesURLCategory &&
      matchesSearch &&
      matchesFilterCategory &&
      matchesRating
    );
  })
  .sort((a, b) => {
    if (filters.sort === "lowToHigh") return a.price - b.price;
    if (filters.sort === "highToLow") return b.price - a.price;
    return 0;
  });



 

  return(

    <div className="container mt-4">

      <div className="row">
{/* FILTER SIDEBAR */}
        <div className="col-md-3">
          <div className="sticky-filter mb-2">
          <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
{/* PRODUCTS */}
        <div className="col-md-9">
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 mb-3 d-flex justify-content-center" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
        
      </div>
    </div>

      </div>

    </div>

  )

}

export default ProductListing