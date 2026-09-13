import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "./Logo";
import { trackLead, waLink, WA_MESSAGES } from "@/lib/site";

export const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const open = () => setPrivacyOpen(true);
    window.addEventListener("ascend:open-privacy", open);
    return () => window.removeEventListener("ascend:open-privacy", open);
  }, []);

  return (
    <footer
      data-testid="footer"
      className="border-t border-[#FAFEFF]/8 bg-[#0d0e10] py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <Logo />
          <p className="mt-4 text-xs text-[#646D7E] max-w-xs leading-relaxed">
            Sites e landing pages com assistente de IA embutido que atende seu cliente na
            hora e manda lead qualificado pro seu WhatsApp.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a
            data-testid="footer-whatsapp-link"
            href={waLink(WA_MESSAGES.final, "site_footer")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLead("site_footer")}
            className="text-[#A0A7B5] hover:text-[#2AFFF1] transition-colors duration-300"
          >
            WhatsApp: (51) 93331-9115
          </a>
          <button
            data-testid="footer-privacy-link"
            onClick={() => setPrivacyOpen(true)}
            className="text-left text-[#A0A7B5] hover:text-[#2AFFF1] transition-colors duration-300"
          >
            Política de Privacidade
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-[#FAFEFF]/5">
        <p className="text-[11px] text-[#646D7E]">
          © {new Date().getFullYear()} Ascend Digital — Web Design & Automação IA. Todos os
          direitos reservados.
        </p>
      </div>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent
          data-testid="privacy-modal"
          className="max-h-[80vh] overflow-y-auto bg-[#16181D] text-[#FAFEFF] border-[#FAFEFF]/10 sm:max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle className="text-[#FAFEFF]">Política de Privacidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-[#A0A7B5] leading-relaxed">
            <p>
              A Ascend Digital trata seus dados pessoais em conformidade com a Lei Geral de
              Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
            <p>
              <strong className="text-[#FAFEFF]">Dados coletados:</strong> nome e número de
              WhatsApp informados por você no formulário, além das mensagens trocadas com o
              assistente de IA do site.
            </p>
            <p>
              <strong className="text-[#FAFEFF]">Finalidade:</strong> usar esses dados
              exclusivamente pra entrar em contato sobre a proposta solicitada e dar
              continuidade ao atendimento iniciado por você.
            </p>
            <p>
              <strong className="text-[#FAFEFF]">Compartilhamento:</strong> não vendemos nem
              compartilhamos seus dados com terceiros pra fins de marketing.
            </p>
            <p>
              <strong className="text-[#FAFEFF]">Cookies e tracking:</strong> este site pode
              usar Pixel da Meta e Google Analytics pra medir a eficácia das páginas e
              campanhas, sempre de forma anonimizada.
            </p>
            <p>
              <strong className="text-[#FAFEFF]">Seus direitos:</strong> você pode solicitar
              acesso, correção ou exclusão dos seus dados a qualquer momento pelo WhatsApp
              (51) 93331-9115.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};
