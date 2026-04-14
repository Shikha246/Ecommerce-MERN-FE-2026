
import { useState } from "react";
import { useProducts } from "../context/ProductContext";

function Filters({ filters, setFilters }) {
  const { allProducts,products, setProducts } = useProducts();

  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [sortOrder, setSortOrder] = useState("");
  // const [rating, setRating] = useState(0);

  // Handle category change
  // const handleCategoryChange = (e) => {
  //   const value = e.target.value;

  //   if (selectedCategories.includes(value)) {
  //     setSelectedCategories(selectedCategories.filter((c) => c !== value));
  //   } else {
  //     setSelectedCategories([...selectedCategories, value]);
  //   }
  // };

//   const handleCategoryChange = (e) => {
//   const value = e.target.value;

//   if (value === "All") {

//     setSelectedCategories(["All"]);
//   } else {
//     let updatedCategories;

//     if (selectedCategories.includes(value)) {
//       updatedCategories = selectedCategories.filter((c) => c !== value);
//     } else {
//       updatedCategories = [...selectedCategories.filter(c => c !== "All"), value];
//     }

//     setSelectedCategories(updatedCategories);
//   }
// };

  // Apply Filters + Sorting together
  // const applyFilters = () => {
  //   let filtered = [...allProducts];

  //   // Category filter
  //   if (selectedCategories.length > 0) {
  //     filtered = filtered.filter((p) =>
  //       selectedCategories.includes(p.category)
  //     );
  //   }

  //   // Rating filter
  //   if (rating > 0) {
  //     filtered = filtered.filter((p) => p.rating >= rating);
  //   }

  //   // Sorting
  //   if (sortOrder === "low") {
  //     filtered.sort((a, b) => a.price - b.price);
  //   } else if (sortOrder === "high") {
  //     filtered.sort((a, b) => b.price - a.price);
  //   }

  //   setProducts(filtered);
  // };

  // const applyFilters = () => {
  // let filtered = [...allProducts];

  // Category filter
  // if (
  //   selectedCategories.length > 0 &&
  //   !selectedCategories.includes("All")
  // ) {
  //   filtered = filtered.filter((p) =>
  //     selectedCategories.includes(p.category)
  //   );
  // }

  // Rating filter
  // if (rating > 0) {
  //   filtered = filtered.filter((p) => p.rating >= rating);
  // }

  // Sorting
//   if (sortOrder === "low") {
//     filtered.sort((a, b) => a.price - b.price);
//   } else if (sortOrder === "high") {
//     filtered.sort((a, b) => b.price - a.price);
//   }

//   setProducts(filtered);
// };

  // Clear everything
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
    <div>
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