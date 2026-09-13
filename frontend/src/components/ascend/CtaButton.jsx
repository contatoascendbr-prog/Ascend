import { ArrowRight } from "lucide-react";
import { trackLead, waLink } from "@/lib/site";

export const WhatsAppCta = ({ message, source, testId, children, className = "" }) => (
  <a
    data-testid={testId}
    href={waLink(message, source)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackLead(source)}
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#2AFFF1] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#111214] transition-colors duration-300 hover:bg-[#00E5D4] shadow-[0_0_32px_rgba(42,255,241,0.35)] hover:shadow-[0_0_48px_rgba(42,255,241,0.55)] ${className}`}
  >
    {children}
    <ArrowRight className="w-4 h-4" />
  </a>
);
