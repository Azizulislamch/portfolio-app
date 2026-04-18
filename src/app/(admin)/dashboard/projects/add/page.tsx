"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
    githubLink: "",
    technologies: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const techArray = formData.technologies.split(",").map((t) => t.trim());
    const projectData = { ...formData, technologies: techArray };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Project added to your portfolio.",
          icon: "success",
          background: "#111111",
          color: "#ffffff",
          confirmButtonColor: "#dc2626",
        });
        router.push("/dashboard/projects");
        router.refresh();
      }
    } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">
          Add New <span className="text-red-700">Project</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Showcase your latest masterpiece</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111111] p-10 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Project Title</label>
            <input
              required
              type="text"
              placeholder="e.g. AI SaaS Platform"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white font-bold"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Tech Stack (Comma Separated)</label>
            <input
              required
              type="text"
              placeholder="React, Next.js, Tailwind"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white font-bold"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Description</label>
          <textarea
            required
            rows={4}
            placeholder="What does this project do?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-6 focus:outline-none focus:border-red-600 transition-all text-white leading-relaxed resize-none"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Thumbnail Image URL</label>
          <input
            required
            type="text"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Live Link URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.liveLink}
              onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">GitHub URL</label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={formData.githubLink}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white"
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Uploading..." : "Publish Project"}
        </button>
      </form>
    </motion.div>
  );
}