// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ImpressiveWorks from './components/ImpressiveWorks';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Skills from './components/Skills'; // Import the Skills component
import "./styles/responsive.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // State to track the current "page"

  // Function to change the current "page"
  const navigateTo = (page) => {
    setCurrentPage(page);
    // Optionally scroll to top when changing 'pages' if desired
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 font-inter text-gray-50">
      {/* Conditional rendering for Header and main content */}
      {currentPage === 'skills' ? (
        // Render the Skills component when currentPage is 'skills'
        <Skills id="skills-section" onNavigate={navigateTo} /> 
      ) : (
        // Render Header and main portfolio sections when currentPage is 'home'
        <>
          <Header onNavigate={navigateTo} /> {/* Header is now conditionally rendered */}
          <Hero id="home-section" onNavigate={navigateTo} />
          <About id="about-section" />
          <ImpressiveWorks id="works-section" />
          <CallToAction id="contact-section" />
        </>
      )}
      
      {/* Footer component, always visible (can be made conditional if needed) */}
      <Footer id="footer-section" />
    </div>
  );
};

export default App;
