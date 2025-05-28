// src/components/ui/stories/TagSelector.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import TagSelector from '../TagSelector';

const meta: Meta<typeof TagSelector> = {
  title: 'UI/TagSelector',
  component: TagSelector,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'tags updated' },
  },
};

export default meta;
type Story = StoryObj<typeof TagSelector>;

export const Interactive: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['issue', 'typo']);

    const handleChange = (newTags: string[]) => {
      action('tags updated')(newTags);
      setTags(newTags);
    };

    return (
      <div className="p-4 max-w-md">
        <TagSelector selectedTags={tags} onChange={handleChange} />
        <div className="mt-4 text-sm text-gray-600">
          Selected Tags: {tags.join(', ') || 'None'}
        </div>
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);

    const handleChange = (newTags: string[]) => {
      action('tags updated')(newTags);
      setTags(newTags);
    };

    return (
      <div className="p-4 max-w-md">
        <TagSelector selectedTags={tags} onChange={handleChange} />
        <div className="mt-4 text-sm text-gray-600">
          No tags selected
        </div>
      </div>
    );
  },
};