import { useRef, useEffect } from "react";
import { List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import TravelIcon from "@/components/site/TravelIcon";
import WaypointActions from "./WaypointActions";
import RoutePreview from "./RoutePreview";
import type { ItineraryDay } from "@/data/planner";
import { cn } from "@/lib/utils";

export default function ItineraryCanvas({ days, city, active, setActive, view, setView, image }: { days: ItineraryDay[]; city: string; active: string | null; setActive: (id: string) => void; view: "itinerary" | "map"; setView: (view: "itinerary" | "map") => void; image: string }) {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => { if (active) refs.current[active]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }); }, [active]);
  return <section className="min-w-0 flex-1 bg-background" aria-label="Trip canvas">
    <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-5 py-4 backdrop-blur">
      <span className="font-sans text-sm font-semibold">Your trip, at a glance</span>
      <div role="tablist" aria-label="Canvas view" className="flex rounded-md bg-muted p-1">
        <Button role="tab" aria-selected={view === "itinerary"} variant="ghost" size="sm" className={cn("text-xs hover:bg-travel-glow hover:text-travel-brand", view === "itinerary" && "bg-card shadow-sm")} onClick={() => setView("itinerary")}><List />Itinerary View</Button>
        <Button role="tab" aria-selected={view === "map"} variant="ghost" size="sm" className={cn("text-xs hover:bg-travel-glow hover:text-travel-brand", view === "map" && "bg-card shadow-sm")} onClick={() => setView("map")}><Map />Interactive Route Map</Button>
      </div>
    </div>
    <div className="mx-auto max-w-4xl space-y-6 p-5 md:p-7">
      <div className="relative h-44 overflow-hidden rounded-lg">
        <img src={image} alt={`${city} destination`} className="h-full w-full object-cover" /><div className="bg-overlay-gradient absolute inset-0" />
        <div className="absolute bottom-5 left-5 text-primary-foreground"><p className="text-xs uppercase tracking-widest">{days.length} days · {days.flatMap(d => d.stops).length} stops</p><h1 className="mt-1 text-3xl font-semibold">A few days in {city}</h1></div>
      </div>
      {view === "map" && <RoutePreview days={days} active={active} select={setActive} city={city} />}
      <div role="tabpanel" aria-label={view === "map" ? "Route map itinerary" : "Day-by-day itinerary"} className="space-y-7">
        {days.map((day, index) => <section key={day.id}>
          <div className="mb-4 flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-travel-glow font-semibold text-travel-brand">{index + 1}</span><div><p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Day {index + 1}</p><h2 className="font-sans text-base font-semibold">{day.title}</h2></div></div>
          <div className="ml-4 space-y-3 border-l border-border pl-5">
            {day.stops.length === 0 && <p className="py-4 text-sm text-muted-foreground">A free day to explore at your own pace.</p>}
            {day.stops.map(stop => <article key={stop.id} ref={el => { refs.current[stop.id] = el; }} data-stop-id={stop.id} data-selected={active === stop.id} className={cn("group scroll-mt-36 rounded-lg border bg-card p-4 transition-all duration-200", active === stop.id ? "border-travel-brand ring-2 ring-travel-brand/15" : "border-border hover:border-travel-brand/40")}>
              <Button variant="ghost" className="mb-3 h-auto w-full justify-start whitespace-normal p-0 text-left hover:bg-transparent hover:text-foreground [&_svg]:size-5" onClick={() => setActive(stop.id)} aria-pressed={active === stop.id}><TravelIcon kind={stop.category} /><span className="min-w-0"><span className="block font-semibold">{stop.title}</span><span className="block text-xs font-normal text-muted-foreground">{stop.address}</span></span></Button>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{stop.description}</p><WaypointActions waypoint={stop} city={city} />
            </article>)}
          </div>
        </section>)}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">Availability opens external providers. Sample itinerary; confirm venues, transport and opening times before travelling.</p>
    </div>
  </section>;
}