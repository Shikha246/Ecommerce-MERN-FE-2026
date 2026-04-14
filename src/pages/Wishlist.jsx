import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {

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
    // <div className="container mt-4">

    //   <h2 className="text-center">My Wishlist ❤️</h2>

    //   <div className="d-flex flex-wrap">

    //     {wishlistProducts.length === 0 ? (
    //       <p>No items in wishlist</p>
    //     ) : (
    //       wishlistProducts.map(product => (
    //         <ProductCard   key={product._id}   product={product}  isWishlistPage={true}/>
    //       ))
    //     )}

    //   </div>

    // </div>
<div className="container">
  <h2 className="text-center">My Wishlist({wishlistProducts.length}) ❤️</h2>
    <div className="row justify-content-center">
    {wishlistProducts.length === 0 ? (
      <p className="text-center">No items in wishlist</p>
    ) : (
      wishlistProducts.map(product => (
        <div
          className="col-12 col-sm-6 col-lg-4 col-md-4 d-flex justify-content-center mb-4 p-lg-5"
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