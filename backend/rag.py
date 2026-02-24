# rag.py

import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import ollama

class RagPipeline:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.documents = self.load_documents()
        self.index = self.create_vector_store()
        self.ollama_client = ollama.Client(
            host=os.getenv("OLLAMA_HOST"),
            timeout=float(os.getenv("OLLAMA_TIMEOUT", "60")),
        )
        self.ollama_model = "qwen2.5:0.5b-instruct"

    def load_documents(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(base_dir, "data", "knowledge.txt")

        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()

        # Split into chunks
        chunks = text.split("\n\n")
        return chunks

    def create_vector_store(self):
        embeddings = self.model.encode(self.documents)
        embeddings = np.array(embeddings).astype("float32")

        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(embeddings)

        return index

    def retrieve(self, query, top_k=2):
        query_embedding = self.model.encode([query])
        query_embedding = np.array(query_embedding).astype("float32")

        distances, indices = self.index.search(query_embedding, top_k)
        results = [self.documents[i] for i in indices[0]]

        return "\n".join(results)

    def generate_answer(self, query):
        context = self.retrieve(query)

        prompt = f"""
You are a personal AI assistant that answers about Shanmugaraja Kaveen.
Answer only using the context below.

Context:
{context}

Question:
{query}
"""

        try:
            response = self.ollama_client.chat(
                model=self.ollama_model,  # e.g. llama3; ensure: `ollama pull llama3`
                messages=[{"role": "user", "content": prompt}],
            )
            return response["message"]["content"]
        except Exception as e:
            message = (
                "Failed to get a response from Ollama. "
                "Make sure Ollama is running (try `ollama serve`) and the model is available. "
                f"Original error: {type(e).__name__}: {e}"
            )
            if "timeout" in str(e).lower():
                raise TimeoutError(message) from e
            raise RuntimeError(message) from e