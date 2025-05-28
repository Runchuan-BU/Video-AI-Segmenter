// components/video/VideoListItem.tsx

'use client';

import Link from 'next/link';

type Props = {
  filename: string;
  onClick?: () => void; 
};

export default function VideoListItem({ filename, onClick }: Props) {
  return (
    <Link href={`/videos/${encodeURIComponent(filename)}`}>
      <span
        className="block text-blue-600 hover:underline cursor-pointer"
        onClick={onClick} 
      >
        🎬 {filename}
      </span>
    </Link>
  );
}