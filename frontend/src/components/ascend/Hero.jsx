import { motion, useScroll, useTransform } from "framer-motion";
import { Bot } from "lucide-react";
import { WhatsAppCta } from "./CtaButton";
import { WA_MESSAGES } from "@/lib/site";

const LINES = [
  { text: "Pare de perder", accent: false },
  { text: "cliente por", accent: false },
  { text: "demora.", accent: true },
];

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.2 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STATS = [
  ["1 dia útil", "pro site no ar"],
  ["24h", "de atendimento com IA"],
  ["+2 anos", "de mercado"],
];

export const Hero = () => {
  const { scrollY } = useScroll();
  const yGlow = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-44 sm:pb-24"
    >
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute -top-48 -right-48 w-[560px] h-[560px] rounded-full bg-[#4B0082]/40 blur-[140px]"
      />
      <div className="pointer-events-none absolute top-1/3 -left-56 w-[420px] h-[420px] rounded-full bg-[#2AFFF1]/10 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#FAFEFF 1px, transparent 1px), linear-gradient(90deg, #FAFEFF 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#2AFFF1]/30 bg-[#2AFFF1]/5 px-4 py-1.5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2AFFF1] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2AFFF1]" />
          </span>
          <span className="font-mono-accent text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#2AFFF1]">
            Atendimento com IA ativo
          </span>
        </motion.div>

        <h1
          data-testid="hero-headline"
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
        >
          {LINES.map((l, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={`block ${l.accent ? "text-[#2AFFF1]" : ""}`}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-[#A0A7B5] leading-relaxed"
        >
          A Ascend cria sites e landing pages com um assistente de IA embutido, que
          representa sua empresa e responde cliente na hora — mesmo com você offline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <WhatsAppCta
            message={WA_MESSAGES.hero}
            source="site_hero"
            testId="hero-cta-whatsapp"
          >
            Quero Meu Site com IA
          </WhatsAppCta>
          <button
            data-testid="hero-cta-chat"
            onClick={() => window.dispatchEvent(new CustomEvent("ascend:open-chat"))}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAFEFF]/15 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#FAFEFF] transition-colors duration-300 hover:border-[#2AFFF1]/60 hover:text-[#2AFFF1]"
          >
            <Bot className="w-4 h-4" />
            Testar o assistente
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-4 text-xs text-[#646D7E]"
        >
          Diagnóstico gratuito, direto no WhatsApp • Sem compromisso
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-[#FAFEFF]/8 pt-8 max-w-2xl"
        >
          {STATS.map(([value, label]) => (
            <div key={label}>
              <p className="font-mono-accent text-lg sm:text-2xl font-semibold text-[#2AFFF1]">
                {value}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-[#646D7E] uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
