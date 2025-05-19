import Order from '../models/orderModel.js'; // Assuming you have a model

export const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, address } = req.body;
    const userId = req.user.id;  // set by verifyToken

    if (!items || !totalPrice || !address) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      address,
      status: 'Processing',
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully.', order: newOrder });
  } catch (error) {
    console.error('Place Order Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
