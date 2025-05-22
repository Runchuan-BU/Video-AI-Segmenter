// src/app/page.tsx

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RoleToolbar from '../components/role/RoleToolbar';
import ActionButtons from '../components/ui/ActionButtons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const role = useSelector((state: RootState) => state.role);
  const router = useRouter();

  const buttons = [
    ...(role === 'admin'
      ? [
          {
            label: 'Upload New Video',
            icon: '⬆️',
            onClick: () => router.push('/admin?role=${role}'),
            color: 'green' as const,
          },
        ]
      : []),
    {
      label: 'View Uploaded Videos',
      icon: '📺',
      onClick: () => router.push('/videos?role=${role}'),
      color: 'blue' as const,
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 space-y-6">
      <RoleToolbar />

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🎥 Video-AI-Segmenter</h1>
        <p className="text-gray-600 mb-4">
          Current Role: <strong className="text-indigo-600">{role}</strong>
        </p>

        <ActionButtons buttons={buttons} />
      </div>
    </main>
  );
}