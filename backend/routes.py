
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from rag import RagPipeline

router = APIRouter()
rag = RagPipeline()

class QuestionRequest(BaseModel):
    question: str

@router.post("/api/ask")
def ask_question(request: QuestionRequest):
    try:
        answer = rag.generate_answer(request.question)
        return {"answer": answer}
    except TimeoutError as e:
        raise HTTPException(status_code=504, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e)) from e