// src/components/ProjectCard.js
import React, { useState } from 'react';

const ProjectCard = ({ imageSrc, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement over the card
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the element.
    const y = e.clientY - rect.top;  // Y position within the element.
    
    // Calculate normalized position from -0.5 to 0.5 relative to the center
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Function to get dynamic classes for the card wrapper
  const getCardClasses = () => {
    const baseClasses = "bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-out";
    const hoverClasses = isHovered
      ? "scale-[2] shadow-2xl shadow-purple-500/70 border-2 border-purple-500" // Increased scale for more expansion
      : "scale-100 border-2 border-transparent"; // Base state, transparent border
    return `${baseClasses} ${hoverClasses}`;
  };

  // Function to get dynamic inline styles for rotation based on mouse position
  const getCardStyles = () => {
    if (isHovered) {
      // Increased rotation sensitivity for a more pronounced effect
      const rotateY = mousePosition.x * 60; // Increased rotation sensitivity
      const rotateX = -mousePosition.y * 60; // Increased rotation sensitivity (inverted for natural feel)
      return {
        transform: `scale(1.15) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, // Match increased scale
        transition: 'transform 0.1s linear' // Faster transition for smoother mouse tracking
      };
    }
    return {};
  };

  return (
    <div
      className={getCardClasses()}
      style={getCardStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover object-center" />
      <div className="p-4">
     <h4
  className="text-lg font-semibold text-gray-50"
  style={{
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  }}
>
  {title}
</h4>
      </div>
    </div>
  );
};

export default ProjectCard;
