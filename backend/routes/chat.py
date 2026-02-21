
from flask import Blueprint, current_app, jsonify, request


chat_bp = Blueprint("chat", __name__)


@chat_bp.post("/chat")
def chat():
    payload = request.get_json(silent=True) or {}
    message = (payload.get("message") or "").strip()
    if not message:
        return jsonify({"error": "Missing 'message'"}), 400

    rag = current_app.config.get("RAG")
    if rag is None:
        return jsonify({"error": "RAG pipeline not initialized"}), 500

    try:
        answer = rag.chat(message)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
