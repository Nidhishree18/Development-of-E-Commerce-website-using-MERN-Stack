import React from "react";
import "../Services.css"; // Import the CSS file

export const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-list">
        <div className="service-item">
          <h3>Instant Grocery Delivery</h3>
          <p>Get fresh groceries delivered to your doorstep in minutes.</p>
        </div>
        <div className="service-item">
          <h3>Fresh Produce</h3>
          <p>Handpicked fruits and vegetables for a healthy lifestyle.</p>
        </div>
        <div className="service-item">
          <h3>Household Essentials</h3>
          <p>From cleaning supplies to personal care, we have it all.</p>
        </div>
        <div className="service-item">
          <h3>24/7 Availability</h3>
          <p>Order anytime, and we deliver at your convenience.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
