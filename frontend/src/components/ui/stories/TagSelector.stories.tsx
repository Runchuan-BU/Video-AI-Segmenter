import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TagSelector from '../TagSelector';

const meta: Meta<typeof TagSelector> = {
  title: 'UI/TagSelector',
  component: TagSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TagSelector>;

export const Interactive: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['issue', 'typo']);
    return (
      <div className="p-4 max-w-md">
        <TagSelector selectedTags={tags} onChange={setTags} />
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
    return (
      <div className="p-4 max-w-md">
        <TagSelector selectedTags={tags} onChange={setTags} />
        <div className="mt-4 text-sm text-gray-600">
          No tags selected
        </div>
      </div>
    );
  },
};