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

from services.ai_model import analyze_video_file

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
    filename = f"{int(time.time())}_{uuid.uuid4()}_{file.filename}"
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
    model: str = Form("gemini")
):
    safe_filename = os.path.basename(filepath)
    full_path = os.path.join(VIDEOS_DIR, safe_filename)

    print(f"Received filename: {filepath}")
    print(f"Safe filename: {safe_filename}")
    print(f"Full path: {full_path}")
    print(f"Files in videos/: {os.listdir(VIDEOS_DIR)}")

    if not os.path.exists(full_path):
        return JSONResponse(status_code=404, content={"status": "error", "error": f"File not found: {safe_filename}"})

    results = analyze_video_file(full_path)
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