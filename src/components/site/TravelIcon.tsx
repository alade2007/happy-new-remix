import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";
import { travelIcons, type TravelIconKind } from "@/lib/travelIcons";

export default function TravelIcon({ kind = "tour", icon, className }: { kind?: TravelIconKind; icon?: IconDefinition; className?: string }) {
  return <span aria-hidden="true" className={cn("travel-icon inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-travel-icon transition-all duration-200 motion-reduce:transition-none", className)}><FontAwesomeIcon icon={icon ?? travelIcons[kind]} className="h-5 w-5" /></span>;
}