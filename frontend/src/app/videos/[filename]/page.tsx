// src/app/videos/[filename]/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type Segment = { time_slot: string; description: string };
type AnalysisResult = Segment[] | string | { error: string } | null;

export default function VideoDetailPage() {
  const router = useRouter();
  const { filename } = useParams();
  const [analysis, setAnalysis] = useState<AnalysisResult>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [selectedModel, setSelectedModel] = useState('GEMINI-2.0-FLASH');
  const analysisCache = useRef<Record<string, AnalysisResult>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const MODEL_OPTIONS = [
    'GEMINI-2.0-FLASH',
    'GEMINI-2.0-FLASH-LITE',
    'GEMINI-1.5-PRO',
  ];

  const parseStartTime = (slot: string): number => {
    const match = slot.trim().split(' ')[0].match(/^(\d{2}):(\d{2})$/);
    if (!match) return 0;
    const [, min, sec] = match;
    return parseInt(min, 10) * 60 + parseInt(sec, 10);
  };

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
        body: JSON.stringify({
          filepath: filename,
          model: selectedModel,
        }),
      });

      const data = await res.json();
      console.log("analyze response:", data);

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

      console.log("🔍 final parsed result:", result);
      analysisCache.current[filename as string] = result;
      setAnalysis(result);
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
    if (!analysis) return;
    const text = typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Analysis result copied to clipboard');
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-yellow-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎞️ {filename}</h2>

        <video
          ref={videoRef}
          src={`http://localhost:8000/videos/${filename}`}
          controls
          className="w-full max-h-[480px] rounded mb-6"
        />

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Select Gemini Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
          >
            {MODEL_OPTIONS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {!hasAnalyzed && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleAnalyze}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              🧠 Start Analysis
            </button>
            <button
              onClick={() => router.push('/videos')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              ⬅️ Back to Video List
            </button>
          </div>
        )}

        {hasAnalyzed && (
          <>
            <div className="text-left mt-6">
              <h3 className="font-semibold mb-2">🧠 Analysis Result:</h3>
              {loading ? (
                <p>Loading...</p>
              ) : analysis === null ? (
                <p>No result.</p>
              ) : 'error' in (analysis as any) && !showError ? (
                <p>Processing...</p>
              ) : 'error' in (analysis as any) ? (
                <p className="text-red-600">❌ Error: {(analysis as any).error}</p>
              ) : Array.isArray(analysis) ? (
                <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">🕒 Time Slot</th>
                      <th className="border border-gray-300 px-4 py-2">📋 Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(analysis as Segment[]).map((item, index) => (
                      <tr
                        key={index}
                        className="even:bg-gray-50 cursor-pointer hover:bg-yellow-100 transition"
                        onClick={() => {
                          const start = parseStartTime(item.time_slot);
                          if (videoRef.current) videoRef.current.currentTime = start;
                        }}
                      >
                        <td className="border border-gray-300 px-4 py-2">{item.time_slot}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : typeof analysis === 'string' ? (
                <pre className="bg-gray-100 p-4 rounded text-sm">{analysis}</pre>
              ) : (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap text-left">
                  {JSON.stringify(analysis, null, 2)}
                </pre>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleAnalyze}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                🔄 Re-analyze
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                📋 Copy Result
              </button>
              <button
                onClick={() => router.push('/videos')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                ⬅️ Back to Video List
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
