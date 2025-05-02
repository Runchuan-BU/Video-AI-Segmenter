// src/app/page.tsx

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🎥 Video-AI-Segmenter</h1>
        <div className="flex flex-col gap-4">
          <Link href="/upload">
            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
              ⬆️ Upload New Video
            </button>
          </Link>
          <Link href="/videos">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              📺 View Uploaded Videos
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}