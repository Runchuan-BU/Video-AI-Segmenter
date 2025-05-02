# backend/app/schemas/video.py

from pydantic import BaseModel
from typing import List, Optional

# analyze
class AnalyzeRequest(BaseModel):
    filepath: str
    model: str = "GEMINI-2.0-FLASH"
class AnalyzeResponse(BaseModel):
    code: int = 200
    message: str = "Success"
    results: dict

# upload
class UploadVideoResponse(BaseModel):
    code: int = 200
    message: str
    filepath: str
    filename: str


# video_list
class VideoListResponse(BaseModel):
    code: int = 200
    message: str = "Success"
    videos: List[str]



# videos_from_url
class ExtractedLinksResponse(BaseModel):
    code: int = 200
    message: str = "Success"
    videos: List[str]


# class DownloadLinkItem(BaseModel):
#     url: str
#     title: str
#     selected: bool = True
class SaveLinksRequest(BaseModel):
    links: List[str]


class DownloadResultItem(BaseModel):
    url: str
    error: Optional[str] = None
class DownloadResultResponse(BaseModel):
    code: int = 200
    message: str
    saved: List[str]
    failed: List[DownloadResultItem]