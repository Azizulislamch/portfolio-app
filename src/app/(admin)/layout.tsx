"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "fa-solid fa-chart-line" },
    { name: "Projects", href: "/dashboard/projects", icon: "fa-solid fa-layer-group" },
    { name: "Add Project", href: "/dashboard/projects/add", icon: "fa-solid fa-plus" },
    { name: "Blogs", href: "/dashboard/blogs", icon: "fa-solid fa-blog" },
    { name: "Add Blog", href: "/dashboard/blogs/add", icon: "fa-solid fa-pen-nib" },
    { name: "Main Site", href: "/", icon: "fa-solid fa-arrow-left" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-8">
          <Link href="/dashboard" className="text-2xl font-black tracking-tighter uppercase">
            AZIZUL <span className="text-red-600">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? "bg-red-600 text-white shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)]" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <i className={`${link.icon} w-5 text-center`}></i>
                  <span className="font-bold text-sm uppercase tracking-wider">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
            © 2026 Azizul Islam
          </p>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        {/* Background Subtle Glow */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-red-600/5 blur-[120px] -z-10" />
        
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;