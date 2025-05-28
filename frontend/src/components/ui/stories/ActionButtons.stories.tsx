// src/components/ui/stories/ActionButtons.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import ActionButtons from '../ActionButtons';
import { action } from '@storybook/addon-actions';

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
        onClick: action('Back clicked'),
      },
      {
        label: 'Save',
        icon: '💾',
        color: 'blue',
        onClick: action('Save clicked'),
      },
      {
        label: 'Confirm',
        icon: '✅',
        color: 'green',
        onClick: action('Confirm clicked'),
      },
      {
        label: 'Delete',
        icon: '🗑️',
        color: 'red',
        onClick: action('Delete clicked'),
      },
    ],
  },
};