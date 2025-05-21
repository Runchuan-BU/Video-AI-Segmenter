// src/app/videos/[filename]/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import VideoPlayer from '@/components/video/VideoPlayer';
import ActionButtons from '@/components/ui/ActionButtons';
import ModelSelector from '@/components/video/ModelSelector';
import AnalysisTable from '@/components/video/AnalysisTable';

// Define types
type Segment = { time_slot: string; description: string };
type AnalysisResult = Segment[] | string | { error: string } | null;

export default function VideoDetailPage() {
  const router = useRouter();
  const { filename } = useParams();
  const resolvedFilename = Array.isArray(filename) ? filename[0] : filename;
  const role = useSelector((state: RootState) => state.role);

  const [analysis, setAnalysis] = useState<AnalysisResult>(null);
  const [editedAnalysis, setEditedAnalysis] = useState<Segment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [selectedModel, setSelectedModel] = useState('GEMINI-2.0-FLASH');
  const analysisCache = useRef<Record<string, AnalysisResult>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const MODEL_OPTIONS = [
    'GEMINI-2.0-FLASH',
    'GEMINI-2.0-FLASH-LITE',
    'GEMINI-1.5-PRO',
  ];

  const handleAnalyze = async () => {
    if (!filename) return;

    setLoading(true);
    setAnalysis(null);
    setShowError(false);
    setHasAnalyzed(true);

    const timeoutId = setTimeout(() => setShowError(true), 120_000);

    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filepath: filename, model: selectedModel }),
      });

      const data = await res.json();
      let result: AnalysisResult;

      if (!res.ok || !data.results || !data.results.results) {
        result = { error: data.message || 'Analysis failed' };
      } else {
        try {
          const raw = data.results.results;
          result = typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch (err) {
          result = { error: 'Failed to parse nested results' };
        }
      }

      analysisCache.current[filename as string] = result;
      setAnalysis(result);
      setEditedAnalysis(Array.isArray(result) ? [...result] : null);
    } catch (err: any) {
      const errorObj = { error: err.message || 'Unknown error' };
      analysisCache.current[filename as string] = errorObj;
      setAnalysis(errorObj);
    } finally {
      setLoading(false);
      clearTimeout(timeoutId);
    }
  };

  const handleCopy = () => {
    if (!editedAnalysis) return;
    const text = JSON.stringify(editedAnalysis, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Analysis result copied to clipboard');
    });
  };

  const handleSave = async () => {
    if (!editedAnalysis || !filename) return;
    const res = await fetch('http://localhost:8000/save-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, results: editedAnalysis }),
    });

    if (res.ok) {
      alert('✅ Saved successfully!');
    } else {
      alert('❌ Save failed.');
    }
  };

  const updateSegment = (index: number, field: 'time_slot' | 'description', value: string) => {
    if (!editedAnalysis) return;
    const updated = [...editedAnalysis];
    updated[index] = { ...updated[index], [field]: value };
    setEditedAnalysis(updated);
  };

  if (!['annotator', 'reviewer', 'admin'].includes(role)) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-yellow-50 p-4">
        <div className="text-gray-700 text-lg">🔒 Invalid role: {role}</div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-yellow-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎞️ {filename}</h2>
        {resolvedFilename && <VideoPlayer videoRef={videoRef} filename={resolvedFilename} />}

        <ModelSelector
          options={MODEL_OPTIONS}
          value={selectedModel}
          onChange={setSelectedModel}
        />

        {!hasAnalyzed && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleAnalyze}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >🧠 Start Analysis</button>
            <button
              onClick={() => router.push('/videos')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >⬅️ Back to Video List</button>
          </div>
        )}

        {hasAnalyzed && (
          <>
            <div className="text-left mt-6">
              <h3 className="font-semibold mb-2">🧠 Analysis Result:</h3>
              {loading ? (
                <p>Loading...</p>
              ) : editedAnalysis ? (
                <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">🕒 Time Slot</th>
                      <th className="border border-gray-300 px-4 py-2">📋 Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedAnalysis.map((item, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-1">
                          {role === 'annotator' ? (
                            <input
                              type="text"
                              value={item.time_slot}
                              onChange={(e) => updateSegment(index, 'time_slot', e.target.value)}
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            item.time_slot
                          )}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {role === 'annotator' ? (
                            <textarea
                              value={item.description}
                              onChange={(e) => updateSegment(index, 'description', e.target.value)}
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            item.description
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No editable result.</p>
              )}
            </div>

            {role === 'annotator' && (
              <div className="mt-6 flex justify-center gap-4">
                <ActionButtons
                  buttons={[
                    {
                      icon: '💾',
                      label: 'Save Result',
                      onClick: handleSave,
                      color: 'blue',
                    },
                    {
                      icon: '📋',
                      label: 'Copy',
                      onClick: handleCopy,
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
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
