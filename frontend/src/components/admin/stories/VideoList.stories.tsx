// src/components/admin/stories/VideoList.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VideoList from '../VideoList';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof VideoList> = {
  title: 'Admin/VideoList',
  component: VideoList,
};

export default meta;
type Story = StoryObj<typeof VideoList>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    return (
      <VideoList
        videos={[
          'https://example.com/video1.mp4',
          'https://example.com/video2.mp4',
          'https://example.com/video3.mp4',
        ]}
        selected={selected}
        setSelected={(newSet) => {
          setSelected(newSet);
          action('Selected videos updated')(Array.from(newSet));
        }}
        showToast={(msg) => action('Toast')(msg)}
      />
    );
  },
};