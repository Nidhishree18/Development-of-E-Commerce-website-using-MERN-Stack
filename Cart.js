import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Cart.css';

function Cart() {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // Fetch cart data from the backend
  const fetchCart = async () => {
    if (!token || token === "undefined") return;
    try {
      const res = await axios.get('http://localhost:5500/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data); // Save the cart items
      calculateTotal(res.data); // Calculate the total amount
    } catch (error) {
      console.error("Failed to fetch cart:", error.response?.status, error.response?.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  // Calculate the total amount of the cart
  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.itemId.price * item.quantity;
    });
    setTotalAmount(total);
  };

  // Update quantity of item in the cart
  const updateQuantity = async (itemId, quantity) => {
    await axios.put('http://localhost:5500/cart/update', { itemId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchCart(); // Refresh cart data after updating
  };

  // Remove item from the cart
  const removeItem = async (itemId) => {
    await axios.delete(`http://localhost:5500/cart/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchCart(); // Refresh cart data after removing item
  };

  // Checkout the cart and redirect to payment
  const handleCheckout = async () => {
    try {
      const address = "123 Example Street, City, Country";  // Replace with actual address logic
      const items = cart.map(item => ({
        itemId: item.itemId._id,
        quantity: item.quantity,
        price: item.itemId.price,
      }));
  
      const totalPrice = cart.reduce((total, item) => total + (item.itemId.price * item.quantity), 0);
  
      const res = await axios.post('http://localhost:5500/cart/checkout', 
        { address, items, totalPrice }, // Send items and totalPrice with request body
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      toast.success(`Order is in process! Total: ₹${totalPrice}`);
      setCart([]); // Clear cart after checkout
      setTimeout(() => {
        navigate("/payment"); // Redirect to payment page
      }, 2000);
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error(`❌ Checkout failed! ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  // Go to home page
  const goToHomePage = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {/* Show message if cart is empty */}
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty!</p>
          <button onClick={goToHomePage} className="go-home-button">
            Go to Home
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map(({ itemId, quantity }) => (
            <div key={itemId._id} className="cart-item">
              <img
                src={itemId.image || '/images/default-image.jpg'} // Fallback to default image
                alt={itemId.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p>{itemId.name} - ₹{itemId.price} x {quantity}</p>
                <button onClick={() => updateQuantity(itemId._id, quantity + 1)}>+</button>
                <button onClick={() => updateQuantity(itemId._id, quantity - 1)}>-</button>
                <button onClick={() => removeItem(itemId._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Show total amount if cart is not empty */}
      {cart.length > 0 && (
        <div className="cart-total">
          <p><strong>Total Amount: ₹{totalAmount}</strong></p>
        </div>
      )}
      
      {/* Checkout button */}
      {cart.length > 0 && (
        <div className="cart-checkout">
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
