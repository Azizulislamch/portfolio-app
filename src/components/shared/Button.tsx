"use client";

import { motion } from "framer-motion";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;  
  icon?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "iconOnly";
  showShine?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon, 
  onClick, 
  className = "", 
  variant = "primary", 
  showShine = true,
  type = "button"
}) => {
  
  const baseStyles = "relative group flex items-center justify-center gap-2 font-bold transition-all active:scale-95 overflow-hidden shadow-lg";
  
  const variants = {
    primary: "bg-red-600 text-white px-8 py-4 rounded-full text-lg shadow-red-600/20",
    iconOnly: "w-14 h-14 bg-red-600 text-white rounded-full text-xl shadow-red-600/20",
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Shine Effect Layer */}
      {showShine && (
        <span className="absolute top-0 -left-full w-full h-full bg-white/30 -skew-x-25 transition-all duration-400 group-hover:left-full z-0" />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <i className={`${icon} ${variant === 'primary' ? 'text-sm' : ''}`}></i>}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;