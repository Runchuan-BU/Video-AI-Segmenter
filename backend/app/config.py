# backend/app/config.py

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

DB_DIR = os.path.join(BASE_DIR, "db")

VIDEOS_DIR = os.path.join(DB_DIR, "videos")
LOGS_DIR = os.path.join(DB_DIR, "logs")
RESULTS_DIR = os.path.join(DB_DIR, "analysis_results")

os.makedirs(VIDEOS_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)