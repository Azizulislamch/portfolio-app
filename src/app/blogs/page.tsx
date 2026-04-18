import Blogs from "@/components/frontend/Blogs";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AllBlogsPage() {
  await connectDB();

  const blogsData = await Blog.find().sort({ createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(blogsData));

  return (
    <main className="bg-[#0d0d0d] min-h-screen flex flex-col w-full">
      <Navbar />
      
      <div className="pt-16"> 
        <Blogs blogs={blogs} showSeeMore={false} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}