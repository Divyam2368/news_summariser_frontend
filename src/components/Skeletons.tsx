export function NewsCardSkeleton() {
  return (
    <div className="rounded-2xl border border-ink-800/70 bg-ink-900/60 p-5 sm:p-6">
      <div className="mb-3 h-3 w-24 rounded skeleton-shimmer" />
      <div className="mb-3 h-5 w-full rounded skeleton-shimmer" />
      <div className="mb-2 h-5 w-3/4 rounded skeleton-shimmer" />
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-5/6 rounded skeleton-shimmer" />
      </div>
      <div className="mt-5 border-t border-ink-800/60 pt-4">
        <div className="h-4 w-28 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

export function FeedSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
