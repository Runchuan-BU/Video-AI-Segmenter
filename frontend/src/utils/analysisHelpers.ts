// src/utils/AnalysisHelpers.ts

export type Segment = { time_slot: string; description: string };
export type AnalysisResult = Segment[] | string | { error: string };

export async function fetchAnalysis(filename: string, model: string): Promise<AnalysisResult> {
  const res = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filepath: filename, model }),
  });

  const data = await res.json();
  if (!res.ok || !data.results || !data.results.results) {
    return { error: data.message || 'Analysis failed' };
  }

  try {
    const raw = data.results.results;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return { error: 'Failed to parse nested results' };
  }
}

export async function saveAnalysis(filename: string, results: Segment[]) {
  const res = await fetch('http://localhost:8000/save-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, results }),
  });
  if (!res.ok) throw new Error('Save failed');
}

export function copyToClipboard(results: Segment[]) {
  const text = JSON.stringify(results, null, 2);
  return navigator.clipboard.writeText(text);
}

export function updateSegmentList(
  segments: Segment[],
  index: number,
  field: 'time_slot' | 'description' | 'add' | 'delete',
  value: string
): Segment[] {
  if (!segments) return segments;

  const updated = [...segments];

  if (field === 'add') {
    const newSeg: Segment = JSON.parse(value);
    return [...updated, newSeg];
  }

  if (field === 'delete') {
    updated.splice(index, 1);
    return updated;
  }

  updated[index] = { ...updated[index], [field]: value };
  return updated;
}