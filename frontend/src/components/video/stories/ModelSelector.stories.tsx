// src/components/video/stories/ModelSelector.stories.tsx

// src/components/video/stories/ModelSelector.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import ModelSelector from '../ModelSelector';

const meta: Meta<typeof ModelSelector> = {
  title: 'Video/ModelSelector',
  component: ModelSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Interactive: Story = {
  render: () => {
    const [model, setModel] = useState('GEMINI-2.0-FLASH');
    const handleChange = (val: string) => {
      action('model changed')(val); 
      setModel(val); 
    };

    return (
      <ModelSelector
        options={['GEMINI-2.0-FLASH', 'GEMINI-2.0-FLASH-LITE', 'GEMINI-1.5-PRO']}
        value={model}
        onChange={handleChange}
      />
    );
  },
};