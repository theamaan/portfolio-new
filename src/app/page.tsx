import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Timeline } from "@/components/Timeline";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Timeline />
      <Capabilities />
      <Contact />
    </>
  );
}
