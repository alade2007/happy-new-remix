/**
 * Data-access layer. Pages/components should import from here (or scout.ts for
 * static content). Every fetch* function is async so its body can be swapped
 * for a CMS fetch or database query without changing callers.
 */
import { destinations, guides, categories, authors, getDestination, getGuide, type Destination, type Guide } from "./scout";

export interface GeoPoint { lat: number; lng: number }

/** Coordinates + indicative "from" price (USD per person, 5-night trip) per destination slug. */
const destinationMeta: Record<string, { geo: GeoPoint; priceFrom: number; category: string }> = {
  lagos: { geo: { lat: 6.5244, lng: 3.3792 }, priceFrom: 950, category: "City" },
  "cape-town": { geo: { lat: -33.9249, lng: 18.4241 }, priceFrom: 1400, category: "City & Nature" },
  zanzibar: { geo: { lat: -6.1659, lng: 39.2026 }, priceFrom: 1250, category: "Beach" },
  marrakech: { geo: { lat: 31.6295, lng: -7.9811 }, priceFrom: 850, category: "Culture" },
  nairobi: { geo: { lat: -1.2921, lng: 36.8219 }, priceFrom: 2600, category: "Safari" },
  dubai: { geo: { lat: 25.2048, lng: 55.2708 }, priceFrom: 1600, category: "Luxury" },
  paris: { geo: { lat: 48.8566, lng: 2.3522 }, priceFrom: 1350, category: "City" },
  london: { geo: { lat: 51.5072, lng: -0.1276 }, priceFrom: 1300, category: "City" },
  santorini: { geo: { lat: 36.3932, lng: 25.4615 }, priceFrom: 1500, category: "Island" },
  reykjavik: { geo: { lat: 64.1466, lng: -21.9426 }, priceFrom: 1800, category: "Adventure" },
  tokyo: { geo: { lat: 35.6762, lng: 139.6503 }, priceFrom: 1900, category: "City" },
  "new-york": { geo: { lat: 40.7128, lng: -74.006 }, priceFrom: 1700, category: "City" },
  "rio-de-janeiro": { geo: { lat: -22.9068, lng: -43.1729 }, priceFrom: 1450, category: "Beach & City" },
  sydney: { geo: { lat: -33.8688, lng: 151.2093 }, priceFrom: 2100, category: "City & Coast" },
};

export interface DestinationRecord extends Destination {
  id: string;
  title: string;
  category: string;
  description: string;
  coordinates: GeoPoint | null;
  priceFrom: number | null;
  currency: "USD";
}

export interface PostRecord extends Guide {
  id: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  trip: string; // destination slug
  rating: 1 | 2 | 3 | 4 | 5;
}

// Placeholder testimonials — replace with real ones.
export const testimonials: Testimonial[] = [
  { id: "t-1", name: "Amara N.", location: "Abuja", trip: "zanzibar", rating: 5, quote: "The Zanzibar guide planned half our trip for us — Stone Town at dusk was exactly as described." },
  { id: "t-2", name: "Tom R.", location: "Manchester", trip: "tokyo", rating: 5, quote: "The izakaya etiquette piece saved us from at least three awkward moments." },
  { id: "t-3", name: "Lerato M.", location: "Johannesburg", trip: "marrakech", rating: 4, quote: "Honest, practical and beautifully written. We got lost in the medina on purpose." },
];

export const coordsFor = (slug: string): GeoPoint | null => destinationMeta[slug]?.geo ?? null;

export const toDestinationRecord = (d: Destination): DestinationRecord => {
  const m = destinationMeta[d.slug];
  return {
    ...d,
    id: `dest-${d.slug}`,
    title: `${d.name}, ${d.country}`,
    category: m?.category ?? d.region,
    description: d.tagline,
    coordinates: m?.geo ?? null,
    priceFrom: m?.priceFrom ?? null,
    currency: "USD",
  };
};

export const toPostRecord = (g: Guide): PostRecord => ({ ...g, id: `post-${g.slug}`, description: g.excerpt });

// ---- Sync accessors (static data) ----
export const destinationRecords: DestinationRecord[] = destinations.map(toDestinationRecord);
export const postRecords: PostRecord[] = guides.map(toPostRecord);

// ---- Async, CMS-ready accessors ----
export async function fetchDestinations(): Promise<DestinationRecord[]> {
  return destinationRecords;
}
export async function fetchDestination(slug: string): Promise<DestinationRecord | null> {
  const d = getDestination(slug);
  return d ? toDestinationRecord(d) : null;
}
export async function fetchPosts(): Promise<PostRecord[]> {
  return postRecords;
}
export async function fetchPost(slug: string): Promise<PostRecord | null> {
  const g = getGuide(slug);
  return g ? toPostRecord(g) : null;
}
export async function fetchTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

export { categories, authors };
