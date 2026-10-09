import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBox from "@/components/site/SearchBox";
import { Chip, EmptyState } from "@/components/site/Section";
import { searchAll, type SearchResult } from "@/data/scout";

const types: ("All" | SearchResult["type"])[] = ["All", "Destination", "Guide", "Category"];

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const [type, setType] = useState<(typeof types)[number]>("All");
  const seo = ({ title: q ? `Search: ${q}` : "Search", description: "Search Travel Scout destinations, travel guides and categories." });

  const all = useMemo(() => searchAll(q), [q]);
  const results = type === "All" ? all : all.filter((r) => r.type === type);

  return (
    <Layout seo={seo}>
      <section className="border-b border-border">
        <div className="container-site max-w-3xl py-14 md:py-20">
          <p className="eyebrow mb-3">Search</p>
          <h1 className="mb-8 text-4xl font-semibold md:text-6xl">{q ? <>Results for “{q}”</> : "Search Travel Scout"}</h1>
          <SearchBox placeholder="Search destinations, guides or topics" />
        </div>
      </section>
      <section className="container-site max-w-3xl py-10">
        {q && (
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter results">
            {types.map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>
                {t === "All" ? "All" : `${t}s`} ({t === "All" ? all.length : all.filter((r) => r.type === t).length})
              </Chip>
            ))}
          </div>
        )}
        {!q ? (
          <EmptyState title="Where to?" text="Type a city, country, region or topic — like “Lagos”, “Africa” or “budget” — to search the whole site." />
        ) : results.length === 0 ? (
          <EmptyState title="Nothing found" text={`We couldn't find anything for “${q}”. Check the spelling or try a broader term.`} action={<Link to="/destinations" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent">Browse destinations</Link>} />
        ) : (
          <ul className="divide-y divide-border">
            {results.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="group flex gap-5 py-5">
                  {r.image ? (
                    <img src={r.image} alt="" loading="lazy" className="h-20 w-28 shrink-0 rounded object-cover sm:h-24 sm:w-36" />
                  ) : (
                    <span className="flex h-20 w-28 shrink-0 items-center justify-center rounded bg-muted font-display text-2xl text-accent sm:h-24 sm:w-36">#</span>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{r.type} · <span className="text-muted-foreground">{r.category}</span></p>
                    <h2 className="mt-1 text-xl font-semibold transition group-hover:text-accent md:text-2xl">{r.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
};

export default SearchPage;
