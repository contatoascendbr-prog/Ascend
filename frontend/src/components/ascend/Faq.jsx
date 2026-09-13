import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal, Chapter } from "./Reveal";

const FAQS = [
  {
    q: "Quanto tempo leva pra ficar pronto?",
    a: "O site fica no ar em até 1 dia útil depois da aprovação.",
  },
  {
    q: "Serve pro meu tipo de negócio?",
    a: "Atendemos negócios locais de diversos segmentos, B2B e B2C. No diagnóstico pelo WhatsApp a gente já te diz se faz sentido.",
  },
  {
    q: "A IA realmente entende as perguntas dos clientes?",
    a: "Sim. Ela é treinada com as informações do seu negócio antes de entrar no ar, então responde no seu contexto real.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Você tem 7 dias após o fechamento pra pedir ajustes sem custo extra. A ideia é você sair satisfeito, não só com o site no ar.",
  },
  {
    q: "Preciso saber mexer em site?",
    a: "Não. A Ascend entrega pronto pra rodar, e o plano de manutenção opcional cuida de ajustes futuros.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Pix e cartão de crédito.",
  },
];

export const Faq = () => (
  <section id="faq" data-testid="faq-section" className="py-20 lg:py-28">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Chapter num="07" label="Dúvidas" testId="chapter-faq" />
      <Reveal>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          O que todo mundo <span className="text-[#2AFFF1]">pergunta antes de fechar</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-[#FAFEFF]/8"
            >
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="py-5 text-base sm:text-lg font-semibold text-[#FAFEFF] hover:text-[#2AFFF1] hover:no-underline transition-colors duration-300"
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent
                data-testid={`faq-content-${i}`}
                className="text-sm sm:text-base text-[#A0A7B5] leading-relaxed"
              >
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
