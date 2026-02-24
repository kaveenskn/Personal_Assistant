# routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from rag import RagPipeline

router = APIRouter()
rag = RagPipeline()

class AskRequest(BaseModel):
    question: str | None = None
    query: str | None = None

@router.post("/api/ask")
def ask_question(request: AskRequest):
    try:
        user_question = (request.question or request.query or "").strip()
        if not user_question:
            raise HTTPException(status_code=400, detail="Field 'question' (or 'query') is required")

        answer = rag.generate_answer(user_question)
        return {"answer": answer}
    except TimeoutError as e:
        raise HTTPException(status_code=504, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e)) from e