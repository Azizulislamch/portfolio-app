"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../shared/Button";

// Interfaces
interface StatItem {
    id: number;
    type: "image" | "text";
    src?: string;
    value?: string;
    label?: string;
}

interface InfoDetail {
    label: string;
    value: string;
}

const About: React.FC = () => {
    const stats: StatItem[] = [
        { id: 1, type: "image", src: "/assets/about1.webp" },
        { id: 2, type: "text", value: "55+", label: "PROJECT COMPLETED" },
        { id: 3, type: "text", value: "95%", label: "OUR HAPPY CLIENTS" },
        { id: 4, type: "image", src: "/assets/about2.jpg" },
    ];

    const infoDetails: InfoDetail[] = [
        { label: "Name", value: "Azizul Islam" },
        { label: "Date of birth", value: "November 11, 2001" },
        { label: "Address", value: "Plot:1081, 1092 Khilbarirtek, Vatara, Dhaka 1212" },
        { label: "Zip code", value: "1212" },
        { label: "Email", value: "azizulislamch@gmail.com" },
        { label: "Phone", value: "+880 1783-519763" },
        { label: "Language", value: "English, Bengali" },
        { label: "Freelance", value: "Available" },
    ];

    return (
        <section id="about" className="bg-[#0d0d0d] py-20 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT SIDE: GRID IMAGES & STATS */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            viewport={{ once: false }}

                            whileHover={{
                                borderColor: "rgba(239, 68, 68, 0.4)",
                                boxShadow: "0 0 30px 5px rgba(239, 68, 68, 0.25)",
                            }}

                            className={`relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-white/5 transition-colors duration-300 ${item.type === "text" ? "bg-[#1a0a0a]" : "bg-gray-800"
                                }`}
                        >
                            {item.type === "image" && item.src ? (
                                <Image
                                    src={item.src}
                                    alt="About stats"
                                    fill
                                    loading="eager"
                                    className="object-cover opacity-100"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="text-center px-4 relative z-10">
                                    <h3 className="text-4xl md:text-5xl font-black mb-2 text-white">
                                        {item.value}
                                    </h3>
                                    <p className="text-[10px] md:text-xs font-bold text-red-500 uppercase tracking-widest leading-tight">
                                        {item.label}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* RIGHT SIDE: CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <span className="text-red-500 font-bold text-sm uppercase tracking-widest mb-4 block">
                        About Me
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                        WHO AM I ?
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                        I'm a creative web developer driven by design and inspired by
                        technology. I specialize in building modern, responsive, and engaging
                        digital experiences that tell stories and connect with people.
                    </p>

                    {/* PERSONAL INFO LIST */}
                    <div className="space-y-4 mb-10">
                        {infoDetails.map((info, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <span className="w-3 h-3 bg-red-600 mt-1.5 shrink-0 rounded-sm" />
                                <p className="text-base">
                                    <span className="font-bold mr-2">{info.label} :</span>
                                    <span className="text-gray-400">{info.value}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-6">
                        <a href="/assets/Azizul Islam_CV.pdf" target="_blank" rel="noopener noreferrer">
                            <Button icon="fa-solid fa-download">
                                Download CV
                            </Button>
                        </a>

                        <a href="https://github.com/Azizulislamch" target="_blank" rel="noopener noreferrer">
                            <Button>
                                <i className="fab fa-github text-lg"></i>
                                GitHub
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;