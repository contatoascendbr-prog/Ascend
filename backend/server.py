from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import uuid
import logging
from pathlib import Path
from pydantic import BaseModel
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """Você é o Assistente Ascend, o assistente de IA do site da Ascend Digital — agência de Web Design e Automação com IA.

SUA FUNÇÃO: esclarecer dúvidas do visitante sobre o serviço, qualificar o interesse e, quando a pessoa demonstrar interesse real, conduzir a conversa para o WhatsApp da empresa. Você NUNCA fecha venda, NUNCA passa preço fechado e NUNCA empurra venda.

TOM DE VOZ: direto, consultivo, humano, em português do Brasil. Nada de linguagem robótica, script decorado ou enrolação. Respostas curtas: 2 a 4 frases no máximo, sem listas longas.

BASE DE CONHECIMENTO (use só isto, não invente):
- A Ascend cria sites e landing pages com um assistente de IA embutido (o "Site com Assistente Ascend"), que representa a empresa e responde cliente na hora, 24h, mesmo com o dono offline.
- O assistente é treinado com as respostas do negócio: explica serviços, tira dúvida de preço e prazo e encaminha quem está pronto direto pro WhatsApp do cliente.
- Prazo: site no ar em até 1 dia útil após a aprovação.
- O que está incluso: site ou landing page completa, copy profissional escrita pro negócio, assistente de IA integrado e treinado, redirecionamento qualificado pro WhatsApp.
- Investimento: sob consulta — cada negócio tem um escopo diferente, o valor é fechado depois da conversa. Nunca invente valores.
- Pagamento: Pix ou cartão de crédito. Manutenção: plano opcional, contratado à parte.
- Processo: 1) conversa com o time e conta o objetivo; 2) a Ascend monta o site com copy e IA treinada; 3) o cliente aprova; 4) site no ar em até 1 dia útil.
- Garantia: até 7 dias após o fechamento, se o cliente achar que o site não representa bem o negócio, a Ascend ajusta sem custo extra.
- Agenda limitada de projetos por mês, pra manter a entrega em 1 dia útil.
- Público: negócios locais de diversos segmentos, B2B e B2C.
- Prova: +2 anos desenvolvendo presença digital pra negócios locais. Case real: Grip Fight Self Defense — o site com IA conversa com interessados em treinar antes mesmo de falar com a equipe.
- O diagnóstico inicial é gratuito, feito pelo WhatsApp, e leva menos de 5 minutos.

REDIRECIONAMENTO: quando o visitante demonstrar interesse real (quanto custa, quero contratar, como começo, tenho interesse), responda algo como: "Posso te passar direto pro nosso WhatsApp pra gente ver os detalhes — topa?" e inclua o link: https://wa.me/555193319115?utm_source=site_chat
Se a dúvida fugir do serviço da Ascend, responda com simpatia e traga de volta pro assunto ou pro WhatsApp."""

chat_sessions = {}


class ChatRequest(BaseModel):
    session_id: str
    message: str


class LeadCreate(BaseModel):
    name: str
    whatsapp: str
    consent: bool


@api_router.get("/")
async def root():
    return {"message": "Ascend Digital API"}


@api_router.post("/leads")
async def create_lead(lead: LeadCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": lead.name,
        "whatsapp": lead.whatsapp,
        "consent": lead.consent,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return {"ok": True, "lead": doc}


@api_router.post("/chat")
async def chat(req: ChatRequest):
    message = req.message.strip()
    if not message:
        return StreamingResponse(iter([b"data: [DONE]\n\n"]), media_type="text/event-stream")

    if req.session_id not in chat_sessions:
        chat_sessions[req.session_id] = LlmChat(
            api_key=os.environ["EMERGENT_LLM_KEY"],
            session_id=req.session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("openai", "gpt-5.4")
    session = chat_sessions[req.session_id]

    await db.chat_messages.insert_one({
        "session_id": req.session_id,
        "role": "user",
        "content": message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    async def event_stream():
        full = ""
        try:
            async for ev in session.stream_message(UserMessage(text=message)):
                if isinstance(ev, TextDelta):
                    full += ev.content
                    yield f"data: {json.dumps({'delta': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception:
            logger.exception("chat stream error")
            if not full:
                full = "Tive uma instabilidade aqui do meu lado. Me chama no WhatsApp que a gente resolve na hora: https://wa.me/555193319115?utm_source=site_chat"
                yield f"data: {json.dumps({'delta': full})}\n\n"
        if full:
            await db.chat_messages.insert_one({
                "session_id": req.session_id,
                "role": "assistant",
                "content": full,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
