import { supabase } from "@/integrations/supabase/client";
import type { ItineraryDay } from "@/data/planner";
import type { SpendingTier, Waypoint, WaypointCategory } from "@/data/waypoints";
import { directionsUrl } from "@/lib/affiliateLinks";

export interface SavedTrip { id: string; title: string; destination: string; status: string; created_at: string }

export async function listTrips(): Promise<SavedTrip[]> {
  const { data, error } = await supabase.from("itineraries").select("id,title,destination,status,created_at").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveTrip(opts: { id?: string; userId: string; title: string; destination: string; days: ItineraryDay[]; tier: SpendingTier }): Promise<string> {
  let id = opts.id;
  if (id) {
    const { error } = await supabase.from("itineraries").update({ title: opts.title, destination: opts.destination, status: "planned" }).eq("id", id);
    if (error) throw error;
    const del = await supabase.from("waypoint_items").delete().eq("itinerary_id", id);
    if (del.error) throw del.error;
  } else {
    const { data, error } = await supabase.from("itineraries").insert({ user_id: opts.userId, title: opts.title, destination: opts.destination, status: "planned" }).select("id").single();
    if (error) throw error;
    id = data.id;
  }
  const rows = opts.days.flatMap((day, d) => day.stops.map((s, i) => ({
    itinerary_id: id!, day_number: d + 1, position_index: i, title: s.title, lat: s.coordinates.lat, lng: s.coordinates.lng,
    type: s.category, cost_tier: opts.tier, affiliate_url: s.affiliate?.url ?? (s.affiliateUrl.startsWith("https://") ? s.affiliateUrl : null),
  })));
  if (rows.length) { const { error } = await supabase.from("waypoint_items").insert(rows); if (error) throw error; }
  return id!;
}

export async function loadTrip(id: string, city: string, image: string, dayCount: number): Promise<{ days: ItineraryDay[]; tier: SpendingTier }> {
  const { data, error } = await supabase.from("waypoint_items").select("*").eq("itinerary_id", id).order("day_number").order("position_index");
  if (error) throw error;
  const days: ItineraryDay[] = Array.from({ length: Math.max(dayCount, ...data.map(r => r.day_number), 1) }, (_, i) => ({ id: `day-${i + 1}`, title: `Day ${i + 1}`, stops: [] }));
  for (const r of data) {
    const stop: Waypoint = { id: r.id, title: r.title, address: city, description: "", rating: 0, image, category: r.type as WaypointCategory, coordinates: { lat: r.lat, lng: r.lng }, pin: { x: 50, y: 50 }, directionsUrl: directionsUrl({ lat: r.lat, lng: r.lng }), affiliateUrl: r.affiliate_url ?? "#", affiliate: r.affiliate_url ? { url: r.affiliate_url } : undefined };
    days[r.day_number - 1].stops.push(stop);
  }
  return { days, tier: (data[0]?.cost_tier as SpendingTier) ?? "balanced" };
}
