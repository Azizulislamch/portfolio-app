import mongoose, { Schema, models, model } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: "Azizul Islam"
    },
  },
  {
    timestamps: true
  }
);

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;