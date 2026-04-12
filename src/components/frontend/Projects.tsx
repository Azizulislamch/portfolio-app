"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
}

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="bg-[#0d0d0d] py-24 px-6 md:px-12 lg:px-24 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 uppercase tracking-widest text-sm font-bold mb-2">Showcase my skills</p>
          <h2 className="text-4xl md:text-6xl font-black">Featured Work</h2>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 bg-[#1a1a1a] p-4 rounded-[40px] border border-white/5 hover:border-red-500/30 transition-all duration-500">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[30px]">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-[#1a1a1a] text-gray-400 px-4 py-2 rounded-full text-sm border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-red-600/20 inline-block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;