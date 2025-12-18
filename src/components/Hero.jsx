// src/components/Hero.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import profileBannerImage from "../anshumaan-banner.png";
import skills from "../assets/image-1.svg";
import git from "../assets/github.svg";
import leet from "../assets/rectangle-2.png";
import gfg from "../assets/rectangle-3-2.svg";
import lin from "../assets/rectangle-3.svg";
import sk from "../assets/rectangle-1.svg";

const socialLinks = [
  { icon: leet, href: "https://leetcode.com/u/anshumaan_tiwari_/" },
  { icon: lin, href: "https://www.linkedin.com/in/anshumaan-tiwari-16b9a4284/" },
  { icon: gfg, href: "https://www.geeksforgeeks.org/user/tiwanshu02k6/" },
  { icon: skills, href: "https://www.instagram.com/anshumaan_tiwari_/" },
  { icon: git, href: "https://github.com/Anshumaan210804" },
  { icon: sk, action: "skills" },
];

const Hero = ({ onNavigate }) => {
  const canvasRef = useRef(null);
  const isDesktop = () => window.innerWidth >= 768;

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [iconMousePosition, setIconMousePosition] = useState({ x: 0, y: 0 });

  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [profileMousePosition, setProfileMousePosition] = useState({ x: 0, y: 0 });

  const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null);
  const [letterMousePosition, setLetterMousePosition] = useState({ x: 0, y: 0 });

  /* ================= THREE.JS BACKGROUND ================= */
  useEffect(() => {
    if (!isDesktop()) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const vertices = [];

    for (let i = 0; i < 6000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    camera.position.z = 5;

    const animate = () => {
      stars.rotation.x += 0.00025;
      stars.rotation.y += 0.00025;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      canvas.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  /* ================= PROFILE ANIMATION (MATCH SKILLS ICON FEEL) ================= */
  const getProfileStyles = () => {
    if (isProfileHovered && isDesktop()) {
      const rotateY = profileMousePosition.x * 15;
      const rotateX = -profileMousePosition.y * 15;
      return {
        transform: `scale(1.12) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
        transition: "transform 0.1s linear",
        boxShadow: "0 0 20px #a78bfa, 0 0 40px #a78bfa",
      };
    }
    return {
      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
    };
  };

  /* ================= LETTER ANIMATION (MATCH SKILLS) ================= */
  const getLetterStyles = (index) => {
    if (hoveredLetterIndex === index && isDesktop()) {
      const rotateY = letterMousePosition.x * 15;
      const rotateX = -letterMousePosition.y * 15;
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: "transform 0.1s linear",
        display: "inline-block",
        textShadow: "0 0 8px #facc15, 0 0 15px #facc15",
      };
    }
    return {
      transition: "transform 0.3s ease-out",
      display: "inline-block",
    };
  };

  /* ================= ICON ANIMATION (MATCH SKILLS ICONS) ================= */
  const getIconStyles = (index) => {
    if (hoveredIcon === index && isDesktop()) {
      const rotateY = iconMousePosition.x * 20;
      const rotateX = -iconMousePosition.y * 20;
      return {
        transform: `scale(1.3) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
        transition: "transform 0.1s linear",
        boxShadow: "0 0 12px #a78bfa, 0 0 25px #a78bfa",
        backgroundColor: "#6d28d9",
      };
    }
    return {
      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      backgroundColor: "#374151",
    };
  };

  const headingText = "CREATIVE & PASSIONATE DEVELOPER";

  /* ================= JSX ================= */
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden pt-24">
      <div ref={canvasRef} className="absolute inset-0 z-0 hidden md:block" />
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* PROFILE */}
        <div
          className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-purple-500 overflow-hidden mb-6"
          style={getProfileStyles()}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => {
            setIsProfileHovered(false);
            setProfileMousePosition({ x: 0, y: 0 });
          }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setProfileMousePosition({
              x: (e.clientX - r.left) / r.width - 0.5,
              y: (e.clientY - r.top) / r.height - 0.5,
            });
          }}
        >
          <img src={profileBannerImage} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-wide">
          {headingText.split(" ").map((word, wIndex) => (
            <span key={wIndex} className={word === "DEVELOPER" ? "block mt-1" : "mr-2"}>
              {word.split("").map((char, i) => {
                const index = wIndex * 100 + i;
                return (
                  <span
                    key={index}
                    style={getLetterStyles(index)}
                    onMouseEnter={() => setHoveredLetterIndex(index)}
                    onMouseLeave={() => {
                      setHoveredLetterIndex(null);
                      setLetterMousePosition({ x: 0, y: 0 });
                    }}
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      setLetterMousePosition({
                        x: (e.clientX - r.left) / r.width - 0.5,
                        y: (e.clientY - r.top) / r.height - 0.5,
                      });
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        {/* SOCIAL ICONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {socialLinks.map((item, i) => {
            const commonProps = {
              style: getIconStyles(i),
              onMouseEnter: () => setHoveredIcon(i),
              onMouseLeave: () => {
                setHoveredIcon(null);
                setIconMousePosition({ x: 0, y: 0 });
              },
              onMouseMove: (e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setIconMousePosition({
                  x: (e.clientX - r.left) / r.width - 0.5,
                  y: (e.clientY - r.top) / r.height - 0.5,
                });
              },
              className:
                "w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-purple-500 flex items-center justify-center",
            };

            return item.action ? (
              <button key={i} {...commonProps} onClick={() => onNavigate("skills")}>
                <img src={item.icon} alt="Skills" className="w-full h-full object-cover" />
              </button>
            ) : (
              <a
                key={i}
                {...commonProps}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.icon} alt="" className="w-full h-full object-cover" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
