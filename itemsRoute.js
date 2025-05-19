import express from "express";
import Item from "../models/items.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create item (admin only)
router.post("/", authenticate, authorizeAdmin, async (req, res) => {
  console.log("Received request to create item:", req.body);

  const { name, price, image } = req.body;

  // Validate
  if (!name || !price || !image) {
    console.log("Missing required fields:", { name, price, image });
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newItem = new Item({
      name,
      price,
      image: image  
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err.message });
  }
});

// Delete item (admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

export default router;

// import express from "express";
// import { getAllItems, createItem, deleteItem, editItem } from "../Controller/itemController.js";
// import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Use controller functions directly
// router.get("/", getAllItems);
// router.post("/", authenticate, authorizeAdmin, createItem);
// router.post("/",authenticate,authorizeAdmin,editItem);
// router.delete("/:id", authenticate, authorizeAdmin, deleteItem);

// export default router;
