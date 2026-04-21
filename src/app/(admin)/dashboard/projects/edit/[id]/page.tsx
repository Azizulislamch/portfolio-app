"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
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

  // ─── Fetch existing project ───────────────────────────────────
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
              : data.technologies || "",
          });

          // ✅ existing image টা preview এ দেখাও
          if (data.image) setPreviewUrl(data.image);
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

  // ─── Cloudinary Upload ────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        text: "Image upload করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        icon: "error",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#dc2626",
      });
      // ✅ upload fail হলে আগের image এ ফিরে যাও
      setPreviewUrl(formData.image);
    } finally {
      setImageUploading(false);
    }
  };

  // ─── Form Submit ──────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

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
      } else {
        throw new Error("Update failed");
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Update failed. Please try again.",
        icon: "error",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 animate-pulse">
        Loading...
      </div>
    );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-10">
      <div className="mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">
          Edit <span className="text-red-700">Project</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111111] p-10 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">

        {/* Title + Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Tech Stack (Comma Separated)</label>
            <input
              required
              type="text"
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

        {/* ✅ Cloudinary Image Upload — existing image preloaded */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
            Thumbnail Image
            <span className="ml-2 text-gray-600 normal-case tracking-normal">(optional — keep current or upload new)</span>
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
                  <span className="text-white text-xs font-bold uppercase tracking-widest">
                    <i className="fa-solid fa-pen mr-2" />
                    Change Image
                  </span>
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

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs"
          >
            Cancel
          </button>
          <button
            disabled={updating || imageUploading}
            type="submit"
            className="flex-2 bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] disabled:opacity-50"
          >
            {updating ? "Updating..." : imageUploading ? "Waiting for upload..." : "Save Changes"}
          </button>
        </div>

      </form>
    </motion.div>
  );
}