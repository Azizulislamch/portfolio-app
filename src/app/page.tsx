import Blogs from "../components/frontend/Blogs";
import About from "../components/frontend/About";
import Hero from "../components/frontend/Hero";
import Navbar from "../components/frontend/Navbar";
import Projects from "../components/frontend/Projects";
import Services from "../components/frontend/Services";
import Skills from "../components/frontend/Skills";

import { connectDB } from "../lib/db";
import Project from "../models/Project";
import Blog from "../models/Blog";

// const sampleProjects = [
//   {
//     _id: "1",
//     title: "AIC Amal - Donation Platform",
//     description: "A comprehensive donation platform for different kinds of financial support.",
//     image: "/assets/projects/project1.png",
//     tags: ["Next.js", "Tailwind", "MongoDB"],
//     githubLink: "https://github.com/Azizulislamch/...",
//     liveLink: "#"
//   },
//   {
//     _id: "2",
//     title: "AIC Amal - Donation Platform",
//     description: "A comprehensive donation platform for different kinds of financial support.",
//     image: "/assets/projects/project1.png",
//     tags: ["Next.js", "Tailwind", "MongoDB"],
//     githubLink: "https://github.com/Azizulislamch/...",
//     liveLink: "#"
//   }
// ];

export default async function Home() {
  // Database Connection
  await connectDB();

  // Projects and Blogs Data fetch
  const projectsData = await Project.find().sort({ createdAt: -1 }).lean();
  const blogsData = await Blog.find().sort({ createdAt: -1 }).lean();

  const projects = JSON.parse(JSON.stringify(projectsData));
  const blogs = JSON.parse(JSON.stringify(blogsData));

  return (
    <main className="bg-primary min-h-screen flex flex-col w-full">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects projects={projects} />
      <Blogs blogs={blogs} />
    </main>
  );
}