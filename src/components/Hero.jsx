// src/components/Hero.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'; // Three.js is used for the rotating star background
// Removed unused import: import skill from './Skills';

// Import the profile image
import profileBannerImage from '../anshumaan-banner.png'; 
import skills from '../assets/image-1.svg'; // Path adjusted for component folder
import git from '../assets/github.svg'; // Path adjusted for component folder
import leet from '../assets/rectangle-2.png'; // Path adjusted for component folder
import gfg from '../assets/rectangle-3-2.svg'; // Path adjusted for component folder
import lin from '../assets/rectangle-3.svg'; // Path adjusted for component folder
import sk from '../assets/rectangle-1.svg'; // Path adjusted for component folder
// Removed duplicate import: import Skills from './Skills';

const Hero = ({ onNavigate }) => { // Accept onNavigate prop
  const canvasRef = useRef(null); // Ref for the Three.js canvas
  const [hoveredIcon, setHoveredIcon] = useState(null); // State to track which social icon is hovered
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State to track mouse position for social icons

  // State for the main profile picture animation
  const [isProfilePicHovered, setIsProfilePicHovered] = useState(false);
  const [profilePicMousePosition, setProfilePicMousePosition] = useState({ x: 0, y: 0 });

  // State for text animation
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null);
  const [letterMousePosition, setLetterMousePosition] = useState({ x: 0, y: 0 });

  // Function to generate a random neon color (kept from previous iterations, though not used by stars)
  const getRandomNeonColor = () => {
    const neonColors = [
      0xFF00FF, // Magenta
      0x00FFFF, // Cyan
      0xFFFF00, // Yellow
      0x00FF00, // Lime Green
      0xFF69B4, // Hot Pink
      0x00BFFF, // Deep Sky Blue
      0xFFD700, // Gold
      0x8A2BE2  // Blue Violet
    ];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  };

  useEffect(() => {
    // Check if THREE is available globally. If not, inform the user.
    if (typeof THREE === 'undefined') {
      console.error("THREE.js is not loaded. Please ensure the THREE.js CDN script is included in your HTML file.");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Increased far clipping plane
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (canvasRef.current) { // Ensure canvasRef.current exists before appending
      canvasRef.current.innerHTML = ''; // Clear previous canvas if any
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Create rotating stars (original implementation)
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, // White color for stars
      size: 0.8, // Slightly increased size for brightness
      sizeAttenuation: true, 
      transparent: true,
      opacity: 1.0 // Increased opacity to make them brighter
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) { // Number of stars
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 5; // Adjust camera position for stars

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the star field (original rotation)
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 600);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      // Dispose of Three.js objects
      scene.remove(stars);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle mouse movement over a social icon
  const handleMouseMove = (e, iconName) => {
    if (hoveredIcon === iconName) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left; // X position within the element.
      const y = e.clientY - rect.top;  // Y position within the element.
      
      // Calculate normalized position from -0.5 to 0.5 relative to the center
      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;

      setMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  // Function to handle mouse movement over the profile picture
  const handleProfilePicMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the element.
    const y = e.clientY - rect.top;  // Y position within the element.
    
    // Calculate normalized position from -0.5 to 0.5 relative to the center
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    setProfilePicMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Function to handle mouse movement over a letter
  const handleLetterMouseMove = (e, index) => {
    if (hoveredLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;

      setLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  // Function to get dynamic classes for the spherical social button wrapper
  const getButtonClasses = (iconName) => {
    const baseClasses = "relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ease-out overflow-hidden border-4 border-gray-600"; // Added border-4 and border-gray-600
    const hoverClasses = hoveredIcon === iconName
      // Changed shadow and border to match profile picture's hover effect
      ? "scale-[2.5] shadow-2xl shadow-purple-500/70 bg-gradient-to-br from-gray-900 to-black z-30 border-purple-500" 
      : "scale-100 bg-gray-700 z-20 border-transparent"; // Base state, transparent border
    return `${baseClasses} ${hoverClasses}`;
  };

  // Function to get dynamic inline styles for social button rotation
  const getButtonStyles = (iconName) => {
    if (hoveredIcon === iconName) {
      const rotateY = mousePosition.x * 45; 
      const rotateX = -mousePosition.y * 45; 
      return {
        transform: `scale(2.5) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, 
        transition: 'transform 0.1s linear'
      };
    }
    return {};
  };

  // Function to get dynamic classes for the icon inside the social button
  const getInnerIconClasses = (iconName) => {
    // Added w-full, h-full, and object-cover to make the image fill the button
    const baseClasses = "w-full h-full object-cover transition-colors duration-300 ease-out"; 
    const hoverClasses = hoveredIcon === iconName ? "text-yellow-300 z-40 relative" : "text-gray-300"; 
    return `${baseClasses} ${hoverClasses}`;
  };

  // Function to get dynamic classes for the profile picture wrapper
  const getProfilePicClasses = () => {
    const baseClasses = "w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 transition-all duration-300 ease-out flex items-center justify-center overflow-hidden";
    const hoverClasses = isProfilePicHovered
      ? "scale-[1.1] shadow-2xl shadow-purple-500/70 border-purple-500"
      : "scale-100 border-gray-600";
    return `${baseClasses} ${hoverClasses}`;
  };

  // Function to get dynamic inline styles for profile picture rotation
  const getProfilePicStyles = () => {
    if (isProfilePicHovered) {
      const rotateY = profilePicMousePosition.x * 20; 
      const rotateX = -profilePicMousePosition.y * 20; 
      return {
        transform: `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s linear'
      };
    }
    return {};
  };

  // Function to get dynamic styles for individual letters
  const getLetterStyles = (index) => {
    if (hoveredLetterIndex === index) {
      const rotateY = letterMousePosition.x * 30; 
      const rotateX = -letterMousePosition.y * 30; 
      return {
        transform: `scale(1.5) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`, 
        transition: 'transform 0.1s linear',
        display: 'inline-block', 
        textShadow: '0 0 10px #facc15, 0 0 20px #facc15' 
      };
    }
    return {
      transition: 'transform 0.3s ease-out',
      display: 'inline-block' 
    };
  };

  const headingText = "CREATIVE & PASSIONATE DEVELOPER";

  return (
    <section id="home-section"
      className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden bg-gray-950"
    >
      {/* Three.js canvas container for rotating stars */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
      ></div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>


      {/* Content overlay */}
      <div className=" mt-12 relative  z-10 text-center flex flex-col items-center">
        {/* Main Profile Picture with hover animation */}
        <div
          className={getProfilePicClasses()}
          style={getProfilePicStyles()}
          onMouseEnter={() => setIsProfilePicHovered(true)}
          onMouseLeave={() => { setIsProfilePicHovered(false); setProfilePicMousePosition({ x: 0, y: 0 }); }}
          onMouseMove={handleProfilePicMouseMove}
        >
          <img
            src={profileBannerImage} 
            alt="Profile Picture"
            className="w-full h-full rounded-full object-cover" 
          />
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-lg mt-6"> 
          {headingText.split('').map((char, index) => (
            <span
              key={index}
              style={getLetterStyles(index)}
              onMouseEnter={() => setHoveredLetterIndex(index)}
              onMouseLeave={() => { setHoveredLetterIndex(null); setLetterMousePosition({ x: 0, y: 0 }); }}
              onMouseMove={(e) => handleLetterMouseMove(e, index)}
            >
              {char === ' ' ? '\u00A0' : char} 
            </span>
          ))}
        </h2>
        <div className="mt-8 flex justify-center space-x-4 md:space-x-6">
          {/* LeetCode Button */}
          <a
            href="https://leetcode.com/u/anshumaan_tiwari_/" 
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon('leetcode')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'leetcode')}
          >
            <div className={getButtonClasses('leetcode')} style={getButtonStyles('leetcode')}>
              {/* The skills image will now fill this button */}
              <img src={leet} alt="LeetCode Icon" className={getInnerIconClasses('leetcode')} />
            </div>
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/anshumaan-tiwari-16b9a4284/" // Changed href to LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon('linkedin')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'linkedin')}
          >
            <div className={getButtonClasses('linkedin')} style={getButtonStyles('linkedin')}>
              {/* Using the imported LinkedIn image */}
              <img src={lin} alt="LinkedIn Icon" className={getInnerIconClasses('linkedin')} />
            </div>
          </a>

          {/* GFG Button */}
          <a
            href="https://www.geeksforgeeks.org/user/tiwanshu02k6/" 
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon('gfg')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'gfg')}
          >
            <div className={getButtonClasses('gfg')} style={getButtonStyles('gfg')}>
              {/* The skills image will now fill this button */}
              <img src={gfg} alt="GFG Icon" className={getInnerIconClasses('gfg')} />
            </div>
          </a>

          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/anshumaan_tiwari_?igsh=MTV3MHo5aXVuYW84dQ==" 
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon('instagram')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'instagram')}
          >
            <div className={getButtonClasses('instagram')} style={getButtonStyles('instagram')}>
              {/* The skills image will now fill this button */}
              <img src={skills} alt="Instagram Icon" className={getInnerIconClasses('instagram')} />
            </div>
          </a>
           
           {/* GitHub Button */}
          <a
            href="https://github.com/Anshumaan210804" 
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon('github')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'github')}
          >
            <div className={getButtonClasses('github')} style={getButtonStyles('github')}>
              {/* The skills image will now fill this button */}
              <img src={git} alt="GitHub Icon" className={getInnerIconClasses('github')} />
            </div>
          </a>


          {/* Skills Button - Now navigates to the Skills component */}
          <a
            href="#" // Removed href to prevent default navigation. onClick handles it.
            onClick={() => onNavigate('skills')} // Call the navigateTo function from props
            onMouseEnter={() => setHoveredIcon('skill')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'skill')}
          >
            <div className={getButtonClasses('skill')} style={getButtonStyles('skill')}>
              {/* The skills image will now fill this button */}
              <img src={sk} alt="Skills Icon" className={getInnerIconClasses('skill')} />
            </div>
          </a>

          {/* Resume PDF Download Button */}
          <a
            href="https://drive.google.com/file/d/1npZkuEqBXnw-_xwXDDjsNGIoygxlOw1H/view?usp=sharing" 
            download="Anshumaan_Tiwari_Resume.pdf" 
            target="_blank"
            onMouseEnter={() => setHoveredIcon('resume')}
            onMouseLeave={() => { setHoveredIcon(null); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, 'resume')}
          >
            <div className={getButtonClasses('resume')} style={getButtonStyles('resume')}>
              <svg className={getInnerIconClasses('resume')} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-2 10v-4h-2l3-3 3 3h-2v4h-2z" />
              </svg>
            </div>
          </a>
          
        </div>
     
      </div>
           <div className=" absolute bottom-1 animate-bounce">
            {/* Replaced arrow SVG with mouse scroll icon */}
            <svg className=" w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m0 0l-4-4m4 4l4-4M12 2a10 10 0 100 20 10 10 0 000-20zM12 10V5"></path>
            </svg>
        </div>
    </section>
  );
};

export default Hero;
