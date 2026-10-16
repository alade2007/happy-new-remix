import { useRef, useEffect, useState, type ReactNode } from "react";
import { List, Map, GripVertical } from "lucide-react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import TravelIcon from "@/components/site/TravelIcon";
import WaypointActions from "./WaypointActions";
import GoogleRouteMap from "./GoogleRouteMap";
import SpendingTierControl from "./SpendingTierControl";
import WaypointDrawer from "./WaypointDrawer";
import { formatWaypointPrice, waypointTierDetails, type SpendingTier, type Waypoint } from "@/data/waypoints";
import type { ItineraryDay } from "@/data/planner";
import { moveStop } from "@/lib/reorder";
import { cn } from "@/lib/utils";

function DayDrop({ id, children }: { id: string; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return <div ref={setNodeRef} className={cn("ml-4 min-h-12 space-y-3 border-l border-border pl-5 transition-colors", isOver && "border-travel-brand")}>{children}</div>;
}

function SortableStop({ stop, children, selected, onSelect, register }: { stop: Waypoint; children: ReactNode; selected: boolean; onSelect: () => void; register: (el: HTMLElement | null) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stop.id });
  return <article ref={el => { setNodeRef(el); register(el); }} style={{ transform: CSS.Transform.toString(transform), transition }} data-stop-id={stop.id} data-selected={selected} onClick={onSelect}
    className={cn("tier-stop group relative cursor-pointer scroll-mt-36 rounded-lg border bg-card p-4 pl-10 transition-all duration-300 motion-reduce:transition-none", selected ? "border-travel-brand ring-2 ring-travel-brand/15" : "border-border hover:border-travel-brand/40", isDragging && "z-30 opacity-80 shadow-card")}>
    <button type="button" {...attributes} {...listeners} onClick={e => e.stopPropagation()} aria-label={`Drag to move ${stop.title}`} className="absolute left-2 top-4 cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-travel-glow hover:text-travel-brand active:cursor-grabbing"><GripVertical className="h-4 w-4" /></button>
    {children}
  </article>;
}

interface Props { days: ItineraryDay[]; setDays: (d: ItineraryDay[]) => void; city: string; center?: { lat: number; lng: number }; active: string | null; setActive: (id: string) => void; view: "itinerary" | "map"; setView: (view: "itinerary" | "map") => void; image: string; tier: SpendingTier; setTier: (t: SpendingTier) => void; toolbar?: ReactNode }

export default function ItineraryCanvas({ days, setDays, city, center, active, setActive, view, setView, image, tier, setTier, toolbar }: Props) {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [crash, setCrash] = useState<Error | null>(null);
  if (crash) throw crash; // surfaces event-handler failures to CanvasErrorBoundary
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const selected = days.flatMap(day => day.stops).find(stop => stop.id === active);
  const selectStop = (id: string) => { setActive(id); setDrawerOpen(true); };
  const onDragEnd = ({ active: a, over }: DragEndEvent) => {
    if (!over) return;
    try { setDays(moveStop(days, String(a.id), String(over.id))); } catch (e) { setCrash(e instanceof Error ? e : new Error("Reorder failed")); }
  };
  useEffect(() => { if (active) refs.current[active]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }); }, [active]);
  return <section className="min-w-0 flex-1 bg-background" aria-label="Trip canvas">
    <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-5 py-4 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3"><span className="font-sans text-sm font-semibold">Your trip, at a glance</span><SpendingTierControl tier={tier} onChange={setTier} /></div>
      <div className="flex flex-wrap items-center gap-2">{toolbar}
        <div role="tablist" aria-label="Canvas view" className="flex rounded-md bg-muted p-1">
          <Button role="tab" aria-selected={view === "itinerary"} variant="ghost" size="sm" className={cn("text-xs hover:bg-travel-glow hover:text-travel-brand", view === "itinerary" && "bg-card shadow-sm")} onClick={() => setView("itinerary")}><List />Itinerary View</Button>
          <Button role="tab" aria-selected={view === "map"} variant="ghost" size="sm" className={cn("text-xs hover:bg-travel-glow hover:text-travel-brand", view === "map" && "bg-card shadow-sm")} onClick={() => setView("map")}><Map />Interactive Route Map</Button>
        </div>
      </div>
    </div>
    <div className={cn("mx-auto max-w-4xl space-y-6 p-5 md:p-7", `tier-${tier}`)}>
      <div className="relative h-44 overflow-hidden rounded-lg">
        <img src={image} alt={`${city} destination`} className="h-full w-full object-cover" /><div className="bg-overlay-gradient absolute inset-0" />
        <div className="absolute bottom-5 left-5 text-primary-foreground"><p className="text-xs uppercase tracking-widest">{days.length} days · {days.flatMap(d => d.stops).length} stops</p><h1 className="mt-1 text-3xl font-semibold">A few days in {city}</h1></div>
      </div>
      {view === "map" && <GoogleRouteMap days={days} active={active} select={selectStop} city={city} center={center} />}
      <p className="text-xs text-muted-foreground">Drag the handle on any stop to reorder it or move it to another day.</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div role="tabpanel" aria-label={view === "map" ? "Route map itinerary" : "Day-by-day itinerary"} className="space-y-7">
          {days.map((day, index) => <section key={day.id}>
            <div className="mb-4 flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-travel-glow font-semibold text-travel-brand">{index + 1}</span><div><p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Day {index + 1}</p><h2 className="font-sans text-base font-semibold">{day.title}</h2></div></div>
            <SortableContext id={day.id} items={day.stops.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <DayDrop id={day.id}>
                {day.stops.length === 0 && <p className="py-4 text-sm text-muted-foreground">A free day to explore at your own pace. Drop a stop here.</p>}
                {day.stops.map(stop => <SortableStop key={stop.id} stop={stop} selected={active === stop.id} onSelect={() => selectStop(stop.id)} register={el => { refs.current[stop.id] = el; }}>
                  <Button variant="ghost" className="mb-3 h-auto w-full justify-start whitespace-normal p-0 text-left hover:bg-transparent hover:text-foreground [&_svg]:size-5" onClick={event => { event.stopPropagation(); selectStop(stop.id); }} aria-haspopup="dialog" aria-pressed={active === stop.id}><TravelIcon kind={stop.category} /><span className="min-w-0"><span className="block font-semibold">{stop.title}</span><span className="block text-xs font-normal text-muted-foreground">{stop.address}</span></span></Button>
                  {stop.description && <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{stop.description}</p>}
                  <p className="mb-3 text-sm leading-relaxed" key={`${stop.id}-${tier}`}>{waypointTierDetails(stop, tier).description}</p>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2" aria-live="polite"><span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{tier} · Sample estimate</span><span className="tier-price text-sm font-semibold">{formatWaypointPrice(waypointTierDetails(stop, tier))}</span></div>
                  <WaypointActions waypoint={stop} city={city} />
                </SortableStop>)}
              </DayDrop>
            </SortableContext>
          </section>)}
        </div>
      </DndContext>
      <p className="text-xs leading-relaxed text-muted-foreground">Availability opens external providers. Sample itinerary; confirm venues, transport and opening times before travelling.</p>
    </div>
    <WaypointDrawer waypoint={selected} city={city} image={image} tier={tier} open={drawerOpen} onOpenChange={setDrawerOpen} />
  </section>;
}
