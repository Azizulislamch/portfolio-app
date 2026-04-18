import Projects from "@/components/frontend/Projects";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";

export default async function AllProjectsPage() {
  await connectDB();
  const projectsData = await Project.find().sort({ order: 1 }).lean();
  const projects = JSON.parse(JSON.stringify(projectsData));

  return (
    <main className="bg-[#0d0d0d] min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Projects projects={projects} showSeeMore={false} />
      </div>
      <Footer />
    </main>
  );
}