import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // ✅ use this
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";  // Import axios
import "./About.css";
import { toast } from "react-toastify";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [upiAddress, setUpiAddress] = useState("");
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({ flatName: "", city: "", additionalInfo: "" });
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { cart, clearcart } = useCart(); // ✅ Use useCart hook to get cart data
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate total price

  const { token } = useContext(AuthContext); // Use context for token
  const navigate = useNavigate();

  console.log('Cart:', cart);

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod(method);
    setShowPaymentDetails(true);
    if (method === "COD") setShowAddressForm(true); // Automatically show address for COD
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUPIChange = (e) => {
    setUpiAddress(e.target.value);
  };

  const handlePaymentDetailsSubmit = () => {
    if (
      (paymentMethod === "Card" && cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv) ||
      (paymentMethod === "UPI" && upiAddress)
    ) {
      setShowAddressForm(true); // Show address form after valid payment details
    } else {
      alert("Please fill out all payment details.");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = async () => {
    try {
      // Concatenate the address fields into one string (or format it as required)
      const fullAddress = `${address.flatName}, ${address.city}, ${address.additionalInfo}`;
  
      const response = await axios.post(
        'http://localhost:5500/cart/orders',  
        { items: cart, totalPrice: totalPrice, address: fullAddress }, // Send the full address as a string
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      navigate("/timer");
    } catch (error) {
      console.error("Order placement failed: ", error.response ? error.response.data : error.message);
      alert("Order placement failed!");
    }
  };
  

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🧾 Payment Portal</h2>
      <p>Please select your payment method:</p>

      <button style={{ margin: "10px" }} onClick={() => handlePaymentMethodClick("Card")}>
        💳 Card
      </button>
      <button style={{ margin: "10px" }} onClick={() => handlePaymentMethodClick("UPI")}>
        📱 UPI
      </button>
      <button style={{ margin: "10px" }} onClick={() => handlePaymentMethodClick("COD")}>
        🚚 Cash on Delivery
      </button>

      {paymentMethod === "Card" && showPaymentDetails && !showAddressForm && (
        <div style={{ marginTop: "20px" }}>
          <h3>Enter Card Details:</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleCardChange}
          />
          <br />
          <input
            type="text"
            name="expiry"
            placeholder="Expiry (MM/YY)"
            value={cardDetails.expiry}
            onChange={handleCardChange}
          />
          <br />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleCardChange}
          />
          <br />
          <button onClick={handlePaymentDetailsSubmit}>Proceed to Address</button>
        </div>
      )}

      {paymentMethod === "UPI" && showPaymentDetails && !showAddressForm && (
        <div style={{ marginTop: "20px" }}>
          <h3>Enter UPI ID:</h3>
          <input
            type="text"
            placeholder="yourname@upi"
            value={upiAddress}
            onChange={handleUPIChange}
          />
          <br />
          <p>or select from:</p>
          <button onClick={() => setUpiAddress("gpay@upi")}>GPay</button>
          <button onClick={() => setUpiAddress("phonepe@upi")}>PhonePe</button>
          <br />
          <button onClick={handlePaymentDetailsSubmit}>Proceed to Address</button>
        </div>
      )}

      {showAddressForm && !isAddressSubmitted && (
        <div style={{ marginTop: "20px" }}>
          <h3>Enter Your Delivery Address:</h3>
          <input
            type="text"
            name="flatName"
            placeholder="Flat/Apartment Name"
            value={address.flatName}
            onChange={handleAddressChange}
          />
          <br />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
          />
          <br />
          <textarea
            name="additionalInfo"
            placeholder="Additional Info (Optional)"
            value={address.additionalInfo}
            onChange={handleAddressChange}
          />
          <br />
          <button onClick={handleAddressSubmit}>Submit Address</button>
        </div>
      )}

      {isAddressSubmitted && (
        <div style={{ marginTop: "20px", fontSize: "1.2rem", color: "green" }}>
          <p>Your order will be delivered within 10 minutes! 🚚</p>
          <p>Payment Method: {paymentMethod}</p>
        </div>
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            borderRadius: "8px",
            zIndex: "1000",
          }}
        >
          <h3>⏳ Your Order is On the Way!</h3>
          <p>It will reach you shortly, within 10 minutes!</p>
          <button onClick={handlePopupClose}>Close and Continue</button>
        </div>
      )}
    </div>
  );
};

export default Payment;
