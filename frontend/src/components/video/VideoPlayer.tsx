// components/video/VideoPlayer.tsx

'use client';
import React from 'react';

type Props = {
  filename: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;

  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
};

export default function VideoPlayer({
  filename,
  videoRef,
  onPlay,
  onPause,
  onTimeUpdate,
  onVolumeChange,
  onEnded,
  onError,
}: Props) {
  return (
    <video
      ref={videoRef}
      src={`http://localhost:8000/videos/${filename}`}
      controls
      className="w-full max-h-[480px] rounded mb-6"
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime)}
      onVolumeChange={(e) => onVolumeChange?.(e.currentTarget.volume)}
      onError={(e) =>
        onError?.(
          `Video failed to load: ${e.currentTarget.error?.message || 'Unknown error'}`
        )
      }
    />
  );
}