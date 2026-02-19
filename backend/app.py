
import os

from flask import Flask

from rag.pipeline import RagPipeline
from routes.chat import chat_bp


def create_app() -> Flask:
	app = Flask(__name__)

	kb_path = os.getenv("KB_PATH", os.path.join(os.path.dirname(__file__), "data", "profile.txt"))
	embedding_model = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

	app.config["RAG"] = RagPipeline.from_text_file(
		kb_path=kb_path,
		embedding_model_name=embedding_model,
	)

	app.register_blueprint(chat_bp)
	return app


app = create_app()


if __name__ == "__main__":
	host = os.getenv("FLASK_HOST", "0.0.0.0")
	port = int(os.getenv("FLASK_PORT", "5000"))
	debug = os.getenv("FLASK_DEBUG", "1") == "1"
	app.run(host=host, port=port, debug=debug)
