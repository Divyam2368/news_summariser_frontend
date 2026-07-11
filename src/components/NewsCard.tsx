import { Clock, ArrowUpRight } from 'lucide-react';
import type { NewsArticle } from '../types';
import { formatRelativeTime, formatScore } from '../lib/format';

interface NewsCardProps {
  article: NewsArticle;
  isSearchResult?: boolean;
  index?: number;
}

export function NewsCard({ article, isSearchResult = false, index = 0 }: NewsCardProps) {
  const timestamp = article.createdAt ?? article.timestamp;
  const bullets = article.summary
    .split('\n')
    .map((l) => l.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);

  return (
    <article
      className="group animate-fade-in-up rounded-2xl border border-ink-800/70 bg-ink-900/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-ink-700 hover:bg-ink-850/80 hover:shadow-2xl hover:shadow-black/40 sm:p-6"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms`, animationFillMode: 'both' }}
    >
      {/* Meta row */}
      <div className="mb-3 flex items-center gap-2.5 text-xs">
        <span className="flex items-center gap-1.5 text-ink-400">
          <Clock className="h-3.5 w-3.5" />
          {timestamp ? formatRelativeTime(timestamp) : 'Recently'}
        </span>
        {isSearchResult && article.similarity_score != null && (
          <span className="flex items-center gap-1 rounded-full bg-match-soft px-2 py-0.5 font-semibold text-match">
            <span className="h-1.5 w-1.5 rounded-full bg-match" />
            {formatScore(article.similarity_score)}% match
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mb-3 font-serif text-xl font-semibold leading-snug text-ink-50 transition-colors group-hover:text-white sm:text-[1.35rem]">
        {article.title}
      </h2>

      {/* Summary bullets */}
      {bullets.length > 0 && (
        <ul className="mb-5 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-200">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-ink-800/60 pt-4">
        <a
          href={article.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-ink-200 transition-all hover:bg-ink-700 hover:text-white"
        >
          Read Original
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a
          href={article.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[180px] truncate text-xs text-ink-400 transition-colors hover:text-ink-200"
        >
          {(() => {
            try {
              return new URL(article.original_url).hostname.replace(/^www\./, '');
            } catch {
              return 'source';
            }
          })()}
        </a>
      </div>
    </article>
  );
}
