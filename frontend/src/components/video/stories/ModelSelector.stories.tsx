// src/components/video/stories/ModelSelector.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import ModelSelector from '../ModelSelector';

const meta: Meta<typeof ModelSelector> = {
  title: 'Video/ModelSelector',
  component: ModelSelector,
};

export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Default: Story = {
  args: {
    options: ['GEMINI-2.0-FLASH', 'GEMINI-2.0-FLASH-LITE', 'GEMINI-1.5-PRO'],
    value: 'GEMINI-2.0-FLASH',
    onChange: (val: string) => console.log('Model selected:', val),
  },
};