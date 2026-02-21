import asyncio
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

KB_FILE = Path(__file__).parent / "data" / "knowledge_base.txt"
with open(KB_FILE, "r", encoding="utf-8") as f:
    knowledge_base = f.read()

executor = ThreadPoolExecutor(max_workers=4)  # adjust as needed

def _get_answer(query: str) -> str:
    prompt = f"""
You are an assistant that knows the following information about the user:
{knowledge_base}

Answer the following question concisely:
{query}
"""
    try:
        result = subprocess.run(
            ["ollama", "run", "llama3"],
            input=prompt,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=True,
            timeout=180,
        )
        return result.stdout.strip() or "(No response from model)"
    except FileNotFoundError:
        return "Error: Ollama CLI not found. Install Ollama and ensure `ollama` is on PATH."
    except subprocess.TimeoutExpired:
        return "Error: Model timed out while generating a response."
    except subprocess.CalledProcessError as e:
        return f"Error generating response: {(e.stderr or str(e)).strip()}"

# Async wrapper for FastAPI
async def get_answer_async(query: str) -> str:
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(executor, _get_answer, query)
