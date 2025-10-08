import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setError(''); onLogin();
    } else {
      setError('Invalid credentials. Please use admin/admin.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header"><h1>Welcome to RentRide-Vehicle Rental System</h1><p>Please sign in to continue</p></div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <div style={{position: 'relative'}}>
              <FaUser className="input-icon" style={{transform: 'translateY(0)'}} />
              <input type="text" placeholder="Enter 'admin'" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label>Password</label>
            <div style={{position: 'relative'}}>
              <FaLock className="input-icon" style={{transform: 'translateY(0)'}} />
              <input type="password" placeholder="Enter 'admin'" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;