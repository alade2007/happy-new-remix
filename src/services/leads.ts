import { contactSchema, quoteSchema, type ContactInput, type QuoteInput } from "@/lib/leadSchemas";

export type LeadResult = { ok: true; id: string; demo: boolean } | { ok: false; error: string };

const ENDPOINT = (import.meta.env.VITE_API_ENDPOINT as string | undefined)?.trim();
const PUBLIC_KEY = (import.meta.env.VITE_API_PUBLIC_KEY as string | undefined)?.trim();
const TIMEOUT_MS = 12_000;

async function postLead(kind: "contact" | "quote", payload: unknown): Promise<LeadResult> {
  // Demo mode: no backend configured yet — simulate latency and succeed.
  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, id: `demo-${Date.now()}`, demo: true };
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${ENDPOINT.replace(/\/$/, "")}/leads/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(PUBLIC_KEY && { "X-Api-Key": PUBLIC_KEY }) },
      body: JSON.stringify({ ...(payload as object), source: window.location.pathname, submittedAt: new Date().toISOString() }),
      signal: ctrl.signal,
      credentials: "omit",
    });
    if (!res.ok) return { ok: false, error: res.status >= 500 ? "Our server is having trouble. Please try again shortly." : "We couldn't send your request. Please check your details." };
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id ?? "", demo: false };
  } catch (e) {
    return { ok: false, error: (e as Error).name === "AbortError" ? "The request timed out. Please try again." : "Network error — check your connection and try again." };
  } finally {
    clearTimeout(timer);
  }
}

/** Re-validates on the way out so nothing unvalidated ever leaves the browser. */
export async function submitContact(input: ContactInput): Promise<LeadResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields." };
  return postLead("contact", parsed.data);
}

export async function submitQuote(input: QuoteInput): Promise<LeadResult> {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields." };
  return postLead("quote", parsed.data);
}
