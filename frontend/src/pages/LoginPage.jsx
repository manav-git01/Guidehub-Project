import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AuthPages.css';

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'mentee' // Default to mentee
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, this would be an API call to your backend
      const response = await axios.post('/api/auth/login', formData);
      
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: '123',
        name: 'Demo User',
        email: formData.email,
        userType: formData.userType
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'demo-token');
      
      setUser(userData);
      
      // Redirect based on user type
      if (formData.userType === 'mentee') {
        navigate('/explore');
      } else {
        navigate('/mentor/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar isLoggedIn={false} />
      
      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="auth-title">Login to GUIDEHUB</h2>
          
          <div className="user-type-toggle">
            <button 
              className={`toggle-btn ${formData.userType === 'mentee' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, userType: 'mentee'})}
            >
              Mentee
            </button>
            <button 
              className={`toggle-btn ${formData.userType === 'mentor' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, userType: 'mentor'})}
            >
              Mentor
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary full-width"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="auth-redirect">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;