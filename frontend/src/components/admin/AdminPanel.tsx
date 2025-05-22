// src/components/admin/AdminPanel.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { Segment } from '@/utils/analysisHelpers';
import TagButton from '@/components/ui/TagButton';
import {
  fetchAnalysisVersions,
  fetchAnalysisByTimestamp,
  deleteAnalysisVersion,
  deleteComment,
} from '@/utils/adminHelpers';
import TimeSegmentTable from '@/components/ui/TimeSegmentTable';

interface AnalysisVersion {
  timestamp: string;
  comment_count: number;
}

interface CommentData {
  content: string;
  tags: string[];
}

interface HistoryEntry {
  timestamp: string;
  results: Segment[];
  comments: CommentData[];
}

export default function AdminPanel({
  filename,
  videoRef,
}: {
  filename: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [versions, setVersions] = useState<AnalysisVersion[]>([]);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);

  const deleteButtonClass =
    "text-sm text-red-600 hover:underline px-2 py-1 rounded transition";

  useEffect(() => {
    fetchAnalysisVersions(filename).then(setVersions);
  }, [filename]);

  const handleSelectVersion = async (timestamp: string) => {
    const data = await fetchAnalysisByTimestamp(filename, timestamp);
    setSelected(data);
  };

  const handleDeleteVersion = async (timestamp: string) => {
    await deleteAnalysisVersion(filename, timestamp);
    setSelected(null);
    const refreshed = await fetchAnalysisVersions(filename);
    setVersions(refreshed);
  };

  const handleDeleteComment = async (index: number) => {
    if (!selected) return;
    await deleteComment(filename, selected.timestamp, index);
    const updated = await fetchAnalysisByTimestamp(filename, selected.timestamp);
    setSelected(updated);
  };

  return (
    <div className="mt-6 text-left">
      <h3 className="font-bold mb-2">🛠️ Admin Tools</h3>

      <ul className="mb-4 space-y-1">
        {versions.map((v) => (
          <li key={v.timestamp} className="flex justify-between items-center">
            <span
              onClick={() => handleSelectVersion(v.timestamp)}
              className="cursor-pointer hover:underline text-blue-700"
            >
              🕒 {v.timestamp}
            </span>
            <button
              onClick={() => handleDeleteVersion(v.timestamp)}
              className={deleteButtonClass}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold mb-2">📋 Analysis at {selected.timestamp}</h4>

          <TimeSegmentTable
            segments={selected.results}
            isEditable={false}
            videoRef={videoRef}
          />

          <h5 className="mt-4 font-medium">💬 Comments</h5>

          <ul className="text-sm space-y-1">
            {selected.comments.map((c, i) => (
              <li key={i} className="py-2">
                <div className="flex flex-wrap items-center gap-2 pl-1">
                  {c.tags.map((tag) => (
                    <TagButton
                      key={tag}
                      tag={tag}
                      tagColor={tag}
                      selected={false}
                      onClick={() => {}}
                    />
                  ))}
                  <p className="text-sm text-gray-800 leading-snug ml-1">
                    {c.content}
                  </p>
                </div>

                <div className="mt-2 w-8/11 mx-auto border-t border-gray-200"></div>

                <div className="flex justify-end pr-1 mt-1">
                  <button
                    onClick={() => handleDeleteComment(i)}
                    className={deleteButtonClass}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}