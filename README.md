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
```



Then run the backend server:

```bash
cd app
uvicorn app.main:app --reload
```

> By default it runs on `http://localhost:8000`

---

## 💻 Frontend Setup (Next.js)

### Prerequisites

- Next.js 
- npm

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

> Open in browser: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Video-AI-Segmenter/
├── backend/               # FastAPI backend
│   ├── videos/            # Uploaded video files
│   └── app/
│       ├── main.py
│       └── services/
│           └── ai_model_gemini.py
├── frontend/              # Next.js frontend
│   └── src/app/
│       ├── page.tsx
│       ├── upload/
│       │   └── page.tsx
│       └── videos/
│           ├── page.tsx
│           └── [filename]/page.tsx


```

---

## 📦 Example Output

```json
{
  "time_slot": "00:00 - 00:04",
  "description": "The robot installs a drill bit into a power drill."
}
```

---

## 🧪 Useful Endpoints

- `POST /upload_video` – Upload a video
- `POST /analyze` – Run Gemini to analyze the video
- `GET /videos/{filename}` – Serve static video
- `GET /list-videos` – List all uploaded video filenames

---

## 📄 License

MIT © 2025 [Runchuan Feng](https://github.com/Runchuan-BU)