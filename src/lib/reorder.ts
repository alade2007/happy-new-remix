import type { ItineraryDay } from "@/data/planner";

/** Move a stop onto another stop's slot or to the end of a day. Throws on unknown ids so the canvas boundary can recover. */
export function moveStop(days: ItineraryDay[], activeId: string, overId: string): ItineraryDay[] {
  if (activeId === overId) return days;
  const fromDay = days.findIndex(d => d.stops.some(s => s.id === activeId));
  if (fromDay < 0) throw new Error(`Unknown stop ${activeId}`);
  const overDayByStop = days.findIndex(d => d.stops.some(s => s.id === overId));
  const toDay = overDayByStop >= 0 ? overDayByStop : days.findIndex(d => d.id === overId);
  if (toDay < 0) throw new Error(`Unknown drop target ${overId}`);
  const next = days.map(d => ({ ...d, stops: [...d.stops] }));
  const fromIndex = next[fromDay].stops.findIndex(s => s.id === activeId);
  const [moved] = next[fromDay].stops.splice(fromIndex, 1);
  const target = next[toDay].stops;
  const overIndex = overDayByStop >= 0 ? target.findIndex(s => s.id === overId) : -1;
  if (overIndex < 0) target.push(moved);
  else target.splice(fromDay === toDay && fromIndex <= overIndex ? overIndex + 1 : overIndex, 0, moved);
  return next;
}
