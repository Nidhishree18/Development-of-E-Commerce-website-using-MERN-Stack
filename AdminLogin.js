// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5500/user/login", { email, password, role: "admin" });
//       const { token, email: userEmail, role: userRole } = res.data;
//       login(token, userEmail, userRole);
//       navigate("/products"); // Route to products page
//     } catch (err) {
//       alert("Admin login failed: " + err.response?.data?.message || err.message);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5500/user/signup", { name, phone, email, password, role: "admin" });
//       const { token, email: userEmail, role: userRole } = res.data;
//       login(token, userEmail, userRole);
//       navigate("/products"); // Route to products page
//     } catch (err) {
//       alert("Admin signup failed: " + err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={isSignup ? handleSignup : handleLogin}>
//         <h2>{isSignup ? "Admin Signup" : "Admin Login"}</h2>
//         {isSignup && (
//           <>
//             <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
//             <input type="tel" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           </>
//         )}
//         <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//         <div>
//           <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer", color: "blue" }}>
//             {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
