import type { Waypoint, WaypointCategory } from "@/data/waypoints";

export function waypointBookingUrl(waypoint: Waypoint, city: string): string {
  const configured = waypoint.affiliate?.url ?? waypoint.affiliateUrl;
  return availabilityUrl(waypoint.category, waypoint.title, city, configured === "#" ? undefined : configured);
}

export function availabilityUrl(category: WaypointCategory, title: string, city: string, configured?: string): string {
  const query = encodeURIComponent(`${title} ${city}`);
  const env: Record<WaypointCategory, string | undefined> = { stay: import.meta.env.VITE_AFFILIATE_STAY_URL, tour: import.meta.env.VITE_AFFILIATE_TOUR_URL, transit: import.meta.env.VITE_AFFILIATE_TRANSIT_URL };
  const template = configured ?? env[category];
  if (template) {
    try { const url = new URL(template.split("{query}").join(query)); if (url.protocol === "https:") return url.href; } catch { /* Use a working, non-affiliate search fallback. */ }
  }
  if (category === "stay") return `https://www.booking.com/searchresults.html?ss=${query}`;
  if (category === "tour") return `https://www.viator.com/searchResults/all?text=${query}`;
  return `https://www.google.com/search?q=${encodeURIComponent(`${title} ${city} transport tickets`)}`;
}

export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}