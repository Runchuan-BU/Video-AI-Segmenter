# app/api/results.py

from fastapi import APIRouter, Body, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import os
import json
from datetime import datetime

from app.config import RESULTS_DIR
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# ----- Schema -----
class Segment(BaseModel):
    time_slot: str
    description: str

class SaveAnalysisRequest(BaseModel):
    filename: str
    results: List[Segment]

class CommentContent(BaseModel):
    content: str
    tags: List[str]

class AddCommentRequest(BaseModel):
    filename: str
    timestamp: str
    comment: CommentContent

# ----- Endpoint: Save Analysis -----
@router.post("/save-analysis")
async def save_analysis_endpoint(data: SaveAnalysisRequest = Body(...)):
    try:
        filename = os.path.basename(data.filename)
        save_path = os.path.join(RESULTS_DIR, f"{filename}.analysis.json")

        if os.path.exists(save_path):
            with open(save_path, 'r', encoding='utf-8') as f:
                existing = json.load(f)
        else:
            existing = { "filename": filename, "history": [] }

        new_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "results": [s.model_dump() for s in data.results],
            "comments": []
        }

        existing["history"].append(new_entry)

        with open(save_path, 'w', encoding='utf-8') as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)

        logger.info(f"✅ Analysis saved to {save_path}")
        return { "status": "success", "versions": len(existing['history']) }

    except Exception as e:
        logger.error(f"❌ Failed to save analysis: {e}")
        raise HTTPException(status_code=500, detail="Failed to save analysis")

# ----- Endpoint: List Timestamps -----
@router.get("/list-analysis-versions")
async def list_analysis_versions(filename: str):
    try:
        path = os.path.join(RESULTS_DIR, f"{os.path.basename(filename)}.analysis.json")
        if not os.path.exists(path):
            raise HTTPException(status_code=404, detail="Analysis file not found")

        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        versions = [
            {
                "timestamp": entry["timestamp"],
                "comment_count": len(entry.get("comments", []))
            }
            for entry in data.get("history", [])
        ]

        return { "filename": filename, "versions": versions }

    except Exception as e:
        logger.error(f"Failed to list analysis versions: {e}")
        raise HTTPException(status_code=500, detail="Failed to list versions")

# ----- Endpoint: Add Comment -----
@router.post("/add-analysis-comment")
async def add_comment(data: AddCommentRequest):
    try:
        path = os.path.join(RESULTS_DIR, f"{os.path.basename(data.filename)}.analysis.json")
        if not os.path.exists(path):
            raise HTTPException(status_code=404, detail="Analysis file not found")

        with open(path, 'r', encoding='utf-8') as f:
            existing = json.load(f)

        matched = False
        for entry in existing.get("history", []):
            if entry["timestamp"] == data.timestamp:
                if "comments" not in entry:
                    entry["comments"] = []
                entry["comments"].append({
                    "content": data.comment.content,
                    "tags": data.comment.tags
                })
                matched = True
                break

        if not matched:
            raise HTTPException(status_code=404, detail="Timestamp not found")

        with open(path, 'w', encoding='utf-8') as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)

        return { "status": "success", "timestamp": data.timestamp }

    except Exception as e:
        logger.error(f"Failed to add comment: {e}")
        raise HTTPException(status_code=500, detail="Failed to add comment")

# ----- Endpoint: Get Analysis by Timestamp -----
@router.get("/get-analysis-by-timestamp")
async def get_analysis_by_timestamp(filename: str = Query(...), timestamp: str = Query(...)):
    try:
        path = os.path.join(RESULTS_DIR, f"{os.path.basename(filename)}.analysis.json")
        if not os.path.exists(path):
            raise HTTPException(status_code=404, detail="Analysis file not found")

        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for entry in data.get("history", []):
            if entry["timestamp"] == timestamp:
                return entry

        raise HTTPException(status_code=404, detail="Timestamp not found")

    except Exception as e:
        logger.error(f"Failed to get analysis by timestamp: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve analysis version")