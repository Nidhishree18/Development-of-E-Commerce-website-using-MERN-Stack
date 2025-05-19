import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between login and signup
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5500/user/signup', userData);
      alert('Signup successful!');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5500/user/login', {
        email: userData.email,
        password: userData.password,
      });
      const { token, user } = response.data;


      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/'); // Redirect to the main app page
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            value={userData.name}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          value={userData.email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          value={userData.password}
        />
        {isSignup && (
          <select
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            value={userData.role}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
        <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
          {isSignup ? 'Login' : 'Signup'}
        </span>
      </p>
    </div>
  );
};

export default Auth;
