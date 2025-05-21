'use client';

type Props = {
  videos: string[];
  selected: Set<string>;
  setSelected: (s: Set<string>) => void;
  showToast: (msg: string) => void;
};

export default function VideoList({ videos, selected, setSelected, showToast }: Props) {
  const handleToggle = (url: string) => {
    const newSet = new Set(selected);
    newSet.has(url) ? newSet.delete(url) : newSet.add(url);
    setSelected(newSet);
  };

  const handleDownloadSelected = async () => {
    if (selected.size === 0) return;

    try {
      const res = await fetch('http://localhost:8000/download_videos_from_links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: Array.from(selected) }),
      });

      if (res.ok) {
        showToast('✅ Videos downloaded successfully!');
        setSelected(new Set());
      } else {
        showToast('❌ Download failed.');
      }
    } catch {
      showToast('❌ Download error.');
    }
  };

  if (videos.length === 0) return null;

  return (
    <div className="text-left max-h-80 overflow-y-auto border rounded p-4 space-y-2 mt-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">📋 Extracted Videos</h3>
      {videos.map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input type="checkbox" checked={selected.has(v)} onChange={() => handleToggle(v)} />
          <a href={v} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">
            {v}
          </a>
        </label>
      ))}
      <button
        onClick={handleDownloadSelected}
        className="mt-4 w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
      >
        💾 Download Selected
      </button>
    </div>
  );
}