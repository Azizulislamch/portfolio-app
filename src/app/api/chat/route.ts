import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ─── DB Connection ────────────────────────────────────────────────────────────
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// ─── Models ───────────────────────────────────────────────────────────────────
const Project = mongoose.models.Project || mongoose.model("Project", new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  githubLink: String,
  liveLink: String,
}));

const Blog = mongoose.models.Blog || mongoose.model("Blog", new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  author: { type: String, default: "Azizul Islam" },
  createdAt: Date,
}));

// ─── Groq Client ──────────────────────────────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Static Context ───────────────────────────────────────────────────────────
const STATIC_CONTEXT = `
You are the AI Assistant on Azizul Islam's portfolio website.

ABOUT:
- Name: Azizul Islam
- Role: Creative Web Developer (MERN Stack & Next.js)
- DOB: November 11, 2001
- Location: Khilbarirtek, Vatara, Dhaka 1212
- Email: azizulislamch@gmail.com
- Phone: +880 1783-519763
- Freelance Status: Available
- GitHub: https://github.com/Azizulislamch
- Portfolio: https://portfolio-app-azizul.vercel.app/

EDUCATION:
- B.Sc. in CSE, Presidency University Dhaka (2022–2026, Final Semester) — CGPA: 3.70
- HSC Science, Hazi Asmat Govt. College (2018–2020) — GPA: 5.00

EXPERIENCE:
- MERN Stack Developer Intern @ Goinnovior Limited via SkillJobs (Jan 2026 – Present)
- President, Presidency University Programming Club / PUPC (Jan 2024 – Dec 2025)

TECH STACK:
- Frontend: HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, React, Next.js
- Backend: Node.js, Express.js, MongoDB
- Tools: Git, GitHub, Postman, Figma, C++

SERVICES:
UI/UX Design, Brand Identity, Web Development, Mobile App Design, Digital Products, Content Strategy

STATS:
- 55+ Projects Completed
- 100+ Happy Customers
- 95% Client Satisfaction
`;

const INSTRUCTIONS = `
LANGUAGE RULES:
- Default language is English — always start in English
- Switch language ONLY when user writes a full sentence in another language
- Bangla script (বাংলা) → reply in Bangla
- Banglish full sentence (e.g. "bhai tomar projects gulo ki?") → reply in Banglish
- Single words like "ok", "nice", "thanks", "hey", "hm" → stay in English
- When in doubt → default to English
- Once switched, maintain that language until user switches again
- Keep answers concise and helpful

BEHAVIOR RULES:
- Be concise, friendly, and professional
- Use the database context above for accurate project and blog details
- For hiring inquiries, always mention: azizulislamch@gmail.com
- Never fabricate information about Azizul
- If unsure: "I'm not sure about this — please contact directly: azizulislamch@gmail.com"
`;

// ─── Main Handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ text: "API key missing." }, { status: 500 });
    }

    const body = await req.json();
    const message = body?.message?.trim();

    if (!message) {
      return NextResponse.json({ text: "Message cannot be empty." }, { status: 400 });
    }

    // Fetch live data from MongoDB
    await connectDB();
    const [projects, blogs] = await Promise.all([
      Project.find({})
        .select("title description technologies liveLink githubLink")
        .lean(),
      Blog.find({})
        .select("title description category author createdAt")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Format DB data for AI context
    const projectsText = (projects as any[]).length
      ? (projects as any[]).map((p, i) =>
          `${i + 1}. ${p.title}: ${p.description} | Tech: ${p.technologies?.join(", ") || "N/A"} | Live: ${p.liveLink || "N/A"} | GitHub: ${p.githubLink || "N/A"}`
        ).join("\n")
      : "No projects found.";

    const blogsText = (blogs as any[]).length
      ? (blogs as any[]).map((b, i) =>
          `${i + 1}. [${b.category}] ${b.title} — ${b.description?.slice(0, 150)}...`
        ).join("\n")
      : "No blogs found.";

    // Build full system prompt
    const systemPrompt = `
${STATIC_CONTEXT}

PROJECTS FROM DATABASE (${(projects as any[]).length} total):
${projectsText}

RECENT BLOGS FROM DATABASE (${(blogs as any[]).length} total):
${blogsText}

${INSTRUCTIONS}
    `.trim();

    // Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const aiResponse =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ text: aiResponse });

  } catch (error: any) {
    console.error("❌ Chat API Error:", error?.message || error);

    if (error?.status === 401) {
      return NextResponse.json({ text: "Invalid API key." }, { status: 401 });
    }
    if (error?.status === 429) {
      return NextResponse.json({ text: "Too many requests. Please try again shortly. ⏳" }, { status: 429 });
    }

    return NextResponse.json(
      { text: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}