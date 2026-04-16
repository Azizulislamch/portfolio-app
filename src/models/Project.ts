import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String }],
  githubLink: { type: String },
  liveLink: { type: String },
  order: { type: Number, default: 0 }, // For Reordering projects
}, { timestamps: true });

export const Project = models.Project || model("Project", ProjectSchema);