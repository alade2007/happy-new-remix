import { ExternalLink, MapPin, Star, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import TravelIcon from "@/components/site/TravelIcon";
import { waypointBookingUrl } from "@/lib/affiliateLinks";
import { formatWaypointPrice, waypointTierDetails, type SpendingTier, type Waypoint } from "@/data/waypoints";
import { cn } from "@/lib/utils";

export default function WaypointDrawer({ waypoint, city, image, tier, open, onOpenChange }: { waypoint?: Waypoint; city: string; image: string; tier: SpendingTier; open: boolean; onOpenChange: (open: boolean) => void }) {
  const details = waypoint ? waypointTierDetails(waypoint, tier) : null;
  const rating = waypoint ? Math.min(5, Math.max(0, waypoint.rating)) : 0;
  return <Sheet open={open && Boolean(waypoint)} onOpenChange={onOpenChange}>
    <SheetContent side="right" className={cn("flex h-dvh w-full flex-col gap-0 overflow-y-auto border-border bg-card/90 p-0 backdrop-blur-xl sm:max-w-[460px]", `tier-${tier}`)}>
      <SheetHeader className="px-6 pb-5 pt-12 text-left">
        <div className="mb-3 flex items-center gap-2"><TravelIcon kind={waypoint?.category} className="bg-travel-glow text-travel-brand" /><span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{city} · {tier}</span></div>
        <SheetTitle className="font-sans text-2xl leading-tight">{waypoint?.title ?? "Stop details"}</SheetTitle>
        <SheetDescription className="flex items-start gap-1.5"><MapPin className="mt-0.5 size-4 shrink-0" />{waypoint?.address}</SheetDescription>
      </SheetHeader>
      {waypoint && details && <>
        <figure className="relative mx-6 aspect-[16/10] shrink-0 overflow-hidden rounded-lg bg-muted">
          <img src={waypoint.landmarkImage ?? image} alt={waypoint.landmarkImage ? waypoint.title : `${city} destination view`} className="h-full w-full object-cover" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/placeholder.svg"; }} />
          {!waypoint.landmarkImage && <figcaption className="absolute bottom-3 left-3 rounded-md bg-card/90 px-2 py-1 text-[10px] text-foreground backdrop-blur">{city} destination view</figcaption>}
        </figure>
        <div className="space-y-5 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {rating > 0 ? <div><div role="img" aria-label={`${rating} out of 5 stars, sample rating`} className="flex items-center gap-1">{Array.from({ length: 5 }, (_, index) => <span key={index} className="relative inline-flex size-4 text-muted-foreground"><Star className="size-4" />{rating > index && <span className={cn("absolute inset-0 overflow-hidden text-accent", rating < index + 1 && "w-1/2")}><Star className="size-4 fill-current" /></span>}</span>)}<span className="ml-1 text-sm font-semibold text-foreground">{rating.toFixed(1)}</span></div><p className="mt-1 text-[10px] text-muted-foreground">Sample rating</p></div> : <p className="text-xs text-muted-foreground">Not yet rated</p>}
            <div className="text-right"><p className="tier-price text-lg font-semibold">{formatWaypointPrice(details)}</p><p className="text-[10px] text-muted-foreground">Sample {tier} estimate</p></div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{waypoint.description}</p>
          <p className="text-sm leading-relaxed">{details.description}</p>
          <div className="border-l-2 border-travel-brand bg-travel-glow px-4 py-3"><h3 className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold text-travel-brand"><Lightbulb className="size-4" />Local tip</h3><p className="text-sm leading-relaxed text-foreground">{waypoint.localTip ?? waypoint.description}</p></div>
        </div>
        <div className="mt-auto space-y-3 border-t border-border bg-card/80 p-6">
          <div className="grid gap-2"><Button asChild variant="outline"><a href={waypoint.directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin />Get Route Directions</a></Button><Button asChild variant="travel"><a href={waypointBookingUrl(waypoint, city)} target="_blank" rel="sponsored noopener noreferrer"><ExternalLink />Book Tickets Online</a></Button></div>
          <p className="text-xs leading-relaxed text-muted-foreground">{waypoint.affiliate?.provider ? `Opens ${waypoint.affiliate.provider}. ` : "Opens an external provider search. "}Prices and availability are not live.</p>
        </div>
      </>}
    </SheetContent>
  </Sheet>;
}