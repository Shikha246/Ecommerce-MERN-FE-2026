import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";

const emptyAddress = {
  name: "",
  street: "",
  city: "",
  state: "",
  pincode: ""
};

function Address() {
  const {
    addresses,
    addAddress,
    selectedAddress,
    setSelectedAddress
  } = useAddress();

  const [formData, setFormData] = useState(emptyAddress);
  const navigate = useNavigate();

  const isFormValid =
    formData.name.trim() &&
    formData.street.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.pincode.trim();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // const handleAddAddress = () => {
  //   if (!isFormValid) return;

  //   const newAddress = addAddress(formData);
  //   setSelectedAddress(newAddress); // auto select newly added
  //   setFormData(emptyAddress);
  // };
const handleAddAddress = () => {
  console.log("Form Data:", formData);

  if (!isFormValid) return;

  const newAddress = addAddress(formData);
  console.log("Added:", newAddress);

  setSelectedAddress(newAddress);
  setFormData(emptyAddress);
};
  const handleProceed = () => {
    if (!selectedAddress) return;
    navigate("/profile");
  };

  return (
    <div className="container mt-4">
      <h2>Add Address</h2>

      {/* FORM */}
      <input
        className="form-control mt-2"
        placeholder="Full Name *"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="form-control mt-2"
        placeholder="Street Address *"
        value={formData.street}
        onChange={(e) => handleChange("street", e.target.value)}
      />

      <input
        className="form-control mt-2"
        placeholder="City *"
        value={formData.city}
        onChange={(e) => handleChange("city", e.target.value)}
      />

      <input
        className="form-control mt-2"
        placeholder="State *"
        value={formData.state}
        onChange={(e) => handleChange("state", e.target.value)}
      />

      <input
        className="form-control mt-2"
        placeholder="Pincode *"
        value={formData.pincode}
        onChange={(e) => handleChange("pincode", e.target.value)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={handleAddAddress}
        disabled={!isFormValid}
      >
        Add Address
      </button>

      {/* ADDRESS LIST */}
      {addresses.length > 0 && (
        <div className="mt-4">
          <h4>Select Address</h4>

          {addresses.map((addr) => (
            <div key={addr._id} className="border p-2 mt-2">
              <input
                type="radio"
                name="address"
                checked={selectedAddress?._id === addr._id}
                onChange={() => setSelectedAddress(addr)}
              />

              <span className="ms-2">
                {[addr.name, addr.street, addr.city, addr.state, addr.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* PROCEED BUTTON */}
      <button
        className="btn btn-success mt-3"
        onClick={handleProceed}
        disabled={!selectedAddress}
      >
        Proceed to Profile
      </button>
    </div>
  );
}

export default Address;