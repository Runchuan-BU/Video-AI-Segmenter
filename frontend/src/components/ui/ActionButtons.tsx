// src/components/ui/ActionButtons.tsx

'use client';
import React from 'react';

type ButtonConfig = {
  label: string;
  icon?: string; // like 🔄 📋 ⬅️
  onClick: () => void;
  color?: 'blue' | 'green' | 'gray' | 'red' | 'purple';
  disabled?: boolean;
};

type Props = {
  buttons: ButtonConfig[];
};

export default function ActionButtons({ buttons }: Props) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    gray: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-500',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    purple: 'bg-purple-500 hover:bg-purple-600 text-white',
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {buttons.map((btn, idx) => {
        const baseClasses = `min-w-[120px] px-4 py-2 text-sm font-medium rounded-md transition text-center`;
        const colorClasses = colorMap[btn.color ?? 'gray'];
        const disabledClasses = btn.disabled
          ? 'opacity-50 cursor-not-allowed hover:bg-inherit'
          : '';

        return (
          <button
            key={idx}
            onClick={btn.onClick}
            disabled={btn.disabled}
            className={`${baseClasses} ${colorClasses} ${disabledClasses}`}
          >
            {btn.icon} {btn.label}
          </button>
        );
      })}
    </div>
  );
}