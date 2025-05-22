// src/components/ui/stories/ActionButtons.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import ActionButtons from '../ActionButtons';

const meta: Meta<typeof ActionButtons> = {
  title: 'UI/ActionButtons',
  component: ActionButtons,
};

export default meta;

type Story = StoryObj<typeof ActionButtons>;

export const Default: Story = {
  args: {
    buttons: [
      {
        label: 'Back',
        icon: '⬅️',
        color: 'gray',
        onClick: () => alert('Back clicked'),
      },
      {
        label: 'Save',
        icon: '💾',
        color: 'blue',
        onClick: () => alert('Save clicked'),
      },
      {
        label: 'Confirm',
        icon: '✅',
        color: 'green',
        onClick: () => alert('Confirm clicked'),
      },
      {
        label: 'Delete',
        icon: '🗑️',
        color: 'red',
        onClick: () => alert('Delete clicked'),
      },
    ],
  },
};