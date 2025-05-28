// src/components/video/stories/VideoListItem.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import VideoListItem from '../VideoListItem';

const meta: Meta<typeof VideoListItem> = {
  title: 'Video/VideoListItem',
  component: VideoListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VideoListItem>;

export const Default: Story = {
  args: {
    filename: 'sample_video.mp4',
    onClick: action('item clicked'), // ✅ Action 显示点击事件
  },
};