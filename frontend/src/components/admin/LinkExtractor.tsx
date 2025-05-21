'use client';

type Props = {
  link: string;
  setLink: (link: string) => void;
  setVideos: (videos: string[]) => void;
  showToast: (msg: string) => void;
};

export default function LinkExtractor({ link, setLink, setVideos, showToast }: Props) {
  const handleExtract = async () => {
    if (!link) return;

    try {
      const res = await fetch(`http://localhost:8000/extract_videos_from_url?url=${encodeURIComponent(link)}`);
      const data = await res.json();
      setVideos(data.videos || []);
    } catch {
      showToast('❌ Failed to extract videos.');
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-700">🔗 Extract Videos from URL</h3>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter a URL containing videos"
        className="w-full border px-4 py-2 rounded"
      />
      <button
        onClick={handleExtract}
        className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        🔍 Extract
      </button>
    </div>
  );
}