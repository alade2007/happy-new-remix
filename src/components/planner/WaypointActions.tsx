import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waypointBookingUrl } from "@/lib/affiliateLinks";
import type { Waypoint } from "@/data/waypoints";

export default function WaypointActions({ waypoint, city }: { waypoint: Waypoint; city: string }) {
  return <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label={`Actions for ${waypoint.title}`} onClick={(e) => e.stopPropagation()}>
    <Button variant="outline" asChild className="h-auto min-h-10 whitespace-normal px-3 py-2 text-xs"><a href={waypoint.directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin />Get Directions</a></Button>
    <Button variant="travel" asChild className="h-auto min-h-10 whitespace-normal px-3 py-2 text-xs"><a href={waypointBookingUrl(waypoint, city)} target="_blank" rel="sponsored noopener noreferrer"><ExternalLink />Check Availability</a></Button>
  </div>;
}