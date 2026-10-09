// Map waypoints per destination. Swap for a CMS/DB query; affiliate URLs are placeholders.
import { images } from "./scout";

export type WaypointCategory = "stay" | "tour" | "transit";
export type SpendingTier = "budget" | "balanced" | "premium";
export interface WaypointTierDetails {
  amount: number;
  currency: "USD";
  unit: "night" | "person" | "ride";
  description: string;
}
export interface WaypointAffiliate { url: string; provider?: string }

export interface Waypoint {
  id: string;
  title: string;
  address: string;
  description: string;
  rating: number;
  image: string;
  category: WaypointCategory;
  coordinates: { lat: number; lng: number };
  /** Position on the simulated map, in percent. */
  pin: { x: number; y: number };
  directionsUrl: string;
  affiliateUrl: string;
  affiliate?: WaypointAffiliate;
  localTip?: string;
  /** Only set for an actual photo of this landmark; image remains legacy destination imagery. */
  landmarkImage?: string;
  tiers?: Record<SpendingTier, WaypointTierDetails>;
}

// Preview estimates only, not venue quotes. Replace tiers on each record with partner data.
const samplePrices: Record<WaypointCategory, Record<SpendingTier, number>> = {
  stay: { budget: 45, balanced: 120, premium: 280 },
  tour: { budget: 10, balanced: 35, premium: 95 },
  transit: { budget: 3, balanced: 15, premium: 55 },
};
const tierDescriptions: Record<WaypointCategory, Record<SpendingTier, string>> = {
  stay: { budget: "Explore simple stays nearby with essential comforts.", balanced: "Explore comfortable stays with convenient local access.", premium: "Explore upscale stays with elevated comfort and service." },
  tour: { budget: "Explore independently with a self-guided visit.", balanced: "Explore with a small-group experience or standard admission.", premium: "Explore private-guide and tailored experience options." },
  transit: { budget: "Compare public transport and shared local routes.", balanced: "Compare convenient taxis and standard transfers.", premium: "Compare private transfers and chauffeur options." },
};
export function waypointTierDetails(waypoint: Waypoint, tier: SpendingTier): WaypointTierDetails {
  return waypoint.tiers?.[tier] ?? {
    amount: samplePrices[waypoint.category][tier], currency: "USD",
    unit: waypoint.category === "stay" ? "night" : waypoint.category === "tour" ? "person" : "ride",
    description: tierDescriptions[waypoint.category][tier],
  };
}
export function formatWaypointPrice(details: WaypointTierDetails): string {
  return `${new Intl.NumberFormat("en-US", { style: "currency", currency: details.currency, maximumFractionDigits: 0 }).format(details.amount)} / ${details.unit}`;
}

const dir = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const lagos: Waypoint[] = [
  { id: "lekki-bridge", title: "Lekki–Ikoyi Link Bridge", address: "Ikoyi, Lagos", description: "Grab a Bolt to the Ikoyi end at sunset and walk across.", rating: 4.7, image: images.lagos, category: "tour", coordinates: { lat: 6.4474, lng: 3.4458 }, pin: { x: 58, y: 42 }, directionsUrl: dir(6.4474, 3.4458), affiliateUrl: "#" },
  { id: "nike-art", title: "Nike Art Gallery", address: "Lekki Phase 1, Lagos", description: "Take a cab along Lekki-Epe Expressway; ask for the 5-storey gallery.", rating: 4.9, image: images.food, category: "tour", coordinates: { lat: 6.4389, lng: 3.4892 }, pin: { x: 74, y: 55 }, directionsUrl: dir(6.4389, 3.4892), affiliateUrl: "#" },
  { id: "eko-hotel", title: "Eko Hotel & Suites", address: "Victoria Island, Lagos", description: "15 minutes from Ikoyi by car; avoid the 5–8pm bridge traffic.", rating: 4.6, image: images.dubai, category: "stay", coordinates: { lat: 6.4253, lng: 3.4296 }, pin: { x: 46, y: 64 }, directionsUrl: dir(6.4253, 3.4296), affiliateUrl: "#" },
  { id: "marina-brt", title: "CMS Marina BRT Terminal", address: "Lagos Island", description: "Buy a Cowry card at the kiosk, then hop any blue BRT bus.", rating: 4.3, image: images.london, category: "transit", coordinates: { lat: 6.4513, lng: 3.3907 }, pin: { x: 28, y: 38 }, directionsUrl: dir(6.4513, 3.3907), affiliateUrl: "#" },
];

export const waypointsByDestination: Record<string, Waypoint[]> = { lagos };
export const waypointsFor = (slug: string): Waypoint[] => waypointsByDestination[slug] ?? [];
