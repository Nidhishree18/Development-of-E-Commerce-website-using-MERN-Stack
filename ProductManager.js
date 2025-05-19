import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import './ProductManager.css';

const ProductManager = () => {
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState({ name: '', price: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5500/items');
      setItems(response.data);
    } catch (err) {
      console.error("Fetch items error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateItem = async () => {
    const itemData = {
      name: itemInput.name,
      price: itemInput.price,
      image: itemInput.image   // NOT imageUrl, since you are giving your own local path
    };
    
    
    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5500/items/${editItemId}`, itemData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Item updated:', response.data);
      } else {
        const response = await axios.post('http://localhost:5500/items', itemData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Item added:', response.data);
      }
      fetchItems();  // Fetch updated list after adding/editing
      setItemInput({ name: '', price: '', image: '' });  // Clear form fields
      setIsEditing(false);  // Reset editing state
    } catch (error) {
      console.error('Item save failed:', error);
      toast.error(`Error: ${error.response?.data?.message || 'Failed to save item'}`);
    }
  };

  const handleEditClick = (item) => {
    setItemInput({ name: item.name, price: item.price, image: item.image });
    setIsEditing(true);
    setEditItemId(item._id);
  };

  const cancelEdit = () => {
    setItemInput({ name: '', price: '', image: '' });
    setIsEditing(false);
    setEditItemId(null);
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();  // Fetch updated list after deleting
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="product-manager">
      <h2>{isEditing ? 'Edit Item' : 'Add Item'}</h2>

      <div className="form-section">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={itemInput.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={itemInput.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={itemInput.image}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdateItem}>
          {isEditing ? 'Save Changes' : 'Add Item'}
        </button>
        {isEditing && (
          <button onClick={cancelEdit} className="cancel-button">
            Cancel
          </button>
        )}
      </div>

      <h3>Existing Items</h3>
      {items.map((item) => (
        <div className="items-grid"> {/* <-- add this wrapper */}
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <p><strong>{item.name}</strong></p>
              <p>₹{item.price}</p>
            </div>
            <div className="item-actions">
              <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      ))}
    </div>
  );
};

export default ProductManager;
