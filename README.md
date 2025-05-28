# Video-AI-Segmenter 🎬🧠

AI-powered tool for segmenting videos into timestamped action descriptions using Google Gemini. Built with FastAPI and Next.js.

https://www.youtube.com/watch?v=Dg70Yar8Scs&t=6s
https://www.youtube.com/channel/UCk2tYTMtT9b43Jb0toR7pBg

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Runchuan-BU/Video-AI-Segmenter.git
cd Video-AI-Segmenter
```

Create a `.env` file with:

```
GEMINI_API_KEY=your_google_gemini_key
```

---

## ⚙️ Backend Setup (FastAPI + Gemini)

### Prerequisites

- Python 3.12
- [Poetry](https://python-poetry.org/)
- Google Gemini API key

### Install & Run

```bash
cd backend
poetry install
poetry shell
uvicorn app.main:app --reload
```

> Server running at: [http://localhost:8000](http://localhost:8000)

---

## 💻 Frontend Setup (Next.js + Storybook)

### Prerequisites

- Node.js / npm
- Next.js

### Install & Run

```bash
cd frontend
npm install
npm run dev         # Run frontend
npm run storybook   # Run Storybook at http://localhost:6006
```

---

## 📁 Project Structure

```
Video-AI-Segmenter/
├── backend/                        # FastAPI backend
│   ├── app/
│   │   ├── api/                    # FastAPI endpoints
│   │   ├── schemas/               # Pydantic models
│   │   ├── services/              # Gemini logic
│   │   └── main.py                # FastAPI entrypoint
│   ├── db/
│   │   ├── videos/                # Uploaded videos
│   │   ├── logs/                  # Log files
│   │   └── analysis_results/      # JSON results
│   └── tests/                     # Pytest unit tests
│
├── frontend/                      # Next.js + Tailwind frontend
│   ├── .storybook/                # Storybook config (main.ts, preview.ts)
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── app/                   # Next.js app router
│   │   │   └── videos/[filename]/page.tsx
│   │   ├── components/            # Reusable UI components
│   │   ├── redux/                 # Redux store & slices
│   │   ├── stories/               # Storybook stories (optional global)
│   │   └── utils/                 # Shared frontend logic
│
├── README.md
├── .env
├── package.json / poetry.lock
```

---

## 📘 Storybook Usage

Storybook is used for developing and testing UI components in isolation.

### Run Storybook:

```bash
cd frontend
npm run storybook
```

> Visit [http://localhost:6006](http://localhost:6006)

### Where to write stories:

- Create `*.stories.tsx` under `src/components/**/stories/` or `src/stories/`
- Example: `src/components/admin/stories/AdminPanel.stories.tsx`

### Features:

✅ Component previews with props  
✅ Redux-aware components (via decorators)  
✅ `@storybook/addon-actions` to trace events  
✅ Support for mock APIs / injected dependencies

---

## 📦 Example Output

```json
{
  "time_slot": "00:00 - 00:04",
  "description": "The robot installs a drill bit into a power drill."
}
```

---

## 🔌 Useful API Endpoints

| Endpoint                             | Description                            |
|--------------------------------------|----------------------------------------|
| `POST /upload_video`                 | Upload video to backend                |
| `POST /analyze`                      | Run Gemini to analyze video            |
| `GET /videos/{filename}`            | Serve a specific uploaded video        |
| `GET /list-videos`                  | List all uploaded video filenames      |
| `POST /extract_videos_from_url`     | Extract video links from a webpage     |
| `POST /download_videos_from_links`  | Download selected video links          |

---

## 📄 License

MIT © 2025 [Runchuan Feng](https://github.com/Runchuan-BU)