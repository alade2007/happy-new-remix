import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { searchAll } from "@/data/scout";
import { cn } from "@/lib/utils";

interface Props {
  autoFocus?: boolean;
  compact?: boolean;
  placeholder?: string;
  variant?: "default" | "hero";
  onNavigate?: () => void;
}

/** Site-wide search with instant suggestions; Enter opens the full results page. */
const SearchBox = ({ autoFocus, compact, placeholder = "Where do you want to go?", variant = "default", onNavigate }: Props) => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => searchAll(q).slice(0, compact ? 4 : 6), [q, compact]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    onNavigate?.();
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setQ("");
  };

  const hero = variant === "hero";

  return (
    <div className="relative w-full">
      <form onSubmit={submit} role="search" className={cn("flex items-center rounded-full border transition focus-within:border-accent", hero ? "border-transparent bg-card/95 shadow-card backdrop-blur" : "border-input bg-card")}>
        <Search className="ml-4 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <label htmlFor={`search-${variant}-${compact ? "c" : "f"}`} className="sr-only">Search Travel Scout</label>
        <input
          id={`search-${variant}-${compact ? "c" : "f"}`}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          className={cn("min-w-0 flex-1 bg-transparent px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0", hero ? "py-4 text-base" : "py-3 text-sm")}
        />
        <button type="submit" className={cn("mr-1.5 inline-flex items-center gap-1.5 rounded-full bg-accent font-semibold text-accent-foreground transition hover:bg-primary", hero ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs")}>
          Search
        </button>
      </form>

      {q.trim() && (
        <div className={cn("z-40 mt-2 overflow-hidden rounded-lg border border-border bg-card text-left shadow-card", hero && "absolute inset-x-0")}>
          {results.length === 0 ? (
            <p className="px-4 py-5 text-sm text-muted-foreground">No matches for “{q}”. Try a city, country or topic like “beaches”.</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.to}>
                  <Link
                    to={r.to}
                    onClick={() => {
                      setQ("");
                      onNavigate?.();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-muted"
                  >
                    {r.image ? (
                      <img src={r.image} alt="" className="h-10 w-10 shrink-0 rounded object-cover" loading="lazy" />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-xs font-bold text-accent">#</span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">{r.title}</span>
                      <span className="text-xs text-muted-foreground">{r.type} · {r.category}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={submit} className="flex w-full items-center justify-between border-t border-border px-4 py-3 text-sm font-semibold text-accent hover:bg-muted">
                  See all results <ArrowRight className="h-4 w-4" />
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
