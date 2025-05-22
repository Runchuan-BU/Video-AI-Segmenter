// components/video/VideoPlayer.tsx

'use client';
import React from 'react';

type Props = {
  filename: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

export default function VideoPlayer({ filename, videoRef }: Props) {
  return (
    <video
      ref={videoRef}
      src={`http://localhost:8000/videos/${filename}`}
      controls
      className="w-full max-h-[480px] rounded mb-6"
    />
  );
}