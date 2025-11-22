# Setup Instructions

## Running with Docker Compose

1. Make sure you have Docker and Docker Compose installed

2. Create a `.env` file in the root directory with your API keys:
   ```
   OPENAI_API_KEY=your_openai_key_here
   HUGGINGFACE_TOKEN=your_huggingface_token_here
   ```

3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Running Locally (without Docker)

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

If uploads are not working:
1. Check that both containers are running: `docker-compose ps`
2. Check backend logs: `docker-compose logs backend`
3. Check frontend logs: `docker-compose logs frontend`
4. Ensure CORS is enabled in backend (already configured)
5. Verify the backend is accessible at http://localhost:8000

## Key Configuration

- **CORS**: Backend allows all origins (configured in `backend/main.py`)
- **API URL**: Frontend uses `VITE_API_URL` environment variable
- **Ports**: Backend on 8000, Frontend on 3000
- **File Upload**: Endpoint is `/upload` accepting PDF files
