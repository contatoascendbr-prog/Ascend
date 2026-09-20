# Como fazer o assistente de IA funcionar no Netlify

O Netlify hospeda só o frontend (a página). O assistente de IA precisa do backend
(pasta `backend/`) rodando em algum servidor. Este guia usa o Render (plano gratuito).

## Passo 1 — Banco de dados (MongoDB Atlas, gratuito)

1. Crie uma conta em https://www.mongodb.com/atlas
2. Crie um cluster gratuito (M0)
3. Em "Database Access", crie um usuário com senha
4. Em "Network Access", libere acesso de qualquer IP (0.0.0.0/0)
5. Em "Connect > Drivers", copie a connection string, ex.:
   `mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/`

## Passo 2 — Backend no Render (gratuito)

1. Crie uma conta em https://render.com e conecte seu GitHub
2. New > Web Service > escolha este repositório
3. O Render detecta o `render.yaml` automaticamente. Se não detectar, configure:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Em Environment, adicione as variáveis:
   - `MONGO_URL` = connection string do passo 1
   - `DB_NAME` = `ascend_digital`
   - `CORS_ORIGINS` = a URL do seu site no Netlify (ex.: `https://seusite.netlify.app`)
   - `EMERGENT_LLM_KEY` = o valor que está no arquivo `backend/.env` deste projeto
5. Deploy. Ao final, o Render te dá uma URL, ex.: `https://ascend-backend.onrender.com`
6. Teste no navegador: `https://ascend-backend.onrender.com/api/` deve responder
   `{"message":"Ascend Digital API"}`

## Passo 3 — Ligar o frontend do Netlify ao backend

1. No Netlify: Site configuration > Environment variables
2. Adicione: `REACT_APP_BACKEND_URL` = `https://ascend-backend.onrender.com`
   (sem barra no final)
3. Em Deploys, clique em "Trigger deploy > Clear cache and deploy site"
   (a variável precisa estar presente no build)

Pronto: o assistente passa a funcionar no seu domínio do Netlify.

## Observações

- Plano gratuito do Render "dorme" após 15 min sem uso: a primeira mensagem do chat
  depois de parado pode demorar ~40s pra acordar. Depois disso, responde na hora.
- O formulário de lead continua indo pro seu Google Sheets normalmente; a cópia de
  segurança passa a ser salva no MongoDB Atlas.
- Alternativa sem nada disso: o botão "Publish" dentro da Emergent sobe frontend +
  backend + banco juntos, já configurados.
