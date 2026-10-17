import { describe, it, expect } from "vitest";
import { availabilityUrl, directionsUrl, waypointBookingUrl } from "@/lib/affiliateLinks";
import { waypointsFor, waypointTierDetails } from "@/data/waypoints";
import { travelIcons } from "@/lib/travelIcons";
import { createItinerary, interpretPlannerRequest } from "@/data/planner";
import { moveStop } from "@/lib/reorder";
import { destinations } from "@/data/scout";

describe("Travel feature mapping", () => {
  it("uses a bed for accommodations", () => expect(travelIcons.stay.iconName).toBe("bed"));
  it("uses a ticket stub for excursions", () => expect(travelIcons.tour.iconName).toBe("ticket"));
  it("uses a route icon for navigation", () => expect(travelIcons.route.iconName).toBe("route"));
  it("uses a departing airplane for flights", () => expect(travelIcons.flight.iconName).toBe("plane-departure"));
  it("uses utensils for dining", () => expect(travelIcons.dining.iconName).toBe("utensils"));
  it("uses a train for transit", () => expect(travelIcons.transit.iconName).toBe("train"));
});
describe("Contextual planner data", () => {
  const hotel = waypointsFor("lagos").find(stop => stop.id === "eko-hotel");
  if (!hotel) throw new Error("Hotel fixture missing");
  it("changes price and description for each spending tier", () => {
    const budget = waypointTierDetails(hotel, "budget");
    const balanced = waypointTierDetails(hotel, "balanced");
    const premium = waypointTierDetails(hotel, "premium");
    expect(budget.amount).toBeLessThan(balanced.amount);
    expect(balanced.amount).toBeLessThan(premium.amount);
    expect(new Set([budget.description, balanced.description, premium.description]).size).toBe(3);
  });
  it("reads structured affiliate redirection from the selected waypoint", () => {
    expect(waypointBookingUrl({ ...hotel, affiliate: { url: "https://partner.example/book?query={query}&ref=scout" } }, "Lagos")).toBe("https://partner.example/book?query=Eko%20Hotel%20%26%20Suites%20Lagos&ref=scout");
  });
  it("rejects unsafe structured affiliate redirections", () => {
    expect(waypointBookingUrl({ ...hotel, affiliate: { url: "javascript:alert(1)" } }, "Lagos")).toBe("https://www.booking.com/searchresults.html?ss=Eko%20Hotel%20%26%20Suites%20Lagos");
  });
  it("uses partner-supplied tier details without rewriting them", () => {
    const details = { amount: 75, currency: "USD" as const, unit: "night" as const, description: "Partner estimate" };
    expect(waypointTierDetails({ ...hotel, tiers: { budget: details, balanced: details, premium: details } }, "premium")).toEqual(details);
  });
});
describe("Planner actions", () => {
  it("directions include the stop coordinates", () => expect(directionsUrl(6.4253, 3.4296)).toBe("https://www.google.com/maps/dir/?api=1&destination=6.4253,3.4296"));
  it("injects URL-encoded search into partner tracking URLs", () => expect(availabilityUrl("tour", "Nike Art Gallery", "Lagos", "https://www.viator.com/search?text={query}&pid=P123")).toBe("https://www.viator.com/search?text=Nike%20Art%20Gallery%20Lagos&pid=P123"));
  it("rejects unsafe affiliate links", () => expect(availabilityUrl("stay", "Eko Hotel", "Lagos", "javascript:alert(1)")).toBe("https://www.booking.com/searchresults.html?ss=Eko%20Hotel%20Lagos"));
  it("keeps all Lagos hotel, excursion and transit stops in the day timeline", () => {
    const lagos = destinations.find(d => d.slug === "lagos");
    if (!lagos) throw new Error("Lagos content missing");
    const stops = createItinerary(lagos, 3).flatMap(day => day.stops);
    expect(stops.map(stop => stop.id).sort()).toEqual(["eko-hotel", "lekki-bridge", "marina-brt", "nike-art"]);
    expect(new Set(stops.map(stop => stop.category))).toEqual(new Set(["stay", "tour", "transit"]));
  });
  it("updates destination and days from the same chat request", () => {
    const result = interpretPlannerRequest("Plan 4 days in Paris", destinations[0], destinations, 3);
    expect(result.destination.slug).toBe("paris");
    expect(result.days).toBe(4);
  });
});
describe("Stop reordering", () => {
  const lagos = destinations.find(d => d.slug === "lagos");
  if (!lagos) throw new Error("Lagos content missing");
  const days = createItinerary(lagos, 3);
  it("moves a stop onto another stop's slot within the same day", () => {
    const day = days[0];
    if (day.stops.length < 2) throw new Error("Need two stops in day 1");
    const [first, second] = day.stops;
    const next = moveStop(days, first.id, second.id);
    expect(next[0].stops.map(s => s.id)).toEqual([second.id, first.id, ...day.stops.slice(2).map(s => s.id)]);
  });
  it("moves a stop to the end of another day", () => {
    const first = days[0].stops[0];
    const next = moveStop(days, first.id, days[2].id);
    expect(next[0].stops.some(s => s.id === first.id)).toBe(false);
    expect(next[2].stops.at(-1)?.id).toBe(first.id);
  });
  it("throws on unknown ids so the canvas boundary can recover", () => {
    expect(() => moveStop(days, "missing-stop", days[0].id)).toThrow("Unknown stop");
    expect(() => moveStop(days, days[0].stops[0].id, "missing-day")).toThrow("Unknown drop target");
  });
});