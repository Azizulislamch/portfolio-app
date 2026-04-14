import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";

// ১. GET Method - নির্দিষ্ট ব্লগের ডাটা রিড করার জন্য
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params এখন একটি Promise
) {
  try {
    await connectDB();
    const { id } = await params; // আইডি অ্যাক্সেস করার আগে await করতে হবে
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching blog", error: error.message },
      { status: 500 }
    );
  }
}

// ২. PUT Method - ব্লগের ডাটা আপডেট করার জন্য
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // এখানেও Promise টাইপ ব্যবহার করতে হবে
) {
  try {
    await connectDB();
    const { id } = await params; // await করে আইডি নিতে হবে
    const body = await request.json();

    // ডাটাবেসে আপডেট প্রক্রিয়া
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// ৩. DELETE Method - ব্লগ ডিলিট করার জন্য
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
}