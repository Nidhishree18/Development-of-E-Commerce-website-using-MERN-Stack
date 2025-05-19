import mongoose from 'mongoose';
const cartItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  quantity: { type: Number, default: 1 }
});

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  cart: [cartItemSchema]
});

const User = mongoose.model("User", userSchema);
export default User;
