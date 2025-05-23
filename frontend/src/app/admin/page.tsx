// src/app/admin/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import FileUploader from '@/components/admin/FileUploader';
import LinkExtractor from '@/components/admin/LinkExtractor';
import VideoList from '@/components/admin/VideoList';
import ActionButtons from '@/components/ui/ActionButtons';

export default function AdminPage() {
  const role = useSelector((state: RootState) => state.role);
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

  if (role !== 'admin') {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-red-100 p-4">
        <div className="bg-white text-red-600 rounded-xl shadow p-6 text-lg font-medium">
          ❌ Access denied. Your role <strong className="text-black">{role}</strong> is not authorized to view this page.
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-green-50 p-4">
      <div className="absolute top-4 right-6 text-sm text-gray-600">
        👤 Current Role: <strong className="text-green-700">{role}</strong>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">🛠️ Admin Panel</h2>

        <FileUploader file={file} setFile={setFile} uploaded={uploaded} setUploaded={setUploaded} showToast={showToast} />
        <hr className="my-4" />

        <LinkExtractor link={link} setLink={setLink} setVideos={setVideos} showToast={showToast} />
        <VideoList videos={videos} selected={selected} setSelected={setSelected} showToast={showToast} />

        <ActionButtons
          buttons={[
            {
              label: '⬅️ Back to Home',
              color: 'gray',
              onClick: () => router.push('/'),
            },
            {
              label: '📺 Go to Video List',
              color: 'blue',
              onClick: () => router.push('/videos'),
            },
          ]}
        />
      </div>

      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-md z-50">
          {toast}
        </div>
      )}
    </main>
  );
}