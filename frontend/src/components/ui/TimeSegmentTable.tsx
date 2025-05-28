// src/components/ui/TimeSegmentTable.tsx

'use client';

import { Segment } from '@/utils/analysisHelpers';
import { useRef } from 'react';

interface Props {
  segments: Segment[];
  isEditable?: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onUpdateSegment?: (
    index: number,
    field: 'time_slot' | 'description' | 'add' | 'delete',
    value: string
  ) => void;
  onAddSegment?: () => void;
  onClickSegment?: (index: number, timeInSeconds: number) => void;
}

export default function TimeSegmentTable({
  segments,
  isEditable = false,
  videoRef,
  onUpdateSegment,
  onAddSegment,
  onClickSegment, 
}: Props) {
  const parseStartTime = (slot: string): number => {
    const start = slot.split('-')[0]?.trim(); // "00:01"
    const [minStr, secStr] = start.split(':');
    const min = parseInt(minStr, 10);
    const sec = parseInt(secStr, 10);
    if (isNaN(min) || isNaN(sec)) return 0;
    return min * 60 + sec;
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">🕒 Time Slot</th>
          <th className="border border-gray-300 px-4 py-2">📋 Description</th>
          {isEditable && (
            <th className="border border-gray-300 px-2 py-2 text-center">🗑️</th>
          )}
        </tr>
      </thead>
      <tbody>
        {segments.map((seg, i) => (
          <tr
            key={i}
            className={`even:bg-gray-50 ${
              !isEditable ? 'cursor-pointer hover:bg-yellow-100' : ''
            }`}
            onClick={() => {
              if (!isEditable && videoRef.current) {
                const seconds = parseStartTime(seg.time_slot);
                videoRef.current.currentTime = seconds;

                // ✅ 新增：触发外部监听器
                onClickSegment?.(i, seconds);
              }
            }}
          >
            <td className="border border-gray-300 px-2 py-1">
              {isEditable ? (
                <input
                  type="text"
                  value={seg.time_slot}
                  onChange={(e) =>
                    onUpdateSegment?.(i, 'time_slot', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                seg.time_slot
              )}
            </td>
            <td className="border border-gray-300 px-2 py-1">
              {isEditable ? (
                <textarea
                  value={seg.description}
                  onChange={(e) =>
                    onUpdateSegment?.(i, 'description', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                seg.description
              )}
            </td>
            {isEditable && (
              <td className="border border-gray-300 px-2 py-1 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateSegment?.(i, 'delete', '');
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </td>
            )}
          </tr>
        ))}

        {isEditable && onAddSegment && (
          <tr
            className="hover:bg-gray-100 cursor-pointer border-t border-dashed transition"
            onClick={onAddSegment}
          >
            <td colSpan={3} className="px-4 py-3 text-center text-blue-600 hover:underline">
              ➕ Add New Segment
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
