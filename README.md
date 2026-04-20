# 🚀 Professional Portfolio Website — Azizul Islam

A modern, responsive, and high-performance portfolio website built with **Next.js 16**, **TypeScript**, and **MongoDB**. This project showcases my journey as a Web Developer, featuring a dynamic project showcase, blog system, AI-powered chatbot assistant, and a sleek dark-themed UI.

## 🌐 Live Demo

- **Live Site:** [https://portfolio-app-azizul.vercel.app/](https://portfolio-app-azizul.vercel.app/)
- **GitHub:** [https://github.com/Azizulislamch/portfolio-app](https://github.com/Azizulislamch/portfolio-app)

---

## ✨ Features

- **Modern UI/UX** — Clean, dark-themed design with smooth Framer Motion animations
- **🤖 AI Chatbot Assistant** — Powered by Groq (LLaMA 3.1) with real-time MongoDB context; answers questions about projects, skills, and hiring in English, Bangla, or Banglish
- **Project Showcase** — Dynamic project management with tech stack display and live/GitHub links
- **Blog System** — Category-based blog with full CRUD support
- **Admin Dashboard** — Secure area to Create, Update, and Delete projects and blogs
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop (Mobile First)
- **Data Persistence** — MongoDB for robust data handling via Mongoose ODM

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes |
| Database | MongoDB (Mongoose ODM) |
| AI / LLM | Groq API — `llama-3.1-8b-instant` |
| Icons | Font Awesome, React Icons |
| Deployment | Vercel |

---

## 🤖 AI Chatbot

The portfolio includes a built-in AI Assistant powered by **Groq** and **LLaMA 3.1**.

**How it works:**
- Fetches live project and blog data directly from MongoDB on every request
- Uses a curated static context about Azizul's background, skills, and experience
- Automatically detects and mirrors the user's language — English, Bangla (বাংলা), or Banglish
- Handles rate limiting, empty inputs, and API errors gracefully

**Setup:**
```bash
GROQ_API_KEY=your_groq_api_key
```
Get your free API key at [console.groq.com](https://console.groq.com)

---

## 📸 Screenshot

<img width="1701" height="824" alt="Portfolio Screenshot" src="https://github.com/user-attachments/assets/e0a9be3b-a7ae-497b-a339-5f20c63002a0" />

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have **Node.js 18+** and **npm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Azizulislamch/portfolio-app.git
   cd portfolio-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
portfolio-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/        # AI Chatbot API route (Groq + MongoDB)
│   │   │   ├── projects/    # Projects CRUD API
│   │   │   └── blogs/       # Blogs CRUD API
│   │   └── ...
│   ├── components/          # Reusable UI components (Navbar, Footer, ChatBot)
│   └── models/              # Mongoose schemas (Project, Blog)
├── public/                  # Static assets
├── .env.local               # Environment variables (not committed)
└── README.md
```

---

## 👨‍💻 Author

**Azizul Islam** — Creative Web Developer (MERN Stack & Next.js)

[![GitHub](https://img.shields.io/badge/GitHub-Azizulislamch-blueviolet?style=for-the-badge&logo=github)](https://github.com/Azizulislamch)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-green?style=for-the-badge&logo=vercel)](https://portfolio-app-azizul.vercel.app/)
[![Email](https://img.shields.io/badge/Email-azizulislamch@gmail.com-red?style=for-the-badge&logo=gmail)](mailto:azizulislamch@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

⭐ If you find this repository helpful, feel free to star it!
