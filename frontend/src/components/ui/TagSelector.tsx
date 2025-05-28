// src/components/ui/TagSelector.tsx

'use client';

import TagButton from './TagButton';

const TAG_OPTIONS = [
  'good', 'issue', 'unclear', 'typo', 'long',
  'short', 'missing', 'duplicate', 'confusing', 'wrong'
];

interface Props {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelector({ selectedTags, onChange }: Props) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex-wrap gap-x-2 gap-y-2 w-full max-w-full">
      {TAG_OPTIONS.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          tagColor={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => toggleTag(tag)}
        />
      ))}
    </div>
  );
}