import { connectDB } from "@/lib/db"; 
import { Project } from "@/models/Project"; 
import { NextResponse } from "next/server";

// GET Method
export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error.message },
      { status: 500 }
    );
  }
}

// POST Method
export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and Description are required" },
        { status: 400 }
      );
    }

    // Create new project
    const newProject = await Project.create(body);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create project", details: error.message },
      { status: 500 }
    );
  }
}