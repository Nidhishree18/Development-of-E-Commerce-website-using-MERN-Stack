import React, { useEffect, useState, useContext } from "react";
import "./Card.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const sliderCategories = [
  { id: 18, name: "Baby Care", image: "/images/babycare.png" },
  { id: 19, name: "Pet Supplies", image: "/images/pet.png" },
  { id: 20, name: "Pharmacy", image: "/images/pharma.png" },
  { id: 9, name: "Tea", image: "/images/tea.png" },
];

const Card = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5500/items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (item) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5500/cart/add`,
        { itemId: item._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Item added to cart");
        navigate("/cart");
      } else {
        alert("Failed to add to cart");
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("An error occurred while adding to cart.");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home-container">
      <h1>Welcome to Blinkit</h1>

      <div className="paan-corner">
        {loading ? (
          <p className="loading">Loading items...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          items[0] && <img src={items[0].image} alt={items[0].name} />
        )}
      </div>

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {sliderCategories.map((item) => (
            <div key={item.id} className="image-card">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="category-grid">
        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="category-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
