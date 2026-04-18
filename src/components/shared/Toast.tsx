"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: "success" | "error";
}

export const Toast = ({ message, isVisible, onClose, type = "success" }: ToastProps) => {
  
  // Close after 5 seconds 
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Animation Logic
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.8, transition: { duration: 0.2 } }}
          className="fixed bottom-10 right-6 md:right-12 z-9999"
        >
          <div className={`
            flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md
            ${type === "success" 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-red-500/10 border-red-500/20 text-red-500"
            }
          `}>
            {/* Icon */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center 
              ${type === "success" ? "bg-green-500/20" : "bg-red-500/20"}
            `}>
              <i className={`fa-solid ${type === "success" ? "fa-check" : "fa-triangle-exclamation"}`}></i>
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-sm uppercase tracking-wider">
                {type === "success" ? "Success" : "Error"}
              </p>
              <p className="text-white/90 text-[15px]">{message}</p>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-xmark text-white/50 hover:text-white"></i>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};