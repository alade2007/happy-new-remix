import { useState } from "react";
import { Check, CreditCard, FileDown, LockKeyhole, Map, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function PremiumGate() {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  return <>
    <section className="shrink-0 border-t border-border bg-travel-glow p-5" aria-label="Premium travel tools">
      <div className="mb-2 flex items-center gap-2 text-travel-brand"><Map className="h-5 w-5" /><FileDown className="h-5 w-5" /><span className="ml-auto text-[10px] font-semibold uppercase tracking-widest">Scout Pro</span></div>
      <h2 className="font-sans text-base font-semibold leading-snug">Unlock Premium Offline Maps & PDF Exports</h2>
      <Button variant="travel" className="mt-4 w-full" onClick={() => { setComplete(false); setOpen(true); }}><LockKeyhole className="h-4 w-4" />Explore Premium</Button>
    </section>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-lg bg-card">
        <DialogHeader><span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-travel-glow text-travel-brand">{complete ? <Check /> : <CreditCard />}</span><DialogTitle className="font-sans text-2xl">{complete ? "Checkout preview complete" : "Travel Scout Pro"}</DialogTitle><DialogDescription>{complete ? "No payment was taken. Premium tools are not activated in this preview." : "Preview checkout · no real payment"}</DialogDescription></DialogHeader>
        {!complete && <><ul className="space-y-3 py-4 text-sm">{["Offline destination maps", "Beautiful PDF itinerary exports", "All your trip essentials, together"].map(item => <li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-travel-brand" />{item}</li>)}</ul><p className="border-y border-border py-3 text-sm text-muted-foreground">Subscription pricing will be confirmed before live checkout.</p><Button variant="travel" onClick={() => setComplete(true)}><CreditCard />Simulate checkout</Button><p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" />No card details required</p></>}
        {complete && <Button variant="travel" onClick={() => setOpen(false)}>Back to my trip</Button>}
      </DialogContent>
    </Dialog>
  </>;
}