"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ projects: 0, blogs: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, blogRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/blogs")
        ]);

        const projects = await projectRes.json();
        const blogs = await blogRes.json();

        setCounts({
          projects: Array.isArray(projects) ? projects.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Projects",
      value: counts.projects.toString().padStart(2, '0'),
      icon: "fa-solid fa-code",
      color: "text-blue-500"
    },
    {
      label: "Total Blogs",
      value: counts.blogs.toString().padStart(2, '0'),
      icon: "fa-solid fa-pen-fancy",
      color: "text-red-500"
    },
    {
      label: "Total Views",
      value: "1.2k",
      icon: "fa-solid fa-eye",
      color: "text-green-500"
    },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          Welcome back, <span className="text-red-600">Azizul</span>
        </h1>
        <p className="text-gray-400 mt-2 font-medium tracking-widest uppercase text-xs">
          Here is what's happening with your portfolio today.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#111111] p-8 rounded-[30px] border border-white/5 hover:border-red-500/20 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-xl ${stat.color}`}>
              <i className={stat.icon}></i>
            </div>
            <h3 className="text-4xl font-black mb-1 tracking-tighter">{stat.value}</h3>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;