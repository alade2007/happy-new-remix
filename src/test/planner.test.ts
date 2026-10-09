import { describe, it, expect } from "vitest";
import { availabilityUrl, directionsUrl } from "@/lib/affiliateLinks";
import { travelIcons } from "@/lib/travelIcons";
import { createItinerary, interpretPlannerRequest } from "@/data/planner";
import { destinations } from "@/data/scout";

describe("Travel feature mapping", () => {
  it("uses a bed for accommodations", () => expect(travelIcons.stay.iconName).toBe("bed"));
  it("uses a compass for excursions", () => expect(travelIcons.tour.iconName).toBe("compass"));
  it("uses a route icon for navigation", () => expect(travelIcons.route.iconName).toBe("route"));
  it("uses a departing airplane for flights", () => expect(travelIcons.flight.iconName).toBe("plane-departure"));
  it("uses utensils for dining", () => expect(travelIcons.dining.iconName).toBe("utensils"));
  it("uses a train for transit", () => expect(travelIcons.transit.iconName).toBe("train"));
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