# backend/app/services/upload_video_from_link.py

import requests
from bs4 import BeautifulSoup
import re
import os
import json
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import urllib.request
import time

from urllib.parse import urljoin

def extract_video_links(url: str) -> list[str]:
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"error: {e}")
        return []

    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    video_sources = []

    for video in soup.find_all('video'):
        if video.get('src'):
            video_sources.append(urljoin(url, video['src']))
        for source in video.find_all('source'):
            if source.get('src'):
                video_sources.append(urljoin(url, source['src']))

    matches = re.findall(r'(?:https?:)?//[^\s"\']+\.(?:mp4|mov)', html)
    matches = [urljoin(url, m if m.startswith("http") else "https:" + m) for m in matches]

    return list(set(video_sources + matches))


class SaveLinksRequest(BaseModel):
    links: list[str]

def download_selected_links(data: SaveLinksRequest, save_dir: str):
    os.makedirs(save_dir, exist_ok=True)
    saved = []
    failed = []

    for url in data.links:
        try:
            filename = f"{int(time.time())}_{os.path.basename(url.split('?')[0])}"
            dest_path = os.path.join(save_dir, filename)
            urllib.request.urlretrieve(url, dest_path)
            saved.append(filename)
        except Exception as e:
            print(f"failed: {url}, error: {e}")
            failed.append({"url": url, "error": str(e)})

    return {
        "saved": saved,
        "failed": failed,
        "message": f"saved: {len(saved)} ,  failed: {len(failed)} 个"
    }