const ITEMS = [
  "Atendimento 24h",
  "Site com IA",
  "Lead direto no WhatsApp",
  "Copy profissional",
  "Pronto em 1 dia",
  "Web Design",
  "Automação com IA",
];

export const Marquee = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="marquee"
      className="relative overflow-hidden border-y border-[#FAFEFF]/8 bg-[#16181D]/60 py-4"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-mono-accent text-xs sm:text-sm tracking-[0.25em] uppercase text-[#A0A7B5]">
              {item}
            </span>
            <span className="text-[#2AFFF1]/50 text-xs">//</span>
          </span>
        ))}
      </div>
    </div>
  );
};
