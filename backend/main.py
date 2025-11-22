from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from rag_engine import RAGEngine

load_dotenv()

app = FastAPI(title="RAG Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_engine = RAGEngine(hf_token=os.getenv("HUGGINGFACE_TOKEN"))

class QueryRequest(BaseModel):
    question: str

@app.get("/")
def read_root():
    return {"status": "RAG Chatbot API is running"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    contents = await file.read()
    temp_path = f"temp_{file.filename}"
    
    with open(temp_path, "wb") as f:
        f.write(contents)
    
    try:
        rag_engine.load_document(temp_path)
        os.remove(temp_path)
        return {"message": f"Successfully processed {file.filename}", "filename": file.filename}
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query")
def query_documents(request: QueryRequest):
    if not rag_engine.has_documents():
        raise HTTPException(status_code=400, detail="No documents loaded. Please upload a PDF first.")
    
    try:
        response = rag_engine.query(request.question)
        return {"answer": response["answer"], "sources": response["sources"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/clear")
def clear_documents():
    rag_engine.clear()
    return {"message": "All documents cleared"}
