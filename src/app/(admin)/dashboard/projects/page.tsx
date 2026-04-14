"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

interface Project {
    _id: string;
    title: string;
    technologies: string[];
    liveLink: string;
}

export default function ProjectManagement() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                // নিশ্চিত করছি যে ডাটাটি সব সময় একটি অ্যারে হবে
                setProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This project will be permanently removed!",
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
                    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
                    if (res.ok) {
                        setProjects(projects.filter((p) => p._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Project has been removed.",
                            icon: "success",
                            background: "#111111",
                            color: "#ffffff",
                            confirmButtonColor: "#dc2626",
                        });
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete project.", "error");
                }
            }
        });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                        Manage <span className="text-red-600">Projects</span>
                    </h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
                        Total {projects.length} works in portfolio
                    </p>
                </div>
                <Link
                    href="/dashboard/projects/add"
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)]"
                >
                    + Add New Project
                </Link>
            </div>

            <div className="bg-[#111111] rounded-[30px] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
                            <th className="px-8 py-6">Project Title</th>
                            <th className="px-8 py-6">Tech Stack</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={3} className="p-20 text-center text-gray-500 font-bold uppercase animate-pulse">Loading Projects...</td></tr>
                        ) : projects.length === 0 ? (
                            <tr><td colSpan={3} className="p-20 text-center text-gray-500">No projects found.</td></tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project._id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-6 font-bold text-gray-200 group-hover:text-red-500 transition-colors">
                                        {project.title}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-2">
                                            {/* FIX: এখানে technologies? ব্যবহার করা হয়েছে যাতে এটি undefined থাকলেও ক্র্যাশ না করে */}
                                            {project.technologies?.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-[9px] bg-white/5 px-2 py-1 rounded text-gray-400 uppercase font-bold border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}

                                            {/* FIX: এখানেও ঐচ্ছিক চেক (Length check) যোগ করা হয়েছে */}
                                            {project.technologies?.length > 3 && (
                                                <span className="text-[9px] text-gray-600">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-6">
                                        <Link
                                            href={`/dashboard/projects/edit/${project._id}`}
                                            className="text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(project._id)}
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