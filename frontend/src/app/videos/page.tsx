// src/app/videos/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VideoListPage() {
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/list-videos')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">📂 Uploaded Videos</h1>

        <ul className="space-y-3">
          {videos.map((filename) => (
            <li key={filename}>
              <Link href={`/videos/${encodeURIComponent(filename)}`}>
                <span className="block text-blue-600 hover:underline cursor-pointer">
                  🎬 {filename}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <Link href="/">
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
              ⬅️ Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}