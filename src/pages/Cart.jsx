import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="text-center">My Cart({cart.length})</h2>

      {cart.length === 0 ? (
  <div className="text-center py-5">
    <div className="mb-4">
      {/* A clean Bootstrap shopping bag icon placeholder using pure CSS shapes */}
      <div 
        className="mx-auto border border-3 rounded-circle d-flex align-items-center justify-content-center text-muted" 
        style={{ width: "80px", height: "80px", fontSize: "2rem",backgroundColor:"black" }}
      >
        🛒
      </div>
    </div>
    <h3 className="fw-bold">Your Cart is Empty</h3>
    <p className="text-muted mb-4">
      Looks like you haven't added anything to your cart yet.
    </p>
    <button 
      className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
      onClick={() => navigate("/")} // Change "/" to your actual shop route if it's different
    >
      Continue Shopping
    </button>
  </div>
) : (
        <div className="row">
          
        
       {/* ✅ LEFT SIDE - CART ITEMS */}
<div className="col-md-8">
  {cart.map((item) => {
    const isInWishlist = (wishlist || []).some(
      (id) => id.toString() === (item?.productId?._id || item?.productId).toString()
    );

    return (
  <div key={item.productId} className="card bgColor mb-3 shadow-sm">
    <div className="card-body">
      <div className="row g-3 align-items-center">
        
        {/* Responsive Image Column */}
        {/* col-4 means it takes up 1/3 of the width on medium screens and up */}
        {/* col-12 means it takes full width on small mobile screens */}
        <div className="col-12 col-md-4 text-center">
          <img 
            src={item.image} 
            alt={item.name} 
            className="img-fluid rounded" 
            style={{ maxHeight: "200px", objectFit: "contain" }} 
          />
        </div>

        {/* Details Column */}
        <div className="col-12 col-md-8">
          <h5 className="mb-1 text-center text-md-start">{item.name}</h5>
          <p className="text-muted mb-2 text-center text-md-start">Price: ₹{item.price}</p>
          {item.author && (
  <p className="text-muted small mb-1 text-center text-md-start">by {item.author}</p>
)}
          {/* Quantity Controls */}
          <div className="d-flex justify-content-center justify-content-md-start align-items-center mb-3">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.productId, "dec")}>-</button>
            <span className="mx-3 fw-bold">{item.qty}</span>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.productId, "inc")}>+</button>
          </div>

          {/* Actions */}
          <div className="text-center text-md-start">
            <button className="btn btn-sm btn-outline-danger me-2" onClick={() => removeFromCart(item.productId)}>
              Remove
            </button>
            <button 
              className={`btn btn-sm ${isInWishlist ? "btn-secondary" : "btn-outline-primary"}`} 
              onClick={() => addToWishlist({ _id: item?.productId?._id || item?.productId })}
              disabled={isInWishlist}
            >
              {isInWishlist ? "In Wishlist" : "Move to Wishlist"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
);
  })}
</div>

       {/* ✅ RIGHT SIDE - PRICE SUMMARY */}
<div className="col-md-4">
  <div className="card bgColor shadow-sm border-0 position-sticky" style={{ top: "20px" }}>
    <div className="card-body">
      <h4 className="card-title mb-4 fw-bold">Price Details</h4>
      
      {/* Itemized List */}
      <div className="mb-3">
        {cart.map((item) => (
          <div key={item.productId} className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted text-truncate me-2" style={{ maxWidth: "60%" }}>
              {item.name} <small>(x{item.qty})</small>
            </span>
            <span className="fw-semibold">₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <hr className="text-muted" />

      {/* Grand Total */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 fw-bold">Total Amount:</h5>
        <h4 className="mb-0 text-success fw-bold">
          ₹{cart.reduce((acc, item) => acc + item.price * item.qty, 0)}
        </h4>
      </div>

      {/* Action Button */}
      <button
        className="btn btn-success w-100 py-2 fw-semibold shadow-sm"
        onClick={() => {
          navigate("/profile");
          toast.success("Proceeded to checkout");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
</div>

        </div>
      )}
     
    </div>
    
  );

}

export default Cart;