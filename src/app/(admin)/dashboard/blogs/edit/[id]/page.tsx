"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  // ডাটাবেস থেকে পুরাতন ব্লগ ডাটা ফেচ করা
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch blog", error);
        Swal.fire("Error", "Could not load blog data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          title: "Blog Updated!",
          text: "Your blog post has been successfully updated.",
          icon: "success",
          background: "#111111",
          color: "#ffffff",
          confirmButtonColor: "#dc2626",
        });
        router.push("/dashboard/blogs");
        router.refresh();
      }
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">
        Loading Blog Data...
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">
          Edit <span className="text-red-600">Blog Post</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Refine your thoughts and insights</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111111] p-10 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Blog Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white font-bold"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Category</label>
            <input
              required
              type="text"
              placeholder="e.g. Technology, Programming"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all text-white font-bold"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Content / Description</label>
          <textarea
            required
            rows={12}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-6 focus:outline-none focus:border-red-600 transition-all text-white leading-relaxed resize-none custom-scrollbar"
            placeholder="Write your blog content here..."
          />
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
                className="flex-[2] bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.3em] text-xs shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] disabled:opacity-50"
            >
                {updating ? "Updating Blog..." : "Update Post"}
            </button>
        </div>
      </form>
    </motion.div>
  );
}