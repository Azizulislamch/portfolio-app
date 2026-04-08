"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", to: "#home" },
        { label: "About", to: "#about" },
        { label: "Services", to: "#services" },
        { label: "Portfolio", to: "#portfolio" },
        { label: "Blog", to: "#blog" },
        { label: "Contact", to: "#contact" },
    ];

    return (
        <nav
            className={` px-4 md:px-0 fixed top-0 left-0 w-full z-100 transition-all duration-300 ${scrolled ? "bg-primary/95 shadow-lg py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="text-3xl font-bold text-white z-110">
                    Port<span className="text-red-600">folio.</span>
                </Link>

                {/* DESKTOP MENU (Unchanged) */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.to}
                                onClick={() => setActiveItem(link.label)}
                                className={`text-lg font-bold transition-colors relative py-1 ${activeItem === link.label ? "text-red-600" : "text-white/80 hover:text-red-600"
                                    }`}
                            >
                                {link.label}
                                {activeItem === link.label && (
                                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600" />
                                )}
                            </Link>
                        </li>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 text-lg font-bold shadow-lg shadow-red-600/20"
                    >
                        <i className="fa-solid fa-download text-sm"></i>
                        Download CV
                    </motion.button>
                </ul>

                {/* MOBILE MENU ICON */}
                <div className="md:hidden z-110">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white p-2 focus:outline-none"
                    >
                        {menuOpen ? (
                            <i className="fa-solid fa-xmark text-2xl text-red-600"></i>
                        ) : (
                            <i className="fa-solid fa-bars-staggered text-2xl"></i>
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY (Updated for Top Alignment) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}

                        className="fixed inset-0 h-screen w-full flex flex-col items-center justify-start pt-24 gap-6 md:hidden z-100"
                    >
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.to}
                                    onClick={() => {
                                        setActiveItem(link.label);
                                        setMenuOpen(false);
                                    }}
                                    className={`text-2xl font-bold bg-gray-700 px-6 py-2 rounded-2xl ${activeItem === link.label ? "text-red-600" : "text-white hover:text-red-600"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xl cursor-pointer mt-4 shadow-lg shadow-red-600/20"
                        >
                            <i className="fa-solid fa-download mr-2"></i>
                            Download CV
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;