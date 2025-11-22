# Local Setup Instructions

## Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- npm or yarn
- Git

## Quick Start (Windows)

The easiest way to run the application locally on Windows:

1. **Clone the repository**
   ```bash
   git clone https://github.com/srimabose/AI-Document-Search-RAG-Chatbot-.git
   cd AI-Document-Search-RAG-Chatbot-
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   copy .env.example .env
   # Edit .env and add your HUGGINGFACE_TOKEN
   
   # Frontend
   cd ../frontend
   copy .env.example .env
   # Edit .env if needed (default: http://localhost:8000)
   ```

3. **Run the application**
   ```bash
   # From project root
   start-app.bat
   ```

This will open two command windows - one for backend, one for frontend.

## Manual Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create environment file**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your HuggingFace token:
   ```
   HUGGINGFACE_TOKEN=your_token_here
   ```
   
   Get your token from: https://huggingface.co/settings/tokens

4. **Start the backend server**
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   Backend will be available at: http://localhost:8000

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   copy .env.example .env
   ```
   
   The default configuration should work:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the frontend server**
   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:3000 (or the port shown in terminal)

## Running with Docker

### Prerequisites
- Docker Desktop installed and running

### Steps

1. **Create environment file**
   ```bash
   # In project root
   echo HUGGINGFACE_TOKEN=your_token_here > .env
   ```

2. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

4. **Stop containers**
   ```bash
   docker-compose down
   ```

## Accessing the Application

Once both servers are running:

1. **Open your browser** and go to http://localhost:3000
2. **Upload a PDF** using the file upload interface
3. **Ask questions** about your document in the chat

## Troubleshooting

### Backend Issues

**"uvicorn is not recognized"**
```bash
# Use Python module syntax instead
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**"No module named 'fastapi'"**
```bash
# Install dependencies
cd backend
pip install -r requirements.txt
```

**"HUGGINGFACE_TOKEN not found"**
- Verify `.env` file exists in `backend/` directory
- Check token is correctly set in `.env`
- Restart the backend server

### Frontend Issues

**"Cannot connect to backend"**
- Verify backend is running at http://localhost:8000
- Check `VITE_API_URL` in `frontend/.env`
- Ensure no firewall is blocking port 8000

**"npm: command not found"**
- Install Node.js from https://nodejs.org
- Restart your terminal after installation

**Port 3000 already in use**
- Vite will automatically use the next available port
- Check terminal output for the actual port number

### Docker Issues

**"docker-compose: command not found"**
- Install Docker Desktop from https://docker.com
- Ensure Docker Desktop is running

**Build fails**
- Check Docker has enough memory (4GB+ recommended)
- Verify `.env` file exists in project root
- Check Docker logs: `docker-compose logs`

### Upload Issues

**"Upload failed"**
- Verify file is a valid PDF
- Check backend logs for errors
- Ensure backend has write permissions

**"No documents loaded"**
- Upload a PDF first before asking questions
- Check if upload was successful (green checkmark)

## Development Tips

### Hot Reload

Both servers support hot reload:
- **Backend**: Automatically reloads on Python file changes
- **Frontend**: Automatically reloads on React file changes

### API Documentation

Visit http://localhost:8000/docs for interactive API documentation (Swagger UI)

### Checking Logs

**Backend logs**: Check the terminal where backend is running
**Frontend logs**: Check browser console (F12)

### Stopping Servers

- **Windows batch scripts**: Close the command windows
- **Manual**: Press `Ctrl+C` in each terminal
- **Docker**: Run `docker-compose down`

## Next Steps

- See [DEPLOYMENT.md](DEPLOYMENT.md) for deploying to Render
- See [README.md](README.md) for project overview
- Check `/docs` endpoint for API documentation

## Environment Variables Reference

### Backend (`backend/.env`)
```env
HUGGINGFACE_TOKEN=your_token_here  # Required
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000  # Backend URL
```

### Docker (`.env` in root)
```env
HUGGINGFACE_TOKEN=your_token_here  # Required
```

## Port Configuration

Default ports:
- **Backend**: 8000
- **Frontend**: 3000 (or next available)

To change ports:
- **Backend**: Modify the `--port` parameter in start command
- **Frontend**: Modify `vite.config.js` server port
- **Docker**: Modify `docker-compose.yml` port mappings
