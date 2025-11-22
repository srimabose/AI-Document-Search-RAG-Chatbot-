# Deployment Guide for Render

This guide will help you deploy the RAG Document Search Chatbot on Render.

## Prerequisites

1. A [Render account](https://render.com) (free tier available)
2. Your GitHub repository connected to Render
3. HuggingFace API token

## Deployment Options

### Option 1: Automatic Deployment with render.yaml (Recommended)

The project includes a `render.yaml` file that automatically configures both services.

1. **Push your code to GitHub** (if not already done)

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New" → "Blueprint"

3. **Connect Repository**
   - Select your GitHub repository: `AI-Document-Search-RAG-Chatbot-`
   - Render will detect the `render.yaml` file

4. **Configure Environment Variables**
   - Add `HUGGINGFACE_TOKEN` with your token value
   - Click "Apply"

5. **Deploy**
   - Render will automatically create and deploy both services
   - Backend: Python web service
   - Frontend: Static site

6. **Wait for Deployment**
   - Backend takes ~10-15 minutes (installing ML libraries)
   - Frontend takes ~2-3 minutes

### Option 2: Manual Deployment

#### Deploy Backend

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend**
   - **Name:** `rag-chatbot-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables**
   - `HUGGINGFACE_TOKEN` = your HuggingFace token
   - `PYTHON_VERSION` = 3.11.0

4. **Create Service**
   - Click "Create Web Service"
   - Wait for deployment (~10-15 minutes)
   - Copy the service URL (e.g., `https://rag-chatbot-backend.onrender.com`)

#### Deploy Frontend

1. **Create Static Site**
   - Click "New" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend**
   - **Name:** `rag-chatbot-frontend`
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Add Environment Variable**
   - `VITE_API_URL` = Your backend URL from step above

4. **Create Static Site**
   - Click "Create Static Site"
   - Wait for deployment (~2-3 minutes)

## Important Notes

### Free Tier Limitations

- **Backend:** Free tier spins down after 15 minutes of inactivity
- **First request after spin-down:** Takes 30-60 seconds to wake up
- **Upgrade to paid plan** ($7/month) for always-on service

### Environment Variables

**Backend:**
- `HUGGINGFACE_TOKEN` - Required for embeddings model
- `PYTHON_VERSION` - Set to 3.11.0 for compatibility

**Frontend:**
- `VITE_API_URL` - Your backend service URL (e.g., `https://your-backend.onrender.com`)

### Build Times

- **Backend:** 10-15 minutes (PyTorch, Transformers are large)
- **Frontend:** 2-3 minutes

## Troubleshooting

### Backend Issues

**Build fails:**
- Check that `PYTHON_VERSION` is set to 3.11.0
- Verify `requirements.txt` is in the `backend` folder
- Check build logs for specific errors

**Service crashes:**
- Verify `HUGGINGFACE_TOKEN` is set correctly
- Check service logs in Render dashboard
- Free tier has 512MB RAM - may need upgrade for large models

**Slow first request:**
- Normal on free tier after spin-down
- Consider upgrading to paid plan

### Frontend Issues

**Build fails:**
- Verify `package.json` is in `frontend` folder
- Check Node version (should auto-detect)
- Review build logs

**Can't connect to backend:**
- Verify `VITE_API_URL` is set correctly
- Check backend service is running
- Ensure backend URL includes `https://`

**404 errors:**
- Verify `Publish Directory` is set to `dist`
- Check build output in logs

### CORS Issues

The backend is configured to allow all origins. If you face CORS issues:
- Verify backend is accessible at `/docs` endpoint
- Check browser console for specific errors
- Ensure frontend is using correct backend URL

## Testing Your Deployment

1. **Visit your frontend URL**
   - Should see "AI Document Search" interface

2. **Check backend health**
   - Visit `https://your-backend.onrender.com/`
   - Should return: `{"status": "RAG Chatbot API is running"}`

3. **Test API documentation**
   - Visit `https://your-backend.onrender.com/docs`
   - Should see FastAPI Swagger UI

4. **Upload a PDF**
   - Use the frontend to upload a test PDF
   - First upload may be slow on free tier

5. **Query the document**
   - Ask questions about your uploaded document
   - Verify responses are relevant

## Updating Your Deployment

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both services will automatically rebuild and redeploy.

## Cost Optimization

**Free Tier:**
- Backend: Free (with spin-down)
- Frontend: Free
- Total: $0/month

**Paid Tier (Recommended for production):**
- Backend: $7/month (always-on, 512MB RAM)
- Frontend: Free
- Total: $7/month

**Upgrade Backend:**
- Go to service settings
- Change instance type to "Starter" or higher
- Provides always-on service and better performance

## Alternative: Docker Deployment

If you prefer Docker, you can deploy using Render's Docker support:

1. Use the provided `Dockerfile` in backend/frontend
2. Or use `docker-compose.yml` on any VPS
3. Deploy to Render as Docker service

## Support

- **Render Docs:** https://render.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Vite Docs:** https://vitejs.dev

## Next Steps

After successful deployment:
1. Test all features thoroughly
2. Monitor service logs for errors
3. Consider upgrading to paid tier for production
4. Set up custom domain (optional)
5. Add monitoring/analytics (optional)
