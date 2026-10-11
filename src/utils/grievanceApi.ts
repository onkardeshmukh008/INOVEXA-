import type { DialectAnalysisResult } from '../types';
import { getFallbackAnalysis } from './fallbackAnalysis';

export async function analyzeGrievance(text: string) {
  const response = await fetch('/api/analyze-dialect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (response.status === 404) {
    return { result: getFallbackAnalysis(text), offline: true };
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned ${response.status}`);
  }

  return {
    result: (await response.json()) as DialectAnalysisResult,
    offline: false,
  };
}

export async function analyzeGrievances(items: Array<{ id: string; text: string }>) {
  const response = await fetch('/api/batch-analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  if (response.status === 404) {
    return {
      results: items.map((item) => ({
        ...item,
        result: getFallbackAnalysis(item.text),
      })),
      offline: true,
    };
  }
  if (!response.ok) {
    throw new Error(`Batch request failed with status ${response.status}`);
  }

  const data = await response.json();
  return { results: data.results, offline: false };
}
