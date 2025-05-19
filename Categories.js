import React from 'react';
import '../Categories.css';

const categoriesData = [
  {
    title: "Chicken, Meat & Fish",
    items: ["Exotic Meat", "Chicken", "Sausage, Salami & Ham", "Fish & Seafood", "Mutton"]
  },
  {
    title: "Pet Care",
    items: ["Dog Food & Treats", "Pet Grooming & Accessories", "Accessories & Other Supplies", "Other Pet Supplies", "Pet Litter", "Cat Food & Treats", "Cat Treats", "Dog Treat", "Pet Health & Supplements", "Pet Toys"]
  },
  {
    title: "Baby Care",
    items: ["Baby Diapers", "Baby Wipes", "Baby Feeding Needs", "Hygiene"]
  },
  {
    title: "Tea, Coffee & Health Drinks",
    items: ["Vegan Drinks", "Health Drinks", "Milk Drinks", "Leaf & Dust Tea", "Vegan Milk", "Health Drinks & Supplements", "Exotic & Flavoured Tea", "Roasted & Ground Coffee", "Filter Coffee", "Tea", "Herbal Drinks", "Coffee", "Black Tea", "Hot Chocolate Drink", "Chocolate Health Drinks", "Green Tea", "Instant Coffee", "Coffee Bags"]
  },
  {
    title: "Beauty & Cosmetics",
    items: ["Hair Care", "Eyeliner", "Beauty and Makeup", "Mascara"]
  }
];

export const Categories = () => {
  return (
    <div className="categories-container">
      {categoriesData.map((category, index) => (
        <div key={index} className="category">
          <h2>{category.title}</h2>
          <div className="category-items">
            {category.items.map((item, idx) => (
              <span key={idx} className="category-item">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};