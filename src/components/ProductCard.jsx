import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function ProductCard({ product, isWishlistPage }) {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

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
  const availableStock = product.stock;

  return (
    // Added a maxWidth safety cap so cards never balloon outwards on large rows
    <div className="card bgColor w-100 h-100 d-flex flex-column shadow-sm" style={{ maxWidth: "300px", margin: "0 auto" }}>
      
      <Link to={`/product/${product._id}`}  className="text-decoration-none ">
  {/* The wrapper guarantees a perfectly uniform box for every card */}
  <div 
    className="d-flex align-items-center justify-content-center" 
    style={{ 
      height: "200px",       // Forces every image container to be exactly 200px tall
      width: "100%",         // Matches the card width
      overflow: "hidden", 
      backgroundColor: "rgba(208, 176, 128, 0.852)", // Soft background to fill empty spaces nicely
      padding: "12px"        // Gives the book covers a neat breathing room
    }}
  >
    <img 
      src={product.image} 
      alt={product.name}
      style={{ 
        maxHeight: "100%",   // Prevents it from spilling out vertically
        maxWidth: "100%",    // Prevents it from spilling out horizontally
        objectFit: "contain" // Maintains aspect ratio perfectly without clipping
      }} 
    />
  </div>
</Link>

      <div className="card-body d-flex flex-column p-3">
        {/* Truncate text so multi-line names do not expand the card vertically */}
        <h6 className="text-truncate" title={product.name}>{product.name}</h6>
        <p className="fw-bold mb-1">₹{product.price}</p>
        {!isWishlistPage && <p className="text-warning mb-1">⭐ {product.rating}</p>}
        <p className="text-muted small mb-3">In Stock: {availableStock}</p>

       {/* Cleaner, screen-adaptive button container layout */}
<div className="d-flex gap-1 mt-auto pt-2 w-100">
  {/* Add to Cart (ONLY for product listing) */}
  {!isWishlistPage && (
    <button
      className="btn btn-primary btn-sm flex-fill text-nowrap"
      style={{ fontSize: "calc(0.7rem + 0.2vw)", minWidth: "0" }}
      onClick={() => addToCart(product)}
      disabled={isInCart || availableStock === 0}
    >
      {availableStock === 0 ? "Out" : isInCart ? "In Cart" : "Add"}
    </button>
  )}

  {isWishlistPage ? (
    <>
      <button
        className="btn btn-primary btn-sm flex-fill text-nowrap"
        style={{ fontSize: "calc(0.65rem + 0.15vw)", minWidth: "0", padding: "4px 8px" }}
        onClick={() => {
          addToCart(product);
          removeFromWishlist(product._id);
        }}
      >
        Move to Cart
      </button>

      <button
        className="btn btn-danger btn-sm text-nowrap"
        style={{ fontSize: "calc(0.65rem + 0.15vw)", padding: "4px 8px" }}
        onClick={() => removeFromWishlist(product._id)}
      >
        Remove
      </button>
    </>
  ) : isInWishlist ? (
    <button className="btn btn-secondary btn-sm flex-fill text-nowrap" style={{ fontSize: "calc(0.7rem + 0.2vw)" }} disabled>
      Wishlisted
    </button>
  ) : (
    <button
      className="btn btn-outline-danger btn-sm flex-fill text-nowrap"
      style={{ fontSize: "calc(0.7rem + 0.2vw)" }}
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