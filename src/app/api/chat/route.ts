import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ আপনার website থেকে নেওয়া real data
const AZIZUL_CONTEXT = `
You are the AI Assistant of Azizul Islam's portfolio website.

ABOUT:
- Name: Azizul Islam
- Role: Creative Web Developer (MERN Stack, Next.js)
- DOB: November 11, 2001
- Address: Plot 1081/1092, Khilbarirtek, Vatara, Dhaka 1212
- Email: azizulislamch@gmail.com
- Phone: +880 1783-519763
- Languages: English, Bengali
- Freelance: Available
- GitHub: https://github.com/Azizulislamch
- CV: https://portfolio-app-azizul.vercel.app/assets/Azizul Islam_CV.pdf

EDUCATION:
- B.Sc. in CSE, Presidency University Dhaka (2022–2026, Final Semester), CGPA: 3.70
- HSC Science, Hazi Asmat Govt. College (2018–2020), GPA: 5.00

EXPERIENCE:
- MERN Stack Developer Intern @ Goinnovior Limited via SkillJobs (Jan 2026 – Present)
  Working on REST APIs, authentication, scalable web apps
- President, Presidency University Programming Club (Jan 2024 – Dec 2025)

STATS:
- 55+ Projects completed
- 100+ Happy customers
- 95% client satisfaction

TECH STACK:
- Frontend: HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, React, Next.js
- Backend: Node.js, Express.js, MongoDB
- Tools: Git, GitHub, Postman, Figma, C++

SERVICES:
- UI/UX Design
- Brand Identity
- Mobile App Design
- Web Development
- Digital Products
- Content Strategy

FEATURED PROJECTS:
1. Justice - Legal Solutions: Law firm landing page (HTML, Tailwind, JS)
   Live: https://azizulislamch.github.io/legal-solutions/
   GitHub: https://github.com/Azizulislamch/legal-solutions

2. Smart Minds Kindergarten: Responsive kindergarten website (HTML, CSS)
   Live: https://azizulislamch.github.io/Smart-Minds-Kindergarten/
   GitHub: https://github.com/Azizulislamch/Smart-Minds-Kindergarten

3. ApplyFlow – Job Application Tracker: CRUD app with local storage (React, Tailwind)
   Live: https://applyflow-react.vercel.app/
   GitHub: https://github.com/Azizulislamch/applyflow-react

PORTFOLIO: https://portfolio-app-azizul.vercel.app/

INSTRUCTIONS:
- Answer in the same language the user writes (Bangla হলে Bangla, English হলে English)
- Keep answers concise and helpful
- For hiring: direct to azizulislamch@gmail.com
- If unsure about something, say "এই বিষয়ে নিশ্চিত নই, সরাসরি contact করুন: azizulislamch@gmail.com"
- Never make up information
`;

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

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: AZIZUL_CONTEXT },
        { role: "user", content: message },
      ],
      model: "llama-3.1-8b-instant",
      max_tokens: 1024,
    });

    const aiResponse =
      chatCompletion.choices[0]?.message?.content?.trim() ||
      "দুঃখিত, আমি উত্তর দিতে পারছি না।";

    return NextResponse.json({ text: aiResponse });

  } catch (error: any) {
    console.error("❌ Groq API Error:", error?.message || error);

    if (error?.status === 401) {
      return NextResponse.json({ text: "Invalid API key." }, { status: 401 });
    }
    if (error?.status === 429) {
      return NextResponse.json({ text: "Rate limit hit. কিছুক্ষণ পর আবার চেষ্টা করুন। ⏳" }, { status: 429 });
    }

    return NextResponse.json(
      { text: "সার্ভারে সমস্যা হচ্ছে। আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}