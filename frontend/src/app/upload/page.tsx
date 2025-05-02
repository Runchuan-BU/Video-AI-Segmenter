// src/app/upload/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [link, setLink] = useState('');
  const [videos, setVideos] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const router = useRouter();

  const showToast = (message: string, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/upload_video', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploaded(true);
        showToast('✅ Video uploaded successfully!');
      } else {
        showToast('❌ Upload failed.');
      }
    } catch (err) {
      showToast('❌ Upload error.');
    }
  };

  const handleExtractFromLink = async () => {
    if (!link) return;
    const res = await fetch(`http://localhost:8000/extract_videos_from_url?url=${encodeURIComponent(link)}`);
    const data = await res.json();
    setVideos(data.videos || []);
    setSelected(new Set());
  };

  const handleToggle = (url: string) => {
    const newSet = new Set(selected);
    newSet.has(url) ? newSet.delete(url) : newSet.add(url);
    setSelected(newSet);
  };

  const handleDownloadSelected = async () => {
    if (selected.size === 0) return;

    const res = await fetch('http://localhost:8000/download_videos_from_links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ links: Array.from(selected) }),
    });

    if (res.ok) {
      showToast('✅ Videos downloaded successfully!');
      setVideos([]);
      setSelected(new Set());
    } else {
      showToast('❌ Download failed.');
    }
  };

  const reset = () => {
    setFile(null);
    setUploaded(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">📤 Upload or Extract Videos</h2>

        {/* Upload from local file */}
        {!uploaded ? (
          <>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              onClick={handleUpload}
              disabled={!file}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              🚀 Upload & Save
            </button>
          </>
        ) : (
          <>
            <p className="text-green-600 font-medium">✅ Upload successful!</p>
            <button
              onClick={reset}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              ➕ Upload Another
            </button>
          </>
        )}

        <hr className="my-4" />

        {/* Extract from link */}
        <div>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter a URL containing videos"
            className="w-full border px-4 py-2 rounded mb-2"
          />
          <button
            onClick={handleExtractFromLink}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            🔍 Extract Videos from Link
          </button>
        </div>

        {/* Show extracted video list */}
        {videos.length > 0 && (
          <div className="text-left max-h-80 overflow-y-auto border rounded p-4 space-y-2">
            {videos.map((v) => (
              <label key={v} className="flex items-center gap-2">
                <input type="checkbox" checked={selected.has(v)} onChange={() => handleToggle(v)} />
                <a href={v} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">
                  {v}
                </a>
              </label>
            ))}
            <button
              onClick={handleDownloadSelected}
              className="mt-4 w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
            >
              💾 Download Selected Videos
            </button>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg         hover:bg-gray-300 transition"
          >
            ⬅️ Back to Home
          </button>
          <button
            onClick={() => router.push('/videos')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg         hover:bg-blue-700 transition"
          >
            📺 Go to Video List
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-md z-50">
          {toast}
        </div>
      )}
    </main>
  );
}