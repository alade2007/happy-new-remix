import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUp, RotateCcw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import TravelIcon from "@/components/site/TravelIcon";
import PremiumGate from "@/components/planner/PremiumGate";
import ItineraryCanvas from "@/components/planner/ItineraryCanvas";
import { destinations, getDestination } from "@/data/scout";
import { createItinerary, interpretPlannerRequest } from "@/data/planner";
import type { TravelIconKind } from "@/lib/travelIcons";

const features: { kind: TravelIconKind; label: string }[] = [{ kind: "stay", label: "Stays" }, { kind: "tour", label: "Activities" }, { kind: "route", label: "Routes" }, { kind: "flight", label: "Flights" }, { kind: "dining", label: "Dining" }, { kind: "transit", label: "Transit" }];
type ChatMessage = { id: number; role: "user" | "assistant"; text: string };

export default function Planner() {
  const [params, setParams] = useSearchParams();
  const destination = getDestination(params.get("destination") ?? "lagos") ?? destinations[0];
  const [dayCount, setDayCount] = useState(3);
  const [input, setInput] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<"itinerary" | "map">("itinerary");
  const initialMessage = (city: string): ChatMessage => ({ id: Date.now(), role: "assistant", text: `Let's explore **${city}**. I've put together a sample itinerary with places to stay, things to see and local transport. Where would you like to go, and for how many days?` });
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage(destination.name)]);
  const days = useMemo(() => createItinerary(destination, dayCount), [destination, dayCount]);
  const changeDestination = (slug: string) => { setParams({ destination: slug }); setActive(null); };
  const submit = ({ text }: { text: string }) => {
    if (!text.trim()) return;
    const result = interpretPlannerRequest(text, destination, destinations, dayCount);
    if (result.supported) { changeDestination(result.destination.slug); setDayCount(result.days); }
    const response = result.supported ? `Your **${result.days}-day ${result.destination.name} itinerary** is ready. I've updated the stops and route together. These are sample suggestions, not live bookings.` : `This planner preview can change the destination and number of days. Try “Plan 4 days in Paris”. Live AI recommendations aren't connected yet.`;
    setMessages(previous => [...previous, { id: Date.now(), role: "user", text }, { id: Date.now() + 1, role: "assistant", text: response }]);
    setInput("");
  };

  return <Layout seo={{ title: "Trip Planner — Itineraries & Route Maps", description: "Explore a day-by-day travel itinerary with stays, activities, directions and booking searches. Preview Travel Scout's premium travel tools." }}>
    <div className="border-y border-border bg-card">
      <div className="container-site flex flex-wrap items-center justify-between gap-3 py-4"><div className="flex items-center gap-3"><TravelIcon kind="route" className="bg-travel-glow text-travel-brand" /><div><h2 className="font-sans text-lg font-semibold">Travel Scout Planner</h2><p className="text-xs text-muted-foreground">{destination.name}, {destination.country}</p></div></div><span className="rounded-md border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Planner preview</span></div>
    </div>
    <div className="mx-auto flex max-w-[1500px] flex-col lg:flex-row">
      <aside className="flex min-w-0 flex-col border-b border-border bg-card lg:sticky lg:top-16 lg:h-[calc(100dvh-9rem)] lg:min-h-[550px] lg:w-[360px] lg:shrink-0 lg:border-b-0 lg:border-r" aria-label="Chat planner">
        <div className="border-b border-border p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-sans font-semibold">Your personal travel scout</h2><Button size="icon-sm" variant="ghost" aria-label="Reset planner" title="Reset planner" onClick={() => { setDayCount(3); setActive(null); setInput(""); setMessages([initialMessage(destination.name)]); }}><RotateCcw /></Button></div><label className="mb-1.5 block text-xs text-muted-foreground" htmlFor="planner-destination">Destination</label><Select value={destination.slug} onValueChange={slug => { changeDestination(slug); const d = getDestination(slug); if (d) setMessages(previous => [...previous, { id: Date.now(), role: "assistant", text: `Your sample itinerary is now set to **${d.name}**.` }]); }}><SelectTrigger id="planner-destination"><SelectValue /></SelectTrigger><SelectContent>{destinations.map(d => <SelectItem key={d.slug} value={d.slug}>{d.name}, {d.country}</SelectItem>)}</SelectContent></Select>
          <div className="mt-4 grid grid-cols-6 gap-1">{features.map(feature => <div key={feature.kind} title={feature.label} className="group flex flex-col items-center gap-1"><TravelIcon kind={feature.kind} /><span className="text-[9px] text-muted-foreground">{feature.label}</span></div>)}</div>
        </div>
        <Conversation className="min-h-[220px] max-h-[400px] lg:max-h-none" aria-label="Planner conversation"><ConversationContent className="gap-5 p-5">{messages.map(message => <Message from={message.role} key={message.id}><MessageContent className={message.role === "user" ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground" : "leading-relaxed"}><MessageResponse>{message.text}</MessageResponse></MessageContent></Message>)}</ConversationContent><ConversationScrollButton /></Conversation>
        <div className="shrink-0 p-4"><PromptInput onSubmit={submit}><PromptInputTextarea aria-label="Trip request" placeholder={`Plan 3 days in ${destination.name}…`} value={input} onChange={event => setInput(event.target.value)} className="min-h-20 text-sm" /><PromptInputFooter className="justify-end"><PromptInputSubmit disabled={!input.trim()} status="ready" aria-label="Send trip request" className="h-8 w-8 bg-travel-brand p-0 text-travel-brand-foreground hover:bg-travel-brand/90"><ArrowUp className="h-4 w-4" /></PromptInputSubmit></PromptInputFooter></PromptInput><p className="mt-2 text-center text-[10px] text-muted-foreground">Sample recommendations · not live AI</p></div>
        <PremiumGate />
      </aside>
      <ItineraryCanvas days={days} city={destination.name} image={destination.image} active={active} setActive={setActive} view={view} setView={setView} />
    </div>
  </Layout>;
}