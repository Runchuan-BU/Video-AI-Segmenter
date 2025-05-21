// components/video/VideoListItem.tsx

'use client';

import Link from 'next/link';

type Props = {
  filename: string;
};

export default function VideoListItem({ filename }: Props) {
  return (
    <Link href={`/videos/${encodeURIComponent(filename)}`}>
      <span className="block text-blue-600 hover:underline cursor-pointer">
        🎬 {filename}
      </span>
    </Link>
  );
}