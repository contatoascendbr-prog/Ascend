import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { LOGO_DARK_BG, trackLead, waLink, WA_MESSAGES } from "@/lib/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GREETING =
  "Oi! Sou o assistente da Ascend. Posso te explicar como funciona o site com IA, prazos, pagamento — o que estiver no caminho. O que você quer saber?";

const CHIPS = ["Quanto tempo leva?", "Quanto custa?", "Serve pro meu negócio?"];

const TypingDots = () => (
  <div data-testid="chat-typing-indicator" className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-[#2AFFF1]" />
    ))}
  </div>
);

const linkify = (text, isUser) =>
  text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLead("site_chat_link")}
        className={`font-semibold underline underline-offset-2 ${
          isUser ? "text-[#111214]" : "text-[#2AFFF1] hover:text-[#00E5D4]"
        }`}
      >
        {part.includes("wa.me") ? "Falar no WhatsApp" : part}
      </a>
    ) : (
      part
    )
  );

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const sessionRef = useRef(null);
  const scrollRef = useRef(null);
  const openedOnceRef = useRef(false);

  if (!sessionRef.current && typeof window !== "undefined") {
    sessionRef.current =
      localStorage.getItem("ascend_chat_session") ||
      (() => {
        const id = crypto.randomUUID();
        localStorage.setItem("ascend_chat_session", id);
        return id;
      })();
  }

  const openChat = () => {
    setOpen(true);
    if (!openedOnceRef.current) {
      openedOnceRef.current = true;
      trackLead("site_chat");
      setMessages([{ role: "assistant", content: GREETING }]);
    }
  };

  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener("ascend:open-chat", handler);
    return () => window.removeEventListener("ascend:open-chat", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const question = e.detail?.question;
      openChat();
      if (question) {
        window.setTimeout(() => send(question), 100);
      }
    };
    window.addEventListener("ascend:ask", handler);
    return () => window.removeEventListener("ascend:ask", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const send = async (text) => {
    const clean = text.trim();
    if (!clean || streaming) return;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: clean },
      { role: "assistant", content: "" },
    ]);
    setStreaming(true);

    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionRef.current, message: clean }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const { delta } = JSON.parse(payload);
            if (delta) {
              setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                next[next.length - 1] = { ...last, content: last.content + delta };
                return next;
              });
            }
          } catch {
            /* partial chunk */
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content:
            "Tive uma instabilidade aqui do meu lado. Me chama no WhatsApp que a gente resolve na hora.",
        };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  const lastIsAssistant =
    messages.length > 0 && messages[messages.length - 1].role === "assistant";

  return (
    <>
      <motion.button
        data-testid="chat-widget-button"
        onClick={() => (open ? setOpen(false) : openChat())}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#2AFFF1] flex items-center justify-center shadow-[0_0_36px_rgba(42,255,241,0.45)] transition-transform duration-300 hover:scale-110"
        aria-label="Abrir assistente de IA"
      >
        {open ? (
          <X className="w-6 h-6 text-[#111214]" />
        ) : (
          <img src={LOGO_DARK_BG} alt="" className="w-8 h-8 object-contain invert" />
        )}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2AFFF1] opacity-70" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#2AFFF1] border-2 border-[#111214]" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[5.5rem] right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[#FAFEFF]/10 bg-[#16181D] shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
            style={{ height: "min(560px, calc(100vh - 8rem))" }}
          >
            <div className="flex items-center gap-3 border-b border-[#FAFEFF]/8 bg-[#111214] px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#2AFFF1]/10 border border-[#2AFFF1]/30 flex items-center justify-center">
                <img
                  src={LOGO_DARK_BG}
                  alt=""
                  className="w-6 h-6 object-contain mix-blend-screen"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#FAFEFF]">Assistente Ascend</p>
                <p className="flex items-center gap-1.5 text-[11px] text-[#2AFFF1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2AFFF1]" />
                  online agora
                </p>
              </div>
              <button
                data-testid="chat-close-button"
                onClick={() => setOpen(false)}
                className="text-[#646D7E] hover:text-[#FAFEFF] transition-colors"
                aria-label="Fechar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              data-testid="chat-messages"
              className="chat-scroll flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "rounded-br-sm bg-[#2AFFF1] text-[#111214] font-medium"
                        : "rounded-bl-sm bg-[#23262e] text-[#FAFEFF]"
                    }`}
                  >
                    {linkify(m.content, m.role === "user")}
                  </div>
                </div>
              ))}
              {streaming && messages[messages.length - 1]?.content === "" && <TypingDots />}

              {!streaming && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      data-testid={`chat-chip-${chip}`}
                      onClick={() => send(chip)}
                      className="rounded-full border border-[#2AFFF1]/40 px-3.5 py-1.5 text-xs text-[#2AFFF1] transition-colors duration-300 hover:bg-[#2AFFF1] hover:text-[#111214]"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {!streaming && lastIsAssistant && messages.length > 1 && (
                <a
                  data-testid="chat-whatsapp-handoff"
                  href={waLink(WA_MESSAGES.chat, "site_chat")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead("site_chat_handoff")}
                  className="inline-flex items-center gap-2 rounded-full border border-[#2AFFF1]/50 px-4 py-2 text-xs font-semibold text-[#2AFFF1] transition-all duration-300 hover:bg-[#2AFFF1] hover:text-[#111214]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Continuar no WhatsApp
                </a>
              )}
            </div>

            <form
              data-testid="chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[#FAFEFF]/8 bg-[#111214] px-3 py-3"
            >
              <input
                data-testid="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre o serviço..."
                className="flex-1 rounded-full border border-[#FAFEFF]/10 bg-[#16181D] px-4 py-2.5 text-sm text-[#FAFEFF] placeholder:text-[#646D7E] outline-none focus:border-[#2AFFF1]/60 transition-colors"
              />
              <button
                data-testid="chat-send-button"
                type="submit"
                disabled={streaming || !input.trim()}
                className="w-10 h-10 rounded-full bg-[#2AFFF1] flex items-center justify-center transition-transform duration-300 hover:scale-105 disabled:opacity-40"
                aria-label="Enviar mensagem"
              >
                <Send className="w-4 h-4 text-[#111214]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
