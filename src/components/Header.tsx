import { useState, useRef, useEffect } from 'react';
import { Search, X, Newspaper } from 'lucide-react';

interface HeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: (q: string) => void;
  onLogoClick: () => void;
  isSearching: boolean;
}

export function Header({ query, onQueryChange, onSearch, onLogoClick, isSearching }: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/85 backdrop-blur-xl border-b border-ink-800/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-3 sm:gap-6">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="group flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover shadow-lg shadow-accent/20">
              <Newspaper className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <span className="hidden text-lg font-bold tracking-tight text-ink-50 sm:block">
              Lumen
            </span>
          </button>

          {/* Search */}
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="group relative flex items-center">
              <div
                className={`pointer-events-none absolute left-3.5 transition-colors ${
                  isSearching ? 'text-accent' : 'text-ink-400 group-focus-within:text-ink-200'
                }`}
              >
                {isSearching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search articles semantically…"
                className={`w-full rounded-full border bg-ink-850/80 py-2.5 pl-10 pr-10 text-sm text-ink-100 placeholder:text-ink-400 transition-all duration-200 outline-none ${
                  query
                    ? 'border-ink-600'
                    : 'border-ink-700/60 hover:border-ink-600'
                } focus:border-accent/60 focus:bg-ink-850 focus:ring-4 focus:ring-accent/10`}
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2.5 flex h-7 w-7 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-700 hover:text-ink-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
