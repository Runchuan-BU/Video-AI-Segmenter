
import os
import pytest
from unittest.mock import patch, MagicMock
from app.services.ai_model import analyze_video_file

@pytest.fixture
def sample_video(tmp_path):
    video = tmp_path / "sample.mp4"
    video.write_bytes(b"dummy video content")
    return str(video)

@patch("app.services.ai_model.get_genai_client")
def test_analyze_video_success(mock_get_client, sample_video):
    mock_client = MagicMock()
    mock_get_client.return_value = mock_client

    mock_file = MagicMock()
    mock_file.name = "sample.mp4"
    mock_client.files.upload.return_value = mock_file

    mock_response = MagicMock()
    mock_response.text = "Robot is picking up an object."
    mock_client.models.generate_content.return_value = mock_response

    result = analyze_video_file(sample_video)

    assert result["status"] == "success"
    assert result["file"] == "sample.mp4"
    assert result["summary"] == "Robot is picking up an object."

def test_analyze_video_file_not_found():
    result = analyze_video_file("not_exists.mp4")
    assert result["status"] == "error"
    assert "not found" in result["error"]