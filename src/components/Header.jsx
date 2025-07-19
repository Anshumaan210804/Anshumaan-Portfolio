import React, { useState } from 'react';
import profileBannerImage from '../anshumaan-banner.png';

const Header = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu toggle

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const getProfilePicClasses = () => {
    const baseClasses = "w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 transition-all duration-300 ease-out";
    const hoverClasses = isHovered
      ? "scale-[1.2] shadow-xl shadow-purple-500/70 border-purple-500"
      : "scale-100 border-gray-600";
    return `${baseClasses} ${hoverClasses}`;
  };

  const getProfilePicStyles = () => {
    if (isHovered) {
      const rotateY = mousePosition.x * 20;
      const rotateX = -mousePosition.y * 20;
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s linear'
      };
    }
    return {};
  };

  const navLinks = (
    <>
      <li>
        <a href="#home-section" className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group">
          Home
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
      <li>
        <a href="#about-section" className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group">
          About
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
      <li>
        <a href="#works-section" className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group">
          Works
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
      <li>
        <a href=".#" onClick={() => onNavigate('skills')} className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group">
          Skills
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
      <li>
        <a href="#contact-section" className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group">
          Contact
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
    </>
  );

  return (
    <header className="py-4 px-6 md:px-12 lg:px-24 bg-gray-800/50 backdrop-blur-sm shadow-sm flex justify-between items-center fixed w-full z-50">
      {/* Left: Profile */}
      <div className="flex items-center space-x-4">
        <div 
          className={getProfilePicClasses()}
          style={getProfilePicStyles()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
          onMouseMove={handleMouseMove}
        >
          <img
            src={profileBannerImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <span className="text-xl font-semibold text-gray-50">@Anshumaan Tiwari</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex space-x-6">{navLinks}</ul>
      </nav>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className="text-gray-300 hover:text-purple-400 focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-900 border-t border-gray-700 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">{navLinks}</ul>
        </div>
      )}
    </header>
  );
};

export default Header;
