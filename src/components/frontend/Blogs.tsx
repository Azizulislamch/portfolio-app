"use client";

import { motion } from "framer-motion";
import Button from "../shared/Button";

interface Blog {
    _id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
}

const Blogs = ({ blogs }: { blogs: Blog[] }) => {
    return (
        <section id="blogs" className="bg-[#0d0d0d] py-24 px-6 md:px-12 lg:px-24 text-white">
            <div className="max-w-7xl mx-auto">

                {/* Section Title */}
                <div className="text-center mb-16">
                    <p className="text-red-500 uppercase tracking-widest text-sm font-bold mb-2">Read my thoughts</p>
                    <h2 className="text-4xl md:text-6xl font-black">Latest Blogs</h2>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-[#1a1a1a] p-8 md:p-12 rounded-[40px] border border-white/5 hover:border-red-500/30 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold uppercase">
                                            {blog.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold group-hover:text-red-500 transition-colors duration-300">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-400 text-lg leading-relaxed max-w-4xl line-clamp-2">
                                        {blog.description}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    <a href={`/blog/${blog._id}`}>
                                        <Button>Read Article</Button>
                                    </a>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-12 right-12 h-px bg-white/5 group-hover:bg-red-500/30 transition-colors"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;