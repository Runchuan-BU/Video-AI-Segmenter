'use client';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  uploaded: boolean;
  setUploaded: (uploaded: boolean) => void;
  showToast: (msg: string) => void;
};

export default function FileUploader({ file, setFile, uploaded, setUploaded, showToast }: Props) {
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/upload_video', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploaded(true);
        showToast('✅ Video uploaded successfully!');
      } else {
        showToast('❌ Upload failed.');
      }
    } catch {
      showToast('❌ Upload error.');
    }
  };

  const reset = () => {
    setFile(null);
    setUploaded(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">📤 Upload from Local File</h3>
      {!uploaded ? (
        <>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            onClick={handleUpload}
            disabled={!file}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            🚀 Upload & Save
          </button>
        </>
      ) : (
        <>
          <p className="text-green-600 font-medium">✅ Upload successful!</p>
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            ➕ Upload Another
          </button>
        </>
      )}
    </div>
  );
}