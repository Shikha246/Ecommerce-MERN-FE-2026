import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ProductDetails(){
// debugger;
  const { id } = useParams();

  const { products } = useProducts();

  const product = products.find(x => x._id == id);

  if(!product) return <h2>Product not found</h2>

  return(

    <div className="container mt-4">
      
<div className="row">
  <div className="card">
      <h2>{product.name}</h2>

      <img src={product.image} width="200" className="img-fluid"/>

      <p className="text-muted" style={{fontSize:30}}>{product.description}</p>

      <p style={{fontSize:25}}><strong>Price:</strong> ₹{product.price}</p>

      <p style={{fontSize:25}}><strong>Rating:</strong> ⭐ {product.rating}</p>
      <p style={{fontSize:25}}><strong>In Stock:</strong> {product.stock}</p>
      </div>
</div>
    </div>

  )

}

export default ProductDetails