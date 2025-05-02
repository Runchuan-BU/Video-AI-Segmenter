# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api import upload, analyze, video_list
from app.api import videos_from_url
from app.config import VIDEOS_DIR
import logging

logging.basicConfig(level=logging.INFO)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(video_list.router)
app.include_router(videos_from_url.router)

app.mount("/videos", StaticFiles(directory=VIDEOS_DIR), name="videos")