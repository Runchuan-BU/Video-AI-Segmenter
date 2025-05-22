// src/components/admin/stories/AdminPanel.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import AdminPanel from '../AdminPanel';
import { createRef } from 'react';

const meta: Meta<typeof AdminPanel> = {
  title: 'Admin/AdminPanel',
  component: AdminPanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AdminPanel>;

const mockVideoRef = createRef<HTMLVideoElement>();

export const Default: Story = {
  render: () => (
    <AdminPanel
      filename="sample_video.mp4"
      videoRef={mockVideoRef as React.RefObject<HTMLVideoElement | null>}
    />
  ),
};