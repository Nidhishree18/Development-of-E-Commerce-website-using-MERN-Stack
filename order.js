// orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    image: String,
    name: String,
    quantity: Number,
    price: Number,
    total: Number,
  }],
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
