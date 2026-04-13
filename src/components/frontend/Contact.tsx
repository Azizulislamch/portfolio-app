"use client";

import { motion } from "framer-motion";
import Button from "../shared/Button";

const Contact = () => {
    return (
        <section id="contact" className="bg-[#0d0d0d] py-24 px-6 md:px-12 lg:px-24 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <p className="text-red-500 uppercase tracking-widest text-sm font-bold mb-2">Contact Me</p>
                            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">Get In Touch Now</h2>
                            <p className="text-gray-400 text-lg max-w-md">
                                Whether it's design, development, or advice, I'm here to help. Send me a note and let's start a conversation.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Info Cards */}
                            {[
                                { icon: "fa-phone-alt", label: "Have Question?", value: "+880 1783-519763" },
                                { icon: "fa-envelope", label: "Write Email", value: "azizulislamch@gmail.com" },
                                { icon: "fa-map-marker-alt", label: "Location", value: "Plot:1081, 1092 Khilbarirtek, Vatara, Dhaka 1212" },
                            ].map((info, idx) => (
                                <div key={idx} className="flex items-start sm:items-center gap-6 group">
                                    <div className="shrink-0 w-16 h-16 bg-[#1a1a1a] border-l-4 border-red-500 flex items-center justify-center rounded-xl group-hover:bg-red-500 transition-all duration-300">
                                        <i className={`fas ${info.icon} text-red-500 group-hover:text-white text-xl`}></i>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm uppercase font-bold tracking-tighter text-white/50 mb-1">{info.label}</p>

                                        {info.icon === "fa-phone-alt" ? (
                                            <a href={`tel:${info.value.replace(/\s+/g, '')}`} className="text-lg md:text-xl font-bold hover:text-red-500 transition-colors block">
                                                {info.value}
                                            </a>
                                        ) : info.icon === "fa-envelope" ? (
                                            <a href={`mailto:${info.value}`} className="text-lg md:text-xl font-bold hover:text-red-500 transition-colors block break-all">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="text-lg md:text-xl font-bold leading-tight">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-[#1a1a1a] p-8 md:p-12 rounded-[40px] border border-white/5"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Name.."
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all"
                                />
                                <input
                                    type="email"
                                    placeholder="Email.."
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Phone.."
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all"
                                />
                                <select className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 text-gray-400">
                                    <option>Select Service</option>
                                    <option>Frontend Web Development</option>
                                    <option>Full-stack React Application</option>
                                    <option>UI/UX Design & Prototyping</option>
                                    <option>Responsive Landing Page</option>
                                    <option>Portfolio & Personal Website</option>
                                    <option>E-commerce Solution</option>
                                    <option>Bug Fixing & Optimization</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Message.."
                                rows={5}
                                className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all resize-none"
                            ></textarea>

                            <div className="pt-4">
                                <Button className="w-full py-5 rounded-2xl">Send Message</Button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;