import { CheckCircle2 } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";

const STEPS = [
  "Você conversa com o time e conta seu objetivo",
  "A Ascend monta o site com copy e IA treinada no seu negócio",
  "Você aprova",
  "Site no ar em até 1 dia útil",
];

const INCLUDED = [
  "Site ou landing page completa",
  "Copy profissional escrita pro seu negócio",
  "Assistente de IA integrado, treinado com suas respostas",
  "Redirecionamento qualificado pro seu WhatsApp",
];

const TERMS = [
  ["Investimento", "sob consulta — cada negócio tem um escopo diferente, o valor é fechado depois da conversa"],
  ["Pagamento", "Pix ou cartão de crédito"],
  ["Manutenção", "plano opcional, contratado à parte"],
];

export const Offer = () => (
  <section data-testid="offer-section" className="relative py-20 lg:py-28 overflow-hidden">
    <div className="pointer-events-none absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#4B0082]/25 blur-[150px]" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Chapter num="05" label="A oferta" testId="chapter-offer" />
      <Reveal>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          Da conversa ao site no ar em{" "}
          <span className="text-[#2AFFF1]">4 passos</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((step, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div data-testid={`offer-step-${i}`} className="h-full rounded-2xl border border-[#FAFEFF]/8 bg-[#16181D] p-6">
              <p className="font-mono-accent text-3xl font-semibold text-[#2AFFF1]/70">
                0{i + 1}
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#FAFEFF] leading-relaxed">{step}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-2xl border border-[#2AFFF1]/25 bg-[#16181D] p-7 sm:p-9">
            <h3 className="text-xl font-semibold text-[#FAFEFF]">O que está incluso</h3>
            <ul className="mt-6 space-y-4">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2AFFF1] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#A0A7B5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-[#FAFEFF]/8 bg-[#16181D] p-7 sm:p-9 flex flex-col">
            <div className="space-y-5">
              {TERMS.map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#2AFFF1]">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm sm:text-base text-[#FAFEFF]">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-[#FAFEFF]/8 pt-6 text-sm text-[#A0A7B5] italic leading-relaxed">
              O custo de continuar sem isso é invisível — é o cliente que te procurou e
              nunca mais voltou.
            </p>
          </div>
        </Reveal>
      </div>

    </div>
  </section>
);
