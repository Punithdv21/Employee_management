// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginFrom.css'; // Import the CSS file for LoginForm styling

const LoginForm = ({ setUserRole, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', { username, password });
      const token = response.data.accessToken; // Assuming the token is returned as accessToken
      localStorage.setItem('accessToken', token); // Store the token in local storage
      console.log('Login successful:', response.data);

      // Display success message
      window.alert('Login successful!');

      // Assuming roles are returned as an array
      setUserRole(response.data.roles[0]);

      // Set loggedIn state to true
      setLoggedIn(true);

      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred while logging in');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container"> {/* Apply container styling */}
      <h2 className="login-heading">Login</h2> {/* Apply heading styling */}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" required /> {/* Apply input field styling */}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required /> {/* Apply input field styling */}
        <button type="submit" className="login-button">Login</button> {/* Apply button styling */}
      </form>
      {error && <div className="error-message">{error}</div>} {/* Apply error message styling */}
    </div>
  );
};

export default LoginForm;
