import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ProductListing(){
// debugger;
  const { products,setProducts } = useProducts();
  const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
const category = queryParams.get("category");
const searchQuery = queryParams.get("search") || "";

const filteredProducts = products.filter(product => {
  const matchesCategory = category
    ? product.category.toLowerCase() === category.toLowerCase()
    : true;

  const matchesSearch = searchQuery
    ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  return matchesCategory && matchesSearch;

});

// if(category != null){
//   ApplyFilter(category);
// }

useEffect(() => {
  if (category) {
    ApplyFilter(category);
  }
}, [category]);

 function ApplyFilter(category)  {
    // debugger;
console.log(products);
// let filteredProducts = products.filter(x => x.category.toLowerCase() == category);
// console.log(filteredProducts); 

// setProducts(filteredProducts);

  }

  return(

    <div className="container mt-4">

      <div className="row">
{/* FILTER SIDEBAR */}
        <div className="col-md-3">
          <div className="sticky-filter">
          <Filters />
          </div>
        </div>
{/* PRODUCTS */}
        <div className="col-md-9">
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-3 mb-3 d-flex justify-content-center" key={product._id}>
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