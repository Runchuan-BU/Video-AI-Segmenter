import os
import io
import json
import pytest
from fastapi.testclient import TestClient
from app.main import app, VIDEOS_DIR

client = TestClient(app)


@pytest.fixture(scope="module", autouse=True)
def setup_video_dir():
    os.makedirs(VIDEOS_DIR, exist_ok=True)
    yield
    
    for f in os.listdir(VIDEOS_DIR):
        if f.startswith("test_") or f.endswith(".tmp"):
            os.remove(os.path.join(VIDEOS_DIR, f))


def test_upload_video():
    video_content = b"fake video content"
    files = {"file": ("test_video.mp4", io.BytesIO(video_content), "video/mp4")}
    response = client.post("/upload_video", files=files)

    assert response.status_code == 200
    data = response.json()
    assert "filename" in data
    assert data["filename"].endswith("test_video.mp4")
    assert os.path.exists(data["filepath"])


def test_list_videos():
    response = client.get("/list-videos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data["videos"], list)


def test_extract_videos_from_url():
    url = "https://tonyzhaozh.github.io/aloha/"
    response = client.get("/extract_videos_from_url", params={"url": url})
    assert response.status_code == 200
    data = response.json()
    assert "videos" in data
    assert isinstance(data["videos"], list)


def test_download_videos_from_links(monkeypatch):

    fake_url = "http://example.com/test_video.mp4"

    def mock_urlretrieve(url, filename):
        with open(filename, "wb") as f:
            f.write(b"fake data")

    monkeypatch.setattr("app.services.upload_video_from_link.urllib.request.urlretrieve", mock_urlretrieve)

    response = client.post("/download_videos_from_links", json={"links": [fake_url]})
    assert response.status_code == 200
    data = response.json()
    assert "saved" in data
    assert len(data["saved"]) > 0


def test_analyze_endpoint(monkeypatch, tmp_path):

    fake_video = tmp_path / "test_analyze.tmp"
    fake_video.write_bytes(b"fake content")

    def mock_analyze(path, model_key):
        return {
            "status": "success",
            "file": os.path.basename(path),
            "summary": "Test analysis result."
        }

    from app.main import analyzer
    monkeypatch.setattr(analyzer, "analyze", mock_analyze)

    response = client.post("/analyze", data={"filepath": str(fake_video), "model": "dummy-model"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "summary" in data