import express from 'express';
import Order from '../models/order.js';
import { authenticate } from '../middleware/authMiddleware.js'; // Correct import

const router = express.Router();

// Order creation route (POST /cart/orders)
// router.post('/orders', authenticate, async (req, res) => {
//   const { items, totalPrice } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: 'No items in the cart' });
//   }

//   try {
//     // Create the order and save it to the database
//     const order = new Order({
//       user: req.user._id, // From the JWT token
//       items,
//       totalPrice,
//       status: 'Pending',
//       date: new Date(),
//     });

//     await order.save();

//     res.status(201).json({ message: 'Order created successfully', order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create order' });
//   }
// });

// Get orders route (GET /orders)
// Fetch all orders
router.get('/orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});


export default router;
