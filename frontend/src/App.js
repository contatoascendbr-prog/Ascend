import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import { initTracking } from "@/lib/site";
import { Navbar } from "@/components/ascend/Navbar";
import { Hero } from "@/components/ascend/Hero";
import { Marquee } from "@/components/ascend/Marquee";
import { Pain } from "@/components/ascend/Pain";
import { Statement } from "@/components/ascend/Statement";
import { Solution } from "@/components/ascend/Solution";
import { Benefits } from "@/components/ascend/Benefits";
import { Proof } from "@/components/ascend/Proof";
import { Offer } from "@/components/ascend/Offer";
import { Objections } from "@/components/ascend/Objections";
import { Faq } from "@/components/ascend/Faq";
import { FinalCta } from "@/components/ascend/FinalCta";
import { Footer } from "@/components/ascend/Footer";
import { ChatWidget } from "@/components/ascend/ChatWidget";

function App() {
  useEffect(() => {
    initTracking();
    const lenis = new Lenis({ lerp: 0.09 });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111214] text-[#FAFEFF] overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Pain />
        <Statement />
        <Solution />
        <Benefits />
        <Proof />
        <Offer />
        <Objections />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <ChatWidget />
      <Toaster theme="dark" position="bottom-left" />
    </div>
  );
}

export default App;
