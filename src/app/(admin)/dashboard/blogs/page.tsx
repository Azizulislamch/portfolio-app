"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Button from "@/components/shared/Button";

interface Blog {
    _id: string;
    title: string;
    category: string;
    createdAt: string;
}

export default function BlogManagement() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blogs");
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        // Professional Pop-up configuration
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#1a1a1a",
            confirmButtonText: "Yes, delete it!",
            background: "#111111",
            color: "#ffffff",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
                    if (res.ok) {
                        setBlogs(blogs.filter((b) => b._id !== id));
                        // Delete Successfully Alert
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your blog has been deleted.",
                            icon: "success",
                            background: "#111111",
                            color: "#ffffff",
                            confirmButtonColor: "#dc2626",
                        });
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete the blog.", "error");
                }
            }
        });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                        Manage <span className="text-red-700">Blogs</span>
                    </h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Total {blogs.length} articles published</p>
                </div>
                <Link href="/dashboard/blogs/add">
                    <Button>
                        + Write New Blog
                    </Button>
                </Link>
            </div>

            <div className="bg-[#111111] rounded-[30px] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
                            <th className="px-8 py-6">Date</th>
                            <th className="px-8 py-6">Blog Title</th>
                            <th className="px-8 py-6">Category</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={4} className="p-20 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Loading Articles...</td></tr>
                        ) : blogs.length === 0 ? (
                            <tr><td colSpan={4} className="p-20 text-center text-gray-500">No blogs found. Start writing!</td></tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 font-bold text-gray-200 group-hover:text-red-500 transition-colors">
                                        {blog.title}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-6">
                                        <Link
                                            href={`/dashboard/blogs/edit/${blog._id}`}
                                            className="text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-600/50 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-widest"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}