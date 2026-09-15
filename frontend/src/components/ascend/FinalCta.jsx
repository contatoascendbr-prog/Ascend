import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";
import { trackLead, waLink } from "@/lib/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwiopMU959ILfWinR2ct2cnZmGAhmlWZiXkVqS14g2GJIlymGkRCD8AN5RRffNnS5D8FQ/exec";

export const FinalCta = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Preencha nome e WhatsApp pra continuar.");
      return;
    }
    if (!consent) {
      toast.error("É preciso aceitar o uso dos dados pra continuar.");
      return;
    }
    setSending(true);
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name.trim(), whatsapp: phone.trim() }),
      });
      fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), whatsapp: phone.trim(), consent }),
      }).catch(() => {});
      trackLead("site_form_final");
      toast.success("Enviado com sucesso! Abrindo seu WhatsApp...");
      window.open(
        waLink(
          `Olá! Sou ${name.trim()} e quero receber a proposta do site com IA da Ascend.`,
          "site_form"
        ),
        "_blank",
        "noopener,noreferrer"
      );
      setName("");
      setPhone("");
      setConsent(false);
    } catch {
      toast.error("Não foi possível enviar. Verifique sua conexão e tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      data-testid="final-cta-section"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[480px] bg-gradient-to-t from-[#4B0082]/30 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-[#2AFFF1]/8 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <Chapter num="08" label="Última chamada" testId="chapter-final" />
          <Reveal>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              A diferença entre perder e fechar um cliente é só{" "}
              <span className="text-[#2AFFF1]">quem responde primeiro.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-[#A0A7B5] leading-relaxed max-w-xl">
              Enquanto seu site atual fica esperando alguém digitar, o da Ascend já tá
              respondendo, qualificando e mandando gente pronta pro seu WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 border-l-2 border-[#2AFFF1] pl-4 text-xs sm:text-sm text-[#646D7E] leading-relaxed max-w-xl">
              <span className="text-[#2AFFF1] font-mono-accent font-semibold">PS:</span>{" "}
              todo dia sem um site que atende sozinho é um dia perdendo lead pra quem
              responde mais rápido. O diagnóstico é gratuito e leva menos de 5 minutos no
              WhatsApp — dá pra saber ainda hoje se faz sentido pro seu negócio.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form
            data-testid="final-lead-form"
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#FAFEFF]/10 bg-[#16181D]/90 backdrop-blur-xl p-7 sm:p-9 shadow-[0_0_80px_rgba(75,0,130,0.3)]"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-[#FAFEFF]">
              Receba a proposta no seu WhatsApp
            </h3>
            <p className="mt-2 text-sm text-[#A0A7B5]">
              Sem compromisso. A conversa começa pelo diagnóstico gratuito.
            </p>

            <label className="block mt-7">
              <span className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#A0A7B5]">
                Seu nome
              </span>
              <input
                data-testid="lead-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                className="mt-2 w-full rounded-xl border border-[#FAFEFF]/10 bg-[#111214] px-4 py-3.5 text-sm text-[#FAFEFF] placeholder:text-[#646D7E] outline-none transition-colors duration-300 focus:border-[#2AFFF1]/60"
              />
            </label>

            <label className="block mt-5">
              <span className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#A0A7B5]">
                Seu WhatsApp
              </span>
              <input
                data-testid="lead-whatsapp-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(51) 9 9999-9999"
                className="mt-2 w-full rounded-xl border border-[#FAFEFF]/10 bg-[#111214] px-4 py-3.5 text-sm text-[#FAFEFF] placeholder:text-[#646D7E] outline-none transition-colors duration-300 focus:border-[#2AFFF1]/60"
              />
            </label>

            <label className="mt-5 flex items-start gap-3 cursor-pointer">
              <input
                data-testid="lead-consent-checkbox"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#2AFFF1]"
              />
              <span className="text-xs text-[#A0A7B5] leading-relaxed">
                Autorizo a Ascend Digital a usar meus dados pra me contatar sobre a
                proposta, conforme a{" "}
                <button
                  type="button"
                  data-testid="form-privacy-link"
                  onClick={() => window.dispatchEvent(new CustomEvent("ascend:open-privacy"))}
                  className="text-[#2AFFF1] underline underline-offset-2 hover:text-[#00E5D4]"
                >
                  Política de Privacidade
                </button>{" "}
                (LGPD).
              </span>
            </label>

            <button
              data-testid="final-cta-submit"
              type="submit"
              disabled={sending}
              className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2AFFF1] px-7 py-4 text-sm sm:text-base font-semibold text-[#111214] transition-all duration-300 hover:bg-[#00E5D4] shadow-[0_0_32px_rgba(42,255,241,0.35)] hover:shadow-[0_0_48px_rgba(42,255,241,0.55)] disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Receber Proposta no WhatsApp"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
