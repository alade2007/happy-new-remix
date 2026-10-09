import { Coins, Scale, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SpendingTier } from "@/data/waypoints";
import { cn } from "@/lib/utils";

const options = [{ value: "budget", label: "Budget", Icon: Coins }, { value: "balanced", label: "Balanced", Icon: Scale }, { value: "premium", label: "Premium", Icon: Gem }] as const;

export default function SpendingTierControl({ tier, onChange }: { tier: SpendingTier; onChange: (tier: SpendingTier) => void }) {
  return <div role="group" aria-label="Travel spending tier" className="flex max-w-full rounded-md border border-border bg-muted p-1">
    {options.map(({ value, label, Icon }) => <Button key={value} size="sm" variant="ghost" aria-pressed={tier === value} onClick={() => onChange(value)} className={cn("min-w-0 flex-1 gap-1.5 px-2 text-xs hover:bg-travel-glow hover:text-travel-brand sm:px-3", tier === value && "bg-card text-travel-brand shadow-sm")}><Icon className="size-4" />{label}</Button>)}
  </div>;
}