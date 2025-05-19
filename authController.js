import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';  // Adjust path if necessary

// Signup controller
export const signup = async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send response based on role
    if (newUser.role === 'admin') {
      // Admin gets redirected to the products page
      res.status(200).json({ message: 'Admin created successfully', redirect: '/products', token });
    } else {
      // Regular user gets logged in directly
      res.status(200).json({ message: 'User created successfully', token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
