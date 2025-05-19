import express from "express";
import User from "../models/user.js";
import Item from "../models/items.js";
// import Order from "../models/order.js"; /
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only route: Get all users
router.get("/users", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "_id email role"); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// Admin-only route: Change user role
router.put("/users/:id/role", authenticate, authorizeAdmin, async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User role updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user role", error: err });
  }
});


// router.patch("/items/:id/visibility", authenticate, authorizeAdmin, async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Item not found" });
//     item.visible = !item.visible;
//     await item.save();
//     res.json({ message: `Item visibility set to ${item.visible}`, item });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating item visibility", error: err });
//   }
// });

// Optional: Admin-only route to get all orders
router.get("/items", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const items = await Item.find().populate("userId", "email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
});

export default router;