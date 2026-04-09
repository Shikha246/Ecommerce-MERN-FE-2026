import { Link } from "react-router-dom";
import { fetchProducts, useProducts } from "../context/ProductContext";
import Explore from "../components/Explore";

function Home(){

const { products,setProducts }  = useProducts();


console.log(products);
 console.log("before function")
 fetchProducts().then((allProducts) => {
  debugger;
 console.log("after function");
 console.log(allProducts);
if(allProducts.length > products.length){
  debugger;
  console.log("inside function");
setProducts(allProducts);
}
}); 




// let filteredProducts = products.filter(x => x.category.toLowerCase() == category);
// console.log(filteredProducts); 
// setProducts(filteredProducts);


  return(

    <div className="container-fluid text-center mt-5">

      <h1>Welcome to BookStore</h1>

<Explore product={products} />

      <Link className="btn btn-primary mt-3" to="/products">
        Explore Books
      </Link>

    </div>
  )

}

export default Home