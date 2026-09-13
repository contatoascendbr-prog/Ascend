import { ShieldCheck, CalendarClock } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";
import { WhatsAppCta } from "./CtaButton";
import { WA_MESSAGES } from "@/lib/site";

const OBJECTIONS = [
  {
    q: "Mas eu não tenho orçamento agora...",
    a: "Por isso o primeiro passo é conversar, não pagar. A gente entende seu momento e desenha uma proposta que cabe na sua realidade — sem compromisso nenhum nessa etapa.",
  },
  {
    q: "Mas eu não sei se isso vai se pagar...",
    a: "Faz sentido pensar assim. Por isso o site é focado em uma coisa: transformar visita em lead qualificado no seu WhatsApp. Se hoje você perde cliente por demora, esse é justamente o buraco que ele tapa.",
  },
  {
    q: "Mas eu não tô interessado agora...",
    a: "Sem problema. Fica o convite pra falar com o time quando fizer sentido — o diagnóstico é gratuito e não custa nada dar uma olhada no que mudaria pro seu negócio.",
  },
];

export const Objections = () => (
  <section data-testid="objections-section" className="py-20 lg:py-28 bg-[#16181D]/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Chapter num="06" label="Sem risco" testId="chapter-objections" />
      <Reveal>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          Ainda tem <span className="text-[#2AFFF1]">dúvidas?</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {OBJECTIONS.map((o, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div
              data-testid={`objection-card-${i}`}
              className="h-full rounded-2xl border border-[#FAFEFF]/8 bg-[#111214] p-7 transition-colors duration-300 hover:border-[#2AFFF1]/30"
            >
              <p className="text-base sm:text-lg font-semibold text-[#FAFEFF] italic">
                “{o.q}”
              </p>
              <p className="mt-4 text-sm text-[#A0A7B5] leading-relaxed">{o.a}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 max-w-4xl space-y-5">
        <Reveal>
          <div
            data-testid="guarantee-card"
            className="rounded-2xl border border-[#2AFFF1]/25 bg-gradient-to-br from-[#2AFFF1]/8 to-transparent p-7 sm:p-9"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-7 h-7 text-[#2AFFF1]" />
              <h3 className="text-xl font-semibold text-[#FAFEFF]">Garantia de 7 dias</h3>
            </div>
            <p className="text-sm sm:text-base text-[#A0A7B5] leading-relaxed">
              Se em até 7 dias após o fechamento você achar que o site não representa bem
              seu negócio, a Ascend ajusta o que for necessário sem custo extra.{" "}
              <span className="text-[#FAFEFF] font-medium">O risco é nosso, não seu.</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            data-testid="urgency-card"
            className="rounded-2xl border border-[#4B0082]/50 bg-gradient-to-br from-[#4B0082]/30 to-transparent p-7 sm:p-9"
          >
            <div className="flex items-center gap-3 mb-4">
              <CalendarClock className="w-7 h-7 text-[#2AFFF1]" />
              <h3 className="text-xl font-semibold text-[#FAFEFF]">Agenda limitada</h3>
            </div>
            <p className="text-sm sm:text-base text-[#A0A7B5] leading-relaxed">
              Pra manter a entrega em 1 dia útil, a Ascend trabalha com agenda limitada de
              projetos por mês. Fechou, entra na fila de produção — passou disso, só na
              próxima abertura.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-12 flex justify-center">
          <WhatsAppCta
            message={WA_MESSAGES.offer}
            source="site_garantia"
            testId="assurance-cta-whatsapp"
          >
            Quero Meu Site com IA
          </WhatsAppCta>
        </div>
      </Reveal>
    </div>
  </section>
);
