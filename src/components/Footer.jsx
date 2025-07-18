// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    // Footer background changed to a deeper dark shade (black)
    <footer className="bg-black text-white py-8 px-6 md:px-12 lg:px-24 rounded-t-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-lg text-gray-400">your friendly chaos creator</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-1">Anshumaan</h2>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
