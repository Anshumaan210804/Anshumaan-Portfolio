// src/components/Skills.js
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Helper component for individual skill icons (existing)
const SkillIcon = ({ icon, label }) => {
  const [hoveredLabelLetterIndex, setHoveredLabelLetterIndex] = useState(null);
  const [labelLetterMousePosition, setLabelLetterMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [iconMousePosition, setIconMousePosition] = useState({ x: 0, y: 0 });

  const getLabelLetterStyles = (index) => {
    if (hoveredLabelLetterIndex === index) {
      const rotateY = labelLetterMousePosition.x * 15;
      const rotateX = -labelLetterMousePosition.y * 15;
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: "transform 0.1s linear",
        display: "inline-block",
        textShadow: "0 0 5px #facc15, 0 0 10px #facc15",
      };
    }
    return {
      transition: "transform 0.3s ease-out",
      display: "inline-block",
    };
  };

  const handleLabelLetterMouseMove = (e, index) => {
    if (hoveredLabelLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      setLabelLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  const getIconTransformStyles = () => {
    if (isIconHovered) {
      const rotateY = iconMousePosition.x * 20;
      const rotateX = -iconMousePosition.y * 20;
      return {
        transform: `scale(1.3) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
        transition: "transform 0.1s linear",
        boxShadow: "0 0 10px #a78bfa, 0 0 20px #a78bfa",
      };
    }
    return {
      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      boxShadow: "none",
    };
  };

  const handleIconMouseMove = (e) => {
    if (isIconHovered) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      setIconMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-2">
      {typeof icon === "string" && icon !== "" ? (
        <img
          src={icon}
          alt={label}
          className="w-10 h-10 object-contain mb-1"
          style={getIconTransformStyles()}
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => {
            setIsIconHovered(false);
            setIconMousePosition({ x: 0, y: 0 });
          }}
          onMouseMove={handleIconMouseMove}
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold mb-1"
          style={getIconTransformStyles()}
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => {
            setIsIconHovered(false);
            setIconMousePosition({ x: 0, y: 0 });
          }}
          onMouseMove={handleIconMouseMove}
        >
          {label.substring(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-xs text-gray-300">
        {label.split("").map((char, index) => (
          <span
            key={index}
            style={getLabelLetterStyles(index)}
            onMouseEnter={() => setHoveredLabelLetterIndex(index)}
            onMouseLeave={() => {
              setHoveredLabelLetterIndex(null);
              setLabelLetterMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={(e) => handleLabelLetterMouseMove(e, index)}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
};

// Component for a single skill category card (existing)
const SkillCard = ({ title, description, skillsList }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [cardMousePosition, setCardMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTitleLetterIndex, setHoveredTitleLetterIndex] = useState(null);
  const [titleLetterMousePosition, setTitleLetterMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleCardMouseMove = (e) => {
    if (isCardHovered) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      setCardMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  const getCardTransformStyles = () => {
    if (isCardHovered) {
      const rotateY = cardMousePosition.x * 10;
      const rotateX = -cardMousePosition.y * 10;
      return {
        transform: `scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
        transition: "transform 0.1s linear",
      };
    }
    return {
      transition: "transform 0.3s ease-out",
    };
  };

  const getTitleLetterStyles = (index) => {
    if (hoveredTitleLetterIndex === index) {
      const rotateY = titleLetterMousePosition.x * 20;
      const rotateX = -titleLetterMousePosition.y * 20;
      return {
        transform: `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`,
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

  const handleTitleLetterMouseMove = (e, index) => {
    if (hoveredTitleLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      setTitleLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  return (
    <div
      className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
      style={getCardTransformStyles()}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setCardMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleCardMouseMove}
    >
      <h3 className="text-xl font-bold text-gray-50 mb-4">
        {title.split("").map((char, index) => (
          <span
            key={index}
            style={getTitleLetterStyles(index)}
            onMouseEnter={() => setHoveredTitleLetterIndex(index)}
            onMouseLeave={() => {
              setHoveredTitleLetterIndex(null);
              setTitleLetterMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={(e) => handleTitleLetterMouseMove(e, index)}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {skillsList.map((skill, index) => (
          <SkillIcon key={index} icon={skill.icon} label={skill.label} />
        ))}
      </div>
    </div>
  );
};

// New component for a single skill item with progress bar and stars
const SkillProgressBarItem = ({ name, level, rating }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const getTransformStyles = () => {
    if (isHovered) {
      const rotateY = mousePosition.x * 10; // Slight rotation for individual items
      const rotateX = -mousePosition.y * 10;
      return {
        transform: `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`,
        transition: "transform 0.1s linear",
        boxShadow: "0 0 10px rgba(167, 139, 250, 0.5)", // Subtle purple glow
      };
    }
    return {
      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      boxShadow: "none",
    };
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= count ? "text-yellow-400" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      className="flex items-center justify-between py-2 px-3 rounded-md bg-gray-700 mb-2 transition-all duration-300 ease-out"
      style={getTransformStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <span className="text-sm text-gray-200 w-1/3">{name}</span>
      <div className="w-1/2 bg-gray-600 rounded-full h-2.5 mx-2">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <div className="flex space-x-0.5 w-1/6 justify-end">
        {renderStars(rating)}
      </div>
    </div>
  );
};

// New component for a skill level category card (Languages, Frontend, etc.)
const SkillLevelCard = ({ title, skills }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const getTransformStyles = () => {
    if (isHovered) {
      const rotateY = mousePosition.x * 8; // Slightly less rotation for the whole card
      const rotateX = -mousePosition.y * 8;
      return {
        transform: `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: "transform 0.1s linear",
        boxShadow:
          "0 0 20px rgba(167, 139, 250, 0.7), 0 0 30px rgba(167, 139, 250, 0.5)", // More pronounced purple glow
      };
    }
    return {
      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      boxShadow: "none",
    };
  };

  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300"
      style={getTransformStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <h3 className="text-xl font-bold text-gray-50 mb-4">{title}</h3>
      {skills.map((skill, index) => (
        <SkillProgressBarItem
          key={index}
          name={skill.name}
          level={skill.level}
          rating={skill.rating}
        />
      ))}
    </div>
  );
};

// Main Skills component
const Skills = ({ onNavigate }) => {
  const canvasRef = useRef(null); // Ref for the Three.js canvas
  const [hoveredMainTitleLetterIndex, setHoveredMainTitleLetterIndex] =
    useState(null);
  const [mainTitleLetterMousePosition, setMainTitleLetterMousePosition] =
    useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof THREE === "undefined") {
      console.error(
        "THREE.js is not loaded. Please ensure the THREE.js CDN script is included in your HTML file."
      );
      return;
    }
  const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(renderer.domElement);
    }

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1.0,
    });

    const starVertices = [];
    // Increased number of stars for denser background
    for (let i = 0; i < 15000; i++) {
      // Increased from 10000 to 15000
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (canvas && renderer.domElement) {
        canvas.removeChild(renderer.domElement);
      }
      scene.remove(stars);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const getMainTitleLetterStyles = (index) => {
    if (hoveredMainTitleLetterIndex === index) {
      const rotateY = mainTitleLetterMousePosition.x * 30;
      const rotateX = -mainTitleLetterMousePosition.y * 30;
      return {
        transform: `scale(1.5) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
        transition: "transform 0.1s linear",
        display: "inline-block",
        textShadow: "0 0 10px #facc15, 0 0 20px #facc15",
      };
    }
    return {
      transition: "transform 0.3s ease-out",
      display: "inline-block",
    };
  };

  const handleMainTitleLetterMouseMove = (e, index) => {
    if (hoveredMainTitleLetterIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      setMainTitleLetterMousePosition({ x: normalizedX, y: normalizedY });
    }
  };

  // Define your skill categories and individual skills with icons
  const skillCategories = [
    {
      title: "Full Stack Web Development (MERN Stack)",
      description:
        "Proficient in building end-to-end web applications with a focus on modern technologies like React.js, Node.js, and MongoDB.",
      skills: [
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
          label: "HTML",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
          label: "CSS",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
          label: "JavaScript",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
          label: "React.js",
        },
        {
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNhoXisDruJMDAq3Ltd-wuaMW2lGxck9wAKw&s",
          label: "Tailwind CSS",
        },
        {
          icon: "https://e7.pngegg.com/pngimages/662/163/png-clipart-jquery-logo-web-development-jquery-ui-javascript-computer-icons-jqlogo-emblem-label.png",
          label: "jQuery",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
          label: "Node.js",
        },
        {
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7S33Oq2FeRbyBBA6l1q8PwLVa3SzaONO-9Q&s",
          label: "Express.js",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
          label: "PHP",
        },
        {
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TB9d5YXwtKhv4NWbpeTBVveYvcxu9gMJng&s",
          label: "Postman API",
        },
        {
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThmT8HtltidnDUJvGcRYzg8B9h8zM-2O-FZw&s",
          label: "MongoDB",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MySQL_logo.svg/1200px-MySQL_logo.svg.png",
          label: "MySQL",
        },
        {
          icon: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
          label: "Firebase Hosting",
        },
        {
          icon: "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F141%2F786e7a76-3019-4b70-9d33-663ffdbb1d8e.png",
          label: "Netlify",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png?20210507000024",
          label: "Bootstrap",
        },
      ],
    },
    {
      title: "CS Fundamentals",
      description:
        "Strong grasp of core computer science principles including Data Structures & Algorithms, and Object-Oriented Programming.",
      skills: [
        {
          icon: "https://miro.medium.com/v2/resize:fit:1020/0*xJCLQQRZv3XFMUd1",
          label: "LeetCode (250+ Qs)",
        },
        {
          icon: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_favicon.png",
          label: "GFG",
        },
        {
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAq1BMVEX///8AlcwAAAAAkMoAk8sAj8oAl83p9vvU1NSFxuPy8vL5+fnd3d3a2trl5eXi4uL4/f6WlpZcXFxqamrJycm1tbXw+fzj8/lCQkLW7fYAms+MjIzt7e16enpfX1/GxsYXFxeEhISxsbGcnJyj1OrA4vFkuN15weE4ODiz3O4so9O84PCoqKgcHBwnJydJSUlNrtiTzedbtNtSUlJwcHA0NDQno9MQEBAjIyOuoTs5AAANFUlEQVR4nO1cCXfqLBBFgkuSutQ9cautu9a1tf3/v+wbILEJAa3WZ4wf95zXpwZxLswwwzAJQhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGv9X1J3pYDB1snHL8Y+QHaxdgyE1M524pbk+6hvXICTFQIhBto/GceoaqRAMYsYt01UxTqdEEGPWiFusq6G0NSIEKUf3YSiOpASB4qwet2jXwSaqor4xbuOW7Spw/CVUgvQmbumuga2aIPiNBzBFR2GEnp4+gM9QLTPeJLqJX2yyqSNKSidxHreEf8VcuZB6DMdxS/hXmEeVFNR0HbeEf8WxlZQbYiluEf+I9SmGJOlLzewEw1TiGZ6aw+QzfHw7PLmWzuKW8K+YnvCHZBS3hH9F48jOgiI9jVvCP+O4IZJM0hcahIZH1dRIvJKiE/7CeISk4rEN4iNsD9Exh5H8sJujNFPl2jIPkMNgyK7l+dLUMG7JrobS1oguN4b7CKvMARsxmUGMUfI9YQjO1vhRVULS++THMj6GI2/z4Jh7ws8PDXc09z58gHlsZIzZwd4aw8FmM5g7hw2T6Sb/PBj2+IQM5Nfqa8NIvEc009Tq5DnR0t5I/skFC7sNxRSiDV17jEQ7xYabCm8fSnXAz1t6cprsc1KaaAudTJgp1w0sLlk34cEpDblJSAtNiG0ygeVzzvQ0saY4jYoPnEmQYbJNsZFJRfbwEYaeKSbTK65JNBsaZVhni1Eiz/PHhiRJEWXoOZQE7vUlRoikDFlQkMCD0gbdLUUTaTKG/Bw8cV6RGeE+ciQhZVh3SfJMkYej0T28lCEa0gxAsgLUgaEIR+UMuVdMUn6fnVVI1U7BEPFUVXK8IjPCmUxeFcPsniQpQFUZIVIz5MVvSQlQpyojREcYegFqIkyRz4biSEnNkJkiSSXAK5Yie8IgjjDMuvdtiqVsI8v8+5hNhSqbfYQhGrLJN73eGneVZ3TMtZtJZdz1pjE94tmygy2bp9lYvh8c8AC1PtjOYMPhqprdHo0tMWjKEP6x+VMYYcnMeDdcEMNYS4VnXtF1eW8Emu3vguNALEWQ16cPZ8HDGWKMJWU0LEAlJ5vdGOPIqZLUEw7EZoZsHJzICZUhDRxuCUkFsOxmmGk6Krtk2ZxLzuD28S45A9nRZzSxlM3ImkVqZ+XNYq3WkJc4R0vV5PfMRPb18mbpOLf/Y/kBvRhfKiq/xJI253fNbol6RlEqI0yiqqJGUGdVVX86Pp+hrFIPi55VDUQ4w1ZyVc3iK3ZXKKkounIgwvo3VJbdRPM9t4KynouE9vcblejhAF3ZLBXbrUMlZQ13eHKUUx3eLKlLp2IrfrsZw3RshTdqLQ3FK0rRJcdQ9zWHaKRkGIpDpIEPQ2iqp78z15tCOerhLI2y/DK8IDV+pxE3hUp0IdFW2v9qIJQ3nygrHW4AhSESIRmsMEQxn6HQZhJnpniuiEuFlYEVJEiaCdus0u+a3RbSSYzud6SzEz3bHkiDH1Xm6jZoSEJOItmzSvZFRFKfsJU8eiHuAxsnQpHICmOjhdBEyG8z319aRyjGucx4kgmyG2u5Um3DeQyx1m3jbZHGQrPUHZx+Z7fGT5bJIMrk2CZ1aEaIsQ5P9Njw3XqoWXp2H4XSzsj1K2PHRyTKmjOvgja1Ds8Mq3T3k5DZzU+z+zmoqQ8H5tgcDE/s40rO1ByPN0NBjx327JqA/fJm87jziFcDTynHnxj9ZzCZ3aW3VEfNUQJO185EnbtAHrc0CKxUd8hxbM4v3t14JpjxXIUBDv7+6r9KsJCmLsxLsyPDwxpTp8dXgTDbGdwHW7qFujDfx/eX6bWnAmaoJ3BB6fu4z5tG1ReVwJaCJoh4KVwgc0OzO/ElaIIYUbkuMERnz0wwdfDqo7Ay0J1Z/EEpxeyykwXH5SZ4mH1aSBV8qBI99bmLW9lpduUCM/TcfCBMH4v2TJMa7hUk/CtohuzsQp/SiLp5EiTEpjC0J2aU78AQaUaRnBlw1XmhXsjKGJ/wccclY/cPQHXpTDN0WFItfI8ss7pwyonqP4n/GUtMjPPWA88E96HwLDqF/La3+J8LMjhblfguPr0NOXOHTqH4pBpWXhV7mErN0DhDCt8EhXPwkWQKL1vEro0SeMNzlvSG6OY5HFYpJK5XFzqi68I5zwznGW6Cog9gUxgtn70wmLgqzjNDnt2P3qbOSqEkB0w0IMzE7BHP8YYlllAkEr1TTCEfv5hD0zP0iD86gkgk5uGMrMzNiP0pS2esBXNXboJIPYUI0aOaWax7RLqe/+5cgW92jbWiIFFxzMuMID6PWJ9v1sclaAxMc8BiM5OZoODmwTSHG5N1olAEWi5GRpthLKfc9XEqzTYIyvs/nbWRNgwjvR9k2dETIYImljYubcAWUnknDjfddMa8vaoO9/7xgvSsCbA5FPsaGWGzy9HYHw6aFAH21C99JOmbP93cCZRdym+P2QQOkXhOW5Cxvg+WO8uMOfiUsJvfKhw6+5XVSoiPuDa2oi2F64gkBMIFSTcupBVq8SRRjVBJGT2Lb5xqID7o/LbbfeE5emLtBU/uHh8DsRYnmhoVik9uGoOLBTLRsmfxQXtR8cQah4gxixXWN43BxZLYaL5UrHuOmqpYHhRJKkfuTLhl7VdkeCM1Pf+C4S1vS7iGloqPxIyERpFhvGl12z9YaaKVznGuNGK110lvITnY+IW3EFrcdisc9viSVS786FnZvfYhjy8LWUJBz81vnWkE7hyQP99xEIjapDeuh8qkpM/KCq41t7/9aeh6kTdRPf4wEHlHIjaGxsxfjgxpWAorMvEGIYbI29s9wd6IjFWD66xpAyPtqjIt3u7JMLYq8Rtbwn4kjt0ToD41x+b0WMjvDGh90BHhSnNzPB4cm54GdPGHSggNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NjQdB4aPT6S+sw3u7ULCD163WEn+0Ix//XC8UTv1EfvVeaftvap0++9uxZE3bhTb7hzqd2i8JnEQOM+T89z2Me8Hr7+yyVcVY/pMdjE/8gkU7+PLHZ4cxDMkzxm1Z20/cRSu8Qwjj1hkkjgIYVqpfuOm/B4bVwOVXjBcLjJ9zAvED+icZQo/W5+HbwPZVzXCCK6iMy9dm2EEVNsaFqn2Yw3aVSwCiFJ8w7ufYHNo2KtI/7B96ou0ZQ/8jdh1Z1TxiXdg+Q9T0GeYx/T2PYQHGskobUkWH7xZQu9j2GT7bVf5pzkJtpmK5p78wxJYNf76rdIzxAr2xvwCYvzeUt9AL/aCGl2VM9RUu2yAJfskxJW+DqYLouRp+6eI2aASVEai/M1oFjPOHKVvgd6ovjGEL48kE28+MdB5/VXB1hzsL2qMNXSzh02e87OJPqkSoumRjczlDu4W/m/Af2MmqByx23DbbXKsonWavRn/cY0iFXOH3HPxu13rHFc4QUPiGz5lql5nJIZjAT5CQo4I/YDTpl60afocWff5bvTzre4U/ei/4uwIMMUjThnYTePkJL+Hnfrq5aA5hyOD1U44y+8DvyJvEHlcrZoev9FrRY1jGTVDfpxbV0hd/DqERnbIVrnTwF+osmUnDxzv/574x6wQktz/Yl6i62F+49UTnCQaD2mGX2SH8cvEZf1lwscYGdtHG/b8wLD61Qdpila40had2zWPIFtsWqnoM7QPDFW5SVgLDArW01ybuBmjBcvtqLSc2V4n8EjqmDCu4k2cksMUZVn2G3A5rHkPMGLbfVWvdrxmiHuiCxxAVVr4hwoJCVc+fQyvAcEKv9iUMASva58ryh+glh1/oa+gd/EWFMezgMnzB/mHYO8aQ+iuFw/olQxt66RzmkL2mDNu1VqHmewuBYRP1qraMYc+2+CrLxqCCKxO8pKrHVpjJC/5kdkhFBkKt3zFss5HKHeVyhGEXRniCP3I+ww5e2pzhM32L2aUow6CWPgUY5qgpWXSZoIM+wYueL9wOf+1gbbIowxyeNFu2jGFXyvAJFHV3nIyK4UfhHbSKd5SHX3qzdnhV4Azhch849eHtM7VNxvC1z5RtAqORB1lz1guu9HyGcL0KdtjDqzbvook7tq9hVEZolaPLyxJo8TGEzgMMK3iSt6MMJ7jYx8vLGFL0oHOKGhXmo8Vet/ioU+Spnywzhhb/AmJ+a8LW2t6KR36MIZqwfoA1+EXw/8y3ssgPUfYtatdvb3wewVRzRXaxmmcMaUxDO84fGGLfDp8PIp2JYrlS+XgDSXLNz9dOuYaq5eabXV62FmXmfOzW8mUHGpYvN59z5QrY1+K7s+iCIi2aSwjJ0duqmct97mrdcrFa7sIH1seyCXPXrixXPP57/vzsW89L+GquXIaPut23WrdrN0FhqDHndstdDxW7ZYiE+l340VZzVah0a9C4XetW7Er3tVquWOht8nm1SE6AfFPxV1hUVyZ0VXlYdNie45LVMTGw8tXLYmkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDY37xH9Wn/XH/mKBxQAAAABJRU5ErkJggg==",
          label: "Data Structures & Algorithms",
        },
        {
          icon: "data:image/jpeg;base64,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",
          label: "Object-Oriented Programming (OOP)",
        },
      ],
    },
    {
      title: "Programming Languages",
      description:
        "Versatile in multiple programming languages for diverse application development, from systems to web.",
      skills: [
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
          label: "C",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
          label: "C++",
        },
        {
          icon: "https://cdn.iconscout.com/icon/free/png-256/free-java-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-language-pack-logos-icons-1174953.png?f=webp",
          label: "Java (Intermediate)",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
          label: "Python",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
          label: "JavaScript",
        },
      ],
    },
    {
      title: "Tools & Technologies",
      description:
        "Familiar with essential development tools and technologies for efficient workflow and project management.",
      skills: [
        {
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAABQVBMVEUDARz/cmKiWf/yTh4Kz4MavP4AAAD1VS/yTBr8a1YAABqlW/8K04YDABXDPx7IXFL5UR45Ehw9GyUA0YCOTt2uQ/8vyIwJtXQFTjjhUV8AAA4bwv8AABI9ImLQXVQcxv+PLh2tX/+OQ9RChs+MV+ZEmeaPZfVFpfUSf69/RciPcP9Frv8GLDwzEBw2GCQhCxx2Jh2dMx2zOh3DRSvFVUi2VEyjSkR9ODcSBhziSR7qa12RQT5GFxxLISlPGhxWJSxeHhxkLDHSQx1nIzmjN0PTZmXTcXLTh47Ken6mV1tsOkQMFSQkFDlGJ3BsPLKDTOYhGmcAV4AAmtQGq+kKTmoPaI5iNZ4JPFhDJnkAICs9EldSL449OHcMnMxAY6omFUYEKkWWOuoLOjUgiGYmpXcDm1wIlGEEKCkHhFcGck4AWDRz9L4QAAAEBElEQVR4nO3a61cSQRjH8UXYyZYdtbKg2VWyKxVlWhpq93uRViAR2dUE0f//D2gWotrdme3A6Rye4fw+b3y73/PMDrNztCwAAAAAAAAAAAAAAAAAAAAAAAAAAAD4n5yoUT/QYK4dCzkect3i3JSexRtLy1MhN29Nh6ys3l70Tcgpn5laS8+EHTmailif3ijTr7kzJUvSYZPxGJkzf5d6zb21mcl0lDJG5tz3R/24ie6ko1NJiEmt057NmqpFG5NKCcI1y8qWhJhpMepH1rqnbkmISd0nO5qp+Lv/rxi6o1GnJMasUz0K3BgiJnWbj/qx1ZY0qywxZpVozPIwMStEX5rxihnmnaEac2aYmFWi57MHQ8SsPyS6NY/V74zuaJYUs0J0lcnv5cFjFqkORm4Bg56aN8gORno02PfMPOlbjfJAX5op4ncaZdVsdHcAxFukpdjljCZmg/I3c9+15fTMZJji3mzlOtHjcojjC+vxk9Nh8789ffb8+YuXryqM6JkshIvXm1tvJkKyb94yIQRjpXdVuyB5teJ2SZAfjc83Ly9ks5GY2TlmWaxUrxU8u8sr2NVtTvlHRhLl99GSfgxrVPspXQW7XiG91HyxtRBv6caw7drfKd2cok95NmxLkdKLacRagho26ifWYx8WVC1BTPNzLCWoeUe2hotZ5WBkzMe6qsW2axWqC43tqFsmsmc/fY4vsu6uVqc6GqYZjIz5UlNPxq4RjWFzmhYZc07TYnsNmjXsvS5m4vwF9Sqju840+3Lg4iVtDNHdmV3WtUxcuYqYEUp4ZwxcZrqfGSM3gK8JW7M25hvRk3Pij6amhuqPpjxn6mJmN3XHGbInTUc3muCgqTzPeFVG9oZGHmi03zNFxWg8m+hhpovtqD40ex9nioVG+HPGChaa6gqg99ncqHrRudTpLrIAZzuz8eH0LjRKRS90oVGrM+KXTVzMbWWjOb2rJtHcrhZ+XdB4BbvYoH9x5ojy3M7Z7ydDvm8GLwdnpUaxZgd3gNV6o2LCVbMl2O6PvVMhe/nep74vmqWupk9/LFYwmXzOPRGRy/cfnXNfMuQ/gblouW4mwv0TYxLezMRSTI3h+ycULWbGOL5qLobGsLayxcgYvq9uMTJGNxgTY5yKOsXIGD8/RjGio1llJsZoXxnEjNhYxYgD7QbQ2jXilPwXrt/N2qN+tsEJ9clM6hC9g03AWuNzNLMcSxPTpnw9pqPez9zcrnmDkVguXuNmDsx7YwJOJVbjZjomLrKAv58L3We4bs7QuQR4s5XL9Hvk39yhqXMJOCLfDnLcoKR1QPv/4/7Nd/IHnbbUOTTjCjYZF4LLEQnS/xwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAVPwENOyTEugKVfgAAAAASUVORK5CYII=",
          label: "Figma",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/api-settings.png",
          label: "REST APIs",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/json.png",
          label: "JSON",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
          label: "Git",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
          label: "GitHub",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/chrome.png",
          label: "Chrome Extensions",
        },
      ],
    },
    {
      title: "Soft Skills",
      description:
        "Key interpersonal and personal attributes essential for effective collaboration, problem-solving, and professional growth.",
      skills: [
        {
          icon: "https://cdn-icons-png.flaticon.com/512/9815/9815976.png",
          label: "Time Management",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/puzzle.png",
          label: "Problem Solving",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/communication.png",
          label: "Communication",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/leadership.png",
          label: "Leadership",
        },
        {
          icon: "https://img.icons8.com/color/48/000000/teamwork.png",
          label: "Teamwork",
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/10108/10108220.png",
          label: "Adaptability",
        },
      ],
    },
  ];

  // Data for skill levels with progress bars and stars
  const skillLevelsData = [
    {
      title: "Languages & Core CS",
      skills: [
        { name: "C++", level: 90, rating: 5 },
        { name: "Java", level: 70, rating: 4 },
        { name: "Python", level: 80, rating: 4 },
        { name: "JavaScript", level: 95, rating: 5 },
        { name: "Data Structures & Algorithms", level: 90, rating: 5 },
        { name: "Object-Oriented Programming", level: 85, rating: 4 },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "HTML5", level: 95, rating: 5 },
        { name: "CSS3", level: 90, rating: 5 },
        { name: "Tailwind CSS", level: 90, rating: 5 },
        { name: "React.js", level: 85, rating: 4 },
        { name: "jQuery", level: 75, rating: 4 },
        { name: "Bootstrap", level: 80, rating: 4 },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", level: 85, rating: 4 },
        { name: "Express.js", level: 80, rating: 4 },
        { name: "MongoDB", level: 85, rating: 4 },
        { name: "MySQL", level: 75, rating: 4 },
        { name: "PHP", level: 60, rating: 3 },
        { name: "REST APIs", level: 90, rating: 5 },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", level: 90, rating: 5 },
        { name: "GitHub", level: 90, rating: 5 },
        { name: "Postman API", level: 85, rating: 4 },
        { name: "Firebase Hosting", level: 70, rating: 4 },
        { name: "Netlify", level: 70, rating: 4 },
        { name: "Chrome Extensions", level: 65, rating: 3 },
      ],
    },
  ];

  return (
    <section
      id="skills-section"
      className="relative py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gray-950 text-white min-h-screen flex flex-col justify-center items-center"
    >
      {/* Three.js canvas container for rotating stars */}
      <div ref={canvasRef} className="absolute inset-0 z-0"></div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg mb-12">
          {"Skills that fuel my passion".split("").map((char, index) => (
            <span
              key={index}
              style={getMainTitleLetterStyles(index)}
              onMouseEnter={() => setHoveredMainTitleLetterIndex(index)}
              onMouseLeave={() => {
                setHoveredMainTitleLetterIndex(null);
                setMainTitleLetterMousePosition({ x: 0, y: 0 });
              }}
              onMouseMove={(e) => handleMainTitleLetterMouseMove(e, index)}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        {/* Existing skill cards with icons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              title={category.title}
              description={category.description}
              skillsList={category.skills}
            />
          ))}
        </div>

        {/* New section for skill levels with progress bars and stars */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg mb-12 mt-16">
          {"My Proficiency Levels".split("").map((char, index) => (
            <span
              key={index}
              style={getMainTitleLetterStyles(index)} // Reusing main title animation for consistency
              onMouseEnter={() => setHoveredMainTitleLetterIndex(index)}
              onMouseLeave={() => {
                setHoveredMainTitleLetterIndex(null);
                setMainTitleLetterMousePosition({ x: 0, y: 0 });
              }}
              onMouseMove={(e) => handleMainTitleLetterMouseMove(e, index)}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillLevelsData.map((category, index) => (
            <SkillLevelCard
              key={index}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate("home")} // Navigate back to home
            className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
