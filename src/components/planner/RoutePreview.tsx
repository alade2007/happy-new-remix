import { Button } from "@/components/ui/button";
import TravelIcon from "@/components/site/TravelIcon";
import type { ItineraryDay } from "@/data/planner";
import { cn } from "@/lib/utils";

export default function RoutePreview({ days, active, select, city }: { days: ItineraryDay[]; active: string | null; select: (id: string) => void; city: string }) {
  const stops = days.flatMap((day, i) => day.stops.map(stop => ({ ...stop, day: i + 1 })));
  return <div className="route-preview relative min-h-[380px] overflow-hidden rounded-lg border border-border" aria-label={`${city} simulated route map`}>
    <span className="absolute left-4 top-4 z-10 rounded-md bg-card px-3 py-2 text-xs font-medium shadow-card">{city} · Route preview</span>
    <span className="absolute bottom-4 left-4 z-10 rounded-md bg-card/95 px-3 py-2 text-xs text-muted-foreground">Illustrative map · use Get Directions for navigation</span>
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={stops.map(s => `${s.pin.x},${s.pin.y}`).join(" ")} fill="none" className="route-line" strokeWidth="0.7" strokeDasharray="1.5 1" /></svg>
    {stops.map((stop, i) => <Button key={stop.id} variant="ghost" aria-label={`Show ${stop.title} in itinerary`} aria-pressed={active === stop.id} title={`Day ${stop.day}: ${stop.title}`} onClick={() => select(stop.id)} style={{ left: `${stop.pin.x}%`, top: `${stop.pin.y}%` }} className={cn("group route-pin absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full border-2 border-card bg-card p-0 transition-transform hover:bg-travel-glow hover:text-travel-brand [&_svg]:size-5", active === stop.id ? "z-20 scale-110 ring-4 ring-travel-brand/25" : "hover:scale-110")}>
      <TravelIcon kind={stop.category} /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-travel-brand text-[10px] text-travel-brand-foreground">{i + 1}</span>
    </Button>)}
  </div>;
}