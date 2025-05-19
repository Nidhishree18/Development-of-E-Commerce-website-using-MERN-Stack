import express from 'express';
import User from '../models/user.js';
import Item from '../models/items.js';
import { authenticate } from '../middleware/authMiddleware.js';
import Order from '../models/order.js';

const router = express.Router();

// 1. Add to cart
router.post('/add', authenticate, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const user = await User.findById(req.user.id);

    const existingItem = user.cart.find(item => item.itemId.equals(itemId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ itemId, quantity });
    }

    await user.save();
    res.json({ message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

// 2. Get cart
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.itemId');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// 3. Update quantity
router.put('/update', authenticate, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const user = await User.findById(req.user.id);

    const item = user.cart.find(i => i.itemId.equals(itemId));
    if (item) {
      item.quantity = quantity;
      await user.save();
      res.json({ message: 'Cart updated', cart: user.cart });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});

// 4. Remove item
router.delete('/remove/:itemId', authenticate, async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(i => !i.itemId.equals(itemId));
    await user.save();
    res.json({ message: 'Item removed', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

// 5. Checkout
router.post('/checkout', authenticate, async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      console.error("Address is missing in the request body");
      return res.status(400).json({ message: "Address is required!" });
    }

    const user = await User.findById(req.user.id).populate('cart.itemId');
    
    const orderSummary = user.cart.map(item => ({
      name: item.itemId.name,
      quantity: item.quantity,
      price: item.itemId.price,
      total: item.quantity * item.itemId.price
    }));

    const totalPrice = orderSummary.reduce((sum, item) => sum + item.total, 0);
if (isNaN(totalPrice)) {
  return res.status(400).json({ message: "Invalid total price." });
}


    const newOrder = new Order({
      userId: user._id,
      items: orderSummary,
      totalPrice,
      address
    });

    await newOrder.save();

    // Clear cart after successful order
    user.cart = [];
    await user.save();

    res.json({
      message: 'Checkout successful!',
      order: orderSummary,
      total: totalPrice
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: 'Error during checkout', error: error.message });
  }
});


// 6. Add route for creating an order (if needed)
router.post('/orders', authenticate, async (req, res) => {
  const { address, cartItems, totalPrice } = req.body;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ message: 'Address is required and must be a string!' });
  }
  if (isNaN(totalPrice)) {
    return res.status(400).json({ message: 'Invalid total price!' });
  }

  try {
    const order = new Order({
      userId: req.user.id,
      address,  // Ensure this is a string
      items: cartItems,
      totalPrice
    });

    await order.save();

    res.json({
      message: 'Order placed successfully!',
      order: order
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});


export default router;
