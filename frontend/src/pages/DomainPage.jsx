import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './DomainPage.css';

// Mock data for AWS mentors
const awsMentors = [
  {
    id: 'mentor1',
    name: 'Tal Hibner',
    domain: 'AWS',
    experience: 'AWS Solutions Architect at Amazon, 5 years',
    skills: 'AWS Lambda, EC2, S3, CloudFormation',
    achievements: 'Designed scalable architectures for 20+ clients'
  },
  {
    id: 'mentor2',
    name: 'Marwan Wasel',
    domain: 'AWS',
    experience: 'Cloud Engineer at AWS Partner Network, 4 years',
    skills: 'AWS RDS, VPC, IAM, Terraform',
    achievements: 'Led migration of 10 enterprise apps to AWS'
  },
  {
    id: 'mentor3',
    name: 'Gaurav',
    domain: 'AWS',
    experience: 'DevOps Engineer at TechCorp, 3 years',
    skills: 'AWS ECS, EKS, CI/CD, Docker',
    achievements: 'Automated deployment pipelines for 5 projects'
  }
];

// Mock data for other domains
const domainData = {
  aws: {
    title: 'AWS MENTORS',
    mentors: awsMentors
  },
  frontend: {
    title: 'FRONTEND DEVELOPMENT MENTORS',
    mentors: [
      {
        id: 'mentor4',
        name: 'Sarah Johnson',
        domain: 'Frontend',
        experience: 'Senior Frontend Developer at Google, 6 years',
        skills: 'React, Vue, Angular, JavaScript, CSS',
        achievements: 'Built UI components used by millions of users'
      },
      {
        id: 'mentor5',
        name: 'Michael Chen',
        domain: 'Frontend',
        experience: 'UI Engineer at Facebook, 4 years',
        skills: 'React, Redux, TypeScript, Tailwind CSS',
        achievements: 'Contributed to open source React libraries'
      }
    ]
  },
  cybersecurity: {
    title: 'CYBER SECURITY MENTORS',
    mentors: [
      {
        id: 'mentor6',
        name: 'Alex Rodriguez',
        domain: 'Cyber Security',
        experience: 'Security Engineer at Microsoft, 7 years',
        skills: 'Penetration Testing, Network Security, Encryption',
        achievements: 'Identified critical vulnerabilities in enterprise systems'
      },
      {
        id: 'mentor7',
        name: 'Priya Sharma',
        domain: 'Cyber Security',
        experience: 'CISO at FinTech Corp, 5 years',
        skills: 'Security Architecture, Compliance, Risk Management',
        achievements: 'Implemented security protocols for banking applications'
      }
    ]
  }
};

const DomainPage = () => {
  const { domainName } = useParams();
  const [domain, setDomain] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setDomain(domainData[domainName] || domainData.aws);
  }, [domainName]);

  if (!domain) {
    return <div>Loading...</div>;
  }

  return (
    <div className="domain-page">
      <Navbar isLoggedIn={true} />
      
      <div className="container">
        <h1 className="domain-title">{domain.title}</h1>
        
        <div className="mentors-grid">
          {domain.mentors.map((mentor, index) => (
            <motion.div 
              key={mentor.id}
              className="mentor-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h2 className="mentor-name">{mentor.name}</h2>
              <p className="mentor-domain">{mentor.domain}</p>
              
              <div className="mentor-section">
                <h3 className="section-title">EXPERIENCE</h3>
                <p>{mentor.experience}</p>
              </div>
              
              <div className="mentor-section">
                <h3 className="section-title">TECHNICAL SKILLSET</h3>
                <p>{mentor.skills}</p>
              </div>
              
              <div className="mentor-section">
                <h3 className="section-title">ACHIEVEMENTS</h3>
                <p>{mentor.achievements}</p>
              </div>
              
              <Link to={`/mentor/${mentor.id}`} className="connect-btn">
                Connect
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainPage;