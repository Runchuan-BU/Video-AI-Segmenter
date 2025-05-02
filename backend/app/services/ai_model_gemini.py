# backend/app/services/ai_model_gemini.py

import os
import time
from typing import Dict
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel

load_dotenv()

class Segment(BaseModel):
    time_slot: str
    description: str

class GeminiVideoAnalyzer:
    AVAILABLE_MODELS = {
        "GEMINI-2.0-FLASH": "gemini-2.0-flash",
        "GEMINI-2.0-FLASH-LITE": "gemini-2.0-flash-lite",
        "GEMINI-1.5-PRO": "gemini-1.5-pro",
    }

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("Missing GEMINI_API_KEY in .env file")
        self.client = genai.Client(api_key=api_key)

    def analyze(self, video_path: str, model_key: str = "GEMINI-2.0-FLASH") -> Dict:
        if not os.path.isfile(video_path):
            return {"status": "error", "error": f"File not found: {video_path}"}

        model_id = self.AVAILABLE_MODELS.get(model_key.upper())
        if not model_id:
            return {"status": "error", "error": f"Unsupported model: {model_key}"}

        prompt = """Analyze this video and break it down into segments based on distinct actions or tasks.
        For each segment, return:
        - a time slot (e.g., "00:00 - 00:10")
        - a description of what the robot is doing
        Return the result as a JSON list."""

        try:
            uploaded_file = self.client.files.upload(file=video_path)

            for _ in range(30):
                file_status = self.client.files.get(name=uploaded_file.name)
                if file_status.state == "ACTIVE":
                    break
                time.sleep(1)
            else:
                return {"status": "error", "error": f"File {uploaded_file.name} did not become ACTIVE."}

            response = self.client.models.generate_content(
                model=model_id,
                contents=[file_status, prompt],
                config={
                    "response_mime_type": "application/json",
                    "response_schema": list[Segment],
                },
            )

            return {
                "status": "success",
                "file": uploaded_file.name,
                "results": response.text.strip(),
            }

        except Exception as e:
            return {"status": "error", "error": str(e)}