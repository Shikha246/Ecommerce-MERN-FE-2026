import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import {Navigate, useNavigate} from "react-router-dom";
function Wishlist() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { products } = useProducts();

  
const wishlistProducts = products.filter(p =>
  (wishlist || []).some(id => id.toString() === p._id.toString())
);
// console.log("wishlist:", wishlist);
// console.log("wishlist:", wishlist[0]);
// console.log("products ids:", products.map(p => p._id));


//  console.log("result =",wishlistProducts);

  return (
    
<div className="container mt-4">
  <h2 className="text-center mb-4">My Wishlist({wishlistProducts.length}) 💖</h2>
    <div className="row justify-content-center">
    {wishlistProducts.length === 0 ? (
      <div className="text-center py-5">
    <div className="mb-4">
      {/* A clean Bootstrap shopping bag icon placeholder using pure CSS shapes */}
      <div 
        className="mx-auto border border-3 rounded-circle d-flex align-items-center justify-content-center text-muted" 
        style={{ width: "80px", height: "80px", fontSize: "2rem",backgroundColor:"black" }}
      >
        💖
      </div>
    </div>
    <h3 className="fw-bold">Your Wishlist is Empty</h3>
    <p className="text-muted mb-4">
      Looks like you haven't added anything to your wishlist yet.
    </p>
    <button 
      className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
      onClick={() => navigate("/")} // Change "/" to your actual shop route if it's different
    >
      Continue Shopping
    </button>
  </div>
    ) : (
      wishlistProducts.map(product => (
  <div
    /* Changed col-md-4 to col-md-3, and col-lg-3 to col-lg-2.4 (or col-xl-2) */
    className="col-12 col-sm-6 col-md-3 col-lg-2 d-flex justify-content-center mb-4"
    key={product._id}
  >
    <ProductCard
      product={product}
      isWishlistPage={true}
    />
  </div>
))
    )}
  </div>
</div>
  );
}

export default Wishlist;