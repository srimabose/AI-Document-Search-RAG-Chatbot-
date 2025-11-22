# AI Document Search (RAG Chatbot)

A powerful RAG (Retrieval-Augmented Generation) chatbot that lets you chat with your PDF documents using semantic search and AI.

## 🚀 Features

- **Semantic Search** - Find relevant information using sentence embeddings
- **AI-Powered Q&A** - Get intelligent answers from your documents
- **Source Citations** - See exact page numbers for answers
- **100% Free** - No API costs, uses open-source models
- **Easy Deployment** - One-click deploy to Render

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + Python
- **AI Models**: 
  - Sentence Transformers (embeddings)
  - Google FLAN-T5 (question answering)
- **Vector Search**: FAISS with cosine similarity
- **Deployment**: Render (recommended)

## 📦 Quick Start

### Local Development

#### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo "HUGGINGFACE_TOKEN=your_token_here" > .env

# Start server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start dev server
npm run dev
```

#### Using Batch Scripts (Windows)
```bash
# Start both servers at once
start-app.bat

# Or start individually
start-backend.bat
start-frontend.bat
```

### Docker Deployment

```bash
# Create .env file in root
echo "HUGGINGFACE_TOKEN=your_token_here" > .env

# Start with Docker Compose
docker-compose up --build
```

Access the app at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🌐 Deploy to Render

### One-Click Deployment

1. Click the "Deploy to Render" button above
2. Connect your GitHub account
3. Add your `HUGGINGFACE_TOKEN` environment variable
4. Click "Apply" and wait for deployment

### Manual Deployment

See detailed instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Steps:**
1. Fork/clone this repository
2. Create a [Render account](https://render.com)
3. Create new Blueprint from your repo
4. Add `HUGGINGFACE_TOKEN` environment variable
5. Deploy!

**Deployment Time:**
- Backend: ~10-15 minutes (installing ML libraries)
- Frontend: ~2-3 minutes

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
HUGGINGFACE_TOKEN=your_huggingface_token_here
```

Get your token from [HuggingFace](https://huggingface.co/settings/tokens)

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

For production, set this to your deployed backend URL.

## 📖 Usage

1. **Upload a PDF**
   - Click "Choose File" and select a PDF document
   - Click "Upload" and wait for processing

2. **Ask Questions**
   - Type your question in the chat input
   - Get AI-generated answers with source citations
   - See which pages the information came from

3. **Clear Documents**
   - Use the API endpoint `/clear` to remove all documents

## 🏗️ Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application
│   ├── rag_engine.py        # RAG logic and AI models
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile          # Backend container
│   └── .env.example        # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Node dependencies
│   ├── Dockerfile          # Frontend container
│   └── .env.example        # Environment template
├── docker-compose.yml      # Docker orchestration
├── render.yaml            # Render deployment config
├── DEPLOYMENT.md          # Detailed deployment guide
└── README.md              # This file
```

## 🔧 API Endpoints

- `GET /` - Health check
- `POST /upload` - Upload PDF file
- `POST /query` - Query documents
- `DELETE /clear` - Clear all documents
- `GET /docs` - Interactive API documentation

## 🐛 Troubleshooting

### Backend won't start
- Verify Python 3.11+ is installed
- Check `HUGGINGFACE_TOKEN` is set correctly
- Ensure all dependencies are installed: `pip install -r requirements.txt`

### Frontend can't connect to backend
- Verify `VITE_API_URL` points to correct backend URL
- Check backend is running and accessible
- Ensure CORS is enabled (already configured)

### Upload fails
- Check file is a valid PDF
- Verify backend has write permissions
- Check backend logs for errors

### Slow responses
- First request after deployment may be slow (model loading)
- Free tier on Render spins down after inactivity
- Consider upgrading to paid tier for production

## 📝 Development

### Adding New Features

1. **Backend**: Edit `backend/main.py` or `backend/rag_engine.py`
2. **Frontend**: Edit components in `frontend/src/components/`
3. **Test locally** before deploying
4. **Push to GitHub** - Render auto-deploys

### Running Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [HuggingFace](https://huggingface.co) - AI models
- [FastAPI](https://fastapi.tiangolo.com) - Backend framework
- [React](https://react.dev) - Frontend framework
- [Render](https://render.com) - Hosting platform

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Review API docs at `/docs` endpoint

## 🚀 Live Demo

After deployment, your app will be available at:
- Frontend: `https://your-app.onrender.com`
- Backend: `https://your-api.onrender.com`
- API Docs: `https://your-api.onrender.com/docs`

---

**Built with ❤️ using open-source AI models**
