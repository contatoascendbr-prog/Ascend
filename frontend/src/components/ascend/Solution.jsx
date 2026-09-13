import { CheckCircle2 } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";

const SOLUTION_IMG = "https://images.pexels.com/photos/3520679/pexels-photo-3520679.jpeg";

const POINTS = [
  "Explica seus serviços no seu lugar",
  "Tira dúvida de preço e prazo na hora",
  "Encaminha quem tá pronto direto pro seu WhatsApp",
];

export const Solution = () => (
  <section
    id="solucao"
    data-testid="solution-section"
    className="relative py-20 lg:py-28 overflow-hidden"
  >
    <div className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[#4B0082]/25 blur-[140px]" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <Chapter num="02" label="A solução" testId="chapter-solution" />
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            O Site com <span className="text-[#2AFFF1]">Assistente Ascend</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 space-y-4 text-base sm:text-lg text-[#A0A7B5] leading-relaxed">
            <p>
              Uma landing page profissional com um assistente de IA embutido que conhece seu
              negócio e responde por você — de dia, de noite, fim de semana.
            </p>
            <p className="text-[#FAFEFF] font-medium">
              Você não perde mais lead por demora. O site trabalha mesmo quando você não tá
              olhando.
            </p>
          </div>
        </Reveal>
        <div className="mt-8 space-y-3">
          {POINTS.map((point, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2AFFF1] shrink-0" />
                <p className="text-sm sm:text-base text-[#FAFEFF]">{point}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.2}>
        <div
          data-testid="solution-image-frame"
          className="relative rounded-2xl border border-[#2AFFF1]/20 bg-[#16181D] p-2 shadow-[0_0_60px_rgba(75,0,130,0.35)]"
        >
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FAFEFF]/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FAFEFF]/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2AFFF1]/60" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src={SOLUTION_IMG}
              alt="Tecnologia por trás do Assistente Ascend"
              loading="lazy"
              className="w-full h-64 sm:h-80 object-cover opacity-90"
            />
          </div>
          <div className="absolute -bottom-4 left-6 rounded-full border border-[#2AFFF1]/40 bg-[#111214] px-4 py-1.5">
            <span className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#2AFFF1]">
              IA treinada no seu negócio
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
