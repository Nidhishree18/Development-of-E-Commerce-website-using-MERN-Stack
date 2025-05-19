import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timer.css'; // Import external CSS file for custom styling

const Timer = () => {
  const [seconds, setSeconds] = useState(600); // 10 minutes = 600 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/orders', { state: { fromTimer: true } }); // Redirect to Orders
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h2 className="timer-heading">⏳ Order Delivery Countdown</h2>
      <div className="timer-display">
        <h1 className="timer-countdown">{formatTime(seconds)}</h1>
      </div>
      <p className="timer-message">
        Your order will arrive in less than <strong>{formatTime(seconds)}</strong>!
      </p>
    </div>
  );
};

export default Timer;
