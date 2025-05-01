// src/app/upload/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();

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
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Upload error');
    }
  };

  const reset = () => {
    setFile(null);
    setUploaded(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📤 Upload New Video</h2>

        {!uploaded ? (
          <>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mb-4 w-full text-sm"
            />

            <div className="flex flex-col gap-4">
              <button
                onClick={handleUpload}
                disabled={!file}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                🚀 Upload & Save
              </button>

              <button
                onClick={() => router.push('/')}
                className="text-sm text-gray-500 underline"
              >
                ⬅️ Back to Home
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-6 text-green-600 font-medium">✅ Upload successful!</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                ➕ Upload Another
              </button>

              <button
                onClick={() => router.push('/videos')}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                📺 Go to Video List
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}