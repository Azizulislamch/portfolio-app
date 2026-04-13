import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const newBlog = await Blog.create({
      title: body.title,
      description: body.description,
      category: body.category
    });
    
    return NextResponse.json({ message: "Blog Added!", data: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}