# backend/app/main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import shutil
import os
import uuid
import subprocess
import time

from services.ai_model_gemini import GeminiVideoAnalyzer

analyzer = GeminiVideoAnalyzer()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VIDEOS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "videos"))
os.makedirs(VIDEOS_DIR, exist_ok=True)


@app.post("/upload_video")
async def upload_video(file: UploadFile = File(...)):
    # file_id = str(uuid.uuid4())
    # filename = f"{int(time.time())}_{uuid.uuid4()}_{file.filename}"
    filename = f"{int(time.time())}_{file.filename}"

    filepath = os.path.join(VIDEOS_DIR, filename)

    try:
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

    return {
        "message": "Video uploaded successfully",
        "filepath": filepath,
        "filename": filename
    }

@app.post("/analyze")
async def analyze_uploaded_video(
    filepath: str = Form(...), 
    model: str = Form("GEMINI-2.0-FLASH")
):
    full_path = os.path.join(VIDEOS_DIR, os.path.basename(filepath))
    print(f"Received filename: {filepath}")
    results = analyzer.analyze(full_path, model_key=model)
    print(f"Results: {results}")
    return results


@app.get("/list-videos")
def list_videos():
    try:
        videos = [f for f in os.listdir(VIDEOS_DIR) if f.lower().endswith((".mp4", ".mov", ".avi"))]
        return {"videos": videos}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    


app.mount("/videos", StaticFiles(directory=VIDEOS_DIR), name="videos")