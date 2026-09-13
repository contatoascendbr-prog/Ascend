export const WHATSAPP_NUMBER = "555193319115";

export const LOGO_DARK_BG =
  "https://customer-assets-39nsmqrw.emergentagent.net/job_2ed988dd-b4c8-46d8-a3b4-0444daac6470/artifacts/j813xki7_Logo-branca.png";
export const LOGO_LIGHT_BG =
  "https://customer-assets-39nsmqrw.emergentagent.net/job_2ed988dd-b4c8-46d8-a3b4-0444daac6470/artifacts/oudg5f31_Logo.png";

export const waLink = (message, utmSource = "site") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}&utm_source=${utmSource}`;

export const WA_MESSAGES = {
  hero: "Olá! Quero um diagnóstico gratuito do site com IA da Ascend pro meu negócio.",
  offer: "Olá! Quero garantir uma das vagas deste mês pro site com IA da Ascend.",
  proof: "Olá! Vi o case da Grip Fight e quero um site com IA assim pro meu negócio.",
  final: "Olá! Quero falar com o time da Ascend agora sobre o site com IA.",
  chat: "Olá! Conversei com o assistente de IA no site da Ascend e quero continuar o atendimento.",
};

export function initTracking() {
  const pixelId = process.env.REACT_APP_META_PIXEL_ID;
  const gaId = process.env.REACT_APP_GA4_ID;

  if (pixelId) {
    const f = window;
    if (!f.fbq) {
      const n = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      n.queue = [];
      n.version = "2.0";
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(t);
    }
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }

  if (gaId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }
}

export function trackLead(source) {
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: source });
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "Lead", { event_category: "engagement", event_label: source });
  }
}
