from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from rag import get_answer_async

router = APIRouter()

# Request and response schemas
class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str

@router.post("/ask", response_model=QueryResponse)
async def ask(request: QueryRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query is required")
    
    answer = await get_answer_async(request.query)
    return {"answer": answer}
