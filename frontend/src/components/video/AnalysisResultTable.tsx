// src/components/video/AnalysisResultTable.tsx

'use client';

import { Segment } from '@/utils/analysisHelpers';
import { useRouter } from 'next/navigation';
import ActionButtons from '@/components/ui/ActionButtons';
import TimeSegmentTable from '@/components/ui/TimeSegmentTable';
import { useState } from 'react';

interface Props {
  editedAnalysis: Segment[] | null;
  loading: boolean;
  isEditing: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onUpdateSegment?: (
    index: number,
    field: 'time_slot' | 'description' | 'add' | 'delete',
    value: string
  ) => void;
  onSave?: () => void;
  onCopy?: () => void;
  onToggleEdit?: () => void;
}

export default function AnalysisResultTable({
  editedAnalysis,
  loading,
  isEditing,
  videoRef,
  onUpdateSegment,
  onSave,
  onCopy,
  onToggleEdit,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const parseTime = (str: string): number => {
    const [min, sec] = str.split(':').map(Number);
    return isNaN(min) || isNaN(sec) ? 0 : min * 60 + sec;
  };

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handleAddSegment = () => {
    if (!editedAnalysis || !videoRef.current) return;

    const lastSegment = editedAnalysis[editedAnalysis.length - 1];
    const lastEndTimeStr = lastSegment.time_slot.split('-')[1]?.trim();
    const lastEnd = parseTime(lastEndTimeStr || '00:00');

    const videoDuration = Math.floor(videoRef.current.duration);
    if (lastEnd >= videoDuration) {
      alert('⚠️ Cannot add segment beyond video duration');
      return;
    }

    const nextEnd = Math.min(lastEnd + 5, videoDuration);
    const newSegment: Segment = {
      time_slot: `${formatTime(lastEnd)} - ${formatTime(nextEnd)}`,
      description: '',
    };
    onUpdateSegment?.(editedAnalysis.length, 'add', JSON.stringify(newSegment));
  };

  const validateBeforeSave = (): boolean => {
    if (!editedAnalysis || !videoRef.current) return false;

    const duration = Math.floor(videoRef.current.duration);

    for (let i = 0; i < editedAnalysis.length; i++) {
      const segment = editedAnalysis[i];
      const [startStr, endStr] = segment.time_slot.split('-').map((s) => s.trim());
      const start = parseTime(startStr);
      const end = parseTime(endStr);

      if (!segment.description.trim()) {
        setError(`Segment ${i + 1} description cannot be empty.`);
        return false;
      }

      if (end > duration) {
        setError(`Segment ${i + 1} end time exceeds video duration.`);
        return false;
      }

      if (start >= end) {
        setError(`Segment ${i + 1} start time must be less than end time.`);
        return false;
      }

      // if (i > 0) {
      //   const prevEndStr = editedAnalysis[i - 1].time_slot.split('-')[1].trim();
      //   const prevEnd = parseTime(prevEndStr);
      //   if (start !== prevEnd) {
      //     setError(`Segment ${i + 1} must start from ${formatTime(prevEnd)}.`);
      //     return false;
      //   }
      // }
    }

    setError(null);
    return true;
  };

  const handleSafeSave = () => {
    if (validateBeforeSave()) {
      onSave?.();
    }
  };

  return (
    <div className="text-left mt-6">
      <h3 className="font-semibold mb-2">🧠 Analysis Result:</h3>

      {error && <p className="text-red-600 mb-2">❌ {error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : editedAnalysis ? (
        <>
          <TimeSegmentTable
            segments={editedAnalysis}
            isEditable={isEditing}
            videoRef={videoRef}
            onUpdateSegment={onUpdateSegment}
            onAddSegment={handleAddSegment}
          />

          <div className="mt-6 flex flex-col items-center gap-4">
            <ActionButtons
              buttons={[
                {
                  icon: isEditing ? '✅' : '✏️',
                  label: isEditing ? 'Confirm Edit' : 'Edit',
                  onClick: onToggleEdit || (() => {}),
                  color: isEditing ? 'green' : 'blue',
                },
              ]}
            />

            {onSave && onCopy && (
              <ActionButtons
                buttons={[
                  {
                    icon: '💾',
                    label: 'Save Result',
                    onClick: handleSafeSave,
                    color: 'blue',
                  },
                  {
                    icon: '📋',
                    label: 'Copy',
                    onClick: onCopy,
                    color: 'green',
                  },
                  {
                    icon: '⬅️',
                    label: 'Back',
                    onClick: () => router.push('/videos'),
                    color: 'gray',
                  },
                ]}
              />
            )}
          </div>
        </>
      ) : (
        <p>No editable result.</p>
      )}
    </div>
  );
}