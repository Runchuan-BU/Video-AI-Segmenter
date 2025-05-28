from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
import os
import json

from app.config import RESULTS_DIR
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class DeleteCommentRequest(BaseModel):
    filename: str
    timestamp: str
    comment_index: int

class DeleteResultRequest(BaseModel):
    filename: str
    timestamp: str

@router.post("/delete-analysis-comment")
async def delete_comment(data: DeleteCommentRequest = Body(...)):
    try:
        path = os.path.join(RESULTS_DIR, f"{os.path.basename(data.filename)}.analysis.json")
        if not os.path.exists(path):
            raise HTTPException(status_code=404, detail="File not found")

        with open(path, 'r', encoding='utf-8') as f:
            content = json.load(f)

        for entry in content.get("history", []):
            if entry["timestamp"] == data.timestamp:
                if "comments" in entry and 0 <= data.comment_index < len(entry["comments"]):
                    del entry["comments"][data.comment_index]
                    break
                else:
                    raise HTTPException(status_code=400, detail="Invalid comment index")

        with open(path, 'w', encoding='utf-8') as f:
            json.dump(content, f, ensure_ascii=False, indent=2)

        return { "status": "comment deleted", "timestamp": data.timestamp }

    except Exception as e:
        logger.error(f"Error deleting comment: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete comment")

@router.post("/delete-analysis-result")
async def delete_result(data: DeleteResultRequest = Body(...)):
    try:
        path = os.path.join(RESULTS_DIR, f"{os.path.basename(data.filename)}.analysis.json")
        if not os.path.exists(path):
            raise HTTPException(status_code=404, detail="File not found")

        with open(path, 'r', encoding='utf-8') as f:
            content = json.load(f)

        original_length = len(content.get("history", []))
        content["history"] = [entry for entry in content["history"] if entry["timestamp"] != data.timestamp]

        if len(content["history"]) == original_length:
            raise HTTPException(status_code=404, detail="Timestamp not found")

        with open(path, 'w', encoding='utf-8') as f:
            json.dump(content, f, ensure_ascii=False, indent=2)

        return { "status": "result deleted", "timestamp": data.timestamp }

    except Exception as e:
        logger.error(f"Error deleting result: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete analysis result")