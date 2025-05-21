// src/app/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import RoleToolbar from '../components/role/RoleToolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Home() {
  const role = useSelector((state: RootState) => state.role);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 space-y-6">
      <RoleToolbar />

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🎥 Video-AI-Segmenter</h1>
        <p className="text-gray-600 mb-4">Current Role: <strong className="text-indigo-600">{role}</strong></p>

        <div className="flex flex-col gap-4">
          <Link href="/admin">
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