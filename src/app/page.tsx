import About from "../components/frontend/About";
import Hero from "../components/frontend/Hero";
import Navbar from "../components/frontend/Navbar";
import Services from "../components/frontend/Services";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex flex-col w-full">
      <Navbar />
      <Hero />
      <About />
      <Services />
    </main>
  );
}