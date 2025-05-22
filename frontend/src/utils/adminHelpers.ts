// src/utils/adminHelpers.ts

export async function fetchAnalysisVersions(filename: string) {
    const res = await fetch(`http://localhost:8000/list-analysis-versions?filename=${filename}`);
    const data = await res.json();
    return data.versions || [];
  }
  
  export async function fetchAnalysisByTimestamp(filename: string, timestamp: string) {
    const res = await fetch(
      `http://localhost:8000/get-analysis-by-timestamp?filename=${filename}&timestamp=${timestamp}`
    );
    return await res.json();
  }
  
  export async function deleteAnalysisVersion(filename: string, timestamp: string) {
    await fetch('http://localhost:8000/delete-analysis-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, timestamp }),
    });
  }
  
  export async function deleteComment(filename: string, timestamp: string, index: number) {
    await fetch('http://localhost:8000/delete-analysis-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, timestamp, comment_index: index }),
    });
  }