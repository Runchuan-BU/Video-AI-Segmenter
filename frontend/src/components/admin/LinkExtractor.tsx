// src/components/admin/LinkExtractor.tsx

'use client';

import ActionButtons from '@/components/ui/ActionButtons';

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

      <ActionButtons
        buttons={[
          {
            label: '🔍 Extract',
            color: 'purple',
            onClick: handleExtract,
            disabled: !link.trim(),
          },
        ]}
      />
    </div>
  );
}