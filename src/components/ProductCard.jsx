import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";


function ProductCard({ product, isWishlistPage }) {

  const { cart , addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();


// console.log("wishlist:", wishlist);
  

const isInCart = cart.some(
  item => item.productId === product._id.toString()
);

const isInWishlist = wishlist?.some(
  (id) => id.toString() === product._id.toString()
);
const cartItem = cart.find(
  item => item.productId === product._id.toString()
);

const quantityInCart = cartItem ? cartItem.qty : 0;

// 🔥 Dynamic stock
const availableStock = product.stock - quantityInCart;

  return (
    <div className="card w-100 h-100 d-flex flex-column">

      <Link to={`/product/${product._id}`}>
      {/* ,objectFit:"cover" */}
        <img src={product.image} className="card-img-top img-fluid product-img"  alt="product" />
      </Link>

      <div className="card-body d-flex flex-column">

        <h6>{product.name}</h6>
        <p>₹{product.price}</p>
        {!isWishlistPage && <p>⭐ {product.rating}</p>}
        <p>In Stock: {availableStock}</p>
{/* Add to Cart (ONLY for product listing) */}

<div className="d-flex flex-wrap gap-2 mt-auto pt-2">

  {!isWishlistPage && (
    <button
      className="btn btn-primary btn-sm flex-fill responsive-btn"
      onClick={() => addToCart(product)}
      disabled={isInCart || availableStock === 0}
    >
      {availableStock === 0 ? "Out of Stock" : isInCart ? "In Cart" : "Add to Cart"}
      {/* {isInCart ? "In Cart" : "Add to Cart"} */}
    </button>
  )}

  {isWishlistPage ? (
    <>
      <button
        className="btn btn-primary btn-sm flex-fill responsive-btn"
        onClick={() => {
          addToCart(product);
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
  );
}

export default ProductCard;