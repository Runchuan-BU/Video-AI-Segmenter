// src/components/admin/stories/FileUploader.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import FileUploader from '../FileUploader';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FileUploader> = {
  title: 'Admin/FileUploader',
  component: FileUploader,
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState(false);

    return (
      <FileUploader
        file={file}
        setFile={(f) => {
          setFile(f);
          action('File selected')(f?.name || 'none');
        }}
        uploaded={uploaded}
        setUploaded={(u) => {
          setUploaded(u);
          action('Upload status changed')(u);
        }}
        showToast={(msg) => {
          action('Toast')(msg);
        }}
      />
    );
  },
};