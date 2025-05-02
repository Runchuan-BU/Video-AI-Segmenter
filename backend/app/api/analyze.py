# backend/app/api/analyze.py

from fastapi import APIRouter, Body
import os

from app.services.ai_model_gemini import GeminiVideoAnalyzer
from app.config import VIDEOS_DIR
from app.schemas.api_schemas import AnalyzeRequest, AnalyzeResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
analyzer = GeminiVideoAnalyzer()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_uploaded_video(
    data: AnalyzeRequest = Body(...)
):
    logging.info("Analyzing VSideo")
    full_path = os.path.join(VIDEOS_DIR, os.path.basename(data.filepath))
    model = data.model
    results = analyzer.analyze(full_path, model_key=model)
    # logger.info(AnalyzeResponse(results=results))
    return AnalyzeResponse(results=results)