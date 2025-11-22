# AI Document Search (RAG Chatbot)

Chat with your PDFs using semantic search powered by LLMs.

## Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: FastAPI
- **AI**: Hugging Face Transformers (FLAN-T5, Sentence Transformers)
- **Vector DB**: Local embeddings with cosine similarity
- **Deploy**: Vercel (frontend) + Docker (backend)

## Features
- 100% Free - No API costs, runs locally
- Semantic search using sentence-transformers
- Question answering with Google FLAN-T5
- Source citations with page numbers

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
# Add your HF Token to .env
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create `.env` files in both frontend and backend directories:

**backend/.env**
```
HUGGINGFACE_TOKEN=your_token_here
```

**frontend/.env**
```
VITE_API_URL=http://localhost:8000
```

## Docker
```bash
docker-compose up
```
