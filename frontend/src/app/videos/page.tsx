// src/app/videos/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import VideoListItem from '@/components/video/VideoListItem';

export default function VideoListPage() {
  const [videos, setVideos] = useState<string[]>([]);
  const role = useSelector((state: RootState) => state.role);

  useEffect(() => {
    fetch('http://localhost:8000/list-videos')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-4">
      <div className="absolute top-4 right-6 text-sm text-gray-600">
          👤 Current Role: <strong className="text-indigo-700">{role}</strong>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">📂 Uploaded Videos</h1>

        <ul className="space-y-3">
          {videos.map((filename) => (
            <li key={filename}>
              <VideoListItem filename={filename} />
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