'use client';
import React from 'react';

type Segment = { time_slot: string; description: string };

type Props = {
  segments: Segment[];
  onJumpToTime?: (seconds: number) => void;
};

export default function AnalysisTable({ segments, onJumpToTime }: Props) {
  const parseStartTime = (slot: string): number => {
    const match = slot.trim().split(' ')[0].match(/^(\d{2}):(\d{2})$/);
    if (!match) return 0;
    const [, min, sec] = match;
    return parseInt(min, 10) * 60 + parseInt(sec, 10);
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">🕒 Time Slot</th>
          <th className="border border-gray-300 px-4 py-2">📋 Description</th>
        </tr>
      </thead>
      <tbody>
        {segments.map((item, index) => (
          <tr
            key={index}
            className="even:bg-gray-50 cursor-pointer hover:bg-yellow-100 transition"
            onClick={() => {
              if (onJumpToTime) onJumpToTime(parseStartTime(item.time_slot));
            }}
          >
            <td className="border border-gray-300 px-4 py-2">{item.time_slot}</td>
            <td className="border border-gray-300 px-4 py-2">{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}