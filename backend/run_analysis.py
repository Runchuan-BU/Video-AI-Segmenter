from app.services.ai_model import analyze_video_file

video_path = "videos/teleop_all.mp4"

result = analyze_video_file(video_path)

print("=== results ===")
if result["status"] == "success":
    print("file name:", result["file"])
    print("results:", result["summary"])
else:
    print("error:", result["error"])