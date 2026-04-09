import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

function ProductListing(){
// debugger;
  const { products,setProducts } = useProducts();
  
 const queryParams = new URLSearchParams(location.search);
const category = queryParams.get("category");

if(category != null){
  ApplyFilter(category);
}



 function ApplyFilter(category)  {
    // debugger;
console.log(products);
let filteredProducts = products.filter(x => x.category.toLowerCase() == category);
console.log(filteredProducts); 

setProducts(filteredProducts);

  }

  return(

    <div className="containerfluid mt-4 px-4">

      <div className="row">

        <div className="col-md-2 ms-2">
          <Filters />
        </div>

        <div className="col-md-9">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 col-lg-3 mb-4 d-flex justify-content-center" key={product._id}>
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