# PRD — Ascend Digital Landing Page

## Problem statement (original)
Landing page single-page para a Ascend Digital (Web Design & Automação com IA) com objetivo de converter visitante em lead qualificado no WhatsApp. Sem e-commerce/checkout. Assistente de IA em widget de chat que esclarece dúvidas usando a copy da LP como base, sem vender, e redireciona pro WhatsApp com `?utm_source=site_chat`. Paleta obrigatória: #111214 (fundo), #FAFEFF (texto), #2AFFF1 (ciano — CTAs/destaque), #4B0082 (roxo — gradientes/detalhes). Logo "A" com seta (versões clara/escura fornecidas). Copy literal do arquivo copy-lp-ascend.md. Mobile-first. LGPD (checkbox de consentimento + política de privacidade). Tracking: Pixel da Meta + GA4 com evento Lead em todo CTA. Direção estética elevada: kinetic hero com reveal mascarado linha a linha, capítulos numerados, marquee editorial, framer-motion + lenis, momento de parallax.

## Decisões do usuário
- Copy: enviada pelo usuário (copy-lp-ascend.md), usada literalmente
- WhatsApp: +55 51 9331-9115 → wa.me/555193319115
- Chat: IA real via Chave Universal Emergent (gpt-5.4, streaming SSE)
- Pixel da Meta + GA4: estrutura pronta; IDs ficam em branco no .env até o usuário preencher (REACT_APP_META_PIXEL_ID, REACT_APP_GA4_ID)
- Design: screenshot de referência aprovado pelo usuário ("Assim tá legal")

## Arquitetura
- Frontend: React + Tailwind + framer-motion + lenis; seções em /app/frontend/src/components/ascend/; config central em src/lib/site.js (número WhatsApp, links wa.me, tracking)
- Backend: FastAPI /api/chat (SSE streaming, sessões em memória + histórico persistido em MongoDB chat_messages), /api/leads (formulário final com consentimento LGPD → coleção leads)
- MongoDB: coleções leads, chat_messages

## Personas
- Dono de negócio local (academia, clínica, serviços) que perde lead por demora de resposta
- Visitante mobile (80%+ do tráfego) vindo de anúncio

## Requisitos atendidos (13/09/2026)
- Hero com headline cinética (reveal mascarado), subheadline, 2 CTAs, stats
- Seções numeradas 01–08: dor, statement, solução, benefícios, prova social (case Grip Fight com mockup de chat), oferta (4 passos + inclusos + investimento/pagamento), objeções, garantia 7 dias, agenda limitada, FAQ accordion, CTA final + PS
- Chat widget fixo (canto inferior direito) com IA real, streaming palavra a palavra, indicador de digitando, chips de perguntas, botão "Continuar no WhatsApp" (wa.me?utm_source=site_chat)
- CTAs WhatsApp em 5 pontos (navbar, hero, oferta, formulário final, rodapé) com trackLead
- Formulário final com checkbox LGPD + modal de Política de Privacidade
- Marquee editorial, scroll suave Lenis, parallax no glow do hero, micro-interações
- Tracking: initTracking() lê REACT_APP_META_PIXEL_ID / REACT_APP_GA4_ID; evento Lead em todos os CTAs e no chat

## Verificado
- curl /api/, /api/leads, /api/chat (streaming OK, resposta correta sobre prazo)
- Navegador: hero, chat (pergunta → resposta IA → handoff WhatsApp), oferta, formulário, mobile 390px

## Iteração 13/09/2026 (edições visuais do usuário)
- Hero centralizada
- Labels de capítulo numerado (01–08) removidos globalmente
- Prova social: "+2 Anos elevando a presença digital de empresas que buscam evoluir"; label "Case"
- Objeções: título "Ainda tem dúvidas?"; garantia em dobra própria, agenda limitada abaixo, CTA WhatsApp movido da oferta para essa dobra
- FAQ não é mais accordion: clicar na pergunta abre o Assistente Ascend e envia a pergunta pra ele responder ao vivo (evento ascend:ask)

## Iteração 15/09/2026 (integração Google Sheets)
- Formulário final agora envia POST JSON {nome, whatsapp} para o Google Apps Script do usuário
- CORS: Apps Script não aceita preflight cross-origin; usado fetch com mode "no-cors" (padrão da indústria pra Apps Script). Sucesso é otimista (resposta opaca); erro de rede ainda mostra mensagem e permite retry. Cópia de backup segue salva em /api/leads (MongoDB)

## Backlog
- P0: usuário preencher REACT_APP_META_PIXEL_ID e REACT_APP_GA4_ID no frontend/.env
- P1: screenshot real do site da Grip Fight (hoje usa foto de treino + mockup de chat ilustrativo)
- P1: depoimentos com nome/resultado quando houver dados reais
- P2: página de obrigado pós-formulário com Pixel replicado
- P2: histórico do chat restaurado ao reabrir (hoje reinicia por sessão de página)
