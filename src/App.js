// src/App.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ImpressiveWorks from './components/ImpressiveWorks';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Skills from './components/Skills';

import "./styles/responsive.css";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 font-inter text-gray-50">
      <AnimatePresence mode="wait">
        {currentPage === 'skills' ? (
          <motion.div
            key="skills"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Skills id="skills-section" onNavigate={navigateTo} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Header onNavigate={navigateTo} />
            <Hero id="home-section" onNavigate={navigateTo} />
            <About id="about-section" />
            <ImpressiveWorks id="works-section" />
            <CallToAction id="contact-section" />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer id="footer-section" />
    </div>
  );
};

export default App;
