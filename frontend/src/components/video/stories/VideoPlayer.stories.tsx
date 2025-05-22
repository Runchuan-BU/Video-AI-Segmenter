// src/components/video/stories/VideoPlayer.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import VideoPlayer from '@/components/video/VideoPlayer';
import { createRef } from 'react';

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
    />
  ),
};