// src/components/ui/stories/TimeSegmentTable.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import TimeSegmentTable from '../TimeSegmentTable';
import { Segment } from '@/utils/analysisHelpers';

const meta: Meta<typeof TimeSegmentTable> = {
  title: 'UI/TimeSegmentTable',
  component: TimeSegmentTable,
  tags: ['autodocs'],
  argTypes: {
    onUpdateSegment: { action: 'segment updated' },
    onAddSegment: { action: 'segment added' },
  },
};

export default meta;
type Story = StoryObj<typeof TimeSegmentTable>;

const mockSegments: Segment[] = [
  { time_slot: '00:01 - 00:04', description: 'A green toy is placed next to a battery' },
  { time_slot: '00:06 - 00:08', description: 'A robotic arm places a battery in a slot' },
  { time_slot: '00:08 - 00:14', description: 'A variety of toys are placed around the robotic arms' },
];

export const ReadOnly: Story = {
  render: () => {
    const dummyRef = useRef<HTMLVideoElement>(null);
    const logClick = action('segment clicked');

    return (
      <div className="p-4 max-w-3xl">
        <video ref={dummyRef} style={{ display: 'none' }} />

        <TimeSegmentTable
          segments={mockSegments}
          isEditable={false}
          videoRef={dummyRef}
          onClickSegment={(index, seconds) => {
            logClick({ index, seconds });
          }}
        />
      </div>
    );
  },
};

export const Editable: Story = {
  render: () => {
    const [segments, setSegments] = useState<Segment[]>(mockSegments);
    const dummyRef = useRef<HTMLVideoElement>(null);

    const handleUpdate = (
      index: number,
      field: 'time_slot' | 'description' | 'add' | 'delete',
      value: string
    ) => {
      action('segment updated')({ index, field, value }); // log to Storybook

      const updated = [...segments];
      if (field === 'delete') {
        updated.splice(index, 1);
      } else if (field === 'add') {
        updated.push(JSON.parse(value));
      } else {
        updated[index] = {
          ...updated[index],
          [field]: value,
        };
      }
      setSegments(updated);
    };

    const handleAdd = () => {
      action('segment added')(); // log to Storybook

      setSegments([
        ...segments,
        { time_slot: '00:14 - 00:18', description: 'New segment' },
      ]);
    };

    return (
      <div className="p-4 max-w-3xl">
        <TimeSegmentTable
          segments={segments}
          isEditable={true}
          videoRef={dummyRef}
          onUpdateSegment={handleUpdate}
          onAddSegment={handleAdd}
        />
      </div>
    );
  },
};