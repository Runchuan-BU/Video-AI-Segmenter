// src/app/videos/[filename]/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import VideoPlayer from '@/components/video/VideoPlayer';
import ModelSelector from '@/components/video/ModelSelector';
import AnalysisResultTable from '@/components/video/AnalysisResultTable';
import ActionButtons from '@/components/ui/ActionButtons';
import ReviewerPanel from '@/components/reviewer/ReviewerPanel';
import AdminPanel from '@/components/admin/AdminPanel';
import {
  fetchAnalysis,
  saveAnalysis,
  copyToClipboard,
  updateSegmentList,
  Segment,
  AnalysisResult,
} from '@/utils/analysisHelpers';

export default function VideoDetailPage() {
  const router = useRouter();
  const { filename } = useParams();
  const resolvedFilename = Array.isArray(filename) ? filename[0] : filename;
  if (!resolvedFilename) return null;
  const role = useSelector((state: RootState) => state.role);

  // const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [editedAnalysis, setEditedAnalysis] = useState<Segment[] | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    // setAnalysis(null);
    setHasAnalyzed(true);


    try {
      const result = await fetchAnalysis(resolvedFilename, selectedModel);
      analysisCache.current[filename as string] = result;
      // setAnalysis(result);
      setEditedAnalysis(Array.isArray(result) ? [...result] : null);
    } catch (err: any) {
      const errorObj = { error: err.message || 'Unknown error' };
      analysisCache.current[filename as string] = errorObj;
      // setAnalysis(errorObj);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateSegment = (
    index: number,
    field: 'time_slot' | 'description' | 'add' | 'delete',
    value: string
  ) => {
    if (!editedAnalysis) return;
    const updated = updateSegmentList(editedAnalysis, index, field, value);
    setEditedAnalysis(updated);
  };

  const handleCopy = () => {
    if (!editedAnalysis) return;
    copyToClipboard(editedAnalysis).then(() => {
      alert('✅ Analysis result copied to clipboard');
    });
  };

  const handleSave = async () => {
    if (!editedAnalysis || !filename) return;
    try {
      await saveAnalysis(resolvedFilename, editedAnalysis);
      alert('✅ Saved successfully!');
      setIsEditing(false); 
    } catch {
      alert('❌ Save failed.');
    }
  };


  // if (!['annotator', 'reviewer', 'admin'].includes(role)) {
  //   return (
  //     <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-yellow-50 p-4">
  //       <div className="text-gray-700 text-lg">🔒 Invalid role: {role}</div>
  //     </main>
  //   );
  // }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-yellow-50 p-4 w-full max-w-3xl mx-auto">
      <div className="absolute top-4 right-6 text-sm text-gray-600">
        👤 Current Role: <strong className="text-indigo-700">{role}</strong>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎞️ {filename}</h2>

        {resolvedFilename && (
          <VideoPlayer videoRef={videoRef} filename={resolvedFilename} />
        )}

        

        {/* admin */}
        {role === 'admin' && (
          <>
            <AdminPanel filename={resolvedFilename} videoRef={videoRef} />
            <div className="mt-6 flex justify-center gap-4">
              <ActionButtons
                buttons={[
                  {
                    icon: '⬅️',
                    label: 'Back to Video List',
                    onClick: () => router.push('/videos'),
                    color: 'gray',
                  },
                ]}
              />
            </div>
          </>
        )}

        
        {/* reviewer */}
        {role === 'reviewer' && (
          <>
            <ReviewerPanel filename={resolvedFilename} videoRef={videoRef} />
            <div className="mt-6 flex justify-center gap-4">
              <ActionButtons
                buttons={[{
                  icon: '⬅️',
                  label: 'Back to Video List',
                  onClick: () => router.push('/videos'),
                  color: 'gray',
                }]} />
            </div>
          </>
        )}
        
        {/* annotator */}
        {!hasAnalyzed && role === 'annotator' && (
          <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <div className="w-full max-w-md mx-auto">
              <ModelSelector
                options={MODEL_OPTIONS}
                value={selectedModel}
                onChange={setSelectedModel}
              />
            </div>
        
            <ActionButtons
              buttons={[
                {
                  icon: '🧠',
                  label: 'Start Analysis',
                  onClick: handleAnalyze,
                  color: 'blue',
                },
                {
                  icon: '⬅️',
                  label: 'Back to Video List',
                  onClick: () => router.push('/videos'),
                  color: 'gray',
                },
              ]}
            />
        </div>
        )}
        {hasAnalyzed && role === 'annotator' && (
          <AnalysisResultTable
            editedAnalysis={editedAnalysis}
            loading={loading}
            isEditing={isEditing}
            videoRef={videoRef}
            onUpdateSegment={isEditing ? handleUpdateSegment : undefined}
            onSave={handleSave}
            onCopy={handleCopy}
            onToggleEdit={() => setIsEditing((prev) => !prev)}
          />
        )}

      </div>
    </main>
  );
}