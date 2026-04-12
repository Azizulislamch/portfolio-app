import { connectDB } from "../../../lib/db";
import Project from "../../../models/Project";
import { NextResponse } from "next/server";


export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}