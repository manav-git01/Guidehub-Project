import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './ExplorePage.css';

const domains = [
  {
    id: 'aws',
    name: 'AWS',
    image: '/images/aws.jpg',
    description: 'Amazon Web Services cloud computing and infrastructure'
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    image: '/images/frontend.jpg',
    description: 'Web development with HTML, CSS, JavaScript, and modern frameworks'
  },
  {
    id: 'cybersecurity',
    name: 'Cyber Security',
    image: '/images/cybersecurity.jpg',
    description: 'Network security, ethical hacking, and data protection'
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    image: '/images/ai-ml.jpg',
    description: 'Artificial Intelligence and Machine Learning technologies'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    image: '/images/data-science.jpg',
    description: 'Data analysis, visualization, and statistical modeling'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    image: '/images/backend.jpg',
    description: 'Server-side programming, APIs, and database management'
  }
];

const ExplorePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <div className="explore-page">
      <Navbar isLoggedIn={true} />
      
      <div className="page-container">
        <div className="sidebar">
          <h2 className="sidebar-title">NAVIGATION</h2>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">WEB TECHNOLOGIES</h3>
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <Link to="/domain/aws">AWS</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/cybersecurity">Cyber Security</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/frontend">Frontend Development</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/ai-ml">AI/ML</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/data-science">Data Science</Link>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">NON-TECHNICAL</h3>
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <Link to="/domain/career-guidance">Career Guidance</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/leadership">Leadership</Link>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">CORE DOMAINS</h3>
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <Link to="/domain/software-engineering">Software Engineering</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/product-management">Product Management</Link>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">MEDIA & DESIGN</h3>
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <Link to="/domain/ui-ux">UI/UX Design</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/domain/graphic-design">Graphic Design</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <main className="main-content">
          <h1 className="page-title">WEB TECHNOLOGIES</h1>
          
          <div className="domain-carousel">
            <button className="carousel-nav prev">
              <span>Previous</span>
            </button>
            
            <div className="carousel-container">
              {domains.map((domain, index) => (
                <motion.div 
                  key={domain.id}
                  className="domain-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/domain/${domain.id}`}>
                    <div className="domain-image">
                      <img src={domain.image || "/placeholder.svg"} alt={domain.name} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <button className="carousel-nav next">
              <span>Next</span>
            </button>
          </div>
          
          <div className="carousel-indicators">
            <span className="indicator active"></span>
            <span className="indicator"></span>
            <span className="indicator"></span>
            <span className="indicator"></span>
            <span className="indicator"></span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;