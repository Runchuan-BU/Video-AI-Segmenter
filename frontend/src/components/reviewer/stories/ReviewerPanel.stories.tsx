// src/components/video/stories/ReviewerPanel.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import ReviewerPanel from '../ReviewerPanel';
import { RefObject, createRef } from 'react';

const meta: Meta<typeof ReviewerPanel> = {
  title: 'Video/ReviewerPanel',
  component: ReviewerPanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ReviewerPanel>;

const mockVideoRef: RefObject<HTMLVideoElement | null> = createRef();

export const Default: Story = {
  render: () => <ReviewerPanel filename="sample_video.mp4" videoRef={mockVideoRef} />,
};
