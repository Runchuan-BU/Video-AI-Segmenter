import TagButton from '../TagButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TagButton> = {
  title: 'UI/TagButton',
  component: TagButton,
  tags: ['autodocs'],
  argTypes: {
    tagColor: {
      control: 'select',
      options: [
        'issue', 'good', 'unclear', 'typo', 'long',
        'short', 'missing', 'duplicate', 'confusing', 'wrong',
      ],
    },
    selected: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TagButton>;

export const Default: Story = {
  args: {
    tag: 'issue',
    tagColor: 'issue',
    selected: false,
    onClick: () => alert('Clicked tag: issue'),
  },
};

export const Selected: Story = {
  args: {
    tag: 'good',
    tagColor: 'good',
    selected: true,
    onClick: () => alert('Clicked tag: good'),
  },
};

export const AllTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[
        'issue', 'good', 'unclear', 'typo', 'long',
        'short', 'missing', 'duplicate', 'confusing', 'wrong',
      ].map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          tagColor={tag}
          selected={false}
          onClick={() => alert(`Clicked tag: ${tag}`)}
        />
      ))}
    </div>
  ),
};