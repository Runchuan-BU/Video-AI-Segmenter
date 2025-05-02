# backend/app/api/upload.py

from fastapi import APIRouter, UploadFile, File
import shutil, os, time
from app.config import VIDEOS_DIR
from app.schemas.api_schemas import UploadVideoResponse

router = APIRouter()

@router.post("/upload_video", response_model=UploadVideoResponse)
async def upload_video(
    file: UploadFile = File(...)
):
    filename = f"{int(time.time())}_{file.filename}"
    filepath = os.path.join(VIDEOS_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return UploadVideoResponse(
        message="Video uploaded successfully",
        filepath=filepath,
        filename=filename
    )