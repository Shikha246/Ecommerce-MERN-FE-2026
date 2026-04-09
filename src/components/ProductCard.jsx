import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";


function ProductCard({ product, isWishlistPage }) {

  const { cart , addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();


console.log("wishlist:", wishlist);
  

const isInCart = cart.some(
  item => item.productId === product._id.toString()
);

const isInWishlist = wishlist?.some(
  (id) => id.toString() === product._id.toString()
);


  return (
    <div className="card m-3" style={{ width: "20rem" }}>

      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" style={{width:"20rem",height:"20rem"}} alt="product" />
      </Link>

      <div className="card-body">

        <h5>{product.name}</h5>
        <p>₹{product.price}</p>
        <p>⭐ {product.rating}</p>
        <p>In Stock:{product.stock}</p>
{/* Add to Cart (ONLY for product listing) */}
{!isWishlistPage && (
  <button
  className="btn btn-primary m-1"
  onClick={() => addToCart(product)}
  disabled={isInCart}
  
>
  {isInCart ? "In Cart": "Add to Cart"}
  
</button>

)}

{/* Wishlist Page Buttons */}
{isWishlistPage ? (
  <>
    <button
      className="btn btn-primary m-1"
      onClick={() => {
        addToCart(product);
        removeFromWishlist(product._id);
      }}
    >
      Move to Cart
    </button>

    <button
      className="btn btn-danger m-1"
      onClick={() => removeFromWishlist(product._id)}
    >
      Remove
    </button>
  </>
) : isInWishlist ? (
  <button className="btn btn-secondary m-1" disabled>
    Wishlisted
  </button>
) : (
  <button
    className="btn btn-outline-danger m-1"
    onClick={() => addToWishlist(product)}
  >
    Wishlist
  </button>
)}
      </div>
    </div>
  );
}

export default ProductCard;