import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import Offers from "@/components/Offers";
import WhyOspia from "@/components/WhyOspia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Formulaire caché pour la détection des champs par Netlify au build */}
        <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="text" name="company" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message"></textarea>
        </form>
        <Hero />
        <Problem />
        <Offers />
        <Process />
        <WhyOspia />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
