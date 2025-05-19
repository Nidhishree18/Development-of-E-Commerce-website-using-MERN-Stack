import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // assuming you have a User model

// First define the authenticate function
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

// Now export verifyToken as an alias for authenticate
export const verifyToken = authenticate;

export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Only admins can perform this action" });
  }
  next();
};
