# backend/app/services/ai_model.py

import time
import os
from dotenv import load_dotenv
from google import genai
from typing import Dict
from pydantic import BaseModel

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("Missing GEMINI_API_KEY in .env file")

def get_genai_client():
    return genai.Client(api_key=api_key)


class segmentation(BaseModel):
    time_slot: str
    description: str

def analyze_video_file(video_path: str, prompt: str = None) -> Dict:
    if not prompt:
        prompt = """Analyze this video and break it down into segments based on distinct actions or tasks.
        For each segment, return:
        - a time slot (e.g., "00:00 - 00:10")
        - a description of what the robot is doing
        Return the result as a JSON list"""
    if not os.path.isfile(video_path):
        return {"status": "error", "error": f"File not found: {video_path}"}

    try:
        client = get_genai_client()
        uploaded_file = client.files.upload(file=video_path)

        for _ in range(10):
            file_status = client.files.get(name=uploaded_file.name)
            if file_status.state == "ACTIVE":
                break
            time.sleep(1)
        else:
            return {"status": "error", "error": f"File {uploaded_file.name} did not become ACTIVE."}

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[file_status, prompt],
            config={
                'response_mime_type': 'application/json',
                'response_schema': list[segmentation],
                },
                )

        return {
            "status": "success",
            "file": uploaded_file.name,
            "results": response.text.strip()
        }

    except Exception as e:
        return {"status": "error", "error": str(e)}