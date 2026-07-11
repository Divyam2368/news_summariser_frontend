import { AlertCircle, SearchX, FileText } from 'lucide-react';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-800/70 bg-ink-900/40 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
        <AlertCircle className="h-7 w-7 text-accent" />
      </div>
      <p className="mb-1 text-lg font-semibold text-ink-100">Something went wrong</p>
      <p className="mb-5 max-w-sm text-sm text-ink-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-ink-800 px-5 py-2 text-sm font-medium text-ink-100 transition-colors hover:bg-ink-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptySearch({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-800/70 bg-ink-900/40 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ink-800">
        <SearchX className="h-7 w-7 text-ink-400" />
      </div>
      <p className="mb-1 text-lg font-semibold text-ink-100">No matches found</p>
      <p className="max-w-sm text-sm text-ink-400">
        We couldn't find articles semantically matching "{query}". Try rephrasing your query.
      </p>
    </div>
  );
}

export function EmptyFeed() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-800/70 bg-ink-900/40 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ink-800">
        <FileText className="h-7 w-7 text-ink-400" />
      </div>
      <p className="mb-1 text-lg font-semibold text-ink-100">No articles yet</p>
      <p className="max-w-sm text-sm text-ink-400">Check back soon — new stories are being curated.</p>
    </div>
  );
}
