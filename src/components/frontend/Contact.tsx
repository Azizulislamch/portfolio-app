"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Button from "../shared/Button";
import { Toast } from "../shared/Toast";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setLoading(true);

        try {
            await emailjs.sendForm(
                "service_ekn1k48",
                "template_bx1452i",
                formRef.current,
                "nacfOB5SDcNUlhvNv"
            );

            setToastType("success");
            setToastMessage("Message sent successfully! I'll contact you soon.");
            formRef.current.reset();
        } catch (error) {
            console.error(error);
            setToastType("error");
            setToastMessage("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
            setShowToast(true);
        }
    };

    return (
        <section id="contact" className="bg-[#0d0d0d] py-24 px-6 md:px-12 lg:px-24 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <p className="text-red-600 uppercase tracking-widest text-sm font-bold mb-2">Contact Me</p>
                            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 uppercase">Get In Touch Now</h2>
                            <p className="text-gray-400 text-lg max-w-md">
                                Whether it's design, development, or advice, I'm here to help. Send me a note and let's start a conversation.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: "fa-phone-alt", label: "Have Question?", value: "+880 1783-519763" },
                                { icon: "fa-envelope", label: "Write Email", value: "azizulislamch@gmail.com" },
                                { icon: "fa-map-marker-alt", label: "Location", value: "Plot:1081, 1092 Khilbarirtek, Vatara, Dhaka 1212" },
                            ].map((info, idx) => (
                                <div key={idx} className="flex items-start sm:items-center gap-6 group">
                                    <div className="shrink-0 w-16 h-16 bg-[#1a1a1a] border-l-4 border-red-700 flex items-center justify-center rounded-xl group-hover:bg-red-700 transition-all duration-300">
                                        <i className={`fas ${info.icon} text-red-700 group-hover:text-white text-xl`}></i>
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
                        viewport={{ once: true }}
                        className="bg-[#1a1a1a] p-8 md:p-12 rounded-[40px] border border-white/5"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    placeholder="Name.."
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all text-white"
                                />
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    placeholder="Email.."
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all text-white"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="user_phone"
                                    placeholder="Phone.."
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all text-white"
                                />
                                <select 
                                    name="service"
                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 text-gray-400"
                                >
                                    <option value="Not Specified">Select Service</option>
                                    <option value="Frontend Web Development">Frontend Web Development</option>
                                    <option value="Frontend Development">React.js Web Application</option>
                                    <option value="Full-stack React Application">Full-stack WEB Application</option>
                                    <option value="UI/UX Design">UI/UX Design & Prototyping</option>
                                    <option value="Landing Page">Responsive Landing Page</option>
                                </select>
                            </div>
                            <textarea
                                name="message"
                                required
                                placeholder="Message.."
                                rows={5}
                                className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all resize-none text-white"
                            ></textarea>

                            <div className="pt-4">
                                <Button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full py-5 rounded-2xl flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Success or Error */}
            <Toast 
                isVisible={showToast} 
                message={toastMessage} 
                type={toastType} 
                onClose={() => setShowToast(false)} 
            />
        </section>
    );
};

export default Contact;