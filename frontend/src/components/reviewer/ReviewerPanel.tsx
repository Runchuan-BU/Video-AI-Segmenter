// src/components/reviewer/ReviewerPanel.tsx

'use client';

import { useEffect, useState, useRef } from 'react';
import TimeSegmentTable from '@/components/ui/TimeSegmentTable';
import { Segment } from '@/utils/analysisHelpers';
import TagSelector from '@/components/ui/TagSelector';
import ActionButtons from '@/components/ui/ActionButtons';
import TagButton from '@/components/ui/TagButton';
import {
  fetchAnalysisVersions,
  fetchAnalysisByTimestamp,
  postAnalysisComment,
} from '@/utils/reviewerHelpers';

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

export default function ReviewerPanel({
  filename,
  videoRef,
}: {
  filename: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [versions, setVersions] = useState<AnalysisVersion[]>([]);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchAnalysisVersions(filename).then((versions) => setVersions(versions));
  }, [filename]);

  const handleSelectVersion = async (timestamp: string) => {
    const data = await fetchAnalysisByTimestamp(filename, timestamp);
    setSelected(data);
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      setError('⚠️ Please enter a comment.');
      return;
    }
    if (!selected) return;
    const newComment = { content: comment, tags };
    await postAnalysisComment(filename, selected.timestamp, newComment);
    setSelected({
      ...selected,
      comments: [...selected.comments, newComment],
    });
    setComment('');
    setTags([]);
    setError('');
  };

  return (
    <div className="mt-6 text-left">
      <h3 className="font-bold mb-2">📜 Analysis History</h3>
      <ul className="mb-4 space-y-1">
        {versions.map((v) => (
          <li
            key={v.timestamp}
            onClick={() => handleSelectVersion(v.timestamp)}
            className="cursor-pointer hover:underline !text-blue-700"
          >
            🕒 {v.timestamp}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold mb-2">📋 Results at {selected.timestamp}</h4>
          
          <TimeSegmentTable
            segments={selected.results}
            isEditable={false}
            videoRef={videoRef}
          /> 

          <div className="mt-6">
            <h5 className="font-medium mb-2">🗨️ Comments</h5>
            <ul className="space-y-2 text-sm text-gray-700">
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
                  <p className="text-sm text-gray-800 leading-snug ml-1">{c.content}</p>
                </div>
                <div className="mt-2 w-8/11 mx-auto border-t border-gray-200"></div>
              </li>
            ))}
            </ul>

            <div className="mt-6 text-left max-w-2xl w-full mx-auto">
              <div className="w-full overflow-hidden">
                <TagSelector selectedTags={tags} onChange={setTags} />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-2"
                placeholder="Add a comment..."
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <ActionButtons
                buttons={[
                  {
                    icon: '➕',
                    label: 'Add Comment',
                    onClick: handleAddComment,
                    color: 'blue',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

