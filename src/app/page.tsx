import Blogs from "@/components/frontend/Blogs";
import About from "@/components/frontend/About";
import Hero from "@/components/frontend/Hero";
import Navbar from "@/components/frontend/Navbar";
import Projects from "@/components/frontend/Projects";
import Services from "@/components/frontend/Services";
import Skills from "@/components/frontend/Skills";

import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import { Blog } from "@/models/Blog";
import Contact from "@/components/frontend/Contact";
import Resume from "@/components/frontend/Resume";
import Footer from "@/components/frontend/Footer";

export const dynamic = 'force-dynamic'; 
export const revalidate = 0;

export default async function Home() {
  // Database Connection
  await connectDB();

  // Projects and Blogs Data fetch
  const projectsData = await Project.find().sort({ order: 1 }).lean();
  const blogsData = await Blog.find().sort({ createdAt: -1 }).lean();

  const projects = JSON.parse(JSON.stringify(projectsData));
  const blogs = JSON.parse(JSON.stringify(blogsData));

  const limitedProjects = projects.slice(0, 3);
  const limitedBlogs = blogs.slice(0, 3);

  return (
    <main className="bg-primary min-h-screen flex flex-col w-full">
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <Skills />
      <Services />
      <Projects projects={limitedProjects} showSeeMore={true} /> 
      <Blogs blogs={limitedBlogs} showSeeMore={true} />
      <Contact />
      <Footer />
    </main>
  );
}