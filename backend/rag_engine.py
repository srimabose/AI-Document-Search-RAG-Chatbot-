from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from transformers import pipeline
import numpy as np
import os

class RAGEngine:
    def __init__(self, hf_token: str):
        os.environ["HF_TOKEN"] = hf_token
        print("Loading embedding model...")
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Loading QA model...")
        self.qa_pipeline = pipeline(
            "text2text-generation",
            model="google/flan-t5-base",
            token=hf_token
        )
        self.documents = []
        self.embeddings = []
        
    def _get_embedding(self, text: str):
        return self.embedding_model.encode(text)
    
    def _chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 200):
        chunks = []
        start = 0
        while start < len(text):
            end = start + chunk_size
            chunks.append(text[start:end])
            start = end - overlap
        return chunks
    
    def load_document(self, pdf_path: str):
        reader = PdfReader(pdf_path)
        
        for page_num, page in enumerate(reader.pages):
            text = page.extract_text()
            chunks = self._chunk_text(text)
            
            for chunk in chunks:
                if chunk.strip():
                    doc = {"text": chunk, "page": page_num + 1}
                    self.documents.append(doc)
                    embedding = self._get_embedding(chunk)
                    self.embeddings.append(embedding)
    
    def query(self, question: str):
        if not self.has_documents():
            return {"answer": "No documents loaded", "sources": []}
        
        question_embedding = self._get_embedding(question)
        
        # Calculate cosine similarity
        embeddings_array = np.array(self.embeddings)
        similarities = np.dot(embeddings_array, question_embedding) / (
            np.linalg.norm(embeddings_array, axis=1) * np.linalg.norm(question_embedding)
        )
        
        # Get top 3 most similar documents
        k = min(3, len(self.documents))
        top_indices = np.argsort(similarities)[-k:][::-1]
        
        context_docs = [self.documents[i] for i in top_indices]
        context = "\n\n".join([doc["text"] for doc in context_docs])
        
        prompt = f"""Answer the question based on the context below. If you cannot answer based on the context, say "I don't have enough information."

Context: {context}

Question: {question}

Answer:"""
        
        # Generate answer
        result = self.qa_pipeline(prompt, max_length=512, do_sample=False)
        answer = result[0]['generated_text']
        
        sources = [{"page": doc["page"], "content": doc["text"][:200]} for doc in context_docs]
        
        return {"answer": answer, "sources": sources}
    
    def has_documents(self):
        return len(self.documents) > 0
    
    def clear(self):
        self.documents = []
        self.embeddings = []
