import { Reveal } from "./Reveal";

export const Statement = () => (
  <section data-testid="statement-section" className="py-16 lg:py-24">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.25]">
          Todo negócio local perde venda do mesmo jeito: cliente manda mensagem, ninguém
          responde na hora,{" "}
          <span className="text-[#2AFFF1]">e ele já foi pro concorrente.</span>
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-10 max-w-2xl space-y-4 text-base sm:text-lg text-[#A0A7B5] leading-relaxed">
          <p>Não é falta de cliente interessado. É falta de resposta rápida.</p>
          <p>
            A Ascend resolve isso com um site que não só existe — ele atende. Um assistente
            de IA treinado com as respostas da sua empresa conversa com quem visita, tira
            dúvida e já direciona pro WhatsApp.
          </p>
          <p className="text-[#FAFEFF] font-medium">
            Site pronto, com copy profissional e um vendedor digital funcionando desde o
            primeiro dia.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);
