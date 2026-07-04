import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
function ProductDetails({isWishlistPage}){
// debugger;
  const { id } = useParams();

  const { products } = useProducts();
const { cart , addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
// New States for Reviews
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

// States for the new review form
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

// Fetch reviews whenever the product id changes
  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        // Replace with your actual backend URL if running on a different port (e.g., http://localhost:5000)
        const response = await fetch(`https://ecommerce-mern-be-2026.vercel.app/api/reviews/${id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);


  // Form submission handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) return alert("Please fill in all fields");

    try {
      setSubmitting(true);
      const response = await fetch("https://ecommerce-mern-be-2026.vercel.app/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, username, rating, comment }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews((prev) => [newReview, ...prev]); // Prepend new review instantly
        setUsername("");
        setComment("");
        setRating(5);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const product = products.find(x => x._id == id);

  if(!product) return <h2>Product not found</h2>
const isInCart = cart.some(
  item => item.productId === product._id.toString()
);

const isInWishlist = wishlist?.some(
  (id) => id.toString() === product._id.toString()
);




  return(

   
    <div className="container py-5">
{/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb p-3 bg-light rounded-3 shadow-sm d-flex align-items-center">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none text-secondary d-flex align-items-center gap-1">
              <i className="bi bi-house-door-fill"></i> Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/products" className="text-decoration-none text-secondary">Products</a>
          </li>
          <li className="breadcrumb-item active text-dark fw-semibold text-truncate" aria-current="page" style={{ maxWidth: "200px" }}>
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row g-4 align-items-center">
        
        {/* Left Column: Product Image */}
        <div className="col-md-6 text-center">
          <div className="p-3 border rounded-3 bgColor">
            <img 
              src={product.image} 
              alt={product.name}
              className="img-fluid rounded-3" 
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-2">{product.name}</h1>
          
          {/* <div className="d-flex align-items-center gap-3 mb-3">
            <span className="badge bg-warning text-dark fs-6">
              ⭐ {product.rating}
            </span>
            <span className={`badge ${product.stock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-2 py-1`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div> */}

          {/* <h3 className="text-primary fw-semibold mb-3">
            ₹{product.price.toLocaleString('en-IN')}
          </h3> */}

          <hr />

          <p className="text-muted lh-base mb-4">
            {product.description}
          </p>

          {/* Product Info Grid */}
<div className="row g-3 mb-4">
  <div className="col-6 col-sm-4">
    <div className="p-3 border rounded bg-light-subtle h-100">
      <small className="text-muted d-block uppercase fw-semibold fs-7 mb-1 text-uppercase tracking-wider">Price</small>
      <span className="fs-5 fw-bold text-dark">₹{product.price.toLocaleString('en-IN')}</span>
    </div>
  </div>
  
  <div className="col-6 col-sm-4">
    <div className="p-3 border rounded bg-light-subtle h-100">
      <small className="text-muted d-block uppercase fw-semibold fs-7 mb-1 text-uppercase tracking-wider">Availability</small>
      <span className={`fs-6 fw-semibold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
        {product.stock > 0 ? `${product.stock} items` : 'Out of Stock'}
      </span>
    </div>
  </div>

  <div className="col-12 col-sm-4">
    <div className="p-3 border rounded bg-light-subtle h-100">
      <small className="text-muted d-block uppercase fw-semibold fs-7 mb-1 text-uppercase tracking-wider">Shipping</small>
      <span className="fs-6 fw-semibold text-dark">
        <i className="bi bi-truck me-1 text-primary"></i> Free Delivery
      </span>
    </div>
  </div>
</div>

          {/* Action Buttons Container */}
          {/* Action Buttons Container */}
<div className="d-flex gap-3 mt-4" style={{ maxWidth: "450px" }}>
  {!isWishlistPage && (
    <button
      className={`btn ${isInCart ? "btn-success" : "btn-primary"} py-2.5 px-4 flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-sm transition-btn`}
      onClick={() => addToCart(product)}
      disabled={isInCart}
    >
      <i className={`bi ${isInCart ? "bi-check-circle-fill" : "bi-cart-plus"}`}></i>
      {isInCart ? "In Cart" : "Add to Cart"}
    </button>
  )}

  {isWishlistPage ? (
    <>
      <button
        className="btn btn-primary py-2.5 px-4 flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-sm transition-btn"
        onClick={() => {
          addToCart(product);
          removeFromWishlist(product._id);
        }}
      >
        <i className="bi bi-cart-plus"></i>
        Move to Cart
      </button>
      <button
        className="btn btn-outline-danger py-2.5 px-3 d-flex align-items-center justify-content-center"
        onClick={() => removeFromWishlist(product._id)}
        title="Remove from Wishlist"
      >
        <i className="bi bi-trash"></i>
      </button>
    </>
  ) : isInWishlist ? (
    <button 
      className="btn btn-secondary py-2.5 px-4 d-flex align-items-center justify-content-center gap-2 opacity-75" 
      disabled
    >
      <i className="bi bi-heart-fill text-danger"></i>
      Wishlisted
    </button>
  ) : (
    <button
      className="btn btn-outline-danger py-2.5 px-4 d-flex align-items-center justify-content-center gap-2 transition-btn"
      onClick={() => addToWishlist(product)}
    >
      <i className="bi bi-heart"></i>
      Wishlist
    </button>
  )}
</div>
        </div>

      </div>
 

      <hr className="my-5" />

      {/* Reviews Row Layout */}
      <div className="row g-4 mb-5">
        
        {/* Left Hand: Write a Review Form */}
        <div className="col-md-5">
          <div className="card p-4 border-0 bg-light rounded-3 shadow-sm">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-pencil-square text-primary"></i> Share Your Thoughts
            </h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted text-uppercase">Your Name</label>
                <input 
                  type="text" 
                  className="form-control border-0 shadow-sm" 
                  placeholder="e.g., John Doe"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted text-uppercase">Rating</label>
                <select 
                  className="form-select border-0 shadow-sm text-warning fw-bold"
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value="4">⭐⭐⭐⭐ (4/5)</option>
                  <option value="3">⭐⭐⭐ (3/5)</option>
                  <option value="2">⭐⭐ (2/5)</option>
                  <option value="1">⭐ (1/5)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted text-uppercase">Review Description</label>
                <textarea 
                  className="form-control border-0 shadow-sm" 
                  rows="4" 
                  placeholder="What did you like or dislike about this item?"
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)} 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 transition-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <>
                    <i className="bi bi-send"></i> Submit Review
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Hand: Live Reviews Stream */}
        <div className="col-md-7">
          <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-chat-left-text-fill text-primary"></i> 
            Customer Reviews ({reviews.length})
          </h4>

          {loadingReviews ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-4 bg-light rounded text-center text-muted h-100 d-flex flex-column align-items-center justify-content-center border border-dashed py-5">
              <i className="bi bi-chat-square-dots fs-2 text-secondary mb-2"></i>
              <span>No reviews yet. Be the first to share your thoughts!</span>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3 overflow-y-auto pr-1" style={{ maxHeight: "500px" }}>
              {reviews.map((review) => (
                <div key={review._id} className="card border-0 shadow-sm p-3 bg-white rounded-3 border-start border-warning border-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{review.username}</h6>
                      <small className="text-muted" style={{ fontSize: "11px" }}>
                        {new Date(review.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                    <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1 small">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="mb-0 text-secondary" style={{ fontSize: "13.5px", lineHeight: "1.5" }}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    

    </div>
  );

  

}

export default ProductDetails