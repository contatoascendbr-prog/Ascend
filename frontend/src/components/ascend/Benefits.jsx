import { Clock, Zap, Bot, MessageCircle, PenLine, Wrench } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";

const BENEFITS = [
  {
    icon: Clock,
    title: "Atendimento 24h",
    text: "você não perde mais cliente que chegou fora do horário comercial",
  },
  {
    icon: Zap,
    title: "Site pronto em 1 dia",
    text: "você começa a captar lead essa semana, não mês que vem",
  },
  {
    icon: Bot,
    title: "IA treinada no seu negócio",
    text: "o visitante recebe resposta certeira, não um chatbot genérico",
  },
  {
    icon: MessageCircle,
    title: "Lead qualificado direto no seu WhatsApp",
    text: "você só entra na conversa quando já faz sentido fechar",
  },
  {
    icon: PenLine,
    title: "Copy profissional inclusa",
    text: "seu site fala a língua de quem compra, não texto de template",
  },
  {
    icon: Wrench,
    title: "Manutenção opcional",
    text: "você decide se quer o time cuidando disso ou tocar sozinho",
  },
];

export const Benefits = () => (
  <section
    id="beneficios"
    data-testid="benefits-section"
    className="py-20 lg:py-28 bg-[#16181D]/40"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Chapter num="03" label="Benefícios" testId="chapter-benefits" />
      <Reveal>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          Não é um site novo. É{" "}
          <span className="text-[#2AFFF1]">outro ritmo de atendimento.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BENEFITS.map((b, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div
              data-testid={`benefit-card-${i}`}
              className="group h-full rounded-2xl border border-[#FAFEFF]/8 bg-[#111214] p-7 transition-all duration-300 hover:border-[#2AFFF1]/40 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-[#2AFFF1]/10 border border-[#2AFFF1]/25 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <b.icon className="w-5 h-5 text-[#2AFFF1]" />
              </div>
              <h3 className="text-lg font-semibold text-[#FAFEFF]">{b.title}</h3>
              <p className="mt-2 text-sm text-[#A0A7B5] leading-relaxed">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
