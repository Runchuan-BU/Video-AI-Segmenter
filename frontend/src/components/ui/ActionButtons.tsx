// src/components/ui/ActionButtons.tsx

'use client';
import React from 'react';

type ButtonConfig = {
  label: string;
  icon?: string; // like 🔄 📋 ⬅️
  onClick: () => void;
  color?: 'blue' | 'green' | 'gray' | 'red';
};

type Props = {
  buttons: ButtonConfig[];
};

export default function ActionButtons({ buttons }: Props) {
  const colorMap = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    gray: 'bg-gray-500 hover:bg-gray-600',
    red: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap mt-6">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={`px-4 py-2 text-white rounded transition ${colorMap[btn.color ?? 'gray']}`}
        >
          {btn.icon} {btn.label}
        </button>
      ))}
    </div>
  );
}