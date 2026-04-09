import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {

  const { wishlist } = useWishlist();
  const { products } = useProducts();

  
const wishlistProducts = products.filter(p =>
  (wishlist || []).some(id => id.toString() === p._id.toString())
);
console.log("wishlist:", wishlist);
console.log("wishlist:", wishlist[0]);
console.log("products ids:", products.map(p => p._id));

console.log(typeof wishlist[0], wishlist[0]);
console.log(typeof products[0]._id, products[0]._id);
 console.log("result =",wishlistProducts);

  return (
    <div className="container mt-4">

      <h2>My Wishlist ❤️</h2>

      <div className="d-flex flex-wrap">

        {wishlistProducts.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          wishlistProducts.map(product => (
            <ProductCard   key={product._id}   product={product}  isWishlistPage={true}/>
          ))
        )}

      </div>

    </div>
  );
}

export default Wishlist;