// Map waypoints per destination. Swap for a CMS/DB query; affiliate URLs are placeholders.
import { images } from "./scout";

export type WaypointCategory = "stay" | "tour" | "transit";

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
