@echo off
echo Starting RAG Document Parser Application...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit (servers will keep running in separate windows)
pause >nul
