import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("Bengaluru, Karnataka, India");
  const [isEditing, setIsEditing] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const handleLocationChange = () => {
    if (newLocation.trim() !== "") {
      setLocation(newLocation);
      setIsEditing(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDOQFRl_d7S-rLjzBQqOwzSoug5mFSpESiA&s"
          alt="Blinkit"
          className="logo-img"
        />
      </div>

      <div className="center-nav">
        <div className="location">
          <strong>Delivery in 10 minutes</strong>
          {isEditing ? (
            <div className="location-edit">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter new location"
              />
              <button onClick={handleLocationChange}>Save</button>
            </div>
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className="location-text"
            >
              {location} !
            </p>
          )}
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder='Search "chocolate"' />
        </div>
      </div>

      <div className="right-nav">
        <NavLink to="/About" className="nav-item">
        About
        </NavLink>
        <NavLink to="/Services" className="nav-item">
        Services
        </NavLink>
        <NavLink to="/Categories" className="nav-item">
        Categories
        </NavLink>
        {/* <NavLink to="/Product" className="nav-item">
          Products
        </NavLink> */}
        <NavLink to="/login" className="nav-item login-btn">
          Login
        </NavLink>
        <NavLink to="/signup" className="nav-item signup-btn">
          Signup
        </NavLink>

        <NavLink to="/cart" className="cart-btn">
          <FaShoppingCart className="cart-icon" /> My Cart
        </NavLink>
        <NavLink to="/orders" className="nav-item">
          Orders
        </NavLink>
      </div>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <ul className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        <li>
          <NavLink to="/Home" className="mobile-nav-item">Home</NavLink>
        </li>
        <li>
          <NavLink to="/About" className="mobile-nav-item">About</NavLink>
        </li>
        <li>
          <NavLink to="/Services" className="mobile-nav-item">Services</NavLink>
        </li>
        <li>
          <NavLink to="/Categories" className="mobile-nav-item">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="mobile-nav-item">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="mobile-nav-item">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="mobile-nav-item">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="mobile-nav-item">Orders</NavLink>
        </li>
      </ul>
    </nav>
  );
};
