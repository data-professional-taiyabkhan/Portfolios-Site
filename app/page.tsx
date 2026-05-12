import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Research from "@/components/Research";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Research />
      <Stack />
      <Contact />
    </main>
  );
}
