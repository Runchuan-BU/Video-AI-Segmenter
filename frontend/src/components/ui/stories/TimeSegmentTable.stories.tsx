import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import TimeSegmentTable from '../TimeSegmentTable';
import { Segment } from '@/utils/analysisHelpers';

const meta: Meta<typeof TimeSegmentTable> = {
  title: 'UI/TimeSegmentTable',
  component: TimeSegmentTable,
  tags: ['autodocs'],
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
    return (
      <div className="p-4 max-w-3xl">
        <TimeSegmentTable
          segments={mockSegments}
          isEditable={false}
          videoRef={dummyRef}
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