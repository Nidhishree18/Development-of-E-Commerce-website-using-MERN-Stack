import React, { useEffect, useState } from "react";
import axios from "axios";
import "./order.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const OrderPage = () => {
  const [orderDetails, setOrderDetails] = useState([]); // Holds the fetched order details
  const [loading, setLoading] = useState(true); // Loading state to display when data is being fetched
  const [error, setError] = useState(null); // Error state to show any issues during fetch

  dayjs.extend(relativeTime);

  // Use effect to fetch orders when the component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5500/cart/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token
          },
        });
        console.log("Order Data:", response.data); // Debug: Check here if orders are coming
        setOrderDetails(response.data.orders); // Note: access `.orders`
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order data:", err);
        setError("Failed to load order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []); // Empty dependency array to only run this effect once (on mount)

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error if any
  if (error) return <p>{error}</p>;

  // Helper function to check if order is delivered
  const getOrderStatus = (orderDate) => {
    const orderTime = dayjs(orderDate);
    const currentTime = dayjs();
    const minutesDiff = currentTime.diff(orderTime, 'minute'); // Get difference in minutes

    // If order time is more than 10 minutes ago, display 'Delivered'
    return minutesDiff >= 10 ? 'Delivered' : 'In Progress';
  };

  // Check if orderDetails is populated and render
  return (
    <div className="order-container">
      <h2>Order Summary</h2>
      {orderDetails.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>
          <p>Customer: {order.user}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((items, index) => (
              <li key={index} className="order-item">
                <img
                src={items.image || '/images/default-image.jpg'} // Fallback to default image
                alt={items.name}
                className="order-item-image"
              />
                <span>{items.name}</span> - <span>${items.price}</span> x{" "}
                <span>{items.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="status">
            Status: {getOrderStatus(order.date)}
            {getOrderStatus(order.date) === "In Progress" && (
              <div className="vehicle-moving">
                <img
                  src="data:image/jpeg;base64,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" // Replace with your car image URL
                  alt="Vehicle Moving"
                  className="vehicle-icon"
                />
              </div>
            )}
          </p>
          <p className="timer">
            Ordered {dayjs(order.date).fromNow()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
