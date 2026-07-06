
import { useState } from "react";
import { useProducts } from "../context/ProductContext";

function Filters({ filters, setFilters }) {
  const { allProducts,products, setProducts } = useProducts();

  const clearAll = () => {
  setFilters({
    category: [],
    sort: "",
    ratingRange: 0
  });
};

  const filteredProducts = products
  .filter(product => {
    const matchCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category);

    const matchRating =
  filters.ratingRange === "1-3"
    ? product.rating >= 1 && product.rating <= 3
    : filters.ratingRange === "4-5"
    ? product.rating >= 4 && product.rating <= 5
    : true;

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
{/* RATING */}
<p>Rating</p>

<label>
  <input
    className="me-2"
    type="radio"
    name="ratingRange"
    checked={filters.ratingRange === "1-3"}
    onChange={() =>
      setFilters(prev => ({ ...prev, ratingRange: "1-3" }))
    }
  />
  1 – 3 ⭐
</label>
<br />

<label>
  <input
    className="me-2"
    type="radio"
    name="ratingRange"
    checked={filters.ratingRange === "4-5"}
    onChange={() =>
      setFilters(prev => ({ ...prev, ratingRange: "4-5" }))
    }
  />
  4 – 5 ⭐
</label>
<br />

<label>
  <input
    className="me-2"
    type="radio"
    name="ratingRange"
    checked={filters.ratingRange === ""}
    onChange={() =>
      setFilters(prev => ({ ...prev, ratingRange: "" }))
    }
  />
  All ratings
</label>

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