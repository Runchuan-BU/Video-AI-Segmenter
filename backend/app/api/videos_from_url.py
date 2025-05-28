# backend/app/api/videos_from_url.py

from fastapi import APIRouter, Body
from app.services.upload_video_from_link import extract_video_links, download_selected_links
import os
from app.config import VIDEOS_DIR
from app.schemas.api_schemas import SaveLinksRequest, ExtractedLinksResponse, DownloadResultResponse

router = APIRouter()

@router.get("/extract_videos_from_url", response_model=ExtractedLinksResponse)
def extract_videos_from_url(
    url: str
):
    videos = extract_video_links(url)
    return ExtractedLinksResponse(videos=videos)

@router.post("/download_videos_from_links", response_model=DownloadResultResponse)
def download_videos_from_links(
    data: SaveLinksRequest = Body(...)
):
    result = download_selected_links(data, VIDEOS_DIR)
    return DownloadResultResponse(
        saved=result.get("saved", []),
        failed=result.get("failed", []),
        message=result.get("message", "Done")
    )