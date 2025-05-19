import express from "express";
import User from "../models/user.js";  // Use import instead of require
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";  // You also need to import bcrypt
import { signup } from '../Controller/authController.js';
const router = express.Router();


// router.post("/register", async (req, res) => {
//     const { email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     const newUser = new User({ email, password: hashedPassword, role });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   });
  

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
  
  // Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      // Corrected jwt.sign usage
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, role: user.role, username: user.name });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong during login.";
      alert("Login failed: " + errorMessage);
    }
    
  });
  
export default router;
