import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { useOrder } from "../context/OrderContext";
import { toast } from "react-toastify";
function Checkout() {
  const { cart } = useCart();
  const { selectedAddress } = useAddress();
  const { placeOrder } = useOrder();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast("Please select an address first");
      return;
    }

    placeOrder(cart, selectedAddress);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="container mt-4">
        <h2 className="text-success">Order Placed Successfully</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <h4>Delivery Address</h4>
      {!selectedAddress ? (
        <div className="alert alert-warning">
          No address selected
          <br />
          <Link to="/address" className="btn btn-primary mt-2">
            Add / Select Address
          </Link>
        </div>
      ) : (
        <div className="card p-3 mb-3">
          {[selectedAddress.name, selectedAddress.street, selectedAddress.city, selectedAddress.state, selectedAddress.pincode]
            .filter(Boolean)
            .join(", ")}
        </div>
      )}

      <button
        className="btn btn-success mt-3"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
