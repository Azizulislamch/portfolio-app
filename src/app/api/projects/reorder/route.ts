import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { updatedProjects } = await request.json();

    const updatePromises = updatedProjects.map((project: any, index: number) =>
      Project.findByIdAndUpdate(
        project._id, 
        { $set: { order: index } }, // সরাসরি index কে order হিসেবে সেট করুন
        { new: true }
      )
    );
    
    await Promise.all(updatePromises);
    return NextResponse.json({ message: "Reordered successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
}