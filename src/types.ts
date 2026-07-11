export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  original_url: string;
  createdAt?: string;
  timestamp?: string;
  similarity_score?: number;
}

export interface FeedResponse {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  results: NewsArticle[];
}

export interface SearchResponse {
  results: NewsArticle[];
}

export type View = 'feed' | 'search';

export interface ApiError {
  message: string;
  status?: number;
}
