import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { About } from "./components/pages/About";
import { Categories } from "./components/pages/Categories";
import { Services } from "./components/pages/Services";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Item from "./components/pages/Item";
// import { Product } from "./components/Product";
import { useState, useEffect } from "react";
import ProductManager from './components/ProductManager';
import { AuthContext } from "./Context/AuthContext";
import Payment from "./components/Payment";
import Timer from "./components/pages/Timer";
import OrdersPage from "./components/Orders";
import { CartProvider } from "./Context/CartContext";


  


const userId = "user@gmail.com";

function App() {
  const [cartItems, setCartItems] = useState([]); // ✅ Fixed
  const [items, setItems] = useState([]); // ✅ Fixed
  // const [fetchItems] = useState([]);
  // const [handleAddToCart] = useState([]);

  fetch("http://localhost:5500/items")
  .then(res => res.json())
  .then(data => console.log("Fetched Items:", data))
  .catch(error => console.error("Error fetching items:", error));
  

  // const fetchCartItems = () => {
  //   fetch(`http://localhost:5500/carts/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched Cart Items:", JSON.stringify(data, null, 2));
  //       if (Array.isArray(data) && data.length > 0 && data[0].itemId) {
  //         setCartItems(data);
  //       } else {
  //         console.error("❌ Cart data is missing product details:", data);
  //         setCartItems([]);
  //       }
  //     })
  //     .catch((error) => console.error("❌ Error fetching cart:", error.message));
  // };

  // const handleAddToCart = (item) => {
  //   console.log("Adding to cart:", item);

  //   fetch(`http://localhost:5500/cart/${userId}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       itemId: item.id,
  //       quantity: 1,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((newItem) => {
  //       console.log("New Item Added to Cart:", newItem);
  //       fetchCartItems();
  //     })
  //     .catch((error) => console.error("❌ Error adding to cart:", error.message));
  // };
  // const handleDeleteItem = (itemId) => {
  //   fetch(`http://localhost:5500/items/${itemId}`, { method: "DELETE" })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setItems([]);  // 🔥 Force UI update by clearing first
  //       setTimeout(fetchItems, 100); // ✅ Fetch fresh data after a small delay
  //     })
  //     .catch((error) => console.error("Error deleting item:", error));
  // };
  
  
  
  return (
    <div className="App">
      <Navbar />
<ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/items" element={<Item/>} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/useContext" element={<AuthContext/>}/>
        <Route path="/payment" element={<Payment />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path="/login/admin" element={<AdminLogin />} />
<Route path="/login/user" element={<UserLogin />} /> */}

      </Routes>
    </div>
  );
}

export default App;
