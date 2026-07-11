import type { FeedResponse, SearchResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchLatestNews(): Promise<FeedResponse> {
  const res = await fetch(`${BASE_URL}/api/news/latest`);
  if (!res.ok) {
    throw new Error(`Failed to load feed (${res.status})`);
  }
  return res.json();
}

export async function semanticSearch(query: string): Promise<SearchResponse> {
  const res = await fetch(`${BASE_URL}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error(`Search failed (${res.status})`);
  }
  return res.json();
}
