// src/components/admin/stories/LinkExtractor.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import LinkExtractor from '../LinkExtractor';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof LinkExtractor> = {
  title: 'Admin/LinkExtractor',
  component: LinkExtractor,
};
export default meta;

type Story = StoryObj<typeof LinkExtractor>;

export const Default: Story = {
  render: () => {
    const [link, setLink] = useState('https://tonyzhaozh.github.io/aloha/');
    
    return (
      <LinkExtractor
        link={link}
        setLink={(val) => {
          setLink(val);
          action('Link changed')(val);
        }}
        setVideos={(videos) => {
          action('Videos extracted')(videos);
        }}
        showToast={(msg) => {
          action('Toast')(msg);
        }}
      />
    );
  },
};