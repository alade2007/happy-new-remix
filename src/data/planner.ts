import { getDestination, type Destination } from "./scout";
import { waypointsFor, type Waypoint } from "./waypoints";
import { coordsFor } from "./travelStore";

export interface ItineraryDay { id: string; title: string; stops: Waypoint[] }
export function createItinerary(destination: Destination, days = 3): ItineraryDay[] {
  const known = waypointsFor(destination.slug);
  const geo = coordsFor(destination.slug) ?? { lat: 0, lng: 0 };
  const entries: { title: string; description: string; category: Waypoint["category"] }[] = [
    ...destination.stay.slice(0, 1).map(s => ({ title: s.name, description: s.note, category: "stay" as const })),
    ...destination.attractions.map(title => ({ title, description: `Explore ${title} in ${destination.name}.`, category: "tour" as const })),
    { title: `${destination.name} local transport`, description: destination.gettingAround, category: "transit" },
  ];
  const stops: Waypoint[] = known.length ? known : entries.map((entry, i) => ({
    ...entry, id: `${destination.slug}-${i}`, address: `${destination.name}, ${destination.country}`, rating: 0, image: destination.image,
    coordinates: geo, pin: { x: 18 + (i % 3) * 28, y: 23 + Math.floor(i / 3) * 30 },
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${entry.title}, ${destination.name}, ${destination.country}`)}`, affiliateUrl: "#",
  }));
  const count = Math.min(Math.max(days, 1), 7);
  return Array.from({ length: count }, (_, i) => ({ id: `day-${i + 1}`, title: i === 0 ? "Arrive & settle in" : i === count - 1 ? "A little more discovery" : "Art, culture & local life", stops: stops.filter((_, j) => Math.min(Math.floor(j * count / stops.length), count - 1) === i) }));
}

export function interpretPlannerRequest(text: string, current: Destination, destinations: Destination[], currentDays: number) {
  const lower = text.toLowerCase();
  const destination = destinations.find(d => lower.includes(d.name.toLowerCase()) || lower.includes(d.slug.replaceAll("-", " "))) ?? current;
  const match = lower.match(/\b([1-7])\s*[- ]?days?\b/);
  const days = match ? Number(match[1]) : currentDays;
  const supported = Boolean(match || destination.slug !== current.slug || /plan|itinerary|reset|explore|trip/.test(lower));
  return { destination: getDestination(destination.slug) ?? current, days, supported };
}