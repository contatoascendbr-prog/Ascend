import { LOGO_DARK_BG } from "@/lib/site";

export const LogoMark = ({ className = "w-9 h-9" }) => (
  <img
    src={LOGO_DARK_BG}
    alt="Ascend Digital"
    className={`${className} mix-blend-screen object-contain`}
  />
);

export const Logo = () => (
  <a href="#top" data-testid="logo-home-link" className="flex items-center gap-2.5">
    <LogoMark />
    <span className="leading-none">
      <span className="block text-lg font-extrabold tracking-tight text-[#FAFEFF]">
        Ascend Digital
      </span>
      <span className="block font-mono-accent text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#A0A7B5] mt-1">
        Web Design & Automação IA
      </span>
    </span>
  </a>
);
