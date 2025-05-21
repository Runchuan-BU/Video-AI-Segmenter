'use client';
import React from 'react';

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function ModelSelector({ options, value, onChange }: Props) {
  return (
    <div className="mb-6 text-left">
      <label className="block mb-1 font-medium text-gray-700">Select Gemini Model:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
      >
        {options.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
    </div>
  );
}