"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
    githubLink: "",
    technologies: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            image: data.image || "",
            liveLink: data.liveLink || "",
            githubLink: data.githubLink || "",
            
            technologies: Array.isArray(data.technologies)
              ? data.technologies.join(", ")
              : (data.technologies || ""),
          });
        }
      } catch (error) {
        console.error("Failed to fetch project", error);
        Swal.fire("Error", "Could not load project data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    // String is converted into array before save
    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const updatedData = { ...formData, technologies: techArray };

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        Swal.fire({
          title: "Updated!",
          text: "Project updated successfully.",
          icon: "success",
          background: "#111111",
          color: "#ffffff",
          confirmButtonColor: "#dc2626",
        });
        router.push("/dashboard/projects");
        router.refresh();
      }
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500 animate-pulse">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-10">
      <div className="mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">
          Edit <span className="text-red-600">Project</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111111] p-10 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Title */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Project Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white font-bold"
            />
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Tech Stack (Comma Separated)</label>
            <input
              required
              type="text"
              placeholder="e.g. React, Next.js, MongoDB"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white font-bold"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-6 focus:outline-none focus:border-red-600 transition-all text-white leading-relaxed resize-none"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Thumbnail Image URL</label>
          <input
            required
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Live Demo URL</label>
            <input
              type="url"
              value={formData.liveLink}
              onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">GitHub URL</label>
            <input
              type="url"
              value={formData.githubLink}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs"
          >
            Cancel
          </button>
          <button
            disabled={updating}
            type="submit"
            className="flex-2 bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] disabled:opacity-50"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}