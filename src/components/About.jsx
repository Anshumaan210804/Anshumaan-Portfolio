// src/components/About.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'; // Import Three.js for the star background

// Reusable component for animating text in paragraphs
const AnimatedTextParagraph = ({ text, textColorClass = "text-gray-100", glowColor = "#facc15" }) => {
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null);
  const [letterMousePosition, setLetterMousePosition] = useState({ x: 0, y: 0 });

  const getLetterStyles = (index) => {
    if (hoveredLetterIndex === index) {
      const rotateY = letterMousePosition.x * 15;
      const rotateX = -letterMousePosition.y * 15;
      return {
        transform: `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: 'transform 0.1s linear',
        display: 'inline-block',
        textShadow: `0 0 5px ${glowColor}, 0 0 10px ${glowColor}`
      };
    }
    return {
      transition: 'transform 0.3s ease-out',
      display: 'inline-block'
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

  // Split text into words, then characters
  const words = text.split(' ');

  return (
    <p className={`leading-relaxed mb-4 ${textColorClass} break-words flex flex-wrap gap-x-1`}>
      {words.map((word, wIndex) => (
        <span key={`word-${wIndex}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, cIndex) => {
            const index = wIndex * 100 + cIndex; // Safe unique index
            return (
              <span
                key={`char-${wIndex}-${cIndex}`}
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
          <span>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};


// Reusable component for animating heading text (e.g., h4)
const AnimatedHeading = ({ text, sizeClass = "text-2xl", weightClass = "font-bold", textColorClass = "text-gray-50", glowColor = "#facc15" }) => {
    const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null);
    const [letterMousePosition, setLetterMousePosition] = useState({ x: 0, y: 0 });

    const getLetterStyles = (index) => {
      if (hoveredLetterIndex === index) {
        const rotateY = letterMousePosition.x * 25; // Slightly more rotation for headings
        const rotateX = -letterMousePosition.y * 25;
        return {
          transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
          transition: 'transform 0.1s linear',
          display: 'inline-block',
          textShadow: `0 0 8px ${glowColor}, 0 0 15px ${glowColor}`
        };
      }
      return {
        transition: 'transform 0.3s ease-out',
        display: 'inline-block'
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

    return (
        <h4 className={`${sizeClass} ${weightClass} mb-4 ${textColorClass} break-words`}> {/* Added break-words */}
            {text.split('').map((char, index) => (
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
        </h4>
    );
};


const About = () => {
  const canvasRef = useRef(null); // Ref for the Three.js canvas
  const [hoveredMainHeadingLetterIndex, setHoveredMainHeadingLetterIndex] = useState(null);
  const [mainHeadingLetterMousePosition, setMainHeadingLetterMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredQuoteLetterIndex, setHoveredQuoteLetterIndex] = useState(null);
  const [quoteLetterMousePosition, setQuoteLetterMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if THREE is available globally. If not, inform the user.
    if (typeof THREE === 'undefined') {
      console.error("THREE.js is not loaded. Please ensure the THREE.js CDN script is included in your HTML file.");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer size to match the parent container's actual size
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    if (canvasRef.current) {
      canvasRef.current.innerHTML = ''; // Clear previous canvas if any
      canvasRef.current.appendChild(renderer.domElement);
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
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
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

  // Function to get dynamic styles for individual letters in quote
  const getQuoteLetterStyles = (index) => {
    if (hoveredQuoteLetterIndex === index) {
      const rotateY = quoteLetterMousePosition.x * 20; // Slightly less rotation for quote
      const rotateX = -quoteLetterMousePosition.y * 20;
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
        transition: 'transform 0.1s linear',
        display: 'inline-block',
        textShadow: '0 0 8px #a78bfa, 0 0 15px #a78bfa' // Purple glow for quote
      };
    }
    return {
      transition: 'transform 0.3s ease-out',
      display: 'inline-block'
    };
  };

  const handleQuoteLetterMouseMove = (e, index) => {
    if (hoveredQuoteLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;
      setQuoteLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };


  return (
    // Section background changed to a dark shade matching Hero.jsx
    <section id="about-section" className="relative py-16 px-6 md:px-12 lg:px-24 bg-gray-950 text-white min-h-screen flex items-center justify-center">
      {/* Three.js canvas container for rotating stars */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
      ></div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column for Introduction */}
        <div className="text-center"> {/* Removed md:text-left to keep it centered on all screens */}
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-50">
            {"About Me".split('').map((char, index) => (
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
          <AnimatedTextParagraph
            text="Hello, my name is Anshumaan Tiwari, and I am a passionate and creative developer specializing in full-stack web development, particularly with the MERN stack. My academic journey at Jaypee Institute of Information and Technology, where I've maintained a CGPA of 8.9, has equipped me with a strong foundation in Computer Science fundamentals, including Data Structures & Algorithms and Object-Oriented Programming."
            textColorClass="text-gray-100"
            glowColor="#facc15"
          />
          <AnimatedTextParagraph
            text="I thrive on building innovative and user-friendly digital experiences, as demonstrated by projects like my AI-driven fashion recommendation platform utilizing the Gemini API, a real-time news aggregator with infinite scroll, and a browser-based snake game. I am adept at manipulating DOM styles, integrating various APIs, and deploying applications on platforms like Firebase Hosting and Netlify."
            textColorClass="text-gray-100"
            glowColor="#facc15"
          />
          <AnimatedTextParagraph
            text="My experience extends to contributing to open-source projects and fostering developer communities, reflecting my commitment to continuous learning and collaborative problem-solving."
            textColorClass="text-gray-100"
            glowColor="#facc15"
          />
          <p className="text-sm text-gray-400 mt-6 break-words"> {/* Added break-words here as well for consistency */}
            {"\"The future of my passion for design lies in creating immersive and intuitive user experiences, leveraging cutting-edge technology in the digital world.\"".split('').map((char, index) => (
              <span
                key={index}
                style={getQuoteLetterStyles(index)}
                onMouseEnter={() => setHoveredQuoteLetterIndex(index)}
                onMouseLeave={() => { setHoveredQuoteLetterIndex(null); setQuoteLetterMousePosition({ x: 0, y: 0 }); }}
                onMouseMove={(e) => handleQuoteLetterMouseMove(e, index)}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>
        {/* Right column for Education Details */}
        <div className="md:pl-8 text-center"> {/* Removed md:text-left to keep it centered on all screens */}
          <AnimatedHeading
            text="Education"
            sizeClass="text-2xl"
            weightClass="font-bold"
            textColorClass="text-gray-50"
            glowColor="#facc15"
          />
          <div className="space-y-6">
            {/* Bachelor of Technology */}
            <div>
              <AnimatedTextParagraph text="Bachelor of Technology" textColorClass="text-lg font-semibold text-gray-100" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="Jaypee Institute Of Information and Technology" textColorClass="text-md text-gray-300" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="2023-2027 | Noida, India" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="Branch: Computer Science and Engineering" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="CGPA: 8.9" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
            </div>
            {/* XII Standard */}
            <div>
              <AnimatedTextParagraph text="XII Standard (ISC)" textColorClass="text-lg font-semibold text-gray-100" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="City Montessori School" textColorClass="text-md text-gray-300" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="2022-2022 | Lucknow, India" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="Percentage: 98.25" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
            </div>
            {/* X Standard */}
            <div>
              <AnimatedTextParagraph text="X Standard (ICSE)" textColorClass="text-lg font-semibold text-gray-100" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="City Montessori School" textColorClass="text-md text-gray-300" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="2020-2020 | Lucknow, India" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
              <AnimatedTextParagraph text="Percentage: 95.2" textColorClass="text-sm text-gray-400" glowColor="#a78bfa" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;