import { Link } from "react-router-dom";
import { fetchProducts, useProducts } from "../context/ProductContext";
import Explore from "../components/Explore";

function Home(){

const { products,setProducts }  = useProducts();


console.log(products);
 console.log("before function")
 fetchProducts().then((allProducts) => {
  // debugger;
 console.log("after function");
 console.log(allProducts);
if(allProducts.length > products.length){
  // debugger;
  console.log("inside function");
setProducts(allProducts);
}
}); 

  return(
<div class="hero-image">
    <div className="container-fluid text-center">

      <h1>Welcome to BookStore</h1>

<Explore product={products} />

      <Link className="btn my-btn mt-3" to="/products">
        Explore Books
      </Link>

    </div>
    </div>
  )

}

export default Home