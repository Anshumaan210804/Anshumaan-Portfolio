// src/components/Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import profileBannerImage from '../anshumaan-banner.png';
import skills from '../assets/image-1.svg';
import git from '../assets/github.svg';
import leet from '../assets/rectangle-2.png';
import gfg from '../assets/rectangle-3-2.svg';
import lin from '../assets/rectangle-3.svg';
import sk from '../assets/rectangle-1.svg';

const Hero = ({ onNavigate }) => {
  const canvasRef = useRef(null);

  const isDesktop = () => window.innerWidth >= 768;

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isProfilePicHovered, setIsProfilePicHovered] = useState(false);
  const [profilePicMousePosition, setProfilePicMousePosition] = useState({ x: 0, y: 0 });

  const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null);
  const [letterMousePosition, setLetterMousePosition] = useState({ x: 0, y: 0 });

  /* ================= THREE.JS (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (!isDesktop()) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const starVertices = [];

    for (let i = 0; i < 6000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    camera.position.z = 5;

    const animate = () => {
      stars.rotation.x += 0.0004;
      stars.rotation.y += 0.0004;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 600);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.removeChild(renderer.domElement);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  /* ================= HELPERS ================= */
  const getProfilePicStyles = () =>
    isProfilePicHovered && isDesktop()
      ? {
          transform: `scale(1.1) rotateX(${-profilePicMousePosition.y * 20}deg) rotateY(${profilePicMousePosition.x * 20}deg)`,
        }
      : {};

  const getButtonStyles = (icon) =>
    hoveredIcon === icon && isDesktop()
      ? {
          transform: `scale(2) rotateX(${-mousePosition.y * 30}deg) rotateY(${mousePosition.x * 30}deg)`,
        }
      : {};

  const getLetterStyles = (i) =>
    hoveredLetterIndex === i && isDesktop()
      ? {
          transform: `scale(1.4) rotateY(${letterMousePosition.x * 25}deg)`,
          textShadow: '0 0 12px #facc15',
          display: 'inline-block',
        }
      : { display: 'inline-block' };

  const headingText = 'CREATIVE & PASSIONATE DEVELOPER';

  /* ================= JSX ================= */
  return (
    <section
      id="home-section"
      className="relative min-h-screen flex items-center justify-center text-white bg-gray-950 overflow-hidden pt-24"
    >
      {/* Stars (desktop only) */}
      <div ref={canvasRef} className="absolute inset-0 z-0 hidden md:block" />
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Profile */}
        <div
          className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-gray-600 overflow-hidden transition-all duration-300"
          style={getProfilePicStyles()}
          onMouseEnter={() => isDesktop() && setIsProfilePicHovered(true)}
          onMouseLeave={() => setIsProfilePicHovered(false)}
          onMouseMove={(e) => {
            if (!isDesktop()) return;
            const r = e.currentTarget.getBoundingClientRect();
            setProfilePicMousePosition({
              x: e.clientX / r.width - 0.5,
              y: e.clientY / r.height - 0.5,
            });
          }}
        >
          <img src={profileBannerImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
{/* Heading */}
<h2 className="mt-6 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-wide leading-tight text-center">
  {headingText.split(' ').map((word, wIndex) => (
    <span
      key={wIndex}
      className={`inline-block whitespace-nowrap ${
        word === 'DEVELOPER' ? 'block mt-1' : 'mr-2'
      }`}
    >
      {word.split('').map((c, i) => {
        const index = wIndex * 100 + i; // unique index
        return (
          <span
            key={index}
            style={getLetterStyles(index)}
            onMouseEnter={() => isDesktop() && setHoveredLetterIndex(index)}
            onMouseLeave={() => setHoveredLetterIndex(null)}
            onMouseMove={(e) => {
              if (!isDesktop()) return;
              const r = e.currentTarget.getBoundingClientRect();
              setLetterMousePosition({
                x: e.clientX / r.width - 0.5,
                y: e.clientY / r.height - 0.5,
              });
            }}
            className="inline-block"
          >
            {c}
          </span>
        );
      })}
    </span>
  ))}
</h2>


        {/* Social Icons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[leet, lin, gfg, skills, git, sk].map((icon, i) => (
            <button
              key={i}
              onClick={() => i === 5 && onNavigate('skills')}
              onMouseEnter={() => isDesktop() && setHoveredIcon(i)}
              onMouseLeave={() => setHoveredIcon(null)}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-600 bg-gray-700 overflow-hidden transition-transform"
              style={getButtonStyles(i)}
            >
              <img src={icon} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 animate-bounce text-purple-400">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
