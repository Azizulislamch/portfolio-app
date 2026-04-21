"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../shared/Button';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');
    const pathname = usePathname();

    const isClickingRef = useRef(false);

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "About", to: "/#about" },
        { label: "Skills", to: "/#skills" },
        { label: "Services", to: "/#services" },
        { label: "Projects", to: "/#projects" },
        { label: "Blog", to: "/#blogs" },
        { label: "Contact", to: "/#contact" },
    ];

    useEffect(() => {
        if (pathname === '/projects') {
            setActiveItem('Projects');
        } else if (pathname === '/blogs') {
            setActiveItem('Blog');
        } else if (pathname === '/' && window.scrollY < 20) {
            setActiveItem('Home');
        }
    }, [pathname]);

    // Go top of the page and URL reset function
    const scrollToTop = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            isClickingRef.current = true;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setActiveItem('Home');
            setMenuOpen(false);

            window.history.pushState(null, '', '/');

            setTimeout(() => {
                isClickingRef.current = false;
            }, 1000);
        } else {
            setMenuOpen(false);
        }
    };

    // Handler for LinkClick
    const handleLinkClick = (e: React.MouseEvent, label: string, to: string) => {
        if (pathname !== '/') {
            setMenuOpen(false);
            return; // Let Next.js Link handle the navigation to the home page hash
        }

        if (to === "/") {
            scrollToTop(e);
            return;
        }

        e.preventDefault();
        isClickingRef.current = true;
        setActiveItem(label);
        setMenuOpen(false);

        const sectionId = to.replace('/#', '');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }

        window.history.pushState(null, '', `#${sectionId}`);

        setTimeout(() => {
            isClickingRef.current = false;
        }, 1000);
    };

    // Link and URL changed while scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            if (pathname !== '/') return;
            if (isClickingRef.current) return;

            const sectionIds = navLinks.filter(link => link.to.startsWith('/#')).map(link => link.to.replace('/#', ''));

            for (const id of sectionIds.reverse()) {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();

                    if (rect.top <= 150 && rect.bottom >= 150) {
                        const currentLink = navLinks.find(link => link.to === `/#${id}`);

                        if (currentLink && activeItem !== currentLink.label) {
                            setActiveItem(currentLink.label);
                            window.history.pushState(null, '', `/#${id}`);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navLinks, activeItem]);

    return (
        <nav className={`px-4 md:px-0 fixed top-0 left-0 w-full z-100 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-black/50 py-4 shadow-xl" : "backdrop-blur-xl py-6"
            }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">

                {/* LOGO */}
                <Link href="/" onClick={scrollToTop} className="text-2xl md:text-3xl font-black text-white z-110">
                    AZIZUL <span className="text-red-700">ISLAM</span>
                </Link>

                {/* DESKTOP MENU */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.to}
                                onClick={(e) => handleLinkClick(e, link.label, link.to)}
                                className={`text-lg font-bold transition-colors relative py-1 ${activeItem === link.label ? "text-red-600" : "text-white/80 hover:text-red-600"
                                    }`}
                            >
                                {link.label}
                                {activeItem === link.label && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                    <a href="/assets/Azizul Islam_CV.pdf" target="_blank" rel="noopener noreferrer">
                        <Button icon="fa-solid fa-download">Download CV</Button>
                    </a>
                </ul>

                {/* MOBILE MENU ICON */}
                <div className="md:hidden z-110">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-2">
                        {menuOpen ? <i className="fa-solid fa-xmark text-2xl text-red-600"></i> : <i className="fa-solid fa-bars-staggered text-2xl"></i>}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-[#0d0d0d] backdrop-blur-xl flex flex-col items-center py-10 gap-2 md:hidden z-100 rounded-b-3xl border-b border-white/10"
                    >
                        {navLinks.map((link, index) => (
                            <motion.div key={link.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                                <Link
                                    href={link.to}
                                    onClick={(e) => handleLinkClick(e, link.label, link.to)}
                                    className={`text-2xl font-bold px-6 py-2 rounded-2xl block ${activeItem === link.label ? "text-red-600 bg-white/5" : "text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;