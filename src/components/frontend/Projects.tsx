"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../shared/Button";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="bg-[#0d0d0d] py-24 px-6 md:px-12 lg:px-24 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 uppercase tracking-widest text-sm font-bold mb-2">Showcase my skills</p>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Featured Work</h2>
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
              <div className="w-full lg:w-1/2 bg-[#1a1a1a] p-4 rounded-[40px] border border-white/5 hover:border-red-500/30 transition-all duration-500 group">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[30px] bg-[#0d0d0d]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.technologies.map(tag => (
                    <span key={tag} className="bg-[#1a1a1a] text-gray-400 px-4 py-2 rounded-full text-sm border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons: Live Link and Font Awesome GitHub */}
                <div className="pt-6 flex flex-wrap gap-4">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button className="text-[16px]">Live Link</Button>
                  </a>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-red-500/50 rounded-full transition-all bg-white/5 font-semibold text-[16px] hover:text-red-500"
                  >
                    {/* Font Awesome GitHub Icon */}
                    <i className="fab fa-github text-xl"></i>
                    GitHub Link
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