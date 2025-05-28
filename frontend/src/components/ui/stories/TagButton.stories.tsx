// src/components/ui/TagButton.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TagButton from '../TagButton';

const meta: Meta<typeof TagButton> = {
  title: 'UI/TagButton',
  component: TagButton,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'select',
      options: [
        'issue', 'good', 'unclear', 'typo', 'long',
        'short', 'missing', 'duplicate', 'confusing', 'wrong',
      ],
    },
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TagButton>;

export const Default: Story = {
  args: {
    tag: 'issue',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    tag: 'good',
    selected: true,
  },
};

export const AllTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {[
        'issue', 'good', 'unclear', 'typo', 'long',
        'short', 'missing', 'duplicate', 'confusing', 'wrong',
      ].map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          selected={false}
          onClick={action(`Clicked tag: ${tag}`)}
        />
      ))}
    </div>
  ),
};