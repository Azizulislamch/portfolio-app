"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid Username or Password!");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-[#111111] p-10 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10">
                        <header className="text-center mb-10">
                            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                                Admin <span className="text-red-700">Login</span>
                            </h1>
                            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-2">
                                Secure Access for Azizul Islam
                            </p>
                        </header>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 rounded-xl text-center mb-6 font-bold"
                            >
                                {error}
                            </motion.p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-gray-400 text-[10px] uppercase font-black tracking-widest ml-4 mb-2 block">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-800"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 text-[10px] uppercase font-black tracking-widest ml-4 mb-2 block">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-800"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-600/20 transition-all uppercase tracking-widest italic"
                            >
                                Sign In
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;