// src/utils/reviewerHelpers.ts

export async function fetchAnalysisVersions(filename: string) {
    const res = await fetch(`http://localhost:8000/list-analysis-versions?filename=${filename}`);
    const data = await res.json();
    return data.versions || [];
  }
  
export async function fetchAnalysisByTimestamp(filename: string, timestamp: string) {
    const res = await fetch(`http://localhost:8000/get-analysis-by-timestamp?filename=${filename}&timestamp=${timestamp}`);
    return await res.json();
  }
  
  export async function postAnalysisComment(
    filename: string,
    timestamp: string,
    comment: { content: string; tags: string[] }
  ) {
    await fetch('http://localhost:8000/add-analysis-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, timestamp, comment }),
    });
  }