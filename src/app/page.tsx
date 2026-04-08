import Hero from "../components/frontend/Hero";
import Navbar from "../components/frontend/Navbar";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex items-center justify-center">
      <Navbar />
      <Hero />
    </main>
  );
}