import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AuthPages.css';

const SignupPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      // In a real app, this would be an API call to your backend
      const response = await axios.post('/api/auth/signup', formData);
      
      // For demo purposes, we'll simulate a successful signup
      const userData = {
        id: '123',
        name: formData.name,
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
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
          <h2 className="auth-title">Create an Account</h2>
          
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
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
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
            
            <div className="form-control">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary full-width"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <p className="auth-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;