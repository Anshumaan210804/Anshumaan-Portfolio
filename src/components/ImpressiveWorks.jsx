// src/components/ImpressiveWorks.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Import your images from the assets folder
import samsFashionAIImage from '../assets/image.png'; 
import jazzifyImage from '../assets/image-2.png'; 
import snakeGameImage from '../assets/frame-23.png'; 
import instaScopeImage from '../assets/image-3.png'; 
// Corrected path for the uploaded Chrome Extension image
// import chromeExtensionImage from '/image_2f5649.png'; // Updated path to reference from public root

// Reusable component for animating text in paragraphs (copied from About.js for consistency)
const AnimatedTextParagraph = ({
  text,
  textColorClass = "text-gray-100",
  glowColor = "#facc15",
}) => {
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null);
  const [letterMousePosition, setLetterMousePosition] = useState({ x: 0, y: 0 });

  const getLetterStyles = (index) => {
    if (hoveredLetterIndex === index) {
      const rotateY = letterMousePosition.x * 15;
      const rotateX = -letterMousePosition.y * 15;
      return {
        display: 'inline-block',
        transform: `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: 'transform 0.1s linear',
        textShadow: `0 0 5px ${glowColor}, 0 0 10px ${glowColor}`,
      };
    }
    return {
      transition: 'transform 0.3s ease-out',
    };
  };

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

  // ✅ Render each word in a <span> so wrapping is preserved
  const words = text.split(' ');

  return (
    <p className={`text-base leading-relaxed ${textColorClass}`} style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline' }}>
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 100 + charIndex;
            return (
              <span
                key={index}
                style={getLetterStyles(index)}
                onMouseEnter={() => setHoveredLetterIndex(index)}
                onMouseLeave={() => {
                  setHoveredLetterIndex(null);
                  setLetterMousePosition({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => handleLetterMouseMove(e, index)}
              >
                {char}
              </span>
            );
          })}
          {' '}
        </span>
      ))}
    </p>
  );
};


// ProjectCard component
const ProjectCard = ({ imageSrc, title, description, techStack }) => { // Added techStack prop
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [cardMousePosition, setCardMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTitleLetterIndex, setHoveredTitleLetterIndex] = useState(null);
  const [titleLetterMousePosition, setTitleLetterMousePosition] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e) => {
    if (isCardHovered) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;
      setCardMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  const getCardTransformStyles = () => {
    if (isCardHovered) {
      const rotateY = cardMousePosition.x * 10; // Smaller rotation for cards
      const rotateX = -cardMousePosition.y * 10;
      return {
        transform: `scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`, // Slight scale and translateZ
        transition: 'transform 0.1s linear',
        boxShadow: '0 0 15px #a78bfa, 0 0 30px #a78bfa' // Neon glow for cards
      };
    }
    return {
      transform: 'scale(1)',
      transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      boxShadow: 'none'
    };
  };

  const getTitleLetterStyles = (index) => {
    if (hoveredTitleLetterIndex === index) {
      const rotateY = titleLetterMousePosition.x * 20; // Medium rotation for titles
      const rotateX = -titleLetterMousePosition.y * 20;
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
        transition: 'transform 0.1s linear',
        display: 'inline-block',
        textShadow: '0 0 8px #facc15, 0 0 15px #facc15' // Subtle glow
      };
    }
    return {
      transition: 'transform 0.3s ease-out',
      display: 'inline-block'
    };
  };

  const handleTitleLetterMouseMove = (e, index) => {
    if (hoveredTitleLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;
      setTitleLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  return (
    <div
      // Added text-left to the main card div to ensure all contained text aligns left
      // Adjusted padding to p-5 for more internal space
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col p-5 border border-gray-700 hover:border-purple-500 text-left" 
      style={getCardTransformStyles()}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => { setIsCardHovered(false); setCardMousePosition({ x: 0, y: 0 }); }}
      onMouseMove={handleCardMouseMove}
    >
      {/* Increased image height to h-48 for better visual balance */}
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-md mb-4" /> 
      <h4 className="text-xl font-semibold mb-2 text-gray-50"> 
        {title.split('').map((char, index) => (
          <span
            key={index}
            style={getTitleLetterStyles(index)}
            onMouseEnter={() => setHoveredTitleLetterIndex(index)}
            onMouseLeave={() => { setHoveredTitleLetterIndex(null); setTitleLetterMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleTitleLetterMouseMove(e, index)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h4>
      {/* Removed mb-4 from here, as the tech stack div will provide spacing */}
      <AnimatedTextParagraph text={description} textColorClass="text-gray-300" glowColor="#a78bfa" /> 

      {/* Tech Stack Section */}
      {/* Added mt-4 for spacing between description and tech stack */}
      <div className="flex flex-wrap gap-2 mt-4"> 
        {techStack.map((tech, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};


const ImpressiveWorks = () => {
  const canvasRef = useRef(null); // Ref for the Three.js canvas
  const [hoveredMainHeadingLetterIndex, setHoveredMainHeadingLetterIndex] = useState(null);
  const [mainHeadingLetterMousePosition, setMainHeadingLetterMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if THREE is available globally. If not, inform the user.
      const canvas = canvasRef.current;
    if (typeof THREE === 'undefined') {
      console.error("THREE.js is not loaded. Please ensure the THREE.js CDN script is included in your HTML file.");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer size to match the parent container's actual size
    const updateCanvasSize = () => {
      if (canvas) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    if (canvas) {
      canvas.innerHTML = ''; // Clear previous canvas if any
      canvas.appendChild(renderer.domElement);
      updateCanvasSize(); // Set initial size
    }

    // Create rotating stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 0.8,
      sizeAttenuation: true, 
      transparent: true,
      opacity: 1.0
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      updateCanvasSize(); // Update size on window resize
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (canvas && renderer.domElement) {
        canvas.removeChild(renderer.domElement);
      }
      scene.remove(stars);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Function to get dynamic styles for individual letters in main heading
  const getMainHeadingLetterStyles = (index) => {
    if (hoveredMainHeadingLetterIndex === index) {
      const rotateY = mainHeadingLetterMousePosition.x * 30;
      const rotateX = -mainHeadingLetterMousePosition.y * 30;
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

  const handleMainHeadingLetterMouseMove = (e, index) => {
    if (hoveredMainHeadingLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;
      setMainHeadingLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  const projects = [
    { 
      id: 1, 
      image: samsFashionAIImage, 
      title: 'SAMS - Fashion AI System', 
      description: 'Engineered an AI-driven outfit recommendation platform using face-shape recognition and Gemini API. Built a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with Firebase Hosting for deployment and dynamic backend logic for personalized suggestions. Designed a responsive multi-step form UI using React and Tailwind CSS. Structured the backend with modular components and scalable REST API request handling. This project showcases advanced AI integration and robust full-stack development.',
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Firebase Hosting', 'Gemini API', 'Tailwind CSS']
    },
    { 
      id: 2, 
      image: instaScopeImage, 
      title: 'InstaScope - News Aggregator App', 
      description: 'Created a real-time web application using React.js with route-based category filtering for efficient content navigation. Integrated NewsAPI with asynchronous fetch operations, implemented infinite scroll for seamless content loading, and utilized React state management for a fluid user experience. Deployed on Firebase Hosting and applied mobile-first design principles to ensure cross-device compatibility. Enhanced user experience with a loading indicator for live content fetch, providing visual feedback during data retrieval.',
      techStack: ['React.js', 'NewsAPI', 'Firebase Hosting', 'Tailwind CSS']
    },
    { 
      id: 3, 
      image: jazzifyImage, 
      title: 'Jazzify - Music Streaming App', 
      description: 'Developed a responsive music streaming application with a modern UI using HTML, CSS, JavaScript, Tailwind CSS, and Bootstrap for the frontend. The backend was powered by PHP and MySQL, running on a XAMPP server. Implemented features for browsing, playing, and managing music playlists. Designed with a strong focus on smooth user experience and interactive elements, demonstrating proficiency in both frontend and backend web technologies.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'PHP', 'MySQL', 'XAMPP Server']
    },
    { 
      id: 4, 
      image: snakeGameImage, 
      title: 'SlitherX - Web Snake Game', 
      description: 'Developed a browser-based game with smooth animation using `requestAnimationFrame` for optimal performance. Implemented core game logic, precise collision detection, and persistent high score tracking using `localStorage` for an engaging user experience. Built a responsive grid-based layout for cross-device compatibility, ensuring playability on various screen sizes. Deployed on Netlify with sound feedback to enhance interactivity and provide an immersive gaming experience.',
      techStack: ['JavaScript', 'HTML', 'CSS', 'localStorage', 'Netlify']
    },
  ];

  return (
    // Section background changed to a dark shade matching Hero.jsx
    <section 
      id="works-section" // Apply the id prop here
      className="relative py-16 px-6 md:px-12 lg:px-24 bg-gray-950 text-white min-h-screen flex items-center justify-center"
    >
      {/* Three.js canvas container for rotating stars */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
      ></div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-50">
          {"Impressive Works".split('').map((char, index) => (
            <span
              key={index}
              style={getMainHeadingLetterStyles(index)}
              onMouseEnter={() => setHoveredMainHeadingLetterIndex(index)}
              onMouseLeave={() => { setHoveredMainHeadingLetterIndex(null); setMainHeadingLetterMousePosition({ x: 0, y: 0 }); }}
              onMouseMove={(e) => handleMainHeadingLetterMouseMove(e, index)}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              imageSrc={project.image} 
              title={project.title} 
              description={project.description} 
              techStack={project.techStack} // Pass techStack prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpressiveWorks;
