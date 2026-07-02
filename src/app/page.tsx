import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import Offers from "@/components/Offers";
import WhyOpai from "@/components/WhyOpai";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Process />
        <Offers />
        <WhyOpai />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
