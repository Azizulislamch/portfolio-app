import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import {Project} from "@/models/Project"; // নিশ্চিত হোন যে এটি ডিফল্ট ইম্পোর্ট

// ১. GET Method - নির্দিষ্ট প্রোজেক্টের ডাটা পাওয়ার জন্য
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params এখন একটি Promise
) {
  try {
    await connectDB();
    const { id } = await params; // আইডি অ্যাক্সেস করার আগে await করতে হবে
    
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching project", error: error.message },
      { status: 500 }
    );
  }
}

// ২. PUT Method - প্রোজেক্টের ডাটা আপডেট করার জন্য
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // এখানেও Promise ব্যবহার করুন
) {
  try {
    await connectDB();
    const { id } = await params; // await করে আইডি নিতে হবে
    const body = await request.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// ৩. DELETE Method - প্রোজেক্ট ডিলিট করার জন্য
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
}