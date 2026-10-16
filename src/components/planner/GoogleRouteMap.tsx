import { useEffect, useRef, useState } from "react";
import type { ItineraryDay } from "@/data/planner";

const KEY = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
const CHANNEL = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] as string | undefined;
let loader: Promise<void> | null = null;

function loadMaps(): Promise<void> {
  if (window.google?.maps?.Map) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    if (!KEY) return reject(new Error("Map key missing"));
    (window as unknown as Record<string, unknown>)["__scoutMapsReady"] = () => resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&callback=__scoutMapsReady${CHANNEL ? `&channel=${CHANNEL}` : ""}`;
    s.async = true;
    s.onerror = () => { loader = null; reject(new Error("Map failed to load")); };
    document.head.appendChild(s);
  });
  return loader;
}

export default function GoogleRouteMap({ days, active, select, city, center }: { days: ItineraryDay[]; active: string | null; select: (id: string) => void; city: string; center?: { lat: number; lng: number } }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const overlays = useRef<{ markers: google.maps.Marker[]; line?: google.maps.Polyline }>({ markers: [] });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const stops = days.flatMap(d => d.stops);

  useEffect(() => { loadMaps().then(() => setStatus("ready"), () => setStatus("error")); }, []);

  useEffect(() => {
    if (status !== "ready" || !el.current) return;
    const brand = getComputedStyle(document.documentElement).getPropertyValue("--travel-brand").trim();
    const color = brand ? `hsl(${brand})` : "#2563eb";
    if (!map.current) map.current = new google.maps.Map(el.current, { center: center ?? stops[0]?.coordinates ?? { lat: 0, lng: 0 }, zoom: 13, clickableIcons: false, disableDefaultUI: true, zoomControl: true });
    overlays.current.markers.forEach(m => m.setMap(null));
    overlays.current.line?.setMap(null);
    const bounds = new google.maps.LatLngBounds();
    overlays.current.markers = stops.map((s, i) => {
      bounds.extend(s.coordinates);
      const m = new google.maps.Marker({ map: map.current!, position: s.coordinates, title: s.title, label: { text: String(i + 1), color: "#fff", fontWeight: "600" }, zIndex: s.id === active ? 10 : 1,
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: s.id === active ? 16 : 13, fillColor: color, fillOpacity: 1, strokeColor: "#fff", strokeWeight: 2 } });
      m.addListener("click", () => select(s.id));
      return m;
    });
    overlays.current.line = new google.maps.Polyline({ map: map.current, path: stops.map(s => s.coordinates), strokeColor: color, strokeOpacity: 0.55, strokeWeight: 4 });
    if (stops.length > 1) map.current.fitBounds(bounds, 60); else if (center) map.current.setCenter(center);
  }, [status, days, active]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="relative h-[420px] overflow-hidden rounded-lg border border-border bg-muted" aria-label={`${city} route map`}>
    <div ref={el} className="absolute inset-0" />
    {status !== "ready" && <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">{status === "loading" ? "Loading map…" : "The map couldn't load here. Use Get Directions on each stop to navigate."}</div>}
  </div>;
}
