"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          Port<span className="text-accent">folio.</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* CV Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-white px-6 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg shadow-accent/20"
        >
          <i className="fas fa-download text-sm"></i> Download CV
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;