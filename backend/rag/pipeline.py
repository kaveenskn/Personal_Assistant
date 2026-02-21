
from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any, List

import numpy as np
import requests


def _read_text(path: str) -> str:
    if not os.path.exists(path):
        raise FileNotFoundError(f"Knowledge base file not found: {path}")
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()


def _chunk_text(text: str, chunk_size: int = 800, overlap: int = 120) -> List[str]:
    text = (text or "").strip()
    if not text:
        return []

    chunks: List[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + chunk_size)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end == len(text):
            break
        start = max(0, end - overlap)
    return chunks


def _normalize(vectors: np.ndarray) -> np.ndarray:
    norms = np.linalg.norm(vectors, axis=1, keepdims=True) + 1e-12
    return vectors / norms


@dataclass
class RagPipeline:
    chunks: List[str]
    embeddings: np.ndarray
    index: Any
    embedding_model_name: str
    ollama_base_url: str
    ollama_model: str

    @classmethod
    def from_text_file(
        cls,
        kb_path: str,
        embedding_model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
        ollama_base_url: str | None = None,
        ollama_model: str | None = None,
        chunk_size: int = 800,
        overlap: int = 120,
    ) -> "RagPipeline":
        text = _read_text(kb_path)
        chunks = _chunk_text(text, chunk_size=chunk_size, overlap=overlap)

        # Lazy imports keep startup errors clearer for beginners.
        from sentence_transformers import SentenceTransformer

        model = SentenceTransformer(embedding_model_name)
        if not chunks:
            # Create a minimal empty index so the API still runs.
            dim = int(model.get_sentence_embedding_dimension())
            import faiss

            index = faiss.IndexFlatIP(dim)
            embeddings = np.zeros((0, dim), dtype=np.float32)
            return cls(
                chunks=[],
                embeddings=embeddings,
                index=index,
                embedding_model_name=embedding_model_name,
                ollama_base_url=ollama_base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
                ollama_model=ollama_model or os.getenv("OLLAMA_MODEL", "llama3"),
            )

        vectors = model.encode(chunks, convert_to_numpy=True, show_progress_bar=False)
        vectors = vectors.astype(np.float32)
        vectors = _normalize(vectors)

        import faiss

        dim = vectors.shape[1]
        index = faiss.IndexFlatIP(dim)
        index.add(vectors)

        return cls(
            chunks=chunks,
            embeddings=vectors,
            index=index,
            embedding_model_name=embedding_model_name,
            ollama_base_url=ollama_base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
            ollama_model=ollama_model or os.getenv("OLLAMA_MODEL", "llama3"),
        )

    def retrieve(self, query: str, top_k: int = 4) -> List[str]:
        query = (query or "").strip()
        if not query or not self.chunks:
            return []

        from sentence_transformers import SentenceTransformer

        model = SentenceTransformer(self.embedding_model_name)
        q = model.encode([query], convert_to_numpy=True, show_progress_bar=False).astype(np.float32)
        q = _normalize(q)

        scores, indices = self.index.search(q, top_k)
        idxs = [int(i) for i in indices[0] if i >= 0]
        return [self.chunks[i] for i in idxs if i < len(self.chunks)]

    def _build_prompt(self, user_message: str, contexts: List[str]) -> str:
        context_block = "\n\n---\n\n".join(contexts).strip()
        if context_block:
            return (
                "You are a helpful assistant. Use ONLY the context below to answer. "
                "If the context does not contain the answer, say you don't know.\n\n"
                f"Context:\n{context_block}\n\n"
                f"User: {user_message}\n"
                "Assistant:"
            )

        return (
            "You are a helpful assistant. The user provided no context. "
            "Answer briefly and honestly.\n\n"
            f"User: {user_message}\n"
            "Assistant:"
        )

    def generate(self, prompt: str) -> str:
        url = f"{self.ollama_base_url.rstrip('/')}/api/generate"
        payload = {
            "model": self.ollama_model,
            "prompt": prompt,
            "stream": False,
        }
        resp = requests.post(url, json=payload, timeout=120)
        resp.raise_for_status()
        data = resp.json()
        return (data.get("response") or "").strip()

    def chat(self, user_message: str) -> str:
        contexts = self.retrieve(user_message, top_k=4)
        prompt = self._build_prompt(user_message, contexts)
        return self.generate(prompt)
