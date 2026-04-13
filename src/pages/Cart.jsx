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
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          
          {/* ✅ LEFT SIDE - CART ITEMS */}
          <div className="col-md-8">
            {cart.map((item) => {

const isInWishlist = (wishlist || []).some(
  id => id.toString() === (item?.productId?._id || item?.productId).toString()
);
              return (
                <div key={item.productId} className="border p-3 mb-3 d-flex gap-3">
                  
                  
                {/* left Image */}
                  <img src={item.image} alt="book" width="200" height="250" />

<div className="flex-grow-1">
  <h5>{item.name}</h5>
                  {/* Quantity Controls */}
                  <div className="mt-2">
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => updateQty(item.productId, "dec")}
                    >
                      -
                    </button>

                    <strong>{item.qty}</strong>

                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => updateQty(item.productId, "inc")}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  {/* <div className="card mt-3 p-3">
                    <p>
                      <strong>Total:</strong> ₹{item.price} × {item.qty} = ₹
                      {item.price * item.qty}
                    </p>
                  </div> */}

                  {/* Quantity */}
                  <p>Quantity:{item.qty}</p>

                  {/* Actions */}
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>

                  {isInWishlist ? (
                    <button className="btn btn-secondary m-1" disabled>
                      Wishlisted
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger m-1"
                      onClick={() => addToWishlist({
    _id: item?.productId?._id || item?.productId
  })}
                    >
                      Wishlist
                    </button>
                  )}
                </div>
                </div>
              );
            })}
          </div>

          {/* ✅ RIGHT SIDE - SINGLE PRICE SUMMARY */}
          <div className="col-md-4">
            <div className="card p-3">
              <h3><strong>Price Details</strong></h3>

              {cart.map((item) => (
                <div key={item.productId} className="border p-2 mb-2">
                  <h6>{item.name}</h6>
                  <p>
                    ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                  </p>
                </div>
              ))}

              <hr />

              <h4>
                Total: ₹{" "}
                {cart.reduce(
                  (acc, item) => acc + item.price * item.qty,
                  0
                )}
              </h4>

              <button
                className="btn btn-success w-100 mt-2"
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
      )}
     
    </div>
    
  );

}

export default Cart;