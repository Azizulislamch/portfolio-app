import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

// GET
export async function GET() {
  try {
    await connectDB();
    
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Title, description and category are required" },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      title: body.title,
      description: body.description,
      category: body.category
    });

    return NextResponse.json(
      { message: "Blog Added Successfully!", data: newBlog }, 
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create blog", details: error.message }, 
      { status: 500 }
    );
  }
}