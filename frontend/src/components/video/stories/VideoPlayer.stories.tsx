// src/components/video/stories/VideoPlayer.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { createRef } from 'react';
import VideoPlayer from '@/components/video/VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Video/VideoPlayer',
  component: VideoPlayer,
};
export default meta;

type Story = StoryObj<typeof VideoPlayer>;

const videoRef = createRef<HTMLVideoElement>();

export const Default: Story = {
  render: () => (
    <VideoPlayer
      filename="sample_video.mp4"
      videoRef={videoRef}
      onPlay={action('▶️ Playing')}
      onPause={action('⏸️ Paused')}
      onTimeUpdate={(t) => action('⏱️ Time Update')(t.toFixed(2))}
      onVolumeChange={(v) => action('🔉 Volume Change')(v.toFixed(2))}
      onEnded={action('🎞️ Video Ended')}
      onError={(err) => action('❌ Error')(String(err))}
    />
  ),
};