"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../shared/Button";

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
}

const Services: React.FC = () => {
    const services: Service[] = [
        {
            id: 1,
            title: "UI/UX Design",
            description: "Crafting intuitive and aesthetically pleasing interfaces that enhance user engagement and simplify navigation.",
            icon: "fa-solid fa-pen-nib",
        },
        {
            id: 2,
            title: "Brand Identity",
            description: "Developing a unique visual language and strategy that defines your business and resonates with your target audience.",
            icon: "fa-solid fa-layer-group",
        },
        {
            id: 3,
            title: "Mobile App Design",
            description: "Designing high-performance, responsive mobile applications tailored for both Android and iOS platforms.",
            icon: "fa-solid fa-mobile-screen-button",
        },
        {
            id: 4,
            title: "Web Development",
            description: "Building fast, SEO-friendly, and modern websites using the latest technologies to ensure a seamless web experience.",
            icon: "fa-solid fa-code",
        },
        {
            id: 5,
            title: "Digital Products",
            description: "Transforming your innovative ideas into scalable digital solutions ready to compete in the global market.",
            icon: "fa-solid fa-briefcase",
        },
        {
            id: 6,
            title: "Content Strategy",
            description: "Creating compelling, search-optimized content that tells your story and drives meaningful customer conversions.",
            icon: "fa-solid fa-pencil",
        },
    ];

    return (
        <section id="services" className="bg-[#0d0d0d] py-24 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false }}
                    >
                        <span className="text-red-500 font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                            Our Services
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none">
                            THE EASE-SERVICE PROCESS
                        </h2>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false }}
                        className="flex items-center gap-4"
                    >
                        <Button>
                            VIEW ALL SERVICES
                        </Button>

                        <Button
                            variant="iconOnly"
                            icon="fa-solid fa-arrow-up-right-from-square"
                        />
                    </motion.div> */}
                </div>

                {/* SERVICES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: false }}
                            whileHover={{ y: -10 }}

                            className="group relative bg-[#150a0a] border border-white/5 p-10 rounded-[40px] text-center flex flex-col items-center transition-all duration-300 hover:border-red-600/40"
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl transition-transform duration-700 group-hover:rotate-360">
                                <i className={`${service.icon} text-red-600 text-2xl`}></i>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-8 h-20">
                                {service.description}
                            </p>

                            {/* <Button>
                                View Services
                            </Button> */}

                            <div className="absolute inset-0 rounded-[40px] bg-red-600/0 group-hover:bg-red-600/5 transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;