// src/components/role/stories/RoleToolbar.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import RoleToolbar from '../RoleToolbar';
import { action } from '@storybook/addon-actions';
import { useEffect } from 'react';

const meta: Meta<typeof RoleToolbar> = {
  title: 'Role/RoleToolbar',
  component: RoleToolbar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoleToolbar>;

export const Default: Story = {
  render: () => {
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        action('Role changed')(state.role);
      });
      return () => unsubscribe();
    }, []);

    return <RoleToolbar />;
  },
};