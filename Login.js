import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/user/login', credentials);
  
      // ✅ Save token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
  
      // Optionally use context if you're managing auth globally
      login(response.data);
  
      if (response.data.role === 'admin') {
        navigate('/Products');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/user/login', credentials);
  
      // ✅ Save token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
  
      // Optionally use context if you're managing auth globally
      login(response.data);
  
      if (response.data.role === 'admin') {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
        <button type="submit">Login</button>
        </form>
<form onSubmit={handleLogout}>
        <button type="logout">logout</button>
      </form>
    </div>
  );
};

export default Login;
