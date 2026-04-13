import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
function ProductDetails({isWishlistPage}){
// debugger;
  const { id } = useParams();

  const { products } = useProducts();
const { cart , addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const product = products.find(x => x._id == id);

  if(!product) return <h2>Product not found</h2>
const isInCart = cart.some(
  item => item.productId === product._id.toString()
);
// const isInCart = cart.some(
//   item => item._id === product._id
// );
const isInWishlist = wishlist?.some(
  (id) => id.toString() === product._id.toString()
);
  return(

    <div className="container mt-4">
      
<div className="row">
  <div className="card">
      <h2>{product.name}</h2>

      <img src={product.image} width="200" height="200" className="img-fluid"/>

      <p className="text-muted" style={{fontSize:10}}>{product.description}</p>

      <p style={{fontSize:20}}><strong>Price:</strong> ₹{product.price}</p>

      <p style={{fontSize:20}}><strong>Rating:</strong> ⭐ {product.rating}</p>
      <p style={{fontSize:20}}><strong>In Stock:</strong> {product.stock}</p>

<div className="d-flex flex-wrap gap-2 mt-2">

  {!isWishlistPage && (
    <button
      className="btn btn-primary btn-sm flex-fill responsive-btn"
      onClick={() => addToCart(product)}
      disabled={isInCart}
    >
      {isInCart ? "In Cart" : "Add to Cart"}
    </button>
  )}

  {isWishlistPage ? (
    <>
      <button
        className="btn btn-primary btn-sm flex-fill responsive-btn"
        onClick={() => {
          addToCart(product);
//           addToCart({
//   productId: product._id,
//   ...product
// });
          removeFromWishlist(product._id);
        }}
      >
        Move to Cart
      </button>

      <button
        className="btn btn-danger btn-sm flex-fill responsive-btn"
        onClick={() => removeFromWishlist(product._id)}
      >
        Remove
      </button>
    </>
  ) : isInWishlist ? (
    <button className="btn btn-secondary btn-sm flex-fill responsive-btn" disabled>
      Wishlisted
    </button>
  ) : (
    <button
      className="btn btn-outline-danger btn-sm flex-fill responsive-btn"
      onClick={() => addToWishlist(product)}
    >
      Wishlist
    </button>
  )}

</div>

      </div>

</div>

    </div>

  )

}

export default ProductDetails