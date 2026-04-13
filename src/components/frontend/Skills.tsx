"use client";

import { motion } from "framer-motion";

interface SkillItem {
  id: number;
  name: string;
  percentage: number;
  icon: string; 
  color: string;
}

const Skills: React.FC = () => {
  const skillData: SkillItem[] = [
    { id: 1, name: "Next.js", percentage: 90, icon: "fa-solid fa-n", color: "#800080" },
    { id: 2, name: "React", percentage: 95, icon: "fa-brands fa-react", color: "#61dafb" },
    { id: 3, name: "Tailwind", percentage: 98, icon: "fa-solid fa-wind", color: "#38bdf8" },
    { id: 4, name: "TypeScript", percentage: 92, icon: "fa-solid fa-code", color: "#3178c6" },
    { id: 5, name: "JavaScript", percentage: 95, icon: "fa-brands fa-js", color: "#f7df1e" },
    { id: 6, name: "HTML5", percentage: 90, icon: "fa-brands fa-html5", color: "#e34f26" },
    { id: 7, name: "CSS3", percentage: 90, icon: "fa-brands fa-css3-alt", color: "#1572b6" },
    { id: 8, name: "Figma", percentage: 92, icon: "fa-brands fa-figma", color: "#f24e1e" },
    { id: 9, name: "GitHub", percentage: 90, icon: "fa-brands fa-github", color: "#ffffff" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="skills" className="bg-[#0d0d0d] py-16 md:py-24 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-16 text-center"
        >
          <span className="text-red-500 font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
            My Favorite Tools
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
            Tech Stack That Power My Work
          </h2>
        </motion.div>

        
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillData.map((skill) => (
            <motion.div
              key={skill.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                borderColor: "rgba(239, 68, 68, 0.3)",
                boxShadow: "0 10px 40px -10px rgba(239, 68, 68, 0.25)",
                backgroundColor: "#1a0a0a"
              }}
              
              className="relative group bg-[#111111] border border-white/5 p-8 rounded-[30px] flex flex-col items-center text-center transition-all duration-300 cursor-pointer w-full max-w-45 sm:max-w-50"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                <i className={`${skill.icon}`} style={{ color: skill.color }}></i>
              </div>

              <h3 className="text-3xl font-black mb-1.5 transition-colors duration-300 group-hover:text-red-500">
                {skill.percentage}%
              </h3>
              
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest transition-colors duration-300 group-hover:text-gray-200">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;