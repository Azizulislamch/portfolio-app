import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    
    // পরিবর্তন: এখানে order: 1 দিয়ে সর্ট করা হয়েছে যাতে ছোট থেকে বড় সিরিয়ালে আসে।
    // যদি দুটি প্রজেক্টের order সমান হয়, তবে নতুনটা আগে দেখাবে (createdAt: -1)।
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and Description are required" }, { status: 400 });
    }

    // পরিবর্তন: নতুন প্রজেক্ট তৈরি করার সময় এটি যেন সবার শেষে থাকে, 
    // তাই আপনি চাইলে ডাটাবেসের টোটাল প্রজেক্ট কাউন্ট চেক করে order সেট করতে পারেন।
    const projectCount = await Project.countDocuments();
    const newProject = await Project.create({
      ...body,
      order: projectCount // এটি অটোমেটিক সবশেষে বসাবে
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create", details: error.message }, { status: 500 });
  }
}