import { Reveal, Chapter } from "./Reveal";

const CASE_IMG =
  "https://images.unsplash.com/photo-1656653121475-e33829581294?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMHNlbGYlMjBkZWZlbnNlJTIwdHJhaW5pbmd8ZW58MHx8fHwxNzg5MzEzNzc0fDA&ixlib=rb-4.1.0&q=85";

export const Proof = () => (
  <section id="case" data-testid="proof-section" className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Chapter num="04" label="Prova real" testId="chapter-proof" />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-[#2AFFF1]">+2 Anos</span> elevando a presença digital
              de empresas que buscam evoluir
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-2xl border-l-2 border-[#2AFFF1] bg-[#16181D] p-6 sm:p-8">
              <p className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#2AFFF1] mb-3">
                Case
              </p>
              <h3 className="text-xl font-semibold text-[#FAFEFF]">Grip Fight Self Defense</h3>
              <p className="mt-3 text-sm sm:text-base text-[#A0A7B5] leading-relaxed">
                A Grip Fight mudou a forma como anuncia a escola depois de implementar o
                site com IA da Ascend — hoje o próprio site conversa com quem tem interesse
                em treinar, antes mesmo de falar com alguém da equipe.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div
            data-testid="case-mockup"
            className="relative rounded-2xl border border-[#FAFEFF]/10 bg-[#16181D] p-2"
          >
            <div className="flex items-center gap-1.5 px-3 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FAFEFF]/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FAFEFF]/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2AFFF1]/60" />
              <span className="ml-2 font-mono-accent text-[10px] text-[#646D7E]">
                gripfight.com.br
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={CASE_IMG}
                alt="Site da Grip Fight Self Defense com Assistente Ascend"
                loading="lazy"
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#FAFEFF]/10 bg-[#111214]/90 backdrop-blur-md p-4 space-y-2.5">
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#2AFFF1] px-3.5 py-2 text-xs text-[#111214] font-medium">
                    Vocês têm aula pra iniciante?
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#23262e] px-3.5 py-2 text-xs text-[#FAFEFF]">
                    Temos sim, turmas de segunda a sábado. Quer que eu te passe os horários
                    pelo WhatsApp?
                  </p>
                </div>
                <p className="font-mono-accent text-[9px] tracking-[0.2em] uppercase text-[#2AFFF1] pt-1">
                  Assistente Ascend respondendo no site da Grip Fight
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
