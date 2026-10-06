import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { DestinationTile } from "@/components/site/Cards";
import { PageHero, Chip, EmptyState } from "@/components/site/Section";
import Newsletter from "@/components/site/Newsletter";
import { destinations, regions, images } from "@/data/scout";
import { useSeo } from "@/hooks/useSeo";

const Destinations = () => {
  useSeo({ title: "Explore Destinations", description: "Browse Travel Scout destination guides across Africa, Europe, Asia, the Americas, the Middle East and Oceania." });
  const [params, setParams] = useSearchParams();
  const region = params.get("region") ?? "All";
  const q = params.get("q") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "All") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return destinations.filter(
      (d) => (region === "All" || d.region === region) && (!s || `${d.name} ${d.country} ${d.tagline}`.toLowerCase().includes(s)),
    );
  }, [region, q]);

  return (
    <Layout>
      <PageHero
        eyebrow="Destinations"
        title="Explore Destinations"
        intro="From Lagos lagoons to Tokyo alleyways, our destination guides combine on-the-ground reporting with the practical details you need to plan: when to go, where to stay, what to eat and how to get around."
        image={images.capetown}
        imageAlt="Colourful houses of Bo-Kaap beneath Table Mountain, Cape Town"
      />
      <section className="container-site py-12 md:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter by region">
            {["All", ...regions].map((r) => (
              <Chip key={r} active={region === r} onClick={() => update("region", r)}>{r}</Chip>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="dest-search" className="sr-only">Search destinations</label>
            <input
              id="dest-search"
              type="search"
              value={q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Search destinations"
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "destination" : "destinations"}</p>
        {list.length ? (
          <div className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => <DestinationTile key={d.slug} d={d} />)}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="No destinations found"
              text="We haven't covered that place yet. Try another region or clear your search."
              action={<button onClick={() => setParams({})} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent">Clear filters</button>}
            />
          </div>
        )}
      </section>
      <Newsletter />
    </Layout>
  );
};

export default Destinations;
