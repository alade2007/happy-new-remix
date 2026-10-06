import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { GuideCard } from "@/components/site/Cards";
import { PageHero, Chip, EmptyState } from "@/components/site/Section";
import Newsletter from "@/components/site/Newsletter";
import { categories, sortedGuides, guidesByTag, getCategoryBySlug } from "@/data/scout";
import { useSeo } from "@/hooks/useSeo";

/** Blog listing. `fixedCategory` powers dedicated section pages like /travel-tips. */
const Guides = ({ fixedCategory }: { fixedCategory?: string }) => {
  const [params, setParams] = useSearchParams();
  const catSlug = fixedCategory ?? params.get("category") ?? "";
  const cat = getCategoryBySlug(catSlug);
  const q = params.get("q") ?? "";

  useSeo({
    title: cat && fixedCategory ? cat.name : cat ? `${cat.name} Guides` : "Travel Guides",
    description: cat ? `${cat.description} Read the latest ${cat.name.toLowerCase()} stories from Travel Scout.` : "Destination guides, travel tips, food and culture stories from the Travel Scout team.",
  });

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return sortedGuides.filter(
      (g) => (!cat || g.category === cat.name) && (!s || `${g.title} ${g.excerpt} ${g.category}`.toLowerCase().includes(s)),
    );
  }, [cat, q]);

  const showFeature = !q && filtered.length > 3;
  const featured = showFeature ? filtered.find((g) => g.tags?.includes("featured")) ?? filtered[0] : undefined;
  const rest = filtered.filter((g) => g !== featured);
  const popular = guidesByTag("popular").slice(0, 5);

  return (
    <Layout>
      <PageHero
        eyebrow={cat ? "Category" : "The journal"}
        title={cat ? cat.name : "Travel Guides"}
        intro={cat ? cat.description : "Honest, deeply reported guides to the world's most rewarding places — plus the practical advice that makes trips easier."}
      >
        <div className="relative mt-8 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <label htmlFor="guide-search" className="sr-only">Search guides</label>
          <input
            id="guide-search"
            type="search"
            value={q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Search guides"
            className="w-full rounded-full border border-input bg-card py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </PageHero>

      {!fixedCategory && (
        <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="container-site flex gap-2 overflow-x-auto py-3" role="group" aria-label="Filter by category">
            <Chip active={!cat} onClick={() => update("category", "")}>All</Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={cat?.slug === c.slug} onClick={() => update("category", c.slug)}>{c.name}</Chip>
            ))}
          </div>
        </div>
      )}

      <div className="container-site py-12 md:py-16">
        {featured && <div className="mb-16"><GuideCard g={featured} variant="feature" /></div>}

        <div className="grid gap-14 lg:grid-cols-12">
          <section className="lg:col-span-8" aria-labelledby="latest">
            <h2 id="latest" className="mb-8 text-3xl font-semibold">{q ? `Results for “${q}”` : "Latest articles"}</h2>
            {rest.length ? (
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                {rest.map((g) => <GuideCard key={g.slug} g={g} />)}
              </div>
            ) : (
              <EmptyState
                title="No guides match"
                text="Try a different search term or browse another category."
                action={<button onClick={() => setParams({})} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent">Clear search</button>}
              />
            )}
          </section>
          <aside className="lg:col-span-4" aria-labelledby="popular">
            <div className="lg:sticky lg:top-36">
              <h2 id="popular" className="mb-6 text-2xl font-semibold">Popular articles</h2>
              <div className="space-y-6">{popular.map((g) => <GuideCard key={g.slug} g={g} variant="compact" />)}</div>
            </div>
          </aside>
        </div>
      </div>
      <Newsletter />
    </Layout>
  );
};

export default Guides;
