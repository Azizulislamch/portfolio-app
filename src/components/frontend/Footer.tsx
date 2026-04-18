"use client";

import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Azizulislamch" },
        { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/azizul-islam-37b804246" },
        { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/pu.aazizul" },
        { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/azizul_ar.islam" },
    ];

    return (
        <footer className="w-full bg-black text-white pt-15 pb-10 relative overflow-hidden rounded-t-[50px]">
            <div className="max-w-7xl mx-auto px-5">

                <div className="mb-8">
                    <div>
                        <Link href="/" className="text-3xl text-gray-400 font-black tracking-tighter italic uppercase">
                            AZIZUL<span className="text-red-700"> ISLAM</span>
                        </Link>
                    </div>
                </div>

                
                <div className="flex flex-col md:flex-row justify-between items-center py-5 border-t border-white/10 gap-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        Copyright © {currentYear} Azizul Islam. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:bg-red-800 hover:text-white transition-all duration-500"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div className="relative flex overflow-x-hidden pointer-events-none select-none pt-4">
                <div className="animate-marquee whitespace-nowrap flex">
                    <span className="text-[8vw] font-black uppercase leading-none text-white opacity-[0.15] tracking-tighter">
                        Web Developer & Competitive Programmer • Passionate About Clean Code • 
                    </span>
                    <span className="text-[8vw] font-black uppercase leading-none text-white opacity-[0.15] tracking-tighter">
                        Web Developer & Competitive Programmer • Passionate About Clean Code • 
                    </span>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
            `}
            </style>
        </footer>
    );
}