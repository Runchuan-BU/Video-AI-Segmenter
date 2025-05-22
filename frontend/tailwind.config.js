module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}", 
    ],
    safelist: [
      'bg-green-100', 'text-green-800', 'border-green-300',
      'bg-red-100', 'text-red-800', 'border-red-300',
      'bg-yellow-100', 'text-yellow-800', 'border-yellow-300',
      'bg-orange-100', 'text-orange-800', 'border-orange-300',
      'bg-purple-100', 'text-purple-800', 'border-purple-300',
      'bg-pink-100', 'text-pink-800', 'border-pink-300',
      'bg-blue-100', 'text-blue-800', 'border-blue-300',
      'bg-gray-100', 'text-gray-800', 'border-gray-300',
      'bg-indigo-100', 'text-indigo-800', 'border-indigo-300',
      'bg-rose-100', 'text-rose-800', 'border-rose-300',
    ],
    theme: {
      extend: {
        colors: {
          issue: '#dc2626',       // red-600
          good: '#16a34a',        // green-600
          unclear: '#ca8a04',     // yellow-600
          confusing: '#9333ea',   // purple-600
          duplicate: '#0ea5e9',   // sky-500
          wrong: '#e11d48',       // rose-600
          typo: '#f97316',        // orange-500
          long: '#3b82f6',        // blue-500
          short: '#6366f1',       // indigo-500
          missing: '#14b8a6',     // teal-500
        }
      }
    },
    plugins: [],
  };
  