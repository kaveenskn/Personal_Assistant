# routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from rag import RagPipeline
from typing import Optional

router = APIRouter()
rag = RagPipeline()

class QuestionRequest(BaseModel):
    question: Optional[str] = None
    query: Optional[str] = None

@router.post("/api/ask")
def ask_question(request: QuestionRequest):
    try:
        question = (request.question or request.query or "").strip()
        if not question:
            raise HTTPException(status_code=400, detail="Field 'question' (or 'query') is required")

        answer = rag.generate_answer(question)
        return {"answer": answer}
    except TimeoutError as e:
        raise HTTPException(status_code=504, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e)) from e