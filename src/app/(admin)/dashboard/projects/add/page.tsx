"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

export default function AddProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
    githubLink: "",
    technologies: "",
  });

  // ─── Cloudinary Upload ────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    setPreviewUrl(URL.createObjectURL(file));
    setImageUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      const result = await res.json();

      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, image: result.secure_url }));
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      Swal.fire({
        title: "Upload Failed",
        text: "Image upload failed, try again!",
        icon: "error",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#dc2626",
      });
      setPreviewUrl("");
    } finally {
      setImageUploading(false);
    }
  };

  // ─── Form Submit ──────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      Swal.fire({
        title: "Image Required",
        text: "Please upload a thumbnail image.",
        icon: "warning",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    setLoading(true);

    const techArray = formData.technologies.split(",").map((t) => t.trim()).filter(Boolean);
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
      } else {
        throw new Error("Failed to save project");
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#dc2626",
      });
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
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
          Showcase your latest masterpiece
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111111] p-10 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">

        {/* Title + Tech Stack */}
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

        {/* Description */}
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

        {/* ✅ Cloudinary Image Upload */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
            Thumbnail Image
          </label>

          <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all
            ${imageUploading ? "border-yellow-500 bg-yellow-500/5" : previewUrl ? "border-red-600 bg-red-600/5" : "border-white/10 bg-black/50 hover:border-red-600 hover:bg-red-600/5"}`}
          >
            {imageUploading ? (
              <div className="flex flex-col items-center gap-2 text-yellow-400">
                <i className="fa-solid fa-spinner animate-spin text-2xl" />
                <span className="text-xs font-bold uppercase tracking-widest">Uploading...</span>
              </div>
            ) : previewUrl ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image src={previewUrl} alt="Preview" fill className="object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Change Image</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <i className="fa-solid fa-cloud-arrow-up text-3xl" />
                <span className="text-xs font-bold uppercase tracking-widest">Click to upload image</span>
                <span className="text-[10px] text-gray-600">PNG, JPG, WEBP supported</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={imageUploading}
            />
          </label>
        </div>

        {/* Live + GitHub Links */}
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

        {/* Submit */}
        <button
          disabled={loading || imageUploading}
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Publishing..." : imageUploading ? "Waiting for upload..." : "Publish Project"}
        </button>

      </form>
    </motion.div>
  );
}