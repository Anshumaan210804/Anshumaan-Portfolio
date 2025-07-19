// src/components/CallToAction.js
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three'; // Import Three.js for the star background

const CallToAction = ({ id }) => { // Accept 'id' prop here
  // State for hover effect and mouse position for each button
  const [linkedinHovered, setLinkedinHovered] = useState(false);
  const [linkedinMousePos, setLinkedinMousePos] = useState({ x: 0, y: 0 });



  const [instagramHovered, setInstagramHovered] = useState(false);
  const [instagramMousePos, setInstagramMousePos] = useState({ x: 0, y: 0 });

  const [phoneHovered, setPhoneHovered] = useState(false);
  const [phoneMousePos, setPhoneMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null); // Ref for the Three.js canvas

  useEffect(() => {
    // Check if THREE is available globally. If not, inform the user.
    
    if (typeof THREE === 'undefined') {
      console.error("THREE.js is not loaded. Please ensure the THREE.js CDN script is included in your HTML file.");
      return;
    }
const canvas=canvasRef.current;
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
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle mouse movement for 3D effect
  const handleMouseMove = (e, setMousePos) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    setMousePos({ x: normalizedX, y: normalizedY });
  };

  // Function to get dynamic styles for the button for neon shadow and 3D transform
  const getButtonStyles = (isHovered, mousePos, baseColorClass) => {
    let shadowColor = '';
    switch (baseColorClass) {
      case 'bg-blue-700': shadowColor = '0 0 20px rgba(59, 130, 246, 0.7), 0 0 30px rgba(59, 130, 246, 0.5)'; break; // Blue
      case 'bg-red-600': shadowColor = '0 0 20px rgba(220, 38, 38, 0.7), 0 0 30px rgba(220, 38, 38, 0.5)'; break; // Red
      case 'bg-pink-600': shadowColor = '0 0 20px rgba(236, 72, 153, 0.7), 0 0 30px rgba(236, 72, 153, 0.5)'; break; // Pink
      case 'bg-green-600': shadowColor = '0 0 20px rgba(34, 197, 94, 0.7), 0 0 30px rgba(34, 197, 94, 0.5)'; break; // Green
      default: shadowColor = 'none';
    }

    if (isHovered) {
      const rotateY = mousePos.x * 15; // Increased rotation for a more noticeable 3D effect
      const rotateX = -mousePos.y * 15;
      return {
        boxShadow: shadowColor,
        transform: `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s linear, box-shadow 0.3s ease-out'
      };
    }
    return {
      transform: 'scale(1)',
      transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
    };
  };

  return (
    // Section background changed to a dark shade, text to light
    <section 
      id="contact-section" // Apply the passed id here
      className="relative py-16 px-6 md:px-12 lg:px-24 bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center text-center"
    >
      {/* Three.js canvas container for rotating stars */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
      ></div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-50">Let's Connect!</h3>
        <p className="text-lg text-gray-300 mb-8">
          I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
        </p>

        {/* Contact Information */}
        <div className="mb-10 space-y-4">
          <p className="text-xl text-gray-100 font-semibold">Email: tiw.anshumaan21@gmail.com</p>
          <p className="text-xl text-gray-100 font-semibold">Phone: (+91) 8853263050</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center flex-wrap gap-6">
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/anshumaan-tiwari-16b9a4284/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
            onMouseEnter={() => setLinkedinHovered(true)}
            onMouseLeave={() => { setLinkedinHovered(false); setLinkedinMousePos({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, setLinkedinMousePos)}
            style={getButtonStyles(linkedinHovered, linkedinMousePos, 'bg-blue-700')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          {/* Gmail Link
          <a
            href="mailto:tiw.anshumaan21@gmail.com"
            className="flex items-center space-x-2 bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
            onMouseEnter={() => setGmailHovered(true)}
            onMouseLeave={() => { setGmailHovered(false); setGmailMousePos({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, setGmailMousePos)}
            style={getButtonStyles(gmailHovered, gmailMousePos, 'bg-red-600')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>Gmail</span>
          </a> */}

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/anshumaan_tiwari_?igsh=MTV3MHo5aXVuYW84dQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
            onMouseEnter={() => setInstagramHovered(true)}
            onMouseLeave={() => { setInstagramHovered(false); setInstagramMousePos({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, setInstagramMousePos)}
            style={getButtonStyles(instagramHovered, instagramMousePos, 'bg-pink-600')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A2.002 2.002 0 004 6.2v8.4A2.002 2.002 0 006.2 18h8.4a2.002 2.002 0 002.2-2.2V6.2A2.002 2.002 0 0014.2 4H7.6zm9.65 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
            <span>Instagram</span>
          </a>

          {/* Phone Number Link */}
          <a
            href="tel:+918853263050"
            className="flex items-center space-x-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
            onMouseEnter={() => setPhoneHovered(true)}
            onMouseLeave={() => { setPhoneHovered(false); setPhoneMousePos({ x: 0, y: 0 }); }}
            onMouseMove={(e) => handleMouseMove(e, setPhoneMousePos)}
            style={getButtonStyles(phoneHovered, phoneMousePos, 'bg-green-600')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.03 21 3 13.97 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.57.12.35.03.75-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>Call Me</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
