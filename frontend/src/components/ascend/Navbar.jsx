import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { trackLead, waLink, WA_MESSAGES } from "@/lib/site";

const LINKS = [
  { href: "#solucao", label: "Solução" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#case", label: "Case" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#111214]/85 backdrop-blur-xl border-b border-[#FAFEFF]/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-[#A0A7B5] hover:text-[#2AFFF1] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          data-testid="nav-cta-whatsapp"
          href={waLink(WA_MESSAGES.hero, "site_navbar")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLead("site_navbar")}
          className="rounded-full border border-[#2AFFF1]/50 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-[#2AFFF1] transition-all duration-300 hover:bg-[#2AFFF1] hover:text-[#111214]"
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
};
