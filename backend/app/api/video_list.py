# backend/app/api/video_list.py

from fastapi import APIRouter
import os
from app.config import VIDEOS_DIR
from app.schemas.api_schemas import VideoListResponse

router = APIRouter()

@router.get("/list-videos", response_model=VideoListResponse)
def list_videos():
    videos = [f for f in os.listdir(VIDEOS_DIR) if f.lower().endswith((".mp4", ".mov", ".avi"))]
    return VideoListResponse(videos=videos)