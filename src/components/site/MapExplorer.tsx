import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, ExternalLink, Star, Map as MapIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Waypoint, WaypointCategory } from "@/data/waypoints";

const filters: { key: "all" | WaypointCategory; label: string }[] = [
  { key: "all", label: "📍 All Spots" },
  { key: "stay", label: "🏨 Stays Near Here" },
  { key: "tour", label: "🎟️ Tours & Entry" },
  { key: "transit", label: "🚆 Transit Stops" },
];

export default function MapExplorer({ city, waypoints }: { city: string; waypoints: Waypoint[] }) {
  const [filter, setFilter] = useState<"all" | WaypointCategory>("all");
  const [active, setActive] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const list = useMemo(() => (filter === "all" ? waypoints : waypoints.filter((w) => w.category === filter)), [filter, waypoints]);

  useEffect(() => { if (active && !list.some((w) => w.id === active)) setActive(null); }, [list, active]);

  const selectFromMap = (id: string) => {
    setActive(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const map = (
    <div className="map-grid relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-muted">
      <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-card backdrop-blur">{city} · simulated map</span>
      {list.map((w) => {
        const on = w.id === active;
        return (
          <button
            key={w.id}
            type="button"
            aria-label={w.title}
            aria-pressed={on}
            onClick={() => selectFromMap(w.id)}
            style={{ left: `${w.pin.x}%`, top: `${w.pin.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-full"
          >
            <span className={cn("mb-1 block whitespace-nowrap rounded-full bg-card px-2.5 py-1 text-xs font-semibold shadow-card transition-all duration-300", on ? "opacity-100" : "pointer-events-none opacity-0 group-hover:opacity-100")}>{w.title}</span>
            <MapPin className={cn("mx-auto h-9 w-9 drop-shadow transition-transform duration-300 ease-out", on ? "scale-125 fill-accent text-accent-foreground" : "fill-primary text-primary-foreground group-hover:scale-110")} />
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="container-site py-12" aria-label={`Explore ${city} on the map`}>
      <h2 className="mb-6 text-3xl font-semibold">Explore {city} spot by spot</h2>

      <div className="sticky top-16 z-20 mb-6 flex gap-2 overflow-x-auto rounded-full border border-border bg-card/90 p-1.5 shadow-card backdrop-blur">
        {filters.map((f) => (
          <button key={f.key} type="button" onClick={() => setFilter(f.key)}
            className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200", filter === f.key ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
            {f.label}
          </button>
        ))}
      </div>

      <button type="button" onClick={() => setMapOpen((o) => !o)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium lg:hidden">
        {mapOpen ? <X className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />} {mapOpen ? "Hide map" : "Show map"}
      </button>
      {mapOpen && <div className="mb-6 h-[360px] lg:hidden">{map}</div>}

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="space-y-4 lg:w-[45%]">
          {list.length === 0 && <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">No spots in this category yet.</p>}
          {list.map((w) => {
            const on = w.id === active;
            return (
              <article key={w.id} ref={(el) => (cardRefs.current[w.id] = el)} onClick={() => setActive(w.id)}
                className={cn("cursor-pointer scroll-mt-36 rounded-2xl border bg-card p-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card", on ? "border-accent ring-2 ring-accent/30 shadow-card" : "border-border")}>
                <div className="flex gap-4">
                  <img src={w.image} alt={w.title} loading="lazy" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-snug">{w.title}</h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">{w.rating.toFixed(1)} <Star className="h-3 w-3 fill-current" /></span>
                    </div>
                    <p className="text-xs text-muted-foreground">{w.address}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{w.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <a href={w.directionsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
                    <MapPin className="h-4 w-4" /> Open Directions
                  </a>
                  <a href={w.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow transition-all hover:brightness-110 active:scale-95">
                    Book Guided Access <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="hidden lg:block lg:w-[55%]">
          <div className="sticky top-36 h-[calc(100vh-10rem)]">{map}</div>
        </div>
      </div>
    </section>
  );
}
