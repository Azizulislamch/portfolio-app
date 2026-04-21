"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([
        {
            role: "ai",
            text: "Hello! I'm Azizul's AI Assistant. Feel free to ask me anything about his work, projects, or how to hire him! 👋",
        },
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // For automatic scroll to bottom when new message arrives
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return;

        const currentInput = input;
        setMessages(prev => [...prev, { role: "user", text: currentInput }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: currentInput }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                setMessages(prev => [...prev, { role: "ai", text: errorData.text || "Server error occurred. 🛠️" }]);
                return;
            }

            const data = await res.json();
            if (data.text) {
                setMessages(prev => [...prev, { role: "ai", text: data.text }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", text: "Network issue occurred. 🌐" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="bg-[#1a1a1a] w-80 md:w-96 h-[500px] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header */}
                        <div className="bg-red-700 p-4 flex justify-between items-center text-white shrink-0">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${loading ? "bg-yellow-400 animate-bounce" : "bg-green-400 animate-pulse"}`} />
                                <span className="font-bold text-sm uppercase tracking-wider">Azizul AI Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>

                        {/* Messages Container - scrollbar hide */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d0d0d] scrollbar-hide">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-[15px] whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-red-700 text-white rounded-tr-none"
                                        : "bg-[#1a1a1a] text-gray-300 border border-white/5 rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#1a1a1a] text-gray-400 p-3 rounded-2xl rounded-tl-none text-xs animate-pulse">
                                        AI is thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[#1a1a1a] border-t border-white/5 flex gap-2 shrink-0">
                            <input
                                type="text"
                                value={input}
                                disabled={loading}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-[#0d0d0d] text-white text-sm rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-red-600 transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendMessage}
                                disabled={loading}
                                className="w-12 h-12 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl flex items-center justify-center shadow-lg transition-colors shrink-0"
                            >
                                <i className={`fa-solid ${loading ? "fa-spinner animate-spin" : "fa-paper-plane"} text-sm`} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/20 transition-all ${isOpen ? "bg-[#1a1a1a]" : "bg-red-700"
                    }`}
            >
                <i className={`fa-solid ${isOpen ? "fa-chevron-down" : "fa-robot"} text-2xl`} />
            </motion.button>
        </div>
    );
};

export default ChatBot;