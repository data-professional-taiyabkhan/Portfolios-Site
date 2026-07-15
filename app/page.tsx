import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ThreeTools from "@/components/ThreeTools";
import Work from "@/components/Work";
import SideQuests from "@/components/SideQuests";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ThreeTools />
      <Work />
      <SideQuests />
      <About />
      <Contact />
    </main>
  );
}
