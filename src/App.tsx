import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { NewsCard } from './components/NewsCard';
import { FeedSkeleton } from './components/Skeletons';
import { ErrorState, EmptySearch, EmptyFeed } from './components/States';
import { fetchLatestNews, semanticSearch } from './lib/api';
import type { NewsArticle, View } from './types';

export default function App() {
  const [view, setView] = useState<View>('feed');
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLatestNews();
      setArticles(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles.');
    } finally {
      setLoading(false);
    }
  }, []);

  const runSearch = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    setActiveQuery(q);
    setView('search');
    try {
      const data = await semanticSearch(q);
      setArticles(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleLogoClick = () => {
    setView('feed');
    setQuery('');
    setActiveQuery('');
    if (articles.length === 0) loadFeed();
  };

  return (
    <div className="min-h-screen">
      <Header
        query={query}
        onQueryChange={setQuery}
        onSearch={runSearch}
        onLogoClick={handleLogoClick}
        isSearching={loading && view === 'search'}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Section heading */}
        <div className="mb-6 animate-fade-in">
          {view === 'feed' ? (
            <div>
              <h1 className="font-serif text-2xl font-semibold text-ink-50 sm:text-3xl">
                Latest Stories
              </h1>
              <p className="mt-1 text-sm text-ink-400">
                AI-curated news, summarized for clarity.
              </p>
            </div>
          ) : (
            <div>
              <h1 className="font-serif text-2xl font-semibold text-ink-50 sm:text-3xl">
                Search Results
              </h1>
              <p className="mt-1 text-sm text-ink-400">
                {loading
                  ? 'Searching semantically…'
                  : `${articles.length} result${articles.length === 1 ? '' : 's'} for "${activeQuery}"`}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <FeedSkeleton count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={view === 'feed' ? loadFeed : () => runSearch(activeQuery)} />
        ) : articles.length === 0 ? (
          view === 'search' ? (
            <EmptySearch query={activeQuery} />
          ) : (
            <EmptyFeed />
          )
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {articles.map((article, i) => (
              <NewsCard
                key={article.id ?? i}
                article={article}
                isSearchResult={view === 'search'}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="border-t border-ink-800/60 pt-6 text-center text-xs text-ink-400">
          Lumen — AI-curated news with semantic search
        </div>
      </footer>
    </div>
  );
}
