
import { useState } from "react";
import { useProducts } from "../context/ProductContext";

function Filters({ filters, setFilters }) {
  const { allProducts,products, setProducts } = useProducts();

  const clearAll = () => {
  setFilters({
    category: [],
    sort: "",
    rating: 0
  });
};

  const filteredProducts = products
  .filter(product => {
    const matchCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category);

    const matchRating =
  product.rating >= filters.rating;

    return matchCategory && matchRating;
  })
  .sort((a, b) => {
    if (filters.sort === "lowToHigh") return a.price - b.price;
    if (filters.sort === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bgColor p-3">
      <h5>Filters</h5>

      {/* CATEGORY */}
      <p>Category</p>

      <label>
        <input
        className="me-2"
          type="checkbox"
          value="fiction"
          checked={filters.category.includes("fiction")}
          onChange={(e) => {
    const value = e.target.value;

    setFilters(prev => ({
      ...prev,
      category: e.target.checked
        ? [...prev.category, value]
        : prev.category.filter(c => c !== value)
    }));
  }}
        />
        Fiction
      </label>
<br />
      <label>
        <input
        className="me-2"
          type="checkbox"
          value="self-help"
          checked={filters.category.includes("self-help")}
          onChange={(e) => {
    const value = e.target.value;

    setFilters(prev => ({
      ...prev,
      category: e.target.checked
        ? [...prev.category, value]
        : prev.category.filter(c => c !== value)
    }));
  }}
        />
        Self Help
      </label>
      <br />

      <label>
        <input
        className="me-2"
          type="checkbox"
          value="finance"
          checked={filters.category.includes("finance")}
          onChange={(e) => {
    const value = e.target.value;

    setFilters(prev => ({
      ...prev,
      category: e.target.checked
        ? [...prev.category, value]
        : prev.category.filter(c => c !== value)
    }));
  }}
        />
        Finance
      </label>
<br />
      <label>
        <input
        className="me-2"
          type="checkbox"
          value="programming"
          checked={filters.category.includes("programming")}
          onChange={(e) => {
    const value = e.target.value;

    setFilters(prev => ({
      ...prev,
      category: e.target.checked
        ? [...prev.category, value]
        : prev.category.filter(c => c !== value)
    }));
  }}
        />
        Programming
      </label>
<br />
<label>
 <input
  className="me-2"
  type="checkbox"
  checked={filters.category.length === 0}
  onChange={() =>
    setFilters(prev => ({
      ...prev,
      category: []
    }))
  }
/>
All
</label>
<br />
      <hr />

      {/* SORT */}
      <p>Sort Price</p>

      <label>
        <input
        className="me-2"
          type="radio"
          name="price"
          value="low"
          checked={filters.sort=== "lowToHigh"}
          onChange={() =>
    setFilters(prev => ({ ...prev, sort: "lowToHigh" }))
  }
        />
        Low to High
      </label>
<br />
      <label>
        <input
        className="me-2"
          type="radio"
          name="price"
          value="high"
          checked={filters.sort === "highToLow"}
          onChange={() =>
    setFilters(prev => ({ ...prev, sort: "highToLow" }))
  }
        />
        High to Low
      </label>

      <hr />

     
{/* RATING */}
<p>Rating: {filters.rating} & above</p>

<input
  type="range"
  className="w-100"
  min="0"
  max="5"
  step="0.1"
  value={filters.rating}
  onChange={(e) =>
    setFilters(prev => ({
      ...prev,
      rating: Number(e.target.value)
    }))
  }
/>

      <hr />

      {/* BUTTONS */}
      <div class="d-flex flex-wrap gap-2">
      {/* <button className="btn btn-primary flex-fill" onClick={applyFilters}>Apply</button> */}
      <button className="btn btn-secondary flex-fill" onClick={clearAll}>Clear All</button>
    </div> 
    </div>
  );
}

export default Filters;