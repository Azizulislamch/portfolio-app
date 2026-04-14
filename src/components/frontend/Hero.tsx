"use client";

import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import Link from "next/link";

export default function Hero() {
    const [active, setActive] = useState<"consult" | "freelance">("consult");

    return (
        <section id="home" className="relative w-full min-h-screen flex items-center bg-[#0d0d0d] overflow-hidden mt-4">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-[#1a0000] to-black opacity-90" />

            <div className="container max-w-7xl mx-auto px-6 md:px-8 flex flex-col-reverse md:flex-row items-center justify-between relative z-10 gap-10">

                {/* LEFT SIDE */}
                <div className="text-white max-w-xl text-center md:text-left">

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight uppercase">
                        HELLO I AM
                    </h1>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-red-500 mt-4 md:mt-6 mb-4 md:mb-5">
                        <Typewriter
                            words={[
                                "Frontend Developer",
                                "React.js Developer",
                                "MERN Stack Developer",
                                "Problem Solver",
                                "UI/UX Enthusiast",
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </h2>

                    <p className="text-gray-300 text-sm md:text-base">
                        I build modern, responsive and scalable web applications.
                    </p>

                    {/* BUTTONS AREA - Shared Button */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">

                        {/* Start Consulting Button */}
                        <Link href="#contact" className="w-full sm:w-auto">
                            <Button
                                className={active === "consult" ? "" : "bg-transparent border border-gray-500 text-gray-400 shadow-none"}
                                onClick={() => setActive("consult")}
                            >
                                Start Consulting
                            </Button>
                        </Link>

                        {/* Available for Freelance Button */}
                        <Link href="#contact" className="w-full sm:w-auto">
                            <Button
                                className={active === "freelance" ? "" : "bg-transparent border border-gray-500 text-gray-400 shadow-none"}
                                onClick={() => setActive("freelance")}
                            >
                                Available for Freelance
                            </Button>
                        </Link>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative flex justify-center">

                    <Image
                        src="/assets/profile.png"
                        alt="profile"
                        width={300}
                        height={400}
                        loading="eager"
                        className="rounded-lg md:w-100 md:h-auto"
                    />

                    <motion.div
                        className="absolute top-2 right-2 md:top-5 md:right-0 bg-white text-black px-3 py-1 md:px-4 md:py-2 rounded-xl shadow-lg text-xs md:text-sm mt-2"

                        animate={{ y: [0, -15] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    >
                        🏅 Dedicated <br /> <span className="text-red-400 font-bold">Software Developer</span>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-2 left-2 md:bottom-5 md:-left-10 bg-white text-black px-4 py-2 md:px-6 md:py-4 rounded-xl shadow-lg text-center"

                        animate={{ y: [0, 15] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    >
                        <p className="text-xl md:text-3xl font-bold">100+</p>
                        <p className="text-xs md:text-sm text-red-500">
                            Happy Satisfied<br />Customers
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}