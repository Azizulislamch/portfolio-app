import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find({}).sort({ order: 1});
    
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

    
    const projectCount = await Project.countDocuments();
    const newProject = await Project.create({
      ...body,
      order: projectCount
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create", details: error.message }, { status: 500 });
  }
}