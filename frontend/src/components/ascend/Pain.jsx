import { Clock, MousePointerClick, Repeat, TrendingDown, EyeOff, Timer } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";

const PAINS = [
  { icon: Clock, text: "Cliente mandou mensagem e você só viu 3 horas depois" },
  { icon: MousePointerClick, text: "Site bonito, mas que não converte visita em contato" },
  { icon: Repeat, text: "Precisou parar o que tava fazendo pra responder pergunta repetida" },
  { icon: TrendingDown, text: "Perdeu venda porque demorou pra responder" },
  { icon: EyeOff, text: "Não sabe se as pessoas que visitam seu site voltam ou desistem" },
  { icon: Timer, text: "Tá sem tempo pra cuidar de presença digital e sente que tá ficando pra trás" },
];

export const Pain = () => (
  <section data-testid="pain-section" className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Chapter num="01" label="A dor" testId="chapter-pain" />
      <Reveal>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          Se seu negócio depende de gente encontrar você online, provavelmente você já{" "}
          <span className="text-[#2AFFF1]">viveu isso:</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PAINS.map((pain, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div
              data-testid={`pain-card-${i}`}
              className="group h-full rounded-2xl border border-[#FAFEFF]/8 bg-[#16181D] p-6 transition-all duration-300 hover:border-[#2AFFF1]/40 hover:-translate-y-1"
            >
              <pain.icon className="w-6 h-6 text-[#2AFFF1] mb-4 transition-transform duration-300 group-hover:scale-110" />
              <p className="text-sm sm:text-base text-[#A0A7B5] leading-relaxed">{pain.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
