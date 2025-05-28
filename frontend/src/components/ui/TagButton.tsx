// src/components/ui/TagButton.tsx

'use client';

interface TagButtonProps {
  tag: string;
  selected?: boolean;
  onClick?: () => void;
  tagColor?: string;
}

const tagColorMap: Record<string, string> = {
  issue: 'bg-red-100 text-red-800 border-red-300',
  good: 'bg-green-100 text-green-800 border-green-300',
  unclear: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  typo: 'bg-orange-100 text-orange-800 border-orange-300',
  long: 'bg-purple-100 text-purple-800 border-purple-300',
  short: 'bg-pink-100 text-pink-800 border-pink-300',
  missing: 'bg-blue-100 text-blue-800 border-blue-300',
  duplicate: 'bg-gray-100 text-gray-800 border-gray-300',
  confusing: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  wrong: 'bg-rose-100 text-rose-800 border-rose-300',
};

const selectedColorMap: Record<string, string> = {
  issue: 'bg-red-600 text-white border-red-600',
  good: 'bg-green-600 text-white border-green-600',
  unclear: 'bg-yellow-600 text-white border-yellow-600',
  typo: 'bg-orange-600 text-white border-orange-600',
  long: 'bg-purple-600 text-white border-purple-600',
  short: 'bg-pink-600 text-white border-pink-600',
  missing: 'bg-blue-600 text-white border-blue-600',
  duplicate: 'bg-gray-600 text-white border-gray-600',
  confusing: 'bg-indigo-600 text-white border-indigo-600',
  wrong: 'bg-rose-600 text-white border-rose-600',
};

export default function TagButton({
  tag,
  selected = false,
  onClick = () => {},
  tagColor,
}: TagButtonProps) {
  const baseClass =
    selected
      ? selectedColorMap[tagColor ?? tag] || 'bg-indigo-600 text-white border-indigo-600'
      : tagColorMap[tagColor ?? tag] || 'bg-gray-200 text-gray-800 border-gray-300';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[10px] font-medium leading-tight
        px-2 py-[2px] border rounded-md transition whitespace-nowrap ${baseClass}`}
      style={{
        borderRadius: '6px',
        minWidth: 'fit-content',
        height: '20px',
        lineHeight: '1.1',
      }}
    >
      #{tag}
    </button>
  );
}
