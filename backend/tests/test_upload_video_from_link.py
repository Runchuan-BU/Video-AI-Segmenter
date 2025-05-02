# backend/tests/test_upload_video_from_link.py

import os
import time
import pytest
from app.services.upload_video_from_link import extract_video_links, download_selected_links, SaveLinksRequest
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.upload_video_from_link import extract_video_links, download_selected_links, SaveLinksRequest

VIDEOS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "videos"))

@pytest.fixture(scope="module")
def aloha_video_links():
    url = "https://tonyzhaozh.github.io/aloha/"
    links = extract_video_links(url)
    print()
    print("all links: ", links)
    assert isinstance(links, list)
    assert len(links) > 0
    return links

def test_extract_video_links(aloha_video_links):
    assert all(link.endswith((".mp4", ".mov")) for link in aloha_video_links)

def test_download_selected_links(aloha_video_links):

    save_request = SaveLinksRequest(links=aloha_video_links)
    result = download_selected_links(save_request, VIDEOS_DIR)

    assert "saved" in result
    assert isinstance(result["saved"], list)
    print()
    print("saved videos' names: ", result["saved"])

    for filename in result["saved"]:
        full_path = os.path.join(VIDEOS_DIR, filename)
        assert os.path.exists(full_path)
        assert os.path.getsize(full_path) > 0 