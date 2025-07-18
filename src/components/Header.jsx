// src/components/Header.js
import React, { useState } from 'react';
import profileBannerImage from '../anshumaan-banner.png'; // Import profile image here

const Header = ({ onNavigate }) => { // Accept onNavigate prop
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement over the profile picture
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the element.
    const y = e.clientY - rect.top;  // Y position within the element.
    
    // Calculate normalized position from -0.5 to 0.5 relative to the center
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Function to get dynamic classes for the profile picture wrapper
  const getProfilePicClasses = () => {
    const baseClasses = "w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 transition-all duration-300 ease-out";
    const hoverClasses = isHovered
      ? "scale-[1.2] shadow-xl shadow-purple-500/70 border-purple-500" // Increased scale for more expansion, neon border
      : "scale-100 border-gray-600"; // Base state, transparent border, base z-index
    return `${baseClasses} ${hoverClasses}`;
  };

  // Function to get dynamic inline styles for rotation based on mouse position
  const getProfilePicStyles = () => {
    if (isHovered) {
      // Increased rotation sensitivity for a more pronounced effect
      const rotateY = mousePosition.x * 20; 
      const rotateX = -mousePosition.y * 20; 
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, // Match increased scale
        transition: 'transform 0.1s linear' // Faster transition for smoother mouse tracking
      };
    }
    return {};
  };

  return (
    // Darker background for the header, now with translucency and backdrop-filter
    <header className="py-4 px-6 md:px-12 lg:px-24 bg-gray-800/50 backdrop-blur-sm shadow-sm flex justify-between items-center fixed w-full z-50"> 
      <div className="flex items-center space-x-4">
        {/* Profile Picture with hover animation */}
        <div
          className={getProfilePicClasses()}
          style={getProfilePicStyles()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
          onMouseMove={handleMouseMove}
        >
          <img
            src={profileBannerImage}
            alt="Profile Picture"
            className="w-full h-full rounded-full object-cover" // Ensure image fills its container
          />
        </div>
        <span className="text-xl font-semibold text-gray-50">@Anshumaan Tiwari</span>
      </div>
      {/* Navigation Menu */}
      <nav className="hidden md:block"> {/* Hidden on small screens, block on medium and up */}
        <ul className="flex space-x-6">
          <li>
            <a 
              href="#home-section" // Scrolls to home section
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a 
              href="#about-section" // Scrolls to about section
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a 
              href="#works-section" // Scrolls to works section
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group"
            >
              Works
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a 
              href=".#" // Keep href="#" as onClick handles navigation to separate page
              onClick={() => onNavigate('skills')} // Navigates to the separate Skills component
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group"
            >
              Skills
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a 
              href="#contact-section" // Scrolls to contact section (CallToAction)
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300 text-lg relative group"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Mobile Menu Button (Hamburger icon) - Add if needed for full responsiveness */}
      {/* For simplicity, this example hides navigation on small screens. */}
    </header>
  );
};

export default Header;
